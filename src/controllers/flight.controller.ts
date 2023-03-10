import { Request, Response } from "express";
import { close, connect } from "../../db/mongo.config";
import { IItineraries, ILayover, IRoutes } from "../types/types";
import { Routes, Itineraries } from "../../db/models/flight.models";


export const getDirectFlightsFromTo = async (req: Request, res: Response) : Promise<any> => {
  try {
    const departure = req.body.departureDestination;
    const arrival = req.body.arrivalDestination;
    const route = await connect(() => Routes.findOne({departureDestination:departure, arrivalDestination:arrival },{_id:0}).lean()) as IRoutes;
      if (!route) {
        close();
        return res.status(404).json({message: 'No route found for this search'})
      } else {
        close();
        const flights = await connect(() => Itineraries.find({route:route.route_id},{_id:0}).lean()) as IItineraries[];
        close();
        return res.status(200).json({...route ,flights:flights});
      }  
  } catch (error) {
    return res.send(error)
  }
}

export const getAllRoutesFromDepartureDestination = async (req: Request, res: Response) : Promise<any> => {
  try {
    const departure = req.body.departureDestination;
    const routes = await connect(() => Routes.find({departureDestination:departure},{_id:0}).lean()) as IRoutes[];
    if (routes.length <= 0) {
      close();
      return res.status(404).json({message: 'No flights from your desired destination'})
    } 
    close();
    return res.status(200).json(routes);
  } catch (error) {
    return res.send(error)
  }
}


export const getAllFlightsFromTo = async (req: Request, res: Response) : Promise<any> => {
  try {
    const departure = req.body.departureDestination;
    const arrival = req.body.arrivalDestination;
    const date = req.body.date;
    const directRoute = await connect(() => Routes.findOne({departureDestination:departure, arrivalDestination:arrival},{_id:0}).lean()) as IRoutes;
    const routesMatchingDeparture = await connect(() => Routes.find({departureDestination:departure},{_id:0}).lean()) as IRoutes[];
    const routesMatchingArrival = await connect(() => Routes.find({arrivalDestination:arrival},{_id:0}).lean()) as IRoutes[];
    const layoverCitiesAfterFirstFlight = routesMatchingDeparture.map(route => route.arrivalDestination);
    const layoverCitiesBeforeSecondFlight = routesMatchingArrival.map(route => route.departureDestination);

    const layoverConnectionCities  = layoverCitiesAfterFirstFlight.reduce((arr, cityArrival): string[] => {
        const matchCity = layoverCitiesBeforeSecondFlight.find(cityDeparture => cityDeparture === cityArrival)
        return [...arr, matchCity!]
    },[] as string[]);

    const routesWithLayover = layoverConnectionCities.reduce((arr, city): ILayover[] => {
        const firstRoute = routesMatchingDeparture.find(route => route.arrivalDestination === city);
        const secondRoute = routesMatchingArrival.find(route => route.departureDestination === city);
        // const layoverRoute = {
        //   departureDestination:firstRoute?.departureDestination,
        //   layover:city,
        //   arrivalDestination:secondRoute?.arrivalDestination,
        //   firstFlight:firstRoute?.route_id,
        //   secondFlight:secondRoute?.route_id
        // }
        return [...arr, {firstRoute, secondRoute}]
    },[] as ILayover[]);

    if (!directRoute && routesWithLayover.length <= 0) {
      close();
      return res.status(404).json({message: 'No flights found for this search'})
    }

    for (const layover of routesWithLayover) {
      
      layover.routeSearchInfo = { departureFrom: departure, arrivalAt: arrival };
      layover.firstFlight = {};
      layover.secondFlight = {};
      const flight1 = await connect(() => Itineraries.find( { route:{ $in: [ layover.firstRoute!.route_id, layover.secondRoute!.route_id ]}, departureAt: { $regex: date} },{_id:0}).lean()) as IItineraries[];
      const flight2 = await connect(() => Itineraries.find( { route:{ $in: [ layover.firstRoute!.route_id, layover.secondRoute!.route_id ]}, departureAt: { $gt: flight1[0]?.arrivalAt} },{_id:0}).lean()) as IItineraries[];
      if(flight1[0]!.availableSeats! <= 0) {layover.firstFlight.message = "No seats available"};
      if(flight2[0]!.availableSeats! <= 0) {layover.secondFlight.message = "No seats available"}; 
      if(flight1[0]!.availableSeats! > 0) {layover.firstFlight = flight1[0]};
      if(flight2[0]!.availableSeats! > 0) {layover.secondFlight = flight2[0]};
      const arrivalTime = new Date(flight1[0]?.arrivalAt!);
      const departureTime = new Date(flight2[0]?.arrivalAt!);
      //@ts-ignore
      layover.waitingTimeInHours = Math.floor((departureTime - arrivalTime) / (1000 * 60 * 60));  
    }
    close()
    
    if (!directRoute) {
      return res.status(200).json(routesWithLayover);
    } else {
      return res.status(200).json([directRoute, ...routesWithLayover]); 
    } 
  } catch (error) {
    return res.send(error)
  }
}
