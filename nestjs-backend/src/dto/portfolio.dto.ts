import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { RiskAppetite } from "../model/portfolio.model";
import { AssetHoldingDto } from "./assetholding.dto";
import { PortfolioRules } from "src/types";

export class PortfolioDto {
    @IsNotEmpty()
    @IsString()
    client: string;

    @IsNotEmpty()
    @IsString()
    portfolioName: string;

    @IsNotEmpty()
    @IsEnum(RiskAppetite)
    riskAppetite: RiskAppetite;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    cashAmount: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AssetHoldingDto)
    @IsOptional()
    assetHoldings: AssetHoldingDto[]

    @IsNotEmpty()
    @IsString()
    manager: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    exclusions: string[];

    @IsNotEmpty()
    @IsObject()
    rules: PortfolioRules;
}