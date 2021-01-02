# TileFlip: Rule-based Visualization Playground

## How it works

This generator allows you to code one rule that applies to each tile leading to a visualization. The rule you write is a function that takes in an object context and returns the state of the tile from 0 to 1. For example, to make all tiles grey, you write

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
| `ctx.x, y` | x and y location of tile | *int*, 0 - # of tiles on each side |
| `ctx.t` | current time step | *int*, 0 - ∞|
| `ctx.resolution` | # tiles on each side | *int* |
| `ctx.up, left, right, down, upleft, upright, downleft, downright` | value of the states of neighbors | *float*, 0 - 1|
| `ctx.neighbors` | same info as above but as an array, starting at 0 representing upleft moving clockwise | *array*, 0 - 1|
| `ctx.ones` | # of neighbors where state === 1 | *int*, 0 - 8|
| `ctx.zeroes` | # of neighbors where state === 0 | *int*, 0 - 8|
| `ctx.corners` | # of corner neighbors where state === 1 | *int*, 0 - 4|
| `ctx.sides` | # of side neighbors where state === 1 | *int*, 0 - 4|
| `ctx.color` |flag you can set for changing the color | *str* |
| `ctx.float_to_color(a)` | helper function to turn a float from 0 to 1 into a color [hsl value](https://en.wikipedia.org/wiki/HSL_and_HSV) | *function;* arg: *float*, 0 - 1|
| `ctx.animate` | flag you can set for animating a tile (as opposed to just flipping states) | *bool* |
| `ctx.invert` | flag you can set for the rendering software to set the tile's value to `1 - ctx.curr` (advanced option for when you want a non-white background) | *bool* |
| `ctx.board` | raw states for all tiles | *array*, 0 - # of tiles |


Consider this as a reference to get you started, but you can always derive more complicated values. If you're still confused about these values, try it out in the editor and experiment!

You can also adjust the size of the visualization and refresh rate on the side, as well as draw on the visualization to set an initial state. 

## Sharing Your Work

There's two options to share your work. You can share a direct link to this website with the 'Share URL' button. If you want to share a GIF of your visualization, click the 'Download as GIF' button. This button will capture your last 'session' from when you clicked "Play" till you clicked "Pause". It'll take a few seconds after you paused the animation for your GIF to render.

Note that sharing the URL of your work will only preserve the initial state from when the animation was played, not the color. Also keep in mind that sharing long rules will sometimes not work due to the size limits on query strings in URLs.

## About

I was inspired to make this by the really cool [tixy.land](https://tixy.land). If you still have questions or come up with a cool animation that you want to share, reach out to me at *contact @ vinaybhaip.com*.

##
Star this respository on [Github](https://github.com/vbhaip/simulation-generation)!


