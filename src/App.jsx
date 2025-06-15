// src/App.jsx
import React, { useState, useEffect } from "react";
import WelcomeGate from "./components/WelcomeGate";
import BirthdayCard from "./components/BirthdayCard";
import MiniGames from "./components/MiniGames";
import SurpriseBox from "./components/SurpriseBox";
import MemoryGallery from "./components/MemoryGallery";
import SecretWishesRoom from "./components/SecretWishesRoom";
import SpecialWishes from "./components/SpecialWishes";
import BirthdayEffects from "./components/BirthdayEffects";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Bắt đầu phát nhạc khi rời khỏi trang welcome
    if (page !== "welcome") {
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Hiệu ứng sinh nhật */}
      <BirthdayEffects />
      
      {/* Audio Player luôn hiển thị nhưng chỉ phát khi không phải trang welcome */}
      <AudioPlayer isPlaying={isMusicPlaying} />
      
      {currentPage === "welcome" && (
        <WelcomeGate onReady={() => handlePageChange("birthdayCard")} />
      )}
      {currentPage === "birthdayCard" && (
        <BirthdayCard onNext={() => handlePageChange("miniGames")} />
      )}
      {currentPage === "miniGames" && (
        <MiniGames onNext={() => handlePageChange("surpriseBox")} />
      )}
      {currentPage === "surpriseBox" && (
        <SurpriseBox onNext={() => handlePageChange("memoryGallery")} />
      )}
      {currentPage === "memoryGallery" && (
        <MemoryGallery onNext={() => handlePageChange("secret")} />
      )}
      {currentPage === "secret" && (
        <SecretWishesRoom onComplete={() => handlePageChange("special")} />
      )}
      {currentPage === "special" && (
        <SpecialWishes />
      )}
    </div>
  );
}

export default App;