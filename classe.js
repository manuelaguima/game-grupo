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
    ammo = 8
    tempo = 0
    ydir = 0
    xdir = 0
    mouseX = 0
    mouseY = 0
    vida = 3
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
            this.ammo = 8
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
            const bullet = new Bullet(originX, originY, 12, 12, './img/bullet.png', this.angulo);
            this.bullets.push(bullet);
            this.tempo = 24
            this.ammo -= 1
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

    constructor(x, y, w, h, a, angle) {
        super(x, y, w, h, a)
        this.angle = angle
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
        if (!this.active) return;
        this.x += this.speed * Math.cos(this.angle)
        this.y += this.speed * Math.sin(this.angle)
        if (this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 768) {
            player.bullets.splice(i, 1)
        }
    }


}

class Marker extends obj{
    des_marker_img() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
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
        if (!this.active) return;
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
        if (!this.active) return;
        let dx = this.rivalx - (this.x + this.w / 2) + player.w/2
        let dy = this.rivaly - (this.y + this.h / 2) + player.h/2
        let angle = Math.atan2(dy, dx)

        this.y += this.speed * Math.sin((angle))
        this.x += this.speed * Math.cos((angle)) 
    }
    respawn_enemy(){
        this.active = true
        this.respawing = false
        this.x = Math.floor(Math.random() * ((1024 - 2 + 1) + 2))
        this.y = Math.floor(Math.random() * ((768 - 2 + 1) + 2))
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

class btn extends obj{

    des_btn_img() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
    colisao(clickX, clickY){
        if(clickX>this.x && clickX< this.x + this.w ){
            if(clickY>this.y && clickY< this.y + this.h){
                return true;        
            }
        }
        return false;
    }
}

class Medkit extends obj{
    active = true
    respawing = false
    x = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    y = Math.floor(Math.random() * ((680 - 2 + 1) + 2))
    des_medkit_img() {
        if (!this.active) return;
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
    respawn_medkit(){
        this.active = true
        this.respawing = false
        this.x = Math.floor(Math.random() * ((1015 - 2 + 1) + 2))
        this.y = Math.floor(Math.random() * ((760 - 2 + 1) + 2))
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