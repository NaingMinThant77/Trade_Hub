import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"

const Main = () => {
    return (
        <section className="max-w-full mx-auto">
            <Nav />
            <Outlet />
        </section>
    )
}

export default Main