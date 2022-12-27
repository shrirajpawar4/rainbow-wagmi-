import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import tokenContract from "../contracts/contracts.json";

export default function Home() {
  const CONTRACT_ADDRESS = "0x874202975696D4910ea70F862b25FdBE531AEb3a";
  const [supplyData, setSupplyData] = useState(0);

  const {data: signerData} = useSigner();

  //Mint Function
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
  });

  const mintFreeTokens = async () => {
    await buy({args: ["0xd3B08c04daAa551b69c666CF4CFEd718b751743F", ethers.utils.parseEther("2")]})
  }

  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash: mintData?.hash,
  });

  const {data: totalSupplyData} = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: tokenContract.abi,
    functionName: "totalSupply",
    watch: true,
  });

  const buyTokens = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: tokenContract.abi,
    signerOrProvider: signerData,
  })

  const buySomeTokens = async () => {
    await buyTokens.buy("1", ethers.utils.parseEther(".01"));
  }

  const {
    data: faucetData,
    write: faucetToken,
    isLoading: isFaucetLoading,
    isSuccess: isFaucetStarted,
    error: faucetError,
  } = useContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: tokenContract.abi,
    functionName: "faucet",
  });

  // claim faucet
  const claimFaucet = async () => {
    await faucetToken();
  };

  useEffect(() => {
    if (totalSupplyData) {
      let temp = totalSupplyData / 10 ** 18;
      setSupplyData(temp);
    }
  }, [totalSupplyData])


  return (
    <div className="container flex flex-col justify-center mx-auto items-center mt-10">
      <div className="flex mb-6">
        <ConnectButton showBalance={false} />
      </div>
      <h3 className="text-5xl font-bold mb-20">{"Shree's token drop"}</h3>

      <div className="flex flex-col mb-8">
        <button
          onClick={mintFreeTokens}
          className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
          disabled={isMintLoading}
        >
          Mint Tokens
        </button>
        {txSuccess && <p>Success</p>}
      </div>

      <div className="flex flex-col mb-4">
        <button
          onClick={buySomeTokens}
          className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
        >
          Buy Tokens
        </button>
        {/* No success tag */}
      </div>

      <div className="flex flex-col mb-4">
        <button
          onClick={claimFaucet}
          className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
        >
          Claim Faucet
        </button>
        {/* No success tag */}
      </div>

      <div className="text-center">
        <h3 className="text-lg ">Total minted</h3>

        <h3 className="text-lg">{supplyData}</h3>
      </div>
    </div>
  );
}
