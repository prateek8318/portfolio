import React from "react";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiExpress, SiReact, SiJavascript, SiTailwindcss,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiAmazonwebservices,
  SiDotnet, SiPython, SiSocketdotio, SiHtml5,
} from "react-icons/si";

const TECH = [
  { Icon: SiPhp, name: "PHP", color: "#777BB4" },
  { Icon: SiLaravel, name: "Laravel", color: "#FF2D20" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#5FA04E" },
  { Icon: SiExpress, name: "Express", color: "#a3a3a3" },
  { Icon: SiReact, name: "React", color: "#61DAFB" },
  { Icon: SiReact, name: "React Native", color: "#61DAFB" },
  { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8" },
  { Icon: SiHtml5, name: "HTML5", color: "#E34F26" },
  { Icon: SiMysql, name: "MySQL", color: "#4479A1" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { Icon: SiRedis, name: "Redis", color: "#FF4438" },
  { Icon: SiDocker, name: "Docker", color: "#2496ED" },
  { Icon: SiAmazonwebservices, name: "AWS", color: "#FF9900" },
  { Icon: SiSocketdotio, name: "Socket.io", color: "#a3a3a3" },
  { Icon: SiDotnet, name: ".NET", color: "#7B61FF" },
  { Icon: SiPython, name: "Python", color: "#3776AB" },
  { Icon: SiGit, name: "Git", color: "#F05032" },
];

export default function TechMarquee() {
  return (
    <div className="relative border-y border-white/5 bg-white/[0.03] py-6" aria-label="Technologies I work with">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max gap-3 sm:gap-4">
          {[...TECH, ...TECH].map(({ Icon, name, color }, i) => (
            <div
              key={i}
              aria-hidden={i >= TECH.length}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              <Icon style={{ color }} className="text-lg" />
              <span className="whitespace-nowrap text-sm font-medium text-gray-300">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
