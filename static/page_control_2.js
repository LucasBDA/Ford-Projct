
let select = document.getElementById("model")
fetch("/vehicle-models")
  .then(response => response.json())
  .then(data => {    
    iteration = 1
    data.forEach((model)=>{
      let options = document.createElement("option");
      select.appendChild(options);
      options.textContent = model;
      options.value = "opt" + iteration;
      iteration++
    })
  })

select.addEventListener("change", (item) => {
  let selectionIndex  = select.selectedIndex
  let modelSelected = select.options[selectionIndex].text
  console.log(modelSelected)
  getYear(modelSelected)
})

function getYear(model){
  createVinYearField()
  fetch(`/vehicle-models/${model}`)
  .then(response => response.json())
  .then(data => {
    iteration = 1
    data.forEach((year)=>{
      let newOptions = document.createElement("option");

      let targetedSelect = document.getElementById("year-list")

      if(iteration == 1){
        newOptions.textContent = "Select one";
        newOptions.value = "opt"
        targetedSelect.appendChild(newOptions)
      }
      else{
        newOptions.textContent = year;
        newOptions.value = "opt" + iteration;
        targetedSelect.appendChild(newOptions)
      }
      
      iteration++
    })
  })
}

function createVinYearField(){
  //Campos da lista
  checkAllYearFields = document.querySelectorAll(".year-class")
  if(checkAllYearFields){
    checkAllYearFields.forEach((element)=>{
      element.parentNode.removeChild(element)
    })
  }
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
  let referenceItem = document.getElementById("feature-codes")

  referenceItem.parentNode.insertBefore(newItemInList, referenceItem)
  newItemInList.appendChild(newH3)
  newItemInList.appendChild(newSelect)
}


let vinYes = document.getElementById("vin-yes")
let vinNo = document.getElementById("vin-no")
vinYes.addEventListener("change", () => {
  if(vinYes.checked){
    let vinListField = document.getElementById("vin-list-li")
    let modelField = document.getElementById("model-li")
    vinListField.setAttribute("style", "display: flex;");
    modelField.setAttribute("style", "display: flex;");
  }
  else{
    let vinListField = document.getElementById("vin-list-li")
    let modelField = document.getElementById("model-li")
    vinListField.setAttribute("style", "display: none;");
    modelField.setAttribute("style", "display: none;");

    let selectField = document.getElementById("vin-list")
    let selectField_2 = document.getElementById("model")
    selectField.selectedIndex = 0
    selectField_2.selectedIndex = 0

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
    let modelField = document.getElementById("model-li")
    vinListField.setAttribute("style", "display: none;");
    modelField.setAttribute("style", "display: none;");

    let selectField = document.getElementById("vin-list")
    let selectField_2 = document.getElementById("model")
    selectField.selectedIndex = 0
    selectField_2.selectedIndex = 0

    checkAllYearFields = document.querySelectorAll(".year-class")
    if(checkAllYearFields){
      checkAllYearFields.forEach((element)=>{
        element.parentNode.removeChild(element)
      })
    }
  }
})


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

let numberOfDigits = 0;
let vinNumber = [];
document.getElementById('tags-input').addEventListener('input', function(e) {
  if (this.value.length % 17 === 0 && this.value.length !== 0) {
    console.log('17 dígitos digitados!');
    console.log(this.value);
    let newTagDiv = document.createElement("div")
    let newTag = document.createElement("p")
    let newTagButton = document.createElement("button")
    newTagButton.textContent = "Teste"
    newTag.textContent = this.value
    let referenceItem = document.getElementById("tags")
    referenceItem.parentNode.insertBefore(newTagDiv, referenceItem)
    newTagDiv.appendChild(newTagButton)
    newTagDiv.appendChild(newTag)
  }
  /*
  if(numberOfDigits == 17){
    console.log(vinNumber)
    let newTag = document.createElement("p")
    newTag.textContent = "Teste"
    let referenceItem = document.getElementById("tags")
    referenceItem.parentNode.insertBefore(newTag, referenceItem)
    numberOfDigits = 0
  }
  */
});