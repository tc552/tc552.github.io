const initialBpm = 0;
const intermediateBpm = 50;
const highBpm = 80;
const maxBpm = 100;
const initialFirstAid = 1;
const maxFirstAid = 2;
const colorGreen = '#008000';
const colorYellow = '#F9B100';
const colorRed = '#8A0707';

class Life {
    constructor (imgFirstAid) {
        this.imgFirstAid = imgFirstAid;
        this.bpm = initialBpm;
        this.maxBpm = maxBpm;

        this.firstAid = initialFirstAid;
        this.maxFirstAid = maxFirstAid;
        this.firstAidHasDecreased = false;

        this.imgFirstAidInitialX = 150;
        this.imgFirstAidY = 10;
        this.imgFirstAidWidth = 30;
        this.imgFirstAidHeight = 25;
    }
    
    display() {
        textAlign(LEFT);
        
        if (this.bpm <= intermediateBpm) {
            fill(colorGreen);
        }
        else if (this.bpm <= highBpm) {
            fill(colorYellow);
        }
        else {
            fill(colorRed);
        }
        
        textSize(20);
        text("\u2764" + this.bpm, 20, 30);

        for (let i = 0; i < this.firstAid; i++) {
            const imgMargin = i + 5;
            const imgPosition = this.imgFirstAidInitialX + this.imgFirstAidWidth * (i + 1);
            image(this.imgFirstAid, imgMargin + imgPosition, this.imgFirstAidY, this.imgFirstAidWidth, this.imgFirstAidHeight);
        }
    }

    increaseBpm() {
        if (this.bpm <= maxBpm){
            let bpmIncrease = Math.floor(Math.random() * 5) + 1;
            // let bpmIncrease = 1;

            if ((this.bpm + bpmIncrease) <= maxBpm) {
                this.bpm = this.bpm + bpmIncrease;
            }
            else {
                this.bpm = maxBpm;
            }
        }
        else {
            this.bpm = maxBpm;
        }
    }

    resetBpm() {
        this.bpm = initialBpm;
        this.firstAidHasDecreased = false;
    }

    decreaseBpm(quantity) {
        if (this.bpm - quantity > 0) {
            this.bpm = this.bpm - quantity;
        }
        else {
            this.bpm = 0;
        }
    }

    increaseFirstAid() {
        if (this.firstAid < maxFirstAid) {
            this.firstAid++;
        }
    }

    decreaseFirstAid() {
        this.firstAid--;
    }

    resetFirstAid() {
        this.firstAid = initialFirstAid;
    }
}