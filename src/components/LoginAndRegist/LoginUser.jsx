import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.svg';
import { login } from '../../service/authAPI';
import toast, { Toaster } from 'react-hot-toast';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase-config";

const LoginUser = () => {
  const navigate = useNavigate();

  // fungsi register google
  const loginGoogle = async (idToken) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
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
      console.error('Error in registerGoogle:', error);
    }
  };

  // button handle google
  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const idToken = res._tokenResponse.idToken; // gunakan token ini untuk backend

      // Kirim token ke backend
      await loginGoogle(idToken);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // cek apakah user sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);

  // state untuk menyimpan input user
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // ubah judul halaman
  useEffect(() => {
    document.title = 'Login';
    return () => {
      document.title = 'ReKicks | Style in Every Step';
    };
  }, []);

  // fungsi login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      toast.success(res.data.message);

      setTimeout(() => {
        // simpan token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate('/home');
      }, 2000);
    } catch (error) {
      toast.error('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="flex justify-center border-b-2 border-gray-400 bg-gray-50 pt-5 pb-5">
        <img src={logo} alt="Logo" className="w-40" />
      </div>

      {/* Form login */}
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 py-15">
        <Toaster position="top-center" />
        <div className="bg-white font-[poppins] p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center mb-6">
            Access to the world’s most exclusive and authenticated products.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-md cursor-pointer hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          {/* OR */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Login Google */}
          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center border border-gray-300 py-2 cursor-pointer rounded-md hover:bg-gray-50 transition">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Log in with Google
          </button>

          {/* Link ke register */}
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{' '}
            <Link to="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
