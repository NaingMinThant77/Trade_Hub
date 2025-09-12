import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"

const Notification = ({ notification }) => {
    return (
        <section className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold my-4">Notifications</h1>

            {notification.length === 0 ? (
                <p className="text-red-600 font-medium my-5 text-center">
                    No notifications yet!
                </p>
            ) : (
                <div className="space-y-4">
                    {notification.map((noti) => (
                        <div
                            key={noti._id}
                            className="bg-white rounded-lg shadow-sm p-5 border border-gray-100"
                        >
                            <p className="text-xs text-gray-500 mb-1">
                                {formatDistanceToNow(new Date(noti.createdAt))} ago
                            </p>

                            <h4 className="text-lg font-bold text-gray-800">{noti.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{noti.message}</p>

                            <p className="text-sm font-medium text-gray-700 mt-2">
                                Contact Number:{" "}
                                <span className="tracking-wide text-gray-900">
                                    {noti.phone_number}
                                </span>
                            </p>

                            <div className="border-t border-gray-200 mt-4 pt-3 flex justify-end">
                                <Link
                                    to={`/products/${noti.product_id}`}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    View Bids
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>

    )
}

export default Notification
