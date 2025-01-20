import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/slices/userSlice"
import { useNavigate } from 'react-router-dom';
import { PowerIcon } from "@heroicons/react/24/solid"

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
        <section className="max-w-xl">
            <div className="flex items-end justify-between mb-4">
                <h1 className="text-3xl font-semibold my-2">{role === "user" ? "User Profile" : "Admin Profile"}</h1>
                <button type="button" className="text-white bg-red-500 font-medium px-3 py-2 rounded-md mt-2 flex items-center gap-2" onClick={logoutHandler}><PowerIcon className="w-5 h-5" /> Logout</button>
            </div>
            <div className="flex items-center justify-between border-b border-blue-200 mb-3 font-medium">
                <p className="font-semibold">Email</p>
                <p>{email}</p>
            </div>
            <div className="flex items-center justify-between border-b border-blue-200 mb-3 font-medium">
                <p className="font-semibold">Name</p>
                <p>{name}</p>
            </div>
            <div className="flex items-center justify-between border-b border-blue-200 mb-3 font-medium">
                <p className="font-semibold">Role</p>
                <p>{role}</p>
            </div>
        </section>
    )
}

export default General