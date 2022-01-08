/**
 * @param {string} obj
 * @param {string} exportName 
 */
function download(exportName = "map") {
    // Copied from stackoverflow
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(mapToJSON(map));

    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
    a.setAttribute("download", exportName + ".json");

    document.body.appendChild(a); // required for firefox
    a.click();
    a.remove();
}

/**
 * @param {SkapMap} map 
 */
function mapToJSON(map) {
    let areas = [];
    for (let area of map.areas) {
        areas.push(areaToJSON(area));
    }
    return `{"settings":{"name":${JSON.stringify(map.settings.name)},"creator":${JSON.stringify(map.settings.creator)},"spawnPosition":[${map.settings.spawnPos.join()}],"spawnArea":${JSON.stringify(map.settings.spawnArea)},"version":${map.settings.version},"skapclient_version":${map.settings.skapclient_version}},"maps":[${areas.join()}]}`;
}

/**
 * @param {Area} area 
 */
function areaToJSON(area) {
    let objects = [];
    for (let obstacle of area.objects.obstacle) {
        objects.push(obstacleToJSON(obstacle));
    }
    for (let lava of area.objects.lava) {
        objects.push(lavaToJSON(lava));
    }
    for (let slime of area.objects.slime) {
        objects.push(slimeToJSON(slime));
    }
    for (let ice of area.objects.ice) {
        objects.push(iceToJSON(ice));
    }
    for (let block of area.objects.block) {
        objects.push(blockToJSON(block));
    }
    for (let teleporter of area.objects.teleporter) {
        objects.push(teleporterToJSON(teleporter));
    }
    for (let text of area.objects.text) {
        objects.push(textToJSON(text));
    }
    for (let spawner of area.objects.spawner) {
        objects.push(spawnerToJSON(spawner));
    }
    for (let gravZone of area.objects.gravityZone) {
        objects.push(gravZoneToJSON(gravZone));
    }
    for (let rotLava of area.objects.rotatingLava) {
        objects.push(rotLavaToJSON(rotLava));
    }
    for (let cirObj of area.objects.circularObject) {
        objects.push(cirObjToJSON(cirObj));
    }
    for (let door of area.objects.door) {
        objects.push(doorToJSON(door));
    }
    for (let Switch of area.objects.switch) {
        objects.push(switchToJSON(Switch));
    }
    for (let button of area.objects.button) {
        objects.push(buttonToJSON(button));
    }
    for (let turret of area.objects.turret) {
        objects.push(turretToJSON(turret));
    }
    for (let movObj of area.objects.movingObject) {
        objects.push(movObjToJSON(movObj));
    }
    for (let unknown of area.objects.unknown) {
        objects.push(JSON.stringify(unknown));
    }
    return `{"name":${JSON.stringify(area.name)},"size":[${area.size[0]},${area.size[1]}],"backgroundColor":[${area.colorArr.join()},${area.opacity}],"areaColor":[${area.backgroundArr.join()}],"objects":[${objects.join()}],"gravity":${area.gravity * 100}}`;
}

/**
 * @param {Obstacle} obstacle 
 */
function obstacleToJSON(obstacle) {
    return `{"type":"obstacle","position":[${obstacle.pos.x},${obstacle.pos.y}],"size":[${obstacle.size.x},${obstacle.size.y}]}`;
}
/**
 * @param {Lava} lava 
 */
function lavaToJSON(lava) {
    return `{"type":"lava","position":[${lava.pos.x},${lava.pos.y}],"size":[${lava.size.x},${lava.size.y}]}`;
}
/**
 * @param {Slime} slime 
 */
function slimeToJSON(slime) {
    return `{"type":"slime","position":[${slime.pos.x},${slime.pos.y}],"size":[${slime.size.x},${slime.size.y}]}`;
}
/**
 * @param {Ice} ice 
 */
function iceToJSON(ice) {
    return `{"type":"ice","position":[${ice.pos.x},${ice.pos.y}],"size":[${ice.size.x},${ice.size.y}]}`;
}
/**
 * @param {Block} block 
 */
