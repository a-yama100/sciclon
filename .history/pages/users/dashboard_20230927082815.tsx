// E:\programming\Project\sciclon\pages\users\dashboard.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type UserData = {
    email: string;
    // 他のユーザーデータの型もここに追加できます。
  };

const UserDashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [quiz, setQuiz] = useState<{ term: string; choices: any[]; correctExplanation: string } | null>(null);

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        try {
            // カテゴリーに基づいて問題を取得
            const response = await fetch(`/api/questions/byCategory?category=${event.target.value}`);
            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Failed to fetch questions for selected category');
            }

            // random.ts APIを呼び出してランダムな問題を取得
            const quizResponse = await fetch(`/api/questions/random?category=${event.target.value}`);
            const quizData = await quizResponse.json();
            setQuiz(quizData);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/questions/subjects');
            if (response.ok) {
                const subjectsList = await response.json();
                setsubjects(categoriesList);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('An error occurred while fetching categories:', error);
        }
    };

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/users/login');
                return;
            }

            try {
                const response = await fetch('/api/users/data', {
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
                setLoading(false); // ここでsetLoading(false)を追加
            }
        };

        fetchUserData();
    }, [router]);

    useEffect(() => {
        fetchCategories();
    }, []);  // このuseEffectはコンポーネントのマウント時にのみ実行されます。

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

                    {quiz && (
                            <div>
                            <h3>{quiz.term}</h3>
                            <ul>
                                {quiz.choices.map((choice, index) => (
                                <li key={index}>{choice.explanation}</li>
                                ))}
                            </ul>
                            </div>
                    )}
                </>
            )}
        </div>
    );
}

export default UserDashboard;
