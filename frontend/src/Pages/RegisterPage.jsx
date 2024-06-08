import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Modal from '../Modal';

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null); // Reset any previous error state

        try {
            const response = await axios.post('/register', { name, email, password });
            const newName = response.data.name;
            setModalMessage(`Successful registration, ${newName}. Now please login.`);
            setModalOpen(true);
        } catch (error) {
            console.error('Error registering:', error);
            if (error.response) {
                setError(error.response.data.message || 'Registration failed! Please try again.');
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
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <div className="md:w-6/12 mx-auto">
                <h2 className='text-center text-3xl mb-8 mt-32 font-semibold'>Register</h2>
                <form className="" onSubmit={handleSubmit}>
                    <div className=" flex flex-col mb-2">
                        <label className='text-lg font-bold mb-1'>Username</label>
                        <input className='border border-black pl-3 p-2 rounded-xl' type="text" placeholder='username' value={name}
                            onChange={ev => setName(ev.target.value)} required />
                    </div>
                    <div className=" flex flex-col mb-2">
                        <label className='text-lg font-bold mb-1'>Email</label>
                        <input className='border border-black pl-3 p-2 rounded-xl' type="email" placeholder='johndoe@gmail.com' value={email}
                            onChange={ev => setEmail(ev.target.value)} required />
                    </div>
                    <div className=" flex flex-col mb-2">
                        <label className='text-lg font-bold mb-1'>Password</label>
                        <input className='border border-black pl-3 p-2 rounded-xl' type="password" placeholder='password' value={password}
                            onChange={ev => setPassword(ev.target.value)} required />
                    </div>
                    <button className='text-center mt-3 w-full bg-black text-white p-3 rounded-2xl font-bold'>Register</button>
                </form>
                <p className='pt-3 flex justify-end'>Already a member?
                    <Link to={'/login'} className="underline font-semibold pl-1">Login</Link>
                </p>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onRedirect={handleRedirect}
                    title="Registration Status"
                >
                    {modalMessage}
                </Modal>
            </div>
        </div>
    )
}

export default RegisterPage
