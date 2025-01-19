import { useState } from 'react'
import moment from "moment"
import { changeUserStatus } from '../../apicalls/admin';
import { message } from 'antd';
import usePaginationUsers from '../../hooks/usePaginationUsers';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Use the custom hook for pagination
    const { totalUsers, totalPages, paginationUsers, fetchPaginationUsers, } = usePaginationUsers(currentPage);

    const changePage = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleUserStatus = async (userId, action) => {
        try {
            const response = await changeUserStatus(userId, action);
            if (response.isSuccess) {
                message.success(response.message);
                fetchPaginationUsers();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between px-5">
                <h2 className="text-3xl font-semibold my-2">Users List</h2>
                <h2 className="text-xl my-2">Total Users - {totalUsers}</h2>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  rtl:text-right text-gray-500 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No of Users
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Create At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginationUsers.length > 0 ? (<>
                                {
                                    paginationUsers.map((user, index) => (
                                        <tr className="odd:bg-white  even:bg-gray-50  border-b " key={user._id}>
                                            <td className="px-6 py-4">
                                                {((currentPage - 1) * 5) + (index + 1)}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left ">
                                                {user.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.role === "admin" ? <span className='text-green-600 font-medium italic'>{user.role}</span> : <span className='text-blue-600 font-medium'>{user.role}</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.status === "active" && (<span className="bg-green-400 p-1 rounded-md text-white text-xs">{user.status}</span>)
                                                }
                                                {user.status === "banned" && (<span className="bg-red-400 p-1 rounded-md text-white text-xs">{user.status}</span>)
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(user.createdAt).format('L')}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {
                                                    user.status === "active" && <button type='button' className="font-medium text-red-600  hover:underline me-4" onClick={() => handleUserStatus(user._id, 'banned')}>Ban</button>
                                                }
                                                {
                                                    user.status === "banned" && <button type='button' className="font-medium text-blue-600  hover:underline me-4" onClick={() => handleUserStatus(user._id, 'active')}>Active</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>) : (
                                <p>No users added yet</p>
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

export default Users