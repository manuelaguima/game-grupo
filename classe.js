class obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    colid(objeto){
        return (
            this.x < objeto.x + objeto.w &&
            this.x + this.w > objeto.x &&
            this.y < objeto.y + objeto.h &&
            this.y + this.h > objeto.y
        )
    }
} 
class Player extends obj {
    reloading = false
    direction = 0
    randangle = 0
    ammomax = 6
    ammo = this.ammomax
    tempo = 0
    ydir = 0
    xdir = 0
    mouseX = 0
    mouseY = 0
    vida = 3
    pontos = 0
    img = new Image()

    bullets = []

    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
    }
    des_img() {
        
        this.a = `./img/${jogador}/${jogador}-upview.png`
        this.img.src = this.a

        let dx = this.mouseX - (this.x + this.w / 2)
        let dy = this.mouseY - (this.y + this.h / 2)
        let angle = Math.atan2(dy, dx)
        
        if (this.tempo> 0){
            this.tempo-=1
        }
        if(this.reloading==true && this.tempo == 0){
            this.ammo = this.ammomax
            this.reloading = false
        }
        des.save()
        des.translate(this.x + this.w / 2, this.y + this.h / 2)
        des.rotate(angle)
        des.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h)
        des.restore()
    }

    mov_carro() {
        this.y += this.ydir 
        if (this.y <= 2) {
            this.y = 2
        } else if (this.y >= 745) {
            this.y = 745
        }
        this.x += this.xdir
        if (this.x <= 2) {
            this.x = 2
        } else if (this.x >= 1020) {
            this.x = 1016
        }
    }
    shoot(originX, originY, targetX, targetY) {
        console.log(this.tempo)
        if (this.tempo == 0 && this.ammo != 0){
        this.angulo = Math.atan2(targetY - originY, targetX - originX);
            if(jogador == "arthur"){
                const bullet = new Bullet(originX, originY, 12, 12, './img/bullet.png', this.angulo, 60);
                this.bullets.push(bullet);
                this.tempo = 24
                this.ammo -= 1
            } else if (jogador == "francisco") {
                for(i=0; i<=3;i++){
                    this.randangle = Math.random() * 0.25
                    this.direction = Math.floor(Math.random() * ((2 - 1 + 1) + 1))
                    if(this.direction % 2 == 0){
                        this.randangle = this.randangle * -1 
                    }
                    const bullet = new Bullet(originX, originY, 12, 12, './img/shotgun_shell.png', this.angulo + (this.randangle), 20);
                    this.bullets.push(bullet);
                    this.ammo -= 1
                }
                this.ammo -= 1
                this.tempo = 48
                
            } else if (jogador == 'manu'){
                const bullet = new Bullet(originX, originY, 12, 12, './img/knife.png', this.angulo, 60);
                this.bullets.push(bullet);
                this.tempo = 24
                this.ammo -= 1
            }
            if( this.ammo<=0){
                this.tempo += 200
                this.reloading = true
            }
            
        }
        
    }
}
class Bullet extends obj {
    speed = 12
    active = true
    dintacia = 0
    range = 0
    constructor(x, y, w, h, a,angle,range) {
        super(x, y, w, h, a)
        this.angle = angle
        this.range = range
        this.img = new Image()
        this.img.src = a
        this.active = true
    }
    des_bullet_img() {
        if (!this.active) return;
        des.save()
        des.translate(this.x + this.w / 2, this.y + this.h / 2)
        des.rotate(this.angle)
        des.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h)
        des.restore()
    }
    
    mov_bullet() {
        if (jogador ==  "arthur"){
            this.speed = 24
        }
        if (!this.active) return;
        this.x += this.speed * Math.cos(this.angle)
        this.y += this.speed * Math.sin(this.angle)
        this.dintacia+=1
        
        console.log(this.dintacia)
        if (this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 768 || this.dintacia >= this.range) {
            player.bullets.splice(i, 1)
        }
    }


}
class Baseball extends obj {
    time = 0
    active = false
    angle = 0
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.img = new Image()
        this.img.src = a
        this.active = false
    }
    get_angle(originX,originY,targetX,targetY){
        this.angle = Math.atan2(targetY - originY, targetX - originX);
    }
    des_bat_img(centerx,centery) {
        if (!this.active) return;
        des.save()
        this.x = centerx
        this.y = centery
        centerx += 25 * Math.cos(this.angle)
        centery += 25 * Math.sin(this.angle)
        this.x = centerx
        this.y = centery
        des.translate(centerx +  40 / 2, centery + 40 / 2)
        des.rotate(this.angle)
        des.drawImage(this.img, -this.w / 2, -this.h / 2, this.w , this.h)
        des.restore()
    }
    active_desactivate(originX,originY,targetX,targetY){
        this.active = true
        setTimeout(() => {
            this.active = false
        }, 450);
    }

}
class Marker extends obj{
    des_marker_img() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
}
class enemyspawer{
    timer = 0
    cap = 100
    coinflip = 0
    OriginX = 0
    OriginY = 0
    enemys = []
    atulizar_timer(){
        this.timer+= 1
        console.log(this.timer)
        if(this.timer >= this.cap){
            console.log("foi")
            this.timer = 0
            this.coinflip = Math.floor(Math.random() * ((2 - 1 + 1) + 1))
            if(this.coinflip == 2){
                this.OriginX = 0
            } else{
                this.OriginX = 1034
            }
            this.coinflip = Math.floor(Math.random() * ((2 - 1 + 1) + 1))
            if(this.coinflip == 2){
                this.OriginY = 0
            } else{
                this.OriginY = 768
            }
            const enemy = new Enemy(this.OriginX, this.OriginY, 40, 40, './img/normalzombie-enemy.png');
            this.enemys.push(enemy)
        }
    }
}
class Enemy extends obj{
    speed = 3
    rivalx = 20
    rivaly = 20
    active = true
    respawing = false
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.img = new Image()
        this.img.src = a
    }

    des_enemy_img() {
        let dx = this.rivalx - (this.x + this.w / 2)
        let dy = this.rivaly - (this.y + this.h / 2)
        let angle = Math.atan2(dy, dx)

        des.save()
        des.translate(this.x + this.w / 2, this.y + this.h / 2)
        des.rotate(angle)
        des.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h)
        des.restore()
    }
    mov_enemy(){
        let dx = this.rivalx - (this.x + this.w / 2) + player.w/2
        let dy = this.rivaly - (this.y + this.h / 2) + player.h/2
        let angle = Math.atan2(dy, dx)

        this.y += this.speed * Math.sin((angle))
        this.x += this.speed * Math.cos((angle)) 
    }
}
class Health extends Player{
    vida = 3
    frame = 1
    tempo = 0
    des_health_img() {
        this.tempo +=1
        if(this.tempo > 100){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>2){
            this.frame=1
        }
        let img = new Image()
        if (this.vida >= 3){
            this.a = `./img/${jogador}/${jogador}-a0${this.frame}.png`
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        } else if (this.vida == 2){
            this.a = `./img/${jogador}/${jogador}-b0${this.frame}.png`
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        } else if (this.vida == 1){
            this.a = `./img/${jogador}/${jogador}-c0${this.frame}.png`
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        } else if (this.vida <= 0){
            this.a = `./img/dead-char.png`
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        }
    }
}

class Medkit extends obj{
    active = true
    respawing = false
    des_medkit_img() {
        if (!this.active) return;
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
}
class Background extends obj{
    des_background_img() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
}
class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}