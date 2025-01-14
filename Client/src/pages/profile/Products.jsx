import moment from "moment" // npm install moment --save
import { deleteProduct } from "../../apicalls/product"
import { message } from "antd"

const Products = ({ products, setActiceTabKey, setEditMode, setEditProductId, getProducts }) => {

    const editHandler = (product_id) => {
        setEditMode(true)
        setActiceTabKey("2")
        setEditProductId(product_id)
    }

    const deleteHandler = async (product_id) => {
        try {
            const response = await deleteProduct(product_id)
            if (response.isSuccess) {
                message.success(response.message)
                getProducts()
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        // Tailwind component table
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
                                                {moment(product.createdAt).format('L')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.status === "pending" ? (<span className="bg-yellow-400 p-1 rounded-md text-white text-xs">{product.status}</span>) : (
                                                    <span className="bg-green-400 p-1 rounded-md text-white text-xs">{product.status}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                <button type='button' className="font-medium text-green-600  hover:underline me-4" onClick={() => editHandler(product._id)}>Upload</button>
                                                <button type='button' className="font-medium text-blue-600  hover:underline me-4" onClick={() => editHandler(product._id)}>Edit</button>
                                                <button type='button' className="font-medium text-red-500  hover:underline" onClick={() => deleteHandler(product._id)}>Delete</button>
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
