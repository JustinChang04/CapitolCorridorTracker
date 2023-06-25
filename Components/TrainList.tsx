import { FlatList, Text, View, StyleProp, ViewStyle, RefreshControl } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Station } from "amtrak/dist/types";
import TrainListComponent from "./TrainListComponent";
import trainData from "./trainData"

function getLastUpdate():JSX.Element {
  let returnString:string = "Last updated: ";

  const now:Date = new Date();
  const timeZoneOffset:number = now.getTimezoneOffset() / -60;

  if (timeZoneOffset == -7) {
    returnString += now.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "PDT"});
    returnString += " PDT."
  }
  else {
    returnString += now.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "PST"});
    returnString += " PST."
  }

  return <Text style={{textAlign: 'center', fontSize:11, fontStyle: 'italic', paddingVertical: "5%"}}>{returnString}</Text>
}

export default function TrainList(props: {trainNum: number, style:StyleProp<ViewStyle>}) {
  if (props.trainNum === null) {
    return (
      <View style={[props.style, {paddingTop: "70%"}]}>
        <Text>Please select a train number first</Text>
      </View>
    );
  }

  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<Station[] | null>([]);

  let isRefreshing = useRef(false);

  const fetchData = async () => {
    try {
      const train:trainData = new trainData(props.trainNum);
      const stations:Station[] = await train.getStations();
      setStations(stations);

      if (error !== null) {
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.trainNum]);

  if (error) {
    return (
      <View style={[props.style, {paddingTop: "70%"}]}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (<FlatList
          style={{backgroundColor:"white"}}
          data = {stations}
          renderItem = {({item}) => <TrainListComponent station={item}/>}
          keyExtractor = {(item:Station) => item.code}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing.current}
              onRefresh={fetchData}
            />
          }
          ListFooterComponent={getLastUpdate}
          />);
}