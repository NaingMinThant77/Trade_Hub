import { Link } from "react-router-dom"
import { UserIcon } from "@heroicons/react/24/solid"
import { useSelector } from "react-redux"

const Nav = () => {
    const { userId } = useSelector(state => state.reducer.user) // from store

    return (
        <nav className="bg-blue-500 text-white flex items-center justify-between gap-3 p-4">
            <Link to={"/"} className="font-bold text-2xl">POINT.IO</Link>
            {
                userId
                    ? (
                        <>
                            {
                                userId.role === "user" && <Link to="/profile" className="px-2 py-1 flex items-end gap-1"> <UserIcon width={26} /> Profile</Link>
                            }
                            {
                                userId.role === "admin" && <Link to="/admin" className="px-2 py-1 flex items-end gap-1"> <UserIcon width={26} /> Admin Pannel</Link>
                            }
                        </>
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
