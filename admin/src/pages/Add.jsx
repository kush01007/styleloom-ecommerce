import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategoy] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const images = [
    { id: 'image1', file: image1, setFile: setImage1 },
    { id: 'image2', file: image2, setFile: setImage2 },
    { id: 'image3', file: image3, setFile: setImage3 },
    { id: 'image4', file: image4, setFile: setImage4 }
  ]

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const inputClass =
    'w-full h-11 border border-[#d8cabc] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#888] focus:border-black transition'

  const labelClass =
    'text-black text-[13px] font-medium mb-2 block'

  return (
    <form
      onSubmit={onSubmitHandler}
      className='w-full max-w-[920px] bg-white border border-[#e8ded4] p-4 sm:p-6 lg:p-8'
    >

      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7'>
        <div>
          <p className='text-[#9b8977] text-[10px] tracking-[0.24em] uppercase mb-2'>
            Catalog
          </p>

          <h1 className='text-black text-[28px] sm:text-[34px] font-medium tracking-[-0.05em] leading-none'>
            Add Product
          </h1>
        </div>

        <p className='text-[#777] text-[13px] leading-[1.6] max-w-[360px] sm:text-right'>
          Upload product images and fill the details to add a new item to the store.
        </p>
      </div>

      <div className='mb-7'>
        <p className={labelClass}>Product images</p>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
          {images.map((image, index) => (
            <label
              key={image.id}
              htmlFor={image.id}
              className='group cursor-pointer'
            >
              <div className='aspect-square border border-[#d8cabc] bg-[#fbfaf8] overflow-hidden flex items-center justify-center hover:border-black transition'>
                <img
                  className='w-full h-full object-cover'
                  src={!image.file ? assets.upload_area : URL.createObjectURL(image.file)}
                  alt={`Upload ${index + 1}`}
                />
              </div>

              <p className='mt-2 text-[#777] text-[12px] text-center'>
                Image {index + 1}
              </p>

              <input
                onChange={(e) => image.setFile(e.target.files[0])}
                type='file'
                id={image.id}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

        <div className='lg:col-span-2'>
          <label className={labelClass}>Product name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={inputClass}
            type='text'
            placeholder='Type product name'
            required
          />
        </div>

        <div className='lg:col-span-2'>
          <label className={labelClass}>Product description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='w-full min-h-[120px] border border-[#d8cabc] bg-white px-4 py-3 text-[14px] text-black outline-none placeholder:text-[#888] focus:border-black transition resize-none'
            placeholder='Write product description'
            required
          />
        </div>

        <div>
          <label className={labelClass}>Product category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className={inputClass}
          >
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Sub category</label>
          <select
            onChange={(e) => setSubCategoy(e.target.value)}
            value={subCategory}
            className={inputClass}
          >
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Product price</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className={inputClass}
            type='number'
            placeholder='₹ 999'
            required
          />
        </div>

        <div>
          <label className={labelClass}>Product sizes</label>

          <div className='flex flex-wrap gap-2'>
            {sizeOptions.map((size) => (
              <button
                key={size}
                type='button'
                onClick={() => toggleSize(size)}
                className={
                  sizes.includes(size)
                    ? 'h-11 min-w-11 px-4 bg-black text-white text-[13px] border border-black transition'
                    : 'h-11 min-w-11 px-4 bg-[#fbfaf8] text-black text-[13px] border border-[#d8cabc] hover:border-black transition'
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className='mt-6 flex items-center gap-3'>
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type='checkbox'
          id='bestseller'
          className='w-4 h-4 accent-black'
        />

        <label
          className='cursor-pointer text-black text-[14px]'
          htmlFor='bestseller'
        >
          Add to bestseller
        </label>
      </div>

      <div className='mt-8 flex flex-col sm:flex-row sm:items-center gap-3'>
        <button
          type='submit'
          className='w-full sm:w-auto h-12 px-8 bg-black text-white text-[13px] tracking-[0.12em] uppercase hover:opacity-85 transition'
        >
          Add Product
        </button>

        <p className='text-[#777] text-[12px]'>
          Product will appear in the customer store after successful upload.
        </p>
      </div>

    </form>
  )
}

export default Add
