import Keyboard from "../components/keyboard";

async function main() {
  const [owner, sombodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsContractFactory.deploy()
  await keyboardsContract.deployed()

  console.log("Contract deployed to:", keyboardsContract.address);

  const keyboardTxn1 = await keyboardsContract.createKeyboard(0, true, "sepia");
  await keyboardTxn1.wait();
  console.log("transaction one completed");

  const keyboardTxn2 = await keyboardsContract.connect(sombodyElse).createKeyboard(1, false, "greyscale");
  await keyboardTxn2.wait();
  console.log("transaction two completed");

  const balanceBefore = await hre.ethers.provider.getBalance(sombodyElse.address);
  console.log("somebodyElse balance before!", hre.ethers.utils.formatEther(balanceBefore));

  const tipTxn = await keyboardsContract.tip(1, {value: hre.ethers.utils.parseEther("1000")})
  const keyboardTxnReceipt = await tipTxn.wait();

  const balanceAfter = await hre.ethers.provider.getBalance(sombodyElse.address);
  console.log("somebodyElse balance after!", hre.ethers.utils.formatEther(balanceAfter));

  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
  console.log(keyboardTxnReceipt.events)

}

main()
  .then(() => process.exit(0))
  .catch((error) =>{
    console.error(error)
    process.exit(1)
  })