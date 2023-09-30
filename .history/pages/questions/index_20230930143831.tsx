// E:\programming\Project\sciclon\pages\questions\index.tsx

import React, { useState, useEffect } from 'react';

type Category = {
    id: number;
    aws_asa_category: string;
};

const QuestionsPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [updateMessage, setUpdateMessage] = useState<string>('');

    const handleUpdate = async () => {
        setUpdateMessage('更新中...');
        const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${selectedSubject}&category=${selectedCategory}`);
        const data = await response.json();
        setQuestions([data]);
        setUpdateMessage('更新完了！');
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/questions/categories');
            const data = await response.json();
            setCategories(data.map((item: any) => item.aws_certifications_name));
        };

        fetchCategories();
    }, []);

    const handleChangeSubject = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedSubject(selectedValue);

        if (selectedValue) {
            // 科目が選択された場合、関連するカテゴリーを取得
            const categoryResponse = await fetch(`/api/questions/categoriesBySubject?subjectGlossary=${selectedValue}`);
            const categoryData = await categoryResponse.json();
            setCategories(categoryData); // 修正: マッピングを削除

            // その後、ランダムな用語を取得
            const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${selectedValue}`);
            const data = await response.json();
            setQuestions([data]);
        } else {
            // 科目が選択されていない場合、カテゴリーと用語をクリア
            setCategories([]);
            setQuestions([]);
        }
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
                        onChange={e => setSelectedCategory(e.target.value === 'all' ? 'all' : (e.target.value ? Number(e.target.value) : null))}
                    >
                        <option value="all">すべてのカテゴリー</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.aws_asa_category}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {questions.map((term) => (
                <div key={term.id}>
                    <button onClick={handleUpdate}>更新</button> {updateMessage}
                    <h4>カテゴリー：{term.categoryName}</h4>
                    <h3>{term.term}</h3>
                    <p>{term.explanation}</p>
                </div>
            ))}
        </div>
    );
}

export default QuestionsPage;