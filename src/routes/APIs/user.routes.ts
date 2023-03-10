import { addUser, deleteUser } from "../../controllers/user.controllers";
import {Router} from "express";

export const user = Router()

user.post("/user/add", addUser);

user.post("/user/delete", deleteUser);

export default user