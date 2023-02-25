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
        this.add.image(0,1340,"bg3").setOrigin(0);
        this.add.image(0,2640,"bg3").setOrigin(0);
    
    
        this._playerGroup = this.add.group({runChildUpdate: true}); //runChildUpdate chiama la funzione update su ogni elemento del gruppo  
        this._player =  new Player({scene: this, x: 350, y: 650, key: "player-sheet"}).setAlpha(1).setDepth(3);
        
        this._player.setFrame(0).setScale(5);
        this._playerGroup.add(this._player);
    
        //ground
        this._ground = this.physics.add.image(0,5000,"ground").setOrigin(0)
        this._ground.body.allowGravity = false;
        this._ground.body.setImmovable(true)
    
        
        this.physics.add.collider(this._ground, this._player, (obj1: any, obj2: any) => {
    
        }, null, this);
        
    
        //camera settings
        this._mainCamera.setBounds(0,0, this.game.canvas.width,  this.game.canvas.height * 4);
        this._mainCamera.startFollow(this._player, true, 0.05, 0.05);
        this._mainCamera.setLerp(0,1);
        
        //spawn nemici
        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                this.spawnNemici()
            },
            callbackScope: this
        })


       this.spawnPiattaforme()
      
        
      

        
    }

    spawnNemici(){

        const nemici = [
            {x: 100, y: 950},
            {x: 850, y: 1300},
            {x: 1100, y: 1600},
            {x: 350, y: 2000},
            {x: 500, y: 2500},
        ]

        nemici.forEach(nemico => {
            let enemy = new Enemy({scene: this, x: nemico.x, y: nemico.y, key: "primitiveMan"})
            
            let cono = this.physics.add.image(nemico.x + 70, nemico.y + 20, "vision").setAlpha(0.5).setScale(0.4).setSize(130, 150);
            cono.body.setImmovable()
            cono.body.allowGravity = false
            cono.rotation+=1;

            this.physics.add.collider(cono, this._player, (obj1: any, obj2: any) => {
                this.scene.restart()
            }, null, this);


            this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    enemy.setFrame(21);
                    //back and forth
                    this.tweens.add({
                        x: nemico.x + 100,
                        targets: [enemy],
                        duration: 4000,
                        repeat: -1,
                        yoyo: true,
                        ease: "Linear"        
                    })
                    this.tweens.add({
                        x: nemico.x + 170,
                        targets: cono,
                        duration: 4000,
                        repeat: -1,
                        yoyo: true,
                        ease: "Linear"        
                    })
                },
                callbackScope: this
            })
        })

    }
  

    spawnPiattaforme(){
        const piattaforme = [
            {x: 550, y: 700},
            {x: 1000, y: 1200},
            {x: 200, y: 1600},
            {x: 800, y: 1600},

        ]

        piattaforme.forEach(piattaforma => {
            let obstacle = this.physics.add.image(piattaforma.x, piattaforma.y, "wall3").setImmovable(true);
            obstacle.body.allowGravity = false;
            obstacle.setSize(26, 300);

            this.physics.add.collider(this._player, obstacle, (obj1: any, obj2: any) => {
            }, null, this);
        })
    }

    update(time: number, delta: number): void {

        
    }
  
}
  