import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Contact() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Enhanced Background 3D elements with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-20 left-20 w-52 h-52 bg-orange-500/25 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-44 h-44 bg-orange-600/25 rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 0.7, 1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8" style={{ y: contentY }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's connect and create something amazing together
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Enhanced Contact Form */}
          <Tilt
            className="parallax-effect-glare-scale"
            perspective={1000}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.02}
            gyroscope={true}
          >
            <motion.div
              className="bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-700 shadow-2xl"
              initial={{ opacity: 0, x: -50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : { opacity: 0, x: -50, rotateX: -10 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Send Me a Message
              </motion.h3>
              <form className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-600 transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 resize-none"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </Tilt>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Contact Information</h3>
              
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: FaEnvelope, label: "Email", value: "prateekpandey2580@gmail.com", href: "mailto:prateekpandey2580@gmail.com", color: "text-blue-400" },
                  { icon: FaPhone, label: "Phone", value: "+91 7388437791", href: "tel:+917388437791", color: "text-green-400" },
                  { icon: FaMapMarkerAlt, label: "Location", value: " Varanasi, Uttar Pradesh, India", href: "#", color: "text-red-400" }
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 md:space-x-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className={`w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-lg flex items-center justify-center ${contact.color}`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="text-lg md:text-xl" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-400 text-xs md:text-sm">{contact.label}</div>
                      <div className="text-white font-medium text-sm md:text-base group-hover:text-blue-400 transition-colors break-words">
                        {contact.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Connect With Me</h3>
              <div className="flex justify-center space-x-4 md:space-x-6">
                {[
                  { icon: FaGithub, href: "https://github.com/prateek8318", color: "hover:text-gray-400" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/prateek-pandey-6087b624b/", color: "hover:text-blue-400" },
                  { icon: FaInstagram, href: "https://www.instagram.com/prateekamanpandey?igsh=ZHIzaHduMWZienYx", color: "hover:text-pink-400" },
                  { icon: FaEnvelope, href: "mailto:prateekpandey2580@gmail.com", color: "hover:text-red-400" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center text-lg md:text-2xl text-white border border-white/20 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p 
            className="text-gray-400 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
