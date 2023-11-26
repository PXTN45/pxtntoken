"use client";
import React, { useState, useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask  } from "@web3-react/metamask";
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import abi from "./abi.json";
import Navbar from "@/component/navbar";
import { _ethers } from "ethers";
import { formatEther } from "@ethersproject/units";
// import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;
const contractChain = 11155111;
const contractAddress = "0x3e106289ab49aba62775f8570908a3ab34792b05";

export default function Page() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();

  const provider = useProvider();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  const handleConnect = () => {
    metaMask.activate(contractChain);
  };

  const handleDisconnect = () => {
    metaMask.resetState();
  };
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const fetchBalance = async () => {
      const signer = provider.getSigner();
      const smartContract = new ethers.Contract(contractAddress, abi, signer);
      const myBalance = await smartContract.balanceOf(accounts[0]);
      console.log(formatEther(myBalance));
      setBalance(formatEther(myBalance));
    };
    if (isActive) {
      fetchBalance();
    }
  }, [isActive]);

  const [pxtnValue, setPxtnValue] = useState(0);
  const handleSetPxtnValue = (event) => {
    setPxtnValue(event.target.value);
  };
  const handleBuy = async () => {
    try {
      if (pxtnValue <= 0) {
        return;
      }
      const signer = provider.getSigner();
      const smartContract = new ethers.Contract(contractAddress, abi, signer);
      const buyValue = parseUnits(pxtnValue.toString(), "ether");
      const tx = await smartContract.buy({
        value: buyValue.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar
        accounts={accounts}
        chainId={chainId}
        isActive={isActive}
        provider={provider}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
      {/* {isActive && <div> balance = {balance} </div>} */}
      {isActive && (
        <div className="container">
          <div className="card">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <h1>My wallet balance</h1>
              <TextField label="Address" value={accounts ? accounts[0] : ""} />
              <TextField label="PXTN Token" value={balance} />
              <h1>Buy PXTN Token</h1>
              <TextField
                required
                id="outlined-required"
                label="Enter amount of Ether you want to buy PXTN Token"
                defaultValue=""
                type="number"
                onChange={handleSetPxtnValue}
              />
              <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: "center" }}
              >
                <Button sx={{ width: "500px" }} onClick={handleBuy} variant="contained">
                  Buy PXTN Token
                </Button>
              </Stack>
              {/* <p>chainId: {chainId}</p>
              <p>isActive: {isActive.toString()}</p>
              <p>accounts: {accounts ? accounts[0] : ""}</p> */}
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
