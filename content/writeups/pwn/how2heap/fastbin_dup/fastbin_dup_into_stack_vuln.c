#include <assert.h>
#include <inttypes.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX_ALLOCATIONS 16

void help(){
	puts("Commands: calloc n, free idx, read idx, win idx\n");
}
void win(){
	puts("You win!");
	system("/bin/sh");
}

int main()
{
	setvbuf(stdout, NULL, _IONBF, 0);
	setvbuf(stdin, NULL, _IONBF, 0);
	setvbuf(stderr, NULL, _IONBF, 0);
	printf("This file extends on fastbin_dup.c by tricking calloc into\n"
	       "returning a pointer to a controlled location (in this case, the stack).\n");


	puts("Fill up tcache first.\n");

	void *ptrs[7];
	for (int i=0; i<7; i++) { ptrs[i] = malloc(8); }
	for (int i=0; i<7; i++) { free(ptrs[i]); }

	unsigned long stack_var[4] __attribute__ ((aligned (0x10)));

	printf("The address we want calloc() to return is %p\n", stack_var + 2);
	// We need to pass the check: malloc(): memory corruption (fast)
	stack_var[1] = 0x20;

	char buffer[1000];
	char *allocations[MAX_ALLOCATIONS];
	bool allocated[MAX_ALLOCATIONS];
	for (int i=0; i< MAX_ALLOCATIONS; i++){ allocated[i] = false;}

	help();
	while (1) {
		printf("> ");
		fgets(buffer, sizeof(buffer), stdin);
		char cmd[1000];
		intptr_t idx;
		int num = sscanf(buffer, "%s %"SCNiPTR, cmd, &idx);
		if (num < 2){
			puts("Too few arguments");
		} else if ((unsigned long) idx > MAX_ALLOCATIONS){
			printf("Index %ld >  %d", idx, MAX_ALLOCATIONS);
		} else if (strcmp(cmd, "calloc") == 0) {
			allocations[idx] = calloc(1, 8);
			allocated[idx] = true;
			printf("==> %p\n", allocations[idx]);
		} else if (strcmp(cmd, "free") == 0) {
			free(allocations[idx]);
			allocated[idx] = false;
			printf("==> ok\n");
		} else if (strcmp(cmd, "read") == 0){
			if (allocated[idx] == true){
				// Reads 8 bytes
				fgets(allocations[idx], 8, stdin);
				printf("==> ok\n");
			} else {
				printf("Buffer %ld has not been allocated", idx);
			}
		} else if (strcmp(cmd, "show") == 0){
			printf("Addr allocations[%ld] = %p\n", idx, allocations[idx]);
		} else if (strcmp(cmd, "win") == 0){
			if (stack_var[2] == 0xdeadbeef){
				win();
			} else {
				puts("Try harder");
			}
		} else {
			help();
		}
	}
}
