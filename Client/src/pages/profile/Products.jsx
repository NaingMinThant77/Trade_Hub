import moment from "moment" // npm install moment --save
import { deleteProduct } from "../../apicalls/product"
import { message } from "antd"
import { useState } from "react";
import usePaginationProducts from "../../hooks/usePaginationProductsProfile"

const Products = ({ setActiceTabKey, setEditMode, setEditProductId, setManageTabKey }) => {

    const [currentPage, setCurrentPage] = useState(1);

    // Use the custom hook for pagination
    const { totalProducts, totalPages, paginationProducts, fetchPaginationProducts } = usePaginationProducts(currentPage);

    const changePage = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const editHandler = (product_id) => {
        setEditMode(true)
        setActiceTabKey("2")
        setEditProductId(product_id)
        setManageTabKey("1")  // Switch to "Product Details"
    }

    const uploadHandler = (product_id) => {
        setEditMode(true)
        setActiceTabKey("2")
        setEditProductId(product_id)
        setManageTabKey("2")  // Switch to "Upload"
    }

    const deleteHandler = async (product_id) => {
        try {
            const response = await deleteProduct(product_id)
            if (response.isSuccess) {
                message.success(response.message)
                fetchPaginationProducts()
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
            <div className="flex items-center justify-between px-5">
                <h2 className="text-3xl font-semibold my-2">Products List</h2>
                <h2 className="text-xl my-2">Total Products - {totalProducts}</h2>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  rtl:text-right text-gray-500 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No of Products
                            </th>
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
                            paginationProducts.length > 0 ? (<>
                                {
                                    paginationProducts.map((product, index) => (
                                        <tr className="odd:bg-white  even:bg-gray-50  border-b " key={product._id}>
                                            <td className="px-6 py-4">
                                                {((currentPage - 1) * 7) + (index + 1)}
                                            </td>

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
                                                {product.status === "pending" && (<span className="bg-yellow-400 p-1 rounded-md text-white text-xs">{product.status}</span>)}
                                                {product.status === "approved" && (<span className="bg-green-400 p-1 rounded-md text-white text-xs">{product.status}</span>)
                                                }
                                                {product.status === "reject" && (<span className="bg-red-400 p-1 rounded-md text-white text-xs">{product.status}</span>)
                                                }
                                            </td>
                                            <td className="px-6 py-4 ">
                                                <button type='button' className="font-medium text-green-600  hover:underline me-4" onClick={() => uploadHandler(product._id)}>Upload</button>
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
            <div className="flex justify-between items-center py-3">
                <button
                    onClick={() => changePage('prev')}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'} rounded`}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => changePage('next')}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'} rounded`}
                >
                    Next
                </button>
            </div>

        </section>
    )
}

export default Products
