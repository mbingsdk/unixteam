// Sample data structure for UNIX-TEAM website
// In production, this could be loaded from CMS or markdown files

export const stats = [
  {
    label: 'Active Members',
    value: '5,000+',
    icon: '👥',
  },
  {
    label: 'Projects Built',
    value: '250+',
    icon: '🎮',
  },
  {
    label: 'Community Reach',
    value: '50K+',
    icon: '🌐',
  },
  {
    label: 'Code Snippets',
    value: '1000+',
    icon: '💻',
  },
];

export const teamMembers = [
  {
    id: '1',
    name: 'Lex',
    role: 'Founder & Lead Developer',
    bio: 'Passionate about Roblox development and community building',
    avatar: '👨‍💻',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      discord: 'lex#1234',
    },
  },
  {
    id: '2',
    name: 'Zyx',
    role: 'Performance Engineer',
    bio: 'Specialized in game optimization and server scaling',
    avatar: '⚙️',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      discord: 'zyx#5678',
    },
  },
  {
    id: '3',
    name: 'Luna',
    role: 'UI/UX Designer',
    bio: 'Creating beautiful and intuitive interfaces',
    avatar: '🎨',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      discord: 'luna#9012',
    },
  },
  {
    id: '4',
    name: 'Echo',
    role: 'Community Manager',
    bio: 'Building and nurturing the UNIX-TEAM community',
    avatar: '🎤',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      discord: 'echo#3456',
    },
  },
];

export const projects = [
  {
    id: '1',
    title: 'RobloxFramework',
    description: 'Comprehensive framework for rapid Roblox game development',
    category: 'Framework',
    status: 'Active',
    tags: ['Luau', 'Framework', 'Open Source'],
    featured: true,
  },
  {
    id: '2',
    title: 'PerformanceMonitor',
    description: 'Real-time game performance monitoring and optimization tool',
    category: 'Tool',
    status: 'Active',
    tags: ['Performance', 'Optimization', 'Tool'],
    featured: true,
  },
  {
    id: '3',
    title: 'UILibrary',
    description: 'Complete UI component library for Roblox games',
    category: 'Library',
    status: 'Active',
    tags: ['UI', 'Components', 'Library'],
    featured: false,
  },
  {
    id: '4',
    title: 'NetworkSync',
    description: 'Advanced networking synchronization for multiplayer games',
    category: 'Library',
    status: 'Active',
    tags: ['Networking', 'Multiplayer', 'Library'],
    featured: false,
  },
  {
    id: '5',
    title: 'ScriptGenerator',
    description: 'AI-powered code generator for common Roblox patterns',
    category: 'Tool',
    status: 'In Development',
    tags: ['AI', 'CodeGen', 'Tool'],
    featured: true,
  },
  {
    id: '6',
    title: 'DebugConsole',
    description: 'Advanced debugging tools for development',
    category: 'Tool',
    status: 'Active',
    tags: ['Debug', 'Development', 'Tool'],
    featured: false,
  },
];

export const faqItems = [
  {
    id: '1',
    question: 'What is UNIX-TEAM?',
    answer: 'UNIX-TEAM is a community-driven platform dedicated to Roblox game development, providing resources, tools, frameworks, and community support for developers of all skill levels.',
    category: 'General',
  },
  {
    id: '2',
    question: 'Is UNIX-TEAM free to use?',
    answer: 'Yes! All our frameworks, libraries, and tools are free and open source. We believe in empowering developers without barriers.',
    category: 'General',
  },
  {
    id: '3',
    question: 'How do I get started with Roblox development?',
    answer: 'Start with our "Getting Started with Luau" guide in the documentation section. We recommend learning Luau basics first, then exploring our frameworks and tools.',
    category: 'Getting Started',
  },
  {
    id: '4',
    question: 'Can I contribute to UNIX-TEAM projects?',
    answer: 'Absolutely! We welcome contributions from the community. Check our GitHub repositories for contribution guidelines and open issues to help with.',
    category: 'Contributing',
  },
  {
    id: '5',
    question: 'What programming language does Roblox use?',
    answer: 'Roblox uses Luau, a powerful scripting language based on Lua with modern features like type annotations, optimized for game development.',
    category: 'Technical',
  },
  {
    id: '6',
    question: 'How can I join the UNIX-TEAM Discord?',
    answer: 'Visit our Discord page on this website and click the invite link. Our community members are always happy to help and discuss projects!',
    category: 'Community',
  },
  {
    id: '7',
    question: 'Are there certification programs?',
    answer: 'Currently, we offer comprehensive documentation and tutorials. We\'re planning formal certification programs for 2024.',
    category: 'Learning',
  },
  {
    id: '8',
    question: 'How often is content updated?',
    answer: 'We update our documentation and blog regularly, especially when Roblox releases new features or when community members contribute new guides.',
    category: 'General',
  },
];

export const socialLinks = [
  {
    name: 'Discord',
    url: 'https://discord.gg/unix-team',
    icon: 'discord',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/unixteam',
    icon: 'twitter',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/unix-team',
    icon: 'github',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@unixteam',
    icon: 'youtube',
  },
];
