class Enemy extends Animation {
    constructor(positionMatrix, img, x, offsetY, characterWidth, characterHeight, spriteWidth, spriteHeight, speed, delay) {
        super(positionMatrix, img, x, offsetY, characterWidth, characterHeight, spriteWidth, spriteHeight);

        this.originalSpeed = speed;
        this.speed = speed;
        this.delay = delay;
    }

    move() {
        this.x = this.x - this.speed;

        if (this.x < - this.characterWidth - this.delay) {
            this.x = width;
        }
    }

    stop() {
        if (this.x < -this.characterWidth) {
            this.speed = 0;
        }
    }

    restart() {
        this.speed = this.originalSpeed;
        this.animate();
    }
}