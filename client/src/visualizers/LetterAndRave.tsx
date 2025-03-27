// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const RaveVisualizer = new Visualizer(
    'Rave',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.005);

        const values = analyzer.getValue();
        let max = 0;

        p5.frameRate(30);

        p5.beginShape();
        for (let i = 0; i < values.length / 5; i++) {
            const amplitude = values[i * 5] as number;

            const y = i * 10;
            let x = width / 2 + amplitude * width / 2 - 100;

            const y2 = height / 2 + Math.abs(amplitude) * height;
            let x2 = width / 2 + amplitude * width - 100;

            const y3 = height / 2 - Math.abs(amplitude) * height;

            const hue = (p5.frameCount) % 255
            const hue2 = (p5.frameCount * 17) % 255
            
            p5.fill(255 - hue, hue2, hue, hue%100 + 50);
            p5.stroke(hue, 255 - hue, hue2, 255)
            
            p5.vertex(x, y);
            p5.vertex(x2, y2);
            p5.vertex(x, y3);
        }
        p5.endShape();
    },
);

export const LetterVisualizer = new Visualizer(
    'Letter',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.005);

        const values = analyzer.getValue();
        let max = 0;

        const letters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z'
        ]

        let divSize = width/52;

        let widthDivisions: number[] = []

        for (let i = 1; i <= 52; i++) {
            widthDivisions.push(divSize*i);
        }

        p5.beginShape();
        for (let i = 0; i < 200; i++) {
            const amplitude = values[Math.floor(i * values.length/200)] as number;

            const y = i*10;
            let x = width / 2 + amplitude * width - 100;

            let index = 0;

            for (; index < 52; index++){
                if (widthDivisions[index] >= x) {
                    break;
                }
            }

            let letter = letters[index%26];
            let letter2 = letters[(index-8)%26]
            let letter3 = letters[(index+8)%26]

            p5.textSize(12)
            p5.fill(255, 255, 255, 255);
            p5.stroke(0, 0, 0, 0)

            // p5.text(Math.floor((amplitude * 100)) % 20, x, y);
            p5.text(letter2, x-300, y);
            p5.text(letter, x, y);
            p5.text(letter3, x+300, y);
        }
        p5.endShape();
    },
);

