import React, { FC } from "react";
import * as Tone from "tone";
import { Instrument, InstrumentProps } from "../Instruments";

// Drum pads
interface DrumPad {
  key: string;
  label: string;
  url: string;
}

interface DrumPadsProps {
  pads: DrumPad[];
}

const DrumPads: React.FC<DrumPadsProps> = ({ pads }) => {
  const handlePadClick = (pad: DrumPad) => {
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

const pads = [
  {
    key: "a",
    label: "Kick",
    url: "https://d7d3471nr939s.cloudfront.net/ScatteredBeats_Noiz_SP/MP3/One+Shots/21_Kick_19_SP_224_SP.mp3?cb=9398242d-d0ae-4086-8c42-2923d55205e7",
  },
  {
    key: "s",
    label: "Snare",
    url: "https://d7d3471nr939s.cloudfront.net/TemporalPerception_Noiz_SP/MP3/One+Shots/79_Snare_SP_244_20.mp3?cb=38cd69b7-bf6b-4e71-982f-b10dda1302dc",
  },
  {
    key: "d",
    label: "Hi-hat",
    url: "https://d7d3471nr939s.cloudfront.net/EtherealCircuit_Noiz_SP/MP3/One+Shots/Hat_SP_106_05.mp3?cb=0c24f107-9be2-4c6b-bcd7-d63fa63630e3",
  },
  {
    key: "e",
    label: "Clap",
    url: "https://d7d3471nr939s.cloudfront.net/HouseRevival_Noiiz_SP/MP3/One+Shots/Claps/Clap_13_325.mp3?cb=fb592fc6-12d5-4162-8c4f-2074f1d2d2ae",
  },
  {
    key: "w",
    label: "Cowbell",
    url: "https://d7d3471nr939s.cloudfront.net/SolarplexusKit_Noiiz/MP3/One+Shots/49_SolarCowbell_01_773.mp3?cb=1db49605-3667-4015-86db-8b0b57f6a643",
  },
];

const Drums: FC<InstrumentProps> = (props) => {
  return (
    <div>
      <DrumPads pads={pads} />
    </div>
  );
};

export const DrumPadsInstrument = new Instrument("Drums", Drums);
