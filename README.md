# roguelike-level.js

JavaScript function for creating a roguelike level.

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
var RoguelikeLevel = require('./roguelike-level.js');

var level = new RoguelikeLevel({
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

var result = level.build();
```

## Example Output

A typical level takes about **20ms** to generate on my laptop. YMMV.

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
        "room_id": 2,
        "x": 2,
        "y": 7
    },
    "exit": {
        "room_id": 3,
        "x": 8,
        "y": 8
    },
    "door_count": 3,
    "doors": {
        "1": {
            "id": 1,
            "rooms": [ 1, 2 ],
            "special": false,
            "x": 4,
            "y": 5
        },
        "2": {
            "id": 2,
            "rooms": [ 1, 3 ],
            "special": false,
            "x": 8,
            "y": 6
        },
        "3": {
            "id": 3,
            "rooms": [ 1, 4 ],
            "special": true,
            "x": 12,
            "y": 4
        }
    },
    "room_count": 4,
    "rooms": {
        "1": {
            "doors": [ 1, 2, 3 ],
            "height": 5,
            "id": 1,
            "left": 5,
            "neighbors": [ 2, 3, 4 ],
            "special": false,
            "top": 1,
            "width": 7
        },
        "2": {
            "doors": [ 1 ],
            "height": 5,
            "id": 2,
            "left": 1,
            "neighbors": [ 1 ],
            "special": false,
            "top": 5,
            "width": 3
        },
        "3": {
            "doors": [ 2 ],
            "height": 3,
            "id": 3,
            "left": 7,
            "neighbors": [ 1 ],
            "special": false,
            "top": 7,
            "width": 3
        },
        "4": {
            "doors": [ 3 ],
            "height": 5,
            "id": 4,
            "left": 13,
            "neighbors": [ 1 ],
            "special": true,
            "top": 3,
            "width": 3
        }
    },
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
