const handleAnchorClick = (e, link) => {
  if (link.indexOf("#") !== -1) {
    e.preventDefault();
    const el = document.getElementById(link.split("#")[1]);
    if (el) el.scrollIntoView({ behavior: "smooth" })
  } else window.scrollTo(0, 0);
}

const handleImageLoad = (context) => {
  let files = {};
  context.keys().map((item, index) => files[item.replace("./", "")] = context(item));

  return files;
}

const handleFetch = (endpoint, options) => {
  return fetch(endpoint, options)
          .then((result) => result.json())
          .then((data) => { return data });
}

const handleLocalStorageValue = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
}

export {
  handleAnchorClick,
  handleFetch,
  handleImageLoad,
  handleLocalStorageValue
}
