import { Metadata } from 'next';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';

export const metadata: Metadata = {
  title: 'About | UNIX-TEAM',
  description: 'Learn about UNIX-TEAM, our mission, and vision for the gaming community.',
};

const milestones = [
  {
    year: '2020',
    title: 'Founded',
    description: 'UNIX-TEAM was created with a vision to build an innovative gaming community.',
  },
  {
    year: '2021',
    title: 'First Projects',
    description: 'Launched our first successful Roblox games and tools.',
  },
  {
    year: '2022',
    title: 'Community Growth',
    description: 'Reached 2,500 members and launched our popular game series.',
  },
  {
    year: '2023',
    title: 'Expansion',
    description: 'Grew to 5,000+ members and expanded to multiple gaming platforms.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              About UNIX-TEAM
            </h1>
            <p className="text-foreground/60 text-lg">
              Pioneering innovative gaming experiences and building a thriving developer community
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="prose prose-invert max-w-none">
            <div className="glass-effect rounded-lg p-8 space-y-6 text-foreground/80">
              <p className="text-lg">
                UNIX-TEAM is a premium gaming and technology community dedicated to creating innovative experiences on the Roblox platform. We believe in the power of collaborative development and the potential of creative minds coming together.
              </p>
              <p className="text-lg">
                Our mission is to empower developers of all skill levels to create, collaborate, and share their work with the world. We provide tools, frameworks, and a supportive community to help bring gaming ideas to life.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Our Values
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Constantly pushing boundaries and exploring new possibilities in game development.',
              },
              {
                title: 'Community',
                description: 'Building a supportive and collaborative environment for all developers.',
              },
              {
                title: 'Quality',
                description: 'Delivering high-quality projects and tools that meet professional standards.',
              },
              {
                title: 'Accessibility',
                description: 'Making development tools and knowledge accessible to everyone.',
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="glass-effect rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-accent mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Our Journey
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-accent/10 border border-accent/30">
                      <span className="text-2xl font-bold text-accent">
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 glass-effect rounded-lg p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-foreground/60">{milestone.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
