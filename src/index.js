import Phaser from 'phaser';

class Mirror extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;
    //this.rotated = false;
    const that = this;

    const box = this.scene.add.graphics( 
      { lineStyle: { width: 5, color: 0x00b2e3 } } )
      .strokeRectShape( new Phaser.Geom.Rectangle( 5, 5, 110, 110 ) );

    const lineTR = this.scene.add.graphics( 
      { lineStyle: { width: 4, color: 0xa9a9a9 } } )
      .strokeLineShape( new Phaser.Geom.Line ( 120, 0, 0, 120 ) );

    const lineTL = () => this.scene.add.graphics( 
      { lineStyle: { width: 4, color: 0xa9a9a9 } } )
      .strokeLineShape( new Phaser.Geom.Line ( 120, 0, 0, 120 ) );

    this.setSize(120, 120);
    this.setInteractive();
    this.input.hitArea.x = 60;
    this.input.hitArea.y = 60;
    this.add(box);
    this.add(lineTR);

    const changeAngle  = () => { 
      lineTR.clear();
      lineTL();
      console.log(`clicked x:${x} y:${y}`)
    }


    this.on( 'pointerdown',  changeAngle );

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

      const aMirror = new Mirror(this, 0, 120);
      const bMirror = new Mirror(this, 120, 0);
      // ***  mirror tests  ***
      // const boxLine = this.add.graphics( { lineStyle: { width: 5, color: 0x00b2e3 } } );
      // const lineLine = this.add.graphics( { lineStyle: { width: 4, color: 0xa9a9a9 } } );
      // const box = new Phaser.Geom.Rectangle ( 5, 5, 110, 110 );
      // const line = new Phaser.Geom.Line ( 120, 0, 0, 120 );
      // boxLine.strokeRectShape(box);
      // lineLine.strokeLineShape(line);
      // const thisMirror = this.add.container(240, 0, [ boxLine, lineLine ]);
      // thisMirror.setSize(120, 120);
      // thisMirror.setInteractive();
      // ***  end mirror tests ***




      // const laserLine = this.add.graphics( { lineStyle: { width: 4, color: 0xaa00aa } } );
      // const mirrorLine = this.add.graphics( { lineStyle: { width: 4, color: 0xa9a9a9 } } );
      // const line1 = new Phaser.Geom.Line ( 60, 60, 600, 60 );
      // const line2 = new Phaser.Geom.Line ( 240, 0, 360, 120 );
      // laserLine.strokeLineShape(line1);
      // mirrorLine.strokeLineShape(line2);
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
