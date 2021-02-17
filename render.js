/**
 * @typedef SkapObject
 * @property {string} id
 * @property {"obstacle" | "lava" | "slime" | "teleporter" | "text" | "door" | "button"} type
 * @property {"0" | "1" | "2" | "3"} dir
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {Object} size
 * @property {number} size.x
 * @property {number} size.y
 * @property {Object} center
 * @property {number} center.x
 * @property {number} center.y
 * @property {string} text
 * @property {boolean} opened
 * @property {boolean} pressed
 * @property {boolean} switch
 * @property {0 | 1} layer
 * @property {[number, number, number]} color
 * @property {number} opacity
 * @property {number} angle
 * @property {number[]} linkIds
 * @property {number[]} linkIdsOn
 * @property {number[]} linkIdsOff
 * @property {SkapObject[]} linksOn
 * @property {SkapObject[]} linksOff
 *
 * @typedef SkapEntity
 * @property {"bomb" | "bouncer" | "spike" | "normal" | "megaBouncer" | "taker" | "wavy" | "freezer" | "snek" | "immune" | "monster" | "stutter" | "contractor" | "expanding" | "turretBullet" | "enemyBullet" | "shield" | "healingGhost" | "meteorBullet" | "path"} type
 * bombs/bouncers/normal/spike
 * @property {number} radius
 * @property {number} opacity
 * @property {boolean} phase
 * @property {boolean} exploding FINALLY TYPO                      v
 * @property {boolean} triggered why can't you merge these two .-. ^
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * rotating >:(
 * @property {number} angle
 * snek >:(
 * @property {number} dir
 * @property {{ x: number, y: number, radius: number, time: number }[]} states
 *
 * @typedef Player
 * @property {Object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {Object} vel
 * @property {number} vel.x
 * @property {number} vel.y
 * @property {string[]} states
 * @property {number} fuel
 * @property {0 | 1 | 2 | 3} gravDir
 * @property {3 | 2.25} radius
 * @property {string} name
 * @property {[number, number, number]} color
 * @property {string} hat
 */
/**
 * @typedef SkapMap
 * @property {Object} areaSize
 * @property {number} areaSize.x
 * @property {number} areaSize.y
 * @property {[number, number, number]} areaColor
 * @property {[number, number, number, number]} backgroundColor
 * @property {SkapObject[]} objects
 */

/**
 * @param {Object} e
 * @param {Object} e.infos
 * @param {string} e.infos.id
 * @param {number} e.infos.fuel
 * @param {number | null} e.infos.oneCooldown
 * @param {number | null} e.infos.twoCooldown
 * @param {number} e.infos.oneHeat
 * @param {number} e.infos.twoHeat
 * @param {Object<string, Player>} e.players id:Player
 * @param {[string, string, boolean][]} e.playerList
 * @param {SkapEntity[]} e.entities
 */
'use strict';

