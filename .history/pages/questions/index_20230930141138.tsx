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
        setSelectedCategory(null);  // カテゴリーの選択をリセット

        if (event.target.value) {
            // 科目が選択された場合、関連するカテゴリーを取得
            const categoryResponse = await fetch(`/api/questions/categoriesBySubject?subjectGlossary=${event.target.value}`);
            const categoryData = await categoryResponse.json();
            setCategories(categoryData);
        } else {
            // 科目が選択されていない場合、カテゴリーをクリア
            setCategories([]);
        }
        // その後、ランダムな用語を取得
        const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${event.target.value}`);
        const data = await response.json();
        setQuestions([data]);
    };

    return (
        <div>
            <h2>Terms by Subject</h2>
            <div>
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
            </div>
            <div>
            <label>
                Select Category:
                <select 
    value={selectedCategory || ''} 
    onChange={e => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
>
    <option value="">Select a category</option>
    {categories.map(category => (
        <option key={category.id} value={category.id}>
            {category.aws_asa_category}
        </option>
    ))}
</select>

            </label>
            </div>
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