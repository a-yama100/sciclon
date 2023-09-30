// E:\programming\Project\sciclon\pages\users\dashboard.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type UserData = {
    email: string;
    // 他のユーザーデータの型もここに追加できます。
};
type Certification = {
    id: number;
    aws_certifications_name?: string;
    gcp_certifications_name?: string;
  };

const UserDashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [quiz, setQuiz] = useState<{ term: string; choices: any[]; correctExplanation: string } | null>(null);
    const [awsCertifications, setAwsCertifications] = useState<Certification[]>([]);
    const [gcpCertifications, setGcpCertifications] = useState<Certification[]>([]);
    const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

    const handleSubjectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(event.target.value);
        try {
            // カテゴリーに基づいて問題を取得
            const response = await fetch(`/api/questions/bySubject?subject=${event.target.value}`);
            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Failed to fetch questions for selected subject');
            }

            // random.ts APIを呼び出してランダムな問題を取得
            const quizResponse = await fetch(`/api/questions/random?subject=${event.target.value}`);
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
                setSubjects(subjectsList);
            } else {
                console.error('Failed to fetch subjects');
            }
        } catch (error) {
            console.error('An error occurred while fetching subjects:', error);
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

    
    useEffect(() => {
        // AWSの認定リストを取得
        const fetchAwsCertifications = async () => {
            const response = await fetch('/api/certifications/aws');
            const data = await response.json();
            setAwsCertifications(data);
        };
        fetchAwsCertifications();
        
        // GCPの認定リストを取得
        const fetchGcpCertifications = async () => {
            const response = await fetch('/api/certifications/gcp');
            const data = await response.json();
            setGcpCertifications(data);
        };
        fetchGcpCertifications();
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

    const handleCertificationChange = async (cert: Certification) => {
        setSelectedCertification(cert);
        // ここでAPIを呼び出して、選択された認定に関連する問題を取得できます。
        // 例: 
        // const response = await fetch(`/api/questions/byCertification?id=${cert.id}`);
        // const data = await response.json();
        // setQuestions(data);
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

                    <h3>AWS Certifications</h3>
                        <ul>
                            {awsCertifications.map(cert => (
                                <li key={cert.id}>{cert.aws_certifications_name}</li>
                            ))}
                        </ul>

                        {/* GCPの認定リストを表示 */}
                    <h3>GCP Certifications</h3>
                    <ul>
                        {gcpCertifications.map(cert => (
                            <li key={cert.id}>{cert.gcp_certifications_name}</li>
                        ))}
                    </ul>
                    <h3>Select a subject to view questions:</h3>
                    <select value={selectedSubject} onChange={handleSubjectChange}>
                        <option value="">--Select a subject--</option>
                        {subjects.map(subjects => (
                            <option key={subjects} value={subjects}>{subjects}</option>
                        ))}
                    </select>

                    <h3>Select a certification:</h3>
            <div>
                <h4>AWS Certifications</h4>
                <ul>
                    {awsCertifications.map(cert => (
                        <li key={cert.id} onClick={() => handleCertificationChange(cert)}>{cert.aws_certifications_name}</li>
                    ))}
                </ul>
                <h4>GCP Certifications</h4>
                <ul>
                    {gcpCertifications.map(cert => (
                        <li key={cert.id} onClick={() => handleCertificationChange(cert)}>{cert.gcp_certifications_name}</li>
                    ))}
                </ul>
            </div>
            {selectedCertification && (
                <div>
                    {/* ここで選択された認定に関連する問題や用語を表示します。 */}
                    <h3>Questions for {selectedCertification.aws_certifications_name || selectedCertification.gcp_certifications_name}</h3>
                    {/* ... */}
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
上記のコードは概念的なもので、具体的なAPIのエンドポイントやデータ構造に合わせて調整が必要です。しかし、このコードを基にして、ユーザーダッシュボードでの認定の選択と、それに関連する問題の表示の実装が可能です。








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