function render(e) {
   canvas.width = Math.round(window.innerWidth);
   canvas.height = Math.round(window.innerHeight);
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.lineCap = 'round';

   ctx.fillStyle = renderSettings.colors.obstacle;
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   ctx.resetTransform();
   ctx.translate(Math.round(canvas.width / 2), Math.round(canvas.height / 2));
   ctx.scale(Math.round(camScale), Math.round(camScale));
   ctx.translate(-camX, -camY);

   ctx.fillStyle = parsedMap.background;
   ctx.fillRect(0, 0, map.areaSize.x, map.areaSize.y);

   // Camera
   if (freeCam) {
      camX += (camSpeed / Math.round(camScale)) * (keysDown.has('arrowright') - keysDown.has('arrowleft'));
      camY += (camSpeed / Math.round(camScale)) * (keysDown.has('arrowdown') - keysDown.has('arrowup'));
   }

   if (!e) {
      e = {
         infos: {
            id: 'TEMPORARY_ID',
            fuel: 12,
            oneCooldown: null,
            twoCooldown: null,
            oneHeat: 0,
            twoHeat: 0,
         },
         players: {},
         playerList: ['Sorry, but the data has not yet loaded.', '', true],
         entities: [],
      };
   }
   const mX = Math.round((mouse.x - canvas.width / 2) / camScale + camX);
   const mY = Math.round((mouse.y - canvas.height / 2) / camScale + camY);
   // aimXSpan.innerHTML = mX.toFixed(3);
   // aimYSpan.innerHTML = mY.toFixed(3);
   send({
      e: 'aim',
      m: [mX, mY],
   });
   for (const b of bots)
      b.send(
         JSON.stringify({
            e: 'aim',
            m: [mX, mY],
         })
      );

   if (renderSettings.render.obstacle) {
      // Render obstacles
      ctx.fillStyle = renderSettings.colors.obstacle;
      for (const obj of parsedMap.obstacle) {
         ctx.fillRect(Math.round(obj.pos.x), Math.round(obj.pos.y), Math.round(obj.size.x), Math.round(obj.size.y));
      }
   }
   // Render the ****ing teleporters (they suck)
   if (renderSettings.render.teleporter) {
      for (const obj of parsedMap.teleporter) {
         ctx.save();
         ctx.translate(obj.pos.x, obj.pos.y);
         let gradient;
         switch (obj.dir) {
            case '0':
               gradient = ctx.createLinearGradient(0, 0, 0, obj.size.y);
               break;
            case '1':
               gradient = ctx.createLinearGradient(obj.size.x, 0, 0, 0);
               break;
            case '2':
               gradient = ctx.createLinearGradient(0, obj.size.y, 0, 0);
               break;
            case '3':
               gradient = ctx.createLinearGradient(0, 0, obj.size.x, 0);
               break;
         }
         if (gradient) {
            gradient.addColorStop(0, parsedMap.background);
            gradient.addColorStop(1, renderSettings.colors.obstacle);
         } else gradient = parsedMap.background;
         ctx.fillStyle = gradient;
         ctx.fillRect(0, 0, obj.size.x, obj.size.y);
         ctx.restore();
      }
   }
   if (renderSettings.render.lava) {
      // Render lava
      ctx.fillStyle = renderSettings.colors.lava;
      for (const obj of parsedMap.lava) {
         ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      }
   }
   // Render rotLava
   ctx.globalAlpha = 1;
   for (const obj of parsedMap.rotatingLava) {
      ctx.save();
      ctx.translate(obj.center.x, obj.center.y);
      ctx.rotate(obj.angle);
      ctx.fillRect(-obj.size.x / 2, -obj.size.y / 2, obj.size.x, obj.size.y);
      ctx.restore();
   }
   if (renderSettings.render.ice) {
      // Render ice
      ctx.fillStyle = renderSettings.colors.ice;
      for (const obj of parsedMap.ice) {
         ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      }
   }
   if (renderSettings.render.slime) {
      // Render slime
      ctx.fillStyle = renderSettings.colors.slime;
      for (const obj of parsedMap.slime) {
         ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      }
   }
   // Render buttons
   ctx.setLineDash([]);
   for (const obj of parsedMap.button) {
      ctx.beginPath();
      ctx.moveTo(
         obj.pos.x + (obj.dir === '0' ? obj.size.x * 0.1 : 0),
         obj.pos.y + (obj.dir === '3' ? obj.size.y * 0.1 : 0)
      );
      ctx.lineTo(
         obj.pos.x + (obj.dir === '0' ? obj.size.x * 0.9 : obj.size.x),
         obj.pos.y + (obj.dir === '1' ? obj.size.y * 0.1 : 0)
      );
      ctx.lineTo(
         obj.pos.x + (obj.dir === '2' ? obj.size.x * 0.9 : obj.size.x),
         obj.pos.y + (obj.dir === '1' ? obj.size.y * 0.9 : obj.size.y)
      );
      ctx.lineTo(
         obj.pos.x + (obj.dir === '2' ? obj.size.x * 0.1 : 0),
         obj.pos.y + (obj.dir === '3' ? obj.size.y * 0.9 : obj.size.y)
      );
      ctx.fillStyle = obj.pressed ? renderSettings.colors.buttonPressed : renderSettings.colors.button;
      ctx.fill();
   }
   // Render switches?
   for (const obj of parsedMap.switch) {
      ctx.beginPath();
      ctx.moveTo(
         obj.pos.x - (obj.dir === '3' && !obj.switch ? 2 : 0),
         obj.pos.y - (obj.dir === '0' && obj.switch ? 2 : 0)
      );
      ctx.lineTo(
         obj.pos.x + (obj.dir === '1' && obj.switch ? 2 : 0) + obj.size.x,
         obj.pos.y - (obj.dir === '0' && !obj.switch ? 2 : 0)
      );
      ctx.lineTo(
         obj.pos.x + (obj.dir === '1' && !obj.switch ? 2 : 0) + obj.size.x,
         obj.pos.y + (obj.dir === '2' && obj.switch ? 2 : 0) + obj.size.y
      );
      ctx.lineTo(
         obj.pos.x - (obj.dir === '3' && obj.switch ? 2 : 0),
         obj.pos.y + (obj.dir === '2' && !obj.switch ? 2 : 0) + obj.size.y
      );
      ctx.fillStyle = obj.switch ? renderSettings.colors.buttonPressed : renderSettings.colors.button;
      ctx.fill();
   }
   // Renders
   ctx.fillStyle = renderSettings.colors.doorFill;
   for (const obj of parsedMap.door) {
      ctx.strokeStyle = obj.opened ? renderSettings.colors.doorOpenedOutline : renderSettings.colors.doorClosedOutline;
      ctx.strokeRect(obj.pos.x + 0.5, obj.pos.y + 0.5, obj.size.x - 1, obj.size.y - 1);
      if (!obj.opened) ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      for (const b of obj.linksOn) {
         ctx.beginPath();
         ctx.strokeStyle = b.pressed || b.switch ? renderSettings.colors.doorLineOn : renderSettings.colors.doorLineOff;
         ctx.moveTo(obj.pos.x + obj.size.x / 2, obj.pos.y + obj.size.y / 2);
         ctx.lineTo(b.pos.x + b.size.x / 2, b.pos.y + b.size.y / 2);
         ctx.stroke();
      }
      for (const b of obj.linksOff) {
         ctx.beginPath();
         ctx.strokeStyle = b.pressed || b.switch ? renderSettings.colors.doorLineOff : renderSettings.colors.doorLineOn;
         ctx.moveTo(obj.pos.x + obj.size.x / 2, obj.pos.y + obj.size.y / 2);
         ctx.lineTo(b.pos.x + b.size.x / 2, b.pos.y + b.size.y / 2);
         ctx.stroke();
      }
   }
   // Render blocks(0)
   ctx.globalAlpha = 1;
   if (renderSettings.render.block0) {
      for (const obj of parsedMap.block0) {
         ctx.fillStyle = obj.color;
         ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      }
   }

   // ENTITIES
   for (const obj of e.entities) {
      switch (obj.type) {
         case 'bomb':
            ctx.globalAlpha = obj.opacity;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.region + obj.radius, obj.region + obj.radius, 0, 0, 7);
            ctx.fillStyle = obj.exploding ? renderSettings.colors.mineExpRegion : renderSettings.colors.mineRegion;
            ctx.fill();
            ctx.drawImage(
               renderSettings.textures.enemies.bomb[obj.phase & 1],
               obj.pos.x - obj.radius,
               obj.pos.y - obj.radius,
               obj.radius * 2,
               obj.radius * 2
            );
            break;
         case 'following':
            ctx.globalAlpha = obj.opacity;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.region + obj.radius, obj.region + obj.radius, 0, 0, 7);
            ctx.fillStyle = renderSettings.colors.followingRegion;
            ctx.fill();
            ctx.drawImage(
               renderSettings.textures.enemies.following,
               obj.pos.x - obj.radius,
               obj.pos.y - obj.radius,
               obj.radius * 2,
               obj.radius * 2
            );
            break;
         case 'contractor':
            ctx.globalAlpha = obj.opacity;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.region + obj.radius, obj.region + obj.radius, 0, 0, 7);
            ctx.fillStyle = obj.triggered
               ? renderSettings.colors.contracTriggerRegion
               : renderSettings.colors.contracRegion;
            ctx.fill();
            ctx.drawImage(
               renderSettings.textures.enemies.contractor[obj.triggered & 1],
               obj.pos.x - obj.radius,
               obj.pos.y - obj.radius,
               obj.radius * 2,
               obj.radius * 2
            );
            break;
         case 'bouncer':
         case 'normal':
         case 'reverse':
         case 'spike':
         case 'megaBouncer':
         case 'freezer':
         case 'taker':
         case 'immune':
         case 'monster':
         case 'stutter':
         case 'expanding':
            ctx.globalAlpha = obj.opacity;
            ctx.drawImage(
               renderSettings.textures.enemies[obj.type],
               obj.pos.x - obj.radius,
               obj.pos.y - obj.radius,
               obj.radius * 2,
               obj.radius * 2
            );
            break;
         case 'rotating':
            ctx.save();
            ctx.translate(obj.pos.x, obj.pos.y);
            ctx.rotate(obj.angle);
            ctx.globalAlpha = obj.opacity;
            ctx.drawImage(
               renderSettings.textures.enemies.rotating,
               -obj.radius,
               -obj.radius,
               obj.radius * 2,
               obj.radius * 2
            );
            ctx.restore();
            break;
         case 'turretBullet':
         case 'enemyBullet':
            ctx.globalAlpha = 1;
            ctx.fillStyle = renderSettings.colors.lava;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, obj.radius, 0, 7);
            ctx.fill();
            break;
         case 'meteorBullet':
            ctx.globalAlpha = 1;
            ctx.fillStyle = renderSettings.colors.meteor;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, obj.radius, 0, 7);
            ctx.fill();
            break;
         case 'path':
            ctx.fillStyle = renderSettings.colors.blueFire;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, 0, 0, 7);
            ctx.fill();
            ctx.closePath();
            break;
         case 'shield':
            ctx.lineWidth = obj.size.y * 2;
            ctx.save();
            ctx.translate(obj.pos.x, obj.pos.y);
            ctx.rotate(obj.dir);
            ctx.beginPath();
            ctx.moveTo(-obj.size.x, 0);
            ctx.lineTo(obj.size.x, 0);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = renderSettings.colors.shield;
            ctx.stroke();
            ctx.restore();
            break;
         case 'healingGhost':
            ctx.globalAlpha = 1;
            ctx.fillStyle = renderSettings.colors.ghost;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, 2, 2, 2, 0, 7);
            ctx.fill();
            break;
         case 'frostEntity':
            ctx.globalAlpha = obj.opacity;
            ctx.beginPath();
            ctx.ellipse(obj.pos.x, obj.pos.y, obj.radius, obj.radius, 0, 0, 7);
            ctx.fillStyle = renderSettings.colors.frost;
            ctx.fill();
            break;
         case 'snek':
            ctx.save();
            for (let i = obj.states.length - 1, o = obj.states[i]; i >= 0; i--, o = obj.states[i]) {
               ctx.drawImage(
                  renderSettings.textures.enemies.snekBody,
                  o.x - obj.radius,
                  o.y - obj.radius,
                  obj.radius * 2,
                  obj.radius * 2
               );
            }
            ctx.globalAlpha = obj.opacity;
            ctx.translate(obj.pos.x, obj.pos.y);
            ctx.rotate(obj.dir);
            ctx.drawImage(
               renderSettings.textures.enemies.snekHead,
               -obj.radius,
               -obj.radius,
               obj.radius * 3,
               obj.radius * 2
            );
            ctx.restore();
            break;
         default:
            ctx.globalAlpha = obj.opacity || 1;
            ctx.drawImage(
               renderSettings.textures.enemies.none,
               obj.pos.x - obj.radius,
               obj.pos.y - obj.radius,
               obj.radius * 2,
               obj.radius * 2
            );
            break;
      }
   }

   // Render turrets
   ctx.globalAlpha = 1;
   for (const obj of parsedMap.turret) {
      ctx.save();
      ctx.translate(obj.pos.x + obj.size.x / 2, obj.pos.y + obj.size.y / 2);
      ctx.rotate(obj.dir);
      ctx.fillStyle = renderSettings.colors.turretCannon;
      ctx.fillRect(0, -2, 5, 4);
      ctx.fillStyle = renderSettings.colors.turretBody;
      ctx.beginPath();
      ctx.ellipse(0, 0, obj.size.x / 2, obj.size.y / 2, 0, 0, 7);
      ctx.fill();
      ctx.restore();
   }
   // Render players
   // ctx.font = '2px sans-serif';
   ctx.font = '2px Russo One, Verdana, Arial, Helvetica, sans-serif';
   for (const i in e.players) {
      const p = e.players[i];
      const died = p.states.includes('Died');
      const freeze = p.states.includes('Freeze');
      ctx.save();
      ctx.translate(p.pos.x, p.pos.y);
      ctx.rotate((p.gravDir / 2) * Math.PI);
      ctx.beginPath();
      // Body
      ctx.ellipse(0, 0, p.radius, p.radius, 0, 0, 7);
      ctx.fillStyle = died
         ? freeze
            ? renderSettings.colors.playerFreezeDead
            : renderSettings.colors.playerDead
         : freeze
         ? renderSettings.colors.playerFreeze
         : fromColArr(p.color);
      ctx.fill();
      // Hat
      // if (renderSettings.textures.hats.hasOwnProperty(p.hat)) ctx.drawImage(renderSettings.textures.hats[p.hat], -2 * p.radius, -2 * p.radius, 4 * p.radius, 4 * p.radius);
      // Name
      ctx.fillStyle = died
         ? freeze
            ? renderSettings.colors.playerFreezeDead
            : renderSettings.colors.playerDead
         : freeze
         ? renderSettings.colors.playerFreeze
         : '#202020';
      ctx.fillText(p.name, 0, -p.radius - 0.5);
      // fuelBar™️
      ctx.fillStyle = died
         ? freeze
            ? renderSettings.colors.playerFreezeDead
            : renderSettings.colors.playerDead
         : freeze
         ? renderSettings.colors.playerFreeze
         : `hsl(${p.fuel / 10 * 60}, 75%, 45%)`;
      ctx.fillRect(-5, p.radius + 1, p.fuel, 2);
      ctx.strokeStyle = '#202020';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(-5, p.radius + 1, 10, 2);
      ctx.restore();
   }
   // Render blocks(1)
   ctx.globalAlpha = 1;
   if (renderSettings.render.block1) {
      for (const obj of parsedMap.block1) {
         ctx.fillStyle = obj.color;
         ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      }
   }
   // Render grav zones
   ctx.setLineDash([2, 6]);
   ctx.lineWidth = 1;
   ctx.lineCap = 'round';
   for (const obj of map.objects.filter((obj) => obj.type === 'gravityZone')) {
      ctx.strokeStyle = renderSettings.colors.gravOutline[obj.dir];
      ctx.fillStyle = renderSettings.colors.gravFill[obj.dir];
      ctx.strokeRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
      ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
   }
   // Render boxes (build power)
   for (const obj of parsedMap.box) {
      ctx.fillStyle = renderSettings.colors.box;
      ctx.fillRect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
   }
   // Render text
   ctx.font = '5px Russo One, Verdana, Arial, Helvetica, sans-serif';
   ctx.strokeStyle = '#000000';
   ctx.setLineDash([]);
   for (const obj of map.objects.filter((obj) => obj.type === 'text')) {
      ctx.strokeText(obj.text, obj.pos.x, obj.pos.y);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(obj.text, obj.pos.x, obj.pos.y);
      ctx.fillStyle = '#000000';
   }
   // Render hitboxes
   ctx.setLineDash([]);
   if (renderSettings.renderHitboxes) {
      ctx.lineWidth = 2 / camScale;
      ctx.strokeStyle = renderSettings.colors.hitbox;
      for (const o of map.objects) ctx.strokeRect(o.pos.x, o.pos.y, o.size.x, o.size.y);
   }
}
/**
 * @param {number[]} arr
 */
function fromColArr(arr) {
   return `rgba(${arr.join(', ')})`;
}
