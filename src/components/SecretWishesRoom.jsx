// src/components/SecretWishesRoom.jsx
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const correctAnswers = ["ha", "hà", "HA", "HÀ", "Ha", "Hà"];

export default function SecretWishesRoom({ onComplete }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showEffect, setShowEffect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra câu trả lời (bỏ qua dấu và chữ hoa/thường)
    const normalizedAnswer = answer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedCorrect = "ha".normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (normalizedAnswer === normalizedCorrect) {
      setShowEffect(true);
      // Hiệu ứng confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Hiệu ứng pháo hoa
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Pháo hoa từ trái
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        
        // Pháo hoa từ phải
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Chuyển trang sau khi hiệu ứng
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setError("Hmm... Có vẻ như đó không phải là câu trả lời đúng. Hãy thử lại nhé!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Phòng Bí Mật
        </h2>
        
        <div className="space-y-6">
          <p className="text-white/90 text-lg leading-relaxed">
            Để mở cánh cửa bí mật này, em cần nhập tên người đặc biệt nhất ngày hôm nay.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Nhập câu trả lời của em..."
              />
              {error && (
                <p className="mt-2 text-pink-300 text-sm">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all transform hover:scale-105 active:scale-95"
            >
              Mở Cửa
            </button>
          </form>
        </div>

        {showEffect && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white animate-bounce">
              Chính xác! 🎉
            </div>
          </div>
        )}
      </div>
    </div>
  );
}