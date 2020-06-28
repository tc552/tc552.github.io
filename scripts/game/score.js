class Score {
    constructor() {
        this.scoreHour = 9;
        this.scoreMinute = 0;
        this.scoreSecond = 0;
        this.pretzels = 0;
    }

    display() {
        textAlign(LEFT);
        fill('#000000');
        stroke("#ffffff");
        strokeWeight(3);
        textSize(20);
        text(this.n(this.scoreHour) + "h" + this.n(this.scoreMinute), width - 80, 30);
        
        textAlign(LEFT);
        text(this.pretzels + "/" + pretzelQuantity + " pretzels", 320, 30);
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