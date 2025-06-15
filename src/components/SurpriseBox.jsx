// src/components/SurpriseBox.jsx
import React, { useState, useEffect } from "react";

export default function SurpriseBox({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftIndex, setGiftIndex] = useState(0);

  const gifts = [
    {
      title: "🍰 Bánh Kem Đặc Biệt",
      description: "Một chiếc bánh kem xinh xắn dành cho em!",
      details: "",
      buttonText: "Típ"
    },
    {
      title: "💝 Món Quà Nhỏ",
      description: "Một món quà nhỏ xinh dành cho em!",
      details: "",
      buttonText: "Mở quà"
    }
  ];

  useEffect(() => {
    if (opened) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [opened]);

  const handleNextGift = () => {
    if (giftIndex < gifts.length - 1) {
      setGiftIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-50">
      <h2 className="text-3xl font-bold text-pink-600 mb-8">🎁 Món quà bí mật dành cho em</h2>
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* Box */}
        <div
          className={`w-40 h-40 bg-yellow-300 border-4 border-yellow-500 rounded-b-3xl absolute left-1/2 -translate-x-1/2 shadow-xl z-10 transition-all duration-500 ${opened ? "translate-y-10" : ""}`}
        />
        {/* Lid */}
        <div
          className={`w-44 h-12 bg-pink-400 border-4 border-pink-600 rounded-t-3xl absolute left-1/2 -translate-x-1/2 top-0 shadow-xl z-20 transition-all duration-500 ${opened ? "-rotate-12 -translate-y-16" : ""}`}
          onClick={() => setOpened(true)}
          style={{ cursor: opened ? "default" : "pointer" }}
        />
        {/* Ribbon */}
        <div className="w-8 h-24 bg-pink-600 rounded-xl absolute left-1/2 -translate-x-1/2 top-2 z-30" />
        {/* Sparkles effect */}
        {opened && (
          <div className="absolute inset-0 flex items-center justify-center z-40 animate-pulse pointer-events-none">
            <div className="text-5xl">✨</div>
          </div>
        )}
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98'][Math.floor(Math.random() * 4)],
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-12 mb-4">
        {opened ? (
          <div className="bg-white rounded-xl px-8 py-6 shadow-lg text-center max-w-md">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">{gifts[giftIndex].title}</h3>
            <div className="text-lg mb-3">{gifts[giftIndex].description}</div>
            <div className="text-gray-600 mb-4">{gifts[giftIndex].details}</div>
            <button 
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-all duration-300"
              onClick={handleNextGift}
            >
              {giftIndex < gifts.length - 1 ? gifts[giftIndex].buttonText : "Tiếp tục"}
            </button>
          </div>
        ) : (
          <div className="text-gray-500 italic">Nhấn vào nắp hộp để mở quà nhé!</div>
        )}
      </div>
    </div>
  );
}