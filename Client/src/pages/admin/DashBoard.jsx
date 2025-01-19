import { useEffect, useState } from "react"
import { AreaChartHero } from "../../components/Dashboard/AreaChart"
import { Bar } from "../../components/Dashboard/Bar"
import Card from "../../components/Dashboard/Card"
import { BanknotesIcon, UserGroupIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

const DashBoard = ({ products, users }) => {
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
                <Card title={"Total Sales"} count={`${totalSales} MMK`} icon={BanknotesIcon} note={"MMK"} />
                <Card title={"Active Users"} count={userCount} icon={UserGroupIcon} note={"user"} />
                <Card title={"Products"} count={productCount} icon={ShoppingCartIcon} note={"item"} />
            </div>
            <AreaChartHero products={products} />
            <Bar products={products} />
        </section>
    )
}

export default DashBoard