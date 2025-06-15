// src/components/BirthdayCard.jsx
import React, { useEffect, useRef, useState } from "react";
import NPTHImg from '../assets/photo/NPTH.jpg';
import DuongImg from '../assets/photo/HTD.jpg';
import HTDImg from '../assets/photo/D.jpg';

const wishes = [
  {
    from: "Duong",
    avatar: DuongImg,
    text: "Chúc em tuổi mới luôn rực rỡ, hạnh phúc và thành công nhé! 🎂",
  },
  {
    from: "Duong",
    avatar: HTDImg,
    text: "Sinh nhật vui vẻ! Cứ cười thật tươi như hôm nay nhé!",
  },
  {
    from: "Ẩn danh",
    avatar: "https://ui-avatars.com/api/?name=?&background=gray&color=fff",
    text: "Có ai đó rất thương em, đoán xem là ai nào? 😉",
  },
];

function useTypingEffect(text, speed = 30) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

export default function BirthdayCard({ onNext, photoUrl }) {
  const [wishIdx, setWishIdx] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const wish = wishes[wishIdx];
  const typed = useTypingEffect(wish.text, 28);

  useEffect(() => {
    setShowNext(false);
    if (typed.length === wish.text.length) {
      setTimeout(() => setShowNext(true), 700);
    }
  }, [typed, wish.text]);

  // Nhạc nền (loop)
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current && audioRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-50">
      <audio ref={audioRef} src="./public/SinhNhatCuaXinhNhat-24kRightHIEUTHUHAIHipz-12294375.mp3" loop autoPlay />
      <img
        src={NPTHImg}
        alt="Ngô Phạm Thúy Hà"
        className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg mb-6"
      />
      <div className="bg-white rounded-2xl shadow-xl px-7 py-7 max-w-md w-full text-center relative">
        <img src={wish.avatar} alt={wish.from} className="w-12 h-12 rounded-full border-2 border-pink-300 absolute -top-8 left-1/2 -translate-x-1/2" />
        <div className="mt-7 mb-3 text-lg text-pink-700 min-h-[70px] font-medium" style={{fontFamily:'"Quicksand",cursive'}}>
          {typed}
          <span className="animate-pulse text-pink-300">{typed.length < wish.text.length && "|"}</span>
        </div>
        <div className="text-right text-xs text-gray-400">— {wish.from}</div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setWishIdx(Math.max(wishIdx - 1, 0))}
            disabled={wishIdx === 0}
            className="px-2 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
          >
            ←
          </button>
          {showNext && wishIdx < wishes.length - 1 && (
            <button
              onClick={() => setWishIdx(wishIdx + 1)}
              className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 font-bold text-pink-900 shadow"
            >
              Xem lời chúc tiếp
            </button>
          )}
          {showNext && wishIdx === wishes.length - 1 && (
            <button
              onClick={onNext}
              className="px-4 py-2 rounded bg-pink-400 hover:bg-pink-300 font-bold text-white shadow"
            >
              Đến trò chơi 🎲
            </button>
          )}
          <button
            onClick={() => setWishIdx(Math.min(wishIdx + 1, wishes.length - 1))}
            disabled={wishIdx === wishes.length - 1}
            className="px-2 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}