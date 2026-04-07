import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { getFeaturedProjects } from "@/lib/projects";
import { formatDate } from "@/lib/utils/cn";
import ProjectCard from "@/components/project/ProjectCard";
import HeroScroll from "@/components/ui/HeroScroll";
import ScrollFade from "@/components/ui/ScrollFade";
import StoryTabs from "@/components/ui/StoryTabs";
import RotatingRoles from "@/components/ui/RotatingRoles";
import IntroScrollText from "@/components/ui/IntroScrollText";
import ToolboxReveal from "@/components/ui/ToolboxReveal";
import TimelineItem from "@/components/ui/Timeline";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi";
import SelectedWorksDeck from "@/components/ui/SelectedWorksDeck";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const featuredAvatars = [
    "/images/avatars/ur3e.png",
    "/images/avatars/unity.png",
    "/images/avatars/ux.png",
  ];
  const skills = {
    Programming: [
      "Java, JavaScript/TypeScript",
      "Python, Kotlin",
      "C/C++/C#",
      "SQL & NoSQL",
    ],
    "Frameworks & Platforms": [
      "React/Next.js, Node.js/Express",
      "Spring Boot & RESTful APIs",
      "ROS Noetic + MoveIt",
      "Unity, Android (Kotlin)",
    ],
    "Data & Infra": [
      "Elasticsearch & Kafka",
      "Docker & Kubernetes",
      "Git & CI/CD",
      "GCP/AWS",
    ],
    "Research & UX": [
      "User interviews & surveys",
      "Contextual inquiry",
      "Usability testing",
      "Personas & journey maps",
      "VR/AR prototyping",
    ],
    Languages: ["English (fluent)", "Chinese (native)", "Korean (beginner)"],
    Leadership: [
      "Asian Women Basketball Club — Co-founder & VP",
      "Adventure Learning Program — Facilitator",
    ],
  };

  return (
    <div id="top" className="font-apple">
      {/* Hero Section */}
      <HeroScroll />

      {/* Intro Paragraph */}
      <ScrollFade>
        <section id="intro" className="py-20 scroll-mt-32">
          <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <IntroScrollText>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-apple text-[#dde5f4] leading-[1.2] tracking-tight max-w-none mx-auto">
                Hi, I’m Chang Liu,
                <span className="block sm:inline"> a </span>
                <RotatingRoles />
                <span className="block sm:inline"> focusing on human-centered design🦾. I study and build interactive systems🫆 that bridge thoughtful engineering🚀 and intuitive user experiences💡.</span>
              </p>
            </IntroScrollText>
          </div>
        </section>
      </ScrollFade>

      {/* Experience & Education */}
      <ScrollFade>
        <section id="experience" className="py-24 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Experience & Education
              </p>
              <h2 className="text-4xl sm:text-5xl font-apple font-bold text-[#dde5f4] mt-4 leading-tight">
                My Journey 🛵
              </h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto mt-4 font-apple leading-relaxed">
                Recent roles and academic focus areas that shape my design and engineering work.
              </p>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/4 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 text-white shadow-sm">
                  <HiBriefcase className="text-xl" />
                </span>
                <h3 className="text-2xl font-apple font-bold text-[#dde5f4]">Experience</h3>
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

            <div className="mt-12 rounded-3xl border border-white/8 bg-white/4 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 text-white shadow-sm">
                  <HiAcademicCap className="text-xl" />
                </span>
                <h3 className="text-2xl font-apple font-bold text-[#dde5f4]">Education</h3>
              </div>
              <TimelineItem
                date="Sep 2022 – May 2026 (Expected)"
                title="B.S. Computer Science"
                organization="University of Wisconsin–Madison"
                description="Coursework: HCI, Software Engineering, Database Systems, Algorithms, Operating Systems."
                tags={["Computer Science"]}
              />
              <TimelineItem
                date="Sep 2022 – May 2026 (Expected)"
                title="B.S. Data Science"
                organization="University of Wisconsin–Madison"
                description="Coursework: Machine Learning, Data Science, Computer Vision, Statistical Modeling, Data Engineering."
                tags={["Data Science"]}
              />
              <TimelineItem
                date="Sep 2018 – May 2022"
                title="Manitowoc Lutheran High School"
                organization="Manitowoc, Wisconsin"
                description="Experience: First Robotics Team (7103) Programmer & Competition Coach; Honor Roll student. Coursework: Aerospace Engineering, Honor Physics, Honor Chemistry, AP Computer Science, AP Calculus."
                isLast
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Toolbox */}
      <ScrollFade>
        <section id="toolbox" className="py-28 scroll-mt-24">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
              <div>
                <h2 className="text-4xl sm:text-5xl font-apple font-bold text-[#dde5f4]">
                  My Toolbox 🧰
                </h2>
                <p className="text-base sm:text-lg text-slate-400 font-apple mt-4">
                  Tools I use to design, build, and ship.
                </p>
              </div>
              <div>
                <ToolboxReveal />
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Featured Projects */}
      <ScrollFade>
        <section id="projects" className="py-24 scroll-mt-24">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
            <ScrollFade>
              <div className="mb-16">
                <h2 className="text-5xl font-apple font-bold text-[#dde5f4] mb-4 leading-tight">
                  Featured Projects
                </h2>
                <p className="text-base text-slate-400 max-w-2xl font-apple leading-relaxed">
                  A selection of recent work spanning human-centered design, software engineering, and applied research.
                </p>
              </div>
            </ScrollFade>

            <div className="mb-12 space-y-8">
              {featuredProjects.map((project, index) => {
                const isOdd = index % 2 === 0;
                const avatarSrc =
                  featuredAvatars[index] ||
                  project.frontmatter.cardImage ||
                  project.frontmatter.heroImage;
                return (
                  <ScrollFade key={project.frontmatter.slug} delay={index * 120}>
                    <div
                      className={`grid grid-cols-1 items-center gap-4 ${
                        isOdd
                          ? 'md:grid-cols-[220px_1fr]'
                          : 'md:grid-cols-[1fr_220px]'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center ${
                          isOdd ? '' : 'md:order-2 md:flex-row-reverse'
                        }`}
                      >
                      <div className="relative h-44 w-44 sm:h-52 sm:w-52 overflow-hidden">
                        <Image
                          src={avatarSrc}
                          alt={`${project.frontmatter.title} avatar`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="hidden md:block h-[2px] w-24 bg-slate-300/80" />
                    </div>
                    <Link
                      href={`/projects/${project.frontmatter.slug}`}
                      className={`group block font-apple ${
                        isOdd ? '' : 'md:order-1'
                      }`}
                    >
                      <div className="rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10 bg-gradient-to-br from-white/6 via-indigo-500/8 to-violet-500/6 hover:-translate-y-1 transition-all duration-300">
                        <div className="p-6 sm:p-7 flex flex-col border border-white/8 bg-white/3 backdrop-blur-2xl">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur bg-white/8 text-slate-200 border-white/15"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-[#dde5f4] mb-3">
                            {project.frontmatter.title}
                          </h3>
                          <p className="text-slate-400 text-sm sm:text-base mb-6">
                            {project.frontmatter.shortDescription}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                              {formatDate(project.frontmatter.date)}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm border backdrop-blur bg-indigo-500/15 text-indigo-200 border-indigo-400/25">
                              View case
                              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  </ScrollFade>
                );
              })}
            </div>

            <ScrollFade delay={400}>
              <div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-sm font-semibold hover:bg-indigo-500/30 transition-colors text-sm tracking-wide uppercase backdrop-blur"
                >
                  View All Projects
                  <HiArrowRight />
                </Link>
              </div>
            </ScrollFade>
          </div>
        </section>
      </ScrollFade>

      {/* Selected Works — temporarily hidden */}
      {/* <ScrollFade>
        <section className="py-24">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
            <ScrollFade>
              <div className="mb-12">
                <h2 className="text-5xl font-apple font-bold text-slate-900 mb-4 leading-tight">
                  Selected Works
                </h2>
                <p className="text-base text-slate-600 max-w-2xl font-apple leading-relaxed">
                  A curated set of visual explorations and concept studies.
                </p>
              </div>
            </ScrollFade>
            <SelectedWorksDeck />
          </div>
        </section>
      </ScrollFade> */}

      {/* Quick Links / CTA */}
      <ScrollFade>
        <section id="resume" className="py-24 border-t border-white/8 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <ScrollFade>
              <h2 className="text-5xl font-apple font-bold text-[#dde5f4] mb-6 leading-tight">
                Let’s Connect
              </h2>
            </ScrollFade>
            <ScrollFade delay={100}>
              <p className="text-lg text-slate-400 mb-10 font-apple leading-relaxed">
                I’m always open to new opportunities and connections. I’d love to connect and share my work!
              </p>
            </ScrollFade>
            <ScrollFade delay={200}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-sm font-semibold hover:bg-indigo-500/30 transition-colors text-sm tracking-wide uppercase backdrop-blur"
                >
                  View Resume
                </Link>
              </div>
            </ScrollFade>
          </div>
        </section>
      </ScrollFade>

      {/* Contact Section */}
      <ScrollFade>
        <section id="contact" className="py-24 scroll-mt-24">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-10 items-stretch">
              <div className="h-full rounded-[28px] border border-white/8 bg-white/4 p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl mx-auto">
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Get in touch</p>
                  <h2 className="text-4xl sm:text-5xl font-apple font-bold text-[#dde5f4] mt-3">
                    Contact.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 mt-3">
                    Drop a note and I’ll get back to you soon.
                  </p>
                </div>

                <form
                  action="mailto:changliu5101@gmail.com"
                  method="GET"
                  encType="text/plain"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-slate-400 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-[#dde5f4] placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-slate-400 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-[#dde5f4] placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-slate-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="body"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-[#dde5f4] placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition-colors shadow-[0_8px_24px_rgba(99,102,241,0.3)]"
                  >
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </ScrollFade>
    </div>
  );
}
