// E:\programming\Project\sciclon\pages\questions\index.tsx

import React, { useState, useEffect } from 'react';

const QuestionsPage: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/questions/categories');
            const data = await response.json();
            setCategories(data.map((item: any) => item.aws_certifications_name));
        };

        fetchCategories();
    }, []);


    // 科目の選択が変更されたときの処理
    const handleChangeSubject = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(event.target.value);

        // 科目に関連する用語と解説をランダムに取得
        const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${event.target.value}`);
        const data = await response.json();
        setQuestions([data]);
    };

    return (
        <div>
            <h2>Questions by Subject</h2>
            <label>
                Select Subject:
                <select value={selectedSubject} onChange={handleChangeSubject}>
                    <option value="">Select a subject</option>
                    {categories.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </label>

            <div>
                {questions.map((question) => (
                    <div key={question.question_id}>
                        <h3>{question.text}</h3>
                        {/* 問題の選択肢や他の情報もここに表示 */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionsPage;