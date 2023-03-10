import { Request, Response } from "express";
import { close, connect } from "../../db/mongo.config";
import { IBooking } from "../types/types";
import { Booking } from "../../db/models/booking.models";


export const getUserBookings = async (req: Request, res: Response) : Promise<any> => {
  try {
    const userBookings = await connect(() => Booking.find({user_id: req.body.user_id})) as IBooking[];
    if(userBookings.length <= 0) {
      close();
      return res.status(404).json({message: "No bookings found"});
    } 
    close()
    return res.status(200).json(userBookings);
  } catch (error) {
    return res.send(error)
  }
}

export const addBooking = async (req: Request, res: Response) : Promise<any> => {
  try {
    await connect(() => Booking.create({...req.body})) as IBooking;
    close()
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error)
  }
}

export const deleteBooking = async (req: Request, res: Response) : Promise<any> => {
  try {
    await connect(() => Booking.deleteOne({ _id: req.body._id })) as IBooking;
    close()
    return res.sendStatus(204);
  } catch (error) {
    return res.send(error)
  }
}
