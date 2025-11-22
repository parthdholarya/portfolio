import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, Award, Calendar, Building2, X, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import portfolioData from "@/data/portfolio.json";
import QRCodeSVG from "react-qr-code";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl: string;
  skills: string[];
}

interface CertificateModalProps {
  certificate: Certificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CertificateModal = ({ certificate, open, onOpenChange }: CertificateModalProps) => {
  const { toast } = useToast();

  if (!certificate) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('certificate-print-content');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${certificate.title} - Certificate</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 40px;
              background: white;
              color: #1a1a1a;
            }
            .certificate-container {
              max-width: 800px;
              margin: 0 auto;
              border: 3px solid #0ea5e9;
              padding: 60px 40px;
              position: relative;
            }
            .certificate-border {
              position: absolute;
              top: 20px;
              left: 20px;
              right: 20px;
              bottom: 20px;
              border: 1px solid #cbd5e1;
            }
            .content { position: relative; z-index: 1; text-align: center; }
            .header { margin-bottom: 30px; }
            .icon { 
              width: 80px; 
              height: 80px; 
              margin: 0 auto 20px;
              background: #0ea5e9;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .title { 
              font-size: 32px; 
              font-weight: 700; 
              color: #0ea5e9;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 18px;
              color: #64748b;
              margin-bottom: 30px;
            }
            .recipient {
              margin: 40px 0;
              padding: 30px;
              background: #f8fafc;
              border-radius: 8px;
            }
            .recipient-name {
              font-size: 28px;
              font-weight: 700;
              color: #1a1a1a;
              margin-bottom: 10px;
            }
            .description {
              font-size: 16px;
              line-height: 1.6;
              color: #475569;
              margin: 20px 0;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
            }
            .details {
              margin-top: 40px;
              display: flex;
              justify-content: center;
              gap: 60px;
            }
            .detail-item {
              text-align: center;
            }
            .detail-label {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #94a3b8;
              margin-bottom: 8px;
            }
            .detail-value {
              font-size: 16px;
              font-weight: 600;
              color: #1a1a1a;
            }
            .skills {
              margin-top: 30px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 10px;
            }
            .skill-badge {
              display: inline-block;
              padding: 6px 16px;
              background: #e0f2fe;
              color: #0369a1;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 500;
            }
            .footer {
              margin-top: 50px;
              padding-top: 30px;
              border-top: 2px solid #e2e8f0;
              font-size: 12px;
              color: #94a3b8;
            }
            .qr-section {
              margin-top: 40px;
              padding-top: 30px;
              border-top: 1px solid #e2e8f0;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
            }
            .qr-code {
              padding: 16px;
              background: white;
              border: 2px solid #e2e8f0;
              border-radius: 8px;
            }
            .qr-text {
              text-align: left;
              max-width: 300px;
            }
            .qr-title {
              font-size: 14px;
              font-weight: 600;
              color: #1a1a1a;
              margin-bottom: 8px;
            }
            .qr-description {
              font-size: 12px;
              color: #64748b;
              line-height: 1.5;
            }
            @media print {
              body { padding: 0; }
              .certificate-container { border-width: 2px; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 250);

    toast({
      title: "Print ready",
      description: "Certificate is ready to print",
    });
  };

  const handleDownload = () => {
    // Create a downloadable text version
    const content = `
CERTIFICATE OF COMPLETION

${certificate.title}

This certificate is awarded to:
${portfolioData.personal.name}

For successfully completing:
${certificate.description}

Issued by: ${certificate.issuer}
Date: ${certificate.date}

Skills Acquired:
${certificate.skills.join(', ')}

Credential URL: ${certificate.credentialUrl || 'Not available'}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Certificate details have been downloaded",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <DialogHeader className="flex-1">
            <h2 className="text-2xl font-heading font-bold">Certificate Details</h2>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <div className="p-8">
          {/* Hidden print content */}
          <div id="certificate-print-content" className="hidden">
            <div className="certificate-container">
              <div className="certificate-border"></div>
              <div className="content">
                <div className="header">
                  <div className="icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 15l-3-3h6l-3 3z"/>
                      <path d="M12 2v7"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <div className="title">Certificate of Completion</div>
                  <div className="subtitle">{certificate.title}</div>
                </div>
                
                <div className="recipient">
                  <div style={{fontSize: '14px', color: '#64748b', marginBottom: '8px'}}>This certificate is proudly awarded to</div>
                  <div className="recipient-name">{portfolioData.personal.name}</div>
                </div>

                <div className="description">
                  {certificate.description}
                </div>

                <div className="details">
                  <div className="detail-item">
                    <div className="detail-label">Issued By</div>
                    <div className="detail-value">{certificate.issuer}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Date Issued</div>
                    <div className="detail-value">{certificate.date}</div>
                  </div>
                </div>

                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="skills">
                    {certificate.skills.map((skill) => (
                      <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                )}

                {certificate.credentialUrl && (
                  <div className="qr-section">
                    <div className="qr-code">
                      <div style={{height: '120px', width: '120px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94a3b8', textAlign: 'center', padding: '10px'}}>
                        QR Code Available Online
                      </div>
                    </div>
                    <div className="qr-text">
                      <div className="qr-title">Verify This Certificate</div>
                      <div className="qr-description">
                        Visit the URL below to verify the authenticity of this certificate and view the credential details online.
                      </div>
                      <div style={{fontSize: '10px', color: '#94a3b8', marginTop: '8px', wordBreak: 'break-all'}}>
                        {certificate.credentialUrl}
                      </div>
                    </div>
                  </div>
                )}

                <div className="footer">
                  Generated from {portfolioData.personal.name}'s Portfolio
                </div>
              </div>
            </div>
          </div>

          {/* Visible modal content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-4 border-primary/20 rounded-lg p-8 md:p-12 bg-gradient-to-br from-background to-muted/20"
          >
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-primary" />
                </div>
              </motion.div>

              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-muted-foreground mb-2"
                >
                  Certificate of Completion
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4"
                >
                  {certificate.title}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-muted/50 rounded-lg p-6"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  This certificate is proudly awarded to
                </p>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {portfolioData.personal.name}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              >
                {certificate.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-8 py-6"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Issued By</span>
                  </div>
                  <p className="font-semibold text-foreground">{certificate.issuer}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Date Issued</span>
                  </div>
                  <p className="font-semibold text-foreground">{certificate.date}</p>
                </div>
              </motion.div>

              {certificate.skills && certificate.skills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Skills Acquired
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {certificate.skills.map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {certificate.credentialUrl && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-6 border-t border-border"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                          <QrCode className="h-4 w-4 text-primary" />
                          <p className="text-sm font-semibold text-foreground">
                            Scan to Verify
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-primary/20 inline-block">
                          <QRCodeSVG
                            value={certificate.credentialUrl}
                            size={140}
                            level="H"
                            fgColor="#0ea5e9"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 max-w-[200px]">
                          Scan this QR code to verify certificate authenticity
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          asChild
                          className="gap-2 w-full md:w-auto"
                        >
                          <a
                            href={certificate.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Award className="h-4 w-4" />
                            View Credential Online
                          </a>
                        </Button>
                        <p className="text-xs text-muted-foreground max-w-[280px] text-center md:text-left">
                          Click to visit the official credential page and verify this certificate
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
