pl.view.strongCitizenRound = {
  setupUserInterface: function (){
    var game = Game.load();
    if (game.strongCitizen == undefined || game.nRound > 1){
      window.location = 'hunterRound.html';
      return;
    }
    var NextBtn = document.getElementById('btnNext');
    NextBtn.addEventListener('click',
    pl.view.strongCitizenRound.handleAssignIDonClick);
    NextBtn.addEventListener('click',
    pl.view.strongCitizenRound.handleNextNightonClick);
  },

  handleAssignIDonClick: function (){
    var x = document.getElementById('ID');
    var game = Game.load();
    var ID = Number(x.value);
    if (GameMethod.check_input(ID,game,'empty')){
      game.player[ID-1] = game.strongCitizen;
    }
    Game.save(game);
    console.log('assign '+ ID + 'th player to strongCitizen');
  },


  handleNextNightonClick: function(){
    var game = Game.load();
    // check input of all fields
    if (!game.validInput){
      //reinitialize
      game.validInput = true;
      game.nG_pre = 0;
      for (var i = 0;i<game.player.length;i++){
        if (game.player[i].type == 'strongCitizen'){
          game.player[i] = new Citizen();
        }
      }
      Game.save(game);
      return;
    }
    window.location = 'hunterRound.html';
  }
}
