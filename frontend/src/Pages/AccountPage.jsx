import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext.jsx'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


const AccountPage = () => {

  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // let { subpage } = useParams();
  // if (subpage === 'account') {
  //   subpage = 'profile';
  // }

  async function logout(e) {
    e.preventDefault();

    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!ready && !user) {
          const { data } = await axios.get('/profile');
          if (data) {
            setUser(data);
          } else {
            setRedirect('/');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [ready, user, setUser]);

  async function handleChangePassword(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/change-password', {
        currentPassword,
        newPassword
      });

      setMessage("Password updated successfully.");
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.response ? error.response.data : "Error updating password.");
    }
  }

  if (!ready) {
    return (
      <div className="loader flex self-center my-auto"></div>
    )
  }

  // if (ready && !user && !redirect) {
  //   return <Navigate to={'/login'} />
  // }


  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <div className=' p-1 max-w-lg mx-auto rounded-xl my-4'>
        <div className="w-full h-full bg-gray-400 px-8  
        py-16 rounded-lg overflow-hidden  
        text-center relative">
          <div
            className="w-40 h-40 rounded-full  
                inline-flex items-center justify-center  
                bg-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-40">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="pl-2 p-2 rounded bg-gray-200 my-2">
          <label>Name : <b>{user.name}</b></label>
          <span></span>
        </div>
        <div className="pl-2 p-2 rounded bg-gray-200 my-2">
          <label>Email : <b>{user.email}</b></label>
        </div>

        <form onSubmit={handleChangePassword} className="bg-gray-200 p-5 rounded-lg mt-4">
          <h3 className="mb-4 text-lg font-semibold">Change Password</h3>
          <div className="mb-2">
            <label className="block mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-black rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-black rounded"
              required
            />
          </div>
          <button type="submit" className="bg-black text-white p-2 rounded-lg w-full mt-2">
            Change Password
          </button>
          {message && <p className="mt-2 text-center text-red-500">{message}</p>}
        </form>

        <button onClick={logout} className='bg-black w-full text-white mt-2 p-2 text-lg font-bold rounded-xl'>Logout</button>
      </div>
    </div>
  )
}

export default AccountPage;