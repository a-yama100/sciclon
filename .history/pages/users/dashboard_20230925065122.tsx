// E:\programming\Project\sciclon\pages\users\dashboard.tsx

import React, { useState, useEffect } from 'react';

const UserDashboard: React.FC = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        try {
            const response = await fetch(`/api/questions/byCategory?category=${event.target.value}`);
            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Failed to fetch questions for selected category');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    

    const response = await fetch(`/api/questions/byCategory?category=${event.target.value}`);
    const data = await response.json();
    setQuestions(data);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/questions/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.map((item: any) => item.category));
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchCategories();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error loading user data</div>;
    }

    const handleEdit = () => {
        setIsEditing(true);
        setUpdatedEmail(userData.email); // 初期値として現在のemailを設定
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: updatedEmail }),
        });

        if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsEditing(false);
        } else {
            console.error('Failed to update user data');
        }
    };

    return (
        <div>
            <h2>Your Dashboard</h2>
            {isEditing ? (
                <div>
                    <label>
                        Email:
                        <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                    </label>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <>
                    <p>Email: {userData.email}</p>
                    <button onClick={handleEdit}>Edit</button>

                    <h3>Select a category to view questions:</h3>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">--Select a category--</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {questions.map(question => (
                        <div key={question.question_id}>
                            <h4>{question.text}</h4>
                            {/* 問題の選択肢や他の情報もここに表示 */}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default UserDashboard;
