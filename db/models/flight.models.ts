import { Schema, model } from 'mongoose';
import { IPrices, IItineraries, IFlight, IRoutes} from '@src/types/types';

const prices = new Schema<IPrices>({
  currency: String,
  adult: Number,
  child: Number,
})

const itineraries = new Schema<IItineraries>({
  flight_id: String,
  departureAt: String,
  arrivalAt: String,
  availableSeats: Number,
  route: String,
  prices: prices,
})

const flightSchema = new Schema<IFlight>({
  route_id: String,
  departureDestination: String,
  arrivalDestination: String,
  itineraries: [itineraries],
})

const routes = new Schema<IFlight>({
  route_id: String,
  departureDestination: String,
  arrivalDestination: String,
})

export const Flight = model<IFlight>('flight', flightSchema)

export const Routes = model<IRoutes>('route', routes)
export const Itineraries = model<IItineraries>('itinerarie', itineraries)