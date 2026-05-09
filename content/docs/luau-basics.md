---
title: "Luau Basics"
category: "Programming"
order: 2
---

# Luau Basics

Master the fundamentals of Luau programming.

## What is Luau?

Luau is Roblox's scripting language, based on Lua but enhanced with modern features:

- **Simple syntax** - Easy to learn for beginners
- **Powerful** - Full access to Roblox's extensive API
- **Type-safe** - Optional type annotations
- **Fast** - Optimized for game performance

## Variables and Data Types

### Creating Variables

Always use `local` for scope safety:

```luau
-- Numbers
local age = 25
local score = 99.5
local negative = -42

-- Strings
local name = "Alex"
local message = "Hello, World!"
local emoji = "🎮"

-- Booleans
local isActive = true
local isComplete = false

-- Nil (nothing/empty)
local empty = nil

-- Tables (arrays/objects)
local fruits = {"apple", "banana", "orange"}
local player = {
    name = "John",
    health = 100,
    level = 5
}
```

### Type Annotations (Luau Feature)

```luau
-- Specify expected types
local health: number = 100
local name: string = "Player"
local active: boolean = true

-- Array types
local scores: {number} = {100, 95, 87}

-- Custom types
local function add(a: number, b: number): number
    return a + b
end

local result = add(5, 3)  -- Type checked!
```

## String Operations

```luau
-- Concatenation
local firstName = "John"
local lastName = "Doe"
local fullName = firstName .. " " .. lastName
print(fullName)  -- Output: John Doe

-- String methods
local text = "hello world"
print(string.upper(text))      -- HELLO WORLD
print(string.lower(text))      -- hello world
print(string.len(text))        -- 11
print(string.sub(text, 1, 5))  -- hello

-- Formatting
local score = 100
local message = string.format("Score: %d", score)
print(message)  -- Score: 100

-- Escape characters
local quote = "She said \"Hi!\""
local newline = "Line 1\nLine 2"
```

## Arithmetic and Logic

### Math Operations

```luau
local a = 10
local b = 3

print(a + b)      -- 13 (addition)
print(a - b)      -- 7 (subtraction)
print(a * b)      -- 30 (multiplication)
print(a / b)      -- 3.333... (division)
print(a % b)      -- 1 (modulo/remainder)
print(a ^ 2)      -- 100 (exponent)

-- Shorthand operators
local x = 5
x += 3            -- x = 8
x -= 2            -- x = 6
x *= 2            -- x = 12
x /= 3            -- x = 4
```

### Comparison

```luau
local a = 5
local b = 10

print(a == b)     -- false (equal to)
print(a ~= b)     -- true (not equal to)
print(a < b)      -- true (less than)
print(a > b)      -- false (greater than)
print(a <= b)     -- true (less than or equal)
print(a >= b)     -- false (greater than or equal)
```

### Logic Operators

```luau
local x = true
local y = false

print(x and y)    -- false (both must be true)
print(x or y)     -- true (at least one true)
print(not x)      -- false (opposite)

-- Practical example
local canShoot = hasAmmo and isReady and not isReloading
if canShoot then
    -- Fire weapon
end
```

## Conditional Statements

### If Statement

```luau
local health = 50

if health > 100 then
    print("Full health")
elseif health > 50 then
    print("Good health")
elseif health > 0 then
    print("Low health")
else
    print("Dead")
end
```

### Ternary Operator

```luau
-- Quick if/else
local status = health > 0 and "Alive" or "Dead"

-- More readable for simple cases
local message = (score > 100) and "High Score!" or "Try again"
```

## Loops

### For Loop

```luau
-- Numeric for loop
for i = 1, 5 do
    print(i)  -- 1, 2, 3, 4, 5
end

-- With step
for i = 0, 10, 2 do
    print(i)  -- 0, 2, 4, 6, 8, 10
end

-- Counting down
for i = 5, 1, -1 do
    print(i)  -- 5, 4, 3, 2, 1
end
```

### Table Iteration

```luau
local fruits = {"apple", "banana", "orange"}

-- Using ipairs (ordered)
for index, fruit in ipairs(fruits) do
    print(index, fruit)
    -- 1 apple
    -- 2 banana
    -- 3 orange
end

-- Using pairs (any order)
local player = {name = "John", health = 100, level = 5}
for key, value in pairs(player) do
    print(key, value)
    -- name John
    -- health 100
    -- level 5
end
```

### While Loop

