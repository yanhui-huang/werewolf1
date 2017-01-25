pl.view.results = {
  setupUserInterface: function(){
    var game = Game.load();
    GameMethod.assign_citizenID(game);
    GameMethod.getResults(game);

    if (game.nRound == 1){
      var intro = '天亮了，竞选警长，警长组织发言';
    }
    else{
      var intro = '天亮了，警长组织发言';
    }
    document.getElementById('intro').innerHTML = intro;

    // click to show resutls
    var btnShow = document.getElementById('btnShow');
    btnShow.addEventListener('click',
    pl.view.results.handleShowResultsonClick);

    // click if wolf suicide
    var btnSuicide = document.getElementById('btnSuicide');
    btnSuicide.addEventListener('click',
    pl.view.results.handleWolfSuicideonClick);

    // click when vote someone to die
    var btnV2Die = document.getElementById('btnV2Die');
    btnV2Die.addEventListener('click',
    pl.view.results.handleV2DieonClick);

    //click to show who is still living
    var btnRes = document.getElementById('btnRes');
    btnRes.addEventListener('click',
    pl.view.results.handleGetResonClick);

    //next night
    var btnNext = document.getElementById('btnNext');
    btnNext.addEventListener('click',
    pl.view.results.handleNextNightonClick);
  },

  //加入警长
  handleAssignSherrifonClick: function(){

  },


  //显示上一晚结果
  handleShowResultsonClick: function(){
    var game = Game.load();
    var TEXT = GameMethod.announceResults(game);
    document.getElementById('results').innerHTML = TEXT;
    if (TEXT.indexOf('可以发动技能') > -1){
      pl.view.results.showHunter();
    }
  },

  //投死一名玩家
  handleV2DieonClick:function(){
    var x = document.getElementById('vote');
    var ID = Number(x.value);
    var game = Game.load();
    var player = game.player[ID-1];
    player.isDead = true;
    //game.PisDead[ID-1] = true;
    document.getElementById('lastword').innerHTML =
    ID + '号玩家死亡，有遗言';
    Game.save(game);
    if (player.type == 'Hunter'){
      pl.view.results.showHunter();
    }
  },

  //显示猎人死亡
  showHunter: function(){
    document.getElementById('hunter').innerHTML
     = '猎人死亡，请选择要带走的人<br><br>';
    var form = document.getElementById('frmhunter');
    var input = document.createElement("input");
    input.type = "number";
    input.id = "hunterkill";
    form.appendChild(input);
    var button = document.createElement('button');
    // here is the problem!!!
    button.type = "button";
    button.id = 'BtnHunter';
    button.innerHTML = '确认';
    form.appendChild(button);
    form.appendChild(document.createElement("br"));
    button.addEventListener('click',
    pl.view.results.handleHunterActionClick);
    var div = document.getElementById('divHunter');
    div.style.padding = "10px 50px 15px 50px";
    //div.style.height= "120px";
  },

  //猎人死亡，发动技能
  handleHunterActionClick: function(){
    var x = document.getElementById('hunterkill');
    var ID = Number(x.value);
    var game = Game.load();
    var player = game.player[ID-1];
    player.isDead = true;
    //game.PisDead[ID-1] = true;
    document.getElementById('isSucceed').innerHTML =
    ID + '号玩家被带走';
    console.log('hunter act');
    Game.save(game);
  },


  //狼人自爆
  handleWolfSuicideonClick: function(){
    var x = document.getElementById('wolf');
    var ID = Number(x.value);
    var game = Game.load();
    var player = game.player[ID-1];
    if (player.type == 'Wolf'){
      player.isV2Die = true;
      document.getElementById('wolfInfo').innerHTML =
      '自爆成功，直接进入天黑';
    }
    else if (player.type == 'WolfKing'){
      player.isV2Die = true;
      document.getElementById('wolfInfo').innerHTML =
      '白狼王自爆，可以选择带走玩家，直接进入天黑';
      var input = document.createElement("input");
      var form  = document.getElementById('frmwolf');
      input.type = "number";
      input.id = "wolfkill";
      input.placeholder = '输入要带走玩家号码';
      form.appendChild(input);
      var button = document.createElement('button');
      button.type = "button";
      button.id = 'BtnWolfKill';
      button.innerHTML = '确认';
      form.appendChild(button);
      form.appendChild(document.createElement("br"));
      button.addEventListener('click',
      pl.view.results.handleWolfKillonClick);
    }
    Game.save(game);
  },

  handleWolfKillonClick: function(){
    var x = document.getElementById('wolfkill');
    var ID = Number(x.value);
    var game = Game.load();
    var player = game.player[ID-1];
    player.isDead = true;
    document.getElementById('wolfInfo').innerHTML =
    ID + '号玩家被带走';
    Game.save(game);
  },

  handleGetResonClick: function(){
    var game = Game.load();
    var TEXT = GameMethod.getLivingPlayer(game);
    document.getElementById('isOver').innerHTML = TEXT;
  },

  handleNextNightonClick: function(){
    window.location = 'wolfRound.html';
  }

}
