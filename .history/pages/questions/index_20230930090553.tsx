return (
    <div>
        <h2>Terms by Subject</h2>
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
                    <h4>{term.categoryName}</h4> {/* カテゴリー名を表示 */}
                    <h3>{term.term}</h3>
                    <p>{term.explanation}</p>
                </div>
            ))}
        </div>
    </div>
);