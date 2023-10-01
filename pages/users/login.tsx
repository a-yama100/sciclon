// E:\programming\Project\sciclon\pages\users\login.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // トークンをlocalStorageに保存
            localStorage.setItem('token', data.token);
            // ダッシュボードページにリダイレクト
            window.location.href = '/users/dashboard';
        } else {
            setErrorMessage(data.error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container mt-5">
                <h2 className="mb-4">会員ログイン</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;