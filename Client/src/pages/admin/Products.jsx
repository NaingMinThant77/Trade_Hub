import moment from "moment"
import { changeProductStatus } from "../../apicalls/admin"
import { message } from "antd"

const Products = ({ products, getProducts }) => {

    const handleProductStatus = async (productId, action) => {
        try {
            const response = await changeProductStatus(productId, action);
            if (response.isSuccess) {
                message.success(response.message);
                getProducts();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <section>
            <h1 className="text-3xl font-semibold my-2">Products List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  rtl:text-right text-gray-500 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Seller
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sell Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ? (<>
                                {
                                    products.map(product => (
                                        <tr className="odd:bg-white  even:bg-gray-50  border-b " key={product._id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left ">
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.seller.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(product.createdAt).format('L')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.status === "pending" && (<span className="bg-yellow-400 p-1 rounded-md text-white text-xs">{product.status}</span>)}
                                                {product.status === "approved" && (<span className="bg-green-400 p-1 rounded-md text-white text-xs">{product.status}</span>)
                                                }
                                                {product.status === "reject" && (<span className="bg-red-400 p-1 rounded-md text-white text-xs">{product.status}</span>)
                                                }
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {
                                                    product.status === "approved" ? <button type='button' className="font-medium text-yellow-600  hover:underline me-4" onClick={() => handleProductStatus(product._id, 'pending')}>Pending</button> : <button type='button' className="font-medium text-blue-600  hover:underline me-4" onClick={() => handleProductStatus(product._id, 'approved')}>Approve</button>
                                                }
                                                {
                                                    product.status === "reject" ? <button type='button' className="font-medium text-yellow-600  hover:underline me-4" onClick={() => handleProductStatus(product._id, 'pending')}>Pending</button> : <button type='button' className="font-medium text-red-600  hover:underline me-4" onClick={() => handleProductStatus(product._id, 'reject')}>Reject</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>) : (
                                <p>No products added yet</p>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default Products