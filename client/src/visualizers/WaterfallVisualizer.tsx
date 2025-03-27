import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const WaterfallDropVisualizer = new Visualizer(
  'WaterfallDrop',
  (p5: P5,analyzer: Tone.Analyser) => {
    const width =window.innerWidth;
    const height= window.innerHeight / 2;

    p5.background(0, 0, 0, 255);

    const values =analyzer.getValue();
    const shadesOfBlue = ['#ADD8E6','#87CEEB', '#4169E1','#0000CD']; // DIferrnt shades of blue

    for (let i = 0; i< values.length; i++) {
      const amplitude =values[i] as number;
      const dropSize =amplitude * 20;
      const x = p5.random(width);
      const y =0;
      const colorIndex = Math.floor(p5.map(amplitude, -1,1, 0,shadesOfBlue.length));
      const dropColor = shadesOfBlue[colorIndex];

      p5.fill(dropColor);
      p5.noStroke();
      p5.ellipse(x, y+i*5,dropSize, dropSize);
    }
  },
);
