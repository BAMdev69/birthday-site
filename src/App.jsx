import React from 'react';
import MoonCanvas from './components/MoonCanvas';
import TreeCanvas from './components/TreeCanvas';
import PetalCanvas from './components/PetalCanvas';
import FinalCanvas from './components/FinalCanvas';
import './App.css';

function App() {
  return (
    <div className="container">
      {/* 🌸 Vertical Japanese Name */}
      <div className="vertical-japanese">チャンダナ</div>

      <MoonCanvas />
      <section className="section section1">TO THE MOST ANNOYING & COOL PERSON...</section>

      <TreeCanvas />
      <PetalCanvas />
      
      <section className="section section2"><h1></h1></section>
      
      <section className="section section3">
            <div className="birthday-text"><h6>HAPPY BIRTHDAY</h6><h3><b>CHANDANA</b></h3></div>
        </section>

      <FinalCanvas />

      {/* <audio
        src="/assets/bg-music.mp3"
        autoPlay
        loop
        controls
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          zIndex: 1000,
        }}
      /> */}
    </div>
  );
}

export default App;
