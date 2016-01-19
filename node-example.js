#!/usr/bin/env node

/**
 * Visualizes level generation output using Node in the console
 */
var RoguelikeLevel = require('./roguelike-level.js');

var start = new Date();

var level = new RoguelikeLevel({
  width: 69,
  height: 25,
  retry: 100,
  room: {
    ideal: 11,
    min_width: 3,
    max_width: 9,
    min_height: 3,
    max_height: 9
  }
});

var result = level.build();

var world = result.world;

var end = new Date();

console.log(JSON.stringify(result));

// Crude mechanism for drawing level
for (var y = 0; y < world.length; y++) {
  var row = '';
  for (var x = 0; x < world[y].length; x++) {
    var tile = world[y][x];
    if (tile === 0) {
      row += ' ';
    } else if (tile === 1) {
      row += '.';
    } else if (tile === 2) {
      row += '#';
    } else if (tile === 3) {
      row += '/';
    } else if (tile === 5) {
      row += '<';
    } else if (tile === 6) {
      row += '>';
    } else {
      row += world[y][x];
    }
  }

  console.log(row + '| ' + y);
}

console.log('-'.repeat(world[0].length) + '+');

console.log('TIME TOOK: ' + ((end - start) / 1000) + 'ms');
