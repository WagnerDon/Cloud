import Utility from "./Utility.js";

/*
  Features:
  Load Images as ImageBitmaps
  Get ImageBitmaps
*/
class Graphics {
  imageBitmaps;

  constructor() {
    this.imageBitmaps = new Map();
  }

  load(graphicsData) {
    const promises = graphicsData.map((data) => this.loadAsImageBitmap(data.src));

    return Promise.all(promises);
  }

  getImageBitmap(basename) {
    return this.imageBitmaps.get(basename);
  }

  async loadAsImageBitmap(src) {
    const imageBitmap = await Graphics.fetchAsImageBitmap(src),
      basename = Utility.getBasename(src);

    this.imageBitmaps.set(basename, imageBitmap);
  }

  static async fetchAsImageBitmap(src) {
    const response = await fetch(src),
      blob = await response.blob(),
      imageBitmap = await createImageBitmap(blob, { resizeQuality: "pixelated" });

    return imageBitmap;
  }
}

export default Graphics;
