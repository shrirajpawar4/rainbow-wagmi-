import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import tokenContract from '../contracts/contracts.json'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const CONTRACT_ADDRESS = "0x874202975696D4910ea70F862b25FdBE531AEb3a";

  // const contractConfig = {
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: tokenContract.abi 
  // }

  const {
    data: mintData,
    write: buy,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: tokenContract.abi,
    functionName: "mint",
  })

  const mintFreeTokens = async () => {
    await buy({args: ["0xA86275c0fa6de82eb4a4D5DCe5A9bBf60984fC41", ethers.utils.parseEther('2')]});
  }

  useEffect(() => {
    console.log("Mint data: ", mintData);
    console.log("isMintLoading: ", isMintLoading);
    console.log("isMintStarted: ", isMintStarted);
    console.log("mintError:", mintError);
    console.log("___________");
  }, [mintData, isMintLoading, isMintStarted]);



  return (
    <div className="container flex flex-col  items-center mt-10">
      <div className="flex mb-6">
        <ConnectButton showBalance={false} />
      </div>
      <h3 className="text-5xl font-bold mb-20">
        {"Shree's token drop"}
      </h3>

      <div className="flex flex-col">
        <button
          onClick={mintFreeTokens}
          className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
          disabled={isMintLoading}
        >
          Mint Tokens
        </button>
      </div>
    </div>
  );
}
