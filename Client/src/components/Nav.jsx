import { Link, useNavigate } from "react-router-dom"
import {
    UserIcon,
    BookmarkIcon,
    ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../store/slices/userSlice"

const Nav = () => {
    const { userId } = useSelector((state) => state.reducer.user) // from store
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        dispatch(setUser(null))
        navigate("/")
    }

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md mb-4">
            <div className="max-w-[85%] mx-auto flex items-center justify-between py-3">
                {/* Logo / Brand */}
                <Link
                    to={"/"}
                    className="font-extrabold text-2xl tracking-wide hover:scale-105 transition-transform"
                >
                    TradePoint
                </Link>

                {userId ? (
                    // Logged-in Nav
                    <div className="flex items-center gap-4 bg-white text-gray-700 shadow-md px-0 md:px-4 py-2 rounded-xl">
                        {userId.role === "user" && (
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                            >
                                <UserIcon width={22} className="text-blue-600" />
                                <span className="text-sm font-medium">{userId.name}</span>
                            </Link>
                        )}

                        {userId.role === "admin" && (
                            <Link
                                to="/admin"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                            >
                                <UserIcon width={22} className="text-purple-600" />
                                <span className="text-sm font-medium">Admin Panel</span>
                            </Link>
                        )}

                        <Link
                            to="/saved-products"
                            className="flex items-center gap-2 px-0 md:px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                        >
                            <BookmarkIcon width={22} className="text-yellow-600" />
                            <span className="text-sm font-medium hidden sm:block">Saved</span>
                        </Link>

                        <button
                            onClick={logout}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-100 transition text-red-600 font-medium"
                        >
                            <ArrowRightEndOnRectangleIcon width={22} />
                            <span className="hidden sm:block">Logout</span>
                        </button>
                    </div>
                ) : (
                    // Guest Nav
                    <div className="flex items-center gap-3 text-base font-medium">
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-blue-700 transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav
