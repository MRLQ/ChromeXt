if (typeof ChromeXt == "undefined") {
  class ChromeXtTarget extends EventTarget {
    #debug = console.debug.bind(console);
    scripts = [];
    commands = [];
    cspRules = [];
    post(event, detail) {
      this.dispatchEvent(new CustomEvent(event, { detail }));
    }
    dispatch(action, payload) {
      this.#debug(JSON.stringify({ action, payload }));
    }
  }
  Object.defineProperty(globalThis, "ChromeXt", {
    value: new ChromeXtTarget(),
  });
  Object.freeze(ChromeXt);
}
// Kotlin separator

try {
  if (eruda._isInit) {
    eruda.hide();
    eruda.destroy();
  } else {
    eruda.init();
    eruda._localConfig();
    eruda.show();
  }
} catch (e) {
  ChromeXt.dispatch("loadEruda");
}
// Kotlin separator

if (ChromeXt.cspRules.length > 0) {
  ChromeXt.cspRules.forEach((rule) => {
    if (rule.length == 0) return;
    // Skip empty cspRules
    const meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Security-Policy");
    meta.setAttribute("content", rule);
    try {
      document.head.append(meta);
    } catch {
      setTimeout(() => {
        document.head.append(meta);
      }, 0);
    }
  });
}
// Kotlin separator
