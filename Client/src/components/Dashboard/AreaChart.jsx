import { AreaChart } from '@tremor/react';
import { format } from "date-fns"

export function AreaChartHero({ products }) {
    // get data from last 1 week
    const currentDate = new Date();
    const last1Week = new Date();
    last1Week.setDate(currentDate.getDate() - 7)

    const productDailySellRate = {}

    // calculate products in one week
    products.forEach(product => {
        const productSellDate = new Date(product.createdAt)

        if (productSellDate <= currentDate && productSellDate >= last1Week) {
            const formattedSellDate = format(new Date(productSellDate), "dd/MM")

            if (!productDailySellRate[formattedSellDate]) {
                productDailySellRate[formattedSellDate] = 0;
            }
            productDailySellRate[formattedSellDate] += 1;
        }
    })

    // must be array format
    const chartdata = Object.entries(productDailySellRate).map(([key, val]) => ({
        date: key,
        "Product Sell Rate": val,
    }))

    return (
        <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Product Sell Rate Per Daily</h3>
            <AreaChart
                className="h-80"
                data={chartdata}
                index="date"
                categories={['Product Sell Rate']}
                colors={["blue"]}
                yAxisWidth={60}
            />
        </>
    );
}