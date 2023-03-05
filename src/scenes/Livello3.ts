import Player from "../components/Player";
import Enemy from "../components/Ememy";

export default class Livello3 extends Phaser.Scene {

    private _mainCamera: Phaser.Cameras.Scene2D.Camera;
    private _player: Player;
    private _playerGroup: Phaser.GameObjects.Group;
    private _ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    private _lights: Phaser.GameObjects.Light;
    private _vite: number;
    private _life: Phaser.GameObjects.Sprite;


    constructor() {
      super({
        key: "Livello3",
      });
    }
  
    create() {
        this._vite = 3;
        this._mainCamera = this.cameras.main;
        this._mainCamera.setBackgroundColor(0x000000);
    
        this.add.image(0,140,"bg3").setOrigin(0).setPipeline("Light2D");
        this.add.image(0,140,"black").setOrigin(0).setAlpha(0.6);
        this.add.image(0,740,"bg3").setOrigin(0).setPipeline("Light2D");
        this.add.image(0,708,"black").setOrigin(0).setAlpha(0.6);
        this.add.image(0,1340,"bg3").setOrigin(0).setPipeline("Light2D");
        this.add.image(0,1308,"black").setOrigin(0).setAlpha(0.6);
        this.add.image(0,2008,"bg3").setOrigin(0).setPipeline("Light2D");
        this.add.image(0,2008,"black").setOrigin(0).setAlpha(0.6);

    
    
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

        this.lights.enable();
        this.lights.setAmbientColor(0x000000);
        this._lights = this.lights.addLight(400,400,100000);


        //life
        this._life = this.add.sprite(200, 300,"life",3).setScale(0.09).setDepth(11);


        //tanica
        let tanica = this.physics.add.sprite(512, 2300, "tanica").setScale(0.05);
        tanica.body.allowGravity = false;
        tanica.setImmovable(true)

        this.physics.add.collider(tanica, this._player, (obj1: any, obj2: any) => {
            this._mainCamera.pan(tanica.x, tanica.y, 1000);
            this._mainCamera.zoomTo(3, 1000);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start("Hud")
                },
                callbackScope: this
            })
        }, null, this);
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
            let enemy = new Enemy({scene: this, x: nemico.x, y: nemico.y, key: "enemy"})
            
            let cono = this.physics.add.image(nemico.x + 180, nemico.y + 10, "vision").setAlpha(0.5).setScale(0.8).setSize(320, 200).setAngle(210);
            cono.body.setImmovable()
            cono.body.allowGravity = false
            cono.rotation+=1;

            this.physics.add.collider(cono, this._player, (obj1: any, obj2: any) => {
                if(this._vite > 0){
                    this._vite--;
                    this._player.x = 350;
                    this._player.y = 650;
                } else {
                    this.scene.start("Gameover")
                }
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
                        x: nemico.x + 260,
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

        this._lights.x = this._player.x;
        this._lights.y = this._player.y;

        if(this._vite === 2){
            this._life.destroy()
            this._life = this.add.sprite(500,300,"life",2).setScale(0.09).setDepth(11)
          }     
        else if(this._vite === 1){
            this._life.destroy()
            this._life = this.add.sprite(500,300,"life",1).setScale(0.09).setDepth(11)
        }
        else if(this._vite === 0){
            this._life.destroy()
            this._life = this.add.sprite(500,300,"life",0).setScale(0.09).setDepth(11)
        }

        this._life.y = this._player.y - 250;
    }
  
}
  