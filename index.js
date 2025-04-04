

let des = document.getElementById('des').getContext('2d')
let mouseX = 0;
let mouseY = 0;


let player = new Player(225,225,40,40, './img/arthur-upview.png' )

document.addEventListener('keydown',(e)=>{
    if(e.key === 'w'){
        player.ydir = -7
    }else if(e.key === 's'){
        player.ydir = 7
    }
    if(e.key === 'a'){
        player.xdir = -7
    }else if(e.key === 'd'){
        player.xdir = 7
    }
})
document.addEventListener('keyup', (e)=>{
    if((e.key === 'w') || (e.key === 's')){
        player.ydir = 0
    }if((e.key === 'a') || (e.key === 'd')){
        player.xdir = 0
    }
})

document.onmousemove = function (e) {
    const rect = des.canvas.getBoundingClientRect()
    player.mouseX = e.clientX - rect.left
    player.mouseY = e.clientY - rect.top
}

function desenha(){
    player.des_img()
}
function atualiza(){
    player.mov_carro()
    
}
function main(){
    des.clearRect(0,0,420,690)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
main()