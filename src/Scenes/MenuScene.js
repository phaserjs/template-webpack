

class MenuScene extends Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 700,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
        
    }
}

export default MenuScene