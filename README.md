# Introduction
An app to track the timeliness of Capitol Corridor trains running between San Jose/Oakland and Sacramento/Auburn. I built this app using React Native as the framework. I used [Amtrak.js](https://github.com/piemadd/amtrak) to fetch live train data from Amtrak.

## Disclaimer
This app and its creater have no relation to Amtrak.

## Usage
The app will prompt the user to enter a valid train number before showing any data.  
If there is a train running with that ID number, then the app will show a list of station card, sorted from top to bottom by origin to destination.  
Each station card will have information on the train's respective arrival time and arrival/departure status.  
Clicking on a station card will show delay time and arrival/departure status.

## After Cloning
This repository requires [expo](https://docs.expo.dev/get-started/installation/) and [npm](https://www.npmjs.com/package/npm) installed.  

After cloning this repository, add a folder called "node_modules" in the home directory, and then run `npm install`. This will install all of the missing dependencies necessary for this app.
