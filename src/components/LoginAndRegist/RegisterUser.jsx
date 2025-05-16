import React, { useEffect, useState } from 'react';
import logo from '../../../public/logo.svg';
import { Link } from 'react-router-dom';
import { register } from '../../service/authAPI';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase-config';

const RegisterUser = () => {
  const navigate = useNavigate();

  // fungsi register google
  const registerGoogle = async (idToken) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/google-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await res.json();

      console.log('Backend response:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Registration with Google successful!');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      if (error.message === 'Akun telah terdaftar, silakan login saja.') {
      toast.error(error.message);
    } else {
      toast.error(error.message);
    }
  }
  };

  // button handle google
  const registerWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const idToken = res._tokenResponse.idToken; // gunakan token ini untuk backend

      // Kirim token ke backend
      await registerGoogle(idToken);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // state untuk menyimpan input user
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // cek apakah user sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  // update title
  useEffect(() => {
    document.title = 'Register';
    return () => {
      document.title = 'ReKicks | Style in Every Step';
    };
  }, []);

  // handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      toast.success('Registration successful!');

      setTimeout(() => {
        // save token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        navigate('/home');
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="flex justify-center border-b-2 border-gray-400 bg-gray-50 pt-5 pb-5">
        <img src={logo} alt="Logo" className="w-40" />
      </div>

      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 py-15">
        <form
          onSubmit={handleRegister}
          className="bg-white font-[poppins] p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            Create an Account
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Access to the world’s most exclusive and authenticated products.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-md cursor-pointer hover:bg-gray-800 transition"
            >
              Register
            </button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            onClick={registerWithGoogle}
            className="w-full flex items-center justify-center border border-gray-300 py-2 cursor-pointer rounded-md hover:bg-gray-50 transition"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Log in with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-red-500 font-medium hover:underline"
            >
              {' '}
              Log-in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
