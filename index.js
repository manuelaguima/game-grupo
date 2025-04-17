

let des = document.getElementById('des').getContext('2d')
const rect = des.canvas.getBoundingClientRect()
let mouseX = 0;
let mouseY = 0;
moving = false

let jogador = 'arthur'

let player = new Player(225,225,40,40,`./img/${jogador}/${jogador}-upview.png` )
let enemyspawn = new enemyspawer()
let enemyspawn1 = new enemyspawer()
let enemyspawn2 = new enemyspawer()
let enemyspawn3 = new enemyspawer()
let enemyspawn4 = new enemyspawer()
let enemyspawn5 = new enemyspawer()
let marker = new Marker(20,20,20,20, './img/marker.png' )
let baseball = new Baseball(225,225,50,50,'./img/baseball-bat.png' )
let ammotext = new Text()

let health = new Health(0,0,120,120,`./img/${jogador}/${jogador}-a01.png`)
let road = new Background(0,0,1024,768,`./img/estrada1.png`)
let medkit = new Medkit(140,140,40,40,`./img/medkit.png`)

let c1 = new obj(689, 868, 100, 45, './assets/carro2.png')
let c2 = new obj(528, 691, 100, 45, './assets/carro1.png')

let btn1 = new  btn(20,20, 120,120, "./img/arthur/arthur-a01.png")
let btn2 = new  btn(150,20, 120,120, "./img/francisco/francisco-a01.png")
let btn3 = new  btn(20,150, 120,120, "./img/jf/jf-a01.png")
let btn4 = new  btn(150,150, 120,120, "./img/manu/manu-a01.png")

let musica = new Audio('./img/konton.mp3')
let shoot = new Audio('./pistol.mp3')

playing = 0

document.addEventListener('keydown',(e)=>{
    if(e.key === 'w'){
        player.ydir = -5
    }else if(e.key === 's'){
        player.ydir = 5
    }
    if(e.key === 'a'){
        player.xdir = -5
    }else if(e.key === 'd'){
        player.xdir = 5
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
    if (playing == 1){
        const originX = player.x + player.w / 2 - 12 / 2
        const originY = player.y + player.h / 2 - 12 / 2
        if(jogador ==  "arthur" || jogador == "francisco"){
            player.shoot(originX, originY, clickX, clickY)  
        } else if (jogador == "jf"){
            baseball.active_desactivate(originX, originY,marker.x,marker.y)
        }
    }
    else if (playing == 0){
        if(btn1.colisao(clickX, clickY)){
            jogador = 'arthur'
            playing = 1
        }else if(btn2.colisao(clickX, clickY)){
            jogador = 'francisco'
            playing = 1
        }else if(btn3.colisao(clickX, clickY)){
            jogador = 'jf'
            playing = 1
        }else if(btn4.colisao(clickX, clickY)){
            jogador = 'manu'
            playing = 1
        }
        player.a = `./img/${jogador}/${jogador}-upview.png`
    }
    
})

function colisao(){
    if(playing == 1){
        for(let i = enemyspawn.enemys.length - 1; i >= 0; i--){
            if(enemyspawn.enemys[i] && enemyspawn.enemys[i].colid(player)){
                health.vida -= 1
                enemyspawn.enemys.splice(i, 1)
            }
            if(baseball.active == false && baseball.colid(enemyspawn.enemys[i])){
                enemyspawn.enemys.splice(i, 1)
            }
        }
        for(let i = player.bullets.length - 1; i >= 0; i--){
            for(let j = enemyspawn.enemys.length - 1; j >= 0; j--){
                if(enemyspawn.enemys[j] && player.bullets[i] && enemyspawn.enemys[j].colid(player.bullets[i])){
                    enemyspawn.enemys.splice(j, 1)
                    player.bullets.splice(i, 1)
                }
            }
        }
        if (medkit.active){
            if(player.colid(medkit)){
                health.vida += 1
                medkit.active = false
            }
        }
    }     
}
function desenha(){
    road.des_background_img()
    if (playing == 1){
        player.des_img()
        for(let i = 0; i < player.bullets.length; i++){
            player.bullets[i].des_bullet_img()
        }
        for(i = 0; i< enemyspawn.enemys.length; i++){
            enemyspawn.enemys[i].des_enemy_img()
        }
        health.des_health_img()
        baseball.des_bat_img(player.x, player.y)
        if(player.ammo == 0){
            ammotext.des_text("Reloading...", 120, 60,"black","12px Daydream" )
        } else{
            ammotext.des_text("Ammo: " + player.ammo, 120, 60,"black","12px Daydream" )
        }
        medkit.des_medkit_img()
    } 
    else if (playing == 0){
        btn1.des_btn_img()
        btn2.des_btn_img()
        btn3.des_btn_img()
        btn4.des_btn_img()
    }
    marker.des_marker_img()
}
function atualiza(){
    if (playing == 1){
        musica.play()
        enemyspawn.atulizar_timer()
        enemyspawn1.atulizar_timer()
        enemyspawn2.atulizar_timer()
        enemyspawn3.atulizar_timer()
        enemyspawn4.atulizar_timer()
        enemyspawn5.atulizar_timer()
        for(i = 0; i< enemyspawn.enemys.length; i++){
            enemyspawn.enemys[i].rivalx = player.x
            enemyspawn.enemys[i].rivaly = player.y
        }
        player.mov_carro()
        for(i = 0; i< player.bullets.length; i++){
            player.bullets[i].mov_bullet()
        }
        for(i = 0; i< enemyspawn.enemys.length; i++){
            enemyspawn.enemys[i].mov_enemy()
        }
        if (medkit.active == false && medkit.respawing == false && health.vida < 3){
            medkit.respawing = true
            setTimeout(medkit.respawn_medkit(),3000)
        }
    colisao()
    }
    
    
}
function main(){
    des.clearRect(0,0,1024,768)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
main()