pl.view.defenderRound = {
  setupUserInterface: function (){
    var game = Game.load();

    if (game.defender == undefined){
      window.location = 'witchRound.html';
      return;
    }

    var NextBtn = document.getElementById('btnNext');
    // get who is still living
    document.getElementById('night').innerHTML =
    '第'+game.nRound+'晚\n';


    //get defender ID in the 1st round
    if (game.nRound == 1){
      document.getElementById('showTEXT').innerHTML =
      '请输入守卫号码';
      var form = document.getElementById('frmDefenderID');
      var input = document.createElement("input");
      input.type = "number";
      input.name = "defender";
      form.appendChild(input);
      form.appendChild(document.createElement("br"));
      NextBtn.addEventListener('click',
      pl.view.defenderRound.handleAssignIDonClick);
      NextBtn.addEventListener('click',
      pl.view.defenderRound.handleGetGuardIDonClick);
    }
    else{
      for (var i=0;i<game.player.length;i++){
        if (game.player[i].type == 'Defender'){
          var defender = game.player[i];
        }
      }
      if(defender.isDead){
        var x =  document.getElementById('GuardID');
        x.placeholder = "守卫已死亡";
        x.disabled = "disabled";
      }
      else{
        NextBtn.addEventListener('click',
        pl.view.defenderRound.handleGetGuardIDonClick);
      }
    }
    NextBtn.addEventListener('click',
    pl.view.defenderRound.handleNextNightonClick);
  },

  handleAssignIDonClick: function (){
    var x = document.getElementById('frmDefenderID');
    var game = Game.load();
    var ID = Number(x.elements['defender'].value);
    if (GameMethod.check_input(ID,game,'empty')){
      game.player[ID-1] = game.defender;
    }
    Game.save(game);
    console.log('assign '+ ID + 'th player to defender');
  },

  handleGetGuardIDonClick: function(){
    var x = document.getElementById('frmGuardID');
    var game = Game.load();
    var nG = Number(x.elements[0].value);
    GameMethod.check_input(nG,game,'death');
    if (nG !== game.nG_pre || nG == 0){
      game.nG = nG;
      game.nG_pre = nG;
    }
    else{
      alert('守卫不能连续两个晚上同时守一个人');
      game.validInput = false;
    }
    Game.save(game);
    console.log(game.nG + 'is guarded');
  },

  handleNextNightonClick: function(){
    var game = Game.load();
    // check input of all fields
    if (!game.validInput){
      //reinitialize
      game.validInput = true;
      game.nG_pre = 0;
      for (var i = 0;i<game.player.length;i++){
        if (game.player[i].type == 'Defender'){
          game.player[i] = new Citizen();
        }
      }
      Game.save(game);
      return;
    }
      window.location = 'witchRound.html';
  }
}
