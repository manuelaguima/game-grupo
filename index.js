

let des = document.getElementById('des').getContext('2d')
const rect = des.canvas.getBoundingClientRect()
let mouseX = 0;
let mouseY = 0;
moving = false

let player = new Player(225,225,40,40, './img/arthur/arthur-upview.png' )
let bullet = new Bullet(-20,-20,12,12, './img/bullet.png' )
let marker = new Marker(20,20,20,20, './img/marker.png' )
let enemy = new Enemy(225,625,40,40, './img/normalzombie-enemy.png' )
let health = new Health(0,0,120,120,"./img/arthur/arthur-a01.png")

let btn1 = new  btn(20,20, 120,120, "./img/arthur/arthur-a01.png")
let btn2 = new  btn(150,20, 120,120, "./img/arthur/arthur-a01.png")
let btn3 = new  btn(20,150, 120,120, "./img/arthur/arthur-a01.png")
let btn4 = new  btn(150,150, 120,120, "./img/arthur/arthur-a01.png")

playing = 1

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
function colisao(){
    if(playing == 1){
        if (enemy.active == true){
            if(player.colid(enemy)){
                health.vida -= 1
                enemy.active = false
            }
            else if(bullet.colid(enemy)){
                enemy.active = false
                bullet.active = false
            }
        }
    }     
}
function desenha(){
    if (playing == 1){
        player.des_img()
        enemy.des_enemy_img()
        bullet.des_bullet_img()
        marker.des_marker_img()
        health.des_health_img()
    } 
    else if (playing == 0){
        btn1.des_btn_img()
        btn2.des_btn_img()
        btn3.des_btn_img()
        btn4.des_btn_img()
    }
}
function atualiza(){
    if (playing == 1){
        enemy.rivalx = player.x
        enemy.rivaly = player.y
        enemy.mov_enemy()
        player.mov_carro()
        bullet.mov_bullet()
        if (enemy.active == false && enemy.respawing == false){
            enemy.respawing = true
            setTimeout(enemy.respawn_enemy(),3000)
        }
    colisao()
    }
    else if(playing == 0){

    }
    
}
function main(){
    des.clearRect(0,0,420,690)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
main()