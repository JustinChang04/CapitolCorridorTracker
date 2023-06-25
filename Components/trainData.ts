import { Station, TrainResponse, Train } from "amtrak/dist/types";
import { fetchTrain } from "amtrak";

export default class TrainData {
    initializationPromise: Promise<void>;
    stationList: Station[];

    /**
     * Constructor for a class that will hold all data of a train.
     * Assumed that the train number is valid (520-554, 720-751)
     * @param trainNumber the number of the train
     */
    constructor (trainNumber: number) {
        this.initializationPromise = this.initializeData(trainNumber);
    }

    private async initializeData(trainNumber:number):Promise<void> {
        const today:Date = new Date();
        const dayOfMonth:number = today.getUTCDate();
        const trainID:string = trainNumber + "-" + dayOfMonth;

        try{
            const response:TrainResponse = await fetchTrain(trainID);
            if (response[trainNumber] === undefined) {
                throw new Error("No current data on Train " + trainNumber);
            }

            const train:Train = response[trainNumber][0];

            this.stationList = train.stations;
        }
        catch(error) {
            throw new Error(error.message);
        }
    }

    /**
     * Returns a list of stations by code, sorted from origin station to destination station
     * @returns the appropriate list of stations
     */
    public async getStations():Promise<Station[]> {
        try {
            await this.initializationPromise;

            return this.stationList;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}