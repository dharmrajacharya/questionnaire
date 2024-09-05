import React from 'react';
import { Question as QuestionModel } from '../models/Question';
import '../styles/Question.css';


interface Props {
    index: number;
    question: QuestionModel;
    answer?: string;
    onAnswerChange: (answer: string) => void;
}

const Question: React.FC<Props> = ({ index, question, answer, onAnswerChange }) => {
    return (
        <div className="question">
            <p><b>{`${index+1}. ${question.text}`}</b></p>
            {question.options.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={answer === option} 
                            onChange={(e) => onAnswerChange(e.target.value)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Question;