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
  SiNodedotjs,
  SiPython,
  SiPytorch,
  SiR,
  SiReact,
  SiSpring,
  SiUnity,
  SiMysql,
} from "react-icons/si";

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

export default function ToolMarquee() {
  return (
    <div className="tool-marquee">
      <div className="tool-marquee-track">
        {[...tools, ...tools].map((tool, index) => (
          <div className="tool-marquee-item" key={`${tool.name}-${index}`}>
            {tool.Icon ? (
              <tool.Icon className="tool-marquee-icon" />
            ) : (
              <span className="tool-marquee-icon tool-marquee-icon--placeholder" />
            )}
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
