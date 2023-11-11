class AnimationFrame {
  dependencies;

  interval;

  lastStamp;

  frame;

  constructor(dependencies) {
    this.dependencies = dependencies;
    this.interval = 1000 / 10;
    this.lastStamp = null;
    this.frame = null;

    this.control = this.control.bind(this);
  }

  start() {
    requestAnimationFrame(this.control);
  }

  stop() {
    cancelAnimationFrame(this.frame);
  }

  control(stamp) {
    const { lastStamp, interval } = this,
      difference = stamp - lastStamp || stamp;

    this.lastStamp = stamp - (difference % interval);

    if (difference > interval) {
      this.dependencies.world.update();
    }

    this.frame = requestAnimationFrame(this.control);
  }
}

export default AnimationFrame;
