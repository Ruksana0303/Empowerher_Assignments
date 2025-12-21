import React, { useRef } from "react";

function VideoPlayer() {
  const videoRef = useRef(null);

  const playVideo = () => videoRef.current.play();
  const pauseVideo = () => videoRef.current.pause();
  const forwardVideo = () => (videoRef.current.currentTime += 5);
  const rewindVideo = () => (videoRef.current.currentTime -= 5);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain"
        }}
      />

      <div style={{ position: "absolute", bottom: "30px" }}>
        <button onClick={playVideo}>▶️ Play</button>
        <button onClick={pauseVideo}>⏸ Pause</button>
        <button onClick={rewindVideo}>⏪ Rewind</button>
        <button onClick={forwardVideo}>⏩ Forward</button>
      </div>
    </div>
  );
}

export default VideoPlayer;
