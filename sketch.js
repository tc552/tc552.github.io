let click = true;

function touchStarted() {
  click = false;
  event.code = 'Touch';
  character.jump();
}

function mousePressed() {
  if (click) {
    character.jump();
  }
}

function keyPressed() {
  if (key === 'ArrowUp') {
    character.jump();
    // jumpTheme.play();
  }
}

function preload() {
  imgScenario = loadImage('images/scenario/scenario2.png');
  imgCharacter = loadImage('images/character/walking.png');
  imgCharacterDead = loadImage('images/character/dead.png');
  imgCharacterWin = loadImage('images/character/finished.png');
  imgEnemyDwight = loadImage('images/enemies/dwight.png');
  imgEnemyMichael = loadImage('images/enemies/michael.png');
  imgEnemyFlyingMichael = loadImage('images/enemies/flying_michael.png');
  imgGameOver = loadImage('images/assets/game-over.png');
  imgFirstAid = loadImage('images/assets/first-aid.png');
  imgFirstAidResponder = loadImage('images/assets/first-aid-responder.png');
  imgPretzel = loadImage('images/assets/pretzel.gif');
  imgCrossword = loadImage('images/assets/crossword.png');

  // musicTheme = loadSound('sounds/theme.mp3');
  // jumpTheme = loadSound('sounds/parkour.mp3');
}

function setup() {
  createCanvas(640, 360);
  resetGame(sceneMenu);
}

function clearGame() {
  scenario = null;
  character = null
  pretzelsPositionMatrix = [];
  crosswordsPositionMatrix = [];
  firstAidResponder = null;
  enemies = [];
  powerUps = [];
  score = null;
  life = null;
  startButton = null;
  resetButton = null;
  mapTimerCount = 0;
  gameStoppedTimerCount = 0;
  mapIndex = 0;
}

function resetGame(scene) {
  clearGame();
  
  currentScene = scene;
  scenario = new Scenario(imgScenario, scenarioSpeed, imgScenarioWidth);
  character = new Character(stanleyPositionMatrix, imgCharacter, stanleyOffsetX, stanleyOffsetY, stanleyWidth, stanleyHeight, stanleyWidth, stanleyHeight, imgCharacterDead, imgCharacterWin)

  const enemyDwight = new Enemy(dwightPositionMatrix, imgEnemyDwight, width, 0, dwightWidth, dwightHeight, dwightWidth, dwightHeight, 8, 200)
  const enemyMichael = new Enemy(michaelPositionMatrix, imgEnemyMichael, width * 1.5, 5, michaelWidth, michaelHeight, michaelWidth, michaelHeight, 12, 500)
  const enemyFlyingMichael = new Enemy(flyingMichaelPositionMatrix, imgEnemyFlyingMichael, width * 1.8, 200, flyingMichaelWidth/1.5, flyingMichaelHeight/1.5, flyingMichaelWidth, michaelHeight, 15, 500)
  
  buildPretzelsPositionMatrix();
  pretzelsPositionMatrix.forEach(pretzelPosition => {
    let newPretzel = new PowerUp(imgPretzel, pretzelPosition[0], pretzelPosition[1], scenarioSpeed, 90, 90, typePretzel)
    powerUps.push(newPretzel);
  })

  buildCrosswordsPositionMatrix();
  crosswordsPositionMatrix.forEach(crosswordPosition => {
    let newCrossword = new PowerUp(imgCrossword, crosswordPosition[0], crosswordPosition[1], scenarioSpeed, 90, 90, typeCrossword)
    powerUps.push(newCrossword);
  })

  firstAidResponder = new Enemy(firstAidResponderPositionMatrix, imgFirstAidResponder, width, 5, firstAidResponderWidth, firstAidResponderHeight, firstAidResponderWidth, firstAidResponderHeight, 10, 200);

  enemies.push(enemyDwight);
  enemies.push(enemyMichael);
  enemies.push(enemyFlyingMichael);

  score = new Score();
  life = new Life(imgFirstAid);

  if (currentScene === sceneMenu) {
    startButton = createButton('Start!');
  }
  
  resetButton = createButton('Play again!');
  resetButton.hide();

  isGameStopped = false;
  isGameOver = false;
  isGameFinished = false;
  resetButtonVisible = false;

  frameRate(30);

  // musicTheme.play();
}

