import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Modal from '../Modal.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { setUser } = useContext(UserContext);

    const handleLogin = async (ev) => {
        ev.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/login', {
                email,
                password
            });

            if (response.status === 200) {
                setUser(response.data);
                setModalMessage(`Login Successful.`);
                setModalOpen(true);
            } else {
                setError('Login failed! Please try again.');
            }

        } catch (error) {
            console.error('Error logging in:', error);
            // Set error message based on the response
            if (error.response) {
                setError(error.response.data.message || 'Login failed! Please try again.');
            } else {
                setError('Network error! Please try again later.');
            }
            setModalMessage(error.message);
            setModalOpen(true);
        }
    };

    const handleRedirect = () => {
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="md:w-6/12 mx-auto">
                <h2 className='text-center text-3xl mb-8 mt-32 font-semibold'>Login</h2>
                <form className="mb-3" onSubmit={handleLogin}>
                    <div className=" flex flex-col">
                        <label className='text-lg font-bold mb-1'>Email</label>
                        <input className='border border-black pl-3 p-2 rounded-xl' type="email" placeholder='email@gmail.com' value={email}
                            onChange={ev => setEmail(ev.target.value)} required />
                    </div>
                    <div className=" flex flex-col mb-2">
                        <label className='text-lg font-bold mb-1'>Password</label>
                        <input className='border border-black pl-3 p-2 rounded-xl' type="password" placeholder='password' value={password}
                            onChange={ev => setPassword(ev.target.value)} required />
                    </div>
                    {/* <div className=" flex items-center mb-2">
                        <input className='' type="checkbox"/>
                        <label >Remember me</label>
                    </div> */}
                    <button className='text-center mt-2 w-full bg-black text-white p-3 rounded-2xl font-bold'>Login</button>
                </form>
                <p className='pt-3 flex justify-end'>Not yet registered? <a className='underline font-semibold pl-1' href="/register">Register</a> </p>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onRedirect={handleRedirect}
                    title="Login Status"
                >
                    {modalMessage}
                </Modal>
            </div>
        </div>
    )
}

export default Login
