E:\programming\Project\sciclon\pages\questions\index.tsx

import React, { useState, useEffect } from 'react';

const QuestionsPage: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/questions/categories');
            const data = await response.json();
            setCategories(data.map((item: any) => item.category));
        };

        fetchCategories();
    }, []);

    const handleChangeCategory = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);

        const response = await fetch(`/api/questions/byCategory?category=${event.target.value}`);
        const data = await response.json();
        setQuestions(data);
    };

    return (
        <div>
            <h2>Questions by Category</h2>
            <label>
                Select Category:
                <select value={selectedCategory} onChange={handleChangeCategory}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
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
