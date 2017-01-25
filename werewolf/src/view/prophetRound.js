pl.view.prophetRound = {
  setupUserInterface: function (){
    var game = Game.load();

    if (game.prophet == undefined){
      window.location = 'strongCitizenRound.html';
      return;
    }

    var NextBtn = document.getElementById('btnNext');
    // get who is still living
    var textLive = GameMethod.getLivingPlayer(game);
    document.getElementById('night').innerHTML =
    '第'+game.nRound+'晚\n' + textLive;

    //get prophet ID in the 1st round
    if (game.nRound == 1){
      document.getElementById('showTEXT').innerHTML =
      '请输入预言家号码';
      var form = document.getElementById('frmProphetID');
      var input = document.createElement("input");
      input.type = "number";
      input.name = "prophet";
      form.appendChild(input);
      form.appendChild(document.createElement("br"));
      NextBtn.addEventListener('click',
      pl.ctrl.prophetRound.handleAssignID);
    }

    // generate examine ID input
    for (var i=0;i<game.player.length;i++){
      if (game.player[i].type == 'Prophet'){
        var pl_prophet = game.player[i];
      }
    }

    if (game.nRound > 1 && pl_prophet.isDead){
      var input = document.getElementById('ExamID');
      input.placeholder = '预言家已死亡';
      input.disabled = "disabled";
    }

    else {
      var input = document.getElementById('ExamID');
      input.placeholder = '请输入要验的玩家号码';
      var ExamBtn = document.getElementById('btnExam');
      ExamBtn.addEventListener('click',
        pl.ctrl.prophetRound.handleAssignExamID);
    }
    //regiser the call back function of submit button
    NextBtn.addEventListener('click',
    pl.ctrl.prophetRound.handleNextNightonClick);
  },
}
