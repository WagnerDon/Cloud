import UserInterface from "./UserInterface.js";
import Graphics from "./Graphics.js";
import Audio from "./Audio.js";
import Canvas from "./Canvas.js";
import Controls from "./Controls.js";
import AnimationFrame from "./AnimationFrame.js";

class Game {
  gameData;

  userInterface;

  audio;

  graphics;

  canvas;

  controls;

  animationFrame;

  constructor(gameData) {
    this.gameData = gameData;
    this.userInterface = null;
    this.audio = null;
    this.graphics = null;
    this.canvas = null;
    this.controls = null;
    this.animationFrame = null;

    this.preload(this.gameData.userInterface);
  }

  async preload(userInterface) {
    this.userInterface = new UserInterface(this);
    await this.userInterface.preload(userInterface);
    this.userInterface.render("welcome");
  }

  async load({ userInterface, audio, graphics }) {
    const componentsReady = new Event("componentsReady");

    this.audio = new Audio();
    this.graphics = new Graphics();

    const promises = [
      this.userInterface.load(userInterface),
      this.audio.load(audio),
      this.graphics.load(graphics),
    ];

    await Promise.all(promises);

    window.dispatchEvent(componentsReady);
  }

  async initiate() {
    this.canvas = new Canvas([398, 224]);
    this.controls = new Controls(this);
    this.animationFrame = new AnimationFrame(this);
  }
}

export default Game;
