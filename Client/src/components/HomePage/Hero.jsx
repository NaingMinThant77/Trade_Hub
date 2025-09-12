import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { getProductsByFilters } from "../../apicalls/public"
import { message } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setLoader } from "../../store/slices/loaderSlice"

const Hero = ({ setProducts, getProducts }) => {
    const [searchKey, setSearchKey] = useState("")
    const dispatch = useDispatch()

    const searchHandler = async () => {
        if (searchKey.trim().length === 0) {
            return message.error("SearchKey must have")
        }
        dispatch(setLoader(true))
        try {
            const response = await getProductsByFilters("searchKey", searchKey)
            if (response.isSuccess) {
                setProducts(response.productDocs)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
        dispatch(setLoader(false))
    }

    const clearHandler = () => {
        setSearchKey("")
        getProducts()
    }

    return (
        <section className="w-full text-center mt-12 mb-8 px-4">
            {/* Headline */}
            <h1 className="text-4xl font-extrabold text-blue-700 leading-tight mb-4">
                Discover, Connect & Thrive with{" "}
                <span className="text-yellow-400">TradePoint</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl font-medium text-gray-600 max-w-2xl mx-auto mb-6">
                Bringing buyers and sellers together with{" "}
                <span className="text-blue-600 font-semibold">trust</span>,{" "}
                <span className="text-blue-600 font-semibold">community</span>, and{" "}
                <span className="text-blue-600 font-semibold">success</span>.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto flex items-center gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Search products..."
                        className="bg-white outline-none border border-blue-300 px-4 py-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon
                        width={24}
                        height={24}
                        className="text-blue-600 absolute top-3 right-3 cursor-pointer hover:text-blue-800 transition"
                        onClick={searchHandler}
                    />
                </div>

                {searchKey && (
                    <button
                        type="button"
                        className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg shadow"
                        onClick={clearHandler}
                    >
                        Clear
                    </button>
                )}
            </div>
        </section>
    )
}

export default Hero
