// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { DrumPadsInstrument } from './instruments/DrumPads';
import { GuitarInstrument } from './instruments/Guitar';
import { TrumpetPadsInstrument as Trumpet } from './instruments/Trumpet';
import { FluteInstrument } from './instruments/Flute';

import { WaveformVisualizer } from './visualizers/Waveform';
import { Di } from './visualizers/2D'
import { WaterfallDropVisualizer } from './visualizers/WaterfallVisualizer';

import { ColorBarVisualizer } from './visualizers/BarAndCircle';
import { CircularVisualizer } from './visualizers/BarAndCircle';

import { RaveVisualizer } from './visualizers/LetterAndRave';
import { LetterVisualizer } from './visualizers/LetterAndRave';



/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }
/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
//<<<<<<< HEAD
//const instruments = List([PianoInstrument, DrumPadsInstrument, GuitarInstrument,TrumpetPadsInstrument ]);       // similar to Instrument[]
//=======
const instruments = List([PianoInstrument, DrumPadsInstrument, GuitarInstrument, Trumpet, FluteInstrument]);       // similar to Instrument[]
//>>>>>>> f403beb5cef9992a2308240047d6c80b12a3575e

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, Di,WaterfallDropVisualizer, ColorBarVisualizer, CircularVisualizer, LetterVisualizer, RaveVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});