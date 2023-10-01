// E:\programming\Project\sciclon\pages\users\dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Navbar_Member from '../../components/Navbar_Member';

type UserData = {
    email: string;
    member_name: string;  // 追加
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
    const [updatedName, setUpdatedName] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const handleCancel = () => {
        setIsEditing(false);
    };
    const handleCertificationChange = async (cert: Certification) => {
        setSelectedCertification(cert);
        try {
            // AWS_Associate_Solutions_Architectを選択した場合
            if (cert.aws_certifications_name === 'AWS_Associate_Solutions_Architect') {
                const response = await fetch(`/api/questions/aws_associate_solutions_architect`);
                if (!response.ok) {
                    throw new Error("Failed to fetch random quiz.");
                }
                const questionsData = await response.json();
                setQuestions(questionsData);
            } else {
                // その他の認定の場合
                const response = await fetch(`/api/questions/byCertification?id=${cert.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch questions for the selected certification.");
                }
                const data = await response.json();
                setQuestions(data);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

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
            console.log("AWS Certifications:", data);
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
        setUpdatedEmail(userData.email);
        setUpdatedName(userData.member_name);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: updatedEmail, member_name: updatedName, password: updatedPassword }),
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
        <div className="d-flex flex-column min-vh-100">
            <Navbar_Member />
            <div className="container mt-5">
                <h2 className="mb-4">{userData.member_name}さんのダッシュボード</h2>
                <Link href="/questions" className="btn btn-primary mb-3">
                    用語暗記ページへ移動
                </Link>
                {isEditing ? (
                    <div className="mt-4">
                        {/* ... (この部分のコードは変更されていません) */}
                    </div>
                ) : (
                    <div className="mt-4">
                        <div className="card mb-4">
                            <div className="card-body bg-light">
                                <h2 className="card-title p-2">ユーザー情報</h2>
                                <p className="card-text bg-success text-white p-2 mt-2"><strong>お名前:</strong> {userData.member_name}</p>
                                <p className="card-text bg-info text-white p-2 mt-2"><strong>メールアドレス:</strong> {userData.email}</p>
                            </div>
                        </div>
                        <Button label="会員情報の変更" onClick={handleEdit} variant="primary" className="mb-4" />

                        <div className="mt-4">
                            <h3 className="mb-3">Select a certification:</h3>
                            <h4>AWS Certifications</h4>
                            <div className="btn-group-vertical mb-3">
                                {awsCertifications.map(cert => (
                                    <button key={cert.id} onClick={() => handleCertificationChange(cert)} className="btn btn-outline-secondary mb-2">{cert.aws_certifications_name}</button>
                                ))}
                            </div>
                            <h4>GCP Certifications</h4>
                            <div className="btn-group-vertical mb-3">
                                {gcpCertifications.map(cert => (
                                    <button key={cert.id} onClick={() => handleCertificationChange(cert)} className="btn btn-outline-secondary mb-2">{cert.gcp_certifications_name}</button>
                                ))}
                            </div>
                        </div>

                        {selectedCertification && (
                            <div className="mt-4">
                                {/* ここで選択された認定に関連する問題や用語を表示します。 */}
                                <h3 className="mb-3">Questions for {selectedCertification.aws_certifications_name || selectedCertification.gcp_certifications_name}</h3>
                                {/* ... */}
                            </div>
                        )}

                        {quiz && (
                            <div className="mt-4">
                                <h3 className="mb-3">{quiz.term}</h3>
                                <ul className="list-group">
                                    {quiz.choices.map((choice, index) => (
                                        <li key={index} className="list-group-item">{choice}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserDashboard;
