// const Two = require('two.js');
import Two from 'two.js';
import { Circuit } from './circuit';
import * as util from './util';

// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { width: '100%', height: '100%', autostart: true };
var two = new Two(params).appendTo(elem);

var circuit = new Circuit('Integrated Circuit', 6, 200, 200);
two.add(circuit);
util.createGrid(20);
two.update();

circuit.makeDraggable();

// two.play();
// circuit.getFile();