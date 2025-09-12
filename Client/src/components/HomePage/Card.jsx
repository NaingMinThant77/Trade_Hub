import { Link } from "react-router-dom"
import TradeHub from "../../images/TradeHub.jpg"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookMark } from "@heroicons/react/24/solid"
import { savedProduct, unsavedProducts } from "../../apicalls/product"
import { message } from "antd"
import { BookmarkSlashIcon } from "@heroicons/react/24/solid"
import { useSelector } from "react-redux"

const Card = ({ product, saved = false, getAllProductsSaved, savedProducts, getProducts }) => {
    const { userId } = useSelector(state => state.reducer.user)

    const productStatusHandler = async (id) => {
        try {
            let response;
            if (saved) {
                response = await unsavedProducts(id);
            } else {
                response = await savedProduct(id)
            }

            if (response.isSuccess) {
                message.success(response.message)
                if (!saved) {
                    getProducts();
                }
                getAllProductsSaved()
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message || "Something went wrong!!")
        }
    }

    const isProductSaved = (product) => {
        return savedProducts.some(p => p.product_id._id === product._id)
    }

    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : TradeHub;

    return (
        <>
            {product && (
                <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
                    {/* Product Image */}
                    <Link to={`/products/${product._id}`}>
                        <img
                            src={imageUrl}
                            alt={product.name || "Product"}
                            className="w-full h-52 object-cover rounded-xl"
                        />
                    </Link>

                    {/* Category */}
                    <p className="text-white text-xs bg-blue-600 rounded-full px-3 py-1 font-medium w-fit my-3 shadow-sm">
                        {product.category
                            ? product.category.toUpperCase().replaceAll("_", " ")
                            : "UNKNOWN"}
                    </p>

                    {/* Title & Save */}
                    <div className="flex items-center justify-between mb-2">
                        <Link to={`/products/${product._id}`}>
                            <p className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                {product.name || "Unnamed Product"}
                            </p>
                        </Link>

                        {userId && (
                            <>
                                {saved ? (
                                    <BookmarkSlashIcon
                                        className="w-6 h-6 text-blue-600 cursor-pointer hover:scale-110 transition-transform duration-200"
                                        onClick={() => productStatusHandler(product._id)}
                                    />
                                ) : (
                                    <>
                                        {isProductSaved(product) ? (
                                            <BookMark
                                                className="w-6 h-6 text-blue-600 cursor-not-allowed"
                                                onClick={() => message.warning("Product is already saved!")}
                                            />
                                        ) : (
                                            <BookmarkIcon
                                                className="w-6 h-6 text-blue-600 cursor-pointer hover:scale-110 transition-transform duration-200"
                                                onClick={() => productStatusHandler(product._id)}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm mb-3">
                        {product.description
                            ? product.description.slice(0, 80) + "..."
                            : "No description available."}
                    </p>

                    <hr className="my-2" />

                    {/* Price */}
                    <p className="text-lg font-semibold text-blue-600 text-right">
                        {product.price} Kyats
                    </p>
                </div>
            )}
        </>

    );
};

export default Card
