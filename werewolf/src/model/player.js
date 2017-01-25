class Player {
  constructor() {
    this.isKilled    = false; //被狼人杀死
    this.isGuarded   = false; //被守卫
    this.isSaved     = false; //被女巫救
    this.isPoisoned  = false; //被女巫毒死
    this.isV2Die     = false; //被投死
    this.isSuicide   = false; //自杀
    this.life        = 1;
    this.type        = "";
    this.isDead      = false;
  }
}



//sub classes
class Wolf extends Player {
  constructor() {
    super(); // need to be called before use "this"
    this.type = "Wolf";
  }
}

class WolfKing extends Wolf {
  constructor() {
    super();
    this.type = 'WolfKing';
  }
}

class Citizen extends Player {
  constructor() {
  super();
  this.type = 'Citizen';
  }
}

class StrongCitizen extends Citizen {
  constructor() {
    super();
    this.type = 'StrongCitizen';
    this.life = 2;
  }
}

class Prophet extends Player {
  constructor() {
    super();
    this.type = 'Prophet';
  }
}

class Witch extends Player {
  constructor() {
    super();
    this.type = 'Witch';
    this.cureCount = 1;
    this.poisonCount = 1;
  }
}

class Hunter extends Player {
  constructor() {
    super();
    this.type = 'Hunter';
  }
}

class Defender extends Player {
  constructor() {
    super();
    this.type = 'Defender';
  }
}
