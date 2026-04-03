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
      switch (this.type) {
        case EnemyType.cactus: {
          // always idle
          break;
        }

        case EnemyType.zombie: {
          // cycle between idle and patrol state
          break;
        }

        case EnemyType.dark_knight: {
          //  cycle between idle and patrol state
          break;
        }

        default: {
          // do nothing
        }
      }
    }

    if (
      distanceFromPlayer > this.attackRange &&
      distanceFromPlayer < this.chaseRange
    ) {
      // chase the player

      switch (this.type) {
        case EnemyType.cactus: {
          // always idle (no chase)
          break;
        }

        case EnemyType.zombie: {
          // chase
          break;
        }

        case EnemyType.dark_knight: {
          // chase
          break;
        }

        default: {
          // do nothing
        }
      }
    }

    if (distanceFromPlayer < this.attackRange) {
      // attack the player
      switch (this.type) {
        case EnemyType.cactus: {
          // always idle (no chase)
          break;
        }

        case EnemyType.zombie: {
          // chase
          break;
        }

        case EnemyType.dark_knight: {
          // chase
          break;
        }

        default: {
          // do nothing
        }
      }
    }
  }
}
