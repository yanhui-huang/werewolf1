pl.view.createGame = {
  setupUserInterface: function() {
    var x = document.getElementById("FrmgetRole");
    for (var i = 0; i < x.length; i++) {
      x.elements[i].addEventListener("change",
      pl.view.createGame.updateTotal);
    }
    var submitButton = document.getElementById("btnSubmit");
    submitButton.addEventListener("click",
     pl.view.createGame.handleSubmitButtonClickEvent);
  },

  // update the total number of players on screen when input changes (complete)
  updateTotal: function() {
    var x = document.getElementById("FrmgetRole");
    var totN = 0;
    for (var i = 0; i < x.length; i++) {
      var num = x.elements[i].value
      var addn = Number(num);
      totN += Number(addn);
    }
    document.getElementById("ptotN").innerHTML = "一共有"+totN+"个玩家";
  },

  // pass the input to create a game, (need work on it)
  handleSubmitButtonClickEvent: function(){
    console.log('game player info submitted...');
    var x = document.getElementById("FrmgetRole");
    var slots = new Slots();
    for (var i = 0; i < x.length; i++){
      var id = x.elements[i].id;
      var value = Number(x.elements[id].value)
      slots[id] = value;
      console.log('get '+ value + ' ' + id);
    }
    // initialize a new game object
    game = new Game(slots);
    // save to local storage;
    Game.save(game);
    window.location = "wolfRound.html";
  }
};
