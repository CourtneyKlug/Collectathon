var SnailBait = function () {
    this.canvas = document.getElementById('game-canvas'),
    this.context = this.canvas.getContext('2d'),
    this.fpsElement = document.getElementById('fps'),

    // Time..............................................................

    this.timeSystem = new TimeSystem(); // See js/timeSystem.js

    this.timeRate = 1.0; // 1.0 is normal speed, 0.5 is 1/2 speed, etc.
   
    this.SHORT_DELAY = 50; // milliseconds
    this.TIME_RATE_DURING_TRANSITIONS = 0.2; // percent

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

    // Background width and height.........................................

    this.BACKGROUND_WIDTH = 855;
    this.BACKGROUND_HEIGHT = 325;

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

    // Time..............................................................
   
    this.lastAnimationFrameTime = 0,
    this.lastFpsUpdateTime = 0,
    this.fps = 60,

    // Fps...............................................................

    this.fpsElement = document.getElementById('fps'),

    // Toast.............................................................

    this.toastElement = document.getElementById('toast'),

    // Instructions......................................................

    this.instructionsElement = document.getElementById('instructions');

    // Copyright.........................................................

    this.copyrightElement = document.getElementById('copyright');

    // Score.............................................................

    this.scoreElement = document.getElementById('score'),

    // Sound and music...................................................

    this.soundAndMusicElement = document.getElementById('sound-and-music');
   
    // Translation offsets...............................................
   
    this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET,
    this.spriteOffset = this.STARTING_SPRITE_OFFSET;
    this.jumpBehavior = new JumpBehavior();
   
    //this.platformOffset = this.STARTING_PLATFORM_OFFSET,

    // Velocities........................................................

    this.bgVelocity = this.STARTING_BACKGROUND_VELOCITY,
    this.platformVelocity,

    // Sprite sheet cells................................................
    // All measurements are in pixels

    this.IZZY_CELLS_WIDTH = 55;
    this.IZZY_CELLS_HEIGHT = 40;

    this.FRUIT_CELL_HEIGHT = 20;
    this.FRUIT_CELLS_TOP = 5675;
    this.BANANA_CELL_WIDTH = 23;
    this.GRAPE_CELL_WIDTH = 22;
    this.ORANGE_CELL_WIDTH = 18;
    this.PEAR_CELL_WIDTH = 17;
    this.WATERMELON_CELL_WIDTH = 25;

    this.GEAR_CELL_HEIGHT = 35;
    this.GEAR_CELL_WIDTH = 35;

    this.SHOPSTAND_CELL_HEIGHT = 45;
    this.SHOPSTAND_CELL_WIDTH = 65;

    this.BLUEHOUSE_CELL_HEIGHT = 86;
    this.BLUEHOUSE_CELL_WIDTH = 135;

    this.BROWNHOUSE_CELL_HEIGHT = 80;
    this.BROWNHOUSE_CELL_WIDTH = 135;

    this.izzyCellsRight = [
        { left: 527, top: 5139,
            width: 58, height: this.IZZY_CELLS_HEIGHT },

        { left: 483, top: 5139,
            width: 51, height: this.IZZY_CELLS_HEIGHT },

        { left: 432, top: 5139,
            width: 50, height: this.IZZY_CELLS_HEIGHT },

        { left: 384, top: 5139,
            width: 52, height: this.IZZY_CELLS_HEIGHT },

        { left: 333, top: 5139,
            width: 59, height: this.IZZY_CELLS_HEIGHT },
    ];
    
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
    ];

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
    ];

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
    ];

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
    ];

    this.bananaCell = [
        {left: 0, top: this.FRUIT_CELLS_TOP,
            width: this.BANANA_CELL_WIDTH, height: this.FRUIT_CELL_HEIGHT}
    ];

    this.grapeCell = [
        {left: 0, top: this.FRUIT_CELLS_TOP,
            width: this.GRAPE_CELL_WIDTH, height: this.FRUIT_CELL_HEIGHT}
    ];

    this.orangeCell = [
        {left: 0, top: this.FRUIT_CELLS_TOP,
            width: this.ORANGE_CELL_WIDTH, height: this.FRUIT_CELL_HEIGHT}
    ];

    this.pearCell = [
        {left: 0, top: this.FRUIT_CELLS_TOP,
            width: this.PEAR_CELL_WIDTH, height: this.FRUIT_CELL_HEIGHT}
    ];

    this.watermelonCell = [
        {left: 0, top: this.FRUIT_CELLS_TOP,
            width: this.WATERMELON_CELL_WIDTH, height: this.FRUIT_CELL_HEIGHT}
    ];

    this.gearCells = [
        {left: 30, top: 0, width: this.GEAR_CELL_WIDTH, height: this.GEAR_CELL_HEIGHT}
    ];

    this.shopStandCells = [
        {left: 60, top: 5540, width: this.SHOPSTAND_CELL_WIDTH, height: this.SHOPSTAND_CELL_HEIGHT}
    ];

    this.blueHouseCells = [
        {left: 125, top: 5540, width: this.BLUEHOUSE_CELL_WIDTH, height: this.BLUEHOUSE_CELL_HEIGHT}
    ];

    this.brownHouseCells = [
        {left: 385, top: 5540, width: this.BROWNHOUSE_CELL_WIDTH, height: this.BROWNHOUSE_CELL_HEIGHT}
    ];

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
            width:     525,
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


    this.platforms    = [];
    this.gears        = [];
    this.banana = [];
    this.grape = [];
    this.orange = [];
    this.pear = [];
    this.watermelon = [];

    this.sprites = [];

}