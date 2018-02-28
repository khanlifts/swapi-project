var generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().toLocaleTimeString()
  }
};

module.exports = {generateMessage};
