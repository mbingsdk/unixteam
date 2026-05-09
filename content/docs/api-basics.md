---
title: "Roblox API Basics"
category: "Programming"
order: 3
---

# Roblox API Basics

Learn how to interact with Roblox game objects and services.

## Game Structure

Roblox games are hierarchical:

```
game
├── Workspace (3D world)
│   ├── Baseplate (Part)
│   ├── Character (Model with humanoid)
│   └── ...
├── ServerScriptService (Scripts run here)
├── Players (Connected players)
│   └── Player1 (LocalPlayer)
│       ├── PlayerGui (UI elements)
│       └── Character
└── ...
```

## Accessing Game Objects

### Finding Objects

```luau
-- Access by path
local part = game.Workspace.Part

-- Using FindFirstChild (returns nil if not found)
local humanoid = character:FindFirstChild("Humanoid")
if humanoid then
    print("Found humanoid")
end

-- Using WaitForChild (waits for object to exist)
local humanoid = character:WaitForChild("Humanoid", 5)  -- 5 second timeout

-- Using FindFirstDescendant (search entire tree)
local target = workspace:FindFirstDescendant("TargetPart")

-- Using FindFirstChildOfClass (search by type)
local humanoid = character:FindFirstChildOfClass("Humanoid")
```

## Working with Properties

### Reading Properties

```luau
local part = game.Workspace.Part

local size = part.Size           -- Vector3
local color = part.Color         -- Color3
local position = part.Position   -- Vector3
local isAnchored = part.Anchored -- boolean
local transparency = part.Transparency  -- number (0-1)
```

### Modifying Properties

```luau
local part = game.Workspace.Part

-- Change size
part.Size = Vector3.new(2, 2, 2)

-- Change color
part.Color = Color3.fromRGB(255, 0, 0)  -- Red

-- Change position
part.Position = Vector3.new(0, 10, 0)

-- Disable physics
part.CanCollide = false

-- Make transparent
part.Transparency = 0.5

-- Change rotation
part.Rotation = Vector3.new(45, 90, 0)
```

## Creating Objects

### Creating Parts

```luau
-- Create a new part
local part = Instance.new("Part")
part.Size = Vector3.new(2, 2, 2)
part.Color = Color3.fromRGB(0, 0, 255)  -- Blue
part.Position = Vector3.new(0, 10, 0)

-- Important: Set parent last
part.Parent = game.Workspace

-- Creating a part in one line (after setting parent)
local part2 = Instance.new("Part")
part2.Parent = game.Workspace
```

### Creating Models

```luau
-- Create a model to group parts
local model = Instance.new("Model")
model.Name = "MyModel"
model.Parent = game.Workspace

-- Add parts to model
local part1 = Instance.new("Part")
part1.Parent = model

local part2 = Instance.new("Part")
part2.Parent = model
```

### Creating GUI Elements

```luau
-- Create a screen GUI
local screenGui = Instance.new("ScreenGui")
screenGui.ResetOnSpawn = false
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Create a button
local button = Instance.new("TextButton")
button.Text = "Click Me"
button.Size = UDim2.new(0, 200, 0, 50)
button.Position = UDim2.new(0.5, -100, 0.5, -25)
button.Parent = screenGui

-- Connect click event
button.MouseButton1Click:Connect(function()
    print("Button clicked!")
end)
```

## Events and Connections

### Understanding Events

```luau
local part = game.Workspace.Part

-- Connect to Touched event
local function onTouched(hit)
    print("Part was touched by: " .. hit.Name)
end

part.Touched:Connect(onTouched)

-- Common events
part.Changed:Connect(function(property)
    print("Part property changed: " .. property)
end)

game.Players.PlayerAdded:Connect(function(player)
    print("Player joined: " .. player.Name)
end)
```

### Disconnecting Events

```luau
local part = game.Workspace.Part

local connection
connection = part.Touched:Connect(function(hit)
    print("Touched!")
    connection:Disconnect()  -- Only trigger once
end)

-- Or store and disconnect later
local connections = {}

local conn1 = part.Touched:Connect(function()
    print("Touch 1")
end)
table.insert(connections, conn1)

-- Clean up all
for _, conn in ipairs(connections) do
    conn:Disconnect()
end
```

### Debouncing Events

