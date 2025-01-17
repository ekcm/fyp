"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import OrderList from '@/components/dashboard/Portfolio/orderform/orderlist/OrderList';
import { viewPortfolio } from '@/api/portfolio';
import { useEffect, useState } from 'react';
import { PortfolioData } from '@/lib/types';
import Loader from '@/components/loader/Loader';
import NoPortfolio from '@/components/dashboard/Portfolio/NoPortfolio';
import Error from '@/components/error/Error';

export default function GenerateOrderList() {
    const pathname = usePathname();
    const portfolioId = pathname.split("/")[2];
    const searchParams = useSearchParams();
    const ordersParam = searchParams.get('orders');

    const [indivPortfolioData, setIndividualPortfolio] = useState<PortfolioData | null>(null);
    // loaders
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (portfolioId) {
            getIndividualPortfolio(portfolioId);
        }
    }, [portfolioId]); 

    let orders = [];
    if (ordersParam) {
        orders = JSON.parse(ordersParam);
    }

    const getIndividualPortfolio = async (portfolioId: string) => {
        try {
            const portfolioData = await viewPortfolio(portfolioId);
            setIndividualPortfolio(portfolioData);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
            setError('Failed to load portfolio data');
        } finally {
            setLoading(false);
        }
    };

    // loading state
    if (loading) {
        return (
            <Loader />
        );
    }
    if (error) return <Error error={error} />;
    if (!indivPortfolioData) return <NoPortfolio />;

    return (
        <main className="flex flex-col justify-between pt-6 px-24 gap-6">
            <h1 className="text-3xl font-bold">Confirm New Orders</h1>
            <OrderList 
                data={indivPortfolioData} 
                newOrders={orders} 
                triggeredAlerts={indivPortfolioData.triggeredAlerts} 
                ruleReport={indivPortfolioData.breachedRules}
            />
        </main>
    )
}