import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiCode, HiPencilAlt, HiLightningBolt } from "react-icons/hi";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/project/ProjectCard";
import InteractiveSphere from "@/components/ui/InteractiveSphere";
import HeroScroll from "@/components/ui/HeroScroll";
import ScrollFade from "@/components/ui/ScrollFade";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div>
      {/* Hero Section */}
      <HeroScroll />

      {/* About Snippet */}
      <ScrollFade>
        <section className="py-24 bg-gray-900 border-y border-gray-800">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              <ScrollFade delay={100}>
                <div className="bg-gray-800 rounded-sm p-10 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center mb-6">
                    <HiCode className="text-2xl text-gray-900" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-white mb-3 leading-tight">
                    End-to-end software development
                  </h3>
                  <p className="text-gray-400 font-lora text-sm leading-relaxed">
                    Full-stack development across frontend, backend, and APIs, with experience in modern frameworks, data handling, and scalable system design.
                  </p>
                </div>
              </ScrollFade>

              <ScrollFade delay={200}>
                <div className="bg-gray-800 rounded-sm p-10 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center mb-6">
                    <HiPencilAlt className="text-2xl text-gray-900" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-white mb-3 leading-tight">
                    Human-centered design informed by research
                  </h3>
                  <p className="text-gray-400 font-lora text-sm leading-relaxed">
                    User research, interaction design, prototyping, and design systems grounded in usability, accessibility, and real-world constraints.
                  </p>
                </div>
              </ScrollFade>

              <ScrollFade delay={300}>
                <div className="bg-gray-800 rounded-sm p-10 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center mb-6">
                    <HiLightningBolt className="text-2xl text-gray-900" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-white mb-3 leading-tight">
                    Applied computing and emerging technologies
                  </h3>
                  <p className="text-gray-400 font-lora text-sm leading-relaxed">
                    Exploring AR/VR, robotics, and intelligent systems through hands-on experimentation, prototyping, and research-driven development.
                  </p>
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Featured Projects */}
      <ScrollFade>
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <ScrollFade>
              <div className="mb-16">
                <h2 className="text-5xl font-playfair font-bold text-white mb-4 leading-tight">
                  Featured Projects
                </h2>
                <p className="text-base text-gray-400 max-w-2xl font-lora leading-relaxed">
                  A selection of recent work spanning human-centered design, software engineering, and applied research.
                </p>
              </div>
            </ScrollFade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <ScrollFade key={project.frontmatter.slug} delay={index * 100}>
                  <ProjectCard
                    project={project.frontmatter}
                    index={index}
                  />
                </ScrollFade>
              ))}
            </div>

            <ScrollFade delay={400}>
              <div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-sm font-semibold hover:bg-gray-100 transition-colors text-sm tracking-wide uppercase"
                >
                  View All Projects
                  <HiArrowRight />
                </Link>
              </div>
            </ScrollFade>
          </div>
        </section>
      </ScrollFade>

      {/* Quick Links / CTA */}
      <ScrollFade>
        <section className="py-24 bg-gray-900 text-white border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <ScrollFade>
              <h2 className="text-5xl font-playfair font-bold mb-6 leading-tight">
                Let's Work Together
              </h2>
            </ScrollFade>
            <ScrollFade delay={100}>
              <p className="text-lg text-gray-300 mb-10 font-lora leading-relaxed">
                I'm currently looking for UI/UX design and product design
                opportunities. Let's create something amazing!
              </p>
            </ScrollFade>
            <ScrollFade delay={200}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-sm font-semibold hover:bg-gray-100 transition-colors text-sm tracking-wide uppercase"
                >
                  View Resume
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-white rounded-sm font-semibold hover:bg-gray-800 border border-white transition-colors text-sm tracking-wide uppercase"
                >
                  Contact Me
                </Link>
              </div>
            </ScrollFade>
          </div>
        </section>
      </ScrollFade>
    </div>
  );
}
