# Solution

## Approach

## Assumption & limitations

## Database Schemas & Modelling

## Setup
Setup Requirements: `node.js, npm`

Clone the repo. Open the terminal and navigate to the directory where it is cloned. Install dependencies by `npm install`

To config the database, please use config.env file, which is available in the root directory.

To run project, do `npm start`


## REST APIs


User:

`GET:` `/api/v1/user`

`GET:` `/api/v1/user/:id`

`POST:` `/api/v1/user`

`PUT:` `/api/v1/user/:id`

`DELETE:` `/api/v1/user/:id`

Reference data payload for body
```
{
    "username": "John Doe",
    "email": "johndoe@xyz.com"
}
```

Calendar:

`GET:` `/api/v1/calendars`

`GET:` `/api/v1/calendars/:id`

`POST:` `/api/v1/calendars`

`PUT:` `/api/v1/calendars/:id`

`DELETE:` `/api/v1/calendars/:id`

`GET:` `/api/v1/calendars/find-bookings-overlap/:id1/:id2`

Reference data payload for body
```
{
    "name": "Work Calendar",
    "description": "My work schedule",
    "user": "userId",
    "availability": {
        "startTime": "2024-07-05 09:00",
        "endTime": "2024-07-05 19:00"
    }
}
```

Booking:

`GET:` `/api/v1/bookings`

`GET:` `/api/v1/bookings/:id`

`POST:` `/api/v1/bookings`

`PUT:` `/api/v1/bookings/:id`

`DELETE:` `/api/v1/bookings/:id`

Reference data payload for body
```
{
    "name": "Work Calendar",
    "description": "My work schedule",
    "user": "userId",
    "calendar": "calendarId",
    "userId": "userId",
    "startTime": "2024-07-05 09:00",
    "endTime": "2024-07-05 19:00",
    "participants": ["userId"]
}
```

## Response formats
Success:

```json
{
    status: 'success',
    message: 'message', // not always available 
    data: {
        // data payload
    }
}
```

Error:

```json
{
    status: 'error',
    message: 'message', // not always available 
    error: // error stack trace (not always available) 
}
```


