import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./variables"

const contractAddress = CONTRACT_ADDRESS;
const contractABI = CONTRACT_ABI;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
