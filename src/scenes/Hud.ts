import Player from "../components/Player";

export default class Hud extends Phaser.Scene {

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _playerGroup: Phaser.GameObjects.Group;
  private _ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private _obstacle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() { }

  create() {
    

  }


  update(time: number, delta: number): void {
      
  }

}
