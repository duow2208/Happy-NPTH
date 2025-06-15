import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ isPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(error => {
        console.log("Auto-play prevented:", error);
      });
    } else {
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src="./public/SinhNhatCuaXinhNhat-24kRightHIEUTHUHAIHipz-12294375.mp3"
      loop
      className="hidden"
    />
  );
} 