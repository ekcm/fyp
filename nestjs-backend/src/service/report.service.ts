import { Injectable } from "@nestjs/common"
import { PortfolioService } from "./portfolio.service"
import { PortfolioBreakdownService } from "./portfolioBreakdown.service"
import { PortfolioReport } from "src/types"
import { AssetHolding } from "src/model/assetholding.model";
import { Order } from "src/model/order.model";
import { OrderService } from "./order.service";

@Injectable()
export class ReportService{
    constructor(private portfolioService: PortfolioService, private portfolioBreakdownService: PortfolioBreakdownService, private orderService: OrderService) { }

    async generateReport(portfolioId: string): Promise<PortfolioReport> {
        var assetsAllocation = new Map<string, AssetHolding>();
        var topHoldings = new Map<string, number>();
        var sectorAllocation = new Map<string, number>();
        var geographyAllocation = new Map<string, number>();
        const portfolio = await this.portfolioService.getById(portfolioId);
        const breakdown = await this.portfolioBreakdownService.loadPortfolio(portfolio);
        const industryArray = breakdown.industry
        const geographyArray = breakdown.geography
        const securitiesArray = breakdown.securities.flatMap(obj =>
            Object.entries(obj).filter(([key, value]) => value !== undefined) as [string, number][]
        );
        const assetHoldingArray = portfolio.assetHoldings
        const sortedSecurities = securitiesArray.sort(([, a], [, b]) => b - a);
        const top3Securities = sortedSecurities.slice(0, Math.max(3, sortedSecurities.length))
        industryArray.forEach(obj => {
            for (const key in obj) {
                const value = obj[key];
                if (value !== undefined) {
                    sectorAllocation.set(key, value);
                }
            }
        })
        
        geographyArray.forEach(obj => {
            for (const key in obj) {
                const value = obj[key];
                if (value !== undefined) {
                    geographyAllocation.set(key, value);
                }
            }
        })

        assetHoldingArray.forEach(assetHolding => {
            assetsAllocation.set(assetHolding.ticker, assetHolding)
        })

        top3Securities.forEach(security => {
            topHoldings.set(security[0], security[1])
        })

        const portfolioSummary = {
            assetsAllocation: Object.fromEntries(assetsAllocation),
            topHoldings: Object.fromEntries(topHoldings),
            overview: "placeholder",
            sectorAllocation: Object.fromEntries(sectorAllocation),
            commentary: "placeholder",
        }

        const portfolioDetails = {
            portfolioName: portfolio.portfolioName,
            portfolioClient: portfolio.client
        }

        const summary = {
            portfolioSummary: portfolioSummary,
            portfolioDetails: portfolioDetails
        }
        return summary
    }

    async generateOrderExecution(portfolioId: string, startDate: Date, endDate: Date): Promise<Order[]> {
        return await this.orderService.getByIdAndDateRange(portfolioId, startDate, endDate)
    }
}