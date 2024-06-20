let list = document.getElementById("team-name-list");
let itemEvent = document.getElementById("production-type");

class FixedSizeArray {
  constructor(size) {
    this.size = size;
    this.array = new Array(size).fill(null);
    this.pointer = 0;
  }

  push(value) {
    this.array[this.pointer] = value;
    this.pointer = (this.pointer + 1) % this.size; // Move o ponteiro para a próxima posição circularmente
  }

  get(index){
    return this.array[index];
  }

  set(index, value){
    this.array[index] = value;
  }

  fill(value){
    for(let i = 0; i < this.array.length; i++){
      this.array[i] = value;
    }
  }

  getAll() {
    return this.array;
  }
}


let vehicleModelArray;
let vehicleYearArray;
let vehicleAutomakerArray;
let vehicleSeriesArray;
/*
let arrows = document.querySelectorAll('.arrow-img');

arrows.forEach((arrow)=>{
  let content = arrow.closest('.subtitles').nextElementSibling;
  content.style.display = 'none';
});
*/

//Acrescenta o campo de OKTB-DATE caso o Product Type seja Pre-Prod
itemEvent.addEventListener("change", (selectValue)=>{
  if(selectValue.target.value === "opt2"){
    console.log("Entrou na condicional")
    let newItem = document.createElement("li");
    newItem.id = "OKTB-Date";
    list.parentNode.insertBefore(newItem, list);

    let newH3 = document.createElement("h3");
    newH3.textContent = "OKTB Date";
    newH3.id = "OKTB-Date-H3"

    let newList = document.getElementById("OKTB-Date");
    newList.appendChild(newH3);

    let newInput = document.createElement("input");
    newInput.id = "OKTB-Date-Select"
    newInput.type = "date"
    newInput.name = "oktb-date"
    newList.appendChild(newInput)

  }
  else{
    let itemToRemove = document.getElementById("OKTB-Date");
    if(itemToRemove){
      itemToRemove.parentNode.removeChild(itemToRemove)
    }
    else{
      return
    }
  }
})

let requestNumber = document.getElementById("requestor-number");
let requestors = 0;
requestNumber.addEventListener("change", (number)=>{
  if(number.target.value < 0){
    number.target.value = 0;
    disablePopUp();
  }
  else if(number.target.value > 3){
    number.target.value = 3;
    let popup = document.querySelector("#popup");
    popup.setAttribute("style", "display: block;");
    disablePopUp();
  }
  else if(number.target.value > 0 && number.target.value <= 3){
    requestors = number.target.value;
    disablePopUp();
    //Limpa o nó principal antes
    let previousNodes = document.querySelectorAll(".requestor-class");
    if(previousNodes){
      previousNodes.forEach((element)=>{
        element.parentNode.removeChild(element);
      })
    }
      for(let x = 1 ; x <= requestors ; x++){
        createRequestors(x)
      }
    }
  else{
    let previousNodes = document.querySelectorAll(".requestor-class");
    if(previousNodes){
      previousNodes.forEach((element)=>{
        element.parentNode.removeChild(element);
      })
    }
  }
})

function createRequestors(number){
  //Cria os elementos no corpo HTML
  let requestorTitleList = document.createElement("li")
  let privacyList = document.getElementById("privacy-training-li")
  requestorTitleList.id = "requestor-li-" + number
  requestorTitleList.classList.add("requestor-class")
  privacyList.parentNode.insertBefore(requestorTitleList, privacyList);

  let requestorTitleName = document.createElement("h3")
  requestorTitleName.textContent = "";
  //requestorTitleName.textContent = "Requestor #" + number;
  requestorTitleName.style.cssText = "margin-top: 20px;" + 
                                     "font-size: 15px;"

  //Cria o campo NAME
  let requestorData1 = document.createElement("input");
  requestorData1.type = "text";
  requestorData1.name = "requestor-" + number + "-name"
  requestorData1.placeholder = "Requestor #" + number + " Name"

  //Cria o campo REGION
  let requestorData2 = document.createElement("input");
  requestorData2.type = "text";
  requestorData2.name = "requestor-" + number + "-region"
  requestorData2.placeholder = "Requestor #" + number + " Region"

  //Cria o campo CDSID
  let requestorData3 = document.createElement("input");
  requestorData3.type = "text";
  requestorData3.name = "requestor-" + number + "-cdsid"
  requestorData3.placeholder = "Requestor #" + number + " CDSID"

  //Estiliza os campos criados
  requestorData1.style.cssText = "margin-right: 10px;" +
                                 "border-radius: 20px;"
  
  requestorData2.style.cssText = "margin-right: 10px;" +
                                 "border-radius: 20px;"

  requestorData3.style.cssText = "margin-right: 10px;" +
                                 "border-radius: 20px;"

  requestorTitleList.appendChild(requestorTitleName)
  requestorTitleList.appendChild(requestorData1)
  requestorTitleList.appendChild(requestorData2)
  requestorTitleList.appendChild(requestorData3)
}
/*
let checkboxList_2 = ["privacy-training-", "gdrp-training-", "ford-internal-use-", "feature-codes-", "fleet-vehicle-", "gcp-"]
checkboxList_2.forEach((element) => {
  let yes = document.getElementById(element + "yes")
  let no = document.getElementById(element + "no")
  yes.addEventListener("change", () =>{
    if(yes.checked){
      if(no.checked){
        no.checked = false;
      }     
    }
  no.addEventListener("change", () => {
    if(no.checked){
      if(yes.checked){
        yes.checked = false;
      }
    }

  })
  })
})*/

