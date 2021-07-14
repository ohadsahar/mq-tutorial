import {IsNumber} from "class-validator";
import {Type} from "class-transformer";

export class GetAllAdsDTO {

    @IsNumber()
    @Type(() => Number)
    lat: number;

    @IsNumber()
    @Type(() => Number)
    long: number;
    tag: Array<string>;

    operatingSystem: string;

    browser: string;
}
