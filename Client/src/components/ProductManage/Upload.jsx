import { useEffect, useState } from "react"
import { TrashIcon } from "@heroicons/react/24/solid"
import { deleteSavedImages, getSavedImages, uploadProductImage } from "../../apicalls/product";
import { message } from 'antd';


import { useDispatch, useSelector } from "react-redux"
import { setLoader } from "../../store/slices/loaderSlice";

const Upload = ({ editProductId, setActiceTabKey }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const [savedImages, setSavedImages] = useState([])

    const [selectedImagesCount, setSelectedImagesCount] = useState(0)

    const { isProcessing } = useSelector(state => state.reducer.loader)
    const dispatch = useDispatch()

    const getImages = async (product_id) => {
        try {
            const response = await getSavedImages(product_id)
            if (response.isSuccess) {
                setSavedImages(response.data.images)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getImages(editProductId)
    }, [])

    const onChangeHandler = (event) => {
        const selectedImages = event.target.files
        const selectedImagesArray = Array.from(selectedImages)

        // update selected images count
        setSelectedImagesCount(prev => prev + selectedImagesArray.length)

        setImages(prev => [...prev, ...selectedImagesArray]);
        const previewImagesArray = selectedImagesArray.map(img => {
            return URL.createObjectURL(img)
        })
        setPreviewImages(prev => prev.concat(previewImagesArray));
    }

    const deleteHandler = (img) => {
        // update selected images count
        setSelectedImagesCount(prev => prev - 1)

        setPreviewImages(previewImages.filter(element => element !== img))
        URL.revokeObjectURL(img)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(setLoader(true))

        if (selectedImagesCount > 1) {
            const formData = new FormData()
            for (let i = 0; i < images.length; i++) {
                formData.append("product_images", images[i])
                console.log("product_images", images[i])
            }

            formData.append("product_id", editProductId)
            try {
                const response = await uploadProductImage(formData)
                if (response.isSuccess) {
                    message.success(response.message)
                    setActiceTabKey("1")
                } else {
                    throw new Error(response.message)
                }
            } catch (err) {
                message.error(err.message)
            }
        } else {
            message.error("Please select at least two images!")
        }
        dispatch(setLoader(false))
    }

    const savedImageDeleteHandler = async (img) => {
        setSavedImages(prev => prev.filter(e => e !== img)) // UI
        try {
            const response = await deleteSavedImages({ productId: editProductId, imgToDelete: img })
            if (response.isSuccess) {
                message.success(response.message)
            } else {
                throw new Error(response.message)
            }
        } catch (err) {
            message.error(err.message)
        }
    }

    return (
        <section>
            <h1 className='text-2xl font-bold mb-4 text-blue-600'>Upload your Product's Images Here.</h1>
            <div className="my-2">
                <h1 className="text-base font-medium mb-2">Saved Images in Cloud.</h1>
                {
                    savedImages.length > 0 ? (<div className="flex gap-2 mb-6">
                        {
                            savedImages.map(e => (<div key={e} className="basis-1/6 h-32 flex-wrap relative">
                                <img src={e} alt={e} className="w-full h-full object-cover rounded-md" />
                                <TrashIcon width={20} height={20} className="absolute z-20 bottom-2 right-3 text-white cursor-pointer" onClick={() => savedImageDeleteHandler(e)} />
                            </div>))
                        }
                    </div>) : (
                        <p className="text-red-600 text-sm mb-5">No Images are saved</p>
                    )
                }
            </div>
            <form method='post' encType='multipart/form-data' onSubmit={submitHandler}>
                <label htmlFor="upload" className='p-2 rounded-md border-dashed border-2 border-blue-600 font-medium my-3 text-blue-600 cursor-pointer'>Upload from device</label>
                <input type="file" hidden id='upload' name='product_images' multiple accept='image/png, image/jpeg, image/jpg' onChange={onChangeHandler} />
                <div className="flex gap-2 mt-4">
                    {
                        previewImages && previewImages.map((img, index) => (
                            <div key={index} className="basis-1/6 h-32 flex-wrap relative">
                                <img src={img} alt={index} className="w-full h-full object-cover rounded-md" />
                                <TrashIcon width={20} height={20} className="absolute z-20 bottom-2 right-3 text-white cursor-pointer" onClick={() => deleteHandler(img)} />
                            </div>
                        ))
                    }
                </div>
                {
                    selectedImagesCount > 0 && <button className='block my-4 text-white bg-blue-600 rounded-md px-3 py-2 font-medium' disabled={isProcessing}>{
                        isProcessing ? "Uploading ..." : "Upload images"
                    }</button>
                }
            </form>
        </section>
    )
}

export default Upload

