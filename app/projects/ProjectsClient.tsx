'use client';

import { useState, useMemo } from 'react';
import { HiSearch } from 'react-icons/hi';
import ProjectCard from '@/components/project/ProjectCard';
import TagFilter from '@/components/project/TagFilter';
import PageTransition from '@/components/ui/PageTransition';
import { Project } from '@/types/project';

interface ProjectsClientProps {
  projects: Project[];
  allTags: string[];
}

export default function ProjectsClient({
  projects,
  allTags,
}: ProjectsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTagToggle = (tag: string) => {
    if (tag === 'all') {
      setSelectedTags([]);
    } else {
      setSelectedTags((prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag)
          : [...prev, tag]
      );
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.frontmatter.tags.includes(tag));

      const matchesSearch =
        searchQuery === '' ||
        project.frontmatter.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.frontmatter.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesTags && matchesSearch;
    });
  }, [projects, selectedTags, searchQuery]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-playfair font-bold text-white mb-6 leading-tight">
              My Projects
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-lora">
              Explore my work in technical development, user research, and UI/UX design!
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-600 rounded-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mb-16 flex justify-center">
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.frontmatter.slug}
                  project={project.frontmatter}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">
                No projects found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
