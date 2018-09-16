module.exports = {
  extends: "airbnb",
  rules: {
    "max-len": [1, 70, 2, {ignoreComments: true}],
    "linebreak-style": 0,
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
    "no-console": 0,
  },
  env: {
    browser: true,
    node: true
  }
};
