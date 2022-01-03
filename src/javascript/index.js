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

  var gameData;

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
      
  buttonMania.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    array = arrayDefiner("lotomania");
  });

  buttonFacil.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    array = arrayDefiner("lotofacil");
  });

  buttonSena.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    array = arrayDefiner("megasena");
  });
  
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

  numberBottons.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      console.log(array)

      switch (array){
        case 1:
          lotomania.push(item.textContent);
          console.log("lotomania",  lotomania);
          break;
        case 2:
          lotofacil.push(item.textContent);
          console.log("lotofacil", lotofacil);
          break;
        case 3:
          megasena.push(item.textContent);  
          console.log("megasena", megasena);  
          break;    
      }
      
    })
  });  
})(window, document);