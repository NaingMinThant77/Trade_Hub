import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProductsById } from "../../apicalls/public";
import TradeHub from "../../images/TradeHub.jpg"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from "../../store/slices/loaderSlice"
import { RotatingLines } from "react-loader-spinner"
import { getAllBids, saveNewBid } from "../../apicalls/bid";

import { formatDistanceToNow } from "date-fns"
import { notify } from "../../apicalls/notification";

const Details = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [selectedImage, setSelectedImage] = useState(0)
    const params = useParams();

    const dispatch = useDispatch()
    const { isProcessing } = useSelector(state => state.reducer.loader)
    const { userId } = useSelector(state => state.reducer.user)

    const [isPlace, setIsPlace] = useState(false);
    const [form] = Form.useForm();

    const [bids, setBids] = useState([]);

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

    const getBids = async () => {
        dispatch(setLoader(true))
        try {
            const response = await getAllBids(params.id);
            if (response.isSuccess) {
                setBids(response.bidDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            console.error(err.message)
        }
        dispatch(setLoader(false))
    }

    useEffect(() => {
        fineById()
        getBids()
    }, [])

    const onFinishHandler = async (values) => {
        setIsPlace(true)
        values.product_id = product._id;
        values.seller_id = product.seller._id
        values.buyer_id = userId._id;

        try {
            const response = await saveNewBid(values);
            if (response.isSuccess) {
                getBids()
                form.resetFields(); //clear form data
                message.success(response.message)

                await notify({ title: "New bid placed.", message: `New bid is placed in ${product.name} by ${userId.name}`, owner_id: product.seller._id, product_id: product._id, phone_number: values.phone })
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
        setIsPlace(false)
    }

    return (
        <section
            className={`flex mt-20 ${isProcessing
                ? "items-center justify-center h-[70vh]"
                : "items-start justify-between gap-10"
                }`}
        >
            {isProcessing ? (
                <RotatingLines
                    visible={isProcessing}
                    height="50"
                    width="50"
                    color="#3b82f6"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            ) : (
                <>
                    {product && product.category && product.seller && (
                        <div className="flex flex-col md:flex-row gap-8 md:mx-auto px-4 md:px-0">
                            {/* LEFT: Images */}
                            <div className="w-full md:w-1/3">
                                {product.images && product.images.length > 0 ? (
                                    <>
                                        <img
                                            src={product.images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-80 md:h-96 object-cover border rounded-xl shadow-sm"
                                        />
                                        <div className="flex items-center gap-3 mt-3 overflow-x-auto">
                                            {product.images.map((i, index) => (
                                                <div
                                                    key={i}
                                                    className={`border-2 rounded-xl p-1 cursor-pointer transition ${selectedImage === index ? "border-blue-600 border-dashed" : "border-gray-300"
                                                        }`}
                                                    onClick={() => setSelectedImage(index)}
                                                >
                                                    <img src={i} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={TradeHub}
                                            alt={product.name}
                                            className="w-full h-80 md:h-96 object-fill object-center border rounded-xl shadow-sm"
                                        />
                                        <p className="font-medium my-2 text-red-600 text-center">
                                            This product does not include images.
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* RIGHT: Product Info */}
                            <div className="w-full md:w-2/3 md:px-10 mt-6 md:mt-0">
                                {/* Title & Back */}
                                <div className="flex flex-col gap-4 mb-6">
                                    {/* Title & Back Button */}
                                    <div className="flex flex-row justify-between items-start md:items-center gap-2">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                            {product.name}
                                        </h1>
                                        <ArrowLeftIcon
                                            width={30}
                                            height={30}
                                            className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => navigate(-1)}
                                        />
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>


                                <hr className="my-4" />

                                {/* Informations */}
                                <h2 className="text-xl md:text-2xl font-semibold mb-2">Informations</h2>
                                <div className="flex flex-col md:flex-row justify-between mb-6">
                                    <div className="font-medium space-y-2">
                                        <p>Price</p>
                                        <p>Category</p>
                                        <p>Used For</p>
                                    </div>
                                    <div className="text-gray-600 space-y-2 text-left md:text-right mt-2 md:mt-0">
                                        <p className="text-lg font-semibold text-blue-600">{product.price} Kyats</p>
                                        <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                                        <p>{product.usedFor}</p>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                {/* Details */}
                                <div className="mb-6">
                                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Details</h2>
                                    {product.details.map((d, i) => (
                                        <div
                                            className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg mb-2"
                                            key={i}
                                        >
                                            <p className="font-medium">{d}</p>
                                            <p className="text-gray-600 text-sm">include</p>
                                        </div>
                                    ))}
                                </div>

                                <hr className="my-4" />

                                {/* Seller Info */}
                                <h2 className="text-xl md:text-2xl font-semibold mb-2">Seller Information</h2>
                                <div className="flex flex-col md:flex-row justify-between mb-6">
                                    <div className="font-medium space-y-2">
                                        <p>Name</p>
                                        <p>Email</p>
                                    </div>
                                    <div className="text-gray-600 space-y-2 text-left md:text-right mt-2 md:mt-0">
                                        <p>{product.seller.name}</p>
                                        <p>{product.seller.email}</p>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                {/* Bidding */}
                                <h2 className="text-xl md:text-2xl font-semibold mb-2">Place Your Bids</h2>
                                {!userId ? (
                                    <p className="font-medium text-red-600">
                                        <Link to={"/login"} className="underline">
                                            Login
                                        </Link>{" "}
                                        or{" "}
                                        <Link to={"/register"} className="underline">
                                            Register
                                        </Link>{" "}
                                        to bid on this product.
                                    </p>
                                ) : userId._id !== product.seller._id ? (
                                    <div className="mb-10">
                                        <Form form={form} layout="vertical" onFinish={onFinishHandler}>
                                            <Form.Item
                                                name="message"
                                                label="Text:"
                                                rules={[{ required: true, message: "Message must be included" }]}
                                                hasFeedback
                                            >
                                                <Input placeholder="Write something ..." />
                                            </Form.Item>
                                            <Form.Item
                                                name="phone"
                                                label="Phone Number:"
                                                rules={[{ required: true, message: "Phone must be included" }]}
                                                hasFeedback
                                            >
                                                <Input type="number" placeholder="Phone number ..." />
                                            </Form.Item>
                                            <div className="text-right">
                                                <button
                                                    className="text-white font-medium text-base px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                                                    disabled={isPlace}
                                                >
                                                    {isPlace ? "Submitting Message ..." : "Submit Message"}
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                ) : (
                                    <p className="font-medium text-red-600 mb-4">
                                        You are the product seller / owner. You cannot place a bid.
                                    </p>
                                )}

                                <hr className="my-4" />

                                {/* Recent Bids */}
                                <h2 className="text-xl md:text-2xl font-semibold mb-2">Recent Bids</h2>
                                <div className="space-y-4">
                                    {bids.length > 0 ? (
                                        bids.map((bid, i) => (
                                            <div key={i} className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm">
                                                <h5 className="font-medium text-base">{bid.buyer_id.name}</h5>
                                                <p className="text-xs text-gray-400">
                                                    {formatDistanceToNow(new Date(bid.createdAt))} ago
                                                </p>
                                                <p className="text-gray-600 text-sm mt-1">{bid.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="font-medium text-red-600">No bids have been placed yet!</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    )}
                </>
            )}
        </section>

    )
}

export default Details
