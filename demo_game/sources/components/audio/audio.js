export default function script(fragment, dependencies) {
  const { audio } = dependencies,
    volume = fragment.getElementById("volume");

  volume.onmousemove = () => {
    audio.volume = volume.value;
  };
}
