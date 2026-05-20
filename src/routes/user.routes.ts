import {
  deleteUserById,
  getUserById,
  getUsers,
  insertUser,
  updateUser,
} from "../controller/user.controller.ts";
import express from "express";

const router = express.Router();

router.post("/add", insertUser);
router.get("/add", getUsers);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUser);
router.get("/:id", getUserById);
export default router;
