import React, { useState } from 'react'
import { Tabs } from "antd"
import Products from './Products'
import AddProduct from './AddProduct'
import General from './General'

const Index = () => {
    const [activeTabKey, setActiceTabKey] = useState("1")

    const items = [
        {
            key: '1',
            label: 'Products',
            children: <Products />,
        },
        {
            key: '2',
            label: 'Sell Product',
            children: <AddProduct setActiceTabKey={setActiceTabKey} />,
        },
        {
            key: '3',
            label: 'Notification',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '4',
            label: 'General',
            children: <General />,
        },
    ]
    return (
        <Tabs activeKey={activeTabKey} onChange={key => setActiceTabKey(key)} items={items} tabPosition='left' size='large' />
    )
}

export default Index