import P5 from 'p5';
// import Tweakpane from 'tweakpane';
import { getParams } from './getParams.js';
import { calcInit } from './calcInit.js';
import { calcUpdate } from './calcUpdate.js';
// import gui from './gui.js';

const sketch = (s) => {
	// const paneId = document.getElementById('pane');
	// const pane = new Tweakpane({ container:paneId });
	const windowSize = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
	const params = getParams(windowSize);
	// const colorPalette = {
	// 	color_1: s.color('blue'),
	// 	color_2: s.color('red'),
	// };
	let snakes = Array.from(Array(params.snakeNum), (snake, snakeIndex) => calcInit(snakeIndex));
	snakes = snakes.map(func => func(params));

	s.setup = () => {
		s.createCanvas(params.canvasSize, params.canvasSize);
		s.noLoop();
		// gui(pane, paneId, params);
	};

	s.draw = () => {
		snakes = snakes.map((currentSnake) => calcUpdate(currentSnake));
		snakes = snakes.map(func => func(params, 60));
		console.log(snakes[0]);
		// draw background
		s.background(255);
		// draw frame
		s.noFill();
		s.rect(0, 0, params.canvasSize, params.canvasSize);
		// draw snake
		s.push();
		s.stroke(0);
		s.noFill();
		snakes.forEach((snake) => {
			const posArray = snake.currentPosArray;
			const initPos = posArray[0];
			const lastPos = posArray[posArray.length - 1];
			s.beginShape();
			s.curveVertex(initPos.x, initPos.y);
			s.curveVertex(initPos.x, initPos.y);
			posArray.forEach(pos => { s.curveVertex(pos.x, pos.y); });
			s.curveVertex(lastPos.x, lastPos.y);
			s.curveVertex(lastPos.x, lastPos.y);
			s.endShape(s.CLOSE);
		});
		s.pop();
	};
};

new P5(sketch, 'p5js');

