import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"

const Notification = ({ notification }) => {
    return (
        <section>
            <h1 className='text-2xl font-semibold my-2'>Notifications</h1>
            <div className="max-w-3xl">
                {
                    notification.map(noti => (
                        <div key={noti._id} className='bg-white mb-4 rounded-lg p-4'>
                            <p className='text-sm font-medium text-gray-500'>{formatDistanceToNow(new Date(noti.createdAt))} ago ...</p>
                            <h4 className="text-lg font-bold my-1">{noti.title}</h4>
                            <p className="text-sm font-medium text-gray-600">{noti.message}</p>
                            <p className="font-medium text-gray-600 my-2">Contact Number - <span className="tracking-wide">{noti.phone_number}</span></p>
                            <hr />
                            <div className="text-right my-2">
                                <Link to={`/products/${noti.product_id}`} className="text-blue-600 font-medium underline">View bids</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Notification
