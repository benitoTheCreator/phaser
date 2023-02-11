import GamePlay from "../scenes/GamePlay";
import Prova from "../scenes/Prova";

export default class Player extends Phaser.GameObjects.Sprite  {

  private _config: genericConfig;
  private _scene: Prova;
  private _body: Phaser.Physics.Arcade.Body;
  private _direction: string;
  private _w: Phaser.Input.Keyboard.Key;
  private _d: Phaser.Input.Keyboard.Key;
  private _a: Phaser.Input.Keyboard.Key;
  private _s: Phaser.Input.Keyboard.Key;



  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
  
    this._config = params;
  
    this._scene = <Prova>params.scene;
 
    this._scene.physics.world.enable(this);
 
    this._body = <Phaser.Physics.Arcade.Body>this.body;

    this._scene.add.existing(this);
    this._w = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this._d = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this._a = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this._s = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this._body
      .setCollideWorldBounds(true, 0.5)
      .setImmovable(true) 
      .setMaxVelocity(250, 550);

    this.setScale(0.2);

  }

  update(time: number, delta: number) {

    if (this._a.isDown) {
      this.setFlipX(true);
      this._body.setVelocityX(-250);
      this._direction = "left";
    }
    else if (this._d.isDown) {
      this._body.setVelocityX(250);
      this._direction = "right";
    }
    else if(this._w.isDown){
      this._body.setVelocityY(-250);
      this._direction = "up";
    }
    else if(this._s.isDown){
      this._body.setVelocityY(250);
      this._direction = "down";
    } else {
     
      this._body.setVelocityX(0);
      this.anims.play('idle', true);
      this._direction = "none";
      
    }

  }
    

}
  
