import { useEffect, useState } from "react"
import { AreaChartHero } from "../../components/Dashboard/AreaChart"
import { Bar } from "../../components/Dashboard/Bar"
import Card from "../../components/Dashboard/Card"
import { BanknotesIcon, UserGroupIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

const DashBoard = ({ products, users, pendingProducts, setActiceTabKey }) => {
    const [totalSales, setTotlaSales] = useState(0)
    const [productCount, setProductCount] = useState(0)
    const [userCount, setUserCount] = useState(0)

    const calculateTotalSales = () => {
        const totalAmount = products.reduce((a, b) => {
            return a + Number(b.price)
        }, 0)
        setTotlaSales(totalAmount)
        setUserCount(users.length)
    }

    useEffect(() => {
        if (products.length) {
            calculateTotalSales()
            setProductCount(products.length)
        }
    }, [products])
    return (
        <section>
            <div className="flex items-center gap-6 mt-2 mb-4">
                <div className="w-full"><Card title={"Total Sales"} count={`${totalSales} MMK`} icon={BanknotesIcon} note={"MMK"} /></div>
                <div onClick={() => { setActiceTabKey("3") }} className="w-full"><Card title={"Active Users"} count={userCount} icon={UserGroupIcon} note={"user"} /></div>
                <div onClick={() => { setActiceTabKey("2") }} className="w-full"><Card title={"Products"} count={productCount} icon={ShoppingCartIcon} note={"item"} /></div>
                <div onClick={() => { setActiceTabKey("2") }} className="w-full"><Card title={"Pending"} count={pendingProducts} icon={ShoppingCartIcon} note={"pending"} /></div>
            </div>
            <AreaChartHero products={products} />
            <Bar products={products} />
        </section>
    )
}

export default DashBoard