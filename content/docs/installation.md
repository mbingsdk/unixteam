---
title: "Installation & Setup"
category: "Getting Started"
order: 1
---

# Installation & Setup

Get up and running with Roblox development in minutes.

## Prerequisites

- **Windows, Mac, or Linux**
- **At least 4GB RAM**
- **1.5GB free disk space**
- **Internet connection**

## Step 1: Download Roblox Studio

1. Visit [Roblox Create](https://www.roblox.com/create)
2. Click **"Download for [Your OS]"**
3. Run the installer
4. Follow the installation wizard

## Step 2: Create Your First Game

1. Open Roblox Studio
2. Click **New** in the left panel
3. Select **Baseplate** template
4. Click **Create**

Congratulations! Your first Roblox game is ready.

## Step 3: Navigate the Interface

### Left Panel
- **Toolbox**: Insert parts, models, and scripts
- **Explorer**: View game hierarchy
- **Properties**: Edit selected object properties

### Center Area
- **3D Viewport**: View and build your game world
- **Script Editor**: Write and edit code

### Right Panel
- **Toolbars**: Building tools and shortcuts
- **Output**: Console messages and errors

## Step 4: Insert Your First Part

1. Go to **Toolbox** → **Models**
2. Search for **"Part"**
3. Click to insert
4. In the **Explorer**, select **Part**
5. In **Properties**, change:
   - **Size**: 2 x 2 x 2
   - **Color**: Red (255, 0, 0)
   - **Position**: 0, 5, 0

## Step 5: Write Your First Script

1. In **Explorer**, right-click **ServerScriptService**
2. Select **Insert Object** → **Script**
3. Double-click the script to open editor
4. Replace the default code with:

```luau
print("Hello, Roblox!")

local part = game.Workspace.Part
if part then
    part.Color = Color3.fromRGB(0, 255, 0)  -- Change to green
end
```

5. Click **File** → **Save**
6. Click the **Play** button to test

You should see your part turn green and the message in the output!

## Step 6: Test Your Game

### Using Play/Stop
- **Play (F5)**: Start the game as the host
- **Play Here (Ctrl+F5)**: Start as a player
- **Stop (Ctrl+F5)**: Stop testing

### Testing Multiplayer
1. Click the **three dots** next to Play
2. Select **Start 1 Server + 2 Players**
3. Test your game with multiple players

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Play | F5 |
| Play Here | Ctrl + F5 |
| Stop | Shift + Ctrl + F5 |
| Save | Ctrl + S |
| Undo | Ctrl + Z |
| Redo | Ctrl + Y |
| Select | R |
| Move | T |
| Rotate | Y |
| Scale | G |

## Useful Settings

### Enabling Autocomplete
1. **File** → **Settings**
2. Check **"Autocomplete Enabled"**
3. Click **Save**

### Setting Up Output
1. **View** → **Output**
2. Output shows all prints and errors

### Enabling Package Require
1. **File** → **Settings**
2. Check **"Plugin Debug Mode"** (advanced users)

## Common Issues

### "Script not running"
- Check that **StreamingEnabled** is off (if new)
- Verify the script is in **ServerScriptService** (not LocalScript)
- Look for errors in **Output**

### "Part not found"
- Make sure the part exists in the **Explorer**
- Check the spelling and case (Luau is case-sensitive)
- Use `:WaitForChild()` to wait for parts to load

### "Port already in use"
- Close other Roblox Studio windows
- Wait 30 seconds and try again
- Restart Roblox Studio

## Next Steps

1. [Learn Luau Basics](../luau-basics)
2. [Create Your First Game](../first-game)
3. [Explore the API](../api-reference)

## Additional Resources

- [Official Roblox Documentation](https://create.roblox.com/docs)
- [Roblox Developer Forum](https://devforum.roblox.com/)
- [Roblox API Reference](https://create.roblox.com/docs/reference/engine)

---

**Stuck?** Ask for help in our [Discord community](/discord)!
