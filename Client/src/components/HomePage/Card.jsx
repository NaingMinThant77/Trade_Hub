import { Link } from "react-router-dom"
import TradeHub from "../../images/TradeHub.jpg"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import { savedProduct, unsavedProducts } from "../../apicalls/product"
import { message } from "antd"
import { BookmarkSlashIcon } from "@heroicons/react/24/solid"

const Card = ({ product, saved = false, getProducts }) => {

    const productStatusHandler = async (id) => {
        try {
            let response;
            if (saved) {
                response = await unsavedProducts(id);
            } else {
                response = await savedProduct(id)
            }

            if (response.isSuccess) {
                if (saved) { getProducts() }
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
    }

    if (!product) return null; // Prevents rendering if product is undefined

    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : TradeHub;

    return (
        <div className={`${saved ? 'basis-1/4' : "basis-1/2"} px-4 mb-4`}>
            <Link to={`/products/${product._id}`}>
                <img src={imageUrl} alt={product.name || "Product"} className="w-full h-52 object-cover" />
            </Link>

            <p className="text-white text-xs bg-blue-600 rounded-lg p-1 w-fit font-medium my-2">
                {product.category ? product.category.toUpperCase().replaceAll("_", " ") : "UNKNOWN"}
            </p>

            <div className="flex items-center justify-between">
                <Link to={`/products/${product._id}`}>
                    <p className="text-xl font-bold font-gray-700">{product.name || "Unnamed Product"}</p>
                </Link>
                {
                    saved ? <BookmarkSlashIcon className="w-6 h-8 text-blue-600 cursor-pointer"
                        onClick={() => productStatusHandler(product._id)} /> : <BookmarkIcon
                        className="w-6 h-8 text-blue-600 cursor-pointer"
                        onClick={() => productStatusHandler(product._id)}
                    />
                }
            </div>

            <p className="font-gray-500">
                {product.description ? product.description.slice(0, 80) : "No description available."}
            </p>
        </div>
    );
};

export default Card
