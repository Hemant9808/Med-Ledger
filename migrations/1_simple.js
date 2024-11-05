// migrations/1_initial_migration.js
const simple = artifacts.require("simple.sol");

module.exports = function (deployer) {
  deployer.deploy(simple);
};
