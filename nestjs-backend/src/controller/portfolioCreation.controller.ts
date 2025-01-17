import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PortfolioCreationService } from '../service/portfolioCreation.service';
import { ProposedPortfolio } from "src/types";

@ApiTags("Portfolio Generation Service")
@Controller("generate")
export class PortfolioCreationController {
    constructor(private portfolioCreationService: PortfolioCreationService) { }

    @Post("/proposal")
    @ApiOperation({ summary: "Generate orders for an optimized portfolio" })
    @ApiQuery({
        name: 'exclusions',
        required: false,
        type: [String],
        description: 'Array of the tickers of excluded assets',
        example: ['AAPL']
    })
    async generateOrders(@Query('clientName') clientName: string, @Query('portfolioName') portfolioName: string, @Query('riskAppetite') riskAppetite: string, @Query('cash') cash: number, @Query('managerId') managerId: string, @Query('exclusions') exclusions: string[] = [], @Query('minCash') minCash: number, @Query('maxCash') maxCash: number): Promise<ProposedPortfolio> {
        const exclusionsArray = Array.isArray(exclusions) ? exclusions : [exclusions];
        return await this.portfolioCreationService.generateOrders(clientName, portfolioName, riskAppetite, cash, managerId, exclusionsArray, minCash, maxCash);
    }

    @Get(":portfolioId")
    @ApiOperation({ summary: "Optimise the current holdings of a portfolio" })
    @ApiParam({
        name: "portfolioId",
        description: "portfolio Id of portfolio",
        required: true,
        example: "66d9ae695e15ad24b5e2053a",
    })
    async optimisePortfolio(@Param('portfolioId') portfolioId: string): Promise<ProposedPortfolio> {
        return await this.portfolioCreationService.optimisePortfolio(portfolioId)
    }
}