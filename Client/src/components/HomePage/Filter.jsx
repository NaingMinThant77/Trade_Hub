import { message } from 'antd';
import React, { useState } from 'react'
import { getProductsByFilters } from '../../apicalls/public';

import { useDispatch } from 'react-redux';
import { setLoader } from "../../store/slices/loaderSlice"

const Filter = ({ setProducts, getProducts }) => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const dispatch = useDispatch()

    const Categories = [
        { value: 'electronics_and_gadgets', label: 'Electronics and Gadgets', },
        { value: 'clothing_and_fashion', label: 'Clothing and Fashion', },
        { value: 'home_and_furniture', label: 'Home and Furniture', },
        { value: 'books_and_media', label: 'Books and Media', },
        { value: 'beauty_and_personal_care', label: 'Beauty and PersonalCare', },
        { value: 'sports_and_fitness', label: 'Sports and Fitness', },
        { value: 'toys_and_games', label: 'Toys and Games', },
    ];

    const categoryHandler = async (i) => {
        dispatch(setLoader(true))
        try {
            setSelectedCategory(i)
            const response = await getProductsByFilters("category", Categories[i].value);
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
        setSelectedCategory(null)
        getProducts()
    }

    return (
        <div className='flex items-center gap-3 my-8 max-w-6xl mx-auto flex-wrap justify-center'>{
            Categories.map((category, index) => <p key={category.value} className={` text-blue-600 px-2 py-1 text-sm rounded-md cursor-pointer border border-blue-600 ${index === selectedCategory && "bg-blue-600 text-white"}`} onClick={_ => categoryHandler(index)}>{category.label}</p>)
        }
            {
                selectedCategory !== null && <button type="button" className={` bg-blue-600 text-white px-2 py-1 text-sm rounded-md cursor-pointer border border-blue-600 }`} onClick={clearHandler}>Clear</button>
            }
        </div>
    )
}

export default Filter