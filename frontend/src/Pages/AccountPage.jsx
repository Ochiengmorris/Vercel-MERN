import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext.jsx'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


const AccountPage = () => {

  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === 'account') {
    subpage = 'profile';
  }

    async function logout() {
      await axios.post('/logout');
      setRedirect('/');
      setUser(null);
    }

  if (!ready) {
    return 'Loading... please wait!';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }


  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <div className=' p-1 max-w-lg mx-auto rounded-xl my-4'>
        <div className="pl-2 p-2 rounded bg-gray-200 my-2">
          <label>Name : <b>{user.name}</b></label>
        </div>
        <div className="pl-2 p-2 rounded bg-gray-200 my-2">
          <label>Email : <b>{user.email}</b></label>
        </div>
        <button onClick={logout} className='bg-black w-full text-white mt-2 p-2 text-lg font-bold rounded-xl'>Logout</button>
      </div>
      {/* {subpage === 'places' && (
        <PlacesPage />
      )} */}
    </div>
  )
}

export default AccountPage;