function disablePopUp(){
  setTimeout(() => {
    let popup = document.querySelector("#popup");
    popup.setAttribute("style", "display: none;");
  }, 5000);
}

function createVinYearField(){
  //Campos da lista
  checkAllYearFields = document.querySelectorAll(".year-class")
  checkAllYearFields.forEach((element) =>{
    if(checkAllYearFields){
      element.parentNode.removeChild(element)
    }
  })
  let newItemInList = document.createElement("li")
  let newH3 = document.createElement("h3")
  let newSelect = document.createElement("select")
  //Adicionando a classe "year-class"
  newItemInList.classList.add("year-class")
  newH3.classList.add("year-class")
  newSelect.classList.add("year-class")
  //Conteúdo dos campos
  newH3.textContent = "VIN Model Year"
  newSelect.id = "year-list"
  newSelect.name = "year-list"
  //Adicionando campos no DOM
  let referenceItem = document.getElementById("feature-codes-li")
  referenceItem.parentNode.insertBefore(newItemInList, referenceItem)
  newItemInList.appendChild(newH3)
  newItemInList.appendChild(newSelect)
}

//Desse jeito, salvamos tudo que é necessário no array modelsList pra não precisar fazer request toda hora no banco.
const modelsList = [];
fetch("/vehicle-models")
.then(response => response.json())
.then(data => {    
  data.forEach((model)=>{
    modelsList.push(model);
  })
});


let vinNumber = document.getElementById("tags");
let fleetVehicle = document.getElementById("fleet-vehicle-li");
let checkVinList = document.getElementById("vin-list");
checkVinList.addEventListener("change", () => {
  if(checkVinList.value === "opt2"){
    vinNumber.setAttribute("style", "display: block;");
    fleetVehicle.setAttribute("style", "display: block;");
  }
  else{
    vinNumber.setAttribute("style", "display: none;");
    fleetVehicle.setAttribute("style", "display: none;");
  }
})

let vinYes = document.getElementById("vin-yes")
let vinNo = document.getElementById("vin-no")
vinYes.addEventListener("change", () => {
  if(vinYes.checked){
    let vinListField = document.getElementById("vin-list-li")
    let vinVehicleNumberField = document.getElementById("vehicle-number-li")
    vinListField.setAttribute("style", "display: block;");
    vinVehicleNumberField.setAttribute("style", "display: block;");
  }
  else{
    let vinNumber = document.getElementById("tags");
    vinNumber.setAttribute("style", "display: none;");
    let vinListField = document.getElementById("vin-list-li")
    let vinVehicleNumberField = document.getElementById("vehicle-number-li")
    vinListField.setAttribute("style", "display: none;");
    vinVehicleNumberField.setAttribute("style", "display: none;");

    let selectField = document.getElementById("vin-list")
    selectField.selectedIndex = 0

    let allVinCodes = document.querySelectorAll(".vin-code")
    if(allVinCodes){
      allVinCodes.forEach((e) => {
        e.parentElement.removeChild(e);
      })
    }
    vinCodeList = [];

    let fleetVehicle = document.getElementById("fleet-vehicle-li");
    fleetVehicle.setAttribute("style", "display: none;");

    checkAllYearFields = document.querySelectorAll(".year-class")
    if(checkAllYearFields){
      checkAllYearFields.forEach((element)=>{
        element.parentNode.removeChild(element)
      })
    }

  }
})
vinNo.addEventListener("change", () => {
  if(vinNo.checked){
    let vinListField = document.getElementById("vin-list-li")
    let vinVehicleNumberField = document.getElementById("vehicle-number-li")
    vinListField.setAttribute("style", "display: none;");
    vinVehicleNumberField.setAttribute("style", "display: none;");
    let vinNumber = document.getElementById("tags");
    vinNumber.setAttribute("style", "display: none;");

    let selectField = document.getElementById("vin-list")
    selectField.selectedIndex = 0

    let allVinCodes = document.querySelectorAll(".vin-code")
    if(allVinCodes){
      allVinCodes.forEach((e) => {
        e.parentElement.removeChild(e);
      })
    }
    vinCodeList = [];

    let fleetVehicle = document.getElementById("fleet-vehicle-li");
    fleetVehicle.setAttribute("style", "display: none;");

    checkAllYearFields = document.querySelectorAll(".year-class")
    if(checkAllYearFields){
      checkAllYearFields.forEach((element)=>{
        element.parentNode.removeChild(element)
      })
    }
  }
})

