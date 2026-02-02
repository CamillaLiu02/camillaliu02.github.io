'use client';

import type { IconType } from "react-icons";
import {
  SiAndroidstudio,
  SiC,
  SiCplusplus,
  SiDocker,
  SiElasticsearch,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiKotlin,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiPytorch,
  SiR,
  SiReact,
  SiSpring,
  SiUnity,
} from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type ToolItem = {
  name: string;
  Icon?: IconType;
};

const tools: ToolItem[] = [
  { name: "Java" },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Python", Icon: SiPython },
  { name: "Kotlin", Icon: SiKotlin },
  { name: "SQL", Icon: SiMysql },
  { name: "NoSQL", Icon: SiMongodb },
  { name: "R", Icon: SiR },
  { name: "C", Icon: SiC },
  { name: "C#" },
  { name: "C++", Icon: SiCplusplus },
  { name: "HTML", Icon: SiHtml5 },
  { name: "Spring Boot", Icon: SiSpring },
  { name: "React", Icon: SiReact },
  { name: "Mockito" },
  { name: "PyTorch", Icon: SiPytorch },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "RESTful" },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Unity", Icon: SiUnity },
  { name: "Figma", Icon: SiFigma },
  { name: "Jira", Icon: SiJira },
  { name: "Android Studio", Icon: SiAndroidstudio },
  { name: "Cursor" },
  { name: "Copilot" },
  { name: "Docker", Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Elasticsearch", Icon: SiElasticsearch },
  { name: "Linux", Icon: SiLinux },
  { name: "GCP", Icon: SiGooglecloud },
  { name: "ROS Noetic" },
  { name: "URDF" },
  { name: "English" },
  { name: "Chinese" },
  { name: "Korean (Beginner)" },
];

function ToolPill({
  tool,
  index,
  progress,
  registerRef,
}: {
  tool: ToolItem;
  index: number;
  progress: any;
  registerRef: (element: HTMLDivElement | null) => void;
}) {
  const stagger = Math.min(0.35, index * 0.03);
  const scale = useTransform(progress, [0 + stagger, 0.45 + stagger], [0.7, 1]);
  const opacity = useTransform(progress, [0 + stagger, 0.4 + stagger], [0, 1]);

  return (
    <motion.div style={{ scale, opacity }}>
      <div ref={registerRef} className="toolbox-pill">
        {tool.Icon ? (
          <tool.Icon className="h-4 w-4" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-slate-700/50" />
        )}
        <span>{tool.name}</span>
      </div>
    </motion.div>
  );
}

export default function ToolboxReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const latestPointer = useRef({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "center 0.4"],
  });

  const orderedTools = useMemo(() => tools, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container || reduceMotion) {
      pillRefs.current.forEach((pill) => {
        if (!pill) return;
        pill.style.setProperty("--mx", "0px");
        pill.style.setProperty("--my", "0px");
      });
      return;
    }

    const handleMove = (event: MouseEvent) => {
      latestPointer.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const { x, y } = latestPointer.current;
        const maxShift = 6;
        const radius = 160;

        pillRefs.current.forEach((pill) => {
          if (!pill) return;
          const rect = pill.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = x - cx;
          const dy = y - cy;
          const distance = Math.hypot(dx, dy);
          const strength = Math.max(0, (radius - distance) / radius);
          const nx = distance === 0 ? 0 : dx / distance;
          const ny = distance === 0 ? 0 : dy / distance;
          const tx = nx * maxShift * strength;
          const ty = ny * maxShift * strength;
          pill.style.setProperty("--mx", `${tx.toFixed(2)}px`);
          pill.style.setProperty("--my", `${ty.toFixed(2)}px`);
        });
      });
    };

    const handleLeave = () => {
      pillRefs.current.forEach((pill) => {
        if (!pill) return;
        pill.style.setProperty("--mx", "0px");
        pill.style.setProperty("--my", "0px");
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reduceMotion]);

  return (
    <div ref={sectionRef}>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {orderedTools.map((tool, index) => (
          <ToolPill
            key={tool.name}
            tool={tool}
            index={index}
            progress={scrollYProgress}
            registerRef={(element) => {
              pillRefs.current[index] = element;
            }}
          />
        ))}
      </div>
    </div>
  );
}
