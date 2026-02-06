// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = (theme) => {
  if (theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}


let setTheme = (theme) =>  {
  transTheme();
  setHighlight(theme);
  setGiscusTheme(theme);
  setThemeContent(theme);

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
  else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== 'undefined') {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for trasparency.
    })
  }
};


let setThemeContent = (theme) => {
  // Toggle profile images
  const lightImages = document.querySelectorAll('.theme-image-light');
  const darkImages = document.querySelectorAll('.theme-image-dark');

  // Toggle bio content
  const lightBio = document.querySelectorAll('.bio-light');
  const darkBio = document.querySelectorAll('.bio-dark');

  if (theme == "dark") {
    lightImages.forEach(img => img.style.display = 'none');
    darkImages.forEach(img => img.style.display = 'block');
    lightBio.forEach(el => el.style.display = 'none');
    darkBio.forEach(el => el.style.display = 'block');
  } else {
    lightImages.forEach(img => img.style.display = 'block');
    darkImages.forEach(img => img.style.display = 'none');
    lightBio.forEach(el => el.style.display = 'block');
    darkBio.forEach(el => el.style.display = 'none');
  }
};


let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
}


let setGiscusTheme = (theme) => {

  function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }

  sendMessage({
    setConfig: {
      theme: theme
    }
  });

}


let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500)
}


let initTheme = (theme) => {
  if (theme == null || theme == 'null') {
    const userPref = window.matchMedia;
    if (userPref && userPref('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }
  }

  setTheme(theme);
}


initTheme(localStorage.getItem("theme"));
