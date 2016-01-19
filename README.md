# roguelike-level.js

JavaScript function for creating a roguelike level

## Example Level

This is a visual representation (generated using `node-example.js`).
It's not _technically_ part of this library.

```
  ###########      
  #...#.....#      
  #.<.#.....# #####
  #...#.....# #...#
  #...###/#####...#
  #...#.......#...#
  #.../....>../...#
  #...#.......#...#
  #############...#
              #...#
              #####
```

## Example Usage

```javascript
var RoguelikeLevel = require('./roguelike-level.js');

var level = new RoguelikeLevel({
  width: 19, // Max Width of the world
  height: 11, // Max Height of the world
  retry: 100, // How many times should we try to add a room?
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

|TYPE  | ID |
|------|----|
|VOID  | 0  |
|FLOOR | 1  |
|WALL  | 2  |
|DOOR  | 3  |
|ENTER | 5  |
|EXIT  | 6  |

```json
{
    "door_count": 3,
    "doors": {
        "1": {
            "id": 1,
            "rooms": [ 1, 2 ],
            "x": 6,
            "y": 6
        },
        "2": {
            "id": 2,
            "rooms": [ 2, 3 ],
            "x": 14,
            "y": 6
        },
        "3": {
            "id": 3,
            "rooms": [ 2, 4 ],
            "x": 9,
            "y": 4
        }
    },
    "enter": {
        "room_id": 1,
        "x": 4,
        "y": 2
    },
    "exit": {
        "room_id": 2,
        "x": 11,
        "y": 6
    },
    "room_count": 4,
    "rooms": {
        "1": { "height": 7, "id": 1, "left": 3, "top": 1, "width": 3 },
        "2": { "height": 3, "id": 2, "left": 7, "top": 5, "width": 7 },
        "3": { "height": 7, "id": 3, "left": 15, "top": 3, "width": 3 },
        "4": { "height": 3, "id": 4, "left": 7, "top": 1, "width": 5 }
    },
    "world": [
        [ 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 2, 1, 5, 1, 2, 1, 1, 1, 1, 1, 2, 0, 2, 2, 2, 2, 2 ],
        [ 0, 0, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 2 ],
        [ 0, 0, 2, 1, 1, 1, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1, 1, 1, 2 ],
        [ 0, 0, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2 ],
        [ 0, 0, 2, 1, 1, 1, 3, 1, 1, 1, 1, 6, 1, 1, 3, 1, 1, 1, 2 ],
        [ 0, 0, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2 ],
        [ 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2 ]
    ]
}
```

## TODO

* Generate doors between rooms which happen to be touching but not slid together
* Generate hallways between non-touching rooms, complete with doors
* Generate hidden rooms (doors will have `hidden:true` attribute)
* Generate rooms which aren't rectangular (round, blobs)
* Calculate the distance of every room from entrance/exit
* Generate special terrain types, e.g. large chasms or lakes
