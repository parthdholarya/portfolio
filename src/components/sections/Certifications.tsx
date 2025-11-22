import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink, Calendar, Eye } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import { useRef, useState } from "react";
import { CertificateModal } from "@/components/CertificateModal";

export const Certifications = () => {
  const { certifications } = portfolioData;
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certifications[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleViewCertificate = (cert: typeof certifications[0]) => {
    setSelectedCertificate(cert);
    setModalOpen(true);
  };

  return (
    <section id="certifications" className="py-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Parallax background decoration */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Award className="h-12 w-12 text-primary mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Certifications & <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and completed programs
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const cardRef = useRef(null);
            const { scrollYProgress: cardProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"]
            });
            
            const cardY = useTransform(cardProgress, [0, 1], [50, -50]);
            const scale = useTransform(cardProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

            return (
              <motion.div
                key={cert.id}
                ref={cardRef}
                style={{ y: cardY, scale }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/20 group relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-shrink-0">
                        <motion.div 
                          className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Award className="h-7 w-7 text-primary" />
                        </motion.div>
                      </div>
                      
                      {cert.credentialUrl && (
                        <motion.a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.a>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-lg font-medium text-primary mb-2">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{cert.date}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cert.skills.map((skill, idx) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            whileHover={{ scale: 1.15, y: -2 }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20 cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleViewCertificate(cert)}
                        className="flex-1 gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Certificate
                      </Button>
                      {cert.credentialUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
};
