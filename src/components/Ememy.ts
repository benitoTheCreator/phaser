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

        // settiamo i tasti cursore
        this._cursors = this._scene.input.keyboard.createCursorKeys();


        
    }
    
    
    create(){ }
    update(time: number, delta: number){

        //se il tasto cursore left è premuto
        
    }


}