/*
//Impede que os campos YES e NO sejam marcados ao mesmo tempo
let checkboxList = ["vin-"]
checkboxList.forEach((element) => {
  let yes = document.getElementById(element + "yes")
  let no = document.getElementById(element + "no")
  yes.addEventListener("change", () =>{
    if(yes.checked){
      if(no.checked){
        no.checked = false;
      }     
    }
  no.addEventListener("change", () => {
    if(no.checked){
      if(yes.checked){
        yes.checked = false;
      }
    }
  })
  })
  
})
*/
document.addEventListener('DOMContentLoaded', function() {
  const dropdownHeaders = document.querySelectorAll('.dropdown-header');

  dropdownHeaders.forEach(function(dropdownHeader) {
      const leftIcon = dropdownHeader.querySelector('.left-icon');
      const rightIcon = dropdownHeader.querySelector('.right-icon');
      const dropdownContent = dropdownHeader.querySelector('.dropdown-content');

      [leftIcon, rightIcon].forEach(function(icon) {
          icon.addEventListener('click', function() {
              dropdownHeader.classList.toggle('active');
              if (dropdownHeader.classList.contains('active')) {
                  // Expandir
                  dropdownContent.style.height = dropdownContent.scrollHeight + "px";
                  dropdownContent.style.opacity = 1;
                  dropdownContent.style.pointerEvents = 'all';
              } else {
                  // Contrair
                  dropdownContent.style.height = dropdownContent.scrollHeight + "px"; // Ajusta a altura antes de começar a contrair
                  setTimeout(() => {
                      dropdownContent.style.height = "0";
                      dropdownContent.style.opacity = 0;
                      dropdownContent.style.pointerEvents = 'none';
                  }, 10); // Pequeno atraso para permitir a atualização do layout
              }
          });
      });

      // Para garantir que a altura seja recalculada ao reabrir
      dropdownContent.addEventListener('transitionend', function() {
          if (dropdownHeader.classList.contains('active')) {
              dropdownContent.style.height = 'auto';
          }
      });
  });
});




document.addEventListener("DOMContentLoaded", function() {
  let arrows = document.querySelectorAll('.arrow-img');

  arrows.forEach(function(arrow) {
      const expectedImg = "lock.png";
      arrow.addEventListener('click', function() {
        if(!arrow.src.includes(expectedImg)){  
          let content = arrow.closest('.subtitles').nextElementSibling;
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                arrow.src = "/static/remove.png"
            } else {
                content.style.display = 'none';
                arrow.src = "/static/arrow.png"
            }
        }
        else{
          arrow.style.cursor = "not-allowed"
          console.log(arrow.src)
        }
      });  
  });
});

function extractKeyword(selector) {
  let parts = selector.split("-");
  let hashPart = parts[1];
  console.log(hashPart);
  return Number(hashPart);
}

let validateSubmitButton = 0;

// SEMPRE QUE CRIAR UM TÓPICO NOVO, INSERÍ-LO AQUI
const pageItems = ["userIntel-img", 
                  "requestClarification-img", 
                  "vehicleSpecification-img",
                  "dataRequirements-img",
                  "dataDelivery-img"];

let doneMarkers = document.querySelectorAll(".done");
let doneNumber = 0;

