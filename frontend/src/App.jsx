import { useState } from 'react'
import axios from 'axios';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import IndexPage from './Pages/IndexPage.jsx';
import Login from './Pages/Login.jsx';
import Layout from './Layout.jsx'
import RegisterPage from './Pages/RegisterPage.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import { UserContextProvider } from './UserContext.jsx';

axios.defaults.baseURL = 'https://notesbackend-4e6s.onrender.com';
axios.defaults.withCredentials = true;


function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<AccountPage />} />
          </Route>

        </Routes>
      </UserContextProvider>

    </>
  )
}

export default App
