# SECTIONS

- <a href="#name"> name </a>
- <a href="#purpose"> purpose </a>
- <a href="#algorithm-high-level"> algorithm in a nutshell </a>
- <a href="#usage"> usage </a>
- <a href="#documentation"> documentation </a>
- <a href="#applications-for-usage"> cases where this tech is used </a>
- <a href="#liscense"> liscense </a>

# Name

MaTH EmO stands for Math Turring muchine hardware for Emulation Optimization since orignal version embeeded a turring muchine in pure algebra to translate computer programs into math, since then many years ago MaTH EmO has developed a lot of better algorithms and a super optimizer for general logic to efficient C code, the new Name convention is Math Emo just one away from Math Amo (Ammo but for Math)

# Purpose

The purpoose of MATH EMO is to be used as a layer between a real programming language and the asm code as MATH EMO is meant to take an ast or a string version of basic syntax including functions,address instruction and condition and transform into efficient wasm binary (from C), C code, asm code (C compiled via gcc), js code

It can not only be used as a standalone basic optimizer but a basic programming language and also as a layer between new future programming languages to help with the high level code to asm translation

It uses the mature gcc compiler and the centuries of MATH humanity has done and exploits it for efficient translation

# Algorithm (HIGH LEVEL)

The algorithm to translate conditions,address instruction and functions into efficient C,js,wasm, asm is through the same structure

## 1. IR math representation

The code ast or string is parsed and translated to pure algebric MATH
it is done by using algebric math properties

### for example

#### Conditions

` if (condition) { code1 }  else { code2 }`
is same as
`(condition) * (code1) + (1 - condition) * (code2)`

here we have a direct translation of conditions to math expresssions as if condition was 0 (false) it would cancel out the code1 or code2 and vice versa

#### functions

`function a(prams) { code }` is same as
`a (prams) = code`

here it is a direct translation of code to a function

#### address instruction

`adrs address = valueNum;` is same as
`newMemory =  setMemoryCell (memory, address, cellValue)` (here the cellValue is a specific formate of the valueNum)
Here we can easily just substitue older memory in new memeory recursively and it will always work etc

## 2. Code generation

There are 2 algorithms to translate based on different speeds and precision

1.  _*The Heurustic SYS:*_

    It works by using common factor elemination etc. Which is what current best of the best (2025) math libraries offer (like summpy) and embeed the math expressions

2.  _*The MATH Constraints Solve for C*_

    ## THIS is not implemented by MATH EMO YET

    #### It will take significant resources to fully implement this algorithm for first time

    Here we use math expression1 such as an expression which inputs a number embeeding C syntax we can then do is make that number embeeding x the math expression1 takes this x and inputs y and returns the program's outputs z as well as total steps to execute it w then we can do is write a brute force math expression2 which calls expression1 for every positive inteager as input and then checks if that inteager is same logic as our AST (math emo input) logic and if so we can brute force from 0 to infinity and select the one with smallest steps taken w we can also find the equvilance between the inteager embeeding the C program and the AST (MATH EMO input) by running it for every input/output till some range say 64 bits and both are equvilance if and only if both have same outputs for same inputs

    It sounds like a lot of brute force but this is constraint we can solve it algebrically espacially since we are not using complex non algebric math here secondly to implement the expression1,2 we can implement them by using MATH EMO itself!

# Usage

There are 3 syntaxes supported by MATH EMO (it is turring complete)

IF you want to know how to use MATH EMO API in node JS check the <a href="#documentation"> documentation section </a>

## AST representations

#### this is quite unstable currently proper usage is a todo

## MATH_EMO SYNTAXES

### Address instruction & processing

In MATH EMO address or `adrs` is a keyword which can be used as a `var statment` but also as a raw address instruction but also to do processing like computation etc

its general syntax is as following
`adrs address = value`  
Note that you dont need to define the address or anything
value is any math positive or negative inteager
This inteagrer only value is limited because of the `"___THEORY" folder containing "stdGAL derivation.txt"`

for processing you could add () inside values and use it with non number values for example function calls or math expressions etc... (algebra valid and math emo supported)

for example

`adrs address = ( someFunction(pram1, pram2, ..... pramN) )`

or

`adrs address = ( 1 + 2 )`

etc.......

### IF STATMENTS

You can write conditions as shown bellow:

```
if (condition){
    code
}
```

However there is also a single liner

```
if (condition) code
```

The code here can be any valid <a href="#math_emo-syntaxes"> MATH EMO syntaxes </a>
The Conditions here can be any valid <a href="#conditions"> MATH EMO conditions syntax </a>

### CONDITIONS

You can write conditions for the <a href="#if-statments"> IF statments </a>

It is a simple <a href="#function-calls"> function call </a>

for example
`aGreaterB()` _note that you will need to implement it_ etc...

### Functions

You can implement MATH EMO functions very easily
for example

```
function name (pram1, pram2, ..... pramN){
   code
}
```

The code here can be any valid <a href="#math_emo-syntaxes"> MATH EMO syntaxes </a>

name is any <a href="#names-in-math-emo-script"> MATH EMO valid name </a> for functions

prameters `pram1, pram2, ..... pramN` here are <a href="#function-prameters"> valid functional parmeters </a>

### function calls

In MATH EMO a function call is very basic it is simple as `functionName(pram1, pram2, ..... pramN)`
functionName is the valid function defined it must follow <a href="#names-in-math-emo-script"> MATH EMO names </a>

The prameters `pram1, pram2, ..... pramN` here must be valid <a href="#function-prameters"> functional parmeters </a>

### function prameters

You can think of prameters as json arrays without the `[`,`]` brackets

for example
`a,b,c,d,e,f` etc..

its general syntax is
`pram1, pram2, ..... pramN`

prameters are just simple variables there is no default value etc... there names should be valid <a href="#names-in-math-emo-script"> MATH EMO name </a>
prameters should end without a trailing comma similar to jsons so `a,b,c`
is valid but `a,b,c,` isnt valid

### NAMES in MATH EMO script

name is a C/Cpp/JS valid name the basic rule is that it needs to start with alhpabets `[a-zA-Z]` or underscore `[_]` and after that it can contain any alpha-neumeric `[0-9A-Za-z]` or underscore `[_]`
A full regex for this name can be `[a-zA-Z_][a-zA-Z0-9_]*`

# Documentation

#### THIS is a TODO untill this repo mature-ises

# Applications for usage

## General ALgorithm Language (GAL programming language)

GAL programming language is a programming language for which MATH-EMO was made (as a back-end optimizer) many years ago it has been refined and now here for the public although still not fully implemented as a product

GAL programming language meant to be a simple programming language similar to js,py but meant to just show what you want not the algorithm not the logic etc ...

#### However GAL Programming Language is still under-development and not avalible as a public library etc

# Liscense

You should check out the liscense.txt for more information

KEY NOTES :

- This repo can be used for any purpose which ISLAM aproves ethical
- It can be used by others however they must not promote music except duff and ISLAM aproved Lyrics and similary not promote other any task,feature,promotion etc which includes to the modern world a harm for hummanity or still in conflict for ISLAMIC Scholors or stright up against the teachings of ISLAM , QURAN or Hadiths
