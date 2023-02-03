const button = (scene, x, y, texture, cb) => {
    scene.add
      .image(x, y, texture)
      .setInteractive()
      .on('pointerdown', () => {
        cb()
      })
  }
  
  export default button