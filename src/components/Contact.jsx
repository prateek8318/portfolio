import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  SectionWrapper, 
  Container, 
  SectionHeader, 
} from "./common/Layout";
import { ContactInfo, SocialLinks } from "./common/ContactComponents";
import { Input, EmailInput, Textarea, Button } from "./common/Form";
import { contactInfo, socialLinks, personalInfo } from "../data/constants";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SectionWrapper id="contact">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <Container>
        <SectionHeader 
          title="Get In Touch"
          subtitle="Let's connect and create something amazing together"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-luxury rounded-[2.5rem] p-8 md:p-10 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send Me a Message</h3>
            <form className="space-y-6">
              <Input placeholder="Your Name" />
              <EmailInput />
              <Textarea />
              <Button type="submit">Send Message</Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-luxury rounded-[2.5rem] p-8 md:p-10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              <ContactInfo contacts={contactInfo} />
            </div>

            <div className="glass-luxury rounded-[2.5rem] p-8 md:p-10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8">Connect With Me</h3>
              <SocialLinks links={socialLinks} />
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-500 text-sm font-light tracking-widest uppercase">
            {personalInfo.copyright}
          </p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
