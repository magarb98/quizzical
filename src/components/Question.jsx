import React from "react";
import Answers from "./Answers";

export default function Question({
  question,
  quizQuestions,
  setQuizQuestions,
  check,
}) {
  const answerElements = question.choices.map((choice) => {
    return (
      <Answers
        key={choice.id}
        question={question}
        choice={choice}
        setQuizQuestions={setQuizQuestions}
        quizQuestions={quizQuestions}
        check={check}
      />
    );
  });

  return (
    <div className="question">
      <h2>{question.question}</h2>
      {answerElements}
    </div>
  );
}
