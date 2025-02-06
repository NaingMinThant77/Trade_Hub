import { Link, useNavigate } from "react-router-dom"
import { UserIcon, BookmarkIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../store/slices/userSlice"

const Nav = () => {
    const { userId } = useSelector(state => state.reducer.user) // from store
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        dispatch(setUser(null))
        navigate("/")
    }

    return (
        <nav className=" text-blue-600 flex items-center justify-between gap-3 py-4 mb-4">
            <Link to={"/"} className="font-bold text-2xl">TradeHub</Link>
            {/* <div className="flex items-center gap-3">
                <Link to={"/about"}>About</Link>
                <Link to={"/about"}>Contact</Link>
                <Link to={"/about"}>Q&A</Link>
            </div> */}
            {
                userId
                    ? (
                        <div className="flex items-center gap-2">
                            {
                                userId.role === "user" && <Link to="/profile" className="px-2 py-1 flex items-end gap-1"> <UserIcon width={26} /></Link>
                            }
                            {
                                userId.role === "admin" && <Link to="/admin" className="px-2 py-1 flex items-end gap-1"> <UserIcon width={26} /> Admin Pannel</Link>
                            }
                            <Link to="/saved-products" className="px-2 py-1 flex items-end gap-1"> <BookmarkIcon width={26} /> </Link>
                            <ArrowRightEndOnRectangleIcon width={26} onClick={logout} className="text-red-600 cursor-pointer" />
                        </div>
                    )
                    : <div className=" flex items-center gap-2 text-base font-medium">
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Register</Link>
                    </div>
            }
        </nav>
    )
}

export default Nav