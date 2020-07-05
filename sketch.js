let click = true;

function touchStarted() {
  click = false;
  event.code = 'Touch';
  if (currentScene === sceneGame)
    character.jump();
}

function mousePressed() {
  if (click) {
    if (currentScene === sceneGame)
      character.jump();
  }
}

function keyPressed() {
  if (key === 'ArrowUp') {
    if (currentScene === sceneGame)
      character.jump();
    // jumpTheme.play();
  }
}

function preload() {
  imgScenario = loadImage('images/scenario/background.png');
  imgCharacter = loadImage('images/character/stanley.png');
  imgCharacterDead = loadImage('images/character/dead.png');
  imgCharacterWin = loadImage('images/character/finished.png');
  imgEnemyDwight = loadImage('images/enemies/dwight.png');
  imgEnemyMichael = loadImage('images/enemies/michael.png');
  imgEnemyFlyingMichael = loadImage('images/enemies/flying_michael.png');
  imgFirstAid = loadImage('images/assets/first-aid.png');
  imgFirstAidResponder = loadImage('images/assets/first-aid-responder.png');
  imgPretzel = loadImage('images/assets/pretzel.gif');
  imgCrossword = loadImage('images/assets/crossword.gif');
  imgStressGreen = loadImage('images/assets/stress-01.gif');
  imgStressYellow = loadImage('images/assets/stress-02.gif');
  imgStressRed = loadImage('images/assets/stress-03.gif');
  imgStressBomb = loadImage('images/assets/stress-bomb-gif.gif');
  imgClock = loadImage('images/assets/clock.png');
  imgClockBlinking = loadImage('images/assets/clock-blinking.gif');

  jumpTheme = loadSound('sounds/jump.wav');
  powerUpTheme = loadSound('sounds/powerup.wav');
  failTheme = loadSound('sounds/fail.mp3');
  deathTheme = loadSound('sounds/death.wav');
  endTheme = loadSound('sounds/end.mp3');
  
  jumpTheme.setVolume(0.7);
  powerUpTheme.setVolume(0.1);
  failTheme.setVolume(0.7);
  deathTheme.setVolume(0.5);
  endTheme.setVolume(0.5);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
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
  sendScoreButton = null;
  nameInput = null;
  highScores = null;
  mapTimerCount = 0;
  gameStoppedTimerCount = 0;
  mapIndex = 0;
}

function resetGame(scene) {
  clearGame();
  
  currentScene = scene;
  scenario = new Scenario(imgScenario, scenarioSpeed, imgScenarioWidth);
  character = new Character(stanleyPositionMatrix, imgCharacter, stanleyOffsetX, stanleyOffsetY, stanleyWidth, stanleyHeight, stanleyWidth, stanleyHeight, imgCharacterDead, imgCharacterWin)

  createEnemies();
  createPowerUps();

  firstAidResponder = new Enemy(firstAidResponderPositionMatrix, imgFirstAidResponder, width + 300, 5, firstAidResponderWidth, firstAidResponderHeight, firstAidResponderWidth, firstAidResponderHeight, 10, 200);

  score = new Score();
  life = new Life(imgFirstAid);

  let canvasPositionX = (windowWidth - canvasWidth)/2;
  let canvasPositionY = (windowHeight - canvasHeight)/2;

  if (currentScene === sceneMenu) {
    startButton = createButton('Start!');
    startButton.addClass('startButton');
  }
  
  resetButton = createButton('Play again!');
  resetButton.addClass('resetButton');
  resetButton.hide();

  exitButton = createButton('Exit game');
  exitButton.hide();
  
  sendScoreButton = createButton('Send score');
  sendScoreButton.hide();

  nameInput = createInput('');
  nameInput.position(0, 70);
  nameInput.hide();

  function myTest(qty) {
    readHighScoresFromDb(qty).then(function(result) {
      highScores = result;

      highScores.forEach(highScore => {
        highScoresText = highScoresText + highScore.name + ": " + highScore.totalPretzels + "\n";
      });
    })
  }

  myTest(5);

  // highScores = readHighScoresFromDb(5);
  
  // highScores.forEach(highScore => {
  //   highScoresText = highScoresText + highScore.name + ": " + highScore.totalPretzels + "\n";
  // });

  // text(highScoresText);

  isGameStopped = false;
  isGameOver = false;
  isGameFinished = false;
  resetButtonVisible = false;

  frameRate(30);
}

function createPowerUps() {
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
}

