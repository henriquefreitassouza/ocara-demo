const generateUserFromEmail = (email) => {
  return email.split("@")[0];
}

export {
  generateUserFromEmail
};