function blockToJSON(block) {
    return `{"type":"block","position":[${block.pos.x},${block.pos.y}],"size":[${block.size.x},${block.size.y}],"color":[${block.colorArr.join()}],"opacity":${block.opacity},"collide":${block.collide},"layer":${block.layer ? 1 : 0}}`;
}
/**
 * @param {Teleporter} teleporter 
 */
function teleporterToJSON(teleporter) {
    return `{"type":"teleporter","position":[${teleporter.pos.x},${teleporter.pos.y}],"size":[${teleporter.size.x},${teleporter.size.y}],"dir":${teleporter.dir},"id":${teleporter.id},"targetArea":${JSON.stringify(teleporter.targetArea)},"targetId":${teleporter.targetId}}`;
}
/**
 * @param {SkapText} text 
 */
function textToJSON(text) {
    return `{"type":"text","position":[${text.pos.x},${text.pos.y}],"text":${JSON.stringify(text.text)}}`;
}
/**
 * @param {Spawner} spawner 
 */
function spawnerToJSON(spawner) {
    return `{"type":"spawner","position":[${spawner.pos.x},${spawner.pos.y}],"size":[${spawner.size.x},${spawner.size.y}],"entityType":${JSON.stringify(spawner.enemyType)},"number":${spawner.number},"speed":${spawner.speed},"radius":${spawner.radius}}`;
}
/**
 * @param {GravZone} gravZone 
 */
function gravZoneToJSON(gravZone) {
    return `{"type":"gravityZone","position":[${gravZone.pos.x},${gravZone.pos.y}],"size":[${gravZone.size.x},${gravZone.size.y}],"dir":${gravZone.dir}}`;
}
/**
 * @param {RotatingLava} rotLava 
 */
function rotLavaToJSON(rotLava) {
    return `{"type":"rotatingLava","position":[${rotLava.pos.x},${rotLava.pos.y}],"size":[${rotLava.size.x},${rotLava.size.y}],"point":[${rotLava.point.x},${rotLava.point.y}],"startAngle":${rotLava.startAngle},"speed":${rotLava.speed}}`;
}
/**
 * @param {CircularObject} cirObj
 */
function cirObjToJSON(cirObj) {
    return `{"type":"circular${capitalise(cirObj.objectType)}","position":[${cirObj.pos.x + cirObj.radius},${cirObj.pos.y + cirObj.radius}],"radius":${cirObj.radius}}`;
}
/**
 * @param {Door} door 
 */
function doorToJSON(door) {
    return `{"type":"door","position":[${door.pos.x},${door.pos.y}],"size":[${door.size.x},${door.size.y}],"linkIds":[${door.linkIds.join()}]}`;
}
/**
 * @param {Switch} Switch 
 */
function switchToJSON(Switch) {
    return `{"type":"switch","position":[${Switch.pos.x},${Switch.pos.y}],"size":[${Switch.size.x},${Switch.size.y}],"id":${Switch.id},"dir":${Switch.dir}}`;
}
/**
 * @param {Button} button 
 */
function buttonToJSON(button) {
    return `{"type":"button","position":[${button.pos.x},${button.pos.y}],"size":[${button.size.x},${button.size.y}],"id":${button.id},"dir":${button.dir},"time":${button.time}}`;
}
/**
 * @param {Turret} turret 
 */
function turretToJSON(turret) {
    return `{"type":"turret","position":[${turret.pos.x},${turret.pos.y}],"regionPosition":[${turret.region.pos.x},${turret.region.pos.y}],"regionSize":[${turret.region.size.x},${turret.region.size.y}],"radius":${turret.radius},"speed":${turret.speed},"shootingSpeed":${turret.shootingSpeed},"overHeat":${turret.overHeat},"coolDownTime":${turret.coolDownTime}}`;
}
/**
 * @param {MovingObject} movObj
 */
function movObjToJSON(movObj) {
    return `{"type":"moving${capitalise(movObj.objectType)}","size":[${movObj.size.x},${movObj.size.y}],"points":[${movObj.points.map(point=>(`{"position": [${point.x}, ${point.y}],"vel": ${point.vel}}`)).join()}]}`;
}