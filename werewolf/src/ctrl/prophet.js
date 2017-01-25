pl.ctrl.prophetRound = {
  // called when submit the form
  handleAssignID: function (){
    var x = document.getElementById('frmProphetID');
    var game = Game.load();
    var ID = Number(x.elements['prophet'].value);
    if (GameMethod.check_input(ID,game,'empty')){
      game.player[ID-1] = game.prophet;
    }
    Game.save(game);
    console.log('assign '+ ID + 'th player to prophet');
  },

  handleAssignExamID: function(){
    var game = Game.load();
    var x = document.getElementById('ExamID');
    var ID = Number(x.value);
    GameMethod.check_input(ID,game,'range');
    var pl = game.player[ID-1].type;
    if (pl == 'Wolf' || pl == 'WolfKing'){
      var result = '坏人';
    }
    else {
      var result = '好人';
    }
    document.getElementById('showExam').innerHTML = result;
  },


  handleNextNightonClick: function(){
    var game = Game.load();
    if (!game.validInput){
      game.validInput = true;
      Game.save(game);
      return;
    }
      window.location = 'strongCitizenRound.html';
  }
  
}
