// E:\programming\Project\sciclon\pages\users\dashboard.tsx

import React, { useState, useEffect } from 'react';

const UserDashboard: React.FC = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // localStorageからトークンを取得
                const token = localStorage.getItem('token');
                const response = await fetch('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error loading user data</div>;
    }

    return (
        <div>
            <h2>Your Dashboard</h2>
            <p>Email: {userData.email}</p>
            {/* 他のユーザー情報もこちらに表示 */}

            {/* 編集や退会のボタンもこちらに追加 */}
        </div>
    );
}

export default UserDashboard;
