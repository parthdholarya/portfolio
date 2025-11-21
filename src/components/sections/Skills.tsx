import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Database,
  Layout,
  Cloud,
  Terminal,
  Boxes,
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: portfolioData.skills.languages,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Frameworks & Libraries",
    icon: Layout,
    skills: portfolioData.skills.frameworks,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Databases",
    icon: Database,
    skills: portfolioData.skills.databases,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Tools & Platforms",
    icon: Terminal,
    skills: portfolioData.skills.tools,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: portfolioData.skills.cloud,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Other Technologies",
    icon: Boxes,
    skills: portfolioData.skills.other,
    color: "bg-pink-500/10 text-pink-500",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 transform-gpu">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className={`p-2 rounded-lg ${category.color}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-secondary hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Always learning and exploring new technologies to stay ahead in the
            ever-evolving tech landscape
          </p>
        </motion.div>
      </div>
    </section>
  );
};
