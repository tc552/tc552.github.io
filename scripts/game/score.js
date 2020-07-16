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
        this.imgDay = imgDay;
        this.timeStepSecond = 9;
        this.timeStepMinute = 1;
        this.timeStepHour = 1;
        this.dayToBeIncremented = false;
        this.scoreHasBeenConsolidated = false;

        this.scoreIncrementTime = 0;
        this.scoreIncrementPretzels = 0;
        this.scoreIncrementCrosswords = 0;
    }

    display() {
        this.displayPretzelCount();
        this.displayClock();
    }

    displayPretzelCount() {
        image(this.imgPretzel, 270, 0, 50, 50);
        P5Style.pretzelCountStyle();
        text(this.pretzels + "/" + pretzelQuantity, 320, 30);
    }

    displayClock() {
        P5Style.clockCountStyle();
        image(this.imgDay, 420, 5, 30, 30);
        text(this.scoreDay, 455, 30);

        if (this.scoreHour === 16) {
            this.imgClock = this.imgClockBlinking;
        }
        else {
            this.imgClock = this.imgClockNormal;
        }

        image(this.imgClock, width - 145, 7, 30, 30);
        text(this.n(this.scoreHour) + "h" + this.n(this.scoreMinute), width - 110, 30);
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
                    this.timeStepMinute = 3;
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
        if (!this.scoreHasBeenConsolidated) {
            if (this.scoreHour >= 17 || this.scoreHour < 9) {
                this.scoreIncrementTime = 8 * 60 * minuteScore;
            }
            else {
                this.scoreIncrementTime = (((this.scoreHour - 9) * 60) + this.scoreMinute) * minuteScore;       
            }

            this.scoreIncrementPretzels = this.pretzels * pretzelScore;
            this.scoreIncrementCrosswords = this.crosswords * crosswordScore;
            this.scoreIncrementAllPretzels = (this.pretzels === pretzelQuantity) ? allPretzelsScore : 0;

            this.scoreHasBeenConsolidated = true;
        }
    }

    addTimeScoreToTotal() {
        let incrementStep = 8 * 60 * 10 / 30;

        if (this.scoreIncrementTime > 0) {
            if (this.scoreIncrementTime - incrementStep > 0) {
                this.totalScore = this.totalScore + incrementStep;
                this.scoreIncrementTime = this.scoreIncrementTime - incrementStep;
            }
            else {
                this.totalScore = this.totalScore + this.scoreIncrementTime;
                this.scoreIncrementTime = 0;
            }
        }
    }

    addPretzelScoreToTotal() {
        let incrementStep = this.pretzels * pretzelScore / 30;

        if (this.scoreIncrementPretzels > 0) {
            if (this.scoreIncrementPretzels - incrementStep > 0) {
                this.totalScore = this.totalScore + incrementStep;
                this.scoreIncrementPretzels = this.scoreIncrementPretzels - incrementStep;
            }
            else {
                this.totalScore = this.totalScore + this.scoreIncrementPretzels;
                this.scoreIncrementPretzels = 0;
            }
        }
    }

    addCrosswordScoreToTotal() {
        let incrementStep = this.crosswords * crosswordScore / 30;

        if (this.scoreIncrementCrosswords > 0) {
            if (this.scoreIncrementCrosswords - incrementStep > 0) {
                this.totalScore = this.totalScore + incrementStep;
                this.scoreIncrementCrosswords = this.scoreIncrementCrosswords - incrementStep;
            }
            else {
                this.totalScore = this.totalScore + this.scoreIncrementCrosswords;
                this.scoreIncrementCrosswords = 0;
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
        this.totalPretzels++;
    }

    increaseCrosswords() {
        this.crosswords++;
        this.totalCrosswords++;
    }

    increaseFirstAidOccurrences() {
        this.totalFirstAidOccurrences++;
    }
   
    n(n){
        return n > 9 ? "" + n: "0" + n;
    }
}