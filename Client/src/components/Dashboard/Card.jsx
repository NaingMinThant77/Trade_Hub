import { Badge, Card } from '@tremor/react';

export default ({ title, count, icon, note }) => {
    return (
        <Card className="cursor-pointer" decoration={"top"}>
            <div className="flex items-center justify-between">
                <h4 className="text-tremor-default text-tremor-content">{title}</h4>
                <Badge size="xs" icon={icon}>{note}</Badge>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong  font-semibold">{count}</p>
        </Card>
    );
}