class Score {
    constructor() {
        this.scoreHour = 9;
        this.scoreMinute = 0;
        this.scoreSecond = 0;
        this.pretzels = 0;
        this.imgPretzel = imgPretzel;
        this.imgClock = imgClock;
        this.imgClockNormal = imgClock;
        this.imgClockBlinking = imgClockBlinking;
    }

    display() {
        image(this.imgPretzel, 320, 0, 50, 50);
        textAlign(LEFT);
        fill(161, 98, 44);
        stroke("#ffffff");
        strokeWeight(3);
        textSize(20);
        text(this.pretzels + "/" + pretzelQuantity, 370, 30);

        if (this.scoreHour < 16) {
            this.imgClock = this.imgClockNormal;
        }
        else{
            this.imgClock = this.imgClockBlinking;
        }

        image(this.imgClock, width - 115, 7, 30, 30);
        textAlign(LEFT);
        fill('#000000');
        stroke("#ffffff");
        strokeWeight(3);
        textSize(20);
        text(this.n(this.scoreHour) + "h" + this.n(this.scoreMinute), width - 80, 30);
    }

    increaseScore() {
        this.scoreSecond = this.scoreSecond + 9;
        if (this.scoreSecond >= 60) {
            this.scoreMinute++;
            this.scoreSecond = 0;

            if (this.scoreMinute >= 60) {
                this.scoreHour++;
                this.scoreMinute = 0;

                if (this.scoreHour > 17) {
                    this.scoreHour = 9;
                }
            }
        }
    }

    fastForward(minutes) {
        let sumMinutes = this.scoreMinute + minutes;

        if (sumMinutes >= 60) {
            sumMinutes = sumMinutes - 60;

            this.scoreHour++;
        }

        this.scoreMinute = sumMinutes;
    }

    increasePretzels() {
        this.pretzels++;
    }
   
    n(n){
        return n > 9 ? "" + n: "0" + n;
    }
}