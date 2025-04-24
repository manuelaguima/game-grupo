const logo = document.getElementById('logo')
const fade = document.getElementById('fade-in-out')
const div = document.getElementById('div')
const ceu = document.getElementById('ceu')
const carro = document.getElementById('carro')
const radios = document.getElementsByName('char')
const alertText = document.getElementById('alert')
let chosenChar;

// INPUT ANIMATIONS

const input1 = document.getElementById('first-input')
const input2 = document.getElementById('second-input')
const input3 = document.getElementById('third-input')
const input4 = document.getElementById('fourth-input')

// BUTTON ANIMATIONS
const selectButton = document.getElementById('select-button')
const backButton = document.getElementById('a-back')
const startButton = document.getElementById('button-start')

// TEXT BOX ANIMATIONS
const firstBox = document.getElementById('first-box')
const secondBox = document.getElementById('second-box')
const thirdBox = document.getElementById('third-box')
const fourthBox = document.getElementById('fourth-box')

activateAnimation.addEventListener("click", ()=>{   

    let foundChecked = false;
    
    for (let i=0; i<4; i++) {  
        if (radios[i].checked) {  
            
            chosenChar = radios[i].value;  
            input1.classList.toggle('input-anim')
            firstBox.classList.toggle('textbox-animate2')
            selectButton.classList.toggle('opacity-anim')
            backButton.classList.toggle('opacity-anim')
            
            alertText.innerHTML = " "
            const timeoutId = setTimeout(()=>{
                franciscoAnimateOut()
            }, 300)

            foundChecked = true;
            break;
        }
    } 

    if (foundChecked == false) { 

        console.log('Selecione um personagem antes!')
        alertText.innerHTML = "Selecione um personagem antes!"
    }
})

function franciscoAnimateOut(){
    
    input2.classList.toggle('input-anim')
    secondBox.classList.toggle('textbox-animate2')
    
    timeoutId = setTimeout(()=>{
        jfAnimateOut()
    }, 300)
}
function jfAnimateOut(){
    
    input3.classList.toggle('input-anim')
    thirdBox.classList.toggle('textbox-animate2')
    
    timeoutId = setTimeout(()=>{
        manuAnimateOut()
    }, 300)
}
function manuAnimateOut(){
    
    fourthBox.classList.toggle('input-anim' )
    input4.classList.toggle('input-anim')
    backButton.classList.toggle('display-none')
    logo.classList.toggle('opacity-anim2')
    selectButton.classList.toggle('display-none')
    
    timeoutId = setTimeout(()=>{
        animateBg()
    }, 2800)
}
function animateBg(){
    
    carro.classList.toggle('carro-animate')
    
    timeoutId = setTimeout(()=>{
        fadeIn()
    }, 2500)
}   
function fadeIn(){
    
    fade.classList.toggle('fade-in')
    
    timeoutId = setTimeout(()=>{
        fadeOut()
    }, 5000)
}

function fadeOut(){
    
    ceu.classList.toggle('ceu-anim')
    ceu.classList.toggle('ceu-stop')
    div.classList.toggle('div-stop')
    document.getElementById(chosenChar).classList.toggle('char-move')
    startButton.classList.toggle('button-start-display')
    carro.classList.toggle('carro-animate2')
    
    fade.classList.toggle('fade-in')
    fade.classList.toggle('fade-out')
    
    timeoutId = setTimeout(()=>{
        startAnimate()
    }, 2000)
}

function startAnimate(){
    
    startButton.classList.toggle('ocapity-anim3')
    startButton.classList.toggle('display-block')
}