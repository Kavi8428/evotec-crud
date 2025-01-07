import React from 'react'

export default function dashboard() {
return (
    <div className='flex' >
        <nav className='bg-black fixed w-full h-16 flex justify-between items-center px-5 transition-all duration-500 ease-in-out'>
            <div className='text-white  font-bold transform hover:scale-110 transition-transform duration-300 cursor-pointer'>Dashboard</div>
            <div className='flex items-center  '>
                <div className='text-white ml-1 mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>Home</div>
                <div className='text-white mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>About</div>
                <div className='text-white mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>Services</div>
                <div className='text-white mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>Contact</div>
            </div>  
        </nav>
    
            <div className=' text-white sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid gap-8 mt-16 w-full p-5 '>
                <div className=' bg-black h-72 w-full rounded-lg p-2'>
                   <div className='flex justify-between items-center'>
                          <div className='text-white font-semibold text-lg'>1</div>
                          <div className='text-white font-semibold text-lg'>1</div>
                   </div>
                </div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>2</div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>3</div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>4</div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>5</div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>6</div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>7</div>
                <div className=' bg-black  h-72 w-full rounded-lg p-2'>8</div>
            </div>
        </div>
   
)
}
