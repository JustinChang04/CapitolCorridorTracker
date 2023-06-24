import { FlatList, Text, View, StyleProp, ViewStyle } from "react-native";
import { useEffect, useState } from "react";
import trainData from "./trainData"
import { Station } from "amtrak/dist/types";
import TrainListComponent from "./TrainListComponent";

function renderStationBlock (station:Station) {
  const stationCode:string = station.code;
  const scheduledArrival:string = station.schArr;
  const actualArrival:string = station.arr;

  return <TrainListComponent stationCode={stationCode} schedArr={scheduledArrival} actualArr={actualArrival} />
};

export default function TrainList(props: {trainNum: number, style:StyleProp<ViewStyle>}) {
  if (props.trainNum === null) {
    return (
      <View style={[props.style, {paddingTop: "70%"}]}>
        <Text>Please select a train number first</Text>
      </View>
    );
  }

  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
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
          data = {stations}
          renderItem = {({item}) => renderStationBlock(item)}
          keyExtractor = {(item:Station) => item.code}
          />);
}