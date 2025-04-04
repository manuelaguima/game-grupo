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
class Bullet extends obj{
    speed = 10
    clickx = -20
    clicky = -20
    
    des_bullet_img() {
        
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
    mov_bullet() {
        let dxb = this.clickx - (this.x + this.w / 2)
        let dyb = this.clicky - (this.y + this.h / 2)
        let angulo = Math.atan2(dyb, dxb)

        this.y += this.speed * Math.sin(angulo)
        this.x += this.speed * Math.cos(angulo) 
    }
    
}