doneMarkers.forEach((done) => {
  done.addEventListener("change", () => {
    doneNumber = extractKeyword(done.id);
    let nextItem = document.getElementById(pageItems[doneNumber]);

    if (done.checked) {
      if (nextItem) {
        nextItem.src = "/static/arrow.png";
        let title = nextItem.closest(".subtitles");
        title.style.color = "black";
        nextItem.style.cursor = "pointer";
      }
      validateSubmitButton++;
      console.log("validateSubmitButton = " + validateSubmitButton)
      let nextDone = document.getElementById("done-" + (Number(doneNumber) + 1));
      if (nextDone) {
        nextDone.checked = false;
        validateSubmitButton--;
      }

      if (doneNumber > 0) {
        checkAndSetApproved(document.getElementById(pageItems[doneNumber - 1]).closest(".subtitles"));
      }
    } else {
      if (doneNumber > 0) {
        checkAndSetApproved(document.getElementById(pageItems[doneNumber - 1]).closest(".subtitles"));
      }
      let iteration = 0;
      while (nextItem) {
        nextItem.src = "/static/lock.png";
        let title = nextItem.closest(".subtitles");
        title.style.color = "#999999";
        nextItem.style.cursor = "not-allowed";
        title.nextElementSibling.style.display = "none";

        let detectPreviousImage = document.getElementById("checkimage-" + nextItem.closest(".subtitles").id);
        if (detectPreviousImage) {
          nextItem.closest(".subtitles").removeChild(detectPreviousImage);
        }

        iteration++;
        nextItem = document.getElementById(pageItems[Number(doneNumber) + iteration]);
      }
    }
  });
});

/*
 Essa função transforma o elemento inserido no parâmetro com a cor verde.
 Caso o elemento JÁ esteja assim, ela converte de volta ao normal.
*/
function checkAndSetApproved(element) {
  if (element) {
    if (element.style.color === "green") {
      let detectPreviousImage = document.getElementById("checkimage-" + element.id);
      if (detectPreviousImage) {
        element.removeChild(detectPreviousImage);
      }
      element.setAttribute("style", "color: black;");
    } else {
      element.setAttribute("style", "color: green;");
      let image = document.createElement("img");
      image.style.cssText = "height: 30px; width: 30px; margin-bottom: -5px; margin-left: 3px;";
      image.src = "/static/green-check.png";
      image.id = "checkimage-" + element.id;
      element.appendChild(image);
      console.log(image);
    }
  }
}
let vehicleAmount = document.getElementById("vehicle-number");
let vehiclesNumber = 0;
console.log("vehicleAmount = " + vehicleAmount)
vehicleAmount.addEventListener("change", (e)=>{
  vehiclesNumber = Number(e.target.value);
  if(vehiclesNumber < 0){
    e.target.value = 0;
    vehiclesNumber = 0;
    let divConteiner = document.getElementById("vehicle-container");
    divConteiner.style.backgroundColor = "transparent";
  }
  else{
    if(vehiclesNumber >= 0){
      vehicleModelArray = new FixedSizeArray(vehiclesNumber);
      vehicleYearArray = new FixedSizeArray(vehiclesNumber);
      vehicleAutomakerArray = new FixedSizeArray(vehiclesNumber);
      vehicleSeriesArray = new FixedSizeArray(vehiclesNumber);
      createVehicleFields(vehiclesNumber, vehicleAmount);
      if(vehiclesNumber === 0){
        let divConteiner = document.getElementById("vehicle-container");
        divConteiner.style.backgroundColor = "transparent";
      }
    }
  }
})