function createEnemies() {
  const enemyDwight = new Enemy(dwightPositionMatrix, imgEnemyDwight, width, 0, dwightWidth, dwightHeight, dwightWidth, dwightHeight, 8, 200);
  const enemyMichael = new Enemy(michaelPositionMatrix, imgEnemyMichael, width * 1.5, 5, michaelWidth, michaelHeight, michaelWidth, michaelHeight, 12, 500);
  const enemyFlyingMichael = new Enemy(flyingMichaelPositionMatrix, imgEnemyFlyingMichael, width * 1.8, 200, flyingMichaelWidth/1.5, flyingMichaelHeight/1.5, flyingMichaelWidth, michaelHeight, 15, 500);

  enemies.push(enemyDwight);
  enemies.push(enemyMichael);
  enemies.push(enemyFlyingMichael);
}

function draw() {
  switch (currentScene) {
    case sceneMenu:
      drawMenu();
      // fill(255,255,255);
      // textSize(32);
      // text(highScoresText, 10, 120);
      break;
    case sceneGame:
      drawGame();
      break;
    case sceneLevelEnd:
      drawGame();
      drawLevelEnd();
      break;
    case sceneEnd:
      drawGame();
      drawEnd();
      break;
  }
}

function stopGame(type) {
  // scenario.stop();
  powerUps.forEach(powerUp => {
    powerUp.stop();
  });
  enemies.forEach(enemy => {
    enemy.stop();
  });


  if (type === typeDeath) {
    scenario.stop();
    character.changeState(typeDeath);

    if (!life.firstAidHasDecreased) {
      isGameOver = life.decreaseFirstAid();
      life.firstAidHasDecreased = true;
      
      if (!isGameOver) {
        score.increaseFirstAidOccurrences();
      }
      else {
        score.consolidateScore();
      }
    }

    isGameStopped = true;
    gameStoppedTimerCount++;
  }
  else if (type === typeLevelFinish) {
    score.consolidateScore();
    character.changeState(typeLevelFinish);
  }
  // else if (type === typeFinish) {
  //   scenario.stop();
  //   character.changeState(typeFinish);
    
  //   if (!isGameFinished){
  //     endTheme.play();
  //   }

  //   isGameFinished = true;
  // }
}

