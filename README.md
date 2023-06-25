A React Native-based app to track the timeliness of Capitol Corridor trains running between San Jose/Oakland and Sacramento/Auburn.

The app allows the user to input a train number, and then if it's a valid train number at the time, it will fetch all of the stations (origin station at the top, destination station at the bottom) and display them. A color indicator on the right indicates the timeliness of the train. To refresh data, pull down on the list. Click on a tile, and there will be a dropdown indicating the arrival status of the train (whether or not it arrived and timeliness). There also information blubs on the bottom of each station panel stating the arrival time and status.

Green indicates that the train is on time. Yellow indicates that the train is at most 15 minutes late. Red indicates that the train is over 15 minutes late. Blue indicates that the train is early.
