//ESSE CÓDIGO SERVE PARA DETECTAR TODOS OS INPUTS DE DADOS DE CADA TÓPICO

//Authentication-START
const authentication = document.getElementById("User-Authentication");//
let inputs = authentication.querySelectorAll("input");//
let validate_authentication = "neutral";//
inputs.forEach((input) => {
    input.addEventListener("change", () => {
        validate_authentication = checkFields(authentication, "input")//
        if(validate_authentication === true){//
            const previousImage = document.getElementById("authentication").querySelector("img")//
            if(previousImage){ 
                document.getElementById("authentication").removeChild(previousImage)//
                document.getElementById("authentication").nextElementSibling.removeChild(document.getElementById("authentication").nextElementSibling.querySelector(".warning"))//
            }
        }
    })
})


//Função de clicar no botão de dropdown e verificar se tudo foi preenchido
let arrow_icons = authentication.querySelectorAll("span");//
arrow_icons.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if(validate_authentication === false){
            createExclamationMark(arrow)
        }
    })
})
//Authentication-END


//Request-Clarification-START
const requestClarification = document.getElementById("Request-Clarification");//
let validate_fields = "neutral"
const fields = document.getElementById("Request-Clarification").querySelectorAll('input[type="text"], textarea, input[type="date"], select');
fields.forEach((field) => {
    field.addEventListener("change", () => {
        validate_fields = checkFields(requestClarification, 'input[type="text"], textarea, input[type="date"], select')
        if(validate_fields === true){
            const previousImage = document.getElementById("request-clarification").querySelector("img")//
            if(previousImage){ 
                document.getElementById("request-clarification").removeChild(previousImage)//
                document.getElementById("request-clarification").nextElementSibling.removeChild(document.getElementById("request-clarification").nextElementSibling.querySelector(".warning"))//
            }
        }
    })
})

//Função de clicar no botão de dropdown e verificar se tudo foi preenchido
arrow_icons = null;
arrow_icons = requestClarification.querySelectorAll("span");//
arrow_icons.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if(validate_fields === false){
            createExclamationMark(arrow)
        }
    })
})
//Request-Clarification-END


//Função generalizada para criar a exclamação de aviso que o tópico não foi bem preenchido
function createExclamationMark(referenceNode){
    const previousImage = referenceNode.parentElement.querySelector("img")
    const previousText = referenceNode.parentElement.nextElementSibling.querySelector(".warning")
    if(previousImage){ //Se a imagem já existir, deleta pra criar outra por cima
        referenceNode.parentElement.removeChild(previousImage)
    }
    if(previousText){
        referenceNode.parentElement.nextElementSibling.removeChild(previousText)
    }
    const image = document.createElement("img");
    image.src = "/static/exclamation.png"
    image.style.width = "40px";
    image.style.height = "30px";
    image.style.marginBottom = "-5px";
    image.style.marginLeft = "-10px";
    image.style.overflow = "fixed"
    image.classList.add("exclamation-mark")
    image.classList.add("tremor")
    referenceNode.parentElement.appendChild(image);

    const text = document.createElement("p")
    text.textContent = "Please fullfil all blank fields."
    text.style.color = "rgb(214, 217, 17)"
    text.style.marginLeft = "30px"
    text.classList.add("warning")
    referenceNode.parentElement.nextElementSibling.insertBefore(text, referenceNode.parentElement.nextElementSibling.firstChild);

    setTimeout(function() {
        image.classList.remove("tremor")
      }, 1000*1);    
}


//Função generalizada para verificar se o tópico foi devidamente preenchido
const checkFields = (node, dataType) => {
    const data = node.querySelectorAll(dataType);
    for (let i = 0; i < data.length; i++) {
        const x = data[i];
        if (x.value.trim() === "") {
            console.log("O nó [" + x.name + "] NÃO foi preenchido!")
            return false;
        }
    }
    return true;
};