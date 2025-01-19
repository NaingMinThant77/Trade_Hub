import moment from "moment"
import { changeProductStatus, getAllPaginationProducts } from "../../apicalls/admin"
import { message } from "antd"
import { useEffect, useState } from "react";
import usePaginationProducts from "../../hooks/usePaginationProducts";

const Products = () => {
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

    const handleProductStatus = async (productId, action) => {
        try {
            const response = await changeProductStatus(productId, action);
            if (response.isSuccess) {
                message.success(response.message);
                // AllPaginationProducts();
                fetchPaginationProducts
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <section className="py-3 pr-7">
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
                                <tr><td colSpan="6">No products added yet</td></tr>
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