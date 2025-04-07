

let des = document.getElementById('des').getContext('2d')
const rect = des.canvas.getBoundingClientRect()
let mouseX = 0;
let mouseY = 0;
moving = false

let player = new Player(225,225,40,40, './img/arthur-upview.png' )
let bullet = new Bullet(-20,-20,12,12, './img/bullet.png' )
let marker = new Marker(20,20,20,20, './img/marker.png' )
let enemy = new Enemy(225,225,40,40, './img/arthur-upview.png' )
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
    marker.x = (e.clientX - rect.left) - (marker.w/2)
    marker.y = (e.clientY - rect.top) - (marker.h/2)
}
document.addEventListener("click", function (e) {
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    const originX = player.x + player.w / 2 - bullet.w / 2
    const originY = player.y + player.h / 2 - bullet.h / 2
    bullet.shoot(originX, originY, clickX, clickY)
})
function desenha(){
    player.des_img()
    enemy.des_enemy_img()
    bullet.des_bullet_img()
    marker.des_marker_img()
}
function atualiza(){
    enemy.rivalx = player.x
    enemy.rivaly = player.y
    enemy.mov_enemy()
    player.mov_carro()
    bullet.mov_bullet()
    
}
function main(){
    des.clearRect(0,0,420,690)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
main()