function createVehicleFields(number, element){
  //Deleta primeiro pra depois criar
  let detectPreviousModelLi = document.querySelectorAll(".model-ul");
  if(detectPreviousModelLi){
    detectPreviousModelLi.forEach((x) =>{
      x.parentNode.removeChild(x);
    })
  }

  let modelLi;
  let modelUl;
  let yearLi;
  let yearUl;
  let makeLi;
  let makeUl;
  let modelSeriesLi;
  let modelSeriesUl;

  //Cria os elementos
  for(let i = 0; i<number; i++){
    //Cria o item da lista
    //Cria uma lista de itens de Modelos de carro
    if(i === 0){
      modelUl = document.createElement("ul");
      modelUl.classList.add("model-ul");
      modelUl.id = "model-ul-id"
      modelLi = document.createElement("li");
      modelLi.id = "model-li-" + Number(i+1);
      modelLi.classList.add("model-li");
    }    
    //Cria o título H3
    let modelH3 = document.createElement("h3");
    //Cria o select
    let select = document.createElement("select");
    //Cria o option
    let option = document.createElement("option");
    //Seta as propriedades de cada um dos elementos
    modelH3.textContent = "Vehicle Model";
    select.id = "model-" + Number(i+1);
    select.name = "model";
    option.value = "opt";
    option.textContent = "Vehicle #" + Number(i+1);

    //Cria cada um dos itens em ordem
    if(i === 0){
      document.getElementById("vehicle-container").appendChild(modelUl);
      modelUl.appendChild(modelLi);
      modelLi.appendChild(modelH3);
    }    
    modelLi.style.width = "160px";
    select.style.cssText = "margin-bottom: 30px; " +
                           "width: 150px; " +
                           "height: 30px; ";
    select.classList.add("model-select")                       
    option.style.textAlign = "center";
    modelLi.appendChild(select);
    select.appendChild(option);
    modelsList.forEach((model) => {
      let newOption = document.createElement("option");
      newOption.style.textAlign = "center";
      newOption.textContent = model;
      select.appendChild(newOption);
    })
    select.addEventListener("change", (event) => {
      let index = event.target.selectedIndex;
      vehicleModelArray.set(extractKeyword(select.id)-1, event.target.options[index].text);
    })


    //Cria uma lista de itens de Anos de modelos de carro
    if( i === 0 ){
      yearUl = document.createElement("ul");
      yearLi = document.createElement("li");
      yearUl.id = "year-ul-id"
      yearUl.classList.add("model-ul");
      yearLi.classList.add("year-li");
    }
    //Cria o título H3
    let yearH3 = document.createElement("h3");
    //Cria o select
    let yearSelect = document.createElement("select");
    //Cria o option
    let yearOption = document.createElement("option");
    //Seta as propriedades de cada um dos elementos
    yearH3.textContent = "Year";
    yearH3.id = "yearH3-id"
    yearSelect.id = "year-" + Number(i+1);
    yearSelect.name = "year";
    yearOption.value = "opt";
    yearOption.textContent = "Year";

    //Cria cada um dos itens em ordem
    if(i === 0){
      document.getElementById("vehicle-container").appendChild(yearUl);
      yearUl.appendChild(yearLi);
      yearLi.appendChild(yearH3);
    } 
    yearLi.style.width = "160px";
    yearSelect.style.cssText = "margin-bottom: 30px; " +
                           "width: 150px; " +
                           "height: 30px; ";
    yearSelect.classList.add("year-select")                         
    yearOption.style.textAlign = "center";
    yearLi.appendChild(yearSelect);
    yearSelect.appendChild(yearOption);

    yearSelect.addEventListener("change", (event) => {
      let index = event.target.selectedIndex;
      vehicleYearArray.set(extractKeyword(yearSelect.id)-1, event.target.options[index].text);
    })

    //Cria uma lista de itens de Fabricante do carro
    if( i === 0 ){
      makeUl = document.createElement("ul");
      makeLi = document.createElement("li");
      makeUl.id = "make-ul-id"
      makeUl.classList.add("model-ul");
      makeLi.classList.add("make-li");
    }
    //Cria o título H3
    let makeH3 = document.createElement("h3");
    //Cria o select
    let makeSelect = document.createElement("select");
    //Cria o option
    let makeOption = document.createElement("option");
    //Seta as propriedades de cada um dos elementos
    makeH3.textContent = "Automaker";
    makeH3.id = "makeH3-id"
    makeSelect.id = "make-" + Number(i+1);
    makeSelect.name = "make";
    makeOption.value = "opt";
    makeOption.textContent = "Automaker";

    //Cria cada um dos itens em ordem
    if(i === 0){
      document.getElementById("vehicle-container").appendChild(makeUl);
      makeUl.appendChild(makeLi);
      makeLi.appendChild(makeH3);
    } 
    makeLi.style.width = "160px";
    makeSelect.style.cssText = "margin-bottom: 30px; " +
                           "width: 150px; " +
                           "height: 30px; ";
    makeSelect.classList.add("make-select")                         
    makeOption.style.textAlign = "center";
    makeLi.appendChild(makeSelect);
    makeSelect.appendChild(makeOption);

    makeSelect.addEventListener("change", (event) => {
      let index = event.target.selectedIndex;
      vehicleAutomakerArray.set(extractKeyword(makeSelect.id)-1, event.target.options[index].text);
    })

    //Cria uma lista de itens de Model Series do carro
    if( i === 0 ){
      modelSeriesUl = document.createElement("ul");
      modelSeriesLi = document.createElement("li");
      modelSeriesUl.id = "modelSeries-ul-id"
      modelSeriesUl.classList.add("model-ul");
      modelSeriesLi.classList.add("modelSeries-li");
    }
    //Cria o título H3
    let modelSeriesH3 = document.createElement("h3");
    //Cria o select
    let modelSeriesSelect = document.createElement("select");
    //Cria o option
    let modelSeriesOption = document.createElement("option");
    //Seta as propriedades de cada um dos elementos
    modelSeriesH3.textContent = "Model Series";
    modelSeriesH3.id = "modelSeriesH3-id"
    modelSeriesSelect.id = "modelSeries-" + Number(i+1);
    modelSeriesSelect.name = "modelSeries";
    modelSeriesOption.value = "opt";
    modelSeriesOption.textContent = "Model Series";

    //Cria cada um dos itens em ordem
    if(i === 0){
      document.getElementById("vehicle-container").appendChild(modelSeriesUl);
      modelSeriesUl.appendChild(modelSeriesLi);
      modelSeriesLi.appendChild(modelSeriesH3);
    } 
    modelSeriesLi.style.width = "160px";
    modelSeriesSelect.style.cssText = "margin-bottom: 30px; " +
                           "width: 150px; " +
                           "height: 30px; ";
    modelSeriesSelect.classList.add("modelSeries-select")                         
    modelSeriesOption.style.textAlign = "center";
    modelSeriesLi.appendChild(modelSeriesSelect);
    modelSeriesSelect.appendChild(modelSeriesOption);

    let divConteiner = document.getElementById("vehicle-container");
    divConteiner.style.backgroundColor = "#252435";
    divConteiner.style.cssText = "box-shadow: 5px 5px 10px rgba(78, 86, 60, 0.3);"

    modelSeriesSelect.addEventListener("change", (event) => {
      let index = event.target.selectedIndex;
      vehicleSeriesArray.set(extractKeyword(modelSeriesSelect.id)-1, event.target.options[index].text);
    })
    addListenersToVehicles(i+1);
  }
}


