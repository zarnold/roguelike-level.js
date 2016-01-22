# roguelike-level.js

JavaScript CommonJS module for creating a roguelike level.

The concept is simple, inspired by sliding system used by [Brogue](https://www.rockpapershotgun.com/2015/07/28/how-do-roguelikes-generate-levels/).
Random rooms are generated, and slid into the level in a random direction until they collide with an existing room.
Once they collide a door is generated randomly in the colliding surface.
We only generate rooms on odd rows and columns so that everything fits together perfectly.

## Example Level

This is a simple visual representation (generated using `node-example.js`).
Of course you'd just want to import the main library and use it in your game.

```
    #########    
    #.......#    
    #.......#####
    #.......#...#
#####.......X...#
#.../.......#...#
#...####/####...#
#.<.# #...# #...#
#...# #.>.# #####
#...# #...#      
##### #####      

```

## Example Usage

```javascript
var roguelikeLevelGen = require('./roguelike-level.js');

var level = roguelikeLevelGen({
  width: 17, // Max Width of the world
  height: 11, // Max Height of the world
  retry: 100, // How many times should we try to add a room?
  special: true, // Should we generate a "special" room?
  room: {
    ideal: 5, // Give up once we get this number of rooms
    min_width: 3,
    max_width: 7,
    min_height: 3,
    max_height: 7
  }
});

console.log(level);
```

## Example Output

A typical level takes about **3ms** to generate on my laptop. YMMV.

A **special** room can be used for whatever you want. I like to use them for shops and hidden rooms (you'll know when a door is special, too).

The `world` attribute is entirely optional for you to use. All the data within it can be recreated using the other attributes.

### World Matrix Cell Types

|TYPE           | ID |
|---------------|----|
|VOID           | 0  |
|FLOOR          | 1  |
|WALL           | 2  |
|DOOR           | 3  |
|SPECIAL DOOR   | 4  |
|ENTER          | 5  |
|EXIT           | 6  |

### Output JSON

```json
{
    "width": 17,
    "height": 11,
    "enter": {
        "room_id": 1,
        "x": 2,
        "y": 7
    },
    "exit": {
        "room_id": 2,
        "x": 8,
        "y": 8
    },
    "door_count": 3,
    "doors": {
        "0": {
            "id": 0,
            "rooms": [ 0, 1 ],
            "special": false,
            "x": 4,
            "y": 5
        },
        "1": {
            "id": 1,
            "rooms": [ 0, 2 ],
            "special": false,
            "x": 8,
            "y": 6
        },
        "2": {
            "id": 2,
            "rooms": [ 0, 3 ],
            "special": true,
            "x": 12,
            "y": 4
        }
    },
    "room_count": 4,
    "rooms": {
        "0": {
            "doors": [ 0, 1, 2 ],
            "height": 5,
            "id": 0,
            "left": 5,
            "neighbors": [ 1, 2, 3 ],
            "special": false,
            "top": 1,
            "width": 7
        },
        "1": {
            "doors": [ 0 ],
            "height": 5,
            "id": 1,
            "left": 1,
            "neighbors": [ 0 ],
            "special": false,
            "top": 5,
            "width": 3
        },
        "2": {
            "doors": [ 1 ],
            "height": 3,
            "id": 2,
            "left": 7,
            "neighbors": [ 0 ],
            "special": false,
            "top": 7,
            "width": 3
        },
        "3": {
            "doors": [ 2 ],
            "height": 5,
            "id": 3,
            "left": 13,
            "neighbors": [ 0 ],
            "special": true,
            "top": 3,
            "width": 3
        }
    },
    "walls": [
      [4, 0],
      [4, 1],
      [4, 2],
      [10, 10]
    ],
    "world": [
        [ 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ],
        [ 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2 ],
        [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2 ],
        [ 2, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2 ],
        [ 2, 1, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 2 ],
        [ 2, 1, 5, 1, 2, 0, 2, 1, 1, 1, 2, 0, 2, 1, 1, 1, 2 ],
        [ 2, 1, 1, 1, 2, 0, 2, 1, 6, 1, 2, 0, 2, 2, 2, 2, 2 ],
        [ 2, 1, 1, 1, 2, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0 ],
        [ 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0 ]
    ]
}
```

(Walls output is truncated)

## Caveats

* Rooms must be odd sized, and at least 3 units wide/tall
* World should likewise be odd sized
* Weird things will happen if you try to generate rooms larger than the world

## TODO

* Generate "interesting" rooms, e.g. with patterns of pillars
* Randomly generate doors between rooms which happen to be touching but not slid together
* Crop unused rows/columns (hence we provide _max_ width, not width, during generation)
* Generate hallways between non-touching rooms, complete with doors
* Generate rooms which aren't rectangular (round, blobs)
* Calculate the distance of every room from entrance/exit
* Generate special terrain types, e.g. large chasms or lakes
