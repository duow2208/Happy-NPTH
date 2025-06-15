// src/components/MemoryGallery.jsx
import React, { useState } from "react";
import SNNN from '../assets/photo/SNNN.jpg';
import T3 from '../assets/photo/T3.jpg';
import T4 from '../assets/photo/T4.jpg';
import T5 from '../assets/photo/T5.jpg';
import T6 from '../assets/photo/T6.jpg';

const photos = [
  {
    url: SNNN,
    caption: "Last year's birthday - 2024 \n              kiếm trên fb hẹ hẹ hẹ ",
  },
  {
    url: T3,
    caption: "March-2025",
  },
  {
    url: T4,
    caption: "April-2025",
  },
  {
    url: T5,
    caption: "May-2025",
  },
  {
    url: T6,
    caption: "June-2025",
  },
];

export default function MemoryGallery({ onNext }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <h2 className="text-3xl font-bold text-yellow-700 mb-2 z-30 relative">
      📸 Hành trình 1 năm của Hà
      </h2>
      <h3 className="text-xl font-bold text-yellow-700 mb-6 z-30 relative">
        Quen hồi tháng 3 nên được lấy ảnh từ tháng 3 nhaaa :v
      </h3>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        <div className="relative w-full h-64 sm:h-80 md:h-96">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 transition-all duration-500 ${idx === i ? "z-20 scale-105" : "z-10 scale-95 opacity-40"} ${idx === i - 1 ? "-translate-x-32 -rotate-6" : idx === i + 1 ? "translate-x-32 rotate-6" : "-translate-x-1/2 -translate-y-1/2"}`}
              style={{
                transform: idx === i
                  ? "translate(-50%, -50%) scale(1.04) rotate(-2deg)"
                  : idx === i - 1
                    ? "translate(-100%, -60%) scale(0.95) rotate(-7deg)"
                    : idx === i + 1
                      ? "translate(0%, -40%) scale(0.95) rotate(8deg)"
                      : "translate(-50%, -50%) scale(0.9) rotate(0deg)",
                opacity: idx === i ? 1 : 0.4,
                pointerEvents: idx === i ? "auto" : "none",
              }}
            >
              <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col items-center border-2 border-yellow-200">
                <img src={p.url} alt={p.caption} className="w-full h-48 sm:h-60 md:h-72 object-cover rounded mb-3 shadow" />
                <div className="text-center text-pink-700 text-base font-semibold">{p.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 rounded-full font-bold text-gray-500 shadow hover:bg-gray-100"
          onClick={() => setIdx(Math.max(idx - 1, 0))}
          disabled={idx === 0}
        >
          ←
        </button>
        <button
          className="px-6 py-2 bg-yellow-400 rounded-full font-bold text-pink-800 shadow hover:bg-yellow-300"
          onClick={onNext}
        >
          Đến phòng chat ẩn danh ✉️
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-full font-bold text-gray-500 shadow hover:bg-gray-100"
          onClick={() => setIdx(Math.min(idx + 1, photos.length - 1))}
          disabled={idx === photos.length - 1}
        >
          →
        </button>
      </div>
      <div className="mt-8 text-lg text-pink-700 text-center animate-grow border-2 border-pink-700 rounded-lg p-2 bg-pink-100">
        xin phép lấy ảnh trên locket làm cái này nhaaa :v <br />references : ThuyHaaa :3 (locket)
      </div>
    </div>
  );
}