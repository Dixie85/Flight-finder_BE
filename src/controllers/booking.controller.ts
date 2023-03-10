import { Request, Response } from "express";
import { close, connect } from "../../db/mongo.config";
import { IBooking, IItineraries } from "../types/types";
import { Booking } from "../../db/models/booking.models";
import { Itineraries } from "../../db/models/flight.models";


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
    const flights = await connect(() => Itineraries.findOne({flight_id: req.body.flight_id},{_id:0}).lean()) as IItineraries;
    await connect(() => Itineraries.updateOne({ flight_id: req.body.flight_id }, { availableSeats: flights.availableSeats! - 1 })) as IItineraries;
    console.log(flights, 'flight');
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
