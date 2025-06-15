import React, { useRef, useState } from "react";
import "./BubbleEffect.css";

const bubbleColors = [
  "bg-yellow-400",
  "bg-pink-400",
  "bg-cyan-400",
  "bg-yellow-200",
  "bg-lime-200",
];

const textColors = [
  "text-yellow-400",
  "text-pink-400",
  "text-cyan-400",
  "text-lime-400",
  "text-purple-400",
  "text-orange-400",
  "text-blue-400",
  "text-red-400",
];

const messages = [
  "Happy Birthday!",
  "Chúc Mừng Sinh Nhật!",
  "🎂 Happy Birthday! 🎂",
  "🎉 Chúc Mừng! 🎉",
  "🎁 Happy Birthday! 🎁",
  "🎈 Chúc Mừng Sinh Nhật! 🎈",
  "✨ Happy Birthday! ✨",
  "🎊 Chúc Mừng! 🎊",
  "🎂 Sinh Nhật Vui Vẻ! 🎂",
  "🎁 Happy Birthday! 🎁",
  "🎉 Chúc Mừng Sinh Nhật! 🎉",
  "✨ Happy Birthday! ✨"
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function WelcomeGate({ onReady }) {
  const [bubbles, setBubbles] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [showBirthdayText, setShowBirthdayText] = useState(false);
  const gateRef = useRef();

  function handleReady(e) {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const newBubbles = Array.from({ length: 30 }).map((_, i) => {
      const size = randomBetween(18, 38);
      return {
        id: Date.now() + i,
        size,
        left: `calc(50vw + ${randomBetween(-40, 40)}px)`,
        top: `calc(50vh + ${randomBetween(-20, 20)}px)`,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        spin: randomBetween(-90, 90),
      };
    });
    setBubbles(newBubbles);
    setShowBirthdayText(true);

    setTimeout(() => {
      setHidden(true);
      setTimeout(onReady, 1000);
    }, 3000);
  }

  return (
    <div
      ref={gateRef}
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center text-white transition-opacity duration-1000 z-40
        ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* Rotating Birthday Texts */}
      {showBirthdayText && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {messages.map((message, index) => {
            const angle = (index * 360) / messages.length;
            const delay = index * 0.15;
            const color = textColors[index % textColors.length];
            const size = index % 3 === 0 ? "text-4xl" : index % 3 === 1 ? "text-3xl" : "text-2xl";
            const animationType = index % 2 === 0 ? "animate-spin-slow" : "animate-diagonal";
            
            return (
              <div
                key={index}
                className={`absolute ${color} ${size} font-bold ${animationType}`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle}deg) translate(40vh) rotate(-${angle}deg)`,
                  animationDelay: `${delay}s`,
                  animationDuration: index % 2 === 0 ? "12s" : "8s",
                }}
              >
                {message}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Bong bóng hiệu ứng */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {bubbles.map((b, i) => (
          <div
            key={b.id}
            className={`absolute ${b.color} opacity-90 pointer-events-none bubble-anim`}
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              borderRadius: "9999px",
              zIndex: 50,
              animationDelay: `${i * 0.05}s`,
              transform: `rotate(${b.spin}deg)`,
            }}
          />
        ))}
      </div>
      {/* Nội dung Welcome Gate */}
      <div className="text-2xl md:text-3xl font-semibold mb-8 text-center tracking-wide">
        Hôm nay là một ngày đặc biệt.
        <br />
        Em đã sẵn sàng nhận điều bất ngờ chưa?
      </div>
      <button
        onClick={handleReady}
        className="bg-yellow-400 text-black rounded-full px-8 py-4 font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 flex items-center gap-2"
      >
        Em đã sẵn sàng <span role="img" aria-label="gift">🎁</span>
      </button>
    </div>
  );
}