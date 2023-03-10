import { addBooking, deleteBooking, getUserBookings } from "../../controllers/booking.controller";
import {Router} from "express";

export const booking = Router()

booking.get("/booking/bookings", getUserBookings);

booking.post("/booking/new", addBooking);

booking.post("/booking/delete", deleteBooking);

export default booking