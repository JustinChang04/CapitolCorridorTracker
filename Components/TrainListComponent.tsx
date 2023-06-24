import { StyleSheet, View, Text } from "react-native";

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

export default function TrainListComponent (props: {stationCode:string, schedArr:string, actualArr:string}) {
    const timeDiff:number = getDiffMins(props.schedArr, props.actualArr);
    const color:string = getColor(timeDiff);

    //Create a dropdown list later
    return (
        <View style={styles.container}>
            <Text>{props.stationCode}</Text>
            <View style={{backgroundColor: color, width:20, height:10, borderRadius:999}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
});