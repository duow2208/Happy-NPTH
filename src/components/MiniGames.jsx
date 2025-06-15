// src/components/MiniGames.jsx
import React, { useState } from "react";

const CARDS = [
  { msg: "Chúc em nhận được thật nhiều niềm vui 🎈" },
  { msg: "Một năm học tập và làm việc rực rỡ!" },
  { msg: "Quà này là một cái ôm ảo nhé 🤗" },
  { msg: "Bí mật: Tối nay có người rủ đi chơi đó!" },
  { msg: "Em được cộng thêm 1 năm yêu thương 🥳" },
  { msg: "Nhớ luôn cười thật tươi nhé 😁" },
];

export default function MiniGames({ onNext }) {
  const [flipped, setFlipped] = useState(Array(6).fill(false));
  const [opened, setOpened] = useState(0);

  function handleFlip(idx) {
    if (!flipped[idx] && opened < 3) { // Chỉ cho lật 3 thẻ
      const newFlipped = [...flipped];
      newFlipped[idx] = true;
      setFlipped(newFlipped);
      setOpened(opened + 1);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-50">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6">🎲 Lật thẻ nhận quà bất ngờ!</h2>
      <div className="flex flex-wrap gap-5 justify-center max-w-xl">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className={`w-36 h-52 perspective cursor-pointer`}
            onClick={() => handleFlip(i)}
          >
            <div className={`relative w-full h-full transition-transform duration-500 ${flipped[i] ? "rotate-y-180" : ""}`} style={{transformStyle:"preserve-3d"}}>
              {/* Mặt trước */}
              <div className="absolute inset-0 bg-yellow-300 rounded-lg flex items-center justify-center text-3xl font-bold shadow-lg" style={{ backfaceVisibility: "hidden" }}>
                🎁
              </div>
              {/* Mặt sau */}
              <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center text-center px-4 text-pink-700 font-semibold shadow-lg" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                {c.msg}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {opened >= 3 && (
          <button
            onClick={onNext}
            className="bg-pink-400 text-white rounded-full px-6 py-3 font-bold shadow hover:bg-pink-500 transition"
          >
            Xem món quà lớn 🎁
          </button>
        )}
        <div className="text-gray-500 mt-2 text-sm">
          {opened < 3 ? `Hãy lật thử ${3-opened} thẻ nữa nhé!` : "Đủ rồi, sẵn sàng nhận quà lớn nha!"}
        </div>
      </div>
      {/* Hiệu ứng lật thẻ */}
      <style>{`
        .perspective { perspective: 800px; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}