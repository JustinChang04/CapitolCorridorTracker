# Introduction
An app to track the timeliness of Capitol Corridor trains running between San Jose/Oakland and Sacramento/Auburn. I built this app using React Native as the framework. I used [Amtrak.js](https://github.com/piemadd/amtrak) to fetch live train data from Amtrak.

## Disclaimer
This app has no relation to Amtrak.

## Usage
The app prompt the user to enter a valid train number before showing any data.  
If there is a train running with that ID number, then the app will show a list of station card, sorted from top to bottom by origin to destination.  
Each station card will have information on the train's respective arrival time and arrival/departure status.  
Clicking on a station card will show delay time and arrival/departure status.

## After Cloning
This app was created with `npx create-expo-app`. After cloning this repository, add a folder called 'node_modules', and run `npm install`. This will install all of the missing folders necessary for this app.
