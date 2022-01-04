(function(win, doc){
  'use strict';

  var lotomania = [];
  var lotofacil = [];
  var megasena =  [];  

  var totalValue = 0;

  var array = 1;

  var numberBottons = doc.querySelectorAll('[class="numbers"]');

  var buttonMania = doc.querySelector('[data-js="button-lotomania"');
  var buttonFacil = doc.querySelector('[data-js="button-lotofacil"');
  var buttonSena = doc.querySelector('[data-js="button-mega"');    

  var buttonClearGame = doc.querySelector('[id="clear-game"]');
  var buttonCompleteGame = doc.querySelector('[id="complete-game"]');
  var buttonCreateGame = doc.querySelector('[id="create-game"]');
  var spanPrice = doc.querySelector('[class="price"]');

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

  buttonMania.classList.add("active-lotomania");

  dataLoader();

  function contentLoader(data) {
    var $title = doc.querySelector('[data-js="game-type"]');

    var $description = doc.querySelector('[data-js="game-describer"]');    

    spanPrice.textContent = totalValue;

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

  buttonCreateGame.addEventListener('click', function(e) {
    if(array === 1) {
      var numerosValidos = checkQtdNumbers(lotomania, 5);

      if(numerosValidos) {
        createGameElement(lotomania, "Lotomania", "2,00");

        spanPrice.textContent = alterTotalvalue(2);

      }

    } else if (array === 2) {
      var numerosValidos = checkQtdNumbers(lotofacil, 15);

      if(numerosValidos) {
        createGameElement(lotofacil, "Lotofácil", "2,50");

        spanPrice.textContent = alterTotalvalue(2.5);
      }

    } else if (array === 3) {
      var numerosValidos = checkQtdNumbers(megasena, 6);

      if(numerosValidos) {
        createGameElement(megasena, "Mega-Sena", "4,50");
        spanPrice.textContent = alterTotalvalue(4.5);
      }

    }
  });

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

  function createGameElement(gameNumbers, gameName, gamePrice) {
    var $gameBox = doc.querySelector('[class="game-box"]');

    var $gameDescriptionDiv = doc.createElement('div');    
    $gameDescriptionDiv.classList.add("game-description");

    var $divImg = doc.createElement('div')
    $divImg.classList.add("div-img");

    var $imgDumpster = doc.createElement('img');
    $imgDumpster.src = "../src/assets/pngwing.com.png";
    $imgDumpster.classList.add("img-dumpster");

    $divImg.appendChild($imgDumpster);

    
    $gameDescriptionDiv.appendChild($divImg);
    
    $divImg.onclick = () => {
      $gameDescriptionDiv.parentNode.removeChild($gameDescriptionDiv);
      
      
      gamePrice = gamePrice.replace(/,/, '.');
      
      console.log(gamePrice);

      spanPrice.textContent = alterTotalvalue(Number(gamePrice) * -1 );
    };

    var $dividerDiv = doc.createElement('div');
    $dividerDiv.classList.add("divider");

    array === 1 ? $dividerDiv.classList.add('active-divider-lotomania') : '';
    array === 2 ? $dividerDiv.classList.add('active-divider-lotofacil') : '';
    array === 3 ? $dividerDiv.classList.add('active-divider-megasena') : '';

    $gameDescriptionDiv.appendChild($dividerDiv);

    
    var $descriptionGameDiv = doc.createElement('div');

    $descriptionGameDiv.classList.add('description-game');
    
    var $centralizerDiv = doc.createElement('div');
    $centralizerDiv.classList.add('centralizer');

    var $spanGameNumbers = doc.createElement('span');
    $spanGameNumbers.classList.add('game-numbers');
    $spanGameNumbers.textContent = gameNumbers;

    $centralizerDiv.appendChild($spanGameNumbers);

    var $divGamePrice = doc.createElement('div');
    $divGamePrice.classList.add("game-price");

    var $spanGameName = doc.createElement('span');
    $spanGameName.classList.add('game-name');    
    array === 1 ? $spanGameName.classList.add('active-span-lotomania') : '';
    array === 2 ? $spanGameName.classList.add('active-span-lotofacil') : '';
    array === 3 ? $spanGameName.classList.add('active-span-megasena') : '';
    $spanGameName.textContent = gameName;

    $divGamePrice.appendChild($spanGameName);

    var $spanGameValue = doc.createElement('span');
    $spanGameValue.classList.add('game-value');
    $spanGameValue.textContent = `R$ ${gamePrice}`;

    $divGamePrice.appendChild($spanGameValue);

    $centralizerDiv.appendChild($divGamePrice);

    $descriptionGameDiv.appendChild($centralizerDiv);

    $gameDescriptionDiv.appendChild($descriptionGameDiv)
    
    $gameBox.appendChild($gameDescriptionDiv);
    
  }

  function alterTotalvalue(value) {
    totalValue += Number(value);

    return totalValue;
  }

  function checkQtdNumbers(array, max) {
    if(array.length !== max) {
      alert("Selecione " + max + " números!");
      return false;
    } 

    return true;
  }  

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

  function arrayCleaner() {
    lotomania = [];
    lotofacil = [];
    megasena = [];
  }

  function completeGame(gameType) {
    
    if(gameType === 1) {
      arrayCleaner();
      var arrayNumeros = [];
      var aux;

      for(var i = 1; i <= 80; i++) {
        arrayNumeros.push(i);
      }
      
      
      for (var i = 0; i<5; i++) {
        aux = Math.floor(Math.random() * (arrayNumeros.length - 1) + 1);
        lotomania.push(arrayNumeros[aux]);        
        arrayNumeros.splice(aux, 1)
      }      
    } else if (gameType === 2) {
      arrayCleaner();

      var arrayNumeros = [];
      var aux;

      for(var i = 1; i <= 25; i++) {
        arrayNumeros.push(i);
      }
      
      for (var i = 0; i<15; i++) {
        aux = Math.floor(Math.random() * (arrayNumeros.length - 1) + 1);        
        lotofacil.push(arrayNumeros[aux]);        
        arrayNumeros.splice(aux, 1)        
      }      
    } else if (gameType === 3) {
      arrayCleaner();

      var arrayNumeros = [];
      var aux;


      for(var i = 1; i <= 60; i++) {
        arrayNumeros.push(i);
      }
      
      for (var i = 0; i<6; i++) {
        aux = Math.floor(Math.random() * (arrayNumeros.length - 1) + 1);
        megasena.push(arrayNumeros[aux]);        
        arrayNumeros.splice(aux, 1)
      }      
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
    arrayCleaner();

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