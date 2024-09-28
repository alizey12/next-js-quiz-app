"use client";
import "../app/globals.css";
import { useState } from "react";
import Result from "../../src/pages/Result";
import { useRouter } from "next/router";

export default function Card() {
  const questions = [
    {
      question: "Who was the first person to step on the moon?",
      optionA: "Neil Armstrong",
      optionB: "John Glenn",
      optionC: "Buzz Aldrin",
      optionD: "Yuri Gagarin",
      answer: "Neil Armstrong",
    },

    {
      question: "Which planet is known as the Red Planet?",
      optionA: "Jupiter",
      optionB: "Mars",
      optionC: "Venus",
      optionD: "Earth",
      answer: "Mars",
    },

    {
      question: "What is the largest oceann in the world",
      optionA: "Atlantic Oceann",
      optionB: "Indian Ocean",
      optionC: "Pacific Ocean",
      optionD: "Arctic Ocean",
      answer: "Pacific Ocean",
    },

    {
      question: "What is the longest river in the world?",
      optionA: "Amazon River",
      optionB:"Mississippi River",
      optionC:"Yangtze River",
      optionD: "Nile River",
      answer: "Nile River",
    },


    {
      question: "In which year did World War I begin?",
      optionA: "1912",
      optionB: "1914",
      optionC: "1916",
      optionD: "1918",
      answer: "1914",
    },

    {
      question: "Which element has the chemical symbol 'O'?",
      optionA: "Oxygen",
      optionB: "Osmium",
      optionC: "Orthonium",
      optionD: "Ozone",
      answer: "Oxygen",
    },


    {
      question: "What is the hardest natural substance on Earth?",
      optionA: "Gold",
      optionB: "Iron",
      optionC: "Diamond",
      optionD: "Platinum",
      answer: "Diamond",
    },


    {
      question: "Who wrote the play Romeo and Juliet",
      optionA: "Charles Dickens",
      optionB: "William Shakespeare",
      optionC: " George Orwell",
      optionD: "Leo Tolstoy",
      answer: "William Shakespeare",
    },

    {
      question: "What is the capital of Australia?",
      optionA: "Sydney",
      optionB: "Melbourne",
      optionC: "Canberra",
      optionD: "Brisbane",
      answer: "Canberra",
    },
    {
      question: "Which country has the largest population in the world?",
      optionA: "United States",
      optionB: "China",
      optionC: "India",
      optionD: "Russia",
      answer: "China",
    },

  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
 // Store detailed results
  const [score, setScore] = useState(0);
  const router = useRouter();




  const onCheckAnswer = (option) => {
    setSelectedOption(option);
    const correct = option === questions[questionIndex].answer;
    setAnswered(true);
    setIsCorrect(correct);
   

    if (correct) {
      setScore(score + 1);
    }

  };


  const onSubmit = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setAnswered(false); // reset the selected answer for the next question
    } else {
      // Navigate to the Result page with score as query parameter
      router.push(`/Result?score=${score}&total=${questions.length}`);
    }
  };


  return (
    <div className="bg-gradient-to-r from-gray-400 to-pink-800">
      {/* // <div className="bg-gradient-to-r from-sky-400 to-emerld-800"> */}
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className=" w-[400px] h-[400px] max-w-full rounded-lg shadow-lg hover:shadow-gray-300 bg-black shadow-lg shadow-white text-white p-6 rounded-lg ">
            <div>
              <h1 className="text-4xl  font-bold text-rose-500 mb-4">
                Question : {questionIndex + 1}{" "}
              </h1>

              <div className="mb-4">
                <p className="text-xl font-semibold mb-10 pb-5 pt-5">
                  {questions[questionIndex].question}
                </p>

                <div className="grid grid-cols-2  gap-10">
                  {[
                    questions[questionIndex].optionA,
                    questions[questionIndex].optionB,
                    questions[questionIndex].optionC,
                    questions[questionIndex].optionD,
                  ].map((option, idx) => (
                    <ul key={idx}>
                      <li
                        onClick={() => onCheckAnswer(option)}
                        className={`border  text-white rounded-full h-[45px] text-center font-bold hover:shadow-md hover:shadow-white place-content-center 
                          ${
                            answered &&
                            option === questions[questionIndex].answer
                              ? "bg-green-400"
                              : ""
                          }
                          ${
                            selectedOption === option && !isCorrect
                              ? "bg-red-400"
                              : ""
                          }
                          ${
                            answered && selectedOption !== option
                              ? "cursor-not-allowed"
                              : ""
                          }
                          ${
                            answered && selectedOption !== option
                              ? "opacity-50"
                              : ""
                          }
                        `}
                        value={option}
                        style={{ pointerEvents: answered ? "none" : "auto" }} // Disable clicks once answered
                      >
                        {option}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <button
            className="hover:bg-white hover:text-black w-[10rem] h-[3rem] m-5 rounded-md bg-black text-white"
            onClick={() => onSubmit()}
          >
            {questionIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
