interface AttackStrategy {
  attack(): void;
}

class MeleeAttack implements AttackStrategy {
  attack() {
    console.log("Melee attack");
  }
}

class SwordAttack implements AttackStrategy {
  attack() {
    console.log("Sword attack");
  }
}

class RangedAttack implements AttackStrategy {
  attack() {
    console.log("Ranged attack");
  }
}

enum EnemyType {
  cactus,
  zombie,
  dark_knight,
}

class EnemyAI {
  type: EnemyType;
  chaseRange: number;
  attackRange: number;
  attackStrategy: AttackStrategy;

  constructor() {
    switch (this.type) {
      case EnemyType.cactus: {
        this.attackStrategy = new MeleeAttack();
        break;
      }
      case EnemyType.zombie: {
        this.attackStrategy = new MeleeAttack();
        break;
      }

      case EnemyType.dark_knight: {
        this.attackStrategy = new SwordAttack();
        break;
      }

      default: {
        this.attackStrategy = new MeleeAttack();
        break;
      }
    }
  }

  setAttackStrategy(attackStrategy: AttackStrategy) {
    this.attackStrategy = attackStrategy;
  }

  attack() {
    this.attackStrategy.attack();
  }
}
