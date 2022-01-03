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
  
  
  buttonMania.addEventListener('click', function(e) {
    e.preventDefault();

    array = arrayDefiner("lotomania");
  });

  buttonFacil.addEventListener('click', function(e) {
    e.preventDefault();

    array = arrayDefiner("lotofacil");
  });

  buttonSena.addEventListener('click', function(e) {
    e.preventDefault();

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