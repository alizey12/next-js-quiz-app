"use client";
import "../app/globals.css";
import { useState } from "react";

export default function Card() {
  const questions = [
    {
      question: "What temperature does water boil at?",
      optionA: "50 degrees Celcius",
      optionB: "25 degrees Celcius",
      optionC: "100 degrees Celcius",
      optionD: "150 degrees Celcius",
      answer: "100 degrees Celcius",
    },

    {
      question: "Who wrote Julius Caesar, Macbeth and Hamlet?",
      optionA: "Wole Soyinka",
      optionB: "William Shakespeare",
      optionC: "Ngozi Chimamanda Adichie",
      optionD: "Dan Brown",
      answer: "William Shakespeare",
    },

    {
      question: "What did the crocodile swallow in Peter Pan?",
      optionA: "A Book",
      optionB: "A Computer",
      optionC: "A pair of shoes",
      optionD: "Alarm Clock",
      answer: "Alarm Clock",
    },

    {
      question: "Which is the only mammal that can’t jump?",
      optionA: "Dog",
      optionB: "Elephant",
      optionC: "Goat",
      optionD: "Lion",
      answer: "Elephant",
    },

    {
      question: "Who lived at 221B, Baker Street, London?",
      optionA: "Tony Stark",
      optionB: "Morgan Freeman",
      optionC: "Sherlock Holmes",
      optionD: "Samuel L. Jackson",
      answer: "Sherlock Holmes",
    },

    {
      question: "What colour is a panda?",
      optionA: "Green and Yellow",
      optionB: "Blue and Red",
      optionC: "Green and White",
      optionD: "Black and White",
      answer: "Black and White",
    },

    {
      question: "Where is the smallest bone in the human body?",
      optionA: "The Chest",
      optionB: "The Ear",
      optionC: "The Legs",
      optionD: "The Hands",
      answer: "The Ear",
    },

    {
      question: "What does the roman numeral C represent?",
      optionA: "100",
      optionB: "10",
      optionC: "10,000",
      optionD: "1,000,000",
      answer: "100",
    },

    {
      question: "What takes place in Hong Kong's Happy Valley?",
      optionA: "Chicken Wrestling",
      optionB: "Horse racing",
      optionC: "Street Racing",
      optionD: "Arm Wrestling",
      answer: "Horse racing",
    },

    {
      question: "Who painted the Mona Lisa?",
      optionA: "Alexander Graham Bell",
      optionB: "Sir Isaac Newton",
      optionC: "Leonardo Da Vinci",
      optionD: "Albert Einstein",
      answer: "Leonardo Da Vinci",
    },

    {
      question: "What’s the most important book in the Moslem religion?",
      optionA: "The Koran",
      optionB: "The Dictionary",
      optionC: "The Bible",
      optionD: "The Chemistry text Book",
      answer: "The Koran",
    },

    {
      question: "What’s the capital of Ethiopia?",
      optionA: "Cape Town",
      optionB: "San Francisco",
      optionC: "Abuja",
      optionD: "Syndey",
      answer: "Addis Ababa",
    },

    {
      question: "How many squares are there on a chess board?",
      optionA: "128",
      optionB: "64",
      optionC: "32",
      optionD: "256",
      answer: "64",
    },

    {
      question: "Who invented the electric light bulb?",
      optionA: "Tom Cruise",
      optionB: "Barack Obama",
      optionC: "Wole Soyinka",
      optionD: "Thomas Edison",
      answer: "Thomas Edison",
    },

    {
      question: "What are the first three words of the bible?",
      optionA: "be with everyone",
      optionB: "Again Jesus asked",
      optionC: "In the beginning",
      optionD: "At that time",
      answer: "In the beginning",
    },
  ];

 
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  const onCheckAnswer = (option) => {
  
    setSelectedOption(option);
    setIsCorrect(option === questions[questionIndex].answer);
    setAnswered(true);
   
    //    if (questions[questionIndex].answer === selectedOption) {
    // document.getElementById("option").style.backgroundColor="#4ade80";
    //   }else {
    //     document.getElementById("option").style.backgroundColor="#f87171";
    //    }
  };

  const onSubmit = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
setSelectedOption(null)
      setIsCorrect(null)
      setAnswered(false)// reset the selected answer for the next question
    } else {
      console.log("Quiz completed!");
      // Optionally reset the quiz
      // setQuestionIndex(0);
    }
  };
  return (
    <div className="bg-gradient-to-r from-sky-400 to-emerld-800">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="  rounded-lg shadow-lg hover:shadow-gray-300 bg-sky-900 shadow-lg shadow-white text-white p-6 rounded-lg ">
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
                        className={`border bg-white text-black rounded-full h-[50px] text-center font-bold hover:shadow-md hover:shadow-white place-content-center 
                          ${answered && option === questions[questionIndex].answer ? "bg-green-400" : ""}
                          ${selectedOption === option && !isCorrect ? "bg-red-400" : ""}
                          ${answered && selectedOption !== option ? "cursor-not-allowed" : ""}
                          ${answered && selectedOption !== option ? "opacity-50" : ""}
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
            className="hover:bg-white hover:text-black w-[10rem] h-[3rem] m-5 rounded-md bg-sky-900 text-white"
            onClick={() => onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