```luau
local part = game.Workspace.Part
local debounce = false

part.Touched:Connect(function(hit)
    if debounce then return end
    
    debounce = true
    print("Touched!")
    
    task.wait(1)  -- Wait 1 second
    debounce = false
end)
```

## Services

Services are game systems like Players, UserInputService, etc.

### Common Services

```luau
-- Players service
local Players = game:GetService("Players")

-- Get all players
for _, player in pairs(Players:GetPlayers()) do
    print(player.Name)
end

-- UserInputService (local only)
local UserInputService = game:GetService("UserInputService")

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.Space then
        print("Space pressed!")
    end
end)

-- TweenService (for animations)
local TweenService = game:GetService("TweenService")

local info = TweenInfo.new(
    1,  -- Duration
    Enum.EasingStyle.Quad,
    Enum.EasingDirection.InOut
)

local tween = TweenService:Create(part, info, {Color = Color3.fromRGB(255, 0, 0)})
tween:Play()

-- Debris service (cleanup)
local Debris = game:GetService("Debris")
Debris:AddItem(part, 5)  -- Remove part after 5 seconds
```

## Humanoids and Characters

### Getting Humanoid

```luau
local character = player.Character
if not character then
    character = player.CharacterAdded:Wait()
end

local humanoid = character:WaitForChild("Humanoid")

-- Check if alive
print("Health: " .. humanoid.Health)
print("Max Health: " .. humanoid.MaxHealth)
```

### Dealing Damage

```luau
local function damagePlayer(character, damage)
    local humanoid = character:FindFirstChild("Humanoid")
    if humanoid then
        humanoid:TakeDamage(damage)
    end
end

damagePlayer(player.Character, 10)
```

### Character Events

```luau
local player = game.Players.LocalPlayer

-- When character loads
player.CharacterAdded:Connect(function(character)
    print("Character loaded!")
    
    local humanoid = character:WaitForChild("Humanoid")
    
    -- When character dies
    humanoid.Died:Connect(function()
        print("Character died!")
    end)
end)
```

## Vectors and Positions

### Vector3 (3D positions)

```luau
-- Create a position
local pos = Vector3.new(10, 5, -20)
print(pos.X, pos.Y, pos.Z)  -- 10, 5, -20

-- Vector arithmetic
local pos1 = Vector3.new(1, 2, 3)
local pos2 = Vector3.new(4, 5, 6)

local sum = pos1 + pos2      -- Vector3.new(5, 7, 9)
local diff = pos1 - pos2     -- Vector3.new(-3, -3, -3)
local scaled = pos1 * 2      -- Vector3.new(2, 4, 6)

-- Distance between points
local distance = (pos1 - pos2).Magnitude
print("Distance: " .. distance)

-- Normalized vector (direction)
local direction = (pos2 - pos1).Unit
```

### CFrame (Position and Rotation)

```luau
-- Create a CFrame
local cframe = CFrame.new(10, 5, 0)  -- Position only

-- CFrame with rotation
local cframe2 = CFrame.Angles(math.rad(45), 0, 0)

-- Apply to part
local part = game.Workspace.Part
part.CFrame = cframe

-- Get position from CFrame
local position = part.CFrame.Position
local x, y, z = part.CFrame.Position.X, part.CFrame.Position.Y, part.CFrame.Position.Z

-- Rotate part
part.CFrame = part.CFrame * CFrame.Angles(math.rad(45), 0, 0)
```

## Common Patterns

### Safe Part Deletion

```luau
local function deletePart(part)
    if part and part.Parent then
        part:Destroy()
    end
end

deletePart(game.Workspace.Part)
```

### Cloning Objects

```luau
local original = game.Workspace.OriginalPart
local clone = original:Clone()
clone.Parent = game.Workspace

-- Clone and position
local newPart = original:Clone()
newPart.Position = Vector3.new(0, 10, 0)
newPart.Parent = game.Workspace
```

### Creating Shortcuts

```luau
-- At top of script for easy access
local Players = game:GetService("Players")
local Workspace = game.Workspace
local UserInputService = game:GetService("UserInputService")

-- Now use short names
local player = Players.LocalPlayer
```

## Summary

You now know:
- Game structure and hierarchy
- Finding and accessing objects
- Modifying properties
- Creating new instances
- Working with events
- Using services
- Vector math and CFrames

Next: [Building Your First Game](../first-game)

---

**Need help?** Ask in our [Discord](/discord)!
