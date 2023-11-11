class Controls {
  mouse;

  keyboard;

  constructor({ userInterface: { element } }) {
    this.mouse = new Map([["pointer", new Uint16Array(2)]]);
    this.keyboard = new Map();

    this.addMouseListeners(element);
    this.addKeyboardListeners(element);
  }

  getKey(key) {
    return this.keyboard.get(key);
  }

  getButton(button) {
    return this.mouse.get(button);
  }

  addKeyboardListeners(element) {
    const target = element;

    target.onkeydown = (e) => {
      this.setKeyState(e, true);
    };

    target.onkeyup = (e) => {
      this.setKeyState(e, false);
    };
  }

  addMouseListeners(element) {
    const target = element;

    target.onmousedown = (e) => {
      this.setMousePointer(e);
      this.setButtonState(e, true);
    };

    target.onmouseup = (e) => {
      this.setMousePointer(e);
      this.setButtonState(e, false);
    };

    target.onmousemove = (e) => {
      this.setMousePointer(e);
    };

    target.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }

  setMousePointer(e) {
    const {
      offsetX, offsetY,
      target: {
        clientWidth,
        clientHeight,
        nextElementSibling: {
          width,
          height,
        },
      },
    } = e;

    const x = (offsetX / clientWidth) * width,
      y = (offsetY / clientHeight) * height;

    const typedArray = this.mouse.get("pointer", [x, y]);
    [typedArray[0], typedArray[1]] = [x, y];
  }

  setButtonState(e, boolean) {
    this.mouse.set(e.button, boolean);
  }

  setKeyState(e, boolean) {
    this.keyboard.set(e.code, boolean);
  }
}

export default Controls;
