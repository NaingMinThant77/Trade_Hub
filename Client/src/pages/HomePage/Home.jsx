import { useState, useEffect } from 'react'
import Card from '../../components/HomePage/Card'
import Filter from '../../components/HomePage/Filter'
import Hero from '../../components/HomePage/Hero'
import { getAllProducts } from '../../apicalls/public'
import { message, Pagination } from 'antd'

import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from "../../store/slices/loaderSlice"
import { RotatingLines } from "react-loader-spinner"
import { getSavedProducts } from '../../apicalls/product'

const Home = () => {
    const [products, setProducts] = useState([])
    const [savedProducts, setSavedProducts] = useState([])

    const dispatch = useDispatch()
    const { isProcessing } = useSelector(state => state.reducer.loader)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const getProducts = async (page = 1, perPage = 6) => {
        dispatch(setLoader(true))
        try {
            const response = await getAllProducts(page, perPage);
            if (response.isSuccess) {
                setProducts(response.productDocs)
                setCurrentPage(response.currentPage)
                setTotalPages(response.totalPages)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
        dispatch(setLoader(false))
    }

    const getAllProductsSaved = async () => {
        dispatch(setLoader(true))
        try {
            const response = await getSavedProducts();
            if (response.isSuccess) {
                setSavedProducts(response.productDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            console.error(err.message)
        }
        dispatch(setLoader(false))
    }

    useEffect(() => {
        getProducts(1, 6)
        getAllProductsSaved()
    }, [])

    const handlePagination = (page, perPage) => {
        getProducts(page, perPage)
    }

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
                </div> : <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto'>
                        {
                            products.length > 0 ? products.map((product) => (
                                <Card key={product._id} product={product} savedProducts={savedProducts} />
                            )) : <div className='flex items-center justify-center text-2xl font-bold text-gray-600'>No products yet</div>
                        }
                    </div>
                    <div className='flex mt-10 justify-end max-w-5xl mx-auto'><Pagination current={currentPage} total={totalPages * 6} pageSize={6} onChange={handlePagination} /></div>
                </>
            }
        </section>
    )
}

export default Home