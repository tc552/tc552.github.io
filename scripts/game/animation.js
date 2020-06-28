class Animation {
    constructor(positionMatrix, img, x, offsetY, characterWidth, characterHeight, spriteWidth, spriteHeight) {
        this.positionMatrix = positionMatrix;
        this.img = img;
        this.x = x;
        this.offsetY = offsetY;
        this.characterWidth = characterWidth;
        this.characterHeight = characterHeight;
        this.y = height - this.characterHeight - this.offsetY;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.currentFrame = 0;
    }

    display() {
        image(this.img,
            this.x,
            this.y,
            this.characterWidth,
            this.characterHeight,
            this.positionMatrix[this.currentFrame][0],
            this.positionMatrix[this.currentFrame][1],
            this.spriteWidth,
            this.spriteHeight);
    }

    animate() {
        this.currentFrame++;

        if (this.currentFrame > this.positionMatrix.length - 1) {
            this.currentFrame = 0;
        }
    }

    stopAnimation() {
        this.currentFrame = 0;
    }
}