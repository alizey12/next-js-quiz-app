"use client";
import "../app/globals.css";
import { useEffect,useState, useRef } from "react";
import { useRouter } from 'next/router';
import card from "../../src/pages/card";
export default function Result() {
  
  const router = useRouter();
  const { score, total } = router.query; // Access the score and total from query parameters
  const canvasRef = useRef(null);

  useEffect(() => {
    const NUM_CONFETTI = 350;
    const COLORS = ['#0000e7', '#dbdb00', '#ed1c24', '#00ebeb'];

    let progress = 0;
    let confetti = [];
    let w = 0;
    let h = 0;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    // Function to resize the canvas
    const resizeWindow = () => {
      if (canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
    };

    const range = (a, b) => (b - a) * Math.random() + a;

    const drawCircle = (x, y, width, height, style, deg) => {
      const rotDeg = deg * Math.PI / 180;
      context.beginPath();
      context.save();
      context.translate(x + width, y + height);
      context.rotate(rotDeg);
      context.fillStyle = style;
      context.fillRect(-width, -height, width, height);
      context.restore();
    };

    class Confetti {
      constructor() {
        this.style = COLORS[Math.floor(range(0, 4))];
        this.deg = range(10, 120);
        this.r = Math.floor(range(4, 10));
        this.width = 2 * this.r;
        this.height = this.r / 2;
        this.replace();
      }

      replace() {
        this.opacity = 0;
        this.dop = 1;
        this.x = range(0, w - this.width);
        this.y = range(-h - this.width, -this.width);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = 0;
        this.vy = 1.1 * this.r + range(-1, 1);
      }

      draw() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > this.ymax) {
          this.replace();
        }
        if (!(0 < this.x && this.x < this.xmax)) {
          this.x = (this.x + this.xmax) % this.xmax;
        }
        drawCircle(Math.floor(this.x), Math.floor(this.y), this.width, this.height, this.style, this.deg);
      }
    }

    const initConfetti = () => {
      confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());
    };

    const step = () => {
      requestAnimationFrame(step);
      context.clearRect(0, 0, w, h);
      confetti.forEach(c => c.draw());
      progress += 20;
    };

    resizeWindow();
    initConfetti();
    step();

    window.addEventListener("resize", resizeWindow);
    
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);
  const Reset=()=>{
router.push('/card')

  }

  const radius = 50; // Radius of the circle
  const normalizedRadius = radius - 5; // Normalize to account for stroke width
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / total) * circumference;
     
  
  
  return (
    <>
   <div className="bg-gradient-to-r from-gray-400 to-pink-800 min-h-screen relative">
        {/* Canvas for confetti animation */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-[400px] h-[500px] max-w-full rounded-lg shadow-lg bg-black text-white p-10 w-full max-w-lg">
              <div className="m-5">
                <button
                  onClick={Reset}
                  className="border w-full h-12 border-white text-white hover:bg-white hover:text-black rounded-lg mb-5"
                >
                  Reset
                </button>
                <h2 className="text-center mb-5">Go Back and Try Again</h2>
              </div>
              <div className="text-center mb-5">
                <h5 className="text-bold text-2xl">Quiz Completed!</h5>
              </div>
              <div className="text-center mb-5">
                <svg height="120" width="120" className="mx-auto">
                  <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth="10"
                    r={normalizedRadius}
                    cx="60"
                    cy="60"
                  />
                  <circle
                    stroke="#fb7185"
                    fill="transparent"
                    strokeWidth="10"
                    r={normalizedRadius}
                    cx="60"
                    cy="60"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 ease-in-out"
                  />
                    <text
                    x="60"
                    y="60"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="20"
                    fontWeight="bold"
                  >
                    {score}/{total}
                  </text>
                </svg>
              
              </div>
              <div className="border border-white p-5 text-center">
                <h6 className="text-lg font-bold">Score</h6>
                <h2>Total Questions: {total}</h2>
                <h2>Correct Answers: {score}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}  