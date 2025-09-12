import moment from "moment"
import { changeProductStatus } from "../../apicalls/admin"
import { message } from "antd"
import { useState } from "react";
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
                fetchPaginationProducts()
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <section className="pt-6 pr-7">
            <div className="flex items-center justify-between px-5 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Products List</h2>
                <h2 className="text-lg text-gray-600">Total Products: {totalProducts}</h2>
            </div>

            <div className="relative overflow-x-auto shadow-lg sm:rounded-xl">
                <table className="w-full text-sm text-gray-600 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">No</th>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Seller</th>
                            <th className="px-6 py-3">Sell Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginationProducts.length > 0 ? (
                            paginationProducts.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b transition-colors"
                                >
                                    <td className="px-4 py-4">
                                        {((currentPage - 1) * 7) + (index + 1)}
                                    </td>
                                    <th className="px-4 py-4 font-medium text-gray-900 text-left">
                                        {product.name}
                                    </th>
                                    <td className="px-4 py-4">{product.category}</td>
                                    <td className="px-4 py-4">{product.seller.name}</td>
                                    <td className="px-4 py-4">{moment(product.createdAt).format('L')}</td>
                                    <td className="px-4 py-4">
                                        {product.status === "pending" && (
                                            <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                                                Pending
                                            </span>
                                        )}
                                        {product.status === "approved" && (
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                Approved
                                            </span>
                                        )}
                                        {product.status === "reject" && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                Reject
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 flex justify-center gap-2">
                                        {product.status !== "approved" && (
                                            <button
                                                onClick={() => handleProductStatus(product._id, 'approved')}
                                                className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {product.status !== "reject" && (
                                            <button
                                                onClick={() => handleProductStatus(product._id, 'reject')}
                                                className="text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition"
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {product.status !== "pending" && (
                                            <button
                                                onClick={() => handleProductStatus(product._id, 'pending')}
                                                className="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                                            >
                                                Pending
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-10 text-gray-500 text-center">
                                    No products added yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center py-4 px-2">
                <button
                    onClick={() => changePage('prev')}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100 transition'
                        }`}
                >
                    Previous
                </button>

                <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => changePage('next')}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100 transition'
                        }`}
                >
                    Next
                </button>
            </div>
        </section>

    )
}

export default Products