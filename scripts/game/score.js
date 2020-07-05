class Score {
    constructor() {
        this.scoreDay = 1;
        this.scoreHour = 9;
        this.scoreMinute = 0;
        this.totalPretzels = 0;
        this.totalCrosswords = 0;
        this.totalDaysAllPretzelsPicked = 0;
        this.totalFirstAidOccurrences = 0;
        this.totalScore = 0;

        this.scoreSecond = 0;
        this.pretzels = 0;
        this.crosswords = 0;
        this.imgPretzel = imgPretzel;
        this.imgClock = imgClock;
        this.imgClockNormal = imgClock;
        this.imgClockBlinking = imgClockBlinking;
        this.timeStepSecond = 9;
        this.timeStepMinute = 1;
        this.timeStepHour = 1;
        this.dayToBeIncremented = false;
        this.scoreHasBeenConsolidated = false;
    }

    display() {
        image(this.imgPretzel, 320, 0, 50, 50);
        textAlign(LEFT);
        fill(161, 98, 44);
        stroke("#ffffff");
        strokeWeight(3);
        textSize(20);
        text(this.pretzels + "/" + pretzelQuantity, 370, 30);

        if (this.scoreHour === 16) {
            this.imgClock = this.imgClockBlinking;
        }
        else {
            this.imgClock = this.imgClockNormal;
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
        this.scoreSecond = this.scoreSecond + this.timeStepSecond;
        if (this.scoreSecond >= 60) {
            this.scoreMinute = this.scoreMinute + this.timeStepMinute;
            this.scoreSecond = 0;

            if (this.scoreMinute >= 60) {
                this.scoreHour = this.scoreHour + this.timeStepHour;
                this.scoreMinute = 0;

                if (this.scoreHour >= 17 || this.scoreHour < 9) {
                    this.timeStepSecond = 60;
                    this.timeStepMinute = 7;
                }
                else {
                    this.timeStepSecond = 9;
                    this.timeStepMinute = 1;
                }

                if (this.scoreHour > 23) {
                    this.dayToBeIncremented = true;;
                    this.scoreHour = 0;
                }
                else if (this.scoreHour === 9 && this.dayToBeIncremented === true) {
                    this.scoreDay++;
                    this.dayToBeIncremented = false;
                }
            }
        }
    }

    consolidateScore() {
        console.log("scoreHour=" + this.scoreHour);
        console.log("scoreMinute=" + this.scoreMinute);
        console.log("pretzels=" + this.pretzels);
        console.log("crosswords=" + this.crosswords);
        if (!this.scoreHasBeenConsolidated) {
            let scoreToIncrement = 0;
            scoreToIncrement = scoreToIncrement + (((this.scoreHour - 9) * 60) + this.scoreMinute) * 10;
            scoreToIncrement = scoreToIncrement + (this.pretzels * 150);
            scoreToIncrement = scoreToIncrement + (this.crosswords * 400);

            if (this.pretzels === pretzelQuantity) {
                scoreToIncrement = scoreToIncrement + 500;
            }

            console.log("scoreToIncrement=" + scoreToIncrement);
            this.totalScore = this.totalScore + scoreToIncrement;
            this.scoreHasBeenConsolidated = true;
        }

        if (this.pretzels > 0) {


            if (frameCount % 2 === 0) {
                this.pretzels--;
                this.totalPretzels++;
            }
        }
    }

    fastForward(minutes) {
        let sumMinutes = this.scoreMinute + minutes;

        if (sumMinutes >= 60) {
            sumMinutes = sumMinutes - 60;

            if (this.scoreHour === 16) {
                sumMinutes = 59;
                this.scoreSecond = 59;
            }
            else {
                this.scoreHour++;
            }
        }

        this.scoreMinute = sumMinutes;
    }

    increasePretzels() {
        this.pretzels++;
    }

    increaseCrosswords() {
        this.totalCrosswords++;
    }

    increaseFirstAidOccurrences() {
        this.totalFirstAidOccurrences++;
    }
   
    n(n){
        return n > 9 ? "" + n: "0" + n;
    }
}