module.exports = {
  root: false,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // 'google',
  ],
  rules: {
    quotes: ["error", "double"],
  },
}
