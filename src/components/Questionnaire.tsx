import React, { useState } from 'react';
import { Questionnaire as QuestionnaireModel } from '../models/Questionnaire';
import Question from './Question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Questionnaire.css';

interface Props {
    title: string;
    questionnaire: QuestionnaireModel;
    onEvaluate: (correctCount: number) => void;
}

const QUESTIONS_PER_PAGE = 5;

const Questionnaire: React.FC<Props> = ({ title, questionnaire, onEvaluate }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(questionnaire.questions.length).fill(''));

    const handleAnswerChange = (index: number, answer: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const evaluate = () => {
        let correctCount = 0;
        questionnaire.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctCount++;
            }
        });
        onEvaluate(correctCount);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(questionnaire.questions.length / QUESTIONS_PER_PAGE) - 1));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleSubmit = () => {
        const allQuestionsAnswered = answers.every((answer) => typeof answer === 'string' && answer.trim() !== '');

        if (allQuestionsAnswered) {
            evaluate();
        } else {
            toast.error("Please answer all the questions before submitting.");
        }
    };

    const currentQuestions = questionnaire.questions.slice(
        currentPage * QUESTIONS_PER_PAGE,
        (currentPage + 1) * QUESTIONS_PER_PAGE
    );

    return (
        <div className="questionnaire">
            <h2>{title}</h2>
            {currentQuestions.map((question, index) => (
                <Question
                    index={currentPage * QUESTIONS_PER_PAGE + index}
                    key={question.id}
                    question={question}
                    answer={answers[currentPage * QUESTIONS_PER_PAGE + index]} // Pass current answer
                    onAnswerChange={(answer) => handleAnswerChange(currentPage * QUESTIONS_PER_PAGE + index, answer)}
                />
            ))}
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <div className="page-indicator">
                    Page {currentPage + 1} of {Math.ceil(questionnaire.questions.length / QUESTIONS_PER_PAGE)}
                </div>
                <button onClick={handleNextPage} disabled={(currentPage + 1) * QUESTIONS_PER_PAGE >= questionnaire.questions.length}>
                    Next
                </button>
            </div>
            {currentPage === Math.ceil(questionnaire.questions.length / QUESTIONS_PER_PAGE) - 1 && (
                <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
                    Submit
                </button>
            )}
            <ToastContainer />
        </div>
    );
};

export default Questionnaire;
