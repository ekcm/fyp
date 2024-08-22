import { Injectable } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { PortfolioCalculatorService } from "./portfolioCalculator.service";
import { Portfolio } from "src/model/portfolio.model";


export type DashboardCard = {
    clientName: string,
    portfolioName: string,
    riskAppetite: string,
    totalValue: number,
    absolutePnl: number,
    absoluteDailyPnl: number,
    percentagePnl: number,
    percentageDailyPnl: number,
    // alertsPresent: boolean
}

@Injectable()
export class CoreService {
    constructor(private portfolioService: PortfolioService, private portfolioCalculatorService: PortfolioCalculatorService) { }


    async loadHomepage(): Promise<DashboardCard[]> {
        // const portfolios: Portfolio[] = await this.portfolioService.getByManager(managerId)
        const portfolios: Portfolio[] = await this.portfolioService.getAll()
        const portfolioCards: DashboardCard[] = []


        for (const portfolio of portfolios) {

            const portfolioCalculations = await this.portfolioCalculatorService.calculatePortfolioValue(portfolio)

            var clientName: string = portfolio.client
            var portfolioName: string = portfolio.portfolioName
            var riskAppetite: string = portfolio.riskAppetite
            var totalValue: number = portfolioCalculations.totalValue
            var absolutePnl: number = portfolioCalculations.absolutePnl
            var absoluteDailyPnl: number = portfolioCalculations.absoluteDailyPnl
            var percentagePnl: number = portfolioCalculations.percentagePnl
            var percentageDailyPnl: number = portfolioCalculations.percentageDailyPnl
            // var alertsPresent: boolean = portfolio.alerts

            portfolioCards.push({
                clientName: clientName,
                portfolioName: portfolioName,
                riskAppetite: riskAppetite,
                totalValue: totalValue,
                absolutePnl,
                absoluteDailyPnl,
                percentagePnl,
                percentageDailyPnl,
                // alertsPresent
            });
        }
        return portfolioCards
    }
}