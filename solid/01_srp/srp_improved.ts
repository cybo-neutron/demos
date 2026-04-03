/*
 * Enemy States
 
  idle,  // periodically it will rest 
  patrol, // after resting for some time it will do a patrolling of the surrounding
  chase, // if enemy sees the player then it will start chasing it
  attack, // attack if the player is within the attack range

*/

enum EnemyType {
  cactus,
  zombie,
  dark_knight,
}

class EnemyAI {
  type: EnemyType;
  chaseRange: number;
  attackRange: number;

  constructor({
    type,
    chaseRange,
    attackRange,
  }: {
    type: EnemyType;
    chaseRange: number;
    attackRange: number;
  }) {
    this.type = type;
    this.chaseRange = chaseRange;
    this.attackRange = attackRange;
  }

  performAction(distanceFromPlayer: number) {
    // neither in chase range nor in attack range
    if (
      distanceFromPlayer > this.chaseRange &&
      distanceFromPlayer > this.attackRange
    ) {
      // cycle between idle and patrol
      this.move();
    }

    // within chase range but outside attack range
    if (
      distanceFromPlayer > this.attackRange &&
      distanceFromPlayer < this.chaseRange
    ) {
      // chase the player
      this.chase();
    }

    // within attack range
    if (distanceFromPlayer < this.attackRange) {
      // attack the player
      this.attack();
    }
  }

  move() {}

  chase() {}

  attack() {}
}

class CactusEnemy extends EnemyAI {
  constructor() {
    super({
      type: EnemyType.cactus,
      chaseRange: 0,
      attackRange: 2,
    });
  }

  move() {
    // don't move
    console.log("don't move");
  }
  chase() {
    // don't chase
    console.log("don't chase");
  }
  attack() {
    // spike attack
    console.log("spike attack");
  }
}

class ZombieEnemy extends EnemyAI {
  constructor() {
    super({
      type: EnemyType.zombie,
      chaseRange: 5,
      attackRange: 2,
    });
  }
  move() {
    // cycle between idle and patrol state
    console.log("cycle between idle and patrol state");
  }
  chase() {
    // chase player
    console.log("chase player");
  }
  attack() {
    // hand to hand combat attack
    console.log("hand to hand combat");
  }
}

class DarkKnightEnemy extends EnemyAI {
  constructor() {
    super({
      type: EnemyType.dark_knight,
      chaseRange: 10,
      attackRange: 2,
    });
  }

  move() {
    // cycle between idle and patrol state
    console.log("cycle between idle and patrol state");
  }
  chase() {
    // chase player
    console.log("chase player");
  }
  attack() {
    // sword attack
    console.log("sword attack");
  }
}

const den = new DarkKnightEnemy();

const playerDistance = 1;

den.performAction(playerDistance);
