import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey in software development and continuous learning
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mb-12"
              >
                <div className="flex items-center mb-4 md:justify-center">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary rounded-full border-4 border-background shadow-lg">
                    <Briefcase className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
                      <div className="flex items-start gap-2 mb-3 md:justify-end md:flex-row-reverse">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-sm font-medium text-primary">
                          {exp.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {exp.role}
                      </h3>

                      <p className="text-lg font-medium text-muted-foreground mb-4">
                        {exp.company}
                      </p>

                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-4">
                        {exp.type}
                      </div>

                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1.5 text-lg">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Looking forward to contributing to innovative projects and growing with
            a dynamic team
          </p>
        </motion.div>
      </div>
    </section>
  );
};
