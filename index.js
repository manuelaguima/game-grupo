

let des = document.getElementById('des').getContext('2d')
const rect = des.canvas.getBoundingClientRect()
let mouseX = 0;
let mouseY = 0;
moving = false

let player = new Player(225,225,40,40, './img/arthur-upview.png' )
let bullet = new Bullet(-20,-20,12,12, './img/bullet.png' )
let marker = new Marker(20,20,20,20, './img/marker.png' )

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
    player.mouseX = e.clientX - rect.left
    player.mouseY = e.clientY - rect.top
    marker.x = e.clientX - rect.left
    marker.y = e.clientY - rect.top
}
document.addEventListener("click", function (e) {
    bullet.clickx = e.clientX - rect.left
    bullet.clicky= e.clientY - rect.top
    bullet.x = player.x
    bullet.y = player.y
})
function desenha(){
    player.des_img()
    bullet.des_bullet_img()
    marker.des_marker_img()
}
function atualiza(){
    player.mov_carro()

    if ((bullet.x < 420) || (bullet.x > 0)){
        if ((bullet.y < 690) || (bullet.y > 0)){
            bullet.mov_bullet()
        }
    }
    
}
function main(){
    des.clearRect(0,0,420,690)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
main()