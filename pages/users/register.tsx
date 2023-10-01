// E:\programming\Project\sciclon\pages\users\register.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

function UserRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('token', data.token);
        router.push('/users/dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error registering user.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5">
        <h2>ユーザ登録</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary">ユーザ登録</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default UserRegister;
