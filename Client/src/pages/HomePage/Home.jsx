import { useState, useEffect } from 'react'
import Card from '../../components/HomePage/Card'
import Filter from '../../components/HomePage/Filter'
import Hero from '../../components/HomePage/Hero'
import { getAllProducts } from '../../apicalls/public'
import { message } from 'antd'

import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from "../../store/slices/loaderSlice"
import { RotatingLines } from "react-loader-spinner"

const Home = () => {
    const [products, setProducts] = useState([])

    const dispatch = useDispatch()
    const { isProcessing } = useSelector(state => state.reducer.loader)

    const getProducts = async () => {
        dispatch(setLoader(true))
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
        dispatch(setLoader(false))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <section>
            <Hero setProducts={setProducts} getProducts={getProducts} />
            <Filter setProducts={setProducts} getProducts={getProducts} />
            {
                isProcessing ? <div className="flex items-center justify-center">
                    <RotatingLines
                        visible={isProcessing}
                        height="50"
                        width="50"
                        color="#3b82f6"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                </div> : <div className='flex max-w-4xl mx-auto flex-wrap'>
                    {
                        products.map(product => (
                            <Card key={product._id} product={product} />
                        ))
                    }
                </div>
            }
        </section>
    )
}

export default Home