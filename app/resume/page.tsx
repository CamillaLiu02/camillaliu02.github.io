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
      <div className="min-h-screen bg-[#f7f4ee] py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-apple font-bold text-slate-900 mb-6 leading-tight">
              Resume
            </h1>
            <p className="text-lg text-slate-600 mb-8 font-apple">
              Download or view my resume below
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={resumePath}
                download
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-sm font-semibold hover:bg-slate-800 transition-colors text-sm tracking-wide uppercase"
              >
                <HiDownload />
                Download PDF
              </a>
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-slate-900 border border-slate-900 rounded-sm font-semibold hover:bg-slate-900 hover:text-white transition-colors text-sm tracking-wide uppercase"
              >
                <HiExternalLink />
                Open in New Tab
              </a>
            </div>
          </div>

          {/* PDF Embed */}
          <div className="bg-white rounded-sm shadow-lg overflow-hidden border border-stone-200">
            <div className="aspect-[8.5/11] relative">
              <iframe
                src={resumePath}
                className="w-full h-full"
                title="Resume PDF"
              />
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
