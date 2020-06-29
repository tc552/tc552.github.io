class Character extends Animation {
    constructor(positionMatrix, img, x, offsetY, characterWidth, characterHeight, spriteWidth, spriteHeight, imgDead, imgWin) {
        super(positionMatrix, img, x, offsetY, characterWidth, characterHeight, spriteWidth, spriteHeight);

        this.initialY = height - this.characterHeight - this.offsetY;
        this.y = this.initialY;
        this.floor = this.initialY;

        this.gravity = 2;
        this.jumpSpeed = 0;
        this.jumpLimit = 2;
        this.jumpCount = 0;
        this.originalImg = img;
        this.imgDead = imgDead;
        this.imgWin = imgWin;

        this.originalWidth = this.characterWidth;
        this.originalHeight = this.characterHeight;
    }

    jump() {
        if (this.jumpCount < this.jumpLimit) {
            jumpTheme.play();
            this.jumpSpeed = -30;
            this.jumpCount++;
        }
    }

    applyGravity() {
        this.y = this.y + this.jumpSpeed;
        this.jumpSpeed = this.jumpSpeed + this.gravity;

        if (this.y > this.floor)
        {
            this.y = this.floor;
            this.jumpCount = 0;
        }

    }

    isColliding(enemy) {
        let collision = collideRectRect(
            this.x,
            this.y,
            this.characterWidth * 0.6,
            this.characterHeight * 0.8,
            enemy.x,
            enemy.y,
            enemy.characterWidth * 0.6,
            enemy.characterHeight * 0.8
            );

        return collision;
    }

    changeState(type) {
        this.jumpLimit = 0;
        this.currentFrame = 0;

        if (type === typeDeath) {
            if (!isGameStopped) {
                deathTheme.play();
            }
            this.img = this.imgDead;
            this.lieDown();
        }
        else if (type === typeFinish) {
            this.img = this.imgWin;
        }
    }

    restart() {
        this.img = this.originalImg;
        this.standUp();
        this.jumpLimit = 2;
        this.animate();
    }

    lieDown() {
        this.characterWidth = this.originalHeight;
        this.characterHeight = this.originalWidth;
        this.spriteWidth = this.originalHeight;
        this.spriteHeight = this.originalWidth;
        this.floor = this.initialY + (this.originalHeight - this.originalWidth)
    }

    standUp() {
        this.characterWidth = this.originalWidth;
        this.characterHeight = this.originalHeight;
        this.spriteWidth = this.originalWidth;
        this.spriteHeight = this.originalHeight;
        this.floor = this.initialY;
    }
}