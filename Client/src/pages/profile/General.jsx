import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/slices/userSlice"
import { useNavigate } from 'react-router-dom';
import { PowerIcon } from "@heroicons/react/24/outline";

const General = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email, name, role } = useSelector(state => state.reducer.user.userId)

    const logoutHandler = () => {
        localStorage.removeItem("token")
        dispatch(setUser(null))
        navigate("/")
    }

    return (
        <section className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 mb-40">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {role === "user" ? "User Profile" : "Admin Profile"}
                </h1>
                <button
                    type="button"
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm transition"
                >
                    <PowerIcon className="w-5 h-5" />
                    Logout
                </button>
            </div>

            {/* Info rows */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <p className="font-semibold text-gray-700">Email</p>
                    <p className="text-gray-600">{email}</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <p className="font-semibold text-gray-700">Name</p>
                    <p className="text-gray-600">{name}</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-200">
                    <p className="font-semibold text-gray-700">Role</p>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                            }`}
                    >
                        {role}
                    </span>
                </div>
            </div>
        </section>

    )
}

export default General