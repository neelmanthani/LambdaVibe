// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Guitar
 ** ------------------------------------------------------------------------ */

interface GuitarNoteProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  octave: number;
  gString: number;
  index: number; // octave + index together give a location for the piano key
  samplePath: string;
}

export function GuitarNote({
    index,
    gString,
    samplePath
  }: GuitarNoteProps): JSX.Element {
    /**
     * This React component corresponds to a note in the guitar.
     */

    const handleNoteClick = (samplePath: string) => {
      const player = new Tone.Player(samplePath).toDestination();
      console.log(samplePath);
      Tone.loaded().then(() => {
        player.volume.value = -5;
        player.start();
      });
    };

    return (
      // Observations:
      // 1. The JSX refers to the HTML-looking syntax within TypeScript.
      // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
      // 3. The curly braces `{` and `}` should remind you of string interpolation.
      <div>
        <div
            onMouseDown={() => handleNoteClick(samplePath)}
            className={classNames('ba pointer absolute dim', 'bg-black h0')}
            style={{
            // CSS
            top: `${(4-gString)*3}rem`,
            left: `${index*4}rem`,
            zIndex: 0,
            width: '4rem',
            marginLeft: 0,
            height: '0.2rem'
            }}
        >
        </div>
        <div 
            className={classNames('ba absolute', 'bg-black h0')}
            style = {{
            top: `${(4-gString)*3 - 1}rem`,
            left: `${index*4}rem`,
            borderLeft: '2px solid black',
            height: '3rem',
            zIndex: 0,
            width: '8px',
            }}
        >
        </div>
      </div>
    );
  }

  function GuitarType({ title, onClick, active }: any): JSX.Element {
    return (
      <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': active,
          'gray b--light-gray': !active,
        })}
      >
        {title}
      </div>
    );
  }

  function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = [
      { note: 'C'},
      { note: 'Cs'},
      { note: 'D'},
      { note: 'Ds'},
      { note: 'E'},
      { note: 'F'},
      { note: 'Fs'},
      { note: 'G'},
      { note: 'Gs'},
      { note: 'A'},
      { note: 'As'},
      { note: 'B'},
    ];

    let i = 0
    let p = 4
    let oct = 2
    let s = 0

    let guitarKeyList = []

    

    for (s = 0; s < 4; s++) {
      for (i = 0; i < 16; i++) {
        if (p > 11) {
          p = 0;
          oct++;
        }

        const note = `${keys[p].note}${oct}`

        guitarKeyList.push(<GuitarNote
          key={note} //react key
          note={note}
          octave={oct}
          gString={s}
          index={i}
          samplePath={require('../instruments/Audio/guitar_samples/'+ note +'.mp3')}
        />)

        p++
      }
      
      for (i = 0; i < 11; i++){
        if (p == 0){
          p = 11;
          oct--;
        } else {
          p--;
        }

      }
    }

    p = 11;
    oct -= 1;

    for (i = 0; i < 16; i++) {
      if (p > 11) {
        p = 0;
        oct++;
      }

      const note = `${keys[p].note}${oct}`

        guitarKeyList.push(<GuitarNote
          key={note} //react key
          note={note}
          octave={oct}
          gString={s}
          index={i}
          samplePath={require('../instruments/Audio/guitar_samples/'+ note +'.mp3')}
        />)

      p++
    }

    s++;

    p = 4
    oct--;
  
    return (
      <div className="pv4">
        <div className="relative dib w-100 ml4 h5">
          {guitarKeyList}
        </div>
      </div>
    );
}

export const GuitarInstrument = new Instrument('Guitar', Guitar);
