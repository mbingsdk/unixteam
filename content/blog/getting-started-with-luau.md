---
title: "Getting Started with Luau: A Complete Guide"
slug: "getting-started-with-luau"
date: "2024-05-15"
author: "Lex"
category: "Tutorial"
readingTime: "8 min read"
featured: true
description: "Learn the basics of Luau programming language and start building Roblox games with confidence."
---

# Getting Started with Luau: A Complete Guide

Luau is Roblox's programming language, a dialect of Lua optimized for game development. Whether you're a complete beginner or transitioning from another language, this guide will get you started.

## What is Luau?

Luau (pronounced "loo-ow") is a powerful scripting language designed specifically for Roblox. It combines Lua's simplicity with modern features like type annotations and better performance.

### Why Learn Luau?

- **Easy to learn**: Simple syntax, minimal boilerplate
- **Powerful**: Full access to Roblox APIs
- **Type-safe**: Optional type annotations prevent bugs
- **Fast**: Optimized compiler for performance
- **Community**: Massive community of developers

## Setting Up Your Environment

### Option 1: Roblox Studio (Recommended)
1. Download [Roblox Studio](https://www.roblox.com/create)
2. Create a new game
3. You're ready to code!

### Option 2: VS Code with Extensions
1. Install VS Code
2. Get the Luau extension by Roblox
3. Install the Roblox API Dump plugin
4. Connect to Roblox Studio via LSP

## Your First Script

Let's create a simple script that prints "Hello, World!" to the output:

```luau
-- This is a comment
local message = "Hello, World!"
print(message)
```

### Breaking It Down

- `--` starts a comment
- `local` creates a variable with local scope
- `print()` outputs to the console
- Strings are wrapped in quotes

## Understanding Variables

Variables store data. Luau requires `local` for good practice:

```luau
-- Numbers
local age = 25
local score = 99.5

-- Strings
local name = "Alex"
local greeting = "Welcome, " .. name

-- Booleans
local isReady = true
local isCompleted = false

-- Tables (arrays)
local fruits = {"apple", "banana", "orange"}
```

## Control Flow

### If Statements

```luau
local score = 85

if score >= 90 then
    print("Grade: A")
elseif score >= 80 then
    print("Grade: B")
elseif score >= 70 then
    print("Grade: C")
else
    print("Grade: F")
end
```

### Loops

```luau
-- For loop
for i = 1, 5 do
    print(i)
end

-- While loop
local count = 0
while count < 5 do
    print(count)
    count += 1
end

-- Table iteration
local colors = {"red", "green", "blue"}
for index, color in ipairs(colors) do
    print(index, color)
end
```

## Functions

Functions are reusable blocks of code:

```luau
-- Simple function
local function greet(name)
    print("Hello, " .. name)
end

greet("Alice") -- Output: Hello, Alice

-- Function with return value
local function add(a, b)
    return a + b
end

local result = add(5, 3)
print(result) -- Output: 8
```

## Working with Roblox Instances

In Roblox, almost everything is an Instance (parts, characters, GUI elements, etc.):

```luau
-- Get a part
local part = game.Workspace.Part

-- Change properties
part.Color = Color3.fromRGB(255, 0, 0) -- Red
part.Size = Vector3.new(2, 2, 2)
part.CanCollide = false

-- Create a new part
local newPart = Instance.new("Part")
newPart.Parent = game.Workspace
newPart.Position = Vector3.new(0, 10, 0)
```

## Events and Connections

React to game events:

```luau
local part = game.Workspace.Part

-- Connect to touched event
local function onTouched(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        print("Player touched the part!")
    end
end

part.Touched:Connect(onTouched)
```

## Best Practices

1. **Always use `local`**: Prevents global namespace pollution
   ```luau
   local myVar = 10  -- Good
   myVar = 10        -- Avoid
   ```

2. **Name variables clearly**: 
   ```luau
   local playerHealth = 100  -- Good
   local h = 100             -- Avoid
   ```

3. **Use type annotations** (Luau feature):
   ```luau
   local health: number = 100
   local name: string = "Player"
   local active: boolean = true
   ```

4. **Comment your code**:
   ```luau
   -- Damage the player by 10 HP
   playerHealth -= 10
   ```

5. **Avoid deeply nested code**: Keep it clean and readable

## Common Mistakes

### 1. Forgetting `local`
```luau
-- Bad - creates global variable
myVar = 5

-- Good - creates local variable
local myVar = 5
```

### 2. Wrong String Concatenation
```luau
-- Bad
print("Score: " + score)  -- Will error

-- Good
print("Score: " .. score)
```

### 3. Infinite Loops
```luau
-- Bad - will crash
while true do
    -- no break condition!
end

-- Good
local count = 0
while count < 10 do
    count += 1
end
```

## Next Steps

1. **Practice**: Write simple scripts daily
2. **Explore**: Check out the [Roblox API documentation](https://create.roblox.com/docs)
3. **Join Community**: Visit the [DevForum](https://devforum.roblox.com/)
4. **Build Projects**: Start with small games and level up

## Resources

- [Roblox Creator Documentation](https://create.roblox.com/docs)
- [Luau Documentation](https://luau-lang.org/)
- [Roblox Developer Community](https://devforum.roblox.com/)
- YouTube: Search "Roblox Luau tutorial"

## Conclusion

Luau is a fantastic language to learn game development. Start simple, practice consistently, and soon you'll be building amazing Roblox experiences. Happy coding!

---

Have questions? Join our [Discord community](/discord) to connect with other developers and get help!
