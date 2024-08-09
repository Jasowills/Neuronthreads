module.exports = {
    setupFiles: ["dotenv/config"],
    testEnvironment: 'node',
    globals: {
      'process.env': require('dotenv').config({ path: './.env.test' }).parsed,
    },
  };
  