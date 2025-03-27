// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const ColorBarVisualizer = new Visualizer("ColorBar", (p5: P5, analyzer: Tone.Analyser) => {
  const width = window.innerWidth;
  const height = window.innerHeight / 2;

  p5.background(0, 0, 0, 255);

  // Define an array of colors to use for the bars
  const colors = [
    p5.color(255, 0, 0),
    p5.color(255, 128, 0),
    p5.color(255, 255, 0),
    p5.color(0, 255, 0),
    p5.color(0, 128, 255),
    p5.color(128, 0, 255),
  ];

  // Calculate the bar width and spacing based on the number of bars
  const numBars = 128;
  const barWidth = width / numBars;
  const barSpacing = barWidth / 4;

  const values = analyzer.getValue();

  for (let i = 0; i < numBars; i++) {
    // Calculate the average amplitude of the frequency range for this bar
    const startIndex = Math.floor((values.length / numBars) * i);
    const endIndex = Math.floor((values.length / numBars) * (i + 1));
    //@ts-ignore
    const amplitude = values.slice(startIndex, endIndex).reduce((a, b) => a + b, 0) / (endIndex - startIndex);

    // Map the amplitude to a bar height
    const barHeight = p5.map(amplitude, 0, 1, 0, height);

    // Calculate the position of the bar
    const x = i * (barWidth + barSpacing) + barSpacing / 2;
    const y = height - barHeight;

    // Set the fill color based on the bar's position in the spectrum
    const colorIndex = Math.floor((i / numBars) * colors.length);
    p5.fill(colors[colorIndex]);

    // Draw the bar
    p5.rect(x, y, barWidth - barSpacing, barHeight);
  }
});





export const CircularVisualizer = new Visualizer(
  'Circle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    // p5.translate(width/2, height/2)
    p5.noFill();

    const values = analyzer.getValue();
    const radius = dim/2
    const centerX = width/2
    const centerY = height/2
    const numWaves = 2;
    const numPoints = values.length

    // p5.beginShape();
    for(let j=0; j<numPoints; j++){
      for (let i = 0; i <= numWaves; i++) {
        const waveIndex = j+i*numPoints
        const amplitude = values[waveIndex] as number;
        const angle = p5.map(j,0,numPoints-1,0,p5.TWO_PI)

        // const colorFactor = p5.sin(p5.frameCount * 0.1 + amplitude*5) * 0.5 + 0.5;
        // const r = p5.map(colorFactor, 0,1,0,255)
        // const g = p5.map(colorFactor,0,1,0,255)
        // const b = p5.map(colorFactor,0,1,0,255)
        // p5.stroke(r,g,b,255)

        p5.colorMode(p5.HSB, 255);
        const hue = (p5.frameCount*3)%255
        p5.stroke(hue, 255, 255, 255)
  
        const x = centerX + Math.cos(angle + i * (p5.TWO_PI / numWaves)) * radius * (1 + amplitude);
        const y = centerY + Math.sin(angle + i * (p5.TWO_PI / numWaves)) * radius * (1 + amplitude);
        
        p5.point(x,y)
        // Place vertex
        // p5.vertex(x, y);
      }
    }
    // p5.endShape(p5.CLOSE);
  },
);
