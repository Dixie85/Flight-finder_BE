import {  Request, Response } from "express";
import { close, connect } from "../../db/mongo.config";
import {  IUser } from "../types/types";
import { Users } from "../../db/models/user.models";

export const addUser = async (req: Request, res: Response) : Promise<any> => {
  try {
    const userExist = await connect(() => Users.findOne({email: req.body.email }).lean()) as IUser;
    if (userExist) {
      close()
      return res.status(403).json({message: `User ${req.body.email} already exists`})
    }
    await connect(() => Users.create({...req.body})) as IUser;
    close();
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error)
  }  
}

export const deleteUser = async (req: Request, res: Response) : Promise<any> => {
  try {
    await connect(() => Users.deleteOne({email: req.body.email }).lean()) as IUser;
    close()
    return res.sendStatus(204);
  } catch (error) {
      return res.send(error)
  }
}
