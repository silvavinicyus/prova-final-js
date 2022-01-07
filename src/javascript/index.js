(function(win, doc){
  'use strict';  

  let loteryNumbers = [];

  let totalValue = 0;

  let array = 2;

  let numberBottons = doc.querySelectorAll('[class="numbers"]');

  let buttonMania = doc.querySelector('[data-js="button-lotomania"');
  let buttonFacil = doc.querySelector('[data-js="button-lotofacil"');
  let buttonSena = doc.querySelector('[data-js="button-mega"');    

  let buttonClearGame = doc.querySelector('[id="clear-game"]');
  let buttonCompleteGame = doc.querySelector('[id="complete-game"]');
  let buttonCreateGame = doc.querySelector('[id="create-game"]');
  let spanPrice = doc.querySelector('[class="price"]');

  let saveParagraph = doc.querySelector('[class="p-save"]');

  function dataLoader() {
    let ajax = new XMLHttpRequest();

    ajax.open('GET', "assets/games.json");
    ajax.send();

    let data; 

    data = ajax.addEventListener('readystatechange', function()  {
      if(ajax.readyState === 4 && ajax.status === 200) {
        data = JSON.parse(ajax.responseText);                 

        contentLoader(data);
      }
    })            
    return data;
  }    

  dataLoader();
  verifyEmptyCart(totalValue);

  buttonFacil.classList.add("active-lotofacil");
  buttonCompleteGame.classList.add("complete-clear-border-lotofacil");
  buttonClearGame.classList.add("complete-clear-border-lotofacil");
  buttonCreateGame.classList.add("create-game-lotofacil");
  saveParagraph.classList.add("foot-save-lotofacil");


  function contentLoader(data) {
    let $title = doc.querySelector('[data-js="game-type"]');

    let $description = doc.querySelector('[data-js="game-describer"]');    

    spanPrice.textContent = totalValue.toLocaleString('pt-br', {minimumFractionDigits: 2});
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
    try {
      let $gameBox = doc.querySelector('[data-js="game-box-js"]');
      $gameBox.classList.remove("game-box-flex");
      emptyCartElementRemover($gameBox);
    } catch ( err ){};

    if(array === 1) {
      let numerosValidos = checkQtdNumbers(loteryNumbers, 5);

      if(numerosValidos) {
        createGameElement(loteryNumbers, "Lotomania", "2,00");               

        spanPrice.textContent = alterTotalvalue(2).toLocaleString('pt-br', {minimumFractionDigits: 2});

        clearGame();
      }
    } else if (array === 2) {
      let numerosValidos = checkQtdNumbers(loteryNumbers, 15);

      if(numerosValidos) {
        createGameElement(loteryNumbers, "Lotofácil", "2,50");
        
        spanPrice.textContent =  alterTotalvalue(2.5).toLocaleString('pt-br', {minimumFractionDigits: 2});
        clearGame();
      }

    } else if (array === 3) {
      let numerosValidos = checkQtdNumbers(loteryNumbers, 6);

      if(numerosValidos) {
        createGameElement(loteryNumbers, "Mega-Sena", "4,50");
              

        spanPrice.textContent = alterTotalvalue(4.5).toLocaleString('pt-br', {minimumFractionDigits: 2});
        clearGame();
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

    buttonCompleteGame.classList.add("complete-clear-border-lotomania");
    buttonClearGame.classList.add("complete-clear-border-lotomania");
    buttonCompleteGame.classList.remove("complete-clear-border-megasena");
    buttonClearGame.classList.remove("complete-clear-border-megasena");
    buttonCompleteGame.classList.remove("complete-clear-border-lotofacil");
    buttonClearGame.classList.remove("complete-clear-border-lotofacil");
    
    buttonCreateGame.classList.add("create-game-lotomania");
    buttonCreateGame.classList.remove("create-game-lotofacil");
    buttonCreateGame.classList.remove("create-game-megasena");

    saveParagraph.classList.add("foot-save-lotomania");
    saveParagraph.classList.remove("foot-save-lotofacil");
    saveParagraph.classList.remove("foot-save-megasena");


    clearGame();

    array = arrayDefiner("lotomania");
  });

  buttonFacil.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    buttonFacil.classList.toggle("active-lotofacil");    
    buttonMania.classList.remove("active-lotomania");
    buttonSena.classList.remove("active-mega");

    buttonCompleteGame.classList.add("complete-clear-border-lotofacil");
    buttonClearGame.classList.add("complete-clear-border-lotofacil");

    buttonCompleteGame.classList.remove("complete-clear-border-lotomania");
    buttonClearGame.classList.remove("complete-clear-border-lotomania");
    buttonCompleteGame.classList.remove("complete-clear-border-megasena");
    buttonClearGame.classList.remove("complete-clear-border-megasena");

    buttonCreateGame.classList.add("create-game-lotofacil");
    buttonCreateGame.classList.remove("create-game-lotomania");
    buttonCreateGame.classList.remove("create-game-megasena");

    saveParagraph.classList.add("foot-save-lotofacil");
    saveParagraph.classList.remove("foot-save-lotomania");
    saveParagraph.classList.remove("foot-save-megasena");

    clearGame();

    array = arrayDefiner("lotofacil");
  });

  buttonSena.addEventListener('click', function(e) {
    e.preventDefault();
    dataLoader();

    buttonSena.classList.toggle("active-mega");
    buttonMania.classList.remove("active-lotomania");
    buttonFacil.classList.remove("active-lotofacil");

    buttonCompleteGame.classList.add("complete-clear-border-megasena");
    buttonClearGame.classList.add("complete-clear-border-megasena");
    buttonCompleteGame.classList.remove("complete-clear-border-lotomania");
    buttonClearGame.classList.remove("complete-clear-border-lotomania");
    buttonCompleteGame.classList.remove("complete-clear-border-lotofacil");
    buttonClearGame.classList.remove("complete-clear-border-lotofacil");

    buttonCreateGame.classList.add("create-game-megasena");
    buttonCreateGame.classList.remove("create-game-lotomania");
    buttonCreateGame.classList.remove("create-game-lotofacil");
    
    saveParagraph.classList.add("foot-save-megasena");
    saveParagraph.classList.remove("foot-save-lotomania");
    saveParagraph.classList.remove("foot-save-lotofacil");

    clearGame();

    array = arrayDefiner("megasena");
  });

  function convertTotalValue(value) {
    match = value.match(/(,\d)$/) + "0";

    value = value.replace(/(,\d)$/, (match[0] + "0"));

    return
  }

  function createGameElement(gameNumbers, gameName, gamePrice) {
    let $gameBox = doc.querySelector('[data-js="game-box-js"]');

    let $gameDescriptionDiv = doc.createElement('div');    
    $gameDescriptionDiv.classList.add("game-description");

    let $divImg = doc.createElement('div');
    $divImg.classList.add("div-img");

    let $imgDumpster = doc.createElement('img');
    $imgDumpster.src = "../src/assets/dumpster.png";
    $imgDumpster.classList.add("img-dumpster");

    $divImg.appendChild($imgDumpster);
    
    $gameDescriptionDiv.appendChild($divImg);
    
    $divImg.onclick = () => {
      $gameDescriptionDiv.parentNode.removeChild($gameDescriptionDiv);
      
      
      gamePrice = gamePrice.replace(/,/, '.');            

      spanPrice.textContent = alterTotalvalue(Number(gamePrice) * -1 ).toLocaleString('pt-br', {minimumFractionDigits: 2});;

      verifyEmptyCart(totalValue);      
      console.log(totalValue);
    };

    let $dividerDiv = doc.createElement('div');
    $dividerDiv.classList.add("divider");

    array === 1 ? $dividerDiv.classList.add('active-divider-lotomania') : '';
    array === 2 ? $dividerDiv.classList.add('active-divider-lotofacil') : '';
    array === 3 ? $dividerDiv.classList.add('active-divider-megasena') : '';

    $gameDescriptionDiv.appendChild($dividerDiv);
    
    let $descriptionGameDiv = doc.createElement('div');

    $descriptionGameDiv.classList.add('description-game');
    
    let $centralizerDiv = doc.createElement('div');
    $centralizerDiv.classList.add('centralizer');

    let $spanGameNumbers = doc.createElement('span');
    $spanGameNumbers.classList.add('game-numbers');
    $spanGameNumbers.textContent = gameNumbers.sort((a, b) => a - b);

    $centralizerDiv.appendChild($spanGameNumbers);

    let $divGamePrice = doc.createElement('div');
    $divGamePrice.classList.add("game-price");

    let $spanGameName = doc.createElement('span');
    $spanGameName.classList.add('game-name');    
    array === 1 ? $spanGameName.classList.add('active-span-lotomania') : '';
    array === 2 ? $spanGameName.classList.add('active-span-lotofacil') : '';
    array === 3 ? $spanGameName.classList.add('active-span-megasena') : '';
    $spanGameName.textContent = gameName;

    $divGamePrice.appendChild($spanGameName);

    let $spanGameValue = doc.createElement('span');
    $spanGameValue.classList.add('game-value');
    $spanGameValue.textContent = `R$ ${gamePrice}`;

    $divGamePrice.appendChild($spanGameValue);

    $centralizerDiv.appendChild($divGamePrice);

    $descriptionGameDiv.appendChild($centralizerDiv);

    $gameDescriptionDiv.appendChild($descriptionGameDiv)
    
    $gameBox.appendChild($gameDescriptionDiv);
    
  }

  function verifyEmptyCart(cartValue) {    
    let $gameBox = doc.querySelector('[data-js="game-box-js"]');
    $gameBox.classList.remove("game-box-flex");

    if(cartValue <= 0) {            
      createEmptyCartElement();
    } 
  }

  function emptyCartElementRemover($gameBox) {
    let $emptyCartDiv = doc.querySelector('[class="empty-cart"]');

    $gameBox.removeChild($emptyCartDiv);
  }

  function createEmptyCartElement(){
    let $gameBox = doc.querySelector('[data-js="game-box-js"]');  
    $gameBox.classList.add("game-box-flex");  
    
    let $emptyCartDiv = doc.createElement("div");
    $emptyCartDiv.classList.add("empty-cart");

    let $imgEmptyCart = doc.createElement("img");
    $imgEmptyCart.src = "assets/empty-cart.png";

    let $emptyCartSpan = doc.createElement("span");
    $emptyCartSpan.textContent = "Carrinho Vazio";
    $emptyCartSpan.classList.add("empty-cart-span");

    $emptyCartDiv.appendChild($imgEmptyCart);
    $emptyCartDiv.appendChild($emptyCartSpan);

    $gameBox.appendChild($emptyCartDiv);
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
      loteryNumbers.forEach(function(numero){
        numberBottons.forEach(function(item) {
          if(+item.textContent === +numero) {
            item.classList.add("active-number-botton-mania");
          }
        })
      });
    } else if (array === 2) {
      loteryNumbers.forEach(function(numero){
        numberBottons.forEach(function(item) {
          if(+item.textContent === +numero) {
            item.classList.add("active-number-botton-facil");
          }
        })
      });
    } else if (array === 3) {
      loteryNumbers.forEach(function(numero){
        numberBottons.forEach(function(item) {
          if(+item.textContent === +numero) {
            item.classList.add("active-number-botton-sena");
          }
        })
      });
    }
  }

  function arrayCleaner() {
    loteryNumbers = [];
  }

  function completeGame(gameType) {
    
    if(gameType === 1) {
      arrayCleaner();
      let arrayNumeros = [];
      let aux;

      for(let i = 1; i <= 80; i++) {
        arrayNumeros.push(i);
      }
      
      
      for (let i = 0; i<5; i++) {
        aux = Math.floor(Math.random() * (arrayNumeros.length - 1) + 1);
        loteryNumbers.push(arrayNumeros[aux]);        
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
        loteryNumbers.push(arrayNumeros[aux]);        
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
        loteryNumbers.push(arrayNumeros[aux]);        
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
          loteryNumbers.push(item.textContent)
          item.classList.add("active-number-botton-mania");                                       
          break;
        case 2:
          loteryNumbers.push(item.textContent);
          item.classList.add("active-number-botton-facil");               
          break;
        case 3:
          loteryNumbers.push(item.textContent);  
          item.classList.add("active-number-botton-sena");               
          break;    
      }      
    });
  });  
})(window, document);