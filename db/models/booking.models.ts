import { Schema, model } from 'mongoose';
import { IBooking } from '@src/types/types';

const bookings = new Schema<IBooking>({
  user_id: String,
  flight_id: String,
  isbooked: Boolean
})

export const Booking = model<IBooking>('booking', bookings)