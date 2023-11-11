class Canvas {
  element;

  context;

  offscreen;

  offcontext;

  constructor(size) {
    this.element = document.createElement("canvas");
    [this.element.width, this.element.height] = size;
    this.element.classList.add("canvas");
    document.body.append(this.element);

    this.context = this.element.getContext("bitmaprenderer");

    this.offscreen = new OffscreenCanvas(size);

    this.offcontext = this.offscreen.getContext("2d", { alpha: false });
    this.offcontext.imageSmoothingEnabled = false;

    this.commit();
  }

  commit() {
    const imageBitmap = this.offscreen.transferToImageBitmap();

    this.context.transferFromImageBitmap(imageBitmap);
  }
}

export default Canvas;
