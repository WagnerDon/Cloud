import Utility from "./Utility.js";

class UserInterface {
  dependencies;

  element;

  domParser;

  documentFragments;

  lastFragment;

  constructor(dependencies) {
    this.dependencies = dependencies;

    this.element = document.createElement("div");
    this.element.tabIndex = 0;
    this.element.classList.add("user-interface");
    document.body.append(this.element);

    this.domParser = new DOMParser();

    this.documentFragments = new Map();

    this.lastFragment = null;
  }

  async preload(userInterfaceData) {
    const welcome = userInterfaceData.filter((data) => Utility.getBasename(data.directory) === "welcome")[0],
      index = userInterfaceData.indexOf(welcome);

    userInterfaceData.splice(index, 1);
    await this.loadComponent(welcome);
  }

  async load(userInterfaceData) {
    const promises = userInterfaceData.map((data) => this.loadComponent(data));

    return Promise.all(promises);
  }

  render(basename) {
    this.assemble();
    this.break(basename);
  }

  break(basename) {
    const documentFragment = this.documentFragments.get(basename);

    this.element.append(documentFragment);
    this.lastFragment = basename;
  }

  assemble() {
    if (this.lastFragment) {
      const { element: { children }, documentFragments, lastFragment } = this,
        documentFragment = documentFragments.get(lastFragment);

      documentFragment.append(...children);
    }
  }

  async loadComponent({ directory, sources }) {
    const [srcHtml, srcCss, srcJs] = sources,
      documentFragment = await this.fetchAsDocumentFragment(srcHtml),
      linkElement = UserInterface.getAsLinkElement(srcCss),
      script = await UserInterface.importScript(srcJs),
      basename = Utility.getBasename(directory);

    documentFragment.append(linkElement);
    script(documentFragment, this.dependencies);
    this.documentFragments.set(basename, documentFragment);
  }

  static getAsLinkElement(src) {
    const linkElement = document.createElement("link");

    linkElement.rel = "stylesheet";
    linkElement.href = src;

    return linkElement;
  }

  static async importScript(src) {
    const module = await import(src),
      script = module.default;

    return script;
  }

  async fetchAsDocumentFragment(src) {
    const response = await fetch(src),
      string = await response.text(),
      document = this.domParser.parseFromString(string, "text/html"),
      { body: { children } } = document,
      documentFragment = new DocumentFragment();

    documentFragment.append(...children);

    return documentFragment;
  }
}

export default UserInterface;
