let imgScenario;
let imgCharacter;
let imgCharacterDead;
let imgCharacterWin;
let imgEnemyDwight;
let imgEnemyMichael;
let imgEnemyFlyingMichael;
let imgGameOver;
let imgFirstAid;
let imgFirstAidResponder;
let imgPretzel;
let imgCrossword;
let imgStressGreen;
let imgStressYellow;
let imgStressRed;
let imgStressBomb;
let imgClock;
let imgClockBlinking;
let scenario;
let character;
let firstAidResponder;
let musicTheme;
let jumpTheme;

let enemies = [];
let powerUps = [];
let pretzelsPositionMatrix = [];
let crosswordsPositionMatrix = [];


const canvasWidth = 640;
const canvasHeight = 360;

const pretzelYHigh = 100;
const pretzelYLow = 260;
const pretzelFirstXPostion = 500;
const pretzelQuantity = 25;
const crosswordFastForwardMinutes = 30;

const typePretzel = 'PRETZEL';
const typeCrossword = 'CROSSWORD';
const typeFirstAid = 'FIRST_AID';
const typeDeath = 'DEATH';
const typeFinish = 'FINISH';

const sceneMenu = 'MENU';
const sceneGame = 'GAME';
const sceneEnd = 'END';

let isGameStopped;
let isGameOver;
let isGameFinished;

const mapLength = 16000;

let scenarioSpeed = 5;
const imgScenarioWidth = 1280;

let mapTimerCount = 0;
let gameStoppedTimerCount = 0;
let mapIndex = 0;
let resetButtonVisible;

const gameMap = [
  {
    enemies: [
      {
        enemyId: 0,
        speed: 8
      },
      // {
      //   enemyId: 1,
      //   speed: 12
      // },
      // {
      //   enemyId: 2,
      //   speed: 15
      // }
    ],
    duration: 100
  },
  {
    enemies: [
      {
        enemyId: 0,
        speed: 8
      },
      {
        enemyId: 1,
        speed: 12
      },
      {
        enemyId: 2,
        speed: 15
      }
    ],
    duration: 650
  },
  {
    enemies: [
      {
        enemyId: 0,
        speed: 15
      },
      {
        enemyId: 1,
        speed: 12
      },
      {
        enemyId: 2,
        speed: 8
      }
    ],
    duration: 450
  }
];

const stanleyWidth = 90;
const stanleyHeight = 125;
const dwightWidth = 90;
const dwightHeight = 145;
const michaelWidth = 90;
const michaelHeight = 140;
const flyingMichaelWidth = 90;
const flyingMichaelHeight = 110;
const firstAidResponderWidth = 90;
const firstAidResponderHeight = 145;

const stanleyOffsetX = 60;
const stanleyOffsetY = 5;

const stanleyPositionMatrix = [
  [0, 0],
  [stanleyWidth, 0],
  [stanleyWidth * 2, 0],
  [stanleyWidth * 3, 0]
];

const dwightPositionMatrix = [
  [0, 0],
  [dwightWidth, 0],
  [dwightWidth * 2, 0],
  [dwightWidth * 3, 0]
];

const michaelPositionMatrix = [
  [0, 0],
  [michaelWidth, 0],
  [michaelWidth * 2, 0],
  [michaelWidth * 3, 0]
];

const flyingMichaelPositionMatrix = [
  [0, 0],
  [flyingMichaelWidth, 0],
  [flyingMichaelWidth * 2, 0],
  [flyingMichaelWidth * 3, 0]
];

const firstAidResponderPositionMatrix = [
  [0, 0],
  [firstAidResponderWidth, 0],
  [firstAidResponderWidth * 2, 0],
  [firstAidResponderWidth * 3, 0]
];