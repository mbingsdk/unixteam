'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { teamMembers } from '@/lib/content';
import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function TeamGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [...new Set(teamMembers.map((member) => member.role))];

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = !selectedRole || member.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, selectedRole]);

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'github':
        return Github;
      case 'twitter':
        return Twitter;
      case 'discord':
        return MessageCircle;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
            Meet the Team
          </h1>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Talented developers and creators united by a passion for building amazing experiences
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/40">
                🔍
              </span>
            </div>

            {/* Role Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRole(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !selectedRole
                    ? 'bg-accent text-brand-dark'
                    : 'bg-card border border-border text-foreground hover:border-accent'
                }`}
              >
                All Roles
              </button>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedRole === role
                      ? 'bg-accent text-brand-dark'
                      : 'bg-card border border-border text-foreground hover:border-accent'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.05}>
              <motion.div
                className="glass-effect rounded-lg overflow-hidden group hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -8 }}
                layout
              >
                {/* Avatar */}
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden relative">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    👤
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{member.bio}</p>

                  {/* Social Links */}
                  {member.socials && (
                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      {Object.entries(member.socials).map(([type, handle]) => {
                        const Icon = getSocialIcon(type);
                        if (!Icon) return null;
                        return (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg hover:bg-accent/10 text-foreground/60 hover:text-accent transition-all duration-200"
                            title={`${type}: ${handle}`}
                          >
                            <Icon size={18} />
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-foreground/60 text-lg">
              No members found matching your filters.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
