// E:\programming\Project\sciclon\pages\users\register.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';

function UserRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  // 追加
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),  // nameを追加
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('token', data.token);  // トークンを保存
        router.push('/users/dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error registering user.');
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;