/*
 O ARRAY vehicleModelArray É O RESPONSÁVEL EM ARMAZENAR TODOS OS VEÍCULOS QUE O USUÁRIO SELECIONOU.
 ELE ARMAZENA DINAMICAMENTE, O QUE SIGNIFICA QUE SE DEPOIS O USUÁRIO MUDAR, O ARRAY SE ADEQUA.

 Deu um puta trabalho =')
*/


//  EVITA QUE O FORMULÁRIO SEJA ENVIADO AUTOMATICAMENTE AO APERTAR A TECLA 'ENTER'
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('my-form');
  form.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          console.log('Enter pressionado. Formulário não enviado.');
          // Aqui você pode adicionar lógica adicional para lidar com a tecla Enter
      }
  });
});

let vinList = document.getElementById("vin-list");
vinList.addEventListener("change", (e) => {
  if(e.target.value !== "opt2"){
    console.log(e.target.value )
    let vinNumbers = document.getElementById("tags");
    vinNumbers.style.display = "none";
  }
  else{
    let vinNumbers = document.getElementById("tags");
    vinNumbers.style.display = "block";
    console.log(vinNumbers)
  }
})

let vinCode = document.querySelector("#tags input");
let vinCodeList = [];
vinCode.addEventListener("keyup", (e) => {
  if(e.key === "Enter"){
    let vin = document.createElement("p");
    console.log(e.target.value)
    vinCodeList.push(e.target.value);
    vin.textContent = e.target.value;
    vinCode.value = "";
    vin.classList.add("vin-code")          
    vin.style.cssText =
      "margin-top: 10px; " +
      "font-size: 15px; " +
      "margin-left: 10px; " +
      "padding: 5px; " +
      "background-color:rgba(52, 58, 39, 0.996); " +
      "color: white; " +
      "width: 150px; " +
      "text-align: center; " +
      "cursor: pointer; " +
      "border-radius: 10px; " +
      "font-family: 'Questrial'; " +
      "transition: background-color 0.3s ease, color 0.3s ease;"; // Adiciona transições suaves
    vin.classList.add("vin-code");
    vinCode.parentElement.appendChild(vin)


    let originalVinCode = vin.textContent;
    // Adiciona evento de mouseover para mudar a cor e o texto
    vin.addEventListener("mouseover", () => {
      vin.style.backgroundColor = "red";
      vin.textContent = "Remove";
      vin.style.color = "white"; // Para garantir que o texto seja legível
    });

    // Adiciona evento de mouseout para restaurar a cor e o texto original
    vin.addEventListener("mouseout", () => {
      vin.style.backgroundColor = "rgba(52, 58, 39, 0.996)";
      vin.textContent = originalVinCode;
      vin.style.color = "white"; // Restaura a cor original do texto
    });
    vin.addEventListener("click", ()=>{
      let filteredArray = vinCodeList.filter(x => x != originalVinCode);
      vinCodeList = [];
      vinCodeList = filteredArray;
      console.log("item removido: " + originalVinCode)
      vinCode.parentElement.removeChild(vin);
    })

  }
})

