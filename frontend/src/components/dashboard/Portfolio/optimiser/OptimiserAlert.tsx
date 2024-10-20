import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/lib/types";
import SentimentRatingCustomBadge from "@/components/financenews/SentimentRatingCustomBadge";
import { Loader2 } from "lucide-react";

interface TriggeredAlertProps {
    data: Alert[];
    error: string | null;
    optimized: boolean;
    loadingState: boolean;
    onOptimise: () => void;
}

const OptimiserAlert = memo(function OptimiserAlert({ data, error, optimized, loadingState, onOptimise }: TriggeredAlertProps) {
    // Filter data for items with sentimentRating 1 or 2
    const breachedAlerts = data.filter((item) => item.sentimentRating === 1 || item.sentimentRating === 2);
    const usefulAlerts = data.filter((item) => item.sentimentRating === 4 || item.sentimentRating === 5);
    if (optimized) {
        if (error) {
            return (
                <Card className="flex flex-col flex-grow items-center justify-center w-full py-4 px-4 bg-red-100 gap-2">
                    <h2 className="text-xl font-medium text-center">There was an issue with the optimization, please try again!</h2>
                    <h3 className="text-md text-gray-600">{error}</h3>
                    <Button className="bg-red-500 w-1/2 font-medium" onClick={onOptimise}>Optimise Portfolio</Button>
                </Card>    
            )
        }
        return (
            <Card className="flex flex-col flex-grow items-center justify-center w-full py-4 px-4 bg-red-100 gap-2">
                <h2 className="text-xl font-medium">Portfolio has been optimised</h2>
                <h3 className="text-md text-gray-600">Track your new orders below before confirming!</h3>
            </Card>
        );        
    }

    return (
        <Card className="flex flex-col w-5/6 h-5/6 items-center justify-center bg-red-100 gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-medium">Breached Alerts:</h2>
                    {breachedAlerts.length === 0 ?
                        <h3 className="text-md text-gray-600">No alerts breached</h3>
                    :
                        <>
                            <h3 className="text-md text-gray-600">Portfolio has breached the following categories:</h3>
                            <ul className="list-disc">
                                {breachedAlerts
                                    .sort((a, b) => a.sentimentRating - b.sentimentRating)
                                    .map((item, index) => (
                                        <li
                                        className="text-gray-600"
                                        key={index}
                                        style={{ listStyleType: 'none' }} 
                                        >
                                            <a href={`/financenews/${item.id}`}>
                                                <div className="grid grid-cols-[1fr_auto] items-center gap-4 hover:bg-gray-300 transition-colors p-1">
                                                        {item.assetName} ({item.ticker})
                                                    <SentimentRatingCustomBadge amount={item.sentimentRating} />
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    }
                </div>
                <div>
                    <h2 className="text-xl font-medium">Useful Alerts:</h2>
                    {usefulAlerts.length === 0 ? 
                        <h3 className="text-md text-gray-600">No useful alerts as of now!</h3>
                    :
                        <ul className="list-disc">
                            {usefulAlerts
                                .sort((a, b) => b.sentimentRating - a.sentimentRating)
                                .map((item, index) => (
                                    <li
                                        className="text-gray-600"
                                        key={index}
                                        style={{ listStyleType: 'none' }} 
                                    >
                                        <a href={`/financenews/${item.id}`}>
                                            <div className="grid grid-cols-[1fr_auto] items-center gap-4 hover:bg-gray-300 transition-colors p-1">
                                                    {item.assetName} ({item.ticker})
                                                <SentimentRatingCustomBadge amount={item.sentimentRating} />
                                            </div>
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    }
                </div>
            </div>
            {loadingState ? 
                <Button className="w-1/2 font-medium" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimising
                </Button>
            : 
                <Button className="bg-red-500 w-1/2 font-medium" onClick={onOptimise}>Optimise Portfolio</Button>
            }
        </Card>
    );
});

export default OptimiserAlert;