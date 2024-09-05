import React from 'react';
import '../styles/EvaluationResult.css';

interface Props {
    correctCount: number;
    totalQuestions: number;
}

const EvaluationResult: React.FC<Props> = ({ correctCount, totalQuestions }) => {
    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);

    return (
        <div className="evaluation-result">
            <h3>Evaluation Result</h3>
            <div className="result-container">
                <p className="result-text">
                    You answered <span className="correct-count">{correctCount}</span> out of <span className="total-questions">{totalQuestions}</span> questions correctly.
                </p>
                <p className="percentage-text">
                    That's <span className="percentage">{percentage}%</span> correct!
                </p>
            </div>
            <button className="retry-button" onClick={() => window.location.reload()}>Try Again</button>
        </div>
    );
};

export default EvaluationResult;
