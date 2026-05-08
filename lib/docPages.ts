export interface DocSection {
  title: string;
  content: string;
  code?: string;
  tips?: string;
  subsections?: Array<{
    title: string;
    content: string;
    code?: string;
  }>;
}

export interface DocPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  sections: DocSection[];
}

export const docPages: DocPage[] = [
  {
    id: '1',
    slug: 'installation',
    title: 'Installation & Setup',
    description: 'Get started with Roblox Studio and create your first project.',
    category: 'Getting Started',
    order: 1,
    sections: [
      {
        title: 'Download Roblox Studio',
        content: 'Roblox Studio is the official IDE for creating Roblox games. It\'s completely free and available for Windows and macOS. Head over to the Roblox website and click the "Create" button to download Roblox Studio.',
        tips: 'Make sure your computer meets the minimum requirements: Windows 7 or later, macOS 10.7 or later, 512MB RAM minimum (1GB+ recommended).',
      },
      {
        title: 'Create Your First Game',
        content: 'Open Roblox Studio and you\'ll see the start screen. Click on a template to create a new game, or start with a blank project. For beginners, we recommend starting with the "Baseplate" template.',
      },
      {
        title: 'Understanding the Interface',
        content: 'The Roblox Studio interface has several key areas:',
        subsections: [
          {
            title: 'Viewport (Center)',
            content: 'This is where you see your game world in 3D. You can navigate using the mouse and keyboard.',
          },
          {
            title: 'Explorer (Left)',
            content: 'Shows the hierarchy of all objects in your game. You can expand and collapse folders to organize your workspace.',
          },
          {
            title: 'Properties (Right)',
            content: 'Shows all properties of the selected object. You can modify these to change how objects behave.',
          },
          {
            title: 'Output (Bottom)',
            content: 'Shows debug messages and errors from your scripts. This is essential for debugging.',
          },
        ],
      },
      {
        title: 'Insert Your First Part',
        content: 'Let\'s create a simple object. Go to Insert > Part and place it in the game world. You\'ll see it appear in the Explorer on the left. Try changing its properties like Size, Color, and Position.',
      },
      {
        title: 'Create Your First Script',
        content: 'Right-click on a Part and select "Insert Object > Script". A new script will be created inside that part. Double-click it to open the editor.',
        code: '-- This is your first script!\nlocal part = script.Parent\npart.BrickColor = BrickColor.new("Bright red")\nprint("Hello, Roblox!")',
      },
      {
        title: 'Test Your Game',
        content: 'Click the "Play" button in the top toolbar to test your game. You\'ll see a new window open with your game running. Click "Stop" when you\'re done testing.',
        tips: 'Use Ctrl+P to quickly toggle between play and edit mode.',
      },
    ],
  },
  {
    id: '2',
    slug: 'luau-basics',
    title: 'Luau Programming Basics',
    description: 'Learn the fundamentals of Luau programming language.',
    category: 'Programming',
    order: 2,
    sections: [
      {
        title: 'What is Luau?',
        content: 'Luau is Roblox\'s scripting language, based on Lua but optimized for game development. It\'s lightweight, fast, and easy to learn. Every script you write in Roblox is written in Luau.',
      },
      {
        title: 'Variables and Data Types',
        content: 'Variables store data that your program uses. Luau has several data types:',
        subsections: [
          {
            title: 'Numbers',
            content: 'Used for integers and decimals.',
            code: 'local playerHealth = 100\nlocal playerSpeed = 16.5',
          },
          {
            title: 'Strings',
            content: 'Text values enclosed in quotes.',
            code: 'local playerName = "Alice"\nlocal message = "Welcome to UNIX-TEAM!"',
          },
          {
            title: 'Booleans',
            content: 'True or false values.',
            code: 'local isAlive = true\nlocal isAdmin = false',
          },
          {
            title: 'Tables',
            content: 'Collections of data, like arrays or dictionaries.',
            code: 'local inventory = {"sword", "shield", "potion"}\nlocal playerStats = {health = 100, mana = 50}',
          },
          {
            title: 'Nil',
            content: 'Represents nothing or absence of value.',
            code: 'local empty = nil',
          },
        ],
      },
      {
        title: 'Operators',
        content: 'Operators perform operations on values:',
        subsections: [
          {
            title: 'Arithmetic',
            content: 'Basic math operations.',
            code: 'local sum = 5 + 3\nlocal product = 4 * 2\nlocal difference = 10 - 3\nlocal quotient = 20 / 4\nlocal power = 2 ^ 3  -- 2 to the power of 3',
          },
          {
            title: 'Comparison',
            content: 'Compare values to get true/false results.',
            code: 'local isEqual = 5 == 5  -- true\nlocal isNotEqual = 5 ~= 3  -- true\nlocal isGreater = 10 > 5  -- true\nlocal isLess = 3 < 10  -- true',
          },
          {
            title: 'Logical',
            content: 'Combine conditions.',
            code: 'local result = true and false  -- false\nlocal result2 = true or false  -- true\nlocal result3 = not true  -- false',
          },
        ],
      },
      {
        title: 'Control Flow: If Statements',
        content: 'Make decisions based on conditions.',
        code: 'local playerLevel = 10\n\nif playerLevel >= 10 then\n    print("You are experienced!")\nelseif playerLevel >= 5 then\n    print("You are intermediate")\nelse\n    print("You are a beginner")\nend',
        tips: 'Always use "then" after the condition and "end" to close the if statement.',
      },
      {
        title: 'Loops: For and While',
        content: 'Repeat code multiple times:',
        subsections: [
          {
            title: 'For Loop',
            content: 'Repeat a specific number of times.',
            code: 'for i = 1, 5 do\n    print("Iteration " .. i)\nend\n\n-- Output: Iteration 1, Iteration 2, ... Iteration 5',
          },
          {
            title: 'While Loop',
            content: 'Repeat while a condition is true.',
            code: 'local count = 0\nwhile count < 5 do\n    print("Count: " .. count)\n    count = count + 1\nend',
          },
          {
            title: 'Breaking Loops',
            content: 'Exit a loop early with break.',
            code: 'for i = 1, 10 do\n    if i == 5 then\n        break  -- Exit loop when i equals 5\n    end\n    print(i)\nend',
          },
        ],
      },
      {
        title: 'Functions',
        content: 'Reusable blocks of code. Functions help organize code and prevent repetition.',
        code: 'local function greet(name, level)\n    return "Welcome " .. name .. " (Level " .. level .. ")!"\nend\n\nlocal message = greet("Alice", 15)\nprint(message)  -- Output: Welcome Alice (Level 15)!',
        tips: 'Function names should be descriptive. Use lowercase with underscores (snake_case) for function names.',
      },
      {
        title: 'String Concatenation',
        content: 'Join strings together using the .. operator.',
        code: 'local firstName = "John"\nlocal lastName = "Doe"\nlocal fullName = firstName .. " " .. lastName\nprint(fullName)  -- Output: John Doe',
      },
      {
        title: 'Tables and Indexing',
        content: 'Access elements in tables using indexes or keys.',
        code: 'local fruits = {"apple", "banana", "orange"}\nprint(fruits[1])  -- Output: apple\n\nlocal person = {name = "Alice", age = 25}\nprint(person.name)  -- Output: Alice',
      },
    ],
  },
  {
    id: '3',
    slug: 'api-basics',
    title: 'Roblox API Fundamentals',
    description: 'Understand the core Roblox API for game development.',
    category: 'Programming',
    order: 3,
    sections: [
      {
        title: 'The Game Hierarchy',
        content: 'Roblox games have a hierarchical structure. The "game" object is the root, containing DataModel with services and game content.',
      },
      {
        title: 'Services',
        content: 'Services are essential systems in Roblox. Access them using game:GetService(). Common services include:',
        subsections: [
          {
            title: 'Players Service',
            content: 'Manages players in your game.',
            code: 'local Players = game:GetService("Players")\n\nlocal function onPlayerAdded(player)\n    print(player.Name .. " joined!")\nend\n\nPlayers.PlayerAdded:Connect(onPlayerAdded)',
          },
          {
            title: 'RunService',
            content: 'Connects to game loops (Heartbeat, RenderStepped).',
            code: 'local RunService = game:GetService("RunService")\n\nRunService.Heartbeat:Connect(function(deltaTime)\n    -- Code here runs every frame\n    print("Frame!")\nend)',
          },
          {
            title: 'Workspace',
            content: 'Contains all physical objects in the game.',
            code: 'local Workspace = workspace\n\nlocal part = Instance.new("Part")\npart.Parent = Workspace',
          },
          {
            title: 'UserInputService',
            content: 'Detects player input (keyboard, mouse, etc).',
            code: 'local UserInputService = game:GetService("UserInputService")\n\nUserInputService.InputBegan:Connect(function(input, gameProcessed)\n    if gameProcessed then return end\n    if input.KeyCode == Enum.KeyCode.Space then\n        print("Space pressed!")\n    end\nend)',
          },
        ],
      },
      {
        title: 'Creating Objects',
        content: 'Create new instances using Instance.new(). Objects need a parent to exist in the game.',
        code: 'local part = Instance.new("Part")\npart.Shape = Enum.PartType.Ball\npart.Size = Vector3.new(1, 1, 1)\npart.Position = Vector3.new(0, 5, 0)\npart.BrickColor = BrickColor.new("Bright red")\npart.Parent = workspace  -- Make it visible',
      },
      {
        title: 'Properties',
        content: 'Objects have properties that define their behavior. Common part properties:',
        code: 'local part = Instance.new("Part")\npart.Size = Vector3.new(2, 1, 3)\npart.Position = Vector3.new(0, 10, 0)\npart.CanCollide = true\npart.TopSurface = Enum.SurfaceType.Smooth\npart.BottomSurface = Enum.SurfaceType.Brick\npart.Parent = workspace',
      },
      {
        title: 'Events',
        content: 'Events fire when something happens. Connect to events to respond to changes.',
        subsections: [
          {
            title: 'Touched Event',
            content: 'Fires when a part touches another part.',
            code: 'local part = script.Parent\n\npart.Touched:Connect(function(otherPart)\n    print(otherPart.Name .. " touched me!")\nend)',
          },
          {
            title: 'Changed Event',
            content: 'Fires when a property changes.',
            code: 'local part = script.Parent\n\npart:GetPropertyChangedSignal("Size"):Connect(function()\n    print("Size changed to " .. tostring(part.Size))\nend)',
          },
        ],
      },
      {
        title: 'Vectors and CFrames',
        content: 'Vector3 represents 3D positions. CFrame (Coordinate Frame) represents position and rotation.',
        code: 'local position = Vector3.new(0, 5, 0)\nlocal cframe = CFrame.new(Vector3.new(0, 5, 0)) * CFrame.Angles(0, math.rad(45), 0)\n\nlocal part = Instance.new("Part")\npart.Position = position\npart.CFrame = cframe\npart.Parent = workspace',
      },
      {
        title: 'Best Practices',
        content: 'Always parent objects last so they render immediately. Cache service references. Use local variables for frequently accessed objects. Check if instances exist before using them.',
      },
    ],
  },
];
