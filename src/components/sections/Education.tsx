import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, MapPin, Award } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Academic <span className="text-primary">Background</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My educational journey and achievements
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-lg font-medium text-primary mb-2">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{edu.duration}</span>
                        </div>
                        {edu.cgpa && (
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>CGPA: {edu.cgpa}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          Highlights:
                        </h4>
                        <ul className="space-y-1">
                          {edu.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 space-y-4"
        >
          <div className="inline-block px-6 py-3 bg-primary/10 rounded-lg">
            <p className="text-foreground font-medium">
              <span className="text-primary font-bold">Languages:</span>{" "}
              {portfolioData.languages.join(", ")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
