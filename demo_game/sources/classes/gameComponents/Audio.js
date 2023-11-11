import Utility from "./Utility.js";

/*
  Features:
  Play long audios in HTMLElements:
    - Play/Pause

  Play short audios in Audio Buffers:
    - Play

  There is only one global volume value
*/
class Audio {
  context;

  globalGainNode;

  audioBuffers;

  mediaElements;

  constructor() {
    this.audioContext = new AudioContext();

    this.globalGainNode = new GainNode(this.audioContext);
    this.globalGainNode.connect(this.audioContext.destination);

    this.audioBuffers = new Map();

    this.mediaElements = new Map();
  }

  load(audioData) {
    const promises = audioData.map((data) => {
      if (data.mediaElement) {
        return this.loadAsMediaElement(data.src);
      }

      return this.loadAsAudioBuffer(data.src);
    });

    return Promise.all(promises);
  }

  /**
   * @param {number} value
   */
  set volume(value) {
    this.globalGainNode.gain = value;
  }

  pauseMediaElement(basename) {
    const mediaElement = this.mediaElements.get(basename);

    mediaElement.pause();
  }

  playMediaElement(basename) {
    const mediaElement = this.mediaElements.get(basename);

    mediaElement.play();
  }

  loadAsMediaElement(src) {
    const mediaElement = new window.Audio(src),
      mediaElementAudioSourceNode = new MediaElementAudioSourceNode(this.audioContext, {
        mediaElement,
      }),
      basename = Utility.getBasename(src);

    mediaElementAudioSourceNode.connect(this.globalGainNode);
    this.mediaElements.set(basename, mediaElementAudioSourceNode);
  }

  playAudioBuffer(basename) {
    const audioBuffer = this.audioBuffers.get(basename),
      audioBufferSourceNode = new AudioBufferSourceNode(this.context, { buffer: audioBuffer });

    audioBufferSourceNode.connect(this.globalGainNode);
    audioBufferSourceNode.start();
  }

  async loadAsAudioBuffer(src) {
    const audioBuffer = await this.fetchAsAudioBuffer(src),
      basename = Utility.getBasename(src);

    this.audioBuffers.set(basename, audioBuffer);
  }

  async fetchAsAudioBuffer(src) {
    const response = await fetch(src),
      arrayBuffer = await response.arrayBuffer(),
      audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
  }
}

export default Audio;
