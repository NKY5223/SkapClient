/**
 * @param {Object} m
 * @param {Object} m.infos
 * @param {string} m.infos.id
 * @param {number} m.infos.fuel
 * @param {number | null} m.infos.oneCooldown
 * @param {number | null} m.infos.twoCooldown
 * @param {number} m.infos.oneHeat
 * @param {number} m.infos.twoHeat
 * @param {Object<string, Player>} m.players id:Player
 * @param {[string, string, boolean][]} m.playerList
 * @param {SkapEntity[]} m.entities
 */
'use strict';

function updateStates(m) {
   const now = Date.now();
   const diff = now - lastUpdate;
   minLU = Math.min(minLU, diff);
   if (diff < 10000) maxLU = Math.max(maxLU, diff);
   // lastUpdateDisplay.innerHTML = diff;
   // minMaxUpdate.innerHTML = minLU + ' - ' + maxLU;
   lastUpdate = now;

   const player = m.players[m.infos.id];
   // Camera
   if (!freeCam) {
      camX = player.pos.x;
      camY = player.pos.y;
   }

   power0CD.style.height = m.infos.oneCooldown * 100 + '%';
   power1CD.style.height = m.infos.twoCooldown * 100 + '%';
   power0Heat.style.height = m.infos.oneHeat * 100 + '%';
   power1Heat.style.height = m.infos.twoHeat * 100 + '%';

   // Death/Freeze message
   if (player.states.includes('Died')) {
      show(deathM);
      hide(freezeM);
   } else {
      hide(deathM);
      if (player.states.includes('Freeze')) show(freezeM);
      else hide(freezeM);
   }
   document.title = `SkapClient${
      player.states.includes('Died') ? ' <Dead>' : player.states.includes('Freeze') ? ' <Frozen>' : ''
   }`;

   // List players
   playerList.innerHTML = '';
   for (const p of m.playerList) {
      playerList.innerHTML += `<p${p[2] ? " class='deadPlayerName'" : ''}>${p[0].safe()}: ${p[1].safe()}</p>`;
   }
   // Fuel bar
   // fuelBar.style.width = (100 * m.infos.fuel) / 10 + '%';
   // Pos and vel
   // posXSpan.innerHTML = player.pos.x;
   // posYSpan.innerHTML = player.pos.y;
   // const vel = Math.sqrt(player.vel.x * player.vel.x + player.vel.y * player.vel.y);
   // velSpan.innerHTML = vel.toFixed(3);
   // velXSpan.innerHTML = player.vel.x;
   // velYSpan.innerHTML = player.vel.y;
   // maxVel = Math.max(maxVel, vel);
   // maxVelP.innerHTML = maxVel.toFixed(3);

   // Set entities... (totally not render)
   data = m;
}