function startNewLevel() {
  character.changeState(typeNormal);
  score.scoreHasBeenConsolidated = false;

  powerUps = [];
  createPowerUps();
  
  enemies = [];
  createEnemies();
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

function isBusinessHours() {
  if (score.scoreHour >= 9 && score.scoreHour < 17) {
    return true;
  }
  else {
    return false;
  }
}

function drawMenu() {
  scenario.display();
  
  fill(255,255,255,200);
  noStroke();
  rect(width * 1/6, height * 1/6, width * 2/3, height * 2/3);
  
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
  newHeight = previousHeight + 15;

  text("Avoid getting too close to your boss and your co-workers,\nor your stress level will increase!", 140, newHeight);
  
  previousHeight = newHeight;
  newHeight = previousHeight + 35;
  text("Crossword puzzles reduce your stress and make time\ngo faster. Also, look up for delicious pretzels!",  140, newHeight);
  
  previousHeight = newHeight;
  newHeight = previousHeight + 40;
  text("Use ArrowUp or Click/Tap to jump.", 140, newHeight);
  
  character.display();

  startButton.mousePressed(() => {
    startButton.remove();
    currentScene = sceneGame;
  });

  exitButton.mousePressed(() => {
    exitButton.remove();
    resetGame(sceneMenu);
  });
}

function drawEnd() {
  fill(255,255,255,200);
  noStroke();
  rect(width * 1/6, height * 1/6, width * 2/3, height * 2/3);

  let title;
  let subtitle;
  if (isGameOver) {
    title = "Game Over!"
    subtitle = "No pretzels for you.";
    
    sendScoreButton.show();
    nameInput.show();

    sendScoreButton.mousePressed(() => {
      addScore(
        nameInput.value(),
        score.scoreDay,
        score.scoreHour,
        score.scoreMinute,
        score.totalPretzels,
        score.totalCrosswords,
        score.totalDaysAllPretzelsPicked,
        score.totalFirstAidOccurrences
      );
    });

  }
  else if (isGameFinished) {
    title = "Day Finished!";
    subtitle = "Go home and enjoy your pretzels.";
  }

  textAlign(CENTER);
  fill("#fff")
  textFont('Comfortaa');
  stroke("#000");
  strokeWeight(3);
  textStyle(BOLD);
  textSize(32);
  text(title, width/2, height * 1/6 + 60);

  textAlign(LEFT);
  textSize(12);
  fill("#000")
  noStroke();

  text(subtitle, 140, height * 1/6 + 120);

  character.display();

  resetButton.mousePressed(() => {
    resetButton.remove();
    resetGame(sceneGame);
  });
}

function drawLevelEnd() {
  fill(255,255,255,200);
  noStroke();
  rect(width * 1/6, height * 1/6, width * 2/3, height * 2/3);

  let title;
  let subtitle;
  
  
  title = "Day " + score.scoreDay + " Finished!";
  subtitle = "Total pretzels = " + score.totalPretzels;

  textAlign(CENTER);
  fill("#fff")
  textFont('Comfortaa');
  stroke("#000");
  strokeWeight(3);
  textStyle(BOLD);
  textSize(32);
  text(title, width/2, height * 1/6 + 60);

  // textAlign(LEFT);
  // textSize(12);
  // fill("#000")
  // noStroke();

  // text(subtitle, 140, height * 1/6 + 120);

  image(score.imgPretzel, 140, height * 1/6 + 120, 50, 50);
  textAlign(LEFT);
  fill(161, 98, 44);
  stroke("#ffffff");
  strokeWeight(3);
  textSize(20);
  text(score.totalPretzels, 190, height * 1/6 + 150);

  life.decreaseBpm(100);
  character.display();
  
  if (isBusinessHours()) {
    currentScene = sceneGame;
    startNewLevel();
  }
}

function drawGame() {
  scenario.display();
  scenario.move();

  exitButton.position(20, 150);
  exitButton.show();
    
  powerUps.forEach(powerUp => {
    powerUp.display();
    powerUp.move();
  
    if (character.isColliding(powerUp) && !powerUp.picked) {
      powerUp.getPicked();

      if (powerUp.type === typePretzel) {
        score.increasePretzels();
      }
      else if (powerUp.type === typeCrossword) {
        score.increaseCrosswords();
        life.decreaseBpm();
        score.fastForward(crosswordFastForwardMinutes);
      }
      // else if (powerUp.type === typeFirstAid) {
      //   life.increaseFirstAid();
      // }
    }
  });

  character.display();
  character.applyGravity();

  if (score.scoreHour >= 17) {
    // noLoop();
    stopGame(typeLevelFinish);

    // if (typeLevelFinish) {
    currentScene = sceneLevelEnd;
    // }
    
    // if (typeFinish) {
    //   if (gameStoppedTimerCount > 50) {
    //     resetButton.show();
    //     currentScene = sceneEnd;
    //   }
    // }
  }

  if ((life.bpm < life.maxBpm) && !isGameStopped) {
    character.animate();
    score.increaseScore();
  }
  
  let currentGameMap = gameMap[mapIndex];
  let currentEnemies = currentGameMap.enemies;
  let currentEnemiesIds = currentEnemies.map(function(item) {return item.enemyId});

  enemies.filter(function (item) {
      return currentEnemiesIds.includes(enemies.indexOf(item));
    }).forEach(enemy => {
      enemy.display();
      enemy.animate();
      enemy.move();

      if (isBusinessHours()) {
        let currentSpeed = currentEnemies.filter(function (item) {return item.enemyId === enemies.indexOf(enemy)})[0].speed;

        enemy.setSpeed(currentSpeed);

        if (character.isColliding(enemy) && !isGameStopped) {
          if (!enemy.hasCollided) {
            failTheme.play();
          }

          life.increaseBpm();

          enemy.hasCollided = true;
        }
        else {
          enemy.hasCollided = false;
        }
      };
  });
  
  score.display();
  life.display();
  
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

      if (firstAidResponder.x > character.x + 70 || gameStoppedTimerCount > 100) {
        firstAidResponder.animate();
        firstAidResponder.move();
      }

      if (gameStoppedTimerCount > 120) {
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
  pretzelsPositionMatrix = [];

  let lastPosition = pretzelFirstXPostion;
  pretzelsPositionMatrix.push([lastPosition, pretzelYHigh]);
  for (let i = 0; i < pretzelQuantity - 1; i++) {
    lastPosition = lastPosition + (100 * Math.floor(random(1, 11)));

    if (lastPosition === 2000 || lastPosition === 11000) {
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
  crosswordsPositionMatrix = [];

  crosswordsPositionMatrix.push([2000, 100]);
  crosswordsPositionMatrix.push([11000, 100]);
}

// function touchStarted() {
//   getAudioContext().resume();
// }
