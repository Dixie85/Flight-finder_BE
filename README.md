<div align="center">
  <h1> Flight Finder BE <h1>
</div>

The Flight Finder is a Backend API.
The Tech stack used for this API is Node.js with Express typed in TypeScript. This API connects to a NoSQL MongoDB database using Mongoose. 
The API provides an easy search for finding various flights, both direct and flights with layovers, user registration and booking system.
<br>
<br>
## Use

After cloning the repositoriy, run ... 
```
npm install
npm run dev
```
The applicaton will run on `localhost:8080/`

<br>

## Database

Two json files with sempel data are provided in the `db/jsondata` directory, use them to seed your MongoDB folowing the models in `db/models` directory.
 
<br>

## Routes
<br>

### FLIGHT API

<br>

``` 
POST /api/flight/from
``` 
` 
 { "departureDestination": "Stockholm" }`

  -  This url route will return all possible travel routes for the provided departure destination

---

```
POST /flight/direct
```
`{ 
  "departureDestination": "Oslo" "arrivalDestination": "Stockholm"
}`
  -  Providing departure and arrival destinations will return if found, all possible flight for the desired route

---

```
POST /flight/all 
```
`
{
    "departureDestination": "Oslo",
    "arrivalDestination": "Amsterdam",
    "date":"2023-03-29"
}
`
  - Providing departure destinations, arrival destinations and date included this url route will return not only direct travel routes but even travel routes with layovers.
  ---

<br>


### BOOKING API

``` 
POST /api/booking/bookings
``` 
  -  returns all bokkings records for a particular user  

---
``` 
POST /api/booking/new
``` 
  -  creates new booking entry 

---
``` 
POST /api/booking/delete
``` 
  -  delete a booking

---

<br>

### USER API

```
POST /api/user/add
``` 
  -  Add new user

---

```
POST /api/user/delete
``` 
  -  Delete existing user

---


