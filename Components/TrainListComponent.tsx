import { Station } from "amtrak/dist/types";
import { useRef, useState } from "react";
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback, Easing } from "react-native";

function getDiffMins(schedTime:string, actualTime:string): number {
    //Example time code is 2023-06-20T14:48:00-07:00

    const schedHour:number = parseInt(schedTime.substring(11, 13));
    const actualHour:number = parseInt(actualTime.substring(11, 13));

    const schedMin:number = parseInt(schedTime.substring(14, 16));
    const actualMin:number = parseInt(actualTime.substring(14, 16));

    const hoursDiff: number = actualHour - schedHour;
    const minutesDiff: number = actualMin - schedMin;

    return hoursDiff * 60 + minutesDiff;
}

function getTimelinessMessage(stationName:string, diffMins:number, status:string):string {
    let returnString = "";

    switch(status) {
        case "Enroute":
            returnString += "Will arrive at ";
            break;
        case "Station":
            returnString += "At ";
            break;
        case "Departed":
            returnString += "Departed ";
            break;
        default:
            return "Current status is unknown";
    }

    returnString += stationName + " ";

    if (diffMins === 0) {
        returnString += "on time.";
    }
    else if (diffMins > 0) {
        const delayMins:number = diffMins % 60;
        const delayHours:number = Math.floor(diffMins / 60);

        if (delayHours === 0) {
            returnString += delayMins + ((delayMins === 1) ? " minute late." : " minutes late");
        }
        else {
            returnString += delayHours + ((delayHours === 1) ? " hour " : "hours ");
            returnString += "and " + ((delayMins === 1) ? " minute late." : " minutes late.");
        }
    }
    else {
        diffMins *= -1;
        const earlyMins:number = diffMins % 60;
        const earlyHours:number = Math.floor(diffMins / 60);

        if (earlyHours === 0) {
            returnString += earlyMins + ((earlyMins === 1) ? " minute early." : " minutes early.");
        }
        else {
            returnString += earlyHours + ((earlyHours === 1) ? " hour " : "hours ");
            returnString += "and " + ((earlyMins === 1) ? " minute early." : " minutes early.");
        }
    }

    return returnString;
}

function getColor(diff:number):string {
    //On time
    if (diff === 0) {
        return "green";
    }
    //Between (0, 10] mins late
    else if (diff > 0 && diff <= 15) {
        return "#F6BE00";
    }
    //>10 mins late
    else if (diff > 15) {
        return "red";
    }
    //Early
    else {
        return "#007eb6";
    }
}

export default function TrainListComponent (props: {station:Station}) {
    const timeDiff:number = getDiffMins(props.station.schArr, props.station.arr);
    const color:string = getColor(timeDiff);

    const height:Animated.Value = useRef(new Animated.Value(0)).current;
    const expanded = useRef<boolean>(false);

    const toggleDropdown = () => {
        expanded.current = !(expanded.current);

        if (props.station.code === "OKJ") {
            Animated.timing(height, {
                toValue: ((expanded.current) ? 70 : 0),
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();
        }
        else {
            Animated.timing(height, {
                toValue: ((expanded.current) ? 50 : 0),
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();
        }
    }

    //Create a dropdown list later
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={toggleDropdown}>
                <View style={styles.mainContainer}>
                    <Text>{props.station.code}</Text>
                    <View style={[{backgroundColor: color}, styles.timelinessIndicator]}/>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View style={{height:height, paddingLeft: 10}}>
                <Text style={{paddingTop: "5%"}}>{getTimelinessMessage(props.station.name, timeDiff, props.station.status)}</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor:"white",
        width: "100%",
        paddingTop: 10
    },
    mainContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10
    },
    timelinessIndicator: {
        width:20,
        height:10,
        borderRadius:10
    }
});