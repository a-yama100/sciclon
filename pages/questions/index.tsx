// E:\programming\Project\sciclon\pages\questions\index.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Category = {
    id: number;
    name: string;
};

const QuestionsPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | 'all' | null>(null);

    const [updateMessage, setUpdateMessage] = useState<string>('');

    const handleUpdate = async () => {
        setUpdateMessage('');
        const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${selectedSubject}&category=${selectedCategory}`);
        const data = await response.json();
        setQuestions([data]);
        setUpdateMessage('');
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
        setQuestions([]);
        if (selectedValue) {
            // 科目が選択された場合、関連するカテゴリーを取得
            const categoryResponse = await fetch(`/api/questions/categoriesBySubject?subjectGlossary=${selectedValue}`);
            const categoryData = await categoryResponse.json();
            const categoryDataMapped = categoryData.map((item: any) => ({
                id: item.id,
                name: Object.values(item).filter(value => typeof value === 'string')[0]  // 最初の文字列のカラム値を取得
            }));

            setCategories(categoryDataMapped);

            // その後、ランダムな用語を取得
            const response = await fetch(`/api/questions/randomTermFromGlossary?glossary=${selectedValue}`);
            const data = await response.json();
            setQuestions([data]);
        } else {
            // 科目が選択されていない場合、カテゴリーと用語をクリア
            setCategories([]);
            setQuestions([]);
        }
        handleUpdate();
    };

    return (
        <div>
        <h2>用語と解説</h2>
        <p><Link href="/users/dashboard">ダッシュボードに戻る</Link></p>
        <div>
        <label>
            科目の選択:
            <select value={selectedSubject} onChange={handleChangeSubject}>
                <option value="">科目を選択して下さい…</option>
                <option value="aws_associate_solutions_architect_glossary">AWS Associate Solutions Architect</option>
                <option value="gcp_associate_cloud_engineer_glossary">GCP Associate Cloud Engineer</option>
                <option value="gcp_professional_data_engineer_glossary">GCP Professional Data Engineer</option>
                {/* 他の科目もここに追加... */}
            </select>
        </label>
        </div>
        <div>
            <label>
                カテゴリーの選択:
                <select 
                    value={selectedCategory || ''}
                    onChange={e => setSelectedCategory(e.target.value === 'all' ? 'all' : (e.target.value ? Number(e.target.value) : null))}
                >
                    <option value="">カテゴリーを選択して下さい</option> {/* こちらが変更された部分です */}
                    <option value="all">すべてのカテゴリー</option>
                    {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
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