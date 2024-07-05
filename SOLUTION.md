# Solution

## Project
Tools used: `Node.js`, `express`, `mongodb`, `mongoose`

This app is an attempt to build the MVP of calander booking app. Where a user can create calendars, set availablity and make a booking on a calendar.

Project's directory structure:
```
.
├── app.js
├── config.env
├── controllers
│   ├── bookingController.js
│   ├── calendarController.js
│   └── userController.js
├── models
│   ├── bookingModel.js
│   ├── calendarModel.js
│   └── userModel.js
├── routes
│   ├── bookingRoutes.js
│   ├── calendarRoutes.js
│   └── userRoutes.js
├── server.js
└── package.json
```

## Assumption & limitations
1. User can set his availablity: availablity start & end will be a date object and non-repeating events are assumed.
2. Showing own availablity: getting calander document will show an array of start and end time.
3. Finding overlap in schedule(assuming booking): assuming we need to find if there is any overlap in bookings comparing two calanders
4. A booking might have participants which will be another user's id. Not mandatory though.
5. We are just going will bare minimum fields for schema and not meta fileds. For example, we are not putting visiblity & icons etc for calendar.
6. Timezone is not handled. All the parsing of date should be handled at client side.
7. Nothing is behind authentication or authorization. Every API is accessibly with right payload and params.
8. We are not using advance query features like filter, sort, and pagination etc. Validations are minnimal too.

## Database Schemas & Modelling
We have three main resources here.
1. User
2. Calander
3. Booking

Here is the schema for each:
```json
// User Schema
{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
```

Here is the schema for each
```json
// Calendar Schema
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    availability: [
        {
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}
```

Here is the schema for each
```json
// Booking Schema
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    calendar: {
        type: Schema.Types.ObjectId,
        ref: 'Calendar',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
```

## Setup
Setup Requirements: `node.js >= 16, npm`

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
```json
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

`GET:` `/api/v1/calendars/find-bookings-overlap/:calId1/:calId2`


Reference data payload for body
```json
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
```json
{
    "name": "Work Calendar",
    "description": "My work schedule",
    "user": "userId",
    "calendar": "calendarId",
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


