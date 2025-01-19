import { useState, useEffect } from "react";
import { message } from "antd";
import { getAllPaginationUsers } from "../apicalls/admin";

const usePaginationUsers = (currentPage) => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [paginationUsers, setPaginationUsers] = useState([]);


    const fetchPaginationUsers = async () => {
        try {
            const response = await getAllPaginationUsers({ page: currentPage });
            if (response.isSuccess) {
                setPaginationUsers(response.userDocs);
                setTotalUsers(response.totalUsers);
                setTotalPages(response.totalPages);
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    useEffect(() => {
        fetchPaginationUsers();
    }, [currentPage]);

    return {
        totalUsers,
        totalPages,
        paginationUsers,
        fetchPaginationUsers,
    };
};

export default usePaginationUsers;
