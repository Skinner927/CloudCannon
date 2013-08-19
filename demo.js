/*
  CloudCannon.js
  Written By: Dennis Skinner
  Version 1.0
---
  The MIT License (MIT)

  Copyright (c) 2013 Skinner927

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function CloudCannon(usr_options) {
  var self = this;
  
  self.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  self.options = {
    maxClouds: 10,              // Max number of clouds on screen at one time
    minDuration: 10000,         // Min amount of time (ms) for cloud to cross screen
    maxDuration: 30000,         // Max amount of time (ms) for cloud to cross screen
    fireDelay: 1000,            // Time to wait after a cloud leaves the screen before shooting out a new one
    sky: $('#sky'),             // JQuery object that is the sky
    cloudImg: 'img/cloud-old.gif',  // Cloud image
    direction: 'left',          // 'left' = left to right, 'right' = right to left
    cloudScales: [1, 0.8, 0.5, 0.3],
    minAltitude: -1,           // Distance from top of sky in pixels (-1 means to the floor). If you're setting this number, it should be higher than maxAltitude
    maxAltitude: -1,           // Distance from top of sky in pixels (-1 is the same as 0)
    zindex: 100,
    
    cloudWidth: 500,      // DO NOT CHANGE: This value is recalculated on first run
    cloudHeight: 500      // DO NOT CHANGE: This value is recalculated on first run
  };
  
  // Apply user settings
  for (var key in usr_options){ 
    if (self.options.hasOwnProperty(key))
      self.options[key] = usr_options[key];
  }  
  
  // Number of clouds in the sky
  self.clouds = 0;
  
  // Starts the cannon
  self.start = function() {  
    // Init
    if(self.clouds == 0) {
      $('<img src="'+self.options.cloudImg+'" />').load(function(){
        // get the width and height of the cloud
        self.options.cloudWidth = this.width;
        self.options.cloudHeight = this.height;
        
        self.options.maxAltitude = (self.options.MaxAltitude < 1) ? 0 : self.options.maxAltitude;
        self.options.minAltitude = (self.options.MinAltitude < 1) ? sky.height() : self.options.minAltitude;
        
        // Start the cannon
        self.cloudLoop();
      });
    }
  };
  
  // This is the main loop for generating clouds
  self.cloudLoop = function(){
    // Keep firing if we don't have all the initial clouds out
    if(self.clouds < self.options.maxClouds) {
      self.shootCloud();
      setTimeout(function(){self.cloudLoop();}, self.options.fireDelay);
    }
  };
  
  // Creates a new cloud and sends it on its way
  self.shootCloud = function() {
    // Increment counter before we build
    self.clouds += 1;    
    
    // Resize ratio for cloud
    var imageRatio = self.options.cloudScales[self.random(0, self.options.cloudScales.length - 1)];
    
    // Create the cloud
    var cloud = $('<img src="'+self.options.cloudImg+'" />');       
    // Starts the cloud off screen
    cloud.css(self.options.direction, (self.options.cloudWidth * -1) - 5);  
    
    // Calculate the top to prevent the cloud from going outside the allowed altitude   
    var top = self.random(self.options.maxAltitude, self.options.minAltitude - (self.options.cloudHeight * imageRatio));

    // Standard CSS
    cloud.css({
      position: 'absolute',      
      top: top,
      width: self.options.cloudWidth * imageRatio,
      height: self.options.cloudHeight * imageRatio,
      zindex: self.options.zindex
    });
        
    // Stick the cloud in the sky
    cloud.appendTo(self.options.sky);
    
    // Animation properties
    var animation = {};             
    animation[self.options.direction] = '+=' + (self.options.sky.width() + self.options.cloudWidth + 5);
    
    // Send the cloud on its way
    cloud.animate(animation, self.random(self.options.minDuration, self.options.maxDuration), 'linear', function(){
      $(this).remove();
      self.clouds -= 1;
      setTimeout(function(){self.cloudLoop();}, self.options.fireDelay);
    });
    
    
  }
}