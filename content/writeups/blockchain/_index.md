+++
title = 'Ethernaut'
date = 2024-08-28T16:14:08+02:00
draft = false

featured_image =  '/images/ethernaut.png'
background_image= '/images/ethernaut.png'
summary = 'This folder contains solutions to the wargame https://ethernaut.openzeppelin.com/'

tags = [ 'writeups' , 'blockchain' ]
+++
# Ethernaut - Solidity based wargame


## Overview

{{< table table_class="table table-dark table-striped table-bordered" >}}
| Id | Name | Comment |
| -- | ---- | ------- |
| 00 | Hello Ethernaut | Tutorial |
| 01 | [Fallback](01_fallback) | fallback `receive` function |
| 02 | Fallout | misnamed constructor Fal**1**out |
| 03 | [CoinFlip](03_coin) | Bad randomness - blockhash can be accessed |
| 04 | [Telephone](04_telephone) | `tx.origin != msg.sender` |
| 05 | [Token](05_token) | Integer overflow, use `SafeMath` instead! |
| 06 | [Delegation](06_delegation) | `delegatecall` is super dangerous |
| 07 | [Force](07_force) | Force contract to accept funds via `selfdestruct` |
| 08 | [Vault](08_vault) | Access private variables via `getStorageAt` |
| 09 | [King](09_king) | DOS by refusing to accept `transfer`/`send` | 
| 10 | [Re-entrancy](10_reentrance) | Drain all funds via Re-entrancy loop |
| 11 | [Elevator](11_Elevator) | Return different result for same function call |
| 12 | [Privacy](12_Privacy) | Understand Solidity storage, send bytes to function |
| 13 | [Gatekeeperone](13_gatekepperone) | Fix `gasleft` by using `call{gas:...}` |
| 14 | [Gatekeepertwo](14_gatekeepertwo) | bypass `extcodesize` check via constructor |
{{</table>}}


## Notes
* Integer Overflows are very common
* `delegatecall` 30M USD Exploit https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7
* Re-entrancy crashes DAO https://blog.openzeppelin.com/15-lines-of-code-that-could-have-prevented-thedao-hack-782499e00942
* Cheat `view` (promise not to modify own state) with `gasleft()`