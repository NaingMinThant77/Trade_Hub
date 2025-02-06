import { Tabs, message } from "antd"
import Products from './Products'
import ManageProduct from './ManageProduct'
import General from './General'

import { useEffect, useState } from "react"
import { getAllProducts } from "../../apicalls/product"
import { getAllNoti } from "../../apicalls/notification"
import { BellAlertIcon, SquaresPlusIcon, SwatchIcon, UserIcon } from "@heroicons/react/24/solid"
import Notification from "./Notification"

const Index = () => {
    const [activeTabKey, setActiceTabKey] = useState("1")
    const [products, setProducts] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editProductId, setEditProductId] = useState(null)
    const [manageTabKey, setManageTabKey] = useState("1")
    const [notification, setNotification] = useState([])

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

    const getNoti = async (req, res) => {
        try {
            const response = await getAllNoti()
            if (response.isSuccess) {
                setNotification(response.notiDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (activeTabKey === "1") {
            setEditMode(false)
            setEditProductId(null)
            setManageTabKey("1") // Reset manageTabKey only when needed
        }
        getProducts()
        getNoti()
    }, [activeTabKey])

    const items = [
        {
            key: '1',
            label: (
                <span className='flex items-start gap-2'>
                    <SwatchIcon width={20} />
                    Products
                </span>
            ),
            children: <Products products={products} setActiceTabKey={setActiceTabKey} setEditMode={setEditMode} setEditProductId={setEditProductId} getProducts={getProducts} setManageTabKey={setManageTabKey} />,
        },
        {
            key: '2',
            label: (
                <span className='flex items-start gap-2'>
                    <SquaresPlusIcon width={20} />
                    Manage Products
                </span>
            ),
            children: <ManageProduct setActiceTabKey={setActiceTabKey} getProducts={getProducts} editMode={editMode} editProductId={editProductId} manageTabKey={manageTabKey} setManageTabKey={setManageTabKey} />,
        },
        {
            key: '3',
            label: (
                <span className='flex items-start gap-2'>
                    <BellAlertIcon width={20} />
                    Notifications
                    <span className="text-red-600 font-medium">{notification.length}</span>
                </span>
            ),
            children: <Notification notification={notification} getNoti={getNoti} />,
        },
        {
            key: '4',
            label: (
                <span className='flex items-start gap-2'>
                    <UserIcon width={20} />
                    Profile
                </span>
            ),
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