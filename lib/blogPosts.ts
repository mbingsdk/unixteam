export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  author?: string;
  featured: boolean;
  content?: string;
  sections?: Array<{
    title: string;
    content: string;
    code?: string;
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-luau',
    title: 'Getting Started with Luau: A Complete Guide',
    description: 'Learn the basics of Luau programming language and start building Roblox games with confidence.',
    date: '2024-05-15',
    readingTime: '8 min read',
    category: 'Tutorial',
    author: 'UNIX-TEAM',
    featured: true,
    sections: [
      {
        title: 'What is Luau?',
        content: 'Luau is a fast, dynamically typed language designed for Roblox. It\'s based on Lua but with modern features and better performance. Luau combines the simplicity of Lua with powerful capabilities for game development.',
      },
      {
        title: 'Setting Up Your First Script',
        content: 'To start scripting in Roblox, you\'ll need Roblox Studio. Download it from the official website, create a new project, and insert your first script. Scripts in Roblox are placed in specific locations like ServerScriptService or StarterPlayer.',
        code: 'local Players = game:GetService("Players")\n\nlocal function onPlayerAdded(player)\n    print(player.Name .. " joined the game!")\nend\n\nPlayers.PlayerAdded:Connect(onPlayerAdded)',
      },
      {
        title: 'Basic Variables and Data Types',
        content: 'Luau supports various data types: numbers, strings, booleans, tables, functions, and more. Variables are declared using the local keyword to keep them scoped properly in your scripts.',
        code: 'local playerName = "John"\nlocal playerLevel = 10\nlocal isAdmin = false\nlocal playerInventory = {"sword", "shield", "potion"}\n\nprint(playerName)\nprint(playerLevel)\nprint(playerInventory[1])',
      },
      {
        title: 'Control Flow: Conditionals',
        content: 'Use if/then/else statements to control the flow of your program. This allows you to execute different code based on conditions.',
        code: 'local playerLevel = 10\n\nif playerLevel >= 10 then\n    print("Player is experienced!")\nelseif playerLevel >= 5 then\n    print("Player is intermediate")\nelse\n    print("Player is a beginner")\nend',
      },
      {
        title: 'Loops: Repeating Code',
        content: 'Loops allow you to repeat code multiple times. Luau supports for loops, while loops, and repeat until loops. Each has its use case.',
        code: 'for i = 1, 5 do\n    print("Iteration " .. i)\nend\n\nlocal count = 0\nwhile count < 5 do\n    print("Count: " .. count)\n    count = count + 1\nend',
      },
      {
        title: 'Functions: Reusable Code',
        content: 'Functions let you group code into reusable blocks. They help organize your code and make it more maintainable. Functions can take parameters and return values.',
        code: 'local function greet(name, level)\n    return "Welcome " .. name .. " (Level " .. level .. ")!"\nend\n\nlocal message = greet("Alice", 15)\nprint(message)',
      },
      {
        title: 'Best Practices',
        content: 'Always use local variables to avoid polluting the global scope. Use meaningful variable names. Comment your code. Follow consistent indentation. Test your scripts frequently.',
      },
    ],
  },
  {
    id: '2',
    slug: 'performance-optimization-tips',
    title: 'Performance Optimization Tips for Roblox Games',
    description: 'Essential techniques to optimize your Roblox games for better performance and smoother gameplay.',
    date: '2024-05-10',
    readingTime: '10 min read',
    category: 'Development',
    author: 'UNIX-TEAM',
    featured: true,
    sections: [
      {
        title: 'Understanding Performance Bottlenecks',
        content: 'Performance issues come from many sources: too many objects, expensive computations, inefficient algorithms, and poor script design. Understanding where your game lags is the first step to optimization.',
      },
      {
        title: '1. Use Debouncing for Events',
        content: 'Debouncing prevents a function from being called too frequently. This is crucial for events that fire repeatedly like touched events.',
        code: 'local debounce = false\nlocal cooldown = 1\n\nscript.Parent.Touched:Connect(function(hit)\n    if debounce then return end\n    debounce = true\n    \n    print("Touch detected!")\n    \n    task.wait(cooldown)\n    debounce = false\nend)',
      },
      {
        title: '2. Optimize Loop Performance',
        content: 'Avoid loops with too many iterations. Cache values before loops. Use table.find() instead of manual loops when possible.',
        code: 'local items = {"sword", "shield", "potion", "mana"}\nlocal searchFor = "shield"\n\n-- Bad: Creates many comparisons\nfor i = 1, #items do\n    if items[i] == searchFor then\n        print("Found!")\n        break\n    end\nend\n\n-- Good: Uses optimized function\nif table.find(items, searchFor) then\n    print("Found!")\nend',
      },
      {
        title: '3. Use Efficient Data Structures',
        content: 'Choose the right data structure for your needs. For quick lookups, use tables with string keys instead of arrays.',
        code: 'local itemPrices = {}\nitemPrices["sword"] = 100\nitemPrices["shield"] = 150\n\nlocal price = itemPrices["sword"]\nprint(price)',
      },
      {
        title: '4. Cache Service References',
        content: 'Getting services is relatively expensive. Cache them once and reuse throughout your script.',
        code: 'local Players = game:GetService("Players")\nlocal Workspace = workspace\nlocal RunService = game:GetService("RunService")\n\n-- Now use these cached references instead of getting them repeatedly',
      },
      {
        title: '5. Use Coroutines for Heavy Operations',
        content: 'Heavy computations can freeze your game. Use coroutines to spread work across multiple frames.',
        code: 'local function heavyComputation()\n    local sum = 0\n    for i = 1, 1000000 do\n        sum = sum + i\n    end\n    return sum\nend\n\nlocal co = coroutine.create(function()\n    local result = heavyComputation()\n    print("Result: " .. result)\nend)\n\ncoroutine.resume(co)',
      },
      {
        title: '6. Minimize Network Traffic',
        content: 'Each RemoteEvent call has overhead. Batch multiple updates into one call when possible.',
      },
      {
        title: '7. Use Object Pooling',
        content: 'Instead of creating and destroying objects frequently, reuse them. This reduces garbage collection overhead.',
      },
      {
        title: '8. Optimize Rendering with CanCollide',
        content: 'Set CanCollide to false for parts that don\'t need collision. This reduces physics calculations.',
      },
      {
        title: '9. Use Magnitude Checks Carefully',
        content: 'Magnitude calculations are expensive. Use squared magnitude comparisons when possible to avoid square root calculations.',
        code: 'local distance = (playerA.Position - playerB.Position).Magnitude\nlocal sqrDistance = (playerA.Position - playerB.Position).Magnitude ^ 2\n\n-- Use sqrDistance for comparisons\nif sqrDistance < 100 ^ 2 then\n    print("Close enough")\nend',
      },
      {
        title: '10. Profile Your Game',
        content: 'Use Roblox Studio\'s built-in profiler to find where your game is actually slow. Don\'t optimize blindly.',
      },
    ],
  },
  {
    id: '3',
    slug: 'roblox-ui-design-guide',
    title: 'Roblox UI Design: Creating Professional Interfaces',
    description: 'Learn how to design beautiful, functional, and professional user interfaces for your Roblox games.',
    date: '2024-05-05',
    readingTime: '7 min read',
    category: 'Design',
    author: 'UNIX-TEAM',
    featured: false,
    sections: [
      {
        title: 'UI Fundamentals',
        content: 'Good UI is invisible. Players shouldn\'t have to think about how to use it. Focus on clarity, consistency, and accessibility.',
      },
      {
        title: 'Color Palette Selection',
        content: 'Choose 3-5 main colors: primary, secondary, accent, and neutral colors. Ensure good contrast for readability. Test with colorblind-friendly colors.',
      },
      {
        title: 'Typography in Roblox',
        content: 'Use clear, readable fonts. Maintain consistent font sizes and weights. Use hierarchy to guide the eye. Make text size at least 14 for readability.',
        code: 'local textLabel = Instance.new("TextLabel")\ntextLabel.TextSize = 18\ntextLabel.TextColor3 = Color3.fromRGB(255, 255, 255)\ntextLabel.Font = Enum.Font.GothamBold\ntextLabel.Text = "Welcome to UNIX-TEAM"',
      },
      {
        title: 'Button Design Best Practices',
        content: 'Buttons should be clearly clickable. Use visual feedback (hover states, click animations). Provide clear action labels. Group related buttons together.',
      },
      {
        title: 'Responsive Design',
        content: 'Design for different screen sizes. Use Scale instead of Offset when possible. Test on mobile and desktop. Ensure buttons are large enough for touch.',
      },
      {
        title: 'Common UI Patterns',
        content: 'Menu systems, inventory grids, chat boxes, health bars. Study successful games to understand patterns.',
      },
      {
        title: 'Accessibility Tips',
        content: 'Ensure sufficient contrast. Use icons with labels. Provide keyboard navigation. Consider colorblind players. Make text large enough.',
      },
      {
        title: 'Animation in UI',
        content: 'Smooth animations improve feel. Use tweens for moving elements. Keep animations fast (200-500ms). Don\'t animate for accessibility.',
        code: 'local TweenService = game:GetService("TweenService")\nlocal tweenInfo = TweenInfo.new(\n    0.5, -- Duration\n    Enum.EasingStyle.Quad,\n    Enum.EasingDirection.Out\n)\nlocal tween = TweenService:Create(guiElement, tweenInfo, {Position = newPosition})\ntween:Play()',
      },
    ],
  },
  {
    id: '4',
    slug: 'advanced-lua-patterns',
    title: 'Advanced Lua Patterns for Game Development',
    description: 'Learn advanced Lua patterns and techniques to write more efficient and maintainable code.',
    date: '2024-04-28',
    readingTime: '8 min read',
    category: 'Development',
    author: 'UNIX-TEAM',
    featured: false,
    sections: [
      {
        title: 'Object-Oriented Programming with Tables',
        content: 'Lua tables can simulate OOP through metatables and prototype patterns. This is essential for large projects.',
      },
      {
        title: 'Metatables and Metamethods',
        content: 'Metatables allow you to define custom behavior for tables. Learn __index, __newindex, __call, and other metamethods.',
      },
      {
        title: 'Module Pattern',
        content: 'Create reusable modules by returning tables with functions. This is the foundation of modular Roblox development.',
      },
      {
        title: 'Event Systems',
        content: 'Build custom event systems for loose coupling. This is more flexible than direct function calls.',
      },
    ],
  },
];
