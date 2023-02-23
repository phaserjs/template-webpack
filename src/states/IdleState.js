export default class IdleState
{
	constructor(player)
	{
		this.player = player
	}

	enter({maxSpeed, decelTime})
	{
		this.player.anims.play("turn");

		var speedPercent = Math.abs(this.player.body.velocity.x/maxSpeed);
		this.player.scene.tweens.killTweensOf(this.player.body.velocity);
		this.player.scene.tweens.add({
			targets: this.player.body.velocity,
			props: { x: { value: 0 } },
			duration: decelTime * speedPercent,
			ease: 'Circular.easeOut',
			repeat: 0,
			yoyo: false,
		});
	}
}