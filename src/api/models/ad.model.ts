import {Document, model, Model, Schema} from "mongoose";

export interface IAd extends Document {
    id: string;
    description: string;
    imageUrl: string;
    targeting: ITargeting;
}

export interface ITargeting extends Document {

    location: ILocation;
    operatingSystems: [string];
    browsers: [string];
    tags: [string];
}

export interface ILocation extends Document {
    lat: number;
    long: number;
    radius: number;
}

const AdSchema: Schema = new Schema({


    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    targeting: {
        location: {
            lat: {
                type: Number
            },
            long: {
                type: Number
            },
            radius: {
                type: Number
            }
        },
        tags: [String],
        operatingSystems: [String],
        browsers: [String],
    },


});

export const Ad: Model<IAd> = model('Ad', AdSchema);

