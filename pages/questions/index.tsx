// E:\programming\Project\sciclon\pages\questions\index.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Navbar_Member from '../../components/Navbar_Member';

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
        <div className="d-flex flex-column">
            <Navbar_Member />
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4">用語と解説</h2>
                <p className="mb-4">科目とカテゴリーを選択し、「更新」ボタンを押して下さい。</p>
                <div className="form-group">
                <label htmlFor="subjectSelect" className="bg-success text-white p-2">科目の選択:</label>
                    <select 
                        className="form-control"
                        id="subjectSelect"
                        value={selectedSubject}
                        onChange={handleChangeSubject}
                    >
                    <option value="">科目を選択して下さい…</option>
                    <option value="aws_associate_solutions_architect_glossary">AWS Associate Solutions Architect</option>
                    <option value="gcp_associate_cloud_engineer_glossary">GCP Associate Cloud Engineer</option>
                    <option value="gcp_professional_data_engineer_glossary">GCP Professional Data Engineer</option>
                    {/* 他の科目もここに追加... */}
                    </select>
            </div>
            <div className="form-group mb-4">
            <label htmlFor="categorySelect" className="bg-success text-white p-2">カテゴリーの選択:</label>
                <select 
                    className="form-control"
                    id="categorySelect"
                    value={selectedCategory || ''}
                    onChange={e => setSelectedCategory(e.target.value === 'all' ? 'all' : (e.target.value ? Number(e.target.value) : null))}
                >
                    <option value="">カテゴリーを選択して下さい</option>
                    <option value="all">すべてのカテゴリー</option>
                    {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
               </select>
            </div>
            {updateMessage && <div className="alert alert-info mt-3 mb-4">{updateMessage}</div>}
            <Button label="更新" onClick={handleUpdate} variant="primary"/>
            {questions.map((term) => (
                <div key={term.id} className="card mt-4" style={{ height: '250px' }}>
                    <div className="card-header bg-dark text-white">
                        カテゴリー：{term.categoryName}
                    </div>
                    <div className="card-body bg-light" style={{ overflowY: 'auto' }}>
                        <h3 className="card-title">{term.term}</h3>
                        <p className="card-text">{term.explanation}</p>
                    </div>
                </div>
            ))}
        </div>
        <Footer />
    </div>
    );
}

export default QuestionsPage;