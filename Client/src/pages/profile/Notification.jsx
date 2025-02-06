import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"
import { deleteAllNoti, deleteNoti, makeRead } from "../../apicalls/notification"
import { message } from "antd"
import { NotificationPlacements } from "antd/es/notification/interface"

const Notification = ({ notification, getNoti }) => {
    const markAsRead = async (id) => {
        try {
            const response = await makeRead(id)
            if (response.isSuccess) {
                getNoti()
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const deleteHandler = async (id) => {
        try {
            const response = await deleteNoti(id)
            if (response.isSuccess) {
                getNoti()
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }


    const deleteAllHandler = async () => {
        try {
            const response = await deleteAllNoti()
            if (response.isSuccess) {
                getNoti()
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <section>
            <div className="flex justify-between my-2">
                <h1 className='text-2xl font-semibold my-2'>Notifications</h1>
                {
                    notification.length > 0 && <p className="text-red-600 font-medium underline cursor-pointer" onClick={deleteAllHandler}>Delete All Forever</p>
                }
            </div>
            <div className="max-w-3xl">
                {
                    notification.length === 0 && <p className="text-red-600 font-medium my-5">No notification yet!.</p>
                }
                {
                    notification.map(noti => (
                        <div key={noti._id} className={`${noti.isRead ? "bg-gray-50" : "bg-white"} mb-4 rounded-lg p-4`}>
                            <p className='text-sm font-medium text-gray-500'>{formatDistanceToNow(new Date(noti.createdAt))} ago ...</p>
                            <h4 className={`text-lg font-bold my-1 ${noti.isRead ? "text-gray-500" : "text-black"}`}>{noti.title}</h4>
                            <p className="text-sm font-medium text-gray-600">{noti.message}</p>
                            <p className="font-medium text-gray-600 my-2">Contact Number - <span className="tracking-wide">{noti.phone_number}</span></p>
                            <hr />
                            <div className="flex justify-end gap-3">
                                <Link to={`/products/${noti.product_id}`} className="text-blue-600 font-medium underline cursor-pointer">View bids</Link>
                                {
                                    noti.isRead ? <p className="text-red-600 font-medium underline cursor-pointer" onClick={() => { deleteHandler(noti._id) }}>Delete Forever</p>
                                        : <p className="text-blue-600 font-medium underline cursor-pointer" onClick={() => { markAsRead(noti._id) }}>Mark as read</p>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Notification

