import React, { useRef, useState } from "react";
import "./BubbleEffect.css";
// Thêm font đẹp nếu có thể, ví dụ: 'Pacifico', 'Dancing Script'

const bubbleColors = [
  "bg-yellow-400/70",
  "bg-pink-400/70",
  "bg-cyan-400/70",
  "bg-yellow-200/60",
  "bg-lime-200/60",
];

const textColors = [
  "text-yellow-300",
  "text-pink-300",
  "text-cyan-300",
  "text-lime-300",
  "text-purple-300",
  "text-orange-300",
  "text-blue-300",
  "text-red-300",
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
  const [visibleMessageCount, setVisibleMessageCount] = useState(0);
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
    setVisibleMessageCount(0);
    // Hiện lần lượt từng dòng chữ
    messages.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleMessageCount((prev) => prev + 1);
      }, idx * 250); // mỗi dòng hiện cách nhau 250ms
    });
    setTimeout(() => {
      setHidden(true);
      setTimeout(onReady, 1000);
    }, 3000);
  }

  return (
    <div
      ref={gateRef}
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 z-40 overflow-hidden
        ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #222 60%, #111 100%)",
      }}
    >
      {/* Hiệu ứng nền động */}
      <div className="absolute inset-0 -z-10 animate-gradient-move bg-gradient-to-br from-pink-400 via-yellow-300 to-cyan-400 opacity-30 blur-2xl" />
      {/* Rotating Birthday Texts */}
      {showBirthdayText && (
        <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50 gap-2">
          {messages.slice(0, visibleMessageCount).map((message, index) => {
            const color = textColors[index % textColors.length];
            const size = index % 3 === 0 ? "text-5xl md:text-6xl" : index % 3 === 1 ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl";
            return (
              <div
                key={index}
                className={`transition-all duration-500 ease-out opacity-100 scale-100 ${color} ${size} font-bold drop-shadow-glow text-shadow-glow select-none animate-pop-in`}
                style={{
                  filter: "drop-shadow(0 0 12px #fff) drop-shadow(0 0 24px #f9d)",
                  fontFamily: 'Dancing Script, Pacifico, cursive',
                  marginBottom: 4,
                }}
              >
                {message}
              </div>
            );
          })}
        </div>
      )}
      {/* Bong bóng hiệu ứng */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {bubbles.map((b, i) => (
          <div
            key={b.id}
            className={`absolute ${b.color} opacity-70 pointer-events-none bubble-anim shadow-xl`}
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              borderRadius: "9999px",
              zIndex: 40,
              animationDelay: `${i * 0.05}s`,
              transform: `rotate(${b.spin}deg)`
            }}
          />
        ))}
      </div>
      {/* Nội dung Welcome Gate */}
      <div className="relative text-2xl md:text-4xl font-semibold mb-10 text-center tracking-wide text-white drop-shadow-lg" style={{fontFamily: 'Dancing Script, Pacifico, cursive'}}>
        Hôm nay là một ngày đặc biệt.<br />
        Em đã sẵn sàng nhận điều bất ngờ chưa?
      </div>
      <button
        onClick={handleReady}
        className="bg-yellow-400 text-black rounded-full px-10 py-5 font-bold text-2xl shadow-2xl border-4 border-pink-300 hover:border-cyan-300 hover:shadow-pink-200/60 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-pink-200 animate-glow"
        style={{fontFamily: 'Dancing Script, Pacifico, cursive', boxShadow: '0 0 24px #f9d, 0 0 48px #fff8'}}
      >
        Em đã sẵn sàng <span role="img" aria-label="gift">🎁</span>
      </button>
    </div>
  );
}