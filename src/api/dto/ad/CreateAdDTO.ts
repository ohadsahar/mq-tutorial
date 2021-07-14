import {IsArray, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateAdDTO {

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;

    targeting: TargetingDTO;
}

export class TargetingDTO {

    location: LocationDTO;

    @IsArray()
    operatingSystems: Array<string>;

    @IsArray()
    browsers: Array<string>;

    @IsArray()
    tags: Array<string>;
}

export class LocationDTO {

    @IsNumber()
    @Type(() => Number)
    lat: number;

    @IsNumber()
    @Type(() => Number)
    long: number;

    @IsNumber()
    @Type(() => Number)
    radius: number;
}
