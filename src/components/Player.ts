import GamePlay from "../scenes/GamePlay";

export default class Player extends Phaser.GameObjects.Sprite {

    protected _config: genericConfig;
    protected _scene: GamePlay;
    protected _body: Phaser.Physics.Arcade.Body;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    private _ismoving: boolean = false;
    private _canMove: boolean = false;
    private _canJump: boolean = false;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._scene.add.existing(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        

        this._body.allowGravity = false;
        // this._body.setCollideWorldBounds(true);
        

        // settiamo i tasti cursore
        this._cursors = this._scene.input.keyboard.createCursorKeys();
    }
    
    
    create(){ }

    setCanMove(bool: boolean){
        this._canMove = bool;
    }

    setCanJump(bool: boolean){
        this._canJump = bool;
    }

    movement(){
        if(!this._ismoving){
            let _animation: Phaser.Types.Animations.Animation = {
                key: "player-running",
                frames: this.anims.generateFrameNumbers("player-sheet", { frames: [30,31,32,33,34,35] }),
                frameRate: 8,
                yoyo: false,
                repeat: -1
              };
            this.anims.create(_animation);
            this.play("player-running");

            this._ismoving = true;
        }
    }

    update(time: number, delta: number){
        
        //se il tasto cursore left è premuto
        if (this._cursors.left.isDown) {
            // this.x -= 10;
            this.x -= 10;
            this.movement()
        }
        //se il tasto cursore right è premuto
        else if (this._cursors.right.isDown) {
            this.x += 10;
            this.movement()
        }
        //se il tasto cursore up è premuto
        // if (this._cursors.up.isDown && this._body.touching.down) {
        //     this._body.setVelocityY(-400);
        //     this.movement()
        // }
        if (this._cursors.up.isDown) {
            this.y-=10
            this.movement()
        }
        //se il tasto cursore down è premuto
        else if (this._cursors.down.isDown) {
            
            this.movement()
            this.y+=10
        }

       
        
    }


}