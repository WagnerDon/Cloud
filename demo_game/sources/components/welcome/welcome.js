export default function script(documentFragment, dependencies) {
  const startLoading = documentFragment.getElementById("start-loading");
  startLoading.onclick = () => {
    startLoading.style.display = "none";
    const loading = document.getElementById("loading");
    loading.removeAttribute("style");
    dependencies.load(dependencies.gameData);

    window.addEventListener("componentsReady", () => {
      console.log("ready");
    });
  };
}
