import {Router} from "express";
import { getAllFlightsFromTo, getAllRoutesFromDepartureDestination, getDirectFlightsFromTo } from "../../controllers/flight.controller";

export const flight = Router()


flight.post("/flight/from", getAllRoutesFromDepartureDestination);

flight.post("/flight/direct", getDirectFlightsFromTo);

flight.post("/flight/all", getAllFlightsFromTo);

export default flight