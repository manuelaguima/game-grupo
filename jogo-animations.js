const logo = document.getElementById('logo')
const firstBox = document.getElementById('first-box')
const secondBox = document.getElementById('second-box')
const thirdBox = document.getElementById('third-box')
const fourthBox = document.getElementById('fourth-box')

function animateGame(){
    
    firstBox.animate([{
        transform: "translateY(0)"
    }, 
    {
        transform: "translateY(800px)"
    }
], {

})
}