function draw() {
  switch (currentScene) {
    case sceneMenu:
      drawMenu();
      break;
    case sceneGame:
      drawGame();
      break;
    case sceneEnd:
      drawGame();
      drawEnd();
      break;
  }
}

function stopGame(type) {
  scenario.stop();
  powerUps.forEach(powerUp => {
    powerUp.stop();
  });
  enemies.forEach(enemy => {
    enemy.stop();
  });

  isGameStopped = true;
  gameStoppedTimerCount++;

  if (type === typeDeath) {
    character.changeState(typeDeath);

    if (!life.firstAidHasDecreased) {
      life.decreaseFirstAid();
      life.firstAidHasDecreased = true;
    }

    if (life.firstAid < 0) {
      isGameOver = true;
    }
  }
  else if (type === typeFinish) {
    character.changeState(typeFinish);
    isGameFinished = true;
  }
}

function resumeGame() {
  life.resetBpm();
  scenario.restart();
  character.restart();
  firstAidResponder.x = width;
  isGameStopped = false;
  gameStoppedTimerCount = 0;

  powerUps.forEach(powerUp => {
    powerUp.restart();
  });
  
  enemies.forEach(enemy => {
    enemy.restart();
  });
}

function drawMenu() {
  scenario.display();
  
  fill(255,255,255,200);
  noStroke();
  rect(width * 1/6, height * 1/6, width * 2/3, height * 2/3);
  
  
  // fill("#000")
  // textFont('Comfortaa');
  // stroke("#ffffff");
  // strokeWeight(3);
  // textStyle(BOLD);
  // textSize(32);
  // text("Stanley's Day At The Office", 50, 50);
  
  // textStyle(NORMAL);
  
  
  let title = "Stanley's Day At The Office";
  
  textAlign(CENTER);
  fill("#fff");
  textFont('Comfortaa');
  stroke("#000");
  strokeWeight(3);
  textStyle(BOLD);
  textSize(24);
  text(title, width/2, height * 1/6 + 50);

  let previousHeight = height * 1/6 + 45;
  let newHeight = previousHeight + 20;

  textAlign(LEFT);
  textSize(12);
  fill("#000")
  noStroke();
  
  previousHeight = newHeight;
  newHeight = previousHeight + 20;

  text("Avoid getting too close to your boss and your co-workers,\nor your stress level will increase!", 140, newHeight);
  
  previousHeight = newHeight;
  newHeight = previousHeight + 40;
  text("You know, crossword puzzles make time go faster...",  140, newHeight);
  
  previousHeight = newHeight;
  newHeight = previousHeight + 25;
  text("Good luck and may all your days be pretzel day!", 140, newHeight);
  
  character.display();

  startButton.position(width/2 - 40, height/2 + 50);

  startButton.mousePressed(() => {
    startButton.remove();
    currentScene = sceneGame;
  });
}

function drawEnd() {
  fill(255,255,255,200);
  noStroke();
  rect(width * 1/6, height * 1/6, width * 2/3, height * 2/3);

  let title;
  if (isGameOver) {
    title = "Game Over!"
  }
  else if (isGameFinished) {
    title = "Day Finished!"
  }

  textAlign(CENTER);
  fill("#fff")
  textFont('Comfortaa');
  stroke("#000");
  strokeWeight(3);
  textStyle(BOLD);
  textSize(32);
  text(title, width/2, height * 1/6 + 60);

  character.display();

  resetButton.position(width/2 - 65, height/2 + 50);

  resetButton.mousePressed(() => {
    resetButton.remove();
    resetGame(sceneGame);
  });
}

