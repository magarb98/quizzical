import "../App.css";

export default function Answers({
  choice,
  question,
  quizQuestions,
  setQuizQuestions,
  check,
}) {
  function styles() {
    if (check) {
      if (choice.id === question.answer.id) {
        return "option correct";
      }
      if (choice.id !== question.selectedChoiceId) {
        return "disabled option";
      }
      return "disabled incorrect option";
    }
    return question.selectedChoiceId === choice.id ? "picked" : "option";
  }

  return (
    <button
      onClick={() => {
        if (check) return;
        if (question.selectedChoiceId === choice.id) {
          question.selectedChoiceId = undefined;
        } else {
          question.selectedChoiceId = choice.id;
        }
        // choices.forEach((x) => {
        //   if (choice.id !== x.id) choice.selected = false;
        // });
        // choice.selected = !choice.selected;
        setQuizQuestions(quizQuestions.slice());
      }}
      className={styles()}
    >
      {choice.choice}
    </button>
  );
}
