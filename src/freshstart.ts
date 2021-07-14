import {Container} from "typedi";
import {Ad} from "./api/models/ad.model";
import bootstrapDb from "./config/db.config";
import {MqService} from "./api/services/mq.service";
import Logger from "./config/logger.config";

const mqService = Container.get(MqService);
const ads = [
    {
        description: "Toyota - The fastest car in the world",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2017_Toyota_C-HR_%28NGX10R%29_Koba_2WD_hatchback_%282018-08-06%29_01.jpg/560px-2017_Toyota_C-HR_%28NGX10R%29_Koba_2WD_hatchback_%282018-08-06%29_01.jpg",
        targeting: {
            location: {
                "lat": 31.6,
                "long": 34.8,
                "radius": 50
            },
            tags: [
                "travel",
                "europe",
                "france"

            ],
            "operatingSystems": [
                "Windows"
            ],
            browsers: [
                "FireFox",
                "Chrome",
                "Opera"
            ]
        }
    },
    {
        description: "What's That Song From The Heineken Commercial?",
        imageUrl: "https://images.upvenue.com/pics/articles/what-s-that-song-from-the-heineken-commercial-1516.jpg",
        targeting: {
            location: {
                "lat": 31.6,
                "long": 34.8,
                "radius": 50
            },
            tags: [
                "lifestyle",
                "cooking",
            ],
            "operatingSystems": [
                "Windows"
            ],
            browsers: [
                "FireFox",
                "Chrome",
                "Opera"
            ]
        }
    },
    {
        description: "BMW - The fastest car in the world",
        imageUrl: "https://www.bmw.co.il/content/dam/bmw/marketIL/bmw_co_il/All%20models/BMW%202%20Series%20_Overview/Gran_coupe/bmw-2-series-gran-coupe-inspire-ag-sp-xxl.jpg/_jcr_content/renditions/cq5dam.resized.img.1680.large.time1597141303550.jpg",
        targeting: {
            location: {
                "lat": 31.6,
                "long": 34.8,
                "radius": 50
            },
            tags: [
                "travel",
                "asia",
                "jordan"

            ],
            "operatingSystems": [
                "Windows"
            ],
            browsers: [
                "FireFox",
                "Chrome",
                "Opera"
            ]
        }
    },
    {
        description: "BMW - The fastest car in the world",
        imageUrl: "https://www.bmw.co.il/content/dam/bmw/marketIL/bmw_co_il/All%20models/BMW%202%20Series%20_Overview/Gran_coupe/bmw-2-series-gran-coupe-inspire-ag-sp-xxl.jpg/_jcr_content/renditions/cq5dam.resized.img.1680.large.time1597141303550.jpg",
        targeting: {
            location: {
                "lat": 12.6,
                "long": 14.8,
                "radius": 50
            },
            tags: [
                "travel",
                "asia",
                "jordan"

            ],
            "operatingSystems": [
                "Windows"
            ],
            browsers: [
                "FireFox",
                "Chrome",
                "Opera"
            ]
        }
    }
];

async function init() {
    const db = await bootstrapDb();
    if (db) {
        mqService.initMq();
        await createDBInfo();
    }
}

async function createDBInfo() {
    Logger.info('Start Fresh start');
    Logger.info('Start Resenting DB');
    await Ad.deleteMany();
    Logger.info('Resenting DB Successfully Done');
    Logger.info('Creating new ads to db');
    for (const ad of ads) {
        const newAd = new Ad(ad);
        mqService.createAdViaMq(newAd);
    }
    Logger.info('Created The Ads Successfully');
    Logger.info('Finished Fresh start');
}

init();

