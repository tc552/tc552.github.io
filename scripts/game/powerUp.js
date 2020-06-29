class PowerUp {
    constructor(img, x, y, speed, powerUpWidth, powerUpHeight, type, imgSecondary = null) {
        this.img = img;
        this.x  = x;
        this.y = y;
        this.speed = speed;
        this.originalSpeed = speed;
        this.powerUpWidth = powerUpWidth;
        this.powerUpHeight = powerUpHeight;
        this.type = type;

        this.characterWidth = powerUpWidth;
        this.characterHeight = powerUpHeight;

        this.imgSecondary = imgSecondary;

        this.visible = true;
        this.picked = false;
    }

    display() {
        if (this.visible) {
            image(this.img, this.x, this.y, this.powerUpWidth, this.powerUpHeight);
        }
    }

    move() {
        this.x = this.x - this.speed;
    }

    stop() {
        this.speed = 0;
    }

    restart() {
        this.speed = this.originalSpeed;
        this.move();
    }

    getPicked() {
        this.picked = true;
        
        if (this.type === typeCrossword && this.imgSecondary != null && this.imgSecondary != undefined) {
            this.img = this.imgSecondary;
        }
        else {
            this.visible = false;
        }
    }
}