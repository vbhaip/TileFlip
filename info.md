# Rule Based Generator

## How it works

This generator allows you to code one rule that applies to each tile leading to a visualization of the tiles. The rule you write is a function that takes in an object context and returns the state of the tile from 0 to 1. For example, to make all tiles grey, you write

```
function rule(ctx){
    return 0.5;
}
```

``ctx`` is a dictionary that gives some helpful information for coming up with rules:


| item | description| type |
|--|--| -- |
| `ctx.curr` | current tile's value | *float*, 0 - 1 |
| `ctx.index` | unique index of tile | *int*, 0 - # of tiles |
| `ctx.x, y` | x and y location | *int*, 0 - # of tiles on each side |
| `ctx.t` | current time step | *int*, 0 - ∞|
| `ctx.resolution` | # tiles on each side | *int* |
| `ctx.up, left, right, down, upleft, upright,  downleft, downright` | value of the states of neighbors | *float*, 0 - 1|
| `ctx.neighbors` | same info as above as an array, starting at 0 representing upleft moving clockwise | *array*, 0 - 1|
| `ctx.ones` | # of neighbors where state = 1 | *int*, 0 - 8|
| `ctx.zeroes` | # of neighbors where state = 0 | *int*, 0 - 8|
| `ctx.corners` | # of corners of tile where state = 1 | *int*, 0 - 4|
| `ctx.sides` | # of sides of tile where state = 1 | *int*, 0 - 4|
| `ctx.color` |flag you can set for changing the color | *str* |
| `ctx.float_to_color(a)` | helper function to turn a float from 0 to 1 into a hsl value | *function*, arg: *float* 0 - 1|
| `ctx.animate` | flag you can set for animating a tile (as opposed to just flipping states) | *bool* |
| `ctx.board` | raw states for all tiles | *array* 0 - # of tiles |


These are there just to get you started, but you can always code up more complicated values. If you're still confused about these values, try it out in the editor and experiment!

You can also adjust the size of the visualization and refresh rate on the side, as well as draw on the visualization to set an initial state. The 'Download GIF' button turns the last session from which you played and stopped into a GIF. 

## About

I was inspired to make this after checking out the really cool [tixy.land](https://tixy.land). If you're still have questions or come up with a cool animation that you want to share, reach out to me @vbhaip.