import React from 'react'

const AddBtn = ({onClick, btnName}) => {
  return (
    <button type="button" onClick={onClick} className='bg-myGreen text-white font-bold font-sans rounded-2xl px-8 py-4'>
        {btnName}
    </button>
  )
}

export default AddBtn
