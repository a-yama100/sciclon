// E:\programming\Project\sciclon\pages\questions\index.tsx

import React, { useState, useEffect } from 'react';

const QuestionsPage: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

    const handleUpdate = async () => {
        if (!selectedSubject) return; // 何も選択されていない場合は何もしない
    
        const categoryParam = selectedCategory ? `&category=${selectedCategory}` : '';
        const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${selectedSubject}${categoryParam}`);
        const data = await response.json();
        setQuestions([data]);
    };
    
    return (
        <div>
            <h2>Terms by Subject</h2>
            <label>
    Select Category:
    <select value={selectedCategory} onChange={e => setSelectedCategory(Number(e.target.value))}>
        <option value="">Select a category</option>
        {categories.map(category => (
            <option key={category.id} value={category.id}>
                {category.aws_asa_category}
            </option>
        ))}
    </select>
</label>

            <label>
                Select Subject:
                <select value={selectedSubject} onChange={handleChangeSubject}>
                    <option value="">Select a subject</option>
                    <option value="aws_associate_solutions_architect_glossary">AWS Associate Solutions Architect</option>
                    <option value="gcp_associate_cloud_engineer_glossary">GCP Associate Cloud Engineer</option>
                    <option value="gcp_professional_data_engineer_glossary">GCP Professional Data Engineer</option>
                    {/* 他の科目もここに追加... */}
                </select>
            </label>
            <div>
                {questions.map((term) => (
                    <div key={term.id}>
                        <button onClick={handleUpdate}>更新</button>
                        <h4>カテゴリー：{term.categoryName}</h4>
                        <h3>{term.term}</h3>
                        <p>{term.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionsPage;