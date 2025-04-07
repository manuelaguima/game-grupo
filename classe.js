class obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
} 
class Player extends obj {
    ydir = 0
    xdir = 0
    mouseX = 0
    mouseY = 0

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
    speed = 3
    rivalx = 20
    rivaly = 20
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
        let dx = this.rivalx - (this.x + this.w / 2)
        let dy = this.rivaly - (this.y + this.h / 2)
        let angle = Math.atan2(dy, dx)

        this.y += this.speed * Math.sin((angle))
        this.x += this.speed * Math.cos((angle)) 
    }
}