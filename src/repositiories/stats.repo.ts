import mongoose from "mongoose";
import MostFavoriteUrl from "../models/mostFavoriteUrl.model";

// ✅ Define interfaces for populated documents
interface PopulatedBookmark {
  _id: string;
  title: string;
  url: string;
}

interface PopulatedClick {
  bookmarkId: PopulatedBookmark;
  clickCount: number;
}

interface PopulatedVisit {
  bookmarkId: PopulatedBookmark;
  visitCount: number;
}

// ✅ Load models
const Click = mongoose.model("Click");
const BookmarkVisit = mongoose.model("BookmarkVisit");

export async function getMostFavoriteUrlsRepo(userId: string) {
  const userObjId = new mongoose.Types.ObjectId(userId);

  // 1️⃣ Most clicked URL
  const mostClickedDoc = await Click.findOne({ userId: userObjId })
    .sort({ clickCount: -1 })
    .populate<{ bookmarkId: PopulatedBookmark }>("bookmarkId", "title url")
    .lean<PopulatedClick>();

  const mostClicked = mostClickedDoc
    ? {
        bookmarkId: mostClickedDoc.bookmarkId,
        clickCount: mostClickedDoc.clickCount,
      }
    : null;

  // 2️⃣ Most visited URL
  const mostVisitedDoc = await BookmarkVisit.findOne({ userId: userObjId })
    .sort({ visitCount: -1 })
    .populate<{ bookmarkId: PopulatedBookmark }>("bookmarkId", "title url")
    .lean<PopulatedVisit>();

  const mostVisited = mostVisitedDoc
    ? {
        bookmarkId: mostVisitedDoc.bookmarkId,
        visitCount: mostVisitedDoc.visitCount,
      }
    : null;

  // 3️⃣ Compute favorite scores
  const scoreMap: Record<string, number> = {};
  if (mostClicked) scoreMap[mostClicked.bookmarkId._id] = mostClicked.clickCount;
  if (mostVisited) {
    scoreMap[mostVisited.bookmarkId._id] =
      (scoreMap[mostVisited.bookmarkId._id] || 0) + mostVisited.visitCount;
  }

  // 4️⃣ Find the bookmark with the highest score
  let maxBookmarkId: string | null = null;
  let maxScore = 0;
  for (const [bookmarkId, score] of Object.entries(scoreMap)) {
    if (score > maxScore) {
      maxScore = score;
      maxBookmarkId = bookmarkId;
    }
  }

  // 5️⃣ Update MostFavoriteUrl collection
  let mostFavorite = null;
  if (maxBookmarkId) {
    const doc = await MostFavoriteUrl.findOneAndUpdate(
      { userId: userObjId, bookmarkId: maxBookmarkId },
      { favoriteScore: maxScore, lastUpdatedAt: new Date() },
      { upsert: true, new: true }
    ).populate<{ bookmarkId: PopulatedBookmark }>("bookmarkId", "title url");

    if (doc && doc.bookmarkId) {
      mostFavorite = {
        bookmarkId: doc.bookmarkId,
        favoriteScore: doc.favoriteScore,
      };
    }
  }

  // 6️⃣ Return standardized response
  return {
    code: 200,
    status: "success",
    message:
      "Most clicked, most visited, and most favorite URLs fetched successfully",
    data: {
      mostClickedUrl: mostClicked?.bookmarkId || null,
      mostVisitedUrl: mostVisited?.bookmarkId || null,
      mostFavoriteUrl: mostFavorite?.bookmarkId || null,
    },
  };
}
