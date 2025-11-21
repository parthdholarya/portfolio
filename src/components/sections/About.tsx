import { motion } from "framer-motion";
import { Code2, Rocket, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import portfolioData from "@/data/portfolio.json";

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Quickly adapting to new technologies and frameworks",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborative approach to problem-solving",
  },
  {
    icon: Zap,
    title: "Problem Solver",
    description: "Creative solutions to complex challenges",
  },
];

export const About = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background and what drives me
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-foreground leading-relaxed">
                {personal.bio}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    Current Focus
                  </h4>
                  <p className="text-muted-foreground">
                    Pursuing MCA at GLS University, deepening expertise in full-stack
                    development and modern software architecture
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    Passion
                  </h4>
                  <p className="text-muted-foreground">
                    Building innovative solutions that solve real-world problems and
                    make a positive impact on people's lives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    Location
                  </h4>
                  <p className="text-muted-foreground">{personal.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.2 } 
                }}
              >
                <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/20 group">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <motion.div 
                      className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
