CloudCannon
===========

# Config #

*Variable* => *(type) defaultValue* : *description*

maxClouds => (int) 10 : max number of clouds to display on screen

minDuration => (int) 10000 : minimum amount of time for a cloud to cross the sky in ms

maxDuration => (int) 30000 : max amount of time for a cloud to cross the sky in ms

fireDelay => (int) 1000 : time to wait between creating clouds

sky => (JQuery Object) $('#sky') : JQuery object which represents the sky (where clouds will be rendered)

cloudImg => (string) 'img/cloud.gif' : path (relative to html) to cloud gif

direction => (string) 'left' : direction clouds move 'left' or 'right'

cloudScales => (float array) [1, 0.8, 0.5, 0.3] : Array to randomly scale clouds

maxAltitude => (int) -1 : Distance from top of sky clouds will render. -1 is the same as 0 and is the top of the sky.

minAltitude => (int) -1 : Distance from top of sky clouds will render. -1 is the same as the bottom/floor/ground of the sky.

zindex => (int) 100 : css z-index value for the clouds

## Altitude Settings ##

The above altitude settings can be confusing. 
Please reference this awesome ascii art for reference.

```
+-- #sky ---------------------------------------------------+
|           |                       |                       |
|           | [distance from top]   |                       |
|          \ /                      |                       |
|---- maxAltitude ------------------+-----------------------|
|                                   |                       |
|                                   | [distance from top]   |
|                                  \ /                      |
|----------------------------- minAltitude -----------------|
|                                                           |
|___________________________________________________________|
```