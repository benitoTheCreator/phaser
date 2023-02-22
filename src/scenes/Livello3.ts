import Player from "../components/Player";
import Enemy from "../components/Ememy";

export default class Livello3 extends Phaser.Scene {

    private _mainCamera: Phaser.Cameras.Scene2D.Camera;
    private _player: Player;
    private _playerGroup: Phaser.GameObjects.Group;
    private _ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    private _obstacle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    private playerTouchingGround: boolean = false;


    constructor() {
      super({
        key: "Livello3",
      });
    }
  
    create() {
        
        this._mainCamera = this.cameras.main;
        this._mainCamera.setBackgroundColor(0x000000);
    
        this.add.image(0,140,"bg3").setOrigin(0);
        this.add.image(1500,140,"bg3").setOrigin(0);
    
    
        this._playerGroup = this.add.group({runChildUpdate: true}); //runChildUpdate chiama la funzione update su ogni elemento del gruppo  
        this._player =  new Player({scene: this, x: 350, y: 650, key: "player-sheet"}).setAlpha(1).setDepth(3);
        this._player.setFrame(0).setScale(5);
        this._playerGroup.add(this._player);
    
        //ground
        this._ground = this.physics.add.image(0,1100,"ground").setOrigin(0)
        this._ground.body.allowGravity = false;
        this._ground.body.setImmovable(true)
    
        
        this.physics.add.collider(this._ground, this._player, (obj1: any, obj2: any) => {
    
        }, null, this);
        
    
        //camera settings
        this._mainCamera.setBounds(0,0, this.game.canvas.width * 2,  this.game.canvas.height * 2);
        this._mainCamera.startFollow(this._player, true, 0.05, 0.05);
        this._mainCamera.setLerp(1,0);
        
        //spawn nemici
        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                this.spawnNemici()
            },
            callbackScope: this
        })


        //piattaforme
        this.spawnPiattaforme()
      
        
      

        
    }

    spawnNemici(){

        const nemici = [
            {x: 100, y: 950},
            {x: 650, y: 950},
            {x: 1100, y: 950},
            {x: 1450, y: 950},
            {x: 1950, y: 950},
        ]

        nemici.forEach(nemico => {
            let enemy = new Enemy({scene: this, x: nemico.x, y: nemico.y, key: "primitiveMan"})
            this.physics.add.collider(this._ground, enemy, (obj1: any, obj2: any) => {
    
            }, null, this);


            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    enemy.setFrame(21);
                    //back and forth
                    this.tweens.add({
                        x: nemico.x + 100,
                        targets: enemy,
                        duration: 4000,
                        repeat: -1,
                        yoyo: true,
                        ease: "Linear",
                        onUpdate: (tween: Phaser.Tweens.Tween) => {
                            console.log(tween.progress);
                        },            
                    })
                },
                callbackScope: this
            })
        })

    }
  

    spawnPiattaforme(){
        const piattaforme = [
            {x: 550, y: 900},
            {x: 1000, y: 750},
            {x: 2050, y: 900},

        ]

        piattaforme.forEach(piattaforma => {
            let obstacle = this.physics.add.image(piattaforma.x, piattaforma.y, "obstacle").setImmovable(true);
            obstacle.body.allowGravity = false;

            this.physics.add.collider(obstacle, this._player, (obj1: any, obj2: any) => {

            }, null, this);
        })
    }

    update(time: number, delta: number): void {

        //setta se il player sta a terra e quindi può saltare
        if(this._player.y > 890){ //qui ho messo questo a caso aspettando di avere un ground
            this._player.setCanJump(true);
        } else {
            this._player.setCanJump(false);
        }
    }
  
}
  