import { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import { nanoid } from "nanoid";
import { decode } from "he";

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStart, setQuizStart] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    async function quizAPI() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await res.json();
      setQuizQuestions(getQuestions(data.results));
    }
    quizAPI();
    setLoading(false);
  }, [resetToggle]);

  console.log(quizQuestions);

  function getQuestions(unfilteredArray) {
    return unfilteredArray.map((q) => {
      const choices = q.incorrect_answers.map((item) => ({
        id: nanoid(),
        choice: decode(item),
      }));
      const correct_answer = { id: nanoid(), choice: decode(q.correct_answer) };
      return {
        id: nanoid(),
        question: decode(q.question),
        choices: shuffle(choices.concat(correct_answer)),
        answer: correct_answer,
        selectedChoiceId: undefined,
      };
    });
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const elements = quizQuestions.map((elem) => {
    return (
      <Question
        key={elem.id}
        question={elem}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
        check={check}
      />
    );
  });

  function getCorrectAnswersCount(quizQuestions) {
    return quizQuestions.reduce(
      (previous, current) =>
        previous + (current.selectedChoiceId === current.answer.id ? 1 : 0),
      0
    );
  }

  return (
    <div className="App">
      <main>
        <div className="bg"></div>
        <div className="bg-1"></div>
        {quizStart ? (
          <div>
            {loading ? "...Loading" : elements}
            {check ? (
              <>
                <p className="score">
                  You scored {getCorrectAnswersCount(quizQuestions)}/
                  {quizQuestions.length} correct answers
                </p>
                <button
                  className="blueButton"
                  onClick={() => {
                    setCheck(false);
                    setResetToggle(!resetToggle);
                    setLoading(true);
                  }}
                >
                  Play again
                </button>
              </>
            ) : (
              <button className="blueButton" onClick={() => setCheck(true)}>
                Check answers
              </button>
            )}
          </div>
        ) : (
          <div>
            <h1>Quizzical</h1>
            <p>Some description</p>
            <button onClick={() => setQuizStart(true)}>Start quiz</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
