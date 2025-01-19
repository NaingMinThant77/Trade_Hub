import { useState, useEffect } from "react";
import { message } from "antd";
import { getAllPaginationProducts } from "../apicalls/admin";

const usePaginationProducts = (currentPage) => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [paginationProducts, setPaginationProducts] = useState([]);

    const fetchPaginationProducts = async () => {
        try {
            const response = await getAllPaginationProducts({ page: currentPage });
            if (response.isSuccess) {
                setPaginationProducts(response.productDocs);
                setTotalProducts(response.totalProducts);
                setTotalPages(response.totalPages);
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    useEffect(() => {
        fetchPaginationProducts();
    }, [currentPage]);

    return {
        totalProducts,
        totalPages,
        paginationProducts,
        fetchPaginationProducts,
    };
};

export default usePaginationProducts;
