import { useEffect, useState } from 'react'
import moment from "moment"
import { changeUserStatus, getAllUsers } from '../../apicalls/admin';
import { message } from 'antd';

const Users = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const response = await getAllUsers();
            if (response.isSuccess) {
                setUsers(response.userDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
    }

    useEffect(_ => {
        getUsers()
    }, [])

    const handleUserStatus = async (userId, action) => {
        try {
            const response = await changeUserStatus(userId, action);
            if (response.isSuccess) {
                message.success(response.message);
                getUsers();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <section>
            <h1 className="text-3xl font-semibold my-2">User List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  rtl:text-right text-gray-500 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
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
                            users.length > 0 ? (<>
                                {
                                    users.map(user => (
                                        <tr className="odd:bg-white  even:bg-gray-50  border-b " key={user._id}>
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

        </section>
    )
}

export default Users