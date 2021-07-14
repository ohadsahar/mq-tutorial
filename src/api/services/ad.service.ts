import {Service} from "typedi";
import {Ad} from '../models/ad.model';
import {GetAllAdsDTO} from "../dto/ad/getAllAdsDTO";
import {CreateAdDTO} from "../dto/ad/CreateAdDTO";
import {UtilService} from "./util.service";
import {MqService} from "./mq.service";

@Service()
export class AdService {
    constructor(private utilService: UtilService, private mqService: MqService) {
    }

    async getAds(getAllAdsDTO: GetAllAdsDTO) {
        return await this.handleGettingAds(getAllAdsDTO, false);
    }

    async getBestAd(getAllAdsDTO: GetAllAdsDTO) {
        return await this.handleGettingAds(getAllAdsDTO, true);
    }

    async createAd(ad) {
        await Ad.create(ad);
    }

    addToQueue(createAdDTO: CreateAdDTO) {
        const newAd = new Ad(createAdDTO);
        this.mqService.createAdViaMq(newAd);
    }

    async handleGettingAds(getAllAdsDTO: GetAllAdsDTO, bestAd: boolean) {
        //Those lines created cause postman, if using on production those lines can be removed
        getAllAdsDTO.operatingSystem = this.utilService.randomOperationSystem();
        getAllAdsDTO.browser = this.utilService.randomBrowser();

        let filterMatchedAds = await Ad.find({
            'targeting.operatingSystems': {$all: [getAllAdsDTO.operatingSystem]},
            'targeting.browsers': {$all: [getAllAdsDTO.browser]}
        });
        filterMatchedAds = this.utilService.filterAds(filterMatchedAds, getAllAdsDTO.lat, getAllAdsDTO.long);
        return this.utilService.sortAds(filterMatchedAds, getAllAdsDTO.tag, bestAd);
    }
}
