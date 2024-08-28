# How2heap

This repository is for the purpose of self-learning Heap exploitaiton by taking notes on all the techniques mentioned in the how2heap Repository: https://github.com/shellphish/how2heap.git

# Setup
1. Download how2heap repository
2. Download pwndbg

**TODO** Next time use docker

# Basics

The modules `first_fit` and `calc_tcache_idx` serve as an introduction to `glibc`:

## first_fit
Demonstrates overlapping allocations:
```c
void* a = malloc(0x512);
void* b = malloc(0x256);
void* c;

free(a);
c = malloc(0x500);
```
In the end `c == a`, since a has been freed an c fits into the allocation.

## calc_tcache_idx
The tcache index formula for a size `x` with `malloc(x)`:

| Index | Range |
| ----- | ----- |
| 0     | 0x0 - 0x18 |
| 1     | 0x19 - 0x28 |
| 2     | 0x29 - 0x38 |
| ...   | ... |
| 63    | 0x3f9 - 0x408 |


## Decrypt safe linking (glibc>= 2.32)
Safe linking is a mitigation to poison heap pointers, so that an extra leak is required to decrypt them directly.

Normal decryption given the address of the pointer works like this:
```py
pt = (chunk_addr >> 12) ^ ct
```
where `chunk_addr` is the location where the `ct` was stored.

In special cases the leak is not needed, i.e the address of chunk and address of leaked pointer are in the same page.
```py
def decrypt(cipher):
    key = 0
    for i in range(1, 6):
        bits = 64 - 12*i
        bits = max(bits, 0)
        plain = ((cipher ^ key) >> bits ) << bits
        key = plain >> 12
    return plain
```
interestingly the Decryption goes through more rounds, since each byte must be caclculated using the previous byte.

An advanced method using z3 to calculate the key, given known low-bytes of the `plaintext` is explained here: https://github.com/n132/Dec-Safe-Linking

## calloc
`calloc` will not allocate from the `tcache` bins.
```c
	void *a = malloc(8);
	free(a);

    // b will not alloc in the free allocation a, since it's in tcache
	void* b = calloc(1, 8);
	void* c = malloc(8);

	printf("a = %p\n", a);
	printf("b = %p\n", b);
	printf("c = %p\n", c);
    assert(a == c);

```


# Attacks
* (Fastbin Attacks)[fastbin_attacks.md]
* (Smallbin Attacks)[smallbin_attacks.md]

# glibc 2.35
Using this version since it is the native glibc version of Ubuntu 22.04

TODO: 
- [x] decrypt_safe_linking
- [x] fastbin_dup
- [x] fastbin_dup_consolidate
- [x] fastbin_dup_into_stack
- [x] fastbin_reverse_into_tcache
- [ ] house_of_botcake
- [ ] house_of_einherjar
- [ ] house_of_lore
- [ ] house_of_mind_fastbin
- [ ] house_of_spirit
- [ ] large_bin_attack
- [ ] mmap_overlapping_chunks
- [ ] overlapping_chunks
- [ ] poison_null_byte
- [ ] tcache_house_of_spirit
- [ ] tcache_poisoning
- [ ] tcache_stashing_unlink_attack
- [ ] unsafe_unlink
- [ ] safe_link_double_protect
- [ ] house_of_water
- [ ] sysmalloc_int_free
- [ ] house_of_tangerine