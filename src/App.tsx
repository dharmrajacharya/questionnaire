import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import Questionnaire from './components/Questionnaire';
import EvaluationResult from './components/EvaluationResult';
import { Questionnaire as QuestionnaireModel } from './models/Questionnaire';
import questionsCsv from './assets/questions.csv'; // Import CSV file
import './App.css';

const App: React.FC = () => {
    const initialData: QuestionnaireModel = useMemo(() => ({
        title: "Sample Questionnaire",
        questions: [],
    }), []);

    const [questionnaire, setQuestionnaire] = useState<QuestionnaireModel>(initialData);
    const [correctCount, setCorrectCount] = useState<number | null>(null);

    useEffect(() => {
        const parseCSV = (csv: any) => {
            Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: (results: any) => {
                    const formattedData = results.data.map((item: any) => ({
                        id: item.id,
                        text: item.question,
                        options: item.options ? JSON.parse(item.options) : [],
                        correctAnswer: item.correctAnswer,
                    }));
                    setQuestionnaire({ ...initialData, questions: formattedData });
                },
            });
        };

        const fetchData = async () => {
            try {
                fetch(questionsCsv)
                    .then(response => response.text())
                    .then(text => parseCSV(text))
                    .catch(error => console.error('Error fetching CSV:', error));

            } catch (error) {
                console.error("Error loading CSV file:", error);
            }
        };

        fetchData();
    }, [initialData]); // Now `initialData` is memoized

    const handleEvaluate = (count: number) => {
        setCorrectCount(count);
    };

    return (
        <div className="App">
            {correctCount === null ? (
                <Questionnaire
                    title={questionnaire.title}
                    questionnaire={questionnaire}
                    onEvaluate={handleEvaluate}
                />
            ) : (
                <EvaluationResult
                    correctCount={correctCount}
                    totalQuestions={questionnaire.questions.length}
                />
            )}
        </div>
    );
};

export default App;
