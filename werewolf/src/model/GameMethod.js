class GameMethod {
  constructor() {

  }
  static nextNight(game){
    game.nRound = game.nRound + 1;
    game.nK = 0;
    game.nP = 0;
    game.nC = 0;
    game.nG = 0;
    game.isSkip = false;
    game.isPeaceNight = true;
    var liveplayer = "";
    var n = game.nRound;
    }

  static check_input(n,game,str){
    if (!game.validInput){
      return;
    }
    else{
       game.validInput = true;
    }
    switch (str) {
      case 'range':
        if (!(n !== null && n<=game.player.length && n > 0)){
          alert('输入无效，请检查！');
          game.validInput = false;
        }
      break;
      case 'death':
        if (!(n !== null && (n==0||(n <= game.player.length &&
        n>=0 && !game.player[n-1].isDead)))){
          alert('该玩家已经死亡，请重新选择');
          game.validInput = false;
        }
      break;

      case 'empty':
        if (!(n !== null && n<=game.player.length && n > 0)){
          alert('输入无效，请检查！');
          game.validInput = false;
        }
        else {
          console.log(game.player[n-1].type);
          if (game.player[n-1].type !== 'Citizen'){
            alert('该号码已被另一角色占用，请重新输入');
            game.validInput = false;
            console.log('该号码已被另一角色占用，请重新输入');
            return false;
          }
          else {
            return true;
          }
        }

      default:
        if (!(n !== null && n<=game.player.length && n>0)){
          alert('输入无效，请检查！');
          game.validInput = false;
        }
      }
    }

  static getLivingPlayer(game){
    var text = '场上还活着的人有: ';
    for (var i=0;i<game.player.length;i++){
      var isDead = game.player[i].isDead;
      if (!isDead){
        text += (i+1) + '号'+
        game.player[i].type + '， ';
      }
    }
    //text += '号'
    return text;
  }

  static assign_citizenID(game){
    var n = 0;
    for (var i=0;i<game.player.length;i++){
      if(game.player[i].type == 'Citizen'||
      'StrongCitizen'){
        game.citizen[n] = game.player[i];
        n++;
      }
    }
  }

  static getResults(game){
    // calculate game results after one round;
    if (game.nK > 0){
      var n = game.nK;
      var player = game.player[n-1];
      player.isKilled = true;
      player.life -= 1;
      console.log(n+' is killed');
    }

    if (game.nP > 0){
      var n = game.nP;
      var player = game.player[n-1];
      player.isPoisoned = true;
      game.witch.poisonCount -= 1;
      console.log('poison used');
    }

    if (game.nC > 0){
      var n = game.nC;
      var player = game.player[n-1];
      player.isSaved = true;
      game.witch.cureCount -= 1;
      console.log('cure used');
    }

    if (game.nG > 0){
      var n = game.nG;
      var player = game.player[n-1];
      player.isGuarded = true;
    }
    Game.save(game);
  }

  static announceResults(game){
    var TEXT = "";
    game.isPeaceNight = true;
    for(var i = 0;i<game.player.length;i++){
      var isDead = GameMethod.isDead(game.player[i]);
      console.log(isDead);
      console.log(i);
      if (isDead && !game.player[i].isDead){
        TEXT += '昨天晚上死的是'+ (i+1) + '号; <br>';
        console.log(TEXT);
        //game.PisDead[i] = true;
        game.player[i].isDead = true;
        game.isPeaceNight = false;
        if (game.player[i].type == "Hunter"){
          if (game.hunter.isPoisoned){
            var addText = '（猎人死亡，不能发动技能）\n,';
          }
          else{
            var addText = '（猎人死亡，可以发动技能）\n,';
          }
          TEXT += addText;
        }
      }
      else if(!game.player[i].isDead){
        // reinitialize player properties in new round
        GameMethod.reInit(game.player[i]);
      }
    }

      if (game.isPeaceNight){
        TEXT += '昨晚是平安夜';
      }
      else if (game.nRound == 1){
        TEXT += '第一晚死亡的玩家有遗言';
      }

      Game.save(game);
      return TEXT;
  }

  static isDead(player){
      if (player.isPoisoned || player.isV2Die || player.isSuicide){
        return true;
      }
      else if (player.isKilled && player.isGuarded && player.isSaved){
        return true;
      }
      else if (player.isKilled && !player.isGuarded && !player.isSaved){
        if (player.life < 1){
          return true;
        }
      }
      else if (player.isKilled && (player.isGuarded || player.isSaved)){
        return false;
        player.life = player.life + 1;
      }
  }

  static reInit(player){
    player.isKilled = false;
    player.isGuarded = false;
    player.isSaved = false;
    player.isPoisoned = false;
  }

}
