(function(win, doc){
  'use strict';

  var lotomania = [];
  var lotofacil = [];
  var megasena =  [];

  var array = 1;

  var numberBottons = doc.querySelectorAll('[class="numbers"]');

  var buttonMania = doc.querySelector('[data-js="button-lotomania"');
  var buttonFacil = doc.querySelector('[data-js="button-lotofacil"');
  var buttonSena = doc.querySelector('[data-js="button-mega"');    

  var buttonClearGame = doc.querySelector('[id="clear-game"]');
  var buttonCompleteGame = doc.querySelector('[id="complete-game"]');

  function dataLoader() {
    var ajax = new XMLHttpRequest();

    ajax.open('GET', "assets/games.json");
    ajax.send();

    var data; 

    data = ajax.addEventListener('readystatechange', function()  {
      if(ajax.readyState === 4 && ajax.status === 200) {
        data = JSON.parse(ajax.responseText);                 

        contentLoader(data);
      }
    })        

    return data;
  }
  
  dataLoader();  

  function contentLoader(data) {
    var $title = doc.querySelector('[data-js="game-type"]');

    var $description = doc.querySelector('[data-js="game-describer"]');    

    if(array === 1){
      $title.textContent = data["types"][2]["type"];
      $description.textContent = data["types"][2]["description"];
    } else if(array === 2){
      $title.textContent = data["types"][0]["type"];
      $description.textContent = data["types"][0]["description"];
    } else if(array === 3){
      $title.textContent = data["types"][1]["type"];
      $description.textContent = data["types"][1]["description"];
    }  
  }

  buttonCompleteGame.addEventListener('click', function(e) {
    e.preventDefault();

    clearGame();

    completeGame(array);

    fullFillNumberFields(array);
  });

  buttonClearGame.addEventListener('click', function(e) {
    e.preventDefault();

    clearGame();
    
    return;
  });
      
  buttonMania.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    buttonMania.classList.toggle("active-lotomania");    
    buttonFacil.classList.remove("active-lotofacil");
    buttonSena.classList.remove("active-mega");

    clearGame();

    array = arrayDefiner("lotomania");
  });

  buttonFacil.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    buttonFacil.classList.toggle("active-lotofacil");    
    buttonMania.classList.remove("active-lotomania");
    buttonSena.classList.remove("active-mega");

    clearGame();

    array = arrayDefiner("lotofacil");
  });

  buttonSena.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    buttonSena.classList.toggle("active-mega");
    buttonMania.classList.remove("active-lotomania");
    buttonFacil.classList.remove("active-lotofacil");

    clearGame();

    array = arrayDefiner("megasena");
  });

  function fullFillNumberFields(array){    
    if(array === 1) {
      lotomania.forEach(function(numero){
        numberBottons.forEach(function(item) {
          if(+item.textContent === +numero) {
            item.classList.add("active-number-botton-mania");
          }
        })
      });
    } else if (array === 2) {
      lotofacil.forEach(function(numero){
        numberBottons.forEach(function(item) {
          if(+item.textContent === +numero) {
            item.classList.add("active-number-botton-facil");
          }
        })
      });
    } else if (array === 3) {
      megasena.forEach(function(numero){
        numberBottons.forEach(function(item) {
          if(+item.textContent === +numero) {
            item.classList.add("active-number-botton-sena");
          }
        })
      });
    }
  }

  function completeGame(gameType) {
    if(gameType === 1) {
      lotomania = [];
      lotofacil = [];
      megasena = [];
      for( var i = 0; i < 5; i++) {
        lotomania.push(Math.floor(Math.random() * 80 + 1));
      }
      console.log(lotomania);
    } else if (gameType === 2) {
      lotomania = [];
      lotofacil = [];
      megasena = [];
      for( var i = 0; i < 15; i++) {
        lotofacil.push(Math.floor(Math.random() * 25 + 1));
      }
      console.log(lotofacil);
    } else if (gameType === 3) {
      lotomania = [];
      lotofacil = [];
      megasena = [];
      for( var i = 0; i < 6; i++) {
        megasena.push(Math.floor(Math.random() * 60 + 1));
      }
      console.log(megasena);
    }    
  }
  
  function arrayDefiner(option) {
    switch (option) {
      case "lotomania":
        return 1;
      case "lotofacil":
        return 2;
      case "megasena":
        return 3;
    }
  }

  function clearGame() {
    lotofacil = [];
    lotomania = [];
    megasena = [];

    numberBottons.forEach(function(item) {
      item.classList.remove("active-number-botton-mania"); 
      item.classList.remove("active-number-botton-facil"); 
      item.classList.remove("active-number-botton-sena");  
    });
  }

  numberBottons.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();      

      switch (array){
        case 1:
          lotomania.push(item.textContent)
          item.classList.add("active-number-botton-mania");                             
          console.log(lotomania);
          break;
        case 2:
          lotofacil.push(item.textContent);
          item.classList.add("active-number-botton-facil");               
          break;
        case 3:
          megasena.push(item.textContent);  
          item.classList.add("active-number-botton-sena");               
          break;    
      }      
    });
  });  
})(window, document);

