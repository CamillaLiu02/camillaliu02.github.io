import { Metadata } from 'next';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me',
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f7f4ee] py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-apple font-bold text-slate-900 mb-6 leading-tight">
              Let's Connect
            </h1>
            <p className="text-xl text-slate-600 font-apple leading-relaxed">
              I'm always open to discussing new opportunities, projects, or just
              chatting about design and tech!
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <a
              href="mailto:changliu5101@gmail.com"
              className="bg-white rounded-sm p-10 text-center shadow-lg hover:shadow-xl transition-all duration-200 border border-stone-200 hover:border-stone-300 group"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <FaEnvelope className="text-2xl text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-apple font-bold text-slate-900 mb-3 text-lg">Email</h3>
              <p className="text-slate-600 text-sm font-apple">changliu5101@gmail.com</p>
            </a>

            <a
              href="https://www.linkedin.com/in/chang-l-276423314"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-sm p-10 text-center shadow-lg hover:shadow-xl transition-all duration-200 border border-stone-200 hover:border-stone-300 group"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <FaLinkedin className="text-2xl text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-apple font-bold text-slate-900 mb-3 text-lg">LinkedIn</h3>
              <p className="text-slate-600 text-sm font-apple">/in/chang-l-276423314</p>
            </a>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white rounded-sm p-10 shadow-lg border border-stone-200">
            <h2 className="text-3xl font-apple font-bold text-slate-900 mb-8">
              Send a Message
            </h2>
            <form
              action="mailto:changliu5101@gmail.com"
              method="GET"
              encType="text/plain"
              className="space-y-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-600 mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-stone-200 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-stone-200 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-600 mb-3"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-stone-200 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-600 mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="body"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-stone-200 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-blue-500 text-white rounded-sm font-semibold hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>

              <p className="text-sm text-slate-500 text-center">
                This form uses mailto. For a better experience, integrate with{' '}
                <a
                  href="https://formspree.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Formspree
                </a>
                ,{' '}
                <a
                  href="https://getform.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Getform
                </a>
                , or similar service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
