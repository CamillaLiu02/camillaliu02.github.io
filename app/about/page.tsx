import { Metadata } from 'next';
import Image from 'next/image';
import TimelineItem from '@/components/ui/Timeline';
import PageTransition from '@/components/ui/PageTransition';
import { HiAcademicCap, HiBriefcase, HiCode } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my background, experience, and skills',
};

export default function AboutPage() {
  const skills = {
    Programming: [
      'Java, JavaScript/TypeScript',
      'Python, Kotlin',
      'C/C++/C#',
      'SQL & NoSQL',
    ],
    'Frameworks & Platforms': [
      'React/Next.js, Node.js/Express',
      'Spring Boot & RESTful APIs',
      'ROS Noetic + MoveIt',
      'Unity, Android (Kotlin)',
    ],
    'Data & Infra': [
      'Elasticsearch & Kafka',
      'Docker & Kubernetes',
      'Git & CI/CD',
      'GCP/AWS',
    ],
    'Research & UX': [
      'User interviews & surveys',
      'Contextual inquiry',
      'Usability testing',
      'Personas & journey maps',
      'VR/AR prototyping',
    ],
    Languages: [
      'English (fluent)',
      'Chinese (native)',
      'Korean (beginner)',
    ],
    Leadership: [
      'Asian Women Basketball Club — Co-founder & VP',
      'Adventure Learning Program — Facilitator',
    ],
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950">
        {/* Hero */}
        <section className="bg-gray-900 border-b border-gray-800 py-24">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-6xl font-playfair font-bold text-white mb-8 leading-tight">
                  About Me
                </h1>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-lora">
                  <p>Hi! My name is <strong>Chang (Camilla) Liu</strong>! </p>
                  <p>
                    I'm a <strong>computer science student and researcher</strong> focused on building <strong>intelligent, human-centered systems</strong>. My interests lie at the intersection of <strong>robotics and human–computer interaction</strong>, where <strong>full-stack software, AI-driven decision-making, and data-informed system design</strong> come together in real-world applications.
                  </p>
                  <p>
                    I care deeply about <strong>accessibility and usability</strong>, and I aim to design systems where <strong>strong engineering and thoughtful user experience reinforce each other</strong>.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {[ 'Full-stack engineering', 'HCI/HRI research', 'UI/UX design', 'Data & ML' ].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-4 py-2 rounded-sm text-sm font-semibold text-white bg-gray-800 border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative h-[560px] rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                <Image
                  src="/resume/liu.png"
                  alt="Chang Liu portrait"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 20%' }}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 bg-gray-950 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-5xl font-playfair font-bold text-white mb-16 text-center leading-tight">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="bg-gray-800 rounded-sm p-8 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-playfair font-bold text-white mb-6">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((skill) => (
                      <li
                        key={skill}
                        className="text-gray-300 font-lora text-sm flex items-center gap-3"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-gray-900 border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-5xl font-playfair font-bold text-white mb-16 text-center leading-tight">
              Experience & Education
            </h2>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <HiBriefcase className="text-2xl text-blue-500" />
                <h3 className="text-2xl font-playfair font-bold text-white">Experience</h3>
              </div>
              <TimelineItem
                date="Oct 2025 – Present"
                title="Undergraduate Research Assistant"
                organization="People and Robots Lab, UW–Madison"
                description="Integrating Meta Quest 3 with UR3e via ROS Noetic + Unity/RAMPA++; debugging motion planning, refining VR→robot pipelines, and gathering user feedback for immersive teleoperation."
              />
              <TimelineItem
                date="May 2025 – Aug 2025"
                title="Software Development Intern"
                organization="RedBing LLC, Atlanta"
                description="Shipped commerce search features with Kafka event streams, Elasticsearch relevance tuning, Spring Boot microservices, and a Flask scoring API to improve retrieval quality."
              />
              <TimelineItem
                date="May 2024 – Aug 2024"
                title="System Development Intern"
                organization="ZhengGong Technology, Beijing"
                description="Fixed device programs and firmware issues, executed product testing cycles, and led product publicity updates that contributed to a ~20% revenue lift."
                isLast
              />
            </div>

            <div className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <HiAcademicCap className="text-2xl text-blue-500" />
                <h3 className="text-2xl font-playfair font-bold text-white">Education</h3>
              </div>
              <TimelineItem
                date="Expected May 2026"
                title="B.S. Computer Science & Data Science"
                organization="University of Wisconsin–Madison"
                description="Coursework: HCI, Software Engineering, Database Systems, Algorithms, Operating Systems."
                tags={["Computer Science"]}
              />
              <TimelineItem
                date="Expected May 2026"
                title="B.S. Data Science"
                organization="University of Wisconsin–Madison"
                description="Coursework: Machine Learning, Data Science, Computer Vision, Statistical Modeling, Data Engineering."
                tags={["Data Science"]}
                isLast
              />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
