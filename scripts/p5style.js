function P5Style () {};

P5Style.titleStyle = function () {
    textAlign(CENTER);
    fill("#fff");
    textFont('Comfortaa');
    stroke("#000");
    strokeWeight(3);
    textStyle(BOLD);
    textSize(24);
}

P5Style.simpleTextStyle = function () {
    textAlign(LEFT);
    textSize(12);
    fill("#000")
    noStroke();
}

P5Style.titleEndStyle = function () {
    textAlign(CENTER);
    fill("#fff")
    textFont('Comfortaa');
    stroke("#000");
    strokeWeight(3);
    textStyle(BOLD);
    textSize(32);
}

P5Style.pretzelCountStyle = function () {
    textAlign(LEFT);
    fill(161, 98, 44);
    stroke("#ffffff");
    strokeWeight(3);
    textSize(20);
}

P5Style.clockCountStyle = function () {
    textAlign(LEFT);
    fill('#000000');
    stroke("#ffffff");
    strokeWeight(3);
    textSize(20);
}

P5Style.firstAidCountStyle = function () {
    textAlign(LEFT);
    fill(220, 66, 38);
    stroke("#ffffff");
    strokeWeight(3);
    textSize(20);
}

P5Style.bpmCountStyle = function (color, size) {
    textAlign(LEFT);
    fill (color);
    textSize(size);
}