import type { NextFunction, Request, Response } from "express";
import { db } from "../config/config.db.ts";
import { eq } from "drizzle-orm";
import { userTable } from "../schema/user.sql.ts";
import { asyncHandler } from "../middleware/helper/asyncHandler.ts";

export const insertUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, age, email, role, location } = req.body;
    if (!name || !age || !email || !role || !location) {
      res.status(400).json({
        message: "Please input the necessary fields!",
      });
      return;
    }

    //check if email exists
    const isExisting = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
    if (isExisting) {
      res.status(400).json({
        message: "user already exists",
      });
      return;
    }

    //inserting the user
    const user = await db
      .insert(userTable)
      .values({ name, email, age, role, location })
      .returning();
    if (!user) {
      res.status(400).json({
        message: "Failed to add user",
      });
      return;
    }

    res.status(201).json({
      message: "Successfully added User",
      data: user,
    });
  },
);

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await db.query.userTable.findMany();
    if (!users) {
      res.status(400).json({
        message: "Users not found",
      });
      return;
    }

    res.status(200).json({
      message: "Users fetched Successfully!",
      data: users,
    });
  },
);

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "No id was provided in the params",
      });
      return;
    }

    const checkIfIdExists = await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });
    if (!checkIfIdExists) {
      res.status(400).json({
        message: "User with that id is missing",
      });
      return;
    }
    const deleteUser = await db
      .delete(userTable)
      .where(eq(userTable.id, id))
      .returning({ deletedUserId: userTable.id });

    res.status(200).json({
      message: "User deleted Successfully!",
      data: deleteUser,
    });
    return;
  },
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, email, age, location, role } = req.body;
    if (!id) {
      res.status(400).json({
        message: "No id was provided in the params",
      });
      return;
    }

    if (!name || !age || !email || !role || !location) {
      res.status(400).json({
        message: "Please input the necessary fields!",
      });
      return;
    }

    const checkIfIdExists = await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });
    if (!checkIfIdExists) {
      res.status(400).json({
        message: "User with that id is missing",
      });
      return;
    }

    //updateUser
    const updateUserWithId = await db
      .update(userTable)
      .set({
        name,
        email,
        age,
        location,
        role,
      })
      .where(eq(userTable.id, id))
      .returning({
        userName: userTable.name,
        userEmail: userTable.email,
        userAge: userTable.age,
        userLocation: userTable.location,
        userRole: userTable.role,
      });

    if (!updateUserWithId) {
      res.status(400).json({
        message: "Failed to updated the user please try again",
      });
    }

    res.status(200).json({
      message: "User updated Successfully!",
      data: updateUserWithId,
    });
  },
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "You must provide the right id",
      });
      return;
    }

    const exists = await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });

    if (!exists) {
      res.status(404).json({
        message: "user with that id not found!",
      });
      return;
    }
    res.status(200).json({
      message: "User found Successfully!",
      data: exists,
    });
    return;
  },
);
