CloudCannon
===========
CloudCannon is a JavasScript class that will shoot clouds across an HTML "sky" element for a sweet scrolling cloud effect.  

**Features:**
* Cloud height, size, and speed are all customizable. 
* Cloud height, size, and speed are randomly set (from specified ranges) so no two clouds should do the same thing.
* Should work on any block element.

View a demo: [DEMO](http://jsfiddle.net/skinner927/23RVw/) 

CloudCannon is highly customizable by passing in an object of options. View the [Config](#config) section for more detail.

## Requirements
CloudCannon requires JQuery version >= 1.0 (untested with anything less than v1.9.1 so YMMV, but let me know).

The CloudCannon script is located in `/js/cloudCannon.js` and the cloud image is in `/img/cloud.gif`. This is all you need.

Your sky box needs these CSS settings to allow the clouds to render properly:
```css
#sky {        
  overflow: hidden;
  position: relative;
  display: block;
}
```

Example JS to get the cloud cannon started:
```html
<script type="text/javascript">
  $(function(){
    var cannon = new CloudCannon({
      minDuration: 15000, 
      maxDuration: 30000, 
      fireDelay: 2000, 
      maxAltitude: 200, 
      minAltitude: 500, 
      maxClouds: 20
    });
    
    cannon.start();
  });
</script>
```

Minimum required to get the cannon started:
```html
<script type="text/javascript">
  $(function((){
    new CloudCannon().start();
  });
</script>
```

## Config
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

## Altitude Settings
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

## Special Thanks!
Clouds are a modified vector made by Clue: [Simple Clouds](http://vector.me/browse/830081/simple_clouds)
