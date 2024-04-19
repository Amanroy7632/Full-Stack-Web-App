import React from 'react'
import bgImg from "../../images/bg4.jpg"
const Home = () => {
  return (
   
    <>
    <div className='w-full h-screen flex justify-center items-center ' style={{backgroundImage:`url(${bgImg})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
       <div className=' p-8 text-white'>
        <h1 className=' text-3xl font-semibold gap-2'>ANYWHERE WE ROAM</h1>
        <p className=' text-center text-[22px]'>the pursuit of adventure</p>
       </div>
    </div>
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to Our Blog</h1>

    {/* <!-- Blog Post Cards --> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <!-- Sample Blog Post Card 1 --> */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Blog Post Image" className="w-full h-40 object-cover object-center"/>
            <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Sample Blog Post 1</h2>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat.</p>
                <a href="#" className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Read More</a>
            </div>
        </div>

        {/* <!-- Sample Blog Post Card 2 --> */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Blog Post Image" className="w-full h-40 object-cover object-center"/>
            <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Sample Blog Post 2</h2>
                <p className="text-sm text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href="#" className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Read More</a>
            </div>
        </div>

        {/* <!-- Add more blog post cards as needed --> */}
    </div>
</div>
    </>
  )
}

export default Home
