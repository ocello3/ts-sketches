'use strict';

// import * as Tone from 'tone';
import { initParams } from './initParams.js';
import { initBall } from './initBall.js';
import { updateBall } from './updateBall.js';
// import { amSynth } from './sound.js';

export const sketch = (props) => {
	return (s) => {

		const canvasDiv = document.getElementById('canvas');
		const params = initParams(canvasDiv.clientWidth);
		// const synth = {};
		let balls = Array.from(Array(params.ballNum), (ball, index) => initBall(index)(params));

		const setPane = (props) => {
			const f1 = props.get('pane').addFolder({
				title: 'Control',
			});
			const stopButton = f1.addButton({
				title: 'start/stop',
			});
			stopButton.on('click', () => {
				s.isLooping() ? s.noLoop() : s.loop();
			});
		}

		const drawFrame = (params) => {
			s.push();
			s.stroke('black');
			s.strokeWeight(1);
			s.noFill();
			s.rect(0, 0, params.canvasSize, params.canvasSize);
			s.pop();
		}

		const drawBalls = (balls) => {
			const edgeBall = balls[0];
			s.push();
			s.noFill();
			s.stroke(0);
			s.strokeWeight(1);
			s.beginShape();
			s.curveVertex(edgeBall.leftEdge.x, edgeBall.leftEdge.y);
			s.curveVertex(edgeBall.leftEdge.x, edgeBall.leftEdge.y);
			balls.forEach((ball) => {
				s.curveVertex(ball.pos.x, ball.pos.y);
			});
			s.curveVertex(edgeBall.rightEdge.x, edgeBall.rightEdge.y);
			s.curveVertex(edgeBall.rightEdge.x, edgeBall.rightEdge.y);
			s.endShape();
			s.pop();
		}

		// const soundOn = () => {
		// 	synth.amSynth = new Tone.AMOscillator({
		// 		frequency: 880,
		// 		volume: -4,
		// 	}).toDestination().start();
		// 	dialog.close();
		// }
		// const soundOff = () => {
		// 	Tone.Master.mute = true;
		// 	dialog.close();
		// }
		s.setup = () => {
			s.createCanvas(params.canvasSize, params.canvasSize);
			setPane(props);
			s.noLoop();
		};

		s.draw = () => {
			balls = balls.map((ball) => updateBall(ball)(params, s.frameCount));
			s.background(255);
			drawFrame(params);
			drawBalls(balls);
		}

		// s.mouseClicked = () => {
		// 	Tone.start();
		// }
	}
}
