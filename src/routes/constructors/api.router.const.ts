import {Router} from "express";
import booking from "../APIs/booking.routes";
import flight from "../APIs/flight.routes";
import user from "../APIs/user.routes";

export const api = Router()

api.use(flight)

api.use(user)

api.use(booking)

export default api