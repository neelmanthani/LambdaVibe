import React, { FC } from "react";
import * as Tone from "tone";
import { Instrument, InstrumentProps } from "../Instruments";
//<<<<<<< HEAD
// import './path-to-global-declaration/global.d.ts';
//>>>>>>> f403beb5cef9992a2308240047d6c80b12a3575e

// Trumpet pads
interface TrumpetPad {
  key: string;
  label: string;
  url: string;
}

interface TrumpetPadsProps {
  pads: TrumpetPad[];
}

const TrumpetPads: React.FC<TrumpetPadsProps> = ({ pads }) => {
  const handlePadClick = (pad: TrumpetPad) => {
    const player = new Tone.Player(pad.url).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", justifyContent: "center", alignItems: "center" }}>
      {pads.map((pad) => (
        <button
          key={pad.key}
          onMouseDown={() => handlePadClick(pad)}
          style={{
            display: "inline-block",
            width: "80px",
            height: "80px",
            margin: "10px",
            border: "2px solid #333",
            borderRadius: "50%",
            backgroundColor: "#ddd",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          {pad.label}
        </button>
      ))}
    </div>
  );
};

const trumpetPads = [
  {
    key: "C",
    label: "C",
    url: require ("../instruments/Audio/C.mp3") // Replace with the actual path to your audio file
  },
  {
    key: "D",
    label: "D",
    url: require ("../instruments/Audio/D.mp3") // Replace with the actual path to your audio file
  },
  {
    key: "E",
    label: "E",
    url: require ("../instruments/Audio/E.mp3") // Replace with the actual path to your audio file
  },
  {
    key: "F",
    label: "F",
    url: require ("../instruments/Audio/F.mp3") // Replace with the actual path to your audio file
  },
  {
    key: "G",
    label: "G",
    url: require ("../instruments/Audio/G.mp3") // Replace with the actual path to your audio file
  },
  
];

const Trumpet: FC<InstrumentProps> = (props) => {
  return (
    <div>
      <TrumpetPads pads={trumpetPads} />
    </div>
  );
};

export const TrumpetPadsInstrument = new Instrument("Trumpet", Trumpet);
