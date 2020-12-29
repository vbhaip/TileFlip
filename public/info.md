# Rule Based Generator

## How it works
This application allows you to code up a rule that applies to each tile over and over leading to a visualization of tiles. The rule you write is a function that takes in an object context and returns the darkness of the tile from 0 to 1.

```
function rule(ctx){
    return 0.5;
}
```

``ctx`` is a dictionary that gives some helpful information for coming up with rules:


| item | description|
|--|--|
| `ctx.curr` | current tile's value |
| `ctx.index` | unique index of tile |
| `ctx.x, y` | x and y location |
| `ctx.t` | current time step |
| `ctx.resolution` | side length of visualization|
| `ctx.up, left, right, down, upleft, upright,  downleft, downright` | value of the states in neighbors |
| `ctx.neighbors` | array with information above, starting at 0 topleft clockwise |
| `ctx.ones` | # of neighbors where state = 1 |
| `ctx.zeroes` | # of neighbors where state = 0 |
| `ctx.corners` | # of corners of tile where state = 1 |
| `ctx.sides` | # of sides of tile where state = 1 |
| `ctx.color` | a value you can set for changing the color |
| `ctx.float_to_color(a)` | function to turn float from 0 to 1 into hsl value |


These are there just to get you started, but you can always code up more complicated values. If you're still confused about these values, try it out in the editor and experiment!

## About

I was inspired to make this after checking out the really cool [tixy.land](https://tixy.land). If you're still have questions or come up with a cool animation that you want to share, reach out to me @vbhaip.