import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
            >
              <Card className="p-6 h-full flex flex-col bg-card border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/20 group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.role} • {project.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.15, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 cursor-default"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 border-primary/50 text-primary hover:bg-primary/10"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      size="sm"
                      asChild
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary text-primary hover:bg-primary/10"
          >
            <a
              href={portfolioData.personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View More on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
