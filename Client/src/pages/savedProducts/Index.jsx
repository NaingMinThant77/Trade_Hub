import { getSavedProducts } from '../../apicalls/product';
import { useState, useEffect } from "react";
import Card from "../../components/HomePage/Card";

import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from "../../store/slices/loaderSlice"
import { RotatingLines } from "react-loader-spinner"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate()
    const [savedProducts, setSavedProducts] = useState([])

    const dispatch = useDispatch()
    const { isProcessing } = useSelector(state => state.reducer.loader)

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
        getAllProductsSaved()
    }, [])

    return (
        <section>
            <div className="flex justify-between my-2">
                <h1 className="text-2xl font-bold my-4 text-center">Saved Products List</h1>
                <ArrowLeftIcon width={30} height={30} className="text-blue-600 cursor-pointer" onClick={() => { navigate(-1) }} />
            </div>
            {
                isProcessing ? <div className="flex items-center justify-center">
                    <RotatingLines
                        visible={isProcessing}
                        height="50"
                        width="50"
                        color="3b82f6"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {
                        savedProducts && savedProducts.length > 0 ? <>
                            {savedProducts && savedProducts.length > 0 && (
                                savedProducts.map(product => product && <Card product={product.product_id} key={product._id} saved={true} getAllProductsSaved={getAllProductsSaved} />)
                            )}
                        </> : (
                            <p className='font-medium text-red-600 my-2'>No products are saved yet.</p>
                        )
                    }
                </div>
            }
        </section>
    )
}

export default Index