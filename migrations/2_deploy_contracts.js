var TestOne = artifacts.require("./TestOne.sol");

module.exports = function(deployer) {
  deployer.deploy(TestOne, "https://images3.alphacoders.com/112/thumb-350-1128122.jpg");
};
