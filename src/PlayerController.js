import IdleState from './states/IdleState'
import MoveLeftState from './states/MoveLeftState'
import MoveRightState from './states/MoveRightState'

export default class PlayerController
{
    constructor(player)
    {
        this.states = {
            idle: new IdleState(player),
            moveLeft: new MoveLeftState(player),
            moveRight: new MoveRightState(player),
        }

        this.mvmt = {
            accelTime: 300, // seconds to max speed
            decelTime: 200, // seconds to stop from max speed
            maxSpeed: 600,
        }
    }

	setState(name)
    {
        if (this.currentState === this.states[name])
        {
            return
        }

        this.currentState = this.states[name]
        this.currentState.enter(this.mvmt)
    }
}