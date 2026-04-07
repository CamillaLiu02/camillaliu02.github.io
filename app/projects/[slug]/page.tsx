import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { formatDate } from '@/lib/utils/cn';
import TableOfContents from '@/components/project/TableOfContents';
import Gallery from '@/components/project/Gallery';
import { HeadingItem } from '@/types/project';
import {
  HiArrowLeft,
  HiExternalLink,
  HiCalendar,
  HiClock,
} from 'react-icons/hi';
import { FaGithub, FaFigma } from 'react-icons/fa';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.frontmatter.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.shortDescription,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.shortDescription,
      images: [project.frontmatter.heroImage],
    },
  };
}

function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].split('#').length - 1;
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}

const components = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h2
        id={id}
        className="text-3xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h3
        id={id}
        className="text-2xl font-semibold text-gray-900 mt-8 mb-3 scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary-600 hover:text-primary-700 underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="border-l-4 border-primary-500 pl-4 italic text-gray-700 my-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary-600"
      {...props}
    />
  ),
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content, readingTime } = project;
  const headings = extractHeadings(content);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <HiArrowLeft />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[50vh] bg-gray-100">
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {frontmatter.shortDescription}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-gray-400" />
                  <span>{formatDate(frontmatter.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiClock className="text-gray-400" />
                  <span>{readingTime}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Role:</span>{' '}
                  {frontmatter.role}
                </div>
              </div>

              {/* Tools */}
              <div className="mt-4">
                <span className="font-medium text-gray-900 mr-2">Tools:</span>
                <span className="text-gray-600">
                  {frontmatter.tools.join(', ')}
                </span>
              </div>

              {/* Links */}
              {frontmatter.links && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {frontmatter.links.demo && (
                    <a
                      href={frontmatter.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <HiExternalLink />
                      View Demo
                    </a>
                  )}
                  {frontmatter.links.github && (
                    <a
                      href={frontmatter.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <FaGithub />
                      GitHub
                    </a>
                  )}
                  {frontmatter.links.figma && (
                    <a
                      href={frontmatter.links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaFigma />
                      Figma
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={content} components={components} />
            </div>

            {/* Gallery */}
            {frontmatter.galleryImages && frontmatter.galleryImages.length > 0 && (
              <Gallery
                images={frontmatter.galleryImages}
                title="Project Gallery"
              />
            )}
          </div>

          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
