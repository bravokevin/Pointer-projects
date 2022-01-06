async function main() {
    const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
    const keyboardsContract = await keyboardsContractFactory.deploy();
    await keyboardsContract.deployed();
  
    console.log("The keyboards contract is deployed!", keyboardsContract.address)

    const keyboardTxn1 = await keyboardsContract.createKeyboard(0, true, "sepia");
  await keyboardTxn1.wait();
  console.log("transaction one completed");

  const keyboardTxn2 = await keyboardsContract.createKeyboard(1, false, "greyscale");
  await keyboardTxn2.wait();
  console.log("transaction two completed");

  const keyboardTxn3 = await keyboardsContract.createKeyboard(1, false, "invert");
  await keyboardTxn3.wait();
  console.log("transaction three completed");

    const keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  