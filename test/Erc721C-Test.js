const { expect } = require("chai");

require("chai");
require("ethers");

describe.only("ERC721CWithMutableMinterRoyalties", function () {
    let contract;

    beforeEach(async () => {
        [owner1, owner2, owner3] = await ethers.getSigners();
        const Greeter = await ethers.getContractFactory("ERC721CWithMutableMinterRoyalties");
        contract = await Greeter.deploy(1000,"BuildBear","BB");
    });

    describe("Functions", () => {
        it("should mint NFT", async function () {
            await contract.deployed();
            await contract.mint(owner1.address, 1);
            expect(await contract.balanceOf(owner1.address)).to.equal(1);
        });


        it("default Royalty Fee 1000", async () => {
            await contract.deployed();
            await contract.mint(owner1.address, 1);
            const vaule= await contract.royaltyInfo(1,100);
            expect(vaule.royaltyAmount).to.equal(10);
        });

        it("set Royalty Fee", async () => {
            await contract.deployed();
            await contract.mint(owner1.address, 1);
            await contract.setRoyaltyFee(1,2000);
            const vaule= await contract.royaltyInfo(1,100);
            expect(vaule.royaltyAmount).to.equal(20);
        });
        it("test Royalty Info For Minted TokenIds After Transfer", async () => {
            await contract.deployed();
            await contract.mint(owner1.address, 1);
            await contract.setRoyaltyFee(1,2000);
            await contract.transferFrom(owner1.address, owner2.address,1);
            const vaule= await contract.royaltyInfo(1,100);
            expect(vaule.royaltyAmount).to.equal(20);
        });
    });
});