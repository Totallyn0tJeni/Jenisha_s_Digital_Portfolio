import { motion } from 'framer-motion';
import { Code2, Users, Megaphone, Camera, BrainCircuit } from 'lucide-react';

const areas = [
  { icon: Code2, label: 'Software Development' },
  { icon: Users, label: 'Leadership & Community' },
  { icon: Megaphone, label: 'Marketing & Communications' },
  { icon: Camera, label: 'Photography & Video' },
  { icon: BrainCircuit, label: 'AI & Emerging Tech' },
];

export default function WhatIDo() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What I Do</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {areas.map(({ icon: Icon, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}