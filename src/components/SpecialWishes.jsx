import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const wishes = [
  "Chúc em một ngày sinh nhật tràn đầy niềm vui và hạnh phúc! 🎉",
  "Mong rằng mọi ước mơ của em sẽ thành hiện thực! ✨",
  "Chúc em luôn mạnh khỏe và thành công trong cuộc sống! 🌟",
  "Mong rằng mỗi ngày đều là một ngày tuyệt vời với em! 🌈",
  "Chúc em luôn được yêu thương và hạnh phúc! 💖",
  "Mong rằng mọi điều tốt đẹp nhất sẽ đến với em! 🎁",
  "Chúc em luôn tự tin và tỏa sáng! ⭐",
  "Mong rằng mỗi khoảnh khắc đều đáng nhớ! 📸",
  "Chúc em luôn vui vẻ và lạc quan! 😊",
  "Mong rằng mọi nỗ lực của em đều được đền đáp! 🎯"
];

export default function SpecialWishes() {
  const [currentWish, setCurrentWish] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    // Hiệu ứng confetti ban đầu
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Hiệu ứng pháo hoa liên tục
    const duration = 5 * 1000;
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

    // Hiệu ứng trái tim
    setTimeout(() => {
      setShowHeart(true);
    }, 1000);

    // Hiệu ứng sao
    setTimeout(() => {
      setShowStars(true);
    }, 2000);

    // Chuyển lời chúc
    const wishInterval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(wishInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Hiệu ứng sao */}
      {showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {/* Hiệu ứng trái tim */}
      {showHeart && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-bounce">
            Happy Birthday! 🎂
          </h2>

          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed animate-fade-in-out">
              {wishes[currentWish]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 