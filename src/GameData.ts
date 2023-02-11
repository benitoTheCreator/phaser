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

  spritesheets: [],
  images: [  
    {name: "logo", path: "assets/images/logo.png"},
    {name: "bg", path: "assets/images/bg.png"},
    {name: "player", path: "assets/images/player.png"},
    {name: "enemy", path: "assets/images/enemy.png"}



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
