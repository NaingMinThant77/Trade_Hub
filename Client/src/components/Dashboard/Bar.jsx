import { GiftIcon } from '@heroicons/react/24/outline';
import { BarList, Card } from '@tremor/react';

export function Bar({ products }) {
    const categoryCount = {}

    products.forEach(product => {
        const productCategory = product.category

        if (!categoryCount[productCategory]) {
            categoryCount[productCategory] = 0
        }
        categoryCount[productCategory] += 1
    })

    const data = Object.entries(categoryCount).map(([key, val]) => ({
        name: key.toUpperCase().replaceAll("_", " "),
        value: val,
    }));

    return (
        <Card className="mx-auto w-full mt-6 ">
            <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Product Count By Categories</h3>
            <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
                <span>Category</span>
                <span>Count</span>
            </p>
            <BarList data={data} className="mt-2" />
        </Card>
    );
}