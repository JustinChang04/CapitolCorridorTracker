import { StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import TrainList from './Components/TrainList';

const inBounds = (trainNum: number):boolean => {
  return (trainNum >= 520 && trainNum <= 553) || (trainNum >= 720 && trainNum <= 751);
}


//Navigator is causing issues
export default function App() {
  const [trainNum, setTrainNum] = useState<number | null>(null);
  let trainNumString = '';

  const updateTrainNum = () => {
    Keyboard.dismiss();

    if (trainNumString.length === 0) {
      Alert.alert('No number entered', 'Please enter a number', [
        {
          text: "Ok"
        }
      ]);
      return;
    }

    const parsed:number = parseInt(trainNumString);

    if (isNaN(parsed)) {
      Alert.alert('Not a number', 'Please enter a number', [
      {
        text: 'Ok',
      }]);
      return;
    }

    if (!inBounds(parsed)) {
      Alert.alert('Not a valid train number', 'Please enter a number between 520-553 or 720-751', [
        {
          text: 'Ok'
        }
      ])
      return;
    }

    setTrainNum(parsed);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Text style={styles.heading}>Capitol Corridor Tracker</Text>
        <View style={styles.topBar}>
          <View style={{ width:"70%", flexDirection: "row", alignItems: 'flex-start'}}>
            <Text>Train Number: </Text>
            <TextInput
              style={{borderBottomColor: 'black', borderBottomWidth: 1, width: "65%", paddingBottom: 2}}
              keyboardType='numeric'
              placeholder='Number'
              maxLength={3}
              onChangeText={(text) => {trainNumString = text;}}/>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={updateTrainNum}>
              <Text style={{padding:5}}>Enter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <TrainList trainNum={trainNum} style={styles.trainList}/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 5,
    height: "100%",
    flexDirection: 'column',
  },
  heading: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    marginBottom: "5%"
  },
  topBar: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width:"23%",
    backgroundColor: "#007eb6",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  trainList: {
    alignItems: "center"
  }
});