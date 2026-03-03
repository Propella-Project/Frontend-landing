import { motion } from 'framer-motion';
import { 
  Brain, 
  Map, 
  Target, 
  MessageCircle, 
  Shield, 
  Zap,
  BarChart3,
  Trophy,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Diagnostic Test',
    description: 'Our AI analyzes your knowledge across all JAMB subjects to identify your strengths and weaknesses with pinpoint accuracy.',
    color: '#8B5CF6',
  },
  {
    icon: Map,
    title: 'Smart Roadmap Generator',
    description: 'Get a personalized study plan that adapts to your progress, focusing on weak areas while reinforcing what you know.',
    color: '#A78BFA',
  },
  {
    icon: Target,
    title: 'Daily Quiz & Mastery Tracking',
    description: 'Practice with real JAMB past questions daily. Track your mastery growth and watch your scores improve over time.',
    color: '#CCFF00',
  },
  {
    icon: MessageCircle,
    title: 'Fun AI Tutor',
    description: 'Choose your tutor personality - from a motivational rapper to a strict coach. Learning becomes engaging and memorable.',
    color: '#8B5CF6',
  },
  {
    icon: Shield,
    title: 'Discipline Mode',
    description: 'Stay accountable with streaks, reminders, and locked progression. No moving forward until you truly understand.',
    color: '#A78BFA',
  },
  {
    icon: Zap,
    title: 'Repetition Strategy',
    description: 'Science-backed spaced repetition ensures you retain what you learn. Topics reappear at optimal intervals.',
    color: '#CCFF00',
  },
];

const stats = [
  { icon: BarChart3, value: '10,000+', label: 'Past Questions' },
  { icon: Trophy, value: '95%', label: 'Success Rate' },
  { icon: Clock, value: '2x', label: 'Faster Learning' },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-[#CCFF00]" />
            <span className="text-sm text-gray-300">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#CCFF00] bg-clip-text text-transparent">
              Ace JAMB
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            PROPELLA combines cutting-edge AI with proven learning science to give you 
            the smartest preparation experience possible.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-4 md:p-6 bg-[#1A1625]/50 rounded-2xl border border-white/5"
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-[#8B5CF6] mx-auto mb-2" />
              <div className="text-2xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-[#8B5CF6] to-[#CCFF00] bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#CCFF00] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur" />
              
              <div className="relative h-full bg-[#1A1625]/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8 hover:border-white/10 transition-colors">
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon 
                    className="w-6 h-6" 
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#8B5CF6] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
