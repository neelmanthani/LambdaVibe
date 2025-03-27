
import * as Tone from 'tone';
import React, { useEffect } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';

import { Instrument, InstrumentProps } from '../Instruments';

// Flute key properties
interface FluteKeyProps {
  note: string;
  octave:number;
  synth: Tone.FatOscillator;
}

// Flute key component
const FluteKey = ({ note,octave, synth }:FluteKeyProps): JSX.Element => {
  const fullNote =`${note}${octave}`;

  const playNote = () => {
    synth.frequency.value = Tone.Frequency(fullNote).toFrequency();
    synth.start();
  };

  const stopNote = ()=> {
    synth.stop();
  };

  return (
    <div
      onMouseDown={playNote}
      onMouseUp={stopNote}
      className={classNames('ba pointer dim flex justify-center items-center','bg-gray h3 w2 ma1')}
    >
      <span>{fullNote}</span> {/* Display the note name */}
    </div>
  );
};

const Flute = (): JSX.Element => {
  const notes = List([
    'C4', 'C#4', 'D4','D#4', 'E4', 'F4','F#4','G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5','C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
  ]);

  const synth = new Tone.FatOscillator("A4", "sawtooth", 40).toDestination();
  type KeyNoteMap = {
    [key: string]: string | undefined;
  };
  const keyNoteMap: KeyNoteMap = {
    'a': 'C4', 'w': 'C#4', 's': 'D4','e': 'D#4', 'd': 'E4','f': 'F4', 't':'F#4', 'g':'G4', 'y': 'G#4', 'h': 'A4',
    'u': 'A#4', 'j':'B4', 'k': 'C5', 'o': 'C#5','l': 'D5',
    // ... other mappings
  };
  
  const handleKeyDown = (event: KeyboardEvent) => {
    const note = keyNoteMap[event.key.toLowerCase()];
    if (note) {
      synth.frequency.value = Tone.Frequency(note).toFrequency();
      synth.start();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (keyNoteMap[event.key.toLowerCase()]) {
      synth.stop();
    }
  };
  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup',handleKeyUp);

    return () => {
      window.removeEventListener('keydown',handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      synth.dispose();
    };
  }, [synth]);

  return(
    <div className="pv4">
      <div className="flex justify-center flex-wrap">
        {notes.map((note,idx) => {
          const [noteName,octave] = note.split(/(\d+)/).filter(Boolean);
          return (
            <FluteKey 
              key={idx} 
              note={noteName} 
              octave={parseInt(octave,10)} 
              synth={synth} />
          );
        })}
      </div>
    </div>
  );
};

export const FluteInstrument = new Instrument('Flute',Flute);

