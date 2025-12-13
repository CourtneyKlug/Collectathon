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

   this.BACKGROUND_WIDTH = 550;
   this.BACKGROUND_HEIGHT = 400;

   // Pixels and meters.................................................

   this.CANVAS_WIDTH_IN_METERS = 13;  // Proportional to sprite sizes

   this.PIXELS_PER_METER = this.canvas.width / 
                           this.CANVAS_WIDTH_IN_METERS;

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
   this.fallSound = new Audio('sounds/falling.wav'),
   this.gearCollectSound = new Audio('sounds/gear_collect.mp3'),
   this.fruitCollectSound = new Audio('sounds/fruit_collect.wav'),

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
   this.fruitElement = document.getElementById('fruit-counter'),
   this.fruitLabelElement = document.getElementById('fruit-counter-label'),
   this.gearCount = 0;
   this.fruitCount = 0;


   // Runner track......................................................

   this.runnerTrack = this.STARTING_RUNNER_TRACK,
   
   // Translation offsets...............................................
   
   this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET,
   this.spriteOffset = this.STARTING_SPRITE_OFFSET;

   // Velocities........................................................

   this.bgVelocity = this.STARTING_BACKGROUND_VELOCITY,
   this.platformVelocity,

     // Sprite sheet cells................................................
     // All measurements are in pixels

   this.IZZY_CELLS_WIDTH = 55;
   this.IZZY_CELLS_HEIGHT = 40;

   this.FRUIT_CELLS_HEIGHT = 26;
   this.FRUIT_CELLS_WIDTH  = 22;

   this.GEAR_CELLS_HEIGHT = 30;
   this.GEAR_CELLS_WIDTH = 32;

   this.TAN_CRATE_CELLS_HEIGHT = 100;
   this.TAN_CRATE_CELLS_WIDTH = 100;

   this.STAND_CELLS_HEIGHT = 50;
   this.STAND_CELLS_WIDTH = 60;

   this.GRAYWALL_CELLS_HEIGHT = 30;
   this.GRAYWALL_CELLS_WIDTH = 30;

   this.BARREL_CELLS_HEIGHT = 70;
   this.BARREL_CELLS_WIDTH = 50;

   this.BACKGROUNDGRASS_CELLS_HEIGHT = 143;
   this.BACKGROUNDGRASS_CELLS_WIDTH = 577;

   this.BROWN_CRATE_CELLS_HEIGHT = 100;
   this.BROWN_CRATE_CELLS_WIDTH = 100;

   this.BRICKHOUSE_CELLS_HEIGHT = 100;
   this.BRICKHOUSE_CELLS_WIDTH = 135;

   this.BACKHOUSE_CELLS_HEIGHT = 100;
   this.BACKHOUSE_CELLS_WIDTH = 130;

   this.WOODHOUSE_CELLS_HEIGHT = 100;
   this.WOODHOUSE_CELLS_WIDTH = 130;

   this.ROOF_CELLS_HEIGHT = 100;
   this.ROOF_CELLS_WIDTH = 70;

   this.REDWALL_CELLS_HEIGHT = 100;
   this.REDWALL_CELLS_WIDTH = 80;

   this.DOOR_CELLS_HEIGHT = 80;
   this.DOOR_CELLS_WIDTH = 45;

   this.OPENDOOR_CELLS_HEIGHT = 80;
   this.OPENDOOR_CELLS_WIDTH = 45;

   this.DEATHPIT_CELLS_HEIGHT = 80;
   this.DEATHPIT_CELLS_WIDTH = 1200;


   // Sprite sheet cells................................................
    this.bananaCells = [
        { left: 2, top: 5670, width: this.FRUIT_CELLS_WIDTH, 
                             height: this.FRUIT_CELLS_HEIGHT }
    ];

    this.grapeCells = [
       { left: 22, top: 5670, width: this.FRUIT_CELLS_WIDTH, 
                             height: this.FRUIT_CELLS_HEIGHT }
    ];

    this.orangeCells = [
      { left: 44, top: 5670, width: this.FRUIT_CELLS_WIDTH, 
                             height: this.FRUIT_CELLS_HEIGHT }
    ];

    this.pearCells = [
      { left: 62,   top: 5671, width: this.FRUIT_CELLS_WIDTH,
                             height: this.FRUIT_CELLS_HEIGHT }
   ];

    this.watermelonCells = [
      { left: 81,   top: 5670, width: this.FRUIT_CELLS_WIDTH,
                              height: this.FRUIT_CELLS_HEIGHT }
   ];

   this.gearCells = [
      { left: 32,   top: 0, width: this.GEAR_CELLS_WIDTH,
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

   this.tancrateCells = [
      { left: 524, top: 5540, width: this.TAN_CRATE_CELLS_WIDTH,
                             height: this.TAN_CRATE_CELLS_HEIGHT }
   ];

   this.standCells = [
      { left: 71, top: 5542, width: this.STAND_CELLS_WIDTH,
                             height: this.STAND_CELLS_HEIGHT }
   ];

   this.graywallCells = [
      { left: 849, top: 5540, width: this.GRAYWALL_CELLS_WIDTH,
                             height: this.GRAYWALL_CELLS_HEIGHT }
   ];

   this.redwallCells = [
      { left: 880, top: 5540, width: this.REDWALL_CELLS_WIDTH,
                             height: this.REDWALL_CELLS_HEIGHT }
   ];

   this.barrelCells = [
      { left: 727, top: 5540, width: 124,
                             height: 714 }
   ];

   this.backgroundgrassCells = [
      { left: 576, top: 5397, width: this.BACKGROUNDGRASS_CELLS_WIDTH,
                             height: this.BACKGROUNDGRASS_CELLS_HEIGHT }
   ];

   this.browncrateCells = [
      { left: 626, top: 5540, width: this.BROWN_CRATE_CELLS_WIDTH,
                           height: this.BROWN_CRATE_CELLS_HEIGHT }
   ];

   this.brickhouseCells = [
      { left: 128, top: 5540, width: this.BRICKHOUSE_CELLS_WIDTH,
                           height: this.BRICKHOUSE_CELLS_HEIGHT }
   ];

   this.backhouseCells = [
      { left: 261, top: 5540, width: this.BACKHOUSE_CELLS_WIDTH,
                           height: this.BACKHOUSE_CELLS_HEIGHT }
   ];

   this.woodhouseCells = [
      { left: 391, top: 5540, width: this.WOODHOUSE_CELLS_WIDTH,
                           height: this.WOODHOUSE_CELLS_HEIGHT }
   ];

   this.roofCells = [
      { left: 1, top: 5540, width: this.ROOF_CELLS_WIDTH,
                           height: this.ROOF_CELLS_HEIGHT }
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

   this.bananaData = [
       { left: 480,  
          top: this.TRACK_2_BASELINE - this.FRUIT_CELLS_HEIGHT }, 
    ];  

    this.grapeData = [
      { left: 1920, 
         top: this.TRACK_1_BASELINE - this.FRUIT_CELLS_HEIGHT }, 
   ];  

   this.orangeData = [
      { left: 4660, 
         top: this.TRACK_1_BASELINE - this.FRUIT_CELLS_HEIGHT }, 
   ];  

   this.pearData = [
      { left: 1260,
         top: this.TRACK_3_BASELINE - 1.8*this.FRUIT_CELLS_HEIGHT },
   ];


   this.watermelonData = [
      { left: 2600,
         top: this.TRACK_3_BASELINE - -1.0*this.FRUIT_CELLS_HEIGHT },
   ];

   // Platforms.........................................................

this.platformData = [
      // Screen 1.......................................................
      {
         left:      -350,
         width:     6915,
         height:    90,
         fillStyle: 'image',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {  left:      -450,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
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

      // Screen 2.......................................................
            
      {  left:      1230,
         width:     325,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      // Screen 3.......................................................
               
      {  left:      1625,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'image2',
         opacity:   1.0,
         track:     2,
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
         fillStyle: 'image2',
         opacity:   1.0,
         track:     3,
      },


      // Screen 4.......................................................

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

   this.gearData = [
      { left: -445, 
         top: this.TRACK_2_BASELINE - 0.8*this.TAN_CRATE_CELLS_HEIGHT },

      { left: 296,  
         top: this.TRACK_1_BASELINE - 7.7*this.GEAR_CELLS_HEIGHT },

      { left: 845,  
         top: this.TRACK_2_BASELINE - 0.6*this.GEAR_CELLS_HEIGHT },

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

   this.tancrateData = [
      { left: -450, 
         top: this.TRACK_2_BASELINE - 1.0*this.TAN_CRATE_CELLS_HEIGHT },

      { left: 255, 
         top: this.TRACK_3_BASELINE - 1.0*this.TAN_CRATE_CELLS_HEIGHT },

      { left: 2125, 
         top: this.TRACK_1_BASELINE - 6.0*this.TAN_CRATE_CELLS_HEIGHT },
   
      { left: 3525, 
         top: this.TRACK_1_BASELINE - 6.0*this.TAN_CRATE_CELLS_HEIGHT },
      { left: 3725, 
         top: this.TRACK_1_BASELINE - 6.0*this.TAN_CRATE_CELLS_HEIGHT },
      { left: 3925, 
         top: this.TRACK_1_BASELINE - 6.0*this.TAN_CRATE_CELLS_HEIGHT },
      { left: 4125, 
         top: this.TRACK_1_BASELINE - 6.0*this.TAN_CRATE_CELLS_HEIGHT },
   ];

   this.standData = [
      { left: -130, 
          top: this.TRACK_1_BASELINE - 0.9*this.STAND_CELLS_HEIGHT },
   ];

   this.graywallData = [
      { left: 1660, 
         top: this.TRACK_1_BASELINE - -0.1*this.GRAYWALL_CELLS_HEIGHT },
      { left: 1660, 
         top: this.TRACK_1_BASELINE - 0.7*this.GRAYWALL_CELLS_HEIGHT },
      { left: 1660, 
         top: this.TRACK_2_BASELINE - -0.1*this.GRAYWALL_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_3_BASELINE - -0.1*this.GRAYWALL_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_2_BASELINE - 0.3*this.GRAYWALL_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_2_BASELINE - -0.5*this.GRAYWALL_CELLS_HEIGHT },
      { left: 2135, 
         top: this.TRACK_2_BASELINE - -1.3*this.GRAYWALL_CELLS_HEIGHT },
   ];

   this.redwallData = [
         { left: -30, 
            top: this.TRACK_1_BASELINE - 0.8*this.REDWALL_CELLS_HEIGHT },
            { left: 40, 
               top: this.TRACK_1_BASELINE - 0.8*this.REDWALL_CELLS_HEIGHT },
   ];

   this.barrelData = [
      { left: 800, 
         top: this.TRACK_1_BASELINE - 1.8*this.BARREL_CELLS_HEIGHT },
   ];

   this.backgroundgrassData = [
      { left: -350, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: -150, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: 50, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: 250, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: 450, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: 650, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: 1050, 
         top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
      { left: 1450, 
          top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
          { left: 1950, 
            top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
            { left: 2250, 
               top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
               { left: 2650, 
                  top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                  { left: 3180, 
                     top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                     { left: 3580, 
                        top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                        { left: 3980, 
                           top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                           { left: 4480, 
                              top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                              { left: 4980, 
                                 top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                                 { left: 5480, 
                                    top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
                                    { left: 5980, 
                                       top: this.TRACK_1_BASELINE - 0.8*this.BACKGROUNDGRASS_CELLS_HEIGHT },
   ];

   this.browncrateData = [
      { left: 1230, 
         top: this.TRACK_1_BASELINE - 3.0*this.BROWN_CRATE_CELLS_HEIGHT }, 
   ];

   this.brickhouseData = [
      { left: 2100, 
         top: this.TRACK_1_BASELINE - 1.1*this.BRICKHOUSE_CELLS_HEIGHT }, 
   ];

   this.backhouseData = [
      { left: 600, 
         top: this.TRACK_1_BASELINE - 1.0*this.BACKHOUSE_CELLS_HEIGHT }, 
   ];

   this.woodhouseData = [
      { left: 1200, 
         top: this.TRACK_1_BASELINE - 1.1*this.WOODHOUSE_CELLS_HEIGHT }, 
   ];

   this.roofData = [
      { left: 1100, 
         top: this.TRACK_1_BASELINE - 0.5*this.ROOF_CELLS_HEIGHT }, 
   ];

   this.doorData = [
      { left: 4800, 
         top: this.TRACK_1_BASELINE - 0.9*this.DOOR_CELLS_HEIGHT }, 
   ];

   this.opendoorData = [
      { left: 4800, 
         top: this.TRACK_1_BASELINE - 0.9*this.OPENDOOR_CELLS_HEIGHT }, 
   ];

   this.deathpitData = [
      { left: -950, 
         top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 
                  { left: 6250, 
                     top: this.TRACK_1_BASELINE - -0.8*this.DEATHPIT_CELLS_HEIGHT }, 
   ];

   // Sprites...........................................................
  
   this.platforms    = [];
   this.gears        = [];
   this.tancrates    = [];
   this.stands       = [];
   this.graywalls    = [];
   this.redwalls    = [];
   this.bananas      = [];
   this.grapes       = [];
   this.oranges      = [];
   this.pears        = [];
   this.watermelons  = [];
   this.barrels      = [];
   this.backgroundgrasses = [];
   this.browncrates  = [];
   this.brickhouses  = [];
   this.backhouses  = [];
   this.woodhouses  = [];
   this.roofs  = [];
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

   this.paceBehavior = {
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
         
         if(otherSprite.type !== 'stand'){ //Makes it so Izzy does not collide with tan crates or stands -Abby
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

         context.beginPath();
         context.rect(o.left, o.top, o.right - o.left, o.bottom - o.top);
         
         return context.isPointInPath(r.left,  r.top)       ||
                context.isPointInPath(r.right, r.top)       ||

                context.isPointInPath(r.centerX, r.centerY) ||

                context.isPointInPath(r.left,  r.bottom)    ||
                context.isPointInPath(r.right, r.bottom);
      },

      processAssetCollision: function (sprite){ //This points to the other sprite, not Izzy -Abby
         if (sprite.type == 'banana'||
            sprite.type == 'pear' ||
            sprite.type == 'orange' ||
            sprite.type == 'grape' ||
            sprite.type == 'watermelon'){
               snailBait.fruitCount++;
               snailBait.fruitCollectSound.currentTime = 0;
               snailBait.fruitCollectSound.play(); 
               snailBait.updateGearElement();
            }
         
         sprite.visible = false; //Makes sprite disappear from view -Abby
         //Add code here to increase count of collected assets
      },

      gearCollection: function (sprite){
         snailBait.gearCount++;
         snailBait.updateGearElement();
      },

      proccessPlatformCollisionDuringJump: function (sprite, platform) {
         var isDescending = sprite.descendTimer.isRunning();
         
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
               this.gearCollection();
               snailBait.gearCollectSound.currentTime = 0;
               snailBait.gearCollectSound.play(); 
         }

         else if('banana' === otherSprite.type || 
            'grape' === otherSprite.type ||
            'orange' === otherSprite.type ||
            'pear' === otherSprite.type ||
            'watermelon' === otherSprite.type){
               this.processAssetCollision(otherSprite);
         }

         else if('tancrate' === otherSprite.type || 'browncrate' === otherSprite.type){
               this.processAssetCollision(otherSprite);
         }

         else if('door' === otherSprite.type && snailBait.gearCount == 10){
            this.processAssetCollision(otherSprite);
         }

         else if('opendoor' === otherSprite.type && snailBait.gearCount == 10){
            snailBait.endscreen();
         }

         else if('deathpit' === otherSprite.type){
            sprite.visible = false;
            snailBait.fallSound.currentTime = 0;
            snailBait.fallSound.play(); 
            snailBait.respawn();
         }

         if(sprite.jumping && 'platform' === otherSprite.type){ //Checks if Izzy hits a platform while jumping
            this.proccessPlatformCollisionDuringJump(sprite, otherSprite);
         }
      },

      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         var otherSprite; // other than Izzy

         for (var i=0; i < snailBait.sprites.length; ++i) {
            otherSprite = snailBait.sprites[i];

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
      this.fruitElement.innerHTML = this.fruitCount;

      if(this.gearCount >= 10){
         this.gearElement.innerHTML = "All found!";
      }

      if(this.fruitCount >= 5){
         this.fruitElement.innerHTML = "All found!";
      }
   },

   createSprites: function () {
      this.createPlatformSprites();
      this.createIzzySprite(); 
      this.createGearSprites();
      this.createTanCrateSprites();
      this.createStandSprites();
      this.createGrayWallSprites();
      this.createRedWallSprites();
      this.createBananaSprite();
      this.createGrapeSprite();
      this.createOrangeSprite();
      this.createPearSprite();
      this.createWatermelonSprite();
      this.createBarrelSprites();
      this.createBackgroundGrassSprites();
      this.createBrownCrateSprites();
      this.createBrickHouseSprites();
      this.createBackHouseSprites();
      this.createWoodHouseSprites();
      this.createRoofSprites();
      this.createDoorSprite();
      this.createOpenDoorSprite();
      this.createDeathpitSprites();

      this.initializeSprites();

      this.equipIzzy();

      // All sprites are also stored in a single array

      this.addSpritesToSpriteArray();
   },

   addSpritesToSpriteArray: function () {
      for (var i=0; i < this.deathpits.length; ++i) {
         this.sprites.push(this.deathpits[i]);
      }

      for (var i=0; i < this.backgroundgrasses.length; ++i) {
         this.sprites.push(this.backgroundgrasses[i]);
      }
      
      for (var i=0; i < this.barrels.length; ++i) {
         this.sprites.push(this.barrels[i]);
      }

      for (var i=0; i < this.redwalls.length; ++i) {
         this.sprites.push(this.redwalls[i]);
      }

      for (var i=0; i < this.platforms.length; ++i) {
         this.sprites.push(this.platforms[i]);
      }

      for (var i=0; i < this.gears.length; ++i) {
         this.sprites.push(this.gears[i]);
      }

      for (var i=0; i < this.tancrates.length; ++i) {
         this.sprites.push(this.tancrates[i]);
      }

      for (var i=0; i < this.stands.length; ++i) {
         this.sprites.push(this.stands[i]);
      }

      for (var i=0; i < this.graywalls.length; ++i) {
         this.sprites.push(this.graywalls[i]);
      }

      for (var i=0; i < this.bananas.length; ++i) {
         this.sprites.push(this.bananas[i]);
      }

      for (var i=0; i < this.grapes.length; ++i) {
         this.sprites.push(this.grapes[i]);
      }

      for (var i=0; i < this.oranges.length; ++i) {
         this.sprites.push(this.oranges[i]);
      }

      
      for (var i=0; i < this.pears.length; ++i) {
         this.sprites.push(this.pears[i]);
      }

      for (var i=0; i < this.watermelons.length; ++i) {
         this.sprites.push(this.watermelons[i]);
      }

      for (var i=0; i < this.browncrates.length; ++i) {
         this.sprites.push(this.browncrates[i]);
      }

      for (var i=0; i < this.brickhouses.length; ++i) {
         this.sprites.push(this.brickhouses[i]);
      }

      for (var i=0; i < this.backhouses.length; ++i) {
         this.sprites.push(this.backhouses[i]);
      }

      for (var i=0; i < this.woodhouses.length; ++i) {
         this.sprites.push(this.woodhouses[i]);
      }

      for (var i=0; i < this.roofs.length; ++i) {
         this.sprites.push(this.roofs[i]);
      }

      for (var i=0; i < this.opendoors.length; ++i) {
         this.sprites.push(this.opendoors[i]);
      }

      for (var i=0; i < this.doors.length; ++i) {
         this.sprites.push(this.doors[i]);
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
      this.positionSprites(this.gears, this.gearData);
      this.positionSprites(this.tancrates,    this.tancrateData);
      this.positionSprites(this.stands,    this.standData);
      this.positionSprites(this.graywalls, this.graywallData);
      this.positionSprites(this.redwalls, this.redwallData);
      this.positionSprites(this.bananas, this.bananaData);
      this.positionSprites(this.grapes, this.grapeData);
      this.positionSprites(this.oranges, this.orangeData);
      this.positionSprites(this.pears, this.pearData);
      this.positionSprites(this.watermelons, this.watermelonData);
      this.positionSprites(this.barrels, this.barrelData);
      this.positionSprites(this.backgroundgrasses, this.backgroundgrassData);
      this.positionSprites(this.browncrates, this.browncrateData);
      this.positionSprites(this.brickhouses, this.brickhouseData);
      this.positionSprites(this.backhouses, this.backhouseData);
      this.positionSprites(this.woodhouses, this.woodhouseData);
      this.positionSprites(this.roofs, this.roofData);
      this.positionSprites(this.doors, this.doorData);
      this.positionSprites(this.opendoors, this.opendoorData);
      this.positionSprites(this.deathpits, this.deathpitData);
   },

   createTanCrateSprites: function () {
      var tancrate;

      for (var i = 0; i < this.tancrateData.length; ++i) {
         tancrate = new Sprite('tancrate',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.tancrateCells));

         tancrate.width = this.TAN_CRATE_CELLS_WIDTH; 
         tancrate.height = this.TAN_CRATE_CELLS_HEIGHT;

         this.tancrates.push(tancrate);
      }
   },

   createStandSprites: function () {
      var stand;

      for (var i = 0; i < this.standData.length; ++i) {
         stand = new Sprite('stand',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.standCells));

         stand.width = this.STAND_CELLS_WIDTH; 
         stand.height = this.STAND_CELLS_HEIGHT;

         this.stands.push(stand);
      }
   },

   createGrayWallSprites: function () {
      var graywall;

      for (var i = 0; i < this.graywallData.length; ++i) {
         graywall = new Sprite('graywall',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.graywallCells));

         graywall.width = this.GRAYWALL_CELLS_WIDTH; 
         graywall.height = this.GRAYWALL_CELLS_HEIGHT;

         this.graywalls.push(graywall);
      }
   },

   createRedWallSprites: function () {
      var redwall;

      for (var i = 0; i < this.redwallData.length; ++i) {
         redwall = new Sprite('redwall',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.redwallCells));

         redwall.width = this.REDWALL_CELLS_WIDTH; 
         redwall.height = this.REDWALL_CELLS_HEIGHT;

         this.redwalls.push(redwall);
      }
   },

   createBananaSprite: function () {
      var banana;
  
      for (var i = 0; i < this.bananaData.length; ++i) {
         banana = new Sprite('banana', 
                             new SpriteSheetArtist(this.spritesheet,
                                                   this.bananaCells));
        
         banana.width = this.FRUIT_CELLS_WIDTH;
         banana.height = this.FRUIT_CELLS_HEIGHT;
         banana.value = 50;

         banana.collisionMargin = {
           left: banana.width/8 - 2,
           top: banana.height/4 - 5, 
           right: banana.width/8 - 5,
           bottom: banana.height/4,
         };

         this.bananas.push(banana);
      }
   },

   createGrapeSprite: function () {
     var grape;
 
     for (var i = 0; i < this.grapeData.length; ++i) {
          grape = new Sprite('grape', 
                            new SpriteSheetArtist(this.spritesheet,
                                                  this.grapeCells));
       
        grape.width = this.FRUIT_CELLS_WIDTH;
        grape.height = this.FRUIT_CELLS_HEIGHT;
        grape.value = 50;

        grape.collisionMargin = {
           left: grape.width/8 - 2,
           top: grape.height/4 - 5, 
           right: grape.width/8 - 2,
           bottom: grape.height/4,
         };

        this.grapes.push(grape);
      }
   },

  createOrangeSprite: function () {
     var orange;
 
     for (var i = 0; i < this.orangeData.length; ++i) {
         orange = new Sprite('orange', 
                            new SpriteSheetArtist(this.spritesheet,
                                                  this.orangeCells));
       
        orange.width = this.FRUIT_CELLS_WIDTH;
        orange.height = this.FRUIT_CELLS_HEIGHT;
        orange.value = 50;

        orange.collisionMargin = {
           left: orange.width/8 - 2,
           top: orange.height/4 - 5, 
           right: orange.width/8 - 2,
           bottom: orange.height/4,
         };

        this.oranges.push(orange);
      }
   },

   createPearSprite: function () {
      var pear;

      for (var i = 0; i < this.pearData.length; ++i) {
         pear = new Sprite('pear',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.pearCells));

         pear.width = this.FRUIT_CELLS_WIDTH; 
         pear.height = this.FRUIT_CELLS_HEIGHT;
         pear.value = 50;

         pear.collisionMargin = {
           left: pear.width/8 - 8,
           top: pear.height/4 - 10, 
           right: pear.width/8 - 2,
           bottom: pear.height/4,
         };

         this.pears.push(pear);
      }
   },

   createWatermelonSprite: function () {
      var watermelon;

      for (var i = 0; i < this.watermelonData.length; ++i) {
         watermelon = new Sprite('watermelon',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.watermelonCells));

         watermelon.width = this.FRUIT_CELLS_WIDTH; 
         watermelon.height = this.FRUIT_CELLS_HEIGHT;
         watermelon.value = 50;

         watermelon.collisionMargin = {
           left: watermelon.width/8 - 8,
           top: watermelon.height/4 - 12, 
           right: watermelon.width/8 - 2,
           bottom: watermelon.height/4 - 12,
         };

         this.watermelons.push(watermelon);
      }
   },

   createBarrelSprites: function () {
      var barrel;

      for (var i = 0; i < this.barrelData.length; ++i) {
         barrel = new Sprite('barrel',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.barrelCells));

         barrel.width = this.BARREL_CELLS_WIDTH; 
         barrel.height = this.BARREL_CELLS_HEIGHT;

         this.barrels.push(barrel);
      }
   },

   createBackgroundGrassSprites: function () {
      var backgroundgrass;

      for (var i = 0; i < this.backgroundgrassData.length; ++i) {
         backgroundgrass = new Sprite('backgroundgrass',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.backgroundgrassCells));

         backgroundgrass.width = this.BACKGROUNDGRASS_CELLS_WIDTH; 
         backgroundgrass.height = this.BACKGROUNDGRASS_CELLS_HEIGHT;

         this.backgroundgrasses.push(backgroundgrass);
      }
   },

   createBrownCrateSprites: function () {
      var browncrate;

      for (var i = 0; i < this.browncrateData.length; ++i) {
         browncrate = new Sprite('browncrate',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.browncrateCells));

         browncrate.width = this.BROWN_CRATE_CELLS_WIDTH; 
         browncrate.height = this.BROWN_CRATE_CELLS_HEIGHT;

         this.browncrates.push(browncrate);
      }
   },

   createBrickHouseSprites: function () {
      var brickhouse;

      for (var i = 0; i < this.brickhouseData.length; ++i) {
         brickhouse = new Sprite('brickhouse',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.brickhouseCells));

         brickhouse.width = this.BRICKHOUSE_CELLS_WIDTH; 
         brickhouse.height = this.BRICKHOUSE_CELLS_HEIGHT;

         this.brickhouses.push(brickhouse);
      }
   },

   createBackHouseSprites: function () {
      var backhouse;

      for (var i = 0; i < this.backhouseData.length; ++i) {
         backhouse = new Sprite('backhouse',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.backhouseCells));

         backhouse.width = this.BACKHOUSE_CELLS_WIDTH; 
         backhouse.height = this.BACKHOUSE_CELLS_HEIGHT;

         this.backhouses.push(backhouse);
      }
   },

   createWoodHouseSprites: function () {
      var woodhouse;

      for (var i = 0; i < this.woodhouseData.length; ++i) {
         woodhouse = new Sprite('woodhouse',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.woodhouseCells));

         woodhouse.width = this.WOODHOUSE_CELLS_WIDTH; 
         woodhouse.height = this.WOODHOUSE_CELLS_HEIGHT;

         this.woodhouses.push(woodhouse);
      }
   },

   createRoofSprites: function () {
      var roof;

      for (var i = 0; i < this.roofData.length; ++i) {
         roof = new Sprite('roof',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.roofCells));

         roof.width = this.ROOF_CELLS_WIDTH; 
         roof.height = this.ROOF_CELLS_HEIGHT;

         this.roofs.push(roof);
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

       this.sprites.push(this.izzy);
   },

   createGearSprites: function () {
      var gear,
          gearArtist = new SpriteSheetArtist(this.spritesheet,
                                                 this.gearCells);
   
      for (var i = 0; i < this.gearData.length; ++i) {
         gear = new Sprite('gear', 
                               gearArtist);

         gear.width = this.GEAR_CELLS_WIDTH;
         gear.height = this.GEAR_CELLS_HEIGHT;
         gear.value = 1; //I think this was the point value in Snail Bait. This could be used to instead increase the gear count.

         gear.collisionMargin = {
           left: gear.width,
           top: gear.height/4, 
           right: gear.width,
           bottom: gear.height/4,
         };

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
   },

   setBackgroundOffset: function (now) {
      this.backgroundOffset +=
      this.bgVelocity * (now - this.lastAnimationFrameTime) / 1000;

      if (this.backgroundOffset < 0 || 
        this.backgroundOffset < this.BACKGROUND_WIDTH) {
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

   drawBackground: function () {
      var BACKGROUND_TOP_IN_SPRITESHEET = 5130;

      // Translate everything by the background offset
      this.context.translate(-this.backgroundOffset, 0);

      // 2/3 onscreen initially:
      this.context.drawImage(
         this.spritesheet, 0, BACKGROUND_TOP_IN_SPRITESHEET, 
         this.BACKGROUND_HEIGHT, this.BACKGROUND_HEIGHT,
         0, -120,
         this.BACKGROUND_WIDTH, this.BACKGROUND_WIDTH);

      // Initially offscreen:
      this.context.drawImage(
         this.spritesheet, 0, BACKGROUND_TOP_IN_SPRITESHEET, 
         this.BACKGROUND_HEIGHT, this.BACKGROUND_HEIGHT,
         this.BACKGROUND_WIDTH, -125,
         this.BACKGROUND_WIDTH, this.BACKGROUND_WIDTH);

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
      this.platformImage.src = 'images/romanGroundcropped.png';

      this.platformImage.onload = function () {
         snailBait.platformImageLoaded = true;
      };

      this.platformImage2 = new Image();
      this.platformImage2.src = 'images/romanWoodcropped.png';

      this.platformImage2.onload = function () {
         snailBait.platformImage2Loaded = true;
      };
   },

   dimControls: function () {
      FINAL_OPACITY = 0.5;

      snailBait.instructionsElement.style.opacity = FINAL_OPACITY;
   },

   revealCanvas: function () {
      this.fadeInElements(this.canvas);
   },

   revealTopChrome: function () {
      this.fadeInElements(this.gearElement, this.gearLabelElement, this.fruitElement, this.fruitLabelElement);
   },

   revealBottomChrome: function () {
      this.fadeInElements(
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
           'Avoid bottomless pits.' + ' Go near the crates and see what happens!', 
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
      snailBait.fruitCount = 0;
      this.updateGearElement();

      this.startLifeTransition();

      setTimeout( function () { // After the explosion
         snailBait.endLifeTransition();
      }, TRANSITION_DURATION);
   },

   endscreen: function () {
      this.startLifeTransition();
      this.revealEndToast();
   },

   revealEndToast: function () {
      END_TOAST_DURATION = 10000;

      setTimeout( function () {
         snailBait.revealToast('Izzy has made it back to the present at last! She now knows to be more careful with her time machine next time. Thank you for playing!', 
           END_TOAST_DURATION);
      });
   },
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

