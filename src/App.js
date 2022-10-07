import logo from './logo.svg';
import './App.css';
import { Button, Box, Grid, Item, Typography } from '@mui/material';
import { useState } from 'react';
import Countdown from './Components/Countdown';

function App() {
  const [start, setStart] = useState(false);
  const [indexNumber, setIndexNumber] = useState(0);
  const [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [resultClass, setResultClass] = useState('');
  let [resultRemark, setResultRemark] = useState('');
  let [remark, setRemark] = useState("");
  let [status, setStatus] = useState("Quiz Completed");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '_________ is also known as the brain of the computer.',
      options: ['ROM', 'Hard Drive', 'RAM', 'CPU'],
      answer: 'CPU'
    },
    {
      id: 2,
      question: 'Which of the following is a volatile memory?',
      options: ['ROM', 'RAM'],
      answer: 'RAM'
    },
    {
      id: 3,
      question: 'RAM stands for: ',
      options: ['Read Access Memory', 'Random Access Memory', 'Read Access Machine'],
      answer: 'Random Access Memory'
    },
    {
      id: 4,
      question: 'Which of the following is not an Application software?',
      options: ['Youtube', 'GTA Vice City', 'Device Driver', 'VLC Media Player'],
      answer: 'Device Driver'
    },
    {
      id: 5,
      question: 'RAM is a secondary storage device.',
      options: ['true', 'false'],
      answer: 'false'
    },
  ]);

  const resultCalc = (percentage) => {
    console.log(percentage)
    if (percentage > 59) {
      setResultClass("result best");
      setResultRemark("Congratulation!");
      setRemark("Excellent and Keep it Up")
    }
    else if (percentage > 39) {
      setResultClass("result average");
      setResultRemark("Fair!");
      setRemark("You have to do better")
    }
    else {
      setResultClass("result poor");
      setResultRemark("Alas!");
      setRemark("You have to Work Hard.");
    }
  }

  const startQuiz = () => {
    setStart(true)
  }

  let checkQuestion = (selected, answer) => {
    if (selected == answer) {
      setScore(score + 1);
    }

    if (indexNumber + 1 == questions.length) {
      setShowResult(true);
      resultCalc(score / questions.length * 100);
    } else {
      setIndexNumber(indexNumber + 1);
    }
  }

  let timeOver = () => {
    setShowResult(true);
    resultCalc(score / questions.length * 100)
    setStatus("Time Over");
  }

  return (
    <div className="App">


      {
        showResult ?

          <div className='parent' style={{ flexDirection: 'column' }}>

            <span style={{ alignSelf: 'center', fontSize: 30, fontWeight: 600, margin: 20 }}> {status}</span>

            <div className={resultClass}>
              <span style={{ fontSize: 15 }}>You Score</span>
              {score / questions.length * 100}%
            </div>

            <span style={{ alignSelf: 'center', fontSize: 50, margin: 10 }}> {resultRemark}</span>

            <span style={{ fontSize: 22, margin: 10, alignSelf: 'center' }}>{remark}</span>

            <div className='conclusion'>
              <div className='data' style={{ background: 'black' }}>
                <span style={{ fontSize: 13 }}>Questions</span>
                {questions.length}
              </div>

              <div className='data' style={{ background: 'black' }}>
                <span style={{ fontSize: 13 }}>Attempted</span>
                {status == 'Time Over' ? indexNumber : indexNumber + 1}
              </div>

              <div className='data' style={{ background: 'black' }}>
                <span style={{ fontSize: 13 }}>Missed</span>
                {status == 'Time Over' ? questions.length - indexNumber : questions.length - (indexNumber + 1)}
              </div>

              <div className='data' style={{ background: 'green' }}>
                <span style={{ fontSize: 13 }}>Correct</span>
                {score}
              </div>

              <div className='data' style={{ background: 'red' }}>
                <span style={{ fontSize: 13 }}>Wrong</span>
                {questions.length - score}
              </div>
            </div>

          </div>

          : start ?

            <div className="parent">

              <div className='timer'>
                <Countdown func={timeOver}></Countdown>
              </div>

              <br />
              <Typography variant='h6' sx={{ fontWeight: 500 }} >
                Question # {indexNumber + 1} : {questions[indexNumber].question}
              </Typography>

              <div>
                {
                  questions[indexNumber].options.map((value, index) => {
                    return (
                      <div onClick={() => checkQuestion(value, questions[indexNumber].answer)} className='option' key={index}>
                        {value}
                      </div>
                    )
                  })
                }
              </div>

              <Typography variant='h6' sx={{ fontWeight: 500, alignSelf: 'center' }} >
                {indexNumber + 1} / {questions.length}
              </Typography>

            </div>

            : <Button onClick={startQuiz} variant='contained' sx={{ color: 'white' }} >Start Quiz</Button>
      }

    </div>
  );
}

export default App;
