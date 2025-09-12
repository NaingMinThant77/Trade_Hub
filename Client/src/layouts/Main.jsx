import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "./Footer"

const Main = () => {
    return (
        <section>
            <Nav />
            <div className="max-w-[85%] mx-auto">
                <Outlet />
            </div>
            <Footer />
        </section>
    )
}

export default Main