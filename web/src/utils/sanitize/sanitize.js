var encodings = {
  '+': "%2B",
  '!': "%21",
  '"': "%22",
  '#': "%23",
  '$': "%24",
  '&': "%26",
  '\'': "%27",
  '(': "%28",
  ')': "%29",
  '*': "%2A",
  ',': "%2C",
  ':': "%3A",
  ';': "%3B",
  '=': "%3D",
  '?': "%3F",
  '@': "%40",
};

const sanitizeProper = (word) => {
  return word[0].toUpperCase() + word.substring(1);
}

const sanitizeS3Url = (url) => {
  const uri = url.match(/https:\/\/ocara\.s3\.amazonaws\.com\/(.*)$/);

  if (uri.length > 1) {
    const file = encodeURIComponent(uri[1])
      .replace(/(\+|!|"|#|\$|&|'|\(|\)|\*|\+|,|:|;|=|\?|@)/img, (match) => { return encodings[match]; });
    return `https://ocara.s3.amazonaws.com/${file}`;
  }

  return null;
}

export {
  sanitizeProper,
  sanitizeS3Url
}
