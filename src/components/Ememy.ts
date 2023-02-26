import GamePlay from "../scenes/GamePlay";

export default class Enemy extends Phaser.GameObjects.Sprite {

    protected _config: genericConfig;
    protected _scene: GamePlay;
    protected _body: Phaser.Physics.Arcade.Body;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._scene.add.existing(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        

        this.setScale(4);
        this.setFrame(0)
        this._body.allowGravity = false;

        // settiamo i tasti cursore
        this._cursors = this._scene.input.keyboard.createCursorKeys();


        let _animation: Phaser.Types.Animations.Animation = {
            key: "player-running",
            frames: this.anims.generateFrameNumbers("enemy", { frames: [30,31,32,33,34,35] }),
            // frames: this.anims.generateFrameNumbers("player-sheet", { frames: [36,37,38,39,40,41] }),
            frameRate: 8,
            yoyo: false,
            repeat: -1
          };
        this.anims.create(_animation);
        this.play("player-running");
    }
    
    
    create(){ }
    update(time: number, delta: number){

        //se il tasto cursore left è premuto
        
    }


}