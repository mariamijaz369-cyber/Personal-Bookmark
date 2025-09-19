import mongoose from "mongoose";
import MostFavoriteUrl from "../models/mostFavoriteUrl.model";

const Click = mongoose.model("Click");
const BookmarkVisit = mongoose.model("BookmarkVisit");
const Bookmark = mongoose.model("Bookmark"); // ✅ ensure schema exists

// --- Interfaces ---
interface BookmarkDoc {
  _id: mongoose.Types.ObjectId;
  title: string;
  url: string;
}

type BookmarkInfo = {
  _id: string;
  title?: string;
  url?: string;
};

// --- Repo function ---
export async function getMostStatsRepo(userId: string) {
  const userObjId = new mongoose.Types.ObjectId(userId);

  // --- 1) Aggregate total clicks ---
  const clicksAgg: { _id: mongoose.Types.ObjectId; totalClicks: number }[] =
    await Click.aggregate([
      { $match: { userId: userObjId } },
      { $group: { _id: "$bookmarkId", totalClicks: { $sum: "$clickCount" } } },
      { $sort: { totalClicks: -1 } },
    ]);

  // --- 2) Aggregate total visits ---
  const visitsAgg: { _id: mongoose.Types.ObjectId; totalVisits: number }[] =
    await BookmarkVisit.aggregate([
      { $match: { userId: userObjId } },
      { $group: { _id: "$bookmarkId", totalVisits: { $sum: "$visitCount" } } },
      { $sort: { totalVisits: -1 } },
    ]);

  // --- 3) Pick top ---
  const topClick = clicksAgg.length ? clicksAgg[0] : null;
  const topVisit = visitsAgg.length ? visitsAgg[0] : null;

  // ✅ Helper: fetch bookmark details
  const fetchBookmark = async (
    id?: mongoose.Types.ObjectId | string
  ): Promise<BookmarkInfo | null> => {
    if (!id) return null;
    const b = await Bookmark.findById(id)
      .select("title url")
      .lean<BookmarkDoc | null>();
    return b ? { _id: b._id.toString(), title: b.title, url: b.url } : null;
  };
  
  const mostClickedUrl = topClick
    ? {
        ...(await fetchBookmark(topClick._id)),
        clickCount: topClick.totalClicks,
      }
    : null;
    const result = await fetchBookmark(topClick?._id)
    console.log(result)

  // ✅ Most Visited
  const mostVisitedUrl = topVisit
    ? {
        ...(await fetchBookmark(topVisit._id)),
        visitCount: topVisit.totalVisits,
      }
    : null;

  // --- 4) Decide Most Favorite ---
  let mostFavoriteUrl: any = null;
  if (mostClickedUrl && mostVisitedUrl) {
    mostFavoriteUrl =
      (mostClickedUrl.clickCount ?? 0) >= (mostVisitedUrl.visitCount ?? 0)
        ? { ...mostClickedUrl, favoriteScore: mostClickedUrl.clickCount }
        : { ...mostVisitedUrl, favoriteScore: mostVisitedUrl.visitCount };
  } else if (mostClickedUrl) {
    mostFavoriteUrl = {
      ...mostClickedUrl,
      favoriteScore: mostClickedUrl.clickCount,
    };
  } else if (mostVisitedUrl) {
    mostFavoriteUrl = {
      ...mostVisitedUrl,
      favoriteScore: mostVisitedUrl.visitCount,
    };
  }

  // --- 5) Save favorite ---
  if (mostFavoriteUrl?._id) {
    await MostFavoriteUrl.findOneAndUpdate(
      { userId: userObjId, bookmarkId: mostFavoriteUrl._id },
      { favoriteScore: mostFavoriteUrl.favoriteScore, lastUpdatedAt: new Date() },
      { upsert: true, new: true }
    );
  }

  // --- 6) Return response ---
  return {
    code: 200,
    status: "success",
    message:
      "Most clicked, most visited and most favorite URLs fetched successfully",
    data: {
      mostClickedUrl,
      mostVisitedUrl,
      mostFavoriteUrl,
    },
  };
}
