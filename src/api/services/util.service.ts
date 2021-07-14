import {Service} from "typedi";

@Service()
export class UtilService {

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    filterAds(filterMatchedAds, lat: number, long: number) {
        filterMatchedAds = filterMatchedAds.filter((currentAd) => this.getDistanceFromLatLonInKm(
            lat, long,
            currentAd.targeting.location.lat, currentAd.targeting.location.long
            ) <= currentAd.targeting.location.radius
        );
        return filterMatchedAds;
    }

    sortAds(filterMatchedAds, userTags: Array<string>, bestAd: boolean) {
        const sortedArray = [];
        for (let i = 0; i < filterMatchedAds.length; i++) {
            const lengthOfSameTags = filterMatchedAds[i].targeting.tags.filter(el => userTags.includes(el)).length;
            sortedArray.push({ad: filterMatchedAds[i], length: lengthOfSameTags});
        }
        sortedArray.sort(function (a, b) {
            return b.length - a.length;
        });
        return bestAd ? sortedArray[0] : sortedArray;
    }

    randomOperationSystem() {
        //Add more for see the query work
        const operationSystems = ["Windows"];
        const random = Math.floor(Math.random() * operationSystems.length);
        return operationSystems[random];
    }

    randomBrowser() {
        //Add more for see the query work
        const browsers = ['Chrome', 'FireFox'];
        const random = Math.floor(Math.random() * browsers.length);
        return browsers[random];
    }
}


