class obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
} 
class Player extends obj {
    ydir = 0
    xdir = 0
    mouseX = 0
    mouseY = 0
    vida = 3
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.img = new Image()
        this.img.src = a
    }

    des_img() {
        let dx = this.mouseX - (this.x + this.w / 2)
        let dy = this.mouseY - (this.y + this.h / 2)
        let angle = Math.atan2(dy, dx)

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
        } else if (this.y >= 648) {
            this.y = 648
        }
        this.x += this.xdir
        if (this.x <= 2) {
            this.x = 2
        } else if (this.x >= 382) {
            this.x = 382
        }
    }
}
class Bullet extends obj {
    speed = 10
    clickx = -90
    clicky = -90
    angle = 0
    

    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.img = new Image()
        this.img.src = a
        this.active = false 
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

        if (this.x < 0 || this.x > 420 || this.y < 0 || this.y > 690) {
            this.active = false
        }
    }

    shoot(originX, originY, targetX, targetY) {
        this.x = originX
        this.y = originY
        this.angle = Math.atan2(targetY - originY, targetX - originX)
        this.active = true
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
    speed = 2
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
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
        this.y = Math.floor(Math.random() * ((680 - 2 + 1) + 2))
    }
}
class Health extends Player{
    vida = 3
    frame = 1
    tempo = 0
    des_health_img() {
        this.tempo +=1
        if(this.tempo > 48){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>2){
            this.frame=1
        }
        let img = new Image()
        if (this.vida >= 3){
            this.a = `./img/arthur/arthur-a0${this.frame}.png`
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        } else if (this.vida == 2){
            this.a = `./img/arthur/arthur-b0${this.frame}.png`
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        } else if (this.vida <= 1){
            this.a = `./img/arthur/arthur-c0${this.frame}.png`
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
}