import { message, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import Products from './Products'
import Users from './Users'
import { getAllProducts, getAllUsers } from '../../apicalls/admin'
import General from './General'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import DashBoard from './DashBoard'
import { BellAlertIcon, ChartBarIcon, SwatchIcon, UserIcon } from '@heroicons/react/24/outline'
import { getAllNoti } from '../../apicalls/notification'
import Notification from './Notification'

const Index = () => {
    const [activeTabKey, setActiceTabKey] = useState("1")
    const [products, setProducts] = useState([])

    const navigate = useNavigate()
    const { userId } = useSelector(state => state.reducer.user) // from store

    const [users, setUsers] = useState([])
    const [notification, setNotification] = useState([])
    const [pendingProducts, setPendingProducts] = useState(0)

    const getUsers = async () => {
        try {
            const response = await getAllUsers();
            if (response.isSuccess) {
                setUsers(response.userDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
    }

    const getProducts = async () => {
        try {
            const response = await getAllProducts();
            if (response.isSuccess) {
                setProducts(response.productDocs)
                setPendingProducts(response.pendingProducts)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
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

    const isAdmin = () => {
        if (userId.role !== "admin") {
            navigate("/")
        }
    }

    useEffect(() => {
        isAdmin()
        getProducts()
        getUsers()
        getNoti()
    }, [activeTabKey])

    const items = [
        {
            key: '1',
            label: (
                <span className='flex items-start gap-2'>
                    <ChartBarIcon width={20} />
                    Dashboard
                </span>
            ),
            children: <DashBoard products={products} users={users} pendingProducts={pendingProducts} setActiceTabKey={setActiceTabKey} />,
        },
        {
            key: '2',
            label: (
                <span className='flex items-start gap-2'>
                    <SwatchIcon width={20} />
                    Manage Products
                </span>
            ),
            children: <Products />,
        },
        {
            key: '3',
            label: (
                <span className='flex items-start gap-2'>
                    <UserIcon width={20} />
                    Manage Users
                </span>
            ),
            children: <Users />,
        },
        {
            key: '4',
            label: (
                <span className='flex items-start gap-2'>
                    <BellAlertIcon width={20} />
                    Notifications
                    <span className="text-red-600 font-medium">{notification.length}</span>
                </span>
            ),
            children: <Notification notification={notification} />,
        },
        {
            key: '5',
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
    }

    return (
        <section >
            <Tabs activeKey={activeTabKey} onChange={onChangeHandler} items={items} tabPosition='left' size='large' />
        </section>
    )
}

export default Index
