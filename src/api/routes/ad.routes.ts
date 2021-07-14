import {Router} from "express";
import {addToQueue, getAds, getBest} from "../controllers/ad.controller";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {GetAllAdsDTO} from "../dto/ad/getAllAdsDTO";
import {CreateAdDTO} from "../dto/ad/CreateAdDTO";

export const router = Router()
    .post('/', validationMiddleware(CreateAdDTO), addToQueue)
    .get('/', validationMiddleware(GetAllAdsDTO), getAds)
    .get('/best', validationMiddleware(GetAllAdsDTO), getBest)
