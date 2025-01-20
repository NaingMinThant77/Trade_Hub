import React from 'react'

const Filter = () => {
    const Categories = [
        { value: 'electronics_and_gadgets', label: 'Electronics and Gadgets', },
        { value: 'clothing_and_fashion', label: 'Clothing and Fashion', },
        { value: 'home_and_furniture', label: 'Home and Furniture', },
        { value: 'books_and_media', label: 'Books and Media', },
        { value: 'beauty_and_personal_care', label: 'Beauty and PersonalCare', },
        { value: 'furnsports_and_fitnessiture', label: 'Sports and Fitness', },
        { value: 'toys_and_games', label: 'Toys and Games', },
    ];

    return (
        <div className='flex items-center gap-3 my-8 max-w-4xl mx-auto flex-wrap justify-center'>{
            Categories.map(category => <p key={category.value} className='bg-blue-600 text-white px-2 py-1 text-sm rounded-xl'>{category.label}</p>)
        }</div>
    )
}

export default Filter