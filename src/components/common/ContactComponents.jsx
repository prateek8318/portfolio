import React from "react";
import { motion } from "framer-motion";
import { iconMap } from "../../utils/helpers";

export function ContactItem({ contact, index }) {
  const Icon = iconMap[contact.icon];
  
  return (
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
        <Icon className="text-lg md:text-xl" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-400 text-xs md:text-sm">{contact.label}</div>
        <div className="text-white font-medium text-sm md:text-base group-hover:text-blue-400 transition-colors break-words">
          {contact.value}
        </div>
      </div>
    </motion.a>
  );
}

export function SocialLink({ social, index }) {
  const Icon = iconMap[social.icon];
  
  return (
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
      <Icon />
    </motion.a>
  );
}

export function SocialLinks({ links, className = "" }) {
  return (
    <div className={`flex justify-center space-x-4 md:space-x-6 ${className}`}>
      {links.map((social, index) => (
        <SocialLink key={index} social={social} index={index} />
      ))}
    </div>
  );
}

export function ContactInfo({ contacts, className = "" }) {
  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {contacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} index={index} />
      ))}
    </div>
  );
}
