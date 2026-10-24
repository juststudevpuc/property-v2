import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'
import { cn } from '@/lib/utils'

interface ProjectsSliderProps {
  /**
   * Easily customize the height of the edge-to-edge project cards.
   * Examples: 'h-[85vh]', 'h-[92vh]', 'h-screen', 'h-[800px]'
   */
  heightClassName?: string
}

export default function ProjectsSlider({
  // Matches the tall 120vh card height:
  heightClassName = 'h-[650px] sm:h-[750px] lg:h-[120vh]',
}: ProjectsSliderProps) {
  // Display the 4 landmark projects side-by-side (each taking 1/4 of screen width on desktop)
  const displayProjects = PROJECTS.slice(0, 4)

  return (
    <section
      className="w-full p-0 m-0 overflow-hidden bg-[#0D1117]"
      aria-label="Featured Landmark Projects"
    >
      <div className="w-full flex flex-col lg:flex-row gap-0 p-0 m-0">
        {displayProjects.map((project) => (
          <div
            key={project.id}
            className={cn(
              'w-full lg:flex-1 border-b lg:border-b-0 lg:border-r border-[#1E2633]/60 last:border-b-0 last:border-r-0',
              heightClassName
            )}
          >
            <ProjectCard
              project={project}
              heightClassName={heightClassName}
              className="h-full w-full rounded-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
