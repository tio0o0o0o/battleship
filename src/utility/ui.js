class UI {
  static removeChildElements(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.lastChild);
    }
  }

  static createElement({
    tag = "div",
    styles = {},
    hoverStyles = {},
    attributes = [],
    textContent = "",
    innerHTML = "",
    parent = "",
  } = {}) {
    const element = document.createElement(tag);
    if (Object.keys(styles).length !== 0) Object.assign(element.style, styles);
    if (attributes.length !== 0) {
      for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
      }
    }
    if (textContent) element.textContent = textContent;
    if (innerHTML) element.innerHTML = innerHTML;
    if (parent) parent.appendChild(element);
    return element;
  }
}

module.exports = UI;
