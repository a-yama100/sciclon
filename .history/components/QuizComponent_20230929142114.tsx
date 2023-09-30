// E:\programming\Project\sciclon\components\QuizComponent.tsx

import React, { useState, useEffect } from 'react';

const QuizComponent: React.FC = () => {
    const [quizData, setQuizData] = useState<any>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [resultMessage, setResultMessage] = useState<string>('');

    useEffect(() => {
        const fetchQuizData = async () => {
            const response = await fetch('/api/questions/randomQuiz');
            const data = await response.json();
            setQuizData(data);
        };

        fetchQuizData();
    }, []);

    const handleAnswer = () => {
        if (selectedAnswer === quizData.correctAnswer) {
            setResultMessage('正解');
        } else {
            setResultMessage('間違い');
        }
    };

    return (
        <div>
            {quizData && (
                <div>
                    <h2>{quizData.term}</h2>
                    {quizData.choices.map((choice: string, index: number) => (
                        <div key={index}>
                            <input type="radio" name="answer" value={choice} onChange={(e) => setSelectedAnswer(e.target.value)} />
                            <label>{choice}</label>
                        </div>
                    ))}
                    <button onClick={handleAnswer}>回答</button>
                    {resultMessage && <div>{resultMessage}</div>}
                </div>
            )}
        </div>
    );
}

export default QuizComponent;
