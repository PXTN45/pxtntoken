// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract PXTNToken is ERC20 {
    uint exChangeRateForOneEther = 10;
    constructor() ERC20("PXTNToken", "PXTN") {
        // Ownable(initialOwner)
        _mint(address(this), 1000000 * 10 ** decimals());
    }
        

    function buy() payable public {
        uint tokenReceived = msg.value * exChangeRateForOneEther;
        _transfer(address(this), msg.sender, tokenReceived);
    }
}