const textarea = document.querySelectorAll('.big-text-areas');

textarea.forEach((text) => {
  text.addEventListener("input", () => {
    text.style.height = "auto";
    text.style.height = text.scrollHeight + "px";
  })
})

let category = "none"

let a = document.getElementById("a")
let b = document.getElementById("b")
a.addEventListener("change", () =>{
  if(a.checked){
    if(b.checked){
      b.checked = false;
    }   
    activateCAN();
    category = "can"
  }
  else{
    if(b.checked === false){
      removeCANDID();
      category = "none"
    }
  }
})
b.addEventListener("change", () => {
  if(b.checked){
    if(a.checked){
      a.checked = false;
    }
    activateDID();
    category = "did"
  }
  else{
    if(a.checked === false){
      removeCANDID();
      category = "none"
    }
  }
})

function activateCAN(){
  let getOtherType = document.querySelectorAll(".triggerDID-div");
  if(getOtherType){
    getOtherType.forEach((x) => {
      if(x.style.display === "block"){
        x.style.display = "none";
      }
    })
  }
  
  let can = document.querySelectorAll(".triggerCAN-div")
  can.forEach((x) => {
    x.style.display = "block";
  })
  let buttons = document.getElementById("triggers-buttons");
  buttons.style.display = "flex"  
  document.getElementById("advice").style.display = "block"
}

function activateDID(){
  let getOtherType = document.querySelectorAll(".triggerCAN-div");
  if(getOtherType){
    getOtherType.forEach((x) => {
      if(x.style.display === "block"){
        x.style.display = "none";
      }
    })
  }
 
  let did = document.querySelectorAll(".triggerDID-div")
  did.forEach((x) => {
    x.style.display = "block";
  }) 
  let buttons = document.getElementById("triggers-buttons");
  buttons.style.display = "flex" 
  document.getElementById("advice").style.display = "block" 
}

function removeCANDID(){
  let getCAN = document.querySelectorAll(".triggerCAN-div");
  let getDIV = document.querySelectorAll(".triggerDID-div");

  getCAN.forEach((x)=>{
    x.style.display = "none";
  })
  getDIV.forEach((x)=>{
    x.style.display = "none";
  })

  let buttons = document.getElementById("triggers-buttons");
  buttons.style.display = "none"  

  document.getElementById("advice").style.display = "none"
}

function generateMoreTriggers(){
  const referenceNode = document.getElementById("triggers-number-li");
  if(category === "can"){
    const canNode = document.getElementsByClassName("triggerCAN-div");
    let clone = canNode[0].cloneNode(true);
    let referenceNodeInsert = document.getElementsByClassName("triggerDID-div")
    referenceNode.insertBefore(clone, referenceNodeInsert[0]);
  }
  else{
    if(category === "did"){
      const canNode = document.getElementsByClassName("triggerDID-div");
      let clone = canNode[0].cloneNode(true);
      let referenceNodeInsert = document.getElementById("advice")
      referenceNode.insertBefore(clone, referenceNodeInsert);
    }
  }
}

function removeMoreTriggers(){
  if(category === "can"){
    let canNodes = document.getElementsByClassName("triggerCAN-div");
    if(canNodes.length > 1){
      canNodes[0].parentElement.removeChild(canNodes[canNodes.length-1]);
    }
  }
  else{
    if(category === "did"){
      let didNodes = document.getElementsByClassName("triggerDID-div");
      if(didNodes.length > 1){
        didNodes[0].parentElement.removeChild(didNodes[didNodes.length-1]);
      }
    }
  }
}

