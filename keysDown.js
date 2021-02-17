'use strict';

const keysDown = new Set();
document.addEventListener('keydown', (e) => {
   if (e.repeat) return;
   keysDown.add(e.key.toLowerCase());
});
document.addEventListener('keyup', (e) => {
   keysDown.delete(e.key.toLowerCase());
});
