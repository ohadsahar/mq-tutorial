import {Router} from 'express'
import {router as AdRoutes} from '../routes/ad.routes';

const APIRouter = Router({mergeParams: true});

APIRouter.use('/ads', AdRoutes);

export default APIRouter;
