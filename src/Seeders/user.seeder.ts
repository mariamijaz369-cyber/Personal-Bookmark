//  src/seeders/user.seeder.ts

import  User , {IUser } from "../models/user.model";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const seedUsers = async (): Promise<IUser[]> => {
  console.log("🌱 Seeding Users...");

  const users: Partial<IUser>[] = [];

  // Hash a default password for all fake users
  const password = await bcrypt.hash("Test1234", 10);

  // Create 10 fake users
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      dateOfBirth: faker.date.past(),
      password,
    });
  }

  // Insert into MongoDB
  const createdUsers = await User.insertMany(users);
  console.log(`✅ Created ${createdUsers.length} users`);

  // return createdUsers;
  return createdUsers as IUser[];

};
