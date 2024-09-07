+++
title = 'Smallbin Attacks'
+++

## House of Botcake
> Double Free for overlapping chunk

For small bins it is possible to bypass the Double free check:
`double free or corruption (!prev) -> next chunk's previous-in-use bit is 0`
by freeing a `tcache` slot using `malloc`.



