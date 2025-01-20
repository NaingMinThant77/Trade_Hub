import { useState, useEffect } from 'react'
import Card from '../../components/HomePage/Card'
import Filter from '../../components/HomePage/Filter'
import Hero from '../../components/HomePage/Hero'
import { getAllProducts } from '../../apicalls/public'
import { message } from 'antd'

const Home = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const response = await getAllProducts();
            if (response.isSuccess) {
                setProducts(response.productDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <section>
            <Hero />
            <Filter />
            <div className='flex max-w-4xl mx-auto flex-wrap'>
                {
                    products.map(product => (
                        <Card key={product._id} product={product} />
                    ))
                }
            </div>
        </section>
    )
}

export default Home