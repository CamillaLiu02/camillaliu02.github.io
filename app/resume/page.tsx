import { Metadata } from 'next';
import { HiDownload, HiExternalLink } from 'react-icons/hi';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View and download my resume',
};

export default function ResumePage() {
  const resumePath = '/resume/Resume%20-%20Chang%20Liu.pdf';

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-playfair font-bold text-white mb-6 leading-tight">
              Resume
            </h1>
            <p className="text-lg text-gray-400 mb-8 font-lora">
              Download or view my resume below
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={resumePath}
                download
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-sm font-semibold hover:bg-gray-100 transition-colors text-sm tracking-wide uppercase"
              >
                <HiDownload />
                Download PDF
              </a>
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-white border border-white rounded-sm font-semibold hover:bg-gray-800 transition-colors text-sm tracking-wide uppercase"
              >
                <HiExternalLink />
                Open in New Tab
              </a>
            </div>
          </div>

          {/* PDF Embed */}
          <div className="bg-gray-800 rounded-sm shadow-lg overflow-hidden border border-gray-700">
            <div className="aspect-[8.5/11] relative">
              <iframe
                src={resumePath}
                className="w-full h-full"
                title="Resume PDF"
              />
            </div>
          </div>

          {/* Quick Summary */}
          <div className="mt-12 bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-white">Education</h3>
                <ul className="text-gray-400 space-y-1 list-disc list-inside">
                  <li>B.S. Computer Science & B.S. Data Science</li>
                  <li>University of Wisconsin–Madison · Expected May 2026</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white">Experience</h3>
                <ul className="text-gray-400 space-y-1 list-disc list-inside">
                  <li>Undergraduate Research Assistant — People & Robots Lab (UW)</li>
                  <li>Software Dev Intern — RedBing LLC (Spring Boot, Kafka, Elasticsearch)</li>
                  <li>System Dev Intern — ZhengGong Tech (firmware fixes, testing, rollout)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white">Core Skills</h3>
                <ul className="text-gray-400 space-y-1 list-disc list-inside">
                  <li>Full-stack: React/Next.js, Node.js/Express, Spring Boot</li>
                  <li>HRI/Robotics: ROS Noetic + MoveIt, Unity/RAMPA++, VR → UR3e</li>
                  <li>Data/Infra: Elasticsearch, Kafka, Docker/Kubernetes</li>
                  <li>UX: user interviews, usability testing, prototyping</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white">Languages & Leadership</h3>
                <ul className="text-gray-400 space-y-1 list-disc list-inside">
                  <li>Languages: English (fluent), Chinese (native), Korean (beginner)</li>
                  <li>Leadership: Asian Women Basketball Club — Co-founder & VP</li>
                  <li>Adventure Learning Program — Facilitator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
