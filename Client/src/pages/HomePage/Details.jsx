import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProductsById } from "../../apicalls/public";
import TradeHub from "../../images/TradeHub.jpg"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from "../../store/slices/loaderSlice"
import { RotatingLines } from "react-loader-spinner"

const Details = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [selectedImage, setSelectedImage] = useState(0)
    const params = useParams();

    const dispatch = useDispatch()
    const { isProcessing } = useSelector(state => state.reducer.loader)
    const { userId } = useSelector(state => state.reducer.user)

    const fineById = async () => {
        dispatch(setLoader(true))
        try {
            const response = await getProductsById(params.id);
            if (response.isSuccess) {
                setProduct(response.productDoc)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
        dispatch(setLoader(false))
    }

    useEffect(() => {
        fineById()
    }, [])

    return (
        <section className={`flex mt-20 ${isProcessing ? "items-center justify-center" : "items-start justify-between"}`}>
            {
                isProcessing ?
                    <RotatingLines
                        visible={isProcessing}
                        height="50"
                        width="50"
                        color="#3b82f6"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    /> : <>
                        {
                            product && product.category && product.seller && <>
                                <div className="w-1/3">
                                    {
                                        product && product.images && product.images.length > 0 ? (
                                            <>
                                                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-96 object-fill object-center border-2 overflow-hidden border-gray-500 rounded-lg" />
                                                <div className="flex items-center gap-3 mt-3">
                                                    {
                                                        product.images.map((i, index) => <div key={i} className={`border-4 overflow-hidden border-blue-500 rounded-lg p-2 ${selectedImage === index && "border-dashed"}`}>
                                                            <img src={i} alt={product.name} className="w-24 h-24 object-cover"
                                                                onClick={() => setSelectedImage(index)} />
                                                        </div>)
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img src={TradeHub} alt={product.name} className="w-full h-96 object-fill object-center border-2 overflow-hidden border-gray-500 rounded-lg" />
                                                <p className="font-medium my-2 text-red-600">This product does not include images.</p></>
                                        )}
                                </div>
                                <div className="w-2/3 px-20">
                                    <div className="flex justify-between">
                                        <div className="w-3/4">
                                            <h1 className="text-3xl font-bold my-1">{product.name}</h1>
                                            <p className="text-gray-500 font-medium leading-6 mb-4">{product.description}</p>
                                        </div>
                                        <ArrowLeftIcon width={30} height={30} className="text-blue-600 cursor-pointer" onClick={() => { navigate(-1) }} />
                                    </div>
                                    <hr />
                                    <h1 className="text-2xl font-semibold my-2">Informations</h1>
                                    <div className="flex justify-between mb-4">
                                        <div className="font-medium space-y-2">
                                            <p>Price</p>
                                            <p>Category</p>
                                            <p>Used For</p>
                                        </div>
                                        <div className="text-gray-600 space-y-2 text-right">
                                            <p>{product.price} Kyats</p>
                                            <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                                            <p>{product.usedFor}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mb-4">
                                        <h1 className="text-2xl font-semibold my-2">Details</h1>
                                        {
                                            product.details.map((d, i) =>
                                                <div className="flex justify-between" key={i}>
                                                    <div className="font-medium space-y-2">
                                                        <p>{d}</p>
                                                    </div>
                                                    <div className="text-gray-600 space-y-2">
                                                        <p>include</p>
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                    <hr />
                                    <h1 className="text-2xl font-semibold my-2">Seller Information</h1>
                                    <div className="flex justify-between mb-4">
                                        <div className="font-medium space-y-2">
                                            <p>Name</p>
                                            <p>E-mail</p>
                                        </div>
                                        <div className="text-gray-600 space-y-2 text-right">
                                            <p>{product.seller.name}</p>
                                            <p>{product.seller.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <h1 className="text-2xl font-semibold my-2">Bids</h1>
                                    {
                                        userId ? <div className="mb-10">
                                            <Form layout="vertical" onFinish={() => { window.alert("Connected") }}>
                                                <Form.Item name="message" label="Text : " rules={[
                                                    { required: true, message: "Message must be included" },
                                                ]} hasFeedback>
                                                    <Input placeholder='Write something ...'></Input>
                                                </Form.Item>
                                                <Form.Item name="phone" label="Phone Number : " rules={[
                                                    { required: true, message: "Phone must be included" },
                                                ]} hasFeedback>
                                                    <Input placeholder='phone number ...'></Input>
                                                </Form.Item>
                                                <div className="text-right">
                                                    <button className="text-white font-medium text-base px-2 py-1 rounded-md bg-blue-600">Submit Message</button>
                                                </div>
                                            </Form>
                                        </div> : <p className="font-medium text-red-600"><Link to={"/login"} className="underline">Login</Link> or <Link to={"/register"} className="underline">Register</Link> to bid this product.</p>
                                    }
                                </div>
                            </>
                        }</>
            }
        </section>
    )
}

export default Details
