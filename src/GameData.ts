export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: "100vw",
    gameHeight: "100vh",
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
  ],
  images: [  
    {name: "logo", path: "assets/images/logo.png"},
    {name: "bg", path: "assets/images/bg.png"},
    {name: "bg1", path: "assets/images/bg1.png"},
    {name: "player", path: "assets/images/player.png"},
    {name: "enemy", path: "assets/images/enemy.png"},
    {name: "macchina", path: "assets/images/macchina.jpeg"}

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
