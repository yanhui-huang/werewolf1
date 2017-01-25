// define the input argument type for Game object
class Slots {
  constructor() {
    this.Citizen = 0;
    this.StrongCitizen = 0;
    this.Wolf = 0;
    this.WolfKing = 0;
    this.Witch = 0;
    this.Prophet = 0;
    this.Hunter = 0;
    this.Defender = 0;
  }
  sum(){
    var N = 0;
    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; i++){
      var key = keys[i];
      N =  N + this[key];
    }
    return N;
  }
}



//This define the game class
class Game{
  constructor(slots){
    //this properties are arrays
    this.player;
    this.wolf;
    this.god;
    // player objects
    this.witch;
    this.prophet;
    this.wolfking;
    this.hunter;
    this.defender;
    this.strongCitizen;
    this.citizen;
    this.sheriff;
    //game properties
    this.nRound = 0  // current round number
    this.nK = 0;     //the one being killed, player number, default is zero, mean no one is killed
    this.nP = 0;    // the one being poisoned
    this.nC = 0;     // the one being saved
    this.nG = 0;     // the one being guarded
    this.nG_pre = 0; // the one being guarded last night
    this.isSkip = false; // whether wolf suicide and skip the next part
    this.isPeaceNight = true;
    this.validInput = true; // result of the user input;

    // dependent properties, use get
    this.GameOver;

    //slots should be a numeric array that contain the number of each role
    var N = slots.sum();
    console.log(N + ' '+ 'players in total')
    //initialize all players as Citizen class
    this.player  = new Array(N);
    this.PisDead = new Array(N);
    for(var i=0; i < N; i++){
      this.player[i] = new Citizen();
      this.PisDead[i] = false;
    }
    //initialize citizens
    var numC = slots['Citizen'] + slots['StrongCitizen'];
    this.citizen = new Array(numC);
    console.log(numC + ' citizens created');
    //create StrongCitizen
    if (slots['StrongCitizen']){
      this.strongCitizen = new StrongCitizen();
      console.log('StrongCitizen created');
    }

    //create wolves
    var numK = slots['Wolf'] + slots['WolfKing'];
    this.create_wolf(numK);
    console.log(numK + ' wolves created');
    if (slots['WolfKing']){
      this.wolfking = new WolfKing();
      this.wolf[0] = this.wolfking;
      console.log('wolfking created');
    }
    //create gods
    var numG = N - numC - numK;
    console.log(numG + ' gods created')
    this.create_god(numG,slots);
  }
  // define load as a static method
  static load () {
    // Retrieve the object from storage
    var game = localStorage.getItem('game');
    game = JSON.parse(game);
    //console.log('retrievedObject: ', game);
    return game;
  }

  static save(game){
    // Put the object into storage
    localStorage.setItem('game', JSON.stringify(game));
  }

};

// create wolf method
Game.prototype.create_wolf = function (n) {
  this.wolf = new Array(n);
  for(var i = 0; i < n; i++){
    this.wolf[i] = new Wolf();
  }
};

Game.prototype.create_god = function(n,slots){
  this.god = new Array(n);
  var i = 0;
  if (slots['Witch']){
    this.witch = new Witch();
    this.god[i]=this.witch;i++
  };
  if (slots['Prophet']){
    this.prophet = new Prophet();
    this.god[i] = this.prophet;i++
  }
  if (slots['Hunter']){
    this.hunter = new Hunter();
    this.god[i] = this.hunter;i++;
  }
  if (slots['Defender']){
    this.defender = new Defender()
    this.god[i] = this.defender;i++;
  }
};
