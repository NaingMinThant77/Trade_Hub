import { Tabs, message } from "antd"
import Products from './Products'
import ManageProduct from './ManageProduct'
import General from './General'

import { useEffect, useState } from "react"
import { getAllProducts } from "../../apicalls/product"

const Index = () => {
    const [activeTabKey, setActiceTabKey] = useState("1")
    const [products, setProducts] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editProductId, setEditProductId] = useState(null)
    const [manageTabKey, setManageTabKey] = useState("1")

    const getProducts = async () => {
        try {
            const response = await getAllProducts()
            if (response.isSuccess) {
                setProducts(response.productDoc)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        if (activeTabKey === "1") {
            setEditMode(false)
            setEditProductId(null)
            setManageTabKey("1") // Reset manageTabKey only when needed
        }
        getProducts()
    }, [activeTabKey])

    const items = [
        {
            key: '1',
            label: 'Products',
            children: <Products products={products} setActiceTabKey={setActiceTabKey} setEditMode={setEditMode} setEditProductId={setEditProductId} getProducts={getProducts} setManageTabKey={setManageTabKey} />,
        },
        {
            key: '2',
            label: 'Manage Product',
            children: <ManageProduct setActiceTabKey={setActiceTabKey} getProducts={getProducts} editMode={editMode} editProductId={editProductId} manageTabKey={manageTabKey} setManageTabKey={setManageTabKey} />,
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
    const onChangeHandler = (key) => {
        setActiceTabKey(key)
        setEditMode(false)
    }
    return (
        <Tabs activeKey={activeTabKey} onChange={onChangeHandler} items={items} tabPosition='left' size='large' />
    )
}

export default Index