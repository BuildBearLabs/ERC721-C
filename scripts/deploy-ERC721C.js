const { ethers } = require("hardhat");

// Deploy function
async function deploy() {
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const ERC721CWithMutableMinterRoyalties = await ethers.getContractFactory("ERC721CWithMutableMinterRoyalties");
  const ERC721CWithMutableMinterRoyaltiesInstance = await ERC721CWithMutableMinterRoyalties.deploy(1000,"BuildBear","BB");
  await ERC721CWithMutableMinterRoyaltiesInstance.deployed();
  console.log("contract deployed at", ERC721CWithMutableMinterRoyaltiesInstance.address);

  await run(`verify:verify`, {
    address: ERC721CWithMutableMinterRoyaltiesInstance.address,
    constructorArguments:[1000,"BuildBear","BB"]
  });
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