const getAddTriggerButton = document.getElementById("trigger-button-add");
const getRemoveTriggerButton = document.getElementById("trigger-button-remove");

getAddTriggerButton.addEventListener("click", generateMoreTriggers);
getRemoveTriggerButton.addEventListener("click", removeMoreTriggers);

function getYear(model, identifier){
  fetch(`/vehicle-year/${model}`)
  .then(response => response.json())
  .then(data => {
    iteration = 1
    data.forEach((year)=>{
      let newOptions = document.createElement("option");

      let targetedSelect = document.getElementById("year-" + identifier)
      newOptions.textContent = year;
      newOptions.value = "opt" + iteration;
      newOptions.style.textAlign = "center";
      targetedSelect.appendChild(newOptions)
      
      iteration++
    })
  })
}

function getMaker(model, year, identifier){
  fetch(`/vehicle-maker/${model}/${year}`)
  .then(response => response.json())
  .then(data => {
    iteration = 1
    data.forEach((maker)=>{
      let newOptions = document.createElement("option");
      console.log("Fabricante: " + maker)
      let targetedSelect = document.getElementById("make-" + identifier)
      newOptions.textContent = maker;
      newOptions.value = "opt" + iteration;
      newOptions.style.textAlign = "center";
      targetedSelect.appendChild(newOptions)
      
      iteration++
    })
  })
}

function getSeries(model, year, maker, identifier){
  fetch(`/vehicle-series/${model}/${year}/${maker}`)
  .then(response => response.json())
  .then(data => {
    iteration = 1
    data.forEach((series)=>{
      if(series !== " " && series !== null && series !== ""){
        let newOptions = document.createElement("option");
        let targetedSelect = document.getElementById("modelSeries-" + identifier)
        newOptions.textContent = series;
        newOptions.value = "opt" + iteration;
        newOptions.style.textAlign = "center";
        targetedSelect.appendChild(newOptions)
        
        iteration++
      }
      else{}
    })
  })
}


function addListenersToVehicles(number){

    let modelSelect = document.getElementById("model-" + number);
    let yearSelect = document.getElementById("year-" + number);
    let makeSelect = document.getElementById("make-" + number);

    if(modelSelect){
      modelSelect.addEventListener("change", (e) => {
        if(e.target.value !== "opt"){ //Evita que a primeira opção seja a selecionada
          let index = e.target.selectedIndex;
          console.log("Index: " + index)
          let selectedItem = e.target.options[index].text
          console.log("SelectedItem: " + selectedItem)
          console.log("Identificador: " + modelSelect.id)
          console.log("ExtractKeyword: " + extractKeyword(modelSelect.id))
          getYear(selectedItem, extractKeyword(modelSelect.id))
        }
      })
    }

    if(yearSelect){
      yearSelect.addEventListener("change", (e) => {
        if(e.target.value !== "opt"){ //Evita que a primeira opção seja a selecionada
          let index = e.target.selectedIndex;
          console.log("Index: " + index)
          let selectedItem = e.target.options[index].text
          console.log("SelectedItem: " + selectedItem)
          console.log("Identificador: " + yearSelect.id)
          console.log("ExtractKeyword: " + extractKeyword(yearSelect.id))
          console.log("ExtractedKeyword for Array: " + (extractKeyword(yearSelect.id)-1))
          getMaker(vehicleModelArray.get((extractKeyword(yearSelect.id)-1)), selectedItem, extractKeyword(yearSelect.id))
        }
      })
    }

    if(makeSelect){
      makeSelect.addEventListener("change", (e) => {
        if(e.target.value !== "opt"){ //Evita que a primeira opção seja a selecionada
          let index = e.target.selectedIndex;
          console.log("Index: " + index)
          let selectedItem = e.target.options[index].text
          console.log("SelectedItem: " + selectedItem)
          console.log("Identificador: " + makeSelect.id)
          console.log("ExtractKeyword: " + extractKeyword(makeSelect.id))
          console.log("ExtractedKeyword for Array: " + (extractKeyword(makeSelect.id)-1))
          getSeries(vehicleModelArray.get((extractKeyword(makeSelect.id)-1)), vehicleYearArray.get((extractKeyword(yearSelect.id)-1)), selectedItem, extractKeyword(yearSelect.id))
        }
      })
    }
  }