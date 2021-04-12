import { sketch } from './index';
import { p5map } from '../types/p5map';

export const p5_YYYYMMDD = ():p5map => { // change name
	const p5map: p5map = {
		date: 'MMMMYYDD',
		title: 'template',
		note: 'template note',
		content: 'template content',
		sketch: sketch,
	}
	return p5map;
}

