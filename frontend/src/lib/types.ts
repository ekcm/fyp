interface PortfolioItem {
    portfolioId: string;
    clientName:  string;
    portfolioName: string;
    totalValue: number;
    riskAppetite: string;
    dailyPL: number;
    dailyPLPercentage: number,
    totalPLPercentage: number,
    totalPL: number;
    rateOfReturn: number;
    alertsPresent: boolean;
}

interface FinanceNewsItem {
    id: string;
    ticker: string;
    date: Date;
    sentimentRating: number;
    summary: string;
    references: string[];
};

interface PortfolioAnalysis {
  totalAssets: number;
  cashAmount: number;
  securitiesValue: number;
  dailyPL: number;
  dailyPLPercentage: number;
  totalPL: number;
  totalPLPercentage: number;
  annualizedRoR: number;
};

interface PortfolioBreakdown {
    industry: { [key: string]: number | undefined}[];
    geography: { [key: string]: number | undefined}[];
    securities: { [key: string]: number | undefined}[];
};

interface PortfolioHoldings {
  name: string;
  ticker: string;
  type: string;
  geography: string;
  position: number;
  market: number;
  last: number;
  cost: number;
  totalPL: number;
  totalPLPercentage: number;
  dailyPLPercentage: number;
  dailyPL: number;
  positionsRatio: number;
};

interface PortfolioHoldingsDifference {
  name: string;
  ticker: string;
  type: string;
  geography: string;
  position: number;
  market: number;
  last: number;
  cost: number;
  totalPL: number;
  dailyPL: number;
  positionsRatio: number;
  difference: number;
};

interface PortfolioHoldingDifference {
    ticker: string;
    name: string;
    last: number;
    position: number;
    difference: number;
    market: number;
    cost: number;
}

interface OrderExecutionProgress {
  name: string;
  ticker: string;
  position: number;
  last: number;
  price: number;
  orderType: string;
  orderStatus: string;
  orderDate: Date;
};

interface PortfolioData {
  portfolioId: string;
  portfolioName: string;
  clientName: string;
  portfolioAnalysis: PortfolioAnalysis;
  breachedRules: RuleReport;
  triggeredAlerts: Alert[];
  portfolioBreakdown: PortfolioBreakdown;
  portfolioHoldings: PortfolioHoldings[];
  orderExecutionProgress: OrderExecutionProgress[];
};

// Orders Checkout component
interface AssetsItem {
  id: string,
  name: string;
  ticker: string;
  type: string;
  geography: string;
  position: number;
  market: number;
  last: number;
  cost: number;
  orderType: string;
};

interface AddTransactionDataType {
    type: string;
    ticker: string;
    cost: number;
    position: number;
    orderType: string;
}

interface Asset {
  id: string;
  ticker: string;
  name: string;
  type: string;
  geography: string;
  industry: string;
}

interface intermediateAssetHoldings extends apiAssetHolding {
  orderType: string;
}

// API CALL TYPES
// Define the interface for the asset holdings
interface apiAssetHolding {
  ticker: string;
  cost: number;
  quantity: number;
  assetType: string;
}

interface CreateOrderItem {
  orderType: string;
  assetName: string;
  quantity: number;
  price: number;
  portfolioId: string;
}

// Define the interface for the form parameter
interface CreatePortfolioForm {
  client: string;
  portfolioName: string;
  riskAppetite: string;
  cashAmount: number;
  assetHoldings: apiAssetHolding[];
  manager: string;
  exclusions: string[];
}

interface GeneratedInsight {
    title: string;
    content: string;

}
interface NestedInsight {
    subtitle: string;
    content: string;
}
interface NestedSummary {
    [key: string]: string | object[]
}
interface GeneratedSummary {
    title: string
    content: string | NestedSummary
}

interface FinanceNewsCard {
    id: string;
    company: string;
    ticker: string;
    date: Date;
    sentimentRating: number;
    introduction: string;
}
interface NewsArticle {
    id: string;
    company: string;
    ticker: string;
    date: Date;
    sentimentRating: number;
    insights: GeneratedInsight[];
    references: string[];
}

interface Alert {
  id: string;
  ticker: string;
  date: Date;
  sentimentRating: number;
  introduction: string;
  assetName: string;
}

interface OptimisedPortfolio {
  portfolioId: string,
  proposedHoldings: ClassicOrder[],
  orders: ClassicOrder[]
}
interface OptimiserOrders {
  orderType: string;
  orderDate: Date;
  assetName: string;
  quantity: number;
  price: number;
  portfolioId: string;
  orderStatus: string;
}

// Add attribute for ticker name
interface ClassicOrder extends OptimiserOrders {
  company: string;
  last: number;
}

// rules types
interface UpdateRule {
    ruleType: RuleType;
    rule: any;
    changeMessage: string;
}

export enum RuleType {
    MIN_CASH = 'MIN_CASH',
    MAX_CASH = 'MAX_CASH',
    RISK = 'RISK',
    EXCLUSIONS = 'EXCLUSIONS'
}

interface BreachedRule {
    ruleType: RuleType;
    breachMessage: string;
}

interface UpdateRule {
    ruleType: RuleType;
    rule: any;
    changeMessage: string;
}

interface RuleReport {
  breachedRules: BreachedRule[];
  recommendation: string;
  news?: {buy?: Alert[], sell?: Alert[]};
}


interface RuleLog {
  description: string;
  managerId: string;
  portfolioId: string;
  ruleType: RuleType;
  timestamp: Date;
  changeMessage: string;
}

export type {
    PortfolioItem,
    FinanceNewsItem,
    PortfolioAnalysis,
    PortfolioBreakdown,
    PortfolioHoldings,
    PortfolioHoldingsDifference,
    PortfolioHoldingDifference,
    OrderExecutionProgress,
    PortfolioData,
    AssetsItem,
    AddTransactionDataType,
    Asset,
    GeneratedInsight,
    NestedInsight,
    GeneratedSummary,
    NestedSummary,
    FinanceNewsCard,
    NewsArticle,
    Alert,
    OptimisedPortfolio,
    OptimiserOrders,
    ClassicOrder,
    // rules
    UpdateRule,
    BreachedRule,
    RuleLog,
    RuleReport,
    intermediateAssetHoldings,
    // API CALL TYPES
    apiAssetHolding,
    CreatePortfolioForm,
    CreateOrderItem,
}