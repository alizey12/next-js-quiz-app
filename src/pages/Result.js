"use client";
import "../app/globals.css";
import { useEffect,useState, useRef } from "react";
import { useRouter } from 'next/router';
import card from "../../src/pages/card";
export default function Result() {
  
  const router = useRouter();
  const { score, total } = router.query; // Access the score and total from query parameters

  const TWO_PI = Math.PI * 2;
  const HALF_PI = Math.PI * 0.5;
  const canvasRef = useRef(null);

  // Define classes within the component scope
  function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  function Particle(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);

    this.w = 6;
    this.h = 15;

    this.complete = false;
  }

  Particle.prototype = {
    update: function (timeStep, Ease, cubeBezier) {
      this.time = Math.min(this.duration, this.time + timeStep);

      const f = Ease.outCubic(this.time, 0, 1, this.duration);
      const p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

      const dx = p.x - this.x;
      const dy = p.y - this.y;

      this.r = Math.atan2(dy, dx) + HALF_PI;
      this.sy = Math.sin(Math.PI * f * 10);
      this.x = p.x;
      this.y = p.y;

      this.complete = this.time === this.duration;
    },
    draw: function (ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r);
      ctx.scale(1, this.sy);

      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

      ctx.restore();
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let loader, exploader;
    let phase = 0;

    const timeStep = 1 / 60;

    function Loader(x, y) {
      this.x = x;
      this.y = y;
      this.r = 24;
      this._progress = 0;
      this.complete = false;
    }

    Loader.prototype = {
      reset: function () {
        this._progress = 0;
        this.complete = false;
      },
      set progress(p) {
        this._progress = p < 0 ? 0 : p > 1 ? 1 : p;
        this.complete = this._progress === 1;
      },
      get progress() {
        return this._progress;
      },
      draw: function (ctx) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.r,
          -HALF_PI,
          TWO_PI * this._progress - HALF_PI
        );
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.fill();
      },
    };

    function Exploader(x, y) {
      this.x = x;
      this.y = y;
      this.startRadius = 2;
      this.time = 0;
      this.duration = 0.4;
      this.progress = 0;
      this.complete = false;
    }

    Exploader.prototype = {
      reset: function () {
        this.time = 0;
        this.progress = 0;
        this.complete = false;
      },
      update: function (timeStep, Ease) {
        this.time = Math.min(this.duration, this.time + timeStep);
        this.progress = Ease.inBack(this.time, 0, 1, this.duration);
        this.complete = this.time === this.duration;
      },
      draw: function (ctx) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.startRadius * (1 - this.progress),
          0,
          TWO_PI
        );
        ctx.fill();
      },
    };

    const Ease = {
      outCubic: function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      },
      inBack: function (t, b, c, d, s = 1.70158) {
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
    };

    function cubeBezier(p0, c0, c1, p1, t) {
      const nt = 1 - t;
      const p = new Point();
      p.x =
        nt * nt * nt * p0.x +
        3 * nt * nt * t * c0.x +
        3 * nt * t * t * c1.x +
        t * t * t * p1.x;
      p.y =
        nt * nt * nt * p0.y +
        3 * nt * nt * t * c0.y +
        3 * nt * t * t * c1.y +
        t * t * t * p1.y;
      return p;
    }

    function initCanvas() {
      canvas.width = 512;
      canvas.height = 350;
      createLoader();
      createExploader();
      createParticles();
    }

    function createLoader() {
      loader = new Loader(156, 175);
    }

    function createExploader() {
      exploader = new Exploader(156, 175);
    }

    function createParticles() {
      for (let i = 0; i < 128; i++) {
        const p0 = new Point(256, 175);
        const p1 = new Point(Math.random() * 512, Math.random() * 350);
        const p2 = new Point(Math.random() * 512, Math.random() * 350);
        const p3 = new Point(Math.random() * 512, 350 + 64);
        particles.push(new Particle(p0, p1, p2, p3));
      }
    }

    function update() {
      if (phase === 0) {
        loader.progress += 1 / 45;
      } else if (phase === 1) {
        exploader.update(timeStep, Ease);
      } else if (phase === 2) {
        particles.forEach((p) => p.update(timeStep, Ease, cubeBezier));
      }
    }

    function draw() {
      ctx.clearRect(0, 0, 512, 350);
      if (phase === 0) {
        loader.draw(ctx);
      } else if (phase === 1) {
        exploader.draw(ctx);
      } else if (phase === 2) {
        particles.forEach((p) => p.draw(ctx));
      }
    }

    function loop() {
      update();
      draw();
      if (phase === 0 && loader.complete) {
        phase = 1;
      } else if (phase === 1 && exploader.complete) {
        phase = 2;
      } else if (phase === 2 && particles.every((p) => p.complete)) {
        phase = 0;
        loader.reset();
        exploader.reset();
        particles.length = 0;
        createParticles();
      }
      requestAnimationFrame(loop);
    }

    initCanvas();
    loop();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(loop);
    };
  });

  const Reset=()=>{
router.push('/card')

  }

  const radius = 50; // Radius of the circle
  const normalizedRadius = radius - 5; // Normalize to account for stroke width
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / total) * circumference;
     
      
  
  return (
    <>
    <div className="bg-gradient-to-r from-gray-400 to-pink-800">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="rounded-lg shadow-lg hover:shadow-gray-300 bg-black shadow-lg shadow-white text-white">
            <div className="flex m-10 gap-10">
              <button
                onClick={Reset}
                className="border w-20 h-10 border-white text-white items-center justify-center hover:bg-white hover:text-black rounded-lg"
              >
                Reset
              </button>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-white">
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <h6 className="text-lg font-bold">Score</h6> {/* Added space-y-4 for vertical gap */}
                  <svg height="120" width="120">
                    <circle
                      stroke="#e5e7eb" // Light gray for background
                      fill="transparent"
                      strokeWidth="10"
                      r={normalizedRadius}
                      cx="60"
                      cy="60"
                    />
                    <circle
                      stroke="#fb7185" // Pink for the progress
                      fill="transparent"
                      strokeWidth="10"
                      r={normalizedRadius}
                      cx="60"
                      cy="60"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 ease-in-out"
                    />
                  </svg>
                  <div className="absolute text-2xl font-bold text-white">
                    {score}/{total}
                  </div>
                </div>
              </div>
              <div>
                <canvas
                  ref={canvasRef}
                  className="w-[250px] h-[400px] m-auto pb-20 inset-0"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}  