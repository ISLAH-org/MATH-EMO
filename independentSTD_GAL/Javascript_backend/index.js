class memory {
  constructor(init = 50000) {
    this.memory = [];
    for (let i = 0; i < init; i++) this.memory[i] = 0;
  }
  write(address, value) {
    this.memory[address] = value;
  }
}

function nonVMinterface(task, addresses, memory) {
  const tasks = [
    // saves the current time ms since the start of program     this is a test task btw
    function (mem, inps) {
      console.log(inps);
      mem.write(inps[0], performance.now());
      return mem;
    },
  ];
  let newMem = tasks[task](memory, addresses.memory);
  if (!newMem) {
    console.warn("invalid task result from", task, addresses, memory);
    newMem = memory;
  }
  return newMem;
}
let address = new memory(5);
address.write(1, 5);
let mem = new memory(50);
console.log(nonVMinterface(0, address, mem));
