import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext.jsx';

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <div className="flex md:w-8/12 mx-auto items-center justify-between">
                <Link to={'/'} className='font-bold'>Young Future</Link>
                <Link to={user ? '/account' : '/login'} className='flex rounded-full items-center py-2 px-4'>
                    <div className="bg-gray-500 text-white border border-gray-500 rounded-full overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!!user && (
                        <div className='pl-1 font-semibold'>
                            {user.name}
                        </div>
                    )}
                </Link>
            </div>
        </div>
    )
}

export default Header
