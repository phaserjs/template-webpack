import Phaser from 'phaser';

const mirrorArr = [];
const TR = new Phaser.Geom.Line ( 120, 0, 0, 120 );
const TL = new Phaser.Geom.Line ( 0, 120, 120, 0 );

class Mirror extends Phaser.GameObjects.Container {
  constructor(scene, x, y, lineType) {
    super(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;
    let itemRotated = false;


    const box = this.scene.add.graphics( 
      { lineStyle: { width: 5, color: 0x00b2e3 } } )
      .strokeRectShape( new Phaser.Geom.Rectangle( 5, 5, 110, 110 ) );
    
    let line = this.scene.add.graphics( { lineStyle: { width: 4, color: 0xa9a9a9 } } );
    // const lineTL = (x1, y1, x2, y2) => this.scene.add.graphics( 
    //   { lineStyle: { width: 4, color: 0xa9a9a9 } } )
    //   .strokeLineShape( new Phaser.Geom.Line ( x1, y1, x2, y2 ) );

    this.setSize( 120, 120 );
    this.setInteractive();
    this.input.hitArea.x = 60;
    this.input.hitArea.y = 60;
    this.scene.input.setDraggable(this);
    this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.add( box );
    this.add( line.strokeLineShape( lineType ) );


    // const lineTL = this.scene.add.graphics( { lineStyle: { width: 4, color: 0xa9a9a9 } } );
    // const tLPoints = () => new Phaser.Geom.Line( x, y, x + 120, y + 120 );

    // const addTLLine  = () => {
    //   lineTL.strokeLineShape( tLPoints );
    //   console.log(`clicked x:${x} y:${y}`);
    // }

    // const changeAngle = () => {
    //   if(itemRotated) {
    //     line.clear();
    //     this.add( line.strokeLineShape( TR ) );
    //     console.log(itemRotated);
    //   } else {
    //     line.clear();
    //     this.add( line.strokeLineShape( TL ) );
    //     console.log(itemRotated);
    //   }
    //   itemRotated = !itemRotated;
    // }
  
  
  //this.on( 'pointerdown',  changeAngle );
  
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

      mirrorArr.push(new Mirror( this, 0, 120, TR ));
      mirrorArr.push(new Mirror( this, 120, 0, TL ));
      // const aMirror = new Mirror(this, 0, 120);
      // const bMirror = new Mirror(this, 120, 0);
      // ***  mirror tests  ***
    }

    update ()
    {
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