function drawGame() {
  scenario.display();
  scenario.move();

  score.display();
  life.display();
    
  powerUps.forEach(powerUp => {
    powerUp.display();
    powerUp.move();
  
    if (character.isColliding(powerUp) && !powerUp.picked) {
      powerUp.getPicked();

      if (powerUp.type === typePretzel) {
        score.increasePretzels();
      }
      else if (powerUp.type === typeCrossword) {
        life.decreaseBpm(20);
        score.fastForward(crosswordFastForwardMinutes);
      }
      else if (powerUp.type === typeFirstAid) {
        life.increaseFirstAid();
      }
    }
  });

  character.display();
  character.applyGravity();

  if (score.scoreHour >= 11) {
    // noLoop();
    stopGame(typeFinish);
    
    if (typeFinish) {
      if (gameStoppedTimerCount > 50) {
        resetButton.show();
        currentScene = sceneEnd;
      }
    }
  }

  if ((life.bpm < life.maxBpm) && !isGameStopped) {
    character.animate();
    score.increaseScore();
  }
  
  let currentGameMap = gameMap[mapIndex];
  let currentEnemiesIds = currentGameMap.enemies.map(function(item) {return item.enemyId});

  enemies.filter(function (item) {
      return currentEnemiesIds.includes(enemies.indexOf(item));
    }).forEach(enemy => {
      enemy.display();
      enemy.animate();
      enemy.move();

      if (character.isColliding(enemy) && !isGameStopped) {
        life.increaseBpm();
      }
  });
  
  if (life.bpm >= life.maxBpm) {
    stopGame(typeDeath);

    if (isGameOver) {
      if (gameStoppedTimerCount > 50) {
        resetButton.show();
        currentScene = sceneEnd;
      }
    }
    else {
      firstAidResponder.display();

      if (firstAidResponder.x > character.x || gameStoppedTimerCount > 130) {
        firstAidResponder.animate();
        firstAidResponder.move();
      }

      if (gameStoppedTimerCount > 150) {
        resumeGame();
      }
    }
  }

  mapTimerCount++;
  
  if (mapTimerCount >= currentGameMap.duration) {

    enemies.filter(function (item) {
        return currentEnemiesIds.includes(enemies.indexOf(item));
      }).forEach(enemy => {
        enemy.stop();
    });

    let currentEnemies = enemies.filter(function (item) {
      return currentEnemiesIds.includes(enemies.indexOf(item));
    })

    let visibleEnemies = currentEnemies.filter(function (item) {
      return item.x > -item.characterWidth;
    }).length;

    if (visibleEnemies <= 0) {
      enemies.filter(function (item) {
          return currentEnemiesIds.includes(enemies.indexOf(item));
        }).forEach(enemy => {
          enemy.restart();
      });

      mapTimerCount = 0;
      mapIndex++;
    }
  
    if (mapIndex >= gameMap.length) {
      mapIndex = 0;
    }
  }
}

function buildPretzelsPositionMatrix() {
  let lastPosition = pretzelFirstXPostion;
  pretzelsPositionMatrix.push([lastPosition, pretzelYHigh]);
  for (let i = 0; i < pretzelQuantity - 1; i++) {
    lastPosition = lastPosition + (100 * Math.floor(random(1, 11)));

    if (lastPosition === 5000 || lastPosition === 11000) {
      lastPosition = lastPosition + (100 * Math.floor(random(1, 11)));
    }
    else if (lastPosition > mapLength) {
      lastPosition = mapLength - (100 * Math.floor(random(1, 11)));
    }

    let positionY;
    let randomNumber = Math.floor(random()*10);
    if (randomNumber % 2 === 0) {
      positionY = pretzelYHigh;
    }
    else {
      positionY = pretzelYLow;
    }

    pretzelsPositionMatrix.push([lastPosition, positionY]);
  }
}

function buildCrosswordsPositionMatrix() {
  crosswordsPositionMatrix.push([1000, 100]);
  crosswordsPositionMatrix.push([11000, 100]);
}

// function touchStarted() {
//   getAudioContext().resume();
// }