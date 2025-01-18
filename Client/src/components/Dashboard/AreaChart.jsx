import { AreaChart } from '@tremor/react';

const chartdata = [
    {
        year: 1970,
        'Product Sell Rate': 2.00,
    },
    {
        year: 1971,
        'Product Sell Rate': 1.80,
    },
    {
        year: 1972,
        'Product Sell Rate': 1.96,
    },
    {
        year: 1973,
        'Product Sell Rate': 1.93,
    },
    {
        year: 1974,
        'Product Sell Rate': 0.51,
    },
];

const dataFormatter = (number) =>
    `$${Intl.NumberFormat('us').format(number).toString()}`;

export function AreaChartHero() {
    return (
        <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Product Sell Rate Per Daily</h3>
            <AreaChart
                className="h-80"
                data={chartdata}
                index="year"
                categories={['Product Sell Rate']}
                colors={['blue']}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
            />
        </>
    );
}