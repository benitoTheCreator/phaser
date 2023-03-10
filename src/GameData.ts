export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: false,
  },

  // preloader: {
  //   bgColor: "",
  //   image: "phaser",
  //   imageX: 512,
  //   imageY: 300,
  //   loadingText: "",
  // },

  spritesheets: [
    {
      name: "player-sheet",
      path: "assets/images/player_sheet.png",
      width: 16,
      height: 16,
      frames: 44
    },
    {
      name: "players",
      path: "assets/images/players.png",
      width: 52,
      height: 70,
      frames: 84
    },
    {
      name: "primitiveMan",
      path: "assets/images/past/npc/primitiveMan(18x18)_sheet.png",
      width: 18,
      height: 18,
      frames: 44
    },
    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 12
    },
    {
      name: "enemy",
      path: "assets/images/future/enemy(16x16)_sheet.png",
      width: 16,
      height: 16,
      frames: 44
    }, {
      name: "life",
      path: "assets/images/lifeBar_spritesheet.png",
      frames: 4,
      width: 2179,
      height: 1330
    }
  ],
  images: [  
    {name: "logo", path: "assets/images/logo.png"},
    {name: "bg1", path: "assets/images/bg1.png"},
    {name: "bg3", path: "assets/images/bg3.png"},
    {name: "vision", path: "assets/images/luceAlieno.png"},
    {name: "wall3", path: "assets/images/wall3.png"},
    {name: "black", path: "assets/images/black.jpg"},
    {name: "lights", path: "assets/images/lights.png"},
    {name: "tanica", path: "assets/images/tanica.png"}

  ],
  atlas: [],
  sounds: [
    // {
    //   name: "welcome",
    //   paths: ["assets/sounds/welcome.mp4"],
    //   volume: 0,
    //   loop: false,
    //   frame: 1,
    // },
  ],
  audio: [],
  bitmapfont: [],
};
