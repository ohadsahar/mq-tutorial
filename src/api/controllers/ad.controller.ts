import {Request, Response} from 'express';
import {Container} from "typedi";
import {ResHandlerService} from "../services/res-handler.service";
import {AdService} from "../services/ad.service";
import {plainToClass} from "class-transformer";
import {GetAllAdsDTO} from "../dto/ad/getAllAdsDTO";
import {CreateAdDTO} from "../dto/ad/CreateAdDTO";

const resHandlerService = Container.get(ResHandlerService);
const adService = Container.get(AdService);

export const getAds = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(GetAllAdsDTO, req.query);
        // @ts-ignore
        transformed.browser = req.useragent.browser;
        // @ts-ignore
        transformed.operatingSystem = req.useragent.os;
        const result = await adService.getAds(transformed);
        return resHandlerService.handleSuccess(res, result);
    } catch (error) {
        return resHandlerService.handleError(res, error);
    }
}

export const getBest = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(GetAllAdsDTO, req.query);
        // @ts-ignore
        transformed.browser = req.useragent.browser;
        // @ts-ignore
        transformed.operatingSystem = req.useragent.os;
        const result = await adService.getBestAd(transformed);
        return resHandlerService.handleSuccess(res, result);
    } catch (error) {
        return resHandlerService.handleError(res, error);
    }
}

export const addToQueue = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(CreateAdDTO, req.body);
        const result = await adService.addToQueue(transformed);
        return resHandlerService.handleSuccess(res, result);
    } catch (error) {
        return resHandlerService.handleError(res, error);
    }
}
