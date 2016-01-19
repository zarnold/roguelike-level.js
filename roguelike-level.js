var TILE = {
  VOID: 0,
  FLOOR: 1,
  WALL: 2,
  DOOR: 3,
  CHASM: 4,
  ENTER: 5,
  EXIT: 6
};

var DEFAULT = {
  WIDTH: 21,
  HEIGHT: 21,
  MIN_ROOM_WIDTH: 3,
  MAX_ROOM_WIDTH: 7,
  MIN_ROOM_HEIGHT: 3,
  MAX_ROOM_HEIGHT: 7,
  IDEAL_COUNT: 10,
  RETRY_COUNT: 100
};

function random(min_raw, max_raw) {
  var min = Math.floor(min_raw);
  var max = Math.floor(max_raw);

  return Math.floor(Math.random() * (max - min)) + min;
}

function RoguelikeLevel(config) {
  if (!config) {
    config = {};
  }

  if (!config.room) {
    config.room = {};
  }

  this.max_width = config.width || DEFAULT.WIDTH;
  this.max_height = config.height || DEFAULT.HEIGHT;

  this.room_min_width = config.room.min_width || DEFAULT.MIN_ROOM_WIDTH;
  this.room_max_width = config.room.max_width || DEFAULT.MAX_ROOM_WIDTH;
  this.room_min_height = config.room.min_height || DEFAULT.MIN_ROOM_HEIGHT;
  this.room_max_height = config.room.max_height || DEFAULT.MAX_ROOM_HEIGHT;

  this.room_ideal_count = config.room.ideal || DEFAULT.IDEAL_COUNT;
  this.retry_count = config.retry || DEFAULT.IDEAL_COUNT;

  // Convenient list of rooms
  this.world = null;
  this.rooms = [];
  this.halls = [];
  this.doors = [];
  this.enter = null;
  this.exit = null;
};

RoguelikeLevel.prototype.build = function() {
  this.createVoid();
  this.addStarterRoom();
  this.generateRooms();
  this.buildWalls();

  return {
    world: this.world,
    rooms: this.rooms,
    halls: this.halls,
    doors: this.doors,
    enter: this.enter,
    exit: this.exit
  };
};

/**
 * Creates a 2D array of VOID tiles
 */
RoguelikeLevel.prototype.createVoid = function() {
  var world = [];

  for (var y = 0; y < this.max_height; y++) {
    world[y] = [];
    for (var x = 0; x < this.max_width; x++) {
      world[y][x] = TILE.VOID;
    }
  }

  this.world = world;
}

RoguelikeLevel.prototype.addStarterRoom = function() {
  var width = random(this.room_min_width, this.room_max_width);
  var height = random(this.room_min_height, this.room_max_height);

  var left = random(
    this.max_width * 0.25 - width / 2,
    this.max_width * 0.75 - width / 2
  );

  var top = random(
    this.max_height * 0.25 - height / 2,
    this.max_height * 0.75 - height / 2
  );

  this.addRoom(left, top, width, height);
}

RoguelikeLevel.prototype.addRoom = function(left, top, width, height) {
  this.rooms.push({
    left: left,
    top: top,
    width: width,
    height: height
  });

  for (var y = top; y < top+height; y++) {
    for (var x = left; x < left+width; x++) {
      try {
      this.world[y][x] = TILE.FLOOR;
      } catch(e) {
        console.log(e);
        console.log(x, y);
      }
    }
  }
};

/**
 * Adds one-off floors, e.g. for building hallways
 */
RoguelikeLevel.prototype.addFloor = function(x, y) {
  this.world[y][x] = TILE.FLOOR;
};

RoguelikeLevel.prototype.generateRooms = function() {
  var retries = this.retry_count;

  while(this.rooms.length < this.room_ideal_count) {
    if (!this.generateRoom() && --retries <= 0) {
      break;
    }
  }
};

/**
 * Attempts to add a single room to our world
 */
RoguelikeLevel.prototype.generateRoom = function() {

  return false;
};

/**
 * Finds boundaries between floors and void, adding walls
 */
RoguelikeLevel.prototype.buildWalls = function() {
  var rooms = this.rooms;
  var world = this.world;

  // Do this for halls and rooms
  for (var i = 0; i < this.rooms.length; i++) {
    var room = rooms[i];

    // Top Wall (Long)
    for (var tx = room.left - 1; tx < room.left + room.width + 1; tx++) {
      this.addWallIfVoid(tx, room.top - 1);
    }

    // Right Wall (Short)
    for (var ry = room.top; ry < room.top + room.height; ry++) {
      this.addWallIfVoid(room.left + room.width, ry);
    }

    // Bottom Wall (Long)
    for (var bx = room.left - 1; bx < room.left + room.width + 1; bx++) {
      this.addWallIfVoid(bx, room.top + room.height);
    }

    // Left Wall (Short)
    for (var ly = room.top; ly < room.top + room.height; ly++) {
      this.addWallIfVoid(room.left - 1, ly);
    }
  }
};

RoguelikeLevel.prototype.addWallIfVoid = function(x, y) {
  if (this.world[y][x] === TILE.VOID) {
    this.world[y][x] = TILE.WALL
  }
};

module.exports = RoguelikeLevel;
