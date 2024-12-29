import React from 'react';

const Textfield = ({ onChange, value, placeholder }) => {
  return (
    <input
      name='text'
      placeholder={placeholder}
      type='text'
      onChange={onChange}
      value={value}
      className='bg-myYellow font-bold rounded-2xl px-11 py-4 text-white placeholder-gray-200 text-center focus:outline-none'
    />
  );
};

export default Textfield;
