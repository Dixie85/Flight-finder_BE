// Flight interface
export interface IPrices {
  currency: string;
  adult: number;
  child: number;
}

export interface IItineraries {
  flight_id?: string;
  departureAt?: string;
  arrivalAt?: string;
  availableSeats?: number;
  route?: string;
  prices?: IPrices;
  message?: string;
}

export interface IFlight {
  route_id: string;
  departureDestination: string;
  arrivalDestination: string;
  itineraries?: IItineraries[];
}

export interface IRoutes {
  route_id: string;
  departureDestination: string;
  arrivalDestination: string;
}

// export interface ILayover {
  //   departureDestination?: string;
  //   layover?: string;
  //   arrivalDestination?: string;
  //   firstFlight?: string;
  //   secondFlight?: string;
  // }
  
  export interface ILayover {
    firstRoute?: IRoutes,
    secondRoute?: IRoutes,
    firstFlight?: IItineraries,
    secondFlight?: IItineraries
  }
  
  //Booking Interface
  export interface IBooking {
    user_id: string;
    flight_id: string;
    isbooked: boolean;
  }
  
  //User Interface
  export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  