```luau
local count = 0
while count < 5 do
    print(count)
    count += 1
end

-- Infinite loop (use with care!)
while true do
    print("Repeating forever...")
    task.wait(1)  -- Wait 1 second before next iteration
end
```

### Loop Control

```luau
-- Break (exit loop)
for i = 1, 10 do
    if i == 5 then
        break
    end
    print(i)  -- 1, 2, 3, 4
end

-- Continue (skip to next iteration)
for i = 1, 5 do
    if i == 3 then
        continue
    end
    print(i)  -- 1, 2, 4, 5
end
```

## Functions

### Basic Functions

```luau
local function greet(name)
    print("Hello, " .. name)
end

greet("Alice")  -- Hello, Alice
```

### Return Values

```luau
local function add(a, b)
    return a + b
end

local result = add(5, 3)
print(result)  -- 8

-- Multiple returns
local function getPlayerInfo()
    return "John", 25, 100
end

local name, age, health = getPlayerInfo()
```

### Default Parameters

```luau
local function attack(damage, target)
    target = target or "Enemy"
    damage = damage or 10
    print("Attacking " .. target .. " for " .. damage .. " damage")
end

attack()           -- Attacking Enemy for 10 damage
attack(20)         -- Attacking Enemy for 20 damage
attack(15, "Boss") -- Attacking Boss for 15 damage
```

### Type Annotations

```luau
local function multiply(a: number, b: number): number
    return a * b
end

print(multiply(4, 5))  -- 20
-- multiply("a", "b")  -- Type error! (won't compile)

-- Function that returns nothing
local function logMessage(msg: string): ()
    print(msg)
end
```

## Tables (Arrays)

### Creating and Accessing

```luau
-- Array-like table
local scores = {100, 95, 87, 92}
print(scores[1])      -- 100 (first element)
print(scores[2])      -- 95
print(#scores)        -- 4 (length)

-- Object-like table
local player = {
    name = "John",
    health = 100,
    level = 5
}

print(player.name)     -- John
print(player["health"]) -- 100
```

### Modifying Tables

```luau
local list = {1, 2, 3}

-- Add item
table.insert(list, 4)  -- {1, 2, 3, 4}

-- Add at specific position
table.insert(list, 2, 99)  -- {1, 99, 2, 3, 4}

-- Remove item
table.remove(list, 2)  -- {1, 2, 3, 4}

-- Find item
local index = table.find(list, 3)  -- 3
```

### Table Functions

```luau
local function printTable(t)
    for key, value in pairs(t) do
        print(key .. " = " .. tostring(value))
    end
end

-- Count items
local count = 0
for _ in pairs(myTable) do
    count += 1
end
print("Items: " .. count)

-- Merge tables
local table1 = {a = 1, b = 2}
local table2 = {c = 3, d = 4}

local merged = {}
for k, v in pairs(table1) do merged[k] = v end
for k, v in pairs(table2) do merged[k] = v end
-- merged = {a=1, b=2, c=3, d=4}
```

## Common Patterns

### Safe Object Access

```luau
-- Bad - error if humanoid doesn't exist
local health = character.Humanoid.Health

-- Good - check first
local humanoid = character:FindFirstChild("Humanoid")
if humanoid then
    local health = humanoid.Health
end

-- Best - use WaitForChild with timeout
local humanoid = character:WaitForChild("Humanoid", 5)
if humanoid then
    local health = humanoid.Health
end
```

### Debouncing

```luau
local lastAttack = 0
local ATTACK_COOLDOWN = 0.5

local function attack()
    if tick() - lastAttack < ATTACK_COOLDOWN then
        return  -- Too soon to attack
    end
    
    lastAttack = tick()
    -- Perform attack
end
```

### Task Scheduling

```luau
-- Run code once after delay
task.wait(5)
print("5 seconds passed")

-- Run code repeatedly
task.spawn(function()
    while true do
        print("Every second")
        task.wait(1)
    end
end)

-- Delay a function
task.defer(function()
    print("Next frame")
end)
```

## Best Practices

1. **Always use `local`**: Prevents global pollution
2. **Use meaningful names**: `playerHealth` not `h`
3. **Add type annotations**: Catches errors early
4. **Comment complex code**: Help future developers
5. **Keep functions small**: Easier to test and debug

## Summary

You now know:
- Creating and using variables
- String operations
- Math and logic
- Conditional statements
- Loops and iteration
- Functions
- Tables

Next: [Roblox API Basics](../api-basics)

---

**Questions?** Join our [Discord](/discord) for help!
