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
    for (let block of area.objects.block0) {
        objects.push(blockToJSON(block, 0));
    }
    for (let block of area.objects.block1) {
        objects.push(blockToJSON(block, 1));
    }
    for (let teleporter of area.objects.teleporter) {
        objects.push(teleporterToJSON(teleporter));
    }
    return `{"name":${JSON.stringify(area.name)},"size":[${area.size[0]},${area.size[1]}],"backgroundColor":[${area.colorArr.join()},${area.opacity}],"areaColor":[${area.backgroundArr.join()}],"objects":[${objects.join()}]}`;
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
 * @param {0 | 1} layer 
 */
function blockToJSON(block, layer) {
    return `{"type":"block","position":[${block.pos.x},${block.pos.y}],"size":[${block.size.x},${block.size.y}],"color":[${block.colorArr.join()}],"opacity":${block.opacity},"collide":${block.collide},"layer":${layer}}`;
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