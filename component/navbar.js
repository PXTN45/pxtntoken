"use client";
import React, { useState, useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { ethers } from "ethers";
import { formatEther, parseUnits } from "@ethersproject/units";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Page from "@/app/page";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Balance } from "@mui/icons-material";
const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);

const contractChain = 11155111;
const contractAddress = "0x3e106289ab49aba62775f8570908a3ab34792b05";
const Navbar = ({
  handleConnect,
  handleDisconnect,
  isActive,
  accounts,
  provider,
}) => {
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);
  const [error, setError] = useState(undefined);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlockChain
          </Typography>

          {isActive ? (
            <Stack direction="row" spacing={1}>
              <Chip label={accounts} variant="outlined" />
              <Button color="inherit" onClick={handleDisconnect}>
                {" "}
                Disconnect{" "}
              </Button>
            </Stack>
          ) : (
            <Button color="inherit" onClick={handleConnect}>
              {" "}
              Connect{" "}
            </Button>
          )}
        </Toolbar>
      </AppBar>




    </Box>
  );
};
export default Navbar;
