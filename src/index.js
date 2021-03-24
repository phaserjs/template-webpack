import Phaser from 'phaser';

const mirrorArr = [];

let graphics;
let laserOrigin;
let reflectedLaser;
let thisReflector;
let reflectAngle;
let aMirror;

class Mirror extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;

    const box = this.scene.add.graphics( 
      { lineStyle: { width: 5, color: 0x00b2e3 } } )
      .strokeRectShape( new Phaser.Geom.Rectangle( 8, 8, 104, 104 ) );

    // const rotateDamnit = (pointer) => {
    //   if( pointer.rightButtonDown() ) {
    //     this.angle += 45;
    //     console.log("clicked")}};
    
    this.line = this.scene.add.graphics( { lineStyle: { width: 4, color: 0xa9a9a9 } } );

    this.setSize( 120, 120 );
    this.setInteractive();
    this.input.hitArea.x = 60;
    this.input.hitArea.y = 60;
    this.scene.input.setDraggable(this);

    this.scene.input.mouse.disableContextMenu();
    // this.scene.input.on('pointerdown', rotateDamnit);
    this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.add( box );
    this.add( this.line.strokeLineShape( new Phaser.Geom.Line ( 10, 10, 110, 110 ) ) );
  
    this.scene.add.existing(this);
  }
}

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
    }
      
    create ()
    {
      //main grid
      const mainBoardGrid = this.add.grid( 300, 300, 600, 600, 120, 120, 0x000, 1, 0xFFF, 1 );

      //mirrorArr.push( new Mirror( this, 240, 0 ) );

      graphics = this.add.graphics( { linestyle: { width: 4, color: 0xaa00aa} } );

      laserOrigin = new Phaser.Geom.Line( 60, 60, 400, 60 );
      reflectedLaser = new Phaser.Geom.Line(0, 0, 0, 0);

      aMirror = new Mirror( this, 240, 0 );
    //   const bMirror = new Mirror( this, 120, 0 );
    //   const cMirror = new Mirror( this, 120, 120 );
    //   // ***  mirror tests  ***
    //   aMirror.on('pointerdown', function (pointer) {
    //     if( pointer.rightButtonDown() ) {
    //       aMirror.angle += 90;
    //       console.log("clicked")}});
    }

    update ()
    {
      thisReflector = aMirror.line;
      let reflectAngle = Phaser.Geom.Line.ReflectAngle(laserOrigin, thisReflector);
      //console.log(laserOrigin);
      //console.log(aMirror);
      
      
      graphics.clear()
      graphics.strokeLineShape(laserOrigin);

      Phaser.Geom.Line.SetToAngle(reflectedLaser, 300, 60, reflectAngle, 600);
      graphics.strokeLineShape(reflectedLaser);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
