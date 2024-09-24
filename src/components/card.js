"use client";

import { useState } from "react";

export default function Card() {
  const questions =   [ {
    "question": "What temperature does water boil at?",
    "optionA": "50 degrees Celcius",
    "optionB": "25 degrees Celcius",
    "optionC": "100 degrees Celcius",
    "optionD": "150 degrees Celcius",
    "answer": "100 degrees Celcius"
},

{
    "question": "Who wrote Julius Caesar, Macbeth and Hamlet?",
    "optionA": "Wole Soyinka",
    "optionB": "William Shakespeare",
    "optionC": "Ngozi Chimamanda Adichie",
    "optionD": "Dan Brown",
    "answer": "William Shakespeare"
},

{
    "question": "What did the crocodile swallow in Peter Pan?",
    "optionA": "A Book",
    "optionB": "A Computer",
    "optionC": "A pair of shoes",
    "optionD": "Alarm Clock",
    "answer": "Alarm Clock"
},

{
    "question": "Which is the only mammal that can’t jump?",
    "optionA": "Dog",
    "optionB": "Elephant",
    "optionC": "Goat",
    "optionD": "Lion",
    "answer": "Elephant"
},

{
    "question": "Who lived at 221B, Baker Street, London?",
    "optionA": "Tony Stark",
    "optionB": "Morgan Freeman",
    "optionC": "Sherlock Holmes",
    "optionD": "Samuel L. Jackson",
    "answer": "Sherlock Holmes"
},

{
    "question": "What colour is a panda?",
    "optionA": "Green and Yellow",
    "optionB": "Blue and Red",
    "optionC": "Green and White",
    "optionD": "Black and White",
    "answer": "Black and White"
},

{
    "question": "Where is the smallest bone in the human body?",
    "optionA": "The Chest",
    "optionB": "The Ear",
    "optionC": "The Legs",
    "optionD": "The Hands",
    "answer": "The Ear"
},

{
    "question": "What does the roman numeral C represent?",
    "optionA": "100",
    "optionB": "10",
    "optionC": "10,000",
    "optionD": "1,000,000",
    "answer": "100"
},

{
    "question": "What takes place in Hong Kong's Happy Valley?",
    "optionA": "Chicken Wrestling",
    "optionB": "Horse racing",
    "optionC": "Street Racing",
    "optionD": "Arm Wrestling",
    "answer": "Horse racing"
},

{
    "question": "Who painted the Mona Lisa?",
    "optionA": "Alexander Graham Bell",
    "optionB": "Sir Isaac Newton",
    "optionC": "Leonardo Da Vinci",
    "optionD": "Albert Einstein",
    "answer": "Leonardo Da Vinci"
},

{
    "question": "What’s the most important book in the Moslem religion?",
    "optionA": "The Koran",
    "optionB": "The Dictionary",
    "optionC": "The Bible",
    "optionD": "The Chemistry text Book",
    "answer": "The Koran"
},

{
    "question": "What’s the capital of Ethiopia?",
    "optionA": "Cape Town",
    "optionB": "San Francisco",
    "optionC": "Abuja",
    "optionD": "Syndey",
    "answer": "Addis Ababa"
},

{
    "question": "How many squares are there on a chess board?",
    "optionA": "128",
    "optionB": "64",
    "optionC": "32",
    "optionD": "256",
    "answer": "64"
},

{
    "question": "Who invented the electric light bulb?",
    "optionA": "Tom Cruise",
    "optionB": "Barack Obama",
    "optionC": "Wole Soyinka",
    "optionD": "Thomas Edison",
    "answer": "Thomas Edison"
},

{
    "question": "What are the first three words of the bible?",
    "optionA": "be with everyone",
    "optionB": "Again Jesus asked",
    "optionC": "In the beginning",
    "optionD": "At that time",
    "answer": "In the beginning"
}
]
  
const [questionIndex, setQuestionIndex] = useState(0)
const onSubmit=()=>{
  return(

console.log('clicked')
  );
}
    
    return(
        <div className="bg-gradient-to-r from-gray-400 to-pink-800">
            <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="  rounded-lg         shadow-lg hover:shadow-gray-300 bg-rose-900 shadow-lg shadow-white text-white p-6 rounded-lg ">
         {questions.map((q, index)=>(

          <div key={index}>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Question : {index}</h1>

          <div className="mb-4">
            <p className="text-lg font-semibold">{q.question}</p>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="radio" name="q1" value="a" className="mr-2" />
                <span className="text-white">{q.optionA}</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" value="b" className="mr-2" />
                <span className="text-white">{q.optionB} </span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" value="c" className="mr-2" />
                <span className="text-white">{q.optionC}</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="q1" value="d" className="mr-2" />
                <span className="text-white">{q.optionD}</span>
              </label>
            </div>
          </div>
 <div>
{q.answer}
 </div>
          

          <button className="bg-white text-black  px-4 py-2 rounded-md hover:bg-rose-100" onClick={()=>onSubmit()}>Submit</button>
          </div>

         ))}
         
        
        </div>
      </div>
    </div>
        </div>
    );
}