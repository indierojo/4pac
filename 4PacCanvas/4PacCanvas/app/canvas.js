var canvas = document.getElementById('canvas');
var readout = document.getElementById('readout');
var context = canvas.getContext('2d');

context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';

context.fillText('Hello World!', canvas.width / 2 - 150, canvas.height / 2 + 15);
context.strokeText('Hello World!', canvas.width / 2 - 150, canvas.height / 2 + 15);
//# sourceMappingURL=canvas.js.map
