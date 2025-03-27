// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const Di = new Visualizer(
  '2D',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    const numLines = values.length;

    for (let i = 0; i < numLines; i++) {
      const amplitude = values[i] as number;
      const lineLength = amplitude * 200;
      const rotationSpeed = amplitude * 0.1;

      // Calculate the position of the line
      const x1 = centerX + Math.cos(rotationSpeed * i) * lineLength;
      const y1 = centerY + Math.sin(rotationSpeed * i) * lineLength;
      const x2 = centerX + Math.cos(rotationSpeed * i + p5.PI) * lineLength;
      const y2 = centerY + Math.sin(rotationSpeed * i + p5.PI) * lineLength;

      // Draw a rotating line
      p5.stroke(0, 255, 0); // Adjust color Red,Green,Blue
      p5.strokeWeight(2);
      p5.line(x1, y1, x2, y2);
    }
  },
);