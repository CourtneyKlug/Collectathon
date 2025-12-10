var SnailBait = function () {
   this.canvas = document.getElementById('game-canvas'),
   this.context = this.canvas.getContext('2d'),

   // Time..............................................................

   this.timeSystem = new TimeSystem(); // See js/timeSystem.js

   this.timeFactor = 1.0; // 1.0 is normal speed, 0.5 is 1/2 speed, etc.
   this.SHORT_DELAY = 50; // milliseconds
   this.TIME_RATE_DURING_TRANSITIONS = 0.2;
   this.NORMAL_TIME_RATE = 1.0;

   this.IZZY_LEFT = 50,
   this.STARTING_IZZY_TRACK = 1,

   // Constants.........................................................

   this.LEFT = 1,
   this.RIGHT = 2,

   this.SHORT_DELAY = 50; // milliseconds

   this.TRANSPARENT = 0,
   this.OPAQUE = 1.0,

   this.BACKGROUND_VELOCITY = 42,
   this.RUN_ANIMATION_RATE = 10,

   this.PLATFORM_HEIGHT = 8,  
   this.PLATFORM_STROKE_WIDTH = 2,
   this.PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

   this.GRAVITY_FORCE = 9.81; // m/s/s

   // Background width and height.........................................

   this.BACKGROUND_WIDTH = 890;
   this.BACKGROUND_HEIGHT = 400;

   // Pixels and meters.................................................

   this.CANVAS_WIDTH_IN_METERS = 13;  // Proportional to sprite sizes

   this.PIXELS_PER_METER = this.canvas.width / 
                           this.CANVAS_WIDTH_IN_METERS;

   // Velocities........................................................

   this.GEAR_PACE_VELOCITY = 80; //May be used to make gears bobble. Doesn't work yet -Abby

   // Loading screen....................................................

   this.loadingElement = document.getElementById('loading');
   this.loadingTitleElement = document.getElementById('loading-title');
   this.loadingAnimatedGIFElement = 
      document.getElementById('loading-animated-gif');

   // Track baselines...................................................

   this.TRACK_1_BASELINE = 323,
   this.TRACK_2_BASELINE = 223,
   this.TRACK_3_BASELINE = 123,
   
   // Platform scrolling offset (and therefore speed) is
   // PLATFORM_VELOCITY_MULTIPLIER * backgroundOffset: The
   // platforms move PLATFORM_VELOCITY_MULTIPLIER times as
   // fast as the background.

   this.PLATFORM_VELOCITY_MULTIPLIER = 4.35,

   this.STARTING_BACKGROUND_VELOCITY = 0,

   this.STARTING_BACKGROUND_OFFSET = 0,
   this.STARTING_SPRITE_OFFSET = 0,

   // States............................................................

   this.paused = false;
   this.PAUSED_CHECK_INTERVAL = 200;
   this.windowHasFocus = true;
   this.countdownInProgress = false;
   this.gameStarted = false;

   // Images............................................................
   
   this.spritesheet = new Image(),
   // Sounds............................................................

   this.jumpSound = new Audio('sounds/jump.mp3'),

   // Time..............................................................
   
   this.lastAnimationFrameTime = 0,
   this.lastFpsUpdateTime = 0,
   this.fps = 60,

   // Toast.............................................................

   this.toastElement = document.getElementById('toast'),

   // Instructions......................................................

   this.instructionsElement = document.getElementById('instructions');

   // Copyright.........................................................

   this.copyrightElement = document.getElementById('copyright');

   // Score.............................................................

   this.gearElement = document.getElementById('gear-counter'),
   this.gearLabelElement = document.getElementById('gear-counter-label'),
   this.eggElement = document.getElementById('egg-counter'),
   this.eggLabelElement = document.getElementById('egg-counter-label'),
   this.gearCount = 0;
   this.eggCount = 0;
   this.leafCount = 0;

   // Sound and music...................................................

   this.soundAndMusicElement = document.getElementById('sound-and-music');

   // Runner track......................................................

   this.runnerTrack = this.STARTING_RUNNER_TRACK,
   
   // Translation offsets...............................................
   
   this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET,
   this.spriteOffset = this.STARTING_SPRITE_OFFSET;
   //this.jumpBehavior = new JumpBehavior();
   
   //this.platformOffset = this.STARTING_PLATFORM_OFFSET,

   // Velocities........................................................

   this.bgVelocity = this.STARTING_BACKGROUND_VELOCITY,
   this.platformVelocity,

     // Sprite sheet cells................................................
     // All measurements are in pixels

   this.IZZY_CELLS_WIDTH = 55;
   this.IZZY_CELLS_HEIGHT = 40;

   this.EGG_CELLS_HEIGHT = 30;
   this.EGG_CELLS_WIDTH  = 22;
   this.EGG3_CELLS_WIDTH = 35;

   this.GEAR_CELLS_HEIGHT = 30; //Height of the gear sprite
   this.GEAR_CELLS_WIDTH = 29; //Width of the gear sprite

   this.MUSHROOM_CELLS_HEIGHT = 40;
   this.MUSHROOM_CELLS_WIDTH = 50;

   this.BUSH_CELLS_HEIGHT = 50;
   this.BUSH_CELLS_WIDTH = 50;

   this.TREE_CELLS_HEIGHT = 80;
   this.TREE_CELLS_WIDTH = 50;

   this.EGG4_CELLS_HEIGHT = 50;
   this.EGG4_CELLS_WIDTH = 40;

   this.EGG5_CELLS_HEIGHT = 50;
   this.EGG5_CELLS_WIDTH = 40;

   this.DINO_CELLS_HEIGHT = 70;
   this.DINO_CELLS_WIDTH = 50;

   this.LEAF_CELLS_HEIGHT = 50;
   this.LEAF_CELLS_WIDTH = 60;

   this.DOOR_CELLS_HEIGHT = 80;
   this.DOOR_CELLS_WIDTH = 45;

   this.OPENDOOR_CELLS_HEIGHT = 80;
   this.OPENDOOR_CELLS_WIDTH = 45;

   this.DEATHPIT_CELLS_HEIGHT = 80;
   this.DEATHPIT_CELLS_WIDTH = 1200;


   // Sprite sheet cells................................................
    this.egg1Cells = [
        { left: 125, top: 2, width: this.EGG_CELLS_WIDTH, 
                             height: this.EGG_CELLS_HEIGHT }
    ];

    this.egg2Cells = [
       { left: 104, top: 3, width: this.EGG_CELLS_WIDTH, 
                             height: this.EGG_CELLS_HEIGHT }
    ];

    this.egg3Cells = [
      { left: 66, top: 4, width: this.EGG3_CELLS_WIDTH, 
                             height: this.EGG_CELLS_HEIGHT }
    ];

    this.egg4Cells = [
      { left: 341,   top: 10, width: this.EGG4_CELLS_WIDTH,
                             height: this.EGG4_CELLS_HEIGHT }
   ];

    this.egg5Cells = [
      { left: 388,   top: 9, width: this.EGG5_CELLS_WIDTH,
                              height: this.EGG5_CELLS_HEIGHT }
   ];

   this.gearCells = [ //This is the location of the gear sprite on the sprite sheet
      { left: 0,   top: 0, width: this.GEAR_CELLS_WIDTH,
                             height: this.GEAR_CELLS_HEIGHT }
   ];

   this.izzyCellsRight = [
      { left: 502, top: 5139,
         width: 20, height: this.IZZY_CELLS_HEIGHT },

      { left: 448, top: 5139,
         width: 32, height: this.IZZY_CELLS_HEIGHT },

      { left: 404, top: 5139,
         width: 25, height: this.IZZY_CELLS_HEIGHT },

      { left: 358, top: 5139,
         width: 20, height: this.IZZY_CELLS_HEIGHT },

      { left: 306, top: 5139,
         width: 23, height: this.IZZY_CELLS_HEIGHT },
   ],
   
   this.izzyCellsLeft = [
      { left: 50, top: 5139,
         width: 27, height: this.IZZY_CELLS_HEIGHT },

      { left: 91, top: 5139,
         width: 40, height: this.IZZY_CELLS_HEIGHT },

      { left: 143, top: 5139,
         width: 33, height: this.IZZY_CELLS_HEIGHT },

      { left: 194, top: 5139,
         width: 27, height: this.IZZY_CELLS_HEIGHT },

      { left: 242, top: 5139,
         width: 29, height: this.IZZY_CELLS_HEIGHT },
   ],

   this.izzyCellsIdle = [
      { left: 6, top: 5051,
         width: 20, height: this.IZZY_CELLS_HEIGHT },
      
      { left: 55, top: 5051,
         width: 19, height: this.IZZY_CELLS_HEIGHT },

      { left: 102, top: 5051,
         width: 20, height: this.IZZY_CELLS_HEIGHT },
      
      { left: 6, top: 5051,
         width: 20, height: this.IZZY_CELLS_HEIGHT },

      { left: 149, top: 5051,
         width: 20, height: this.IZZY_CELLS_HEIGHT },
   ],

   this.izzyCellsJump = [
      { left: 5, top: 5098,
         width: 26, height: this.IZZY_CELLS_HEIGHT },
      
         { left: 5, top: 5098,
            width: 26, height: this.IZZY_CELLS_HEIGHT },

            { left: 5, top: 5098,
               width: 26, height: this.IZZY_CELLS_HEIGHT },

               { left: 5, top: 5098,
                  width: 26, height: this.IZZY_CELLS_HEIGHT },

                  { left: 5, top: 5098,
                     width: 26, height: this.IZZY_CELLS_HEIGHT },
   ],

   this.izzyCellsLanding = [
      { left: 146, top: 5098,
         width: 32, height: this.IZZY_CELLS_HEIGHT },

         { left: 146, top: 5098,
            width: 32, height: this.IZZY_CELLS_HEIGHT },

            { left: 146, top: 5098,
               width: 32, height: this.IZZY_CELLS_HEIGHT },

               { left: 146, top: 5098,
                  width: 32, height: this.IZZY_CELLS_HEIGHT },

                  { left: 146, top: 5098,
                     width: 32, height: this.IZZY_CELLS_HEIGHT },
   ],

   this.mushroomCells = [
      { left: 162, top: 3, width: this.MUSHROOM_CELLS_WIDTH,
                             height: this.MUSHROOM_CELLS_HEIGHT }
   ];

   this.bushCells = [
      { left: 220, top: 9, width: this.BUSH_CELLS_WIDTH,
                             height: this.BUSH_CELLS_HEIGHT }
   ];

   this.treeCells = [
      { left: 288, top: 5, width: this.TREE_CELLS_WIDTH,
                             height: this.TREE_CELLS_HEIGHT }
   ];

   this.dinoHappyCells = [
      { left: 3930, top: 4647, width: 528,
                             height: 714 }
   ];

   this.dinoSadCells = [
      { left: 3206, top: 4647, width: 524,
                             height: 714 }
   ];

   this.leafCells = [
      { left: 438, top: 13, width: this.LEAF_CELLS_WIDTH,
                           height: this.LEAF_CELLS_HEIGHT }
   ];

   this.doorCells = [
      { left: 1009, top: 5553, width: this.DOOR_CELLS_WIDTH,
                           height: this.DOOR_CELLS_HEIGHT }
   ];

   this.opendoorCells = [
      { left: 1085, top: 5553, width: this.OPENDOOR_CELLS_WIDTH,
                           height: this.OPENDOOR_CELLS_HEIGHT }
   ];

   this.deathpitCells = [
      { left: 2376, top: 5800, width: this.DEATHPIT_CELLS_WIDTH,
                           height: this.DEATHPIT_CELLS_HEIGHT }
   ];

   // Sprite data.......................................................

   this.egg1Data = [
       { left: 480,  
          top: this.TRACK_2_BASELINE - this.EGG_CELLS_HEIGHT }, 
    ];  

    this.egg2Data = [
      { left: 1920, 
         top: this.TRACK_1_BASELINE - this.EGG_CELLS_HEIGHT }, 
   ];  

   this.egg3Data = [
      { left: 4660, 
         top: this.TRACK_1_BASELINE - this.EGG_CELLS_HEIGHT }, 
   ];  

   this.egg4Data = [
      { left: 1260,
         top: this.TRACK_2_BASELINE - 2.8*this.EGG4_CELLS_HEIGHT },
   ];


   this.egg5Data = [
      { left: 2600,
         top: this.TRACK_3_BASELINE - -1.0*this.EGG5_CELLS_HEIGHT },
   ];

   // Platforms.........................................................

this.platformData = [
      // Screen 1.......................................................
      {
         left:      10,
         width:     230,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {
         left:      242,
         width:     388,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {  left:      450,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
         pulsate:   false,
      },

      {  left:      250,
         width:     125,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      633,
         width:     300,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 2.......................................................
               
      {  left:      850,
         width:     330,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1230,
         width:     325,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      1400,
         width:     180,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 3.......................................................
               
      {  left:      1625,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1800,
         width:     250,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
         pulsate:   false
      },

      {  left:      2000,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      2100,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     3,
      },


      // Screen 4.......................................................

      {  left:      2269,
         width:     200,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
      },

      {  left:      2500,
         width:     200,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
      },

      // Screen 5.......................................................

      {  left:      2800,
         width:     200,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
      },

      {  left:      3100,
         width:     200,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
      },

      {  left:      3700,
         width:     1000,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
      },

      {  left:      3700,
         width:     700,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
      },

      {  left:      3400,
         width:     1000,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     3,
      },
   ];

   this.gearData = [ //These are the locations of the gears on the game map
      { left: 296,  
         top: this.TRACK_1_BASELINE - 7.7*this.GEAR_CELLS_HEIGHT }, //Could manipulating the "top" property over time create a bouncing effect? -Abby

      { left: 880,  
         top: this.TRACK_2_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },

      { left: 1500, 
         top: this.TRACK_2_BASELINE - 4.7*this.GEAR_CELLS_HEIGHT }, 

      { left: 1475, 
         top: this.TRACK_1_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },

      { left: 2400, 
         top: this.TRACK_1_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },

      { left: 4370, 
         top: this.TRACK_3_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },

      { left: 3700, 
         top: this.TRACK_2_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },

      { left: 3188, 
         top: this.TRACK_2_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },

      { left: 3700, 
         top: this.TRACK_1_BASELINE - 1.5*this.GEAR_CELLS_HEIGHT },
   ];

   this.mushroomData = [
      { left: 800, 
         top: this.TRACK_2_BASELINE - -1.5*this.MUSHROOM_CELLS_HEIGHT },
      
      { left: 400, 
         top: this.TRACK_2_BASELINE - -1.5*this.MUSHROOM_CELLS_HEIGHT },
      
      { left: 10, 
         top: this.TRACK_1_BASELINE - 1.0*this.MUSHROOM_CELLS_HEIGHT },

      { left: 2125, 
         top: this.TRACK_1_BASELINE - 6.0*this.MUSHROOM_CELLS_HEIGHT },
   
      { left: 3525, 
         top: this.TRACK_1_BASELINE - 6.0*this.MUSHROOM_CELLS_HEIGHT },
      { left: 3725, 
         top: this.TRACK_1_BASELINE - 6.0*this.MUSHROOM_CELLS_HEIGHT },
      { left: 3925, 
         top: this.TRACK_1_BASELINE - 6.0*this.MUSHROOM_CELLS_HEIGHT },
      { left: 4125, 
         top: this.TRACK_1_BASELINE - 6.0*this.MUSHROOM_CELLS_HEIGHT },
   ];

   this.bushData = [
      { left: 330, 
          top: this.TRACK_1_BASELINE - 4.7*this.BUSH_CELLS_HEIGHT },

      { left: 250, 
          top: this.TRACK_1_BASELINE - 4.7*this.BUSH_CELLS_HEIGHT },

      { left: 1240, 
          top: this.TRACK_2_BASELINE - 2.7*this.BUSH_CELLS_HEIGHT },
      { left: 1990, 
          top: this.TRACK_1_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 1810, 
          top: this.TRACK_1_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2810, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2830, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2850, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2870, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2890, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2910, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2930, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 2950, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
      { left: 4325, 
         top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
         { left: 4125, 
            top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
            { left: 3925, 
               top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
               { left: 3725, 
                  top: this.TRACK_2_BASELINE - 0.7*this.BUSH_CELLS_HEIGHT },
   ];

   this.treeData = [
      { left: 107, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 770, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 1475, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 1660, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 1660, 
         top: this.TRACK_1_BASELINE - 0.7*this.TREE_CELLS_HEIGHT },
      { left: 1660, 
         top: this.TRACK_2_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 1910, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_3_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_2_BASELINE - 0.3*this.TREE_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_2_BASELINE - -0.5*this.TREE_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_2_BASELINE - -1.3*this.TREE_CELLS_HEIGHT },
      { left: 2346, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
      { left: 4242, 
         top: this.TRACK_1_BASELINE - -0.1*this.TREE_CELLS_HEIGHT },
   ];

   this.dinoData = [
      { left: 235, 
         top: this.TRACK_1_BASELINE - 1.5*this.DINO_CELLS_HEIGHT },
   ];

   this.leafData = [
      { left: 1650, 
         top: this.TRACK_1_BASELINE - 3.1*this.LEAF_CELLS_HEIGHT }, 
   ];

   this.doorData = [
      { left: 4560, 
         top: this.TRACK_1_BASELINE - 0.9*this.DOOR_CELLS_HEIGHT }, 
   ];

   this.opendoorData = [
      { left: 4560, 
         top: this.TRACK_1_BASELINE - 0.9*this.OPENDOOR_CELLS_HEIGHT }, 
   ];

   this.deathpitData = [
      { left: -550, 
         top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 

         { left: 650, 
            top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 
            { left: 1750, 
               top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 
               { left: 2950, 
                  top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 
                  { left: 4150, 
                     top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 
   ];

   // Sprites...........................................................
  
   this.platforms    = [];
   this.gears        = []; //This creates the array that contains the gears
   this.mushrooms    = [];
   this.bushes       = [];
   this.trees        = [];
   this.egg1s        = [];
   this.egg2s        = [];
   this.egg3s        = [];
   this.egg4s        = [];
   this.egg5s        = [];
   this.saddinos     = [];
   this.happydinos     = [];
   this.leafs        = [];
   this.doors = [];
   this.opendoors = [];
   this.deathpits = [];

   this.sprites = []; // For convenience, contains all of the sprites  
                      // from the preceding arrays

   // Sprite artists....................................................

   this.platformArtist = {
      draw: function (sprite, context) {
         var PLATFORM_STROKE_WIDTH = 1.0,
            PLATFORM_STROKE_STYLE = 'black',
            top = snailBait.calculatePlatformTop(sprite.track);

         context.lineWidth = PLATFORM_STROKE_WIDTH;
         context.strokeStyle = PLATFORM_STROKE_STYLE;

         // Check if fillStyle is 'image' and image is loaded
         if (sprite.fillStyle === 'image' && snailBait.platformImageLoaded) {
            var pattern = context.createPattern(snailBait.platformImage, 'repeat');
            context.fillStyle = pattern;
         } 
         
         else if (sprite.fillStyle === 'image2' && snailBait.platformImageLoaded) {
            var pattern = context.createPattern(snailBait.platformImage2, 'repeat');
            context.fillStyle = pattern;
         }
         
         else {
            context.fillStyle = sprite.fillStyle;
         }

         context.strokeRect(sprite.left, top, sprite.width, sprite.height);
         context.fillRect(sprite.left, top, sprite.width, sprite.height);
      }
   };

    
   // ------------------------Sprite behaviors-------------------------

   // Running..........................................................

   this.runBehavior = {
      lastAdvanceTime: 0,
      
      execute: function (sprite, 
                         now, 
                         fps, 
                         context, 
                         lastAnimationFrameTime) {
         if (sprite.runAnimationRate === 0) {
            return;
         }
         
         if (this.lastAdvanceTime === 0) {  // skip first time
            this.lastAdvanceTime = now;
         }
         else if (now - this.lastAdvanceTime > 
                  1000 / sprite.runAnimationRate) {
            sprite.artist.advance();
            this.lastAdvanceTime = now;
         }
      }      
    };


   // Pacing on platforms...............................................

   this.paceBehavior = { //Can be used to make objects bobble? Currently breaks anything it is attached to -Abby
      setDirection: function (sprite) {
         var sRight = sprite.left + sprite.width,
             pRight = sprite.platform.left + sprite.platform.width;

         if (sprite.direction === undefined) {
            sprite.direction = snailBait.RIGHT;
         }

         if (sRight > pRight && sprite.direction === snailBait.RIGHT) {
            sprite.direction = snailBait.LEFT;
         }
         else if (sprite.left < sprite.platform.left &&
                  sprite.direction === snailBait.LEFT) {
            sprite.direction = snailBait.RIGHT;
         }
      },

      setPosition: function (sprite, now, lastAnimationFrameTime) {
         var pixelsToMove = sprite.velocityX * 
                            (now - lastAnimationFrameTime) / 1000;

         if (sprite.direction === snailBait.RIGHT) {
            sprite.left += pixelsToMove;
         }
         else {
            sprite.left -= pixelsToMove;
         }
      },

      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         this.setDirection(sprite);
         this.setPosition(sprite, now, lastAnimationFrameTime);
      }
   };

   /* this.fallBehavior = {         
      execute: function (sprite, now, fps, context, lastAnimationFrameTime) {
         if ( ! sprite.falling) {
			 sprite.runAnimationRate = snailBait.RUN_ANIMATION_RATE;
            if (! snailBait.platformUnderneath(sprite)) {
               sprite.runAnimationRate = 0;
            }
         }
      }
   }; */

      // Jump..............................................................

   this.jumpBehavior = {
      pause: function (sprite, now) {
         if (sprite.ascendTimer.isRunning()) {
            sprite.ascendTimer.pause(now);
         }
         else if (sprite.descendTimer.isRunning()) {
            sprite.descendTimer.pause(now);
         }
      },

      unpause: function (sprite, now) {
         if (sprite.ascendTimer.isRunning()) {
            sprite.ascendTimer.unpause(now);
         }         
         else if (sprite.descendTimer.isRunning()) {
            sprite.descendTimer.unpause(now);
         }
      },

      isAscending: function (sprite) {
         return sprite.ascendTimer.isRunning();
      },

      ascend: function (sprite, now) {
         var elapsed = sprite.ascendTimer.getElapsedTime(now),
             deltaY  = elapsed / (sprite.JUMP_DURATION/2) * sprite.JUMP_HEIGHT;

         sprite.top = sprite.verticalLaunchPosition - deltaY; // Moving up
      },

      isDoneAscending: function (sprite, now) {
         return sprite.ascendTimer.getElapsedTime(now) > 
                sprite.JUMP_DURATION/2;
      },

      finishAscent: function (sprite, now) {
         sprite.jumpApex = sprite.top;
         sprite.ascendTimer.stop(now);
         sprite.descendTimer.start(now);
      },

      isDescending: function (sprite) {
         return sprite.descendTimer.isRunning();
      },

      descend: function (sprite, now) {
         var elapsed = sprite.descendTimer.getElapsedTime(now),
             deltaY  = elapsed / (sprite.JUMP_DURATION/2) * sprite.JUMP_HEIGHT;

         sprite.top = sprite.jumpApex + deltaY; // Moving down
      },

      isDoneDescending: function (sprite, now) {
         return sprite.descendTimer.getElapsedTime(now) > 
                sprite.JUMP_DURATION/2;
      },

      finishDescent: function (sprite, now) {
         sprite.stopJumping();
         sprite.runAnimationRate = snailBait.RUN_ANIMATION_RATE;

         if (snailBait.platformUnderneath(sprite)) {
            sprite.top = sprite.verticalLaunchPosition;
         }
         else {
            sprite.fall(snailBait.GRAVITY_FORCE *
               (sprite.descendTimer.getElapsedTime(now)/1000) *
               snailBait.PIXELS_PER_METER);
         }
      },

      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         if ( ! sprite.jumping) {
            return;
         }

         if (this.isAscending(sprite)) {
            if ( ! this.isDoneAscending(sprite, now)) this.ascend(sprite, now);
            else                                this.finishAscent(sprite, now);
         }
         else if (this.isDescending(sprite)) {
            if ( ! this.isDoneDescending(sprite, now)) this.descend(sprite, now);
            else                                 this.finishDescent(sprite, now);
         }
      }
   };

      // Izzy's fall behavior............................................

   this.fallBehavior = {
      pause: function (sprite, now) {
         sprite.fallTimer.pause(now);
      },

      unpause: function (sprite, now) {
         sprite.fallTimer.unpause(now);
      },
      
      isOutOfPlay: function (sprite) {
         return sprite.top > snailBait.canvas.height;
      },

      setSpriteVelocity: function (sprite, now) {
         sprite.velocityY = 
            sprite.initialVelocityY + snailBait.GRAVITY_FORCE *
            (sprite.fallTimer.getElapsedTime(now)/1000) *
            snailBait.PIXELS_PER_METER;
      },

      calculateVerticalDrop: function (sprite, now, 
                                       lastAnimationFrameTime) {
         return sprite.velocityY * (now - lastAnimationFrameTime) / 1000;
      },

      willFallBelowCurrentTrack: function (sprite, dropDistance) {
         return sprite.top + sprite.height + dropDistance >
                snailBait.calculatePlatformTop(sprite.track);
      },

      fallOnPlatform: function (sprite) {
         sprite.stopFalling();
         snailBait.putSpriteOnTrack(sprite, sprite.track);
         //snailBait.playSound(snailBait.thudSound);
      },

      moveDown: function (sprite, now, lastAnimationFrameTime) {
         var dropDistance;

         this.setSpriteVelocity(sprite, now);

         dropDistance = this.calculateVerticalDrop(
                           sprite, now, lastAnimationFrameTime);

         if ( ! this.willFallBelowCurrentTrack(sprite, dropDistance)) {
            sprite.top += dropDistance; 
         }
         else { // will fall below current track
            if (snailBait.platformUnderneath(sprite)) { // collision detection
               this.fallOnPlatform(sprite);
               sprite.stopFalling();
            }
            else {
               sprite.track--;
               sprite.top += dropDistance;
            }
         }
      },         

      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         if (sprite.falling) {
            if (! this.isOutOfPlay(sprite) && !sprite.exploding) {
               this.moveDown(sprite, now, lastAnimationFrameTime);
            }
            else { // Out of play or exploding               
               sprite.stopFalling();

               if (this.isOutOfPlay(sprite)) {
                  //snailBait.playSound(snailBait.electricityFlowingSound);
                  snailBait.izzy.visible = false;
               }
            }
         }
         else { // Not falling
            if ( ! sprite.jumping && 
                 ! snailBait.platformUnderneath(sprite)) {
               sprite.fall();
            }
         }
      }
   };

   this.collideBehavior = {
      isCandidateForCollision: function (sprite, otherSprite) { //Checks if sprites are close to each other
         var s, o;
         
         if(otherSprite.type !== 'mushroom' && otherSprite.type !== 'bush'){ //Makes it so Izzy does not collide with mushrooms or bushes -Abby
         s = sprite.calculateCollisionRectangle(),
         o = otherSprite.calculateCollisionRectangle();
         
            return (o.left < s.right ||
                   o.right > s.left) &&
                sprite !== otherSprite &&
                sprite.visible && otherSprite.visible;
         }

      },

      didCollide: function (sprite, otherSprite, context) { //Checks if sprites are actually overlapping
         var o = otherSprite.calculateCollisionRectangle(),
             r = sprite.calculateCollisionRectangle();

         // Determine if any of Izzy's four corners or its
         // center lie within the other sprite's bounding box.

         context.beginPath();
         context.rect(o.left, o.top, o.right - o.left, o.bottom - o.top);

/*           if(otherSprite.type == 'platform'){ //For use while checking collisions. Comment this out when done testing -Abby
            console.log("Detected " + otherSprite.type);
         } */
         
         return context.isPointInPath(r.left,  r.top)       ||
                context.isPointInPath(r.right, r.top)       ||

                context.isPointInPath(r.centerX, r.centerY) ||

                context.isPointInPath(r.left,  r.bottom)    ||
                context.isPointInPath(r.right, r.bottom);
      },

      processAssetCollision: function (sprite){
         if (sprite.type == 'gear'){
            snailBait.gearCount++;
            snailBait.updateGearElement();
         }

         if (sprite.type == 'leaf'){
            snailBait.leafCount++;
         }

         if (sprite.type == 'egg1'||
            sprite.type == 'egg2' ||
            sprite.type == 'egg3' ||
            sprite.type == 'egg4' ||
            sprite.type == 'egg5'){
               snailBait.eggCount++;
               snailBait.updateGearElement();
            }
         
         sprite.visible = false; //Makes sprite disappear from view -Abby
         //Add code here to increase count of collected assets
      },

      proccessPlatformCollisionDuringJump: function (sprite, platform) {
         var isDescending = sprite.descendTimer.isRunning();
         
         //console.log("Platform hit while jumping");
         sprite.stopJumping();

         if(isDescending){
            snailBait.putSpriteOnTrack(sprite, platform.track);
         }
         else{
            sprite.fall();
         }
      },

      processCollision: function (sprite, otherSprite) {
         if ('gear' === otherSprite.type){
               this.processAssetCollision(otherSprite);
         }

         else if('egg1' === otherSprite.type || 
            'egg2' === otherSprite.type ||
            'egg3' === otherSprite.type ||
            'egg4' === otherSprite.type ||
            'egg5' === otherSprite.type){
               this.processAssetCollision(otherSprite);
         }
         else if ('leaf' === otherSprite.type){ //Add cases here for each collectable - Abby 
            this.processAssetCollision(otherSprite);
         }

         else if ('saddino' === otherSprite.type){ //Add cases here for each collectable - Abby
            if (snailBait.leafCount == 1){
               snailBait.gearCount++;
               snailBait.updateGearElement();;
               this.processAssetCollision(otherSprite);
            }
         }

         else if('door' === otherSprite.type && snailBait.gearCount == 10){
            this.processAssetCollision(otherSprite);
         }

         else if('opendoor' === otherSprite.type && snailBait.gearCount == 10){
            window.location.href = "RomanEraIndex.html";
         }

         else if('deathpit' === otherSprite.type){
            sprite.visible = false;
            snailBait.respawn();
         }

/*          if('platform' === otherSprite.type){
            console.log("Colliding with " + otherSprite.type);
         } */

         if(sprite.jumping && 'platform' === otherSprite.type){ //Checks if Izzy hits a platform while jumping
            this.proccessPlatformCollisionDuringJump(sprite, otherSprite);
         }
      },

      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         var otherSprite; // other than Izzy

         for (var i=0; i < snailBait.sprites.length; ++i) {
            otherSprite = snailBait.sprites[i];

/*              if (this.didCollide(sprite, otherSprite, context)) { 
                  this.processCollision(sprite, otherSprite);
               } */

              if (this.isCandidateForCollision(sprite, otherSprite)) {
               if (this.didCollide(sprite, otherSprite, context)) { 
                  this.processCollision(sprite, otherSprite);
               }
            } 
         }                 
      }      
   };
};

SnailBait.prototype = {

   updateGearElement: function () {
      this.gearElement.innerHTML = this.gearCount;
      this.eggElement.innerHTML = this.eggCount;

      if(this.gearCount >= 10){
         this.gearElement.innerHTML = "All found!";
      }

      if(this.eggCount >= 5){
         this.eggElement.innerHTML = "All found!";
      }
   },

   createSprites: function () {
      this.createPlatformSprites();
      this.createIzzySprite(); 
      this.createGearSprites(); //Creates gears
      this.createMushroomSprites();
      this.createBushSprites();
      this.createTreeSprites();
      this.createEgg1Sprite();
      this.createEgg2Sprite();
      this.createEgg3Sprite();
      this.createEgg4Sprite();
      this.createEgg5Sprite();
      this.createSadDinoSprite();
      this.createHappyDinoSprite();
      this.createLeafSprite();
      this.createDoorSprite();
      this.createOpenDoorSprite();
      this.createDeathpitSprites();

      this.initializeSprites();

      this.equipIzzy();

      // All sprites are also stored in a single array

      this.addSpritesToSpriteArray();
   },

   addSpritesToSpriteArray: function () {
      for (var i=0; i < this.happydinos.length; ++i) {
         this.sprites.push(this.happydinos[i]);
      }

      for (var i=0; i < this.saddinos.length; ++i) {
         this.sprites.push(this.saddinos[i]);
      }

      for (var i=0; i < this.platforms.length; ++i) {
         this.sprites.push(this.platforms[i]);
      }

      for (var i=0; i < this.gears.length; ++i) { //This adds the gear sprites to the master list of sprites
         this.sprites.push(this.gears[i]);
      }

      for (var i=0; i < this.mushrooms.length; ++i) {
         this.sprites.push(this.mushrooms[i]);
      }

      for (var i=0; i < this.bushes.length; ++i) {
         this.sprites.push(this.bushes[i]);
      }

      for (var i=0; i < this.trees.length; ++i) {
         this.sprites.push(this.trees[i]);
      }

      for (var i=0; i < this.egg1s.length; ++i) {
         this.sprites.push(this.egg1s[i]);
      }

      for (var i=0; i < this.egg2s.length; ++i) {
         this.sprites.push(this.egg2s[i]);
      }

      for (var i=0; i < this.egg3s.length; ++i) {
         this.sprites.push(this.egg3s[i]);
      }

      
      for (var i=0; i < this.egg4s.length; ++i) {
         this.sprites.push(this.egg4s[i]);
      }

      for (var i=0; i < this.egg5s.length; ++i) {
         this.sprites.push(this.egg5s[i]);
      }

      for (var i=0; i < this.leafs.length; ++i) {
         this.sprites.push(this.leafs[i]);
      }

      for (var i=0; i < this.opendoors.length; ++i) {
         this.sprites.push(this.opendoors[i]);
      }

      for (var i=0; i < this.doors.length; ++i) {
         this.sprites.push(this.doors[i]);
      }

      for (var i=0; i < this.deathpits.length; ++i) {
         this.sprites.push(this.deathpits[i]);
      }

      this.sprites.push(this.izzy);
   },

   positionSprites: function (sprites, spriteData) {
      var sprite;

      for (var i = 0; i < sprites.length; ++i) {
         sprite = sprites[i];

         if (spriteData[i].platformIndex) { 
            this.putSpriteOnPlatform(sprite,
               this.platforms[spriteData[i].platformIndex]);
         }
         else {
            sprite.top  = spriteData[i].top;
            sprite.left = spriteData[i].left;
         }
      }
   },

   setTimeRate: function (rate) {
      this.timeFactor = rate;

      this.timeSystem.setTransducer( function (percent) {
         return percent * snailBait.timeFactor;
      });      
   },
   
   initializeSprites: function() {
      this.positionSprites(this.gears, this.gearData); //This spawns the gear sprites in the right spots
      this.positionSprites(this.mushrooms,    this.mushroomData);
      this.positionSprites(this.bushes,    this.bushData);
      this.positionSprites(this.trees, this.treeData);
      this.positionSprites(this.egg1s, this.egg1Data);
      this.positionSprites(this.egg2s, this.egg2Data);
      this.positionSprites(this.egg3s, this.egg3Data);
      this.positionSprites(this.egg4s, this.egg4Data);
      this.positionSprites(this.egg5s, this.egg5Data);
      this.positionSprites(this.happydinos, this.dinoData);
      this.positionSprites(this.saddinos, this.dinoData);
      this.positionSprites(this.leafs, this.leafData);
      this.positionSprites(this.doors, this.doorData);
      this.positionSprites(this.opendoors, this.opendoorData);
      this.positionSprites(this.deathpits, this.deathpitData);
   },

   createMushroomSprites: function () {
      var mushroom;

      for (var i = 0; i < this.mushroomData.length; ++i) {
         mushroom = new Sprite('mushroom',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.mushroomCells));

         mushroom.width = this.MUSHROOM_CELLS_WIDTH; 
         mushroom.height = this.MUSHROOM_CELLS_HEIGHT;

         this.mushrooms.push(mushroom);
      }
   },

   createBushSprites: function () {
      var bush;

      for (var i = 0; i < this.bushData.length; ++i) {
         bush = new Sprite('bush',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.bushCells));

         bush.width = this.BUSH_CELLS_WIDTH; 
         bush.height = this.BUSH_CELLS_HEIGHT;

         this.bushes.push(bush);
      }
   },

   createTreeSprites: function () {
      var tree;

      for (var i = 0; i < this.treeData.length; ++i) {
         tree = new Sprite('tree',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.treeCells));

         tree.width = this.TREE_CELLS_WIDTH; 
         tree.height = this.TREE_CELLS_HEIGHT;

         this.trees.push(tree);
      }
   },

   createEgg1Sprite: function () {
      var egg1;
  
      for (var i = 0; i < this.egg1Data.length; ++i) {
           egg1 = new Sprite('egg1', 
                             new SpriteSheetArtist(this.spritesheet,
                                                   this.egg1Cells));
        
         egg1.width = this.EGG_CELLS_WIDTH;
         egg1.height = this.EGG_CELLS_HEIGHT;
         egg1.value = 50;

         egg1.collisionMargin = {
           left: egg1.width/8 - 2,
           top: egg1.height/4 - 5, 
           right: egg1.width/8 - 5,
           bottom: egg1.height/4,
         };

         //egg1.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

         this.egg1s.push(egg1);
      }
   },

   createEgg2Sprite: function () {
     var egg2;
 
     for (var i = 0; i < this.egg2Data.length; ++i) {
          egg2 = new Sprite('egg2', 
                            new SpriteSheetArtist(this.spritesheet,
                                                  this.egg2Cells));
       
        egg2.width = this.EGG_CELLS_WIDTH;
        egg2.height = this.EGG_CELLS_HEIGHT;
        egg2.value = 50;

        egg2.collisionMargin = {
           left: egg2.width/8 - 2,
           top: egg2.height/4 - 5, 
           right: egg2.width/8 - 2,
           bottom: egg2.height/4,
         };

        //egg2.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

        this.egg2s.push(egg2);
      }
   },

  createEgg3Sprite: function () {
     var egg3;
 
     for (var i = 0; i < this.egg3Data.length; ++i) {
          egg3 = new Sprite('egg3', 
                            new SpriteSheetArtist(this.spritesheet,
                                                  this.egg3Cells));
       
        egg3.width = this.EGG3_CELLS_WIDTH;
        egg3.height = this.EGG_CELLS_HEIGHT;
        egg3.value = 50;

        egg3.collisionMargin = {
           left: egg3.width/8 - 2,
           top: egg3.height/4 - 5, 
           right: egg3.width/8 - 2,
           bottom: egg3.height/4,
         };

        //egg3.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

        this.egg3s.push(egg3);
      }
   },

   createEgg4Sprite: function () {
      var egg4;

      for (var i = 0; i < this.egg4Data.length; ++i) {
         egg4 = new Sprite('egg4',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.egg4Cells));

         egg4.width = this.EGG4_CELLS_WIDTH; 
         egg4.height = this.EGG4_CELLS_HEIGHT;
         egg4.value = 50;

         egg4.collisionMargin = {
           left: egg4.width/8 - 8,
           top: egg4.height/4 - 10, 
           right: egg4.width/8 - 2,
           bottom: egg4.height/4,
         };

         //egg4.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

         this.egg4s.push(egg4);
      }
   },

   createEgg5Sprite: function () {
      var egg5;

      for (var i = 0; i < this.egg5Data.length; ++i) {
         egg5 = new Sprite('egg5',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.egg5Cells));

         egg5.width = this.EGG5_CELLS_WIDTH; 
         egg5.height = this.EGG5_CELLS_HEIGHT;
         egg5.value = 50;

         egg5.collisionMargin = {
           left: egg5.width/8 - 8,
           top: egg5.height/4 - 12, 
           right: egg5.width/8 - 2,
           bottom: egg5.height/4 - 12,
         };

         //egg5.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

         this.egg5s.push(egg5);
      }
   },

   createSadDinoSprite: function () {
      var dino, 
      dinoArtist = new SpriteSheetArtist(this.spritesheet, 
                               this.dinoSadCells);

      for (var i = 0; i < this.dinoData.length; ++i) {
         dino = new Sprite('saddino', 
            dinoArtist);

         dino.width = this.DINO_CELLS_WIDTH; 
         dino.height = this.DINO_CELLS_HEIGHT;

         this.saddinos.push(dino);
      }
   },

   createHappyDinoSprite: function () {
      var dino, 
      dinoArtist = new SpriteSheetArtist(this.spritesheet, 
                               this.dinoHappyCells);

      for (var i = 0; i < this.dinoData.length; ++i) {
         dino = new Sprite('happydino', 
            dinoArtist);

         dino.width = this.DINO_CELLS_WIDTH; 
         dino.height = this.DINO_CELLS_HEIGHT;

         this.happydinos.push(dino);
      }
   },

   createLeafSprite: function () {
      var leaf;

      for (var i = 0; i < this.leafData.length; ++i) {
         leaf = new Sprite('leaf',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.leafCells));

         leaf.width = this.LEAF_CELLS_WIDTH; 
         leaf.height = this.LEAF_CELLS_HEIGHT;

         leaf.collisionMargin = {
           left: leaf.width/8 - 10,
           top: leaf.height/4 - 12, 
           right: leaf.width/8 - 4,
           bottom: leaf.height/4 - 17,
         };

         //leaf.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

         this.leafs.push(leaf);
      }
   },

   createDoorSprite: function () {
      var door;

      for (var i = 0; i < this.doorData.length; ++i) {
         door = new Sprite('door',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.doorCells));

         door.width = this.DOOR_CELLS_WIDTH; 
         door.height = this.DOOR_CELLS_HEIGHT;

         this.doors.push(door);
      }
   },

   createOpenDoorSprite: function () {
      var opendoor;

      for (var i = 0; i < this.opendoorData.length; ++i) {
         opendoor = new Sprite('opendoor',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.opendoorCells));

         opendoor.width = this.OPENDOOR_CELLS_WIDTH; 
         opendoor.height = this.OPENDOOR_CELLS_HEIGHT;

         this.opendoors.push(opendoor);
      }
   },

   createDeathpitSprites: function () {
      var deathpit;

      for (var i = 0; i < this.deathpitData.length; ++i) {
         deathpit = new Sprite('deathpit',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.deathpitCells));

         deathpit.opacity = 0.5,
         deathpit.width = this.DEATHPIT_CELLS_WIDTH; 
         deathpit.height = this.DEATHPIT_CELLS_HEIGHT;

         this.deathpits.push(deathpit);

         //deathpit.showCollisionRectangle = true;
      }
   },

   createPlatformSprites: function () {
      var sprite, pd;  // Sprite, Platform data

      for (var i=0; i < this.platformData.length; ++i) {
         pd = this.platformData[i];

         sprite = new Sprite('platform', this.platformArtist);

         sprite.left = pd.left;
         sprite.width = pd.width;
         sprite.height = pd.height;
         sprite.fillStyle = pd.fillStyle;
         sprite.opacity = pd.opacity;
         sprite.track = pd.track;
         sprite.pulsate = pd.pulsate;

         sprite.top = this.calculatePlatformTop(pd.track);

         this.platforms.push(sprite);
      }
   },

   createIzzySprite: function () { //Creates Izzy
      var IZZY_LEFT = 50,
          IZZY_HEIGHT = 40,
          IZZY_STARTING_TRACK = 1, //Determines which track Izzy starts on
          STARTING_RUN_ANIMATION_RATE = 0;

       this.izzy = new Sprite('izzy',
                        new SpriteSheetArtist(this.spritesheet,
                                              this.izzyCellsRight),
           [this.runBehavior, this.jumpBehavior, this.collideBehavior, this.fallBehavior ]); 

       this.izzy.runAnimationRate = STARTING_RUN_ANIMATION_RATE;

       this.izzy.track = IZZY_STARTING_TRACK;
       this.izzy.left = IZZY_LEFT;
       this.izzy.top = this.calculatePlatformTop(this.izzy.track) -
                            IZZY_HEIGHT;
       this.izzy.width = this.IZZY_CELLS_WIDTH;
       this.izzy.height = IZZY_HEIGHT;

       this.izzy.collisionMargin = {
           left: this.izzy.width/8 - 8,
           top: IZZY_HEIGHT/4 - 5, 
           right: this.izzy.width/2 + 5,
           bottom: IZZY_HEIGHT/4 - 5,
       };

       //this.izzy.showCollisionRectangle = true; //Makes collision rectangle visible. -Abby

       this.sprites.push(this.izzy);
   },

   createGearSprites: function () { //This is the function that creates a gear and adds it to the array
      var gear,
          gearArtist = new SpriteSheetArtist(this.spritesheet,
                                                 this.gearCells);
   
      for (var i = 0; i < this.gearData.length; ++i) { //This generates the gears and fills the empty array
         gear = new Sprite('gear', 
                               gearArtist);

         //gear.behaviors = [ this.paceBehavior ]; //Trying to make gears bobble Does not yet work, but may need this later -Abby

         gear.width = this.GEAR_CELLS_WIDTH;
         gear.height = this.GEAR_CELLS_HEIGHT;
         //gear.velocityX = this.GEAR_PACE_VELOCITY; //Bobble velocity. Doesn't work yet -Abby
         gear.value = 100; //I think this was the point value in Snail Bait. This could be used to instead increase the gear count.

         gear.collisionMargin = {
           left: gear.width,
           top: gear.height/4, 
           right: gear.width,
           bottom: gear.height/4,
         };

         //gear.showCollisionRectangle = true; //Makes collision rectangle visible -Abby

         this.gears.push(gear);
      }
   },

   isSpriteInView: function(sprite) {
      return sprite.left + sprite.width > sprite.hOffset &&
             sprite.left < sprite.hOffset + this.canvas.width;
   },

   updateSprites: function (now) {
      var sprite;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         if (sprite.visible && this.isSpriteInView(sprite)) {
            sprite.update(now, 
             this.fps, 
             this.context,
             this.lastAnimationFrameTime);
         }
      }
   },

   drawSprites: function() {
      var sprite;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         if (sprite.visible && this.isSpriteInView(sprite)) {
            this.context.translate(-sprite.hOffset, 0);
            sprite.draw(this.context);
            this.context.translate(sprite.hOffset, 0);
         }
      }
   },

   draw: function (now) {
      this.setPlatformVelocity();
      this.setOffsets(now);
      this.drawBackground();
      this.updateSprites(now);
      this.drawSprites();
   },

   setPlatformVelocity: function () {
      this.platformVelocity = this.bgVelocity * 
      this.PLATFORM_VELOCITY_MULTIPLIER; 
   },

   setOffsets: function (now) {
      this.setBackgroundOffset(now);
      this.setSpriteOffsets(now);
      //this.setPlatformOffset(now);
   },

   setBackgroundOffset: function (now) {
      this.backgroundOffset +=
      this.bgVelocity * (now - this.lastAnimationFrameTime) / 1000;

      if (this.backgroundOffset < 0 || 
        this.backgroundOffset > this.BACKGROUND_WIDTH) {
         this.backgroundOffset = 0;
      }
   },

   setSpriteOffsets: function (now) {
      var sprite;
   
      // In step with platforms
      this.spriteOffset +=
         this.platformVelocity * (now - this.lastAnimationFrameTime) / 1000;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         if ('izzy' !== sprite.type) {
            sprite.hOffset = this.spriteOffset; 
         }
      }
   },

   /*

   setPlatformOffset: function (now) {
      this.platformOffset += 
      this.platformVelocity * (now - this.lastAnimationFrameTime) / 1000;

      if (this.platformOffset > 2*this.BACKGROUND_WIDTH) {
         this.turnLeft();
      }
      else if (this.platformOffset < 0) {
         this.turnRight();
      }
   },

   */

   drawBackground: function () {
      var BACKGROUND_TOP_IN_SPRITESHEET = 590;

      // Translate everything by the background offset
      this.context.translate(-this.backgroundOffset, 0);

      // 2/3 onscreen initially:
      this.context.drawImage(
         this.spritesheet, 0, BACKGROUND_TOP_IN_SPRITESHEET, 
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT,
         0, 0,
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT);

      // Initially offscreen:
      this.context.drawImage(
         this.spritesheet, 0, BACKGROUND_TOP_IN_SPRITESHEET, 
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT,
         this.BACKGROUND_WIDTH, 0,
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT);

      // Translate back to the original location
      this.context.translate(this.backgroundOffset, 0);
   },

   drawPlatform: function (data) {
      var platformTop = this.calculatePlatformTop(data.track);

      this.context.lineWidth = this.PLATFORM_STROKE_WIDTH;
      this.context.strokeStyle = this.PLATFORM_STROKE_STYLE;
      this.context.fillStyle = data.fillStyle;
      this.context.globalAlpha = data.opacity;

      this.context.strokeRect(data.left, platformTop, data.width, data.height);
      this.context.fillRect  (data.left, platformTop, data.width, data.height);
   },

   drawPlatforms: function () {
      var index;

      this.context.translate(-this.platformOffset, 0);

      for (index = 0; index < this.platformData.length; ++index) {
         this.drawPlatform(this.platformData[index]);
      }

      this.context.translate(this.platformOffset, 0);
   },

   calculateFps: function (now) {
      var fps = 1 / (now - this.lastAnimationFrameTime) * 1000 * this.timeFactor;

      if (now - this.lastFpsUpdateTime > 1000) {
         this.lastFpsUpdateTime = now;
      }
      return fps; 
   },

   putSpriteOnPlatform: function(sprite, platformSprite) {
      sprite.top  = platformSprite.top - sprite.height;
      sprite.left = platformSprite.left;
      sprite.platform = platformSprite;
   },

   putSpriteOnTrack: function(sprite, track){
      var SPACE_BETWEEN_SPRITE_AND_TRACK = 2;

      sprite.track = track;

      sprite.top = this.calculatePlatformTop(sprite.track) - sprite.height - SPACE_BETWEEN_SPRITE_AND_TRACK;
   },

   calculatePlatformTop: function (track) {
      if      (track === 1) { return this.TRACK_1_BASELINE; } // 323 pixels
      else if (track === 2) { return this.TRACK_2_BASELINE; } // 223 pixels
      else if (track === 3) { return this.TRACK_3_BASELINE; } // 123 pixels
   },

   platformUnderneath: function (sprite, track) {
      var platform,
          platformUnderneath,
          sr = sprite.calculateCollisionRectangle(), // sprite rect
          pr; // platform rectangle

      if (track === undefined) {
         track = sprite.track; // Look on sprite track only
      }

      for (var i=0; i < snailBait.platforms.length; ++i) {
         platform = snailBait.platforms[i];
         pr = platform.calculateCollisionRectangle();

         if (track === platform.track) {
            if (sr.right > pr.left  && sr.left < pr.right) {
               platformUnderneath = platform;
               break;
            }
         }
      }
      return platformUnderneath;
   },

   turnLeft: function () { //Allows movement to left
      this.bgVelocity = -this.BACKGROUND_VELOCITY;
      this.izzy.runAnimationRate = this.RUN_ANIMATION_RATE = 10;
      this.izzy.artist.cells = this.izzyCellsLeft;
   },

   turnRight: function () { //Allows movement to Right
      this.izzy.runAnimationRate = this.RUN_ANIMATION_RATE = 10;
      this.izzy.artist.cells = this.izzyCellsRight;
      this.bgVelocity = this.BACKGROUND_VELOCITY;
   },

   idleStance: function () { //Izzy Stops Running
      this.izzy.artist.cells = this.izzyCellsIdle;
      this.bgVelocity = 0;
      this.izzy.runAnimationRate = this.RUN_ANIMATION_RATE = 5;
   },

   upwardsLeap: function (){ //Upwards Movement
      this.izzy.artist.cells = this.izzyCellsJump;
   },
   
   downwardsFall: function (){
      this.izzy.artist.cells = this.izzyCellsLanding;
   },

   equipIzzyForJumping: function () {
      var INITIAL_TRACK = 1,
          IZZY_JUMP_HEIGHT = 120,
          IZZY_JUMP_DURATION = 1000;

      this.izzy.JUMP_HEIGHT   = IZZY_JUMP_HEIGHT;
      this.izzy.JUMP_DURATION = IZZY_JUMP_DURATION;

      this.izzy.jumping = false;
      this.izzy.track   = INITIAL_TRACK;

      this.izzy.ascendTimer =
         new AnimationTimer(this.izzy.JUMP_DURATION/2,
                            AnimationTimer.makeEaseOutEasingFunction(1.1));
         
      this.izzy.descendTimer =
         new AnimationTimer(this.izzy.JUMP_DURATION/2,
                            AnimationTimer.makeEaseInEasingFunction(1.1));

      this.izzy.jump = function () {
         if (this.jumping) // 'this' is Izzy
            return;

         this.jumping = true;
         this.runAnimationRate = 0; // Freeze Izzy while jumping
         this.verticalLaunchPosition = this.top;
         this.ascendTimer.start(snailBait.timeSystem.calculateGameTime());
      };

      this.izzy.stopJumping = function () {
         this.ascendTimer.stop(snailBait.timeSystem.calculateGameTime());
         this.descendTimer.stop(snailBait.timeSystem.calculateGameTime());
         this.runAnimationRate = snailBait.RUN_ANIMATION_RATE;
         this.jumping = false;
      };

/*       this.izzy.fall = function () {
         // For now...
         snailBait.izzy.track = 1;
         snailBait.izzy.top = snailBait.calculatePlatformTop(snailBait.izzy.track) -
                             snailBait.izzy.height;
      }; */
   },

   equipIzzyForFalling: function () {
      this.izzy.fallTimer = new AnimationTimer();
      this.izzy.falling   = false;

      this.izzy.fall = function (initialVelocity) {
         this.falling = true;
         this.velocityY = initialVelocity || 0;
         this.initialVelocityY = initialVelocity || 0;
         this.fallTimer.start(
            snailBait.timeSystem.calculateGameTime());
      };

      this.izzy.stopFalling = function () {
         this.falling = false;
         this.velocityY = 0;
         this.fallTimer.stop(
            snailBait.timeSystem.calculateGameTime());
      };
   },

   equipIzzy: function () {
      this.equipIzzyForJumping();
      this.equipIzzyForFalling();
      this.izzy.direction = snailBait.LEFT;
   },

   fadeInElements: function () {
      var args = arguments;

      for (var i=0; i < args.length; ++i) {
         args[i].style.display = 'block';
      }

      setTimeout( function () {
         for (var i=0; i < args.length; ++i) {
            args[i].style.opacity = snailBait.OPAQUE;
         }
      }, this.SHORT_DELAY);
   },

   fadeOutElements: function () {
      var args = arguments,
          fadeDuration = args[args.length-1]; // Last argument

          for (var i=0; i < args.length-1; ++i) {
            args[i].style.opacity = this.TRANSPARENT;
         }

         setTimeout(function() {
            for (var i=0; i < args.length-1; ++i) {
               args[i].style.display = 'none';
            }
         }, fadeDuration);
      },

   hideToast: function () {
      var TOAST_TRANSITION_DURATION = 450;

      this.fadeOutElements(this.toastElement, 
         TOAST_TRANSITION_DURATION); 
   },

   startToastTransition: function (text, duration) {
      this.toastElement.innerHTML = text;
      this.fadeInElements(this.toastElement);
   },

   revealToast: function (text, duration) {
      var DEFAULT_TOAST_DURATION = 1000;

      duration = duration || DEFAULT_TOAST_DURATION;

      this.startToastTransition(text, duration);

      setTimeout( function (e) {
         snailBait.hideToast();
      }, duration);
   },

   // Animation.........................................................

   animate: function (now) { 

      now = snailBait.timeSystem.calculateGameTime();

      if (snailBait.paused) {
         setTimeout( function () {
            requestNextAnimationFrame(snailBait.animate);
         }, snailBait.PAUSED_CHECK_INTERVAL);
      }
      else {
         snailBait.fps = snailBait.calculateFps(now); 
         snailBait.draw(now);
         snailBait.lastAnimationFrameTime = now;
         requestNextAnimationFrame(snailBait.animate);
      }
   },

   togglePaused: function () {
        var now = +new Date();

        this.paused = !this.paused;

        if (this.paused) {
            this.pauseStartTime = now;
            if (this.jumpBehavior) {
                this.jumpBehavior.pause();
            }
        }
        else {
            this.lastAnimationFrameTime += (now - this.pauseStartTime);
            if (this.jumpBehavior) {
                this.jumpBehavior.unpause();
            }
        }
    },

   // ------------------------- INITIALIZATION ----------------------------

   backgroundLoaded: function () {
      var LOADING_SCREEN_TRANSITION_DURATION = 2000;

      this.fadeOutElements(this.loadingElement, 
         LOADING_SCREEN_TRANSITION_DURATION);

      setTimeout ( function () {
         snailBait.startGame();
      }, LOADING_SCREEN_TRANSITION_DURATION);
   },

   loadingAnimationLoaded: function () {
      if (!this.gameStarted) {
         this.fadeInElements(this.loadingAnimatedGIFElement,
          this.loadingTitleElement);
      }
   },

   initializeImages: function () {
      this.spritesheet.src = 'images/itt_spritesheet_full.png';
      this.loadingAnimatedGIFElement.src = 'images/snail.gif';

      this.spritesheet.onload = function (e) {
         snailBait.backgroundLoaded();
      };

      this.loadingAnimatedGIFElement.onload = function () {
         snailBait.loadingAnimationLoaded();
      };

      this.platformImage = new Image();
      this.platformImage.src = 'images/leafPlatformcropped.png';

      this.platformImage.onload = function () {
         snailBait.platformImageLoaded = true;
      };

      this.platformImage2 = new Image();
      this.platformImage2.src = 'images/branchPlatformcropped.png';

      this.platformImage2.onload = function () {
         snailBait.platformImage2Loaded = true;
      };
   },

   dimControls: function () {
      FINAL_OPACITY = 0.5;

      snailBait.instructionsElement.style.opacity = FINAL_OPACITY;
      snailBait.soundAndMusicElement.style.opacity = FINAL_OPACITY;
   },

   revealCanvas: function () {
      this.fadeInElements(this.canvas);
   },

   revealTopChrome: function () {
      this.fadeInElements(this.gearElement, this.gearLabelElement, this.eggElement, this.eggLabelElement);
   },

   revealBottomChrome: function () {
      this.fadeInElements(this.soundAndMusicElement,
       this.instructionsElement,
       this.copyrightElement);
   },

   revealGame: function () {
      var DIM_CONTROLS_DELAY = 8000;

      this.revealCanvas();
      this.revealBottomChrome();

      setTimeout( function () {
         snailBait.dimControls();
         snailBait.revealTopChrome();
      }, DIM_CONTROLS_DELAY);
   },   

   revealInitialToast: function () {
      var INITIAL_TOAST_DELAY = 1500,
      INITIAL_TOAST_DURATION = 5000;

      setTimeout( function () {
         snailBait.revealToast('Collide with gear pieces and bonus collectables. ' +
           'Avoid bottomless pits.' + ' Give the dino a leaf for a gear.', 
           INITIAL_TOAST_DURATION);
      }, INITIAL_TOAST_DELAY);
   },

   startGame: function () {
      this.revealGame();
      this.revealInitialToast();
      this.timeSystem.start();
      this.gameStarted = true;

      requestNextAnimationFrame(this.animate);
   },

   resetRunner: function () {
      this.izzy.left      = snailBait.IZZY_LEFT;
      this.izzy.track     = 3;
      this.izzy.hOffset   = 0;
      this.izzy.visible   = true;
      this.izzy.jumping   = false;
      this.izzy.top       = this.calculatePlatformTop(3) -
                            this.izzy.height;

      this.izzy.artist.cells     = this.izzyCellsRight;
      this.izzy.artist.cellIndex = 0;
   },

   resetOffsets: function () {
      this.bgVelocity       = 0;
      this.backgroundOffset = 0;
      this.platformOffset   = 0;
      this.spriteOffset     = 0;
   },

   makeAllSpritesVisible: function () {
      for (var i=0; i < this.sprites.length; ++i) {
         this.sprites[i].visible = true; 
      }
   },

   reset: function () {
      this.resetOffsets();
      this.resetRunner();
      this.makeAllSpritesVisible();
      this.canvas.style.opacity = 1.0;
   },
  
   startLifeTransition: function (slowMotionDelay) {
      var CANVAS_TRANSITION_OPACITY = 0.05,
          SLOW_MOTION_RATE = 0.1;

      this.canvas.style.opacity = CANVAS_TRANSITION_OPACITY;
      this.playing = false;

      setTimeout( function () {
         snailBait.setTimeRate(SLOW_MOTION_RATE);
         snailBait.izzy.visible = false;
      }, slowMotionDelay);
   },

   endLifeTransition: function () {
      var TIME_RESET_DELAY = 1000,
          RUN_DELAY = 500;

      snailBait.reset();

      setTimeout( function () { // Reset the time
         snailBait.setTimeRate(1.0);

         setTimeout( function () { // Stop running
            snailBait.izzy.runAnimationRate = 0;
            snailBait.playing = true;
         }, RUN_DELAY);
      }, TIME_RESET_DELAY);
   },

   respawn: function () {
      var TRANSITION_DURATION = 3000;
      snailBait.gearCount = 0;
      snailBait.leafCount = 0;
      this.updateGearElement();

      this.startLifeTransition(snailBait.RUNNER_EXPLOSION_DURATION);

      setTimeout( function () { // After the explosion
         snailBait.endLifeTransition();
      }, TRANSITION_DURATION);
   } 
};

// Event handlers.......................................................

window.onkeydown = function (e) { //Defines key bindings
   var key = e.keyCode; //Can the backup keys be changed to WASD? -Abby

   if (key === 65 || key === 37) { // 'a' or left arrow
      snailBait.turnLeft();
      snailBait.setTimeRate(1.0);
   }
   else if (key === 68 || key === 39) { // 'd' or right arrow
      snailBait.turnRight();
      snailBait.setTimeRate(1.0);
   }
   else if (key === 80) { // 'p' pause the game 
      snailBait.togglePaused();
    }
   else if (key === 74 || key === 32 || key === 87 || key === 38) { // 'j', spacebar, 'w', or up arrow to jump
       snailBait.izzy.jump(snailBait.izzy);
       snailBait.jumpSound.currentTime = 0;
       snailBait.jumpSound.play(); 
   }

   else if (key === 69) { // 'e' to slow down time
      snailBait.setTimeRate(0.1);
   }
};

window.onkeyup = function (e){
   var key = e.keyCode;

   if (key === 65 || key === 37) { // 'a' or left arrow
      snailBait.idleStance();
   }

   else if (key === 68 || key === 39) { // 'd' or right arrow
      snailBait.idleStance();
   }

   else if (key === 69) { // 'e' to slow down time
      snailBait.setTimeRate(1.0);
   }
};

window.onblur = function (e) {  // pause if unpaused
   snailBait.windowHasFocus = false;
   
   if ( ! snailBait.paused) {
      snailBait.togglePaused();
   }
};

window.onfocus = function (e) {  // unpause if paused
   var originalFont = snailBait.toastElement.style.fontSize,
       DIGIT_DISPLAY_DURATION = 1000; // milliseconds

       snailBait.windowHasFocus = true;
       snailBait.countdownInProgress = true;

       if (snailBait.paused) {
         snailBait.toastElement.style.font = '128px fantasy'; // Large font

      if (snailBait.windowHasFocus && snailBait.countdownInProgress)
         snailBait.revealToast('3', 500); // Display 3 for 0.5 seconds

      setTimeout(function (e) {
         if (snailBait.windowHasFocus && snailBait.countdownInProgress)
            snailBait.revealToast('2', 500); // Display 2 for 0.5 seconds

         setTimeout(function (e) {
            if (snailBait.windowHasFocus && snailBait.countdownInProgress)
               snailBait.revealToast('1', 500); // Display 1 for 0.5 seconds

            setTimeout(function (e) {
               if ( snailBait.windowHasFocus && snailBait.countdownInProgress)
                  snailBait.togglePaused();

               if ( snailBait.windowHasFocus && snailBait.countdownInProgress)
                  snailBait.toastElement.style.fontSize = originalFont;

               snailBait.countdownInProgress = false;

            }, DIGIT_DISPLAY_DURATION);

         }, DIGIT_DISPLAY_DURATION);

      }, DIGIT_DISPLAY_DURATION);
   }
};

// Launch game.........................................................

var snailBait = new SnailBait();

snailBait.initializeImages();
snailBait.createSprites();

