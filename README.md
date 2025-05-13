This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Setup Instructions
This is a standard full stack react app. 

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0) or newer
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)


### Running the Backend API

1) Navigate to the ATM.API project directory. (or open in Visual Studio)
2) Run the API using dotnet run, or run via Visual Studio (opening Swagger if in debug mode)
3) The API will start on https://localhost:7237 (or a similar port)


### Running the Frontend

1) Check that the port in src/services/api.js matches the port for your backend API. Something like:
    const API_BASE_URL = 'https://localhost:YOUR PORT/api';
2) Navigate to the atm-client directory.
3) Install dependencies with npm install
4) Start the client with npm start
5) The application will open in your browser at http://localhost:3000

If the page starts but doesn't have any account information, double check that the back end is running

### No database required, as we are using EntityFramework.InMemory to simulate data persistence



### NOTES ABOUT TRADEOFFS

I spent abooout 4 hours on this. Some tradeoffs were made for the sake of time. In an ideal world, I would have made the following improvements.
 1) Creating a service for transaction logic, as well as one for recording transactions. 
    This would allow for DRYing up the repeated code in the accounts controller
 2) Making return types for the routes into DTOs, instead of anonymous objects.
 3) Enumerators instead of strings for things like "TransactionType".  
 4) JS Alerts for successful transactions and errors should be replaced by custom component
 5) Logging for failed transactions
 6) Account names displayed for transfers in Transaction History (instead of just account 1 and account 2)
 7) Fixing known bugs like a display glitch, where $1.60 shows as $1.6 inside of the transaction modals
 8) Additional features like ATM fees and user pin


 ### NOTES ABOUT AI USAGE

I used Claude 3.7 Sonnet to help code this project. I used it to help set up some initial scaffolding, especially with React, which I am less familiar with. I additionally consulted with Claude on syntax throughout the project, and occasionally asked its advice about which patterns to use in certain situations. As an example, I was unfamiliar with EntityFramework.InMemory until claude suggested it as a light weight way to emulate a real database. Some React code, especially JSX was written by Claude, but all was reviewed by me.

All CSS was written by Claude. I can write CSS, but I decided that a sensible tradeoff would be to let Claude handle all styling. I did not review the CSS except for some very small changes I had to make manually when adding and renaming components.



