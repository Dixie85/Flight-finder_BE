import {Router} from "express";
import { getAllFlightsFromTo, getAllRoutesFromDepartureDestination, getDirectFlightsFromTo } from "../../controllers/flight.controller";

export const flight = Router()


flight.get("/flight/from", getAllRoutesFromDepartureDestination);

flight.get("/flight/direct", getDirectFlightsFromTo);

flight.get("/flight/all", getAllFlightsFromTo);

export default flight