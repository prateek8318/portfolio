import React from "react";
import Tilt from "react-parallax-tilt";
import { 
  SectionWrapper, 
  Container, 
  GlassCard, 
  SectionHeader, 
  AnimatedBackground 
} from "./common/Layout";
import { ContactInfo, SocialLinks } from "./common/ContactComponents";
import { Input, EmailInput, Textarea, Button } from "./common/Form";
import { contactInfo, socialLinks, personalInfo } from "../data/constants";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <AnimatedBackground>
        {/* Additional animated elements can be added here */}
      </AnimatedBackground>

      <Container>
        <SectionHeader 
          title="Get In Touch"
          subtitle="Let's connect and create something amazing together"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <Tilt
            className="parallax-effect-glare-scale"
            perspective={1000}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.02}
            gyroscope={true}
          >
            <GlassCard className="bg-gray-800 border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Me a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <EmailInput />
                </div>
                <div>
                  <Textarea />
                </div>
                <Button type="submit">
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </Tilt>

          {/* Contact Info */}
          <div className="space-y-8">
            <GlassCard>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Contact Information</h3>
              <ContactInfo contacts={contactInfo} />
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Connect With Me</h3>
              <SocialLinks links={socialLinks} />
            </GlassCard>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            {personalInfo.copyright}
          </p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
