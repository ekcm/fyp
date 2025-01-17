import React from "react";
import { PortfolioData } from "@/lib/types";
import TriggeredAlert from "./TriggeredAlert";
import PortfolioHoldingsCard from "./PortfolioHoldingsCard";
import OrderExecutionProgressCard from "./OrderExecutionProgressCard";

interface MainPortfolioProps {
  data: PortfolioData;
}

export default function MainPortfolio({ data }: MainPortfolioProps) {
    return (
        <div className="flex flex-col justify-center gap-4 pb-8">
            <TriggeredAlert type="dashboard" data={data.triggeredAlerts} ruleReport={data.breachedRules} />
            <PortfolioHoldingsCard data={data.portfolioHoldings} />
            <OrderExecutionProgressCard data={data.orderExecutionProgress} />
        </div>
    )
}