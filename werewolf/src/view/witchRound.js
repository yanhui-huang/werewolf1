pl.view.witchRound = {
  setupUserInterface: function (){
    var game = Game.load();
    if(game.witch == undefined){
      window.location = 'prophetRound.html';
      return;
    }
    var NextBtn = document.getElementById('btnNext');

    // get who is still living
    var textLive = GameMethod.getLivingPlayer(game);
    document.getElementById('night').innerHTML =
    '第'+game.nRound+'晚\n' + textLive;

    //get witch ID in the 1st round
    if (game.nRound == 1){
      document.getElementById('showTEXT').innerHTML =
      '请输入女巫号码';
      var form = document.getElementById('frmWitchID');
      var input = document.createElement("input");
      input.type = "number";
      input.name = "witch";
      form.appendChild(input);
      form.appendChild(document.createElement("br"));
      NextBtn.addEventListener('click',
      pl.view.witchRound.handleAssignID);
    }
    // generate cure ID input
    var cure = document.getElementById('cure');
    var poison = document.getElementById('poison');
    var expl = document.getElementById('explain');

    if (game.nRound > 1){
      for (var i=0;i<game.player.length;i++){
        if (game.player[i].type == 'Witch'){
          var pl_witch = game.player[i];
        }
      }

      if (pl_witch.isDead){
        expl.innerHTML = '女巫已死亡，不能使用解药和毒药';
        cure.disabled = "disabled";
        poison.disabled = "disabled";
      }
    }
    // witch can only cure herself in first round
    if (game.nRound > 1 && game.nK > 0 &&
       game.player[game.nK-1].type == 'Witch'){
      expl.innerHTML = '女巫只能在第一局自救';
      cure.disabled = "disabled";
    }
    else {
      if (game.witch.cureCount > 0){
          if (game.nK>0){
            var text = '今天晚上死的人是他（'+ game.nK+'号）';
          }
          else {
            var text = '今天晚上死的人是他(没有人死）';
          }
          document.getElementById('showDead').innerHTML = text;
      }
      else{
          cure.disabled = 'disabled';
          expl.innerHTML += '解药已使用完';
      }

      // generate poison ID input

      if (game.witch.poisonCount > 0){
          poison.addEventListener('click',
          pl.view.witchRound.handleShowPoisonInput);
      }
      else{
          input.disabled = 'disabled';
          expl.innerHTML += '毒药已使用完 ';
      }
    }

    //regiser the call back function of submit button
    NextBtn.addEventListener('click',
    pl.view.witchRound.handleNextNightonClickID);
  },

  // called when submit the form
  handleAssignID: function (){
    var x = document.getElementById('frmWitchID');
    var game = Game.load();
    var ID = Number(x.elements['witch'].value);
    if (GameMethod.check_input(ID,game,'empty')){
      game.player[ID-1] = game.witch;
    }
    Game.save(game);
    console.log('assign '+ ID + 'th player to witch');
  },

  handleAssignCureID: function(){
    var game = Game.load();
    game.nC = game.nK;
    Game.save(game);
    console.log(game.nK +' player is saved by witch');
  },

  handleShowPoisonInput:function(){
    var form = document.getElementById('frmPoisonID');
    if (form.elements[0] !== undefined){
      return;
    }
    var input = document.createElement("input");
    input.type = "text";
    input.id = "PoisonID";
    input.placeholder = '输入要毒死的人的号码';
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
    var NextBtn = document.getElementById('btnNext');
    // NextBtn.addEventListener('click',
    // pl.view.witchRound.handleAssignPoisonID);
  },

  handleAssignPoisonID: function(){
    var game = Game.load();
    var x = document.getElementById('frmPoisonID');
    var ID = Number(x.elements[0].value);
    GameMethod.check_input(ID,game,'death');
    game.nP = ID;
    Game.save(game);
    console.log('player ' + ID + ' is poisoned by witch');
  },

  handleNextNightonClickID: function(){
    var cure = document.getElementById('cure');
    var poison = document.getElementById('poison');
    if (cure.checked){
      pl.view.witchRound.handleAssignCureID();
    }
    else if(poison.checked){
      pl.view.witchRound.handleAssignPoisonID();
    }

    var game = Game.load();
    if (!game.validInput){
      console.log('input error');
      game.validInput = true;
      for (var i = 0;i<game.player.length;i++){
        if (game.player[i].type == 'Witch'){
          game.player[i] = new Citizen();
        }
      }
      Game.save(game);
      return;
    }
      window.location = 'prophetRound.html';
  }

}
