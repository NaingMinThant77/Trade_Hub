import { GiftIcon } from '@heroicons/react/24/outline';
import { BarList, Card } from '@tremor/react';

const data = [
    {
        name: 'Twitter',
        value: 456,
        icon: GiftIcon
    },
    {
        name: 'Google',
        value: 351,
    },
    {
        name: 'GitHub',
        value: 271,
    },
    {
        name: 'Reddit',
        value: 191,
    },
    {
        name: 'Youtube',
        value: 91,
    },
];

export function Bar() {
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