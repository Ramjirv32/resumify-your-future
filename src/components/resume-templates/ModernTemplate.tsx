
import { ResumeData } from "@/contexts/ResumeContext";
import { Phone, Mail, Home, Link as LinkIcon, Linkedin } from "lucide-react";

interface ModernTemplateProps {
  resume: ResumeData;
}

const ModernTemplate = ({ resume }: ModernTemplateProps) => {
  const { personalInfo, education, workExperience, skills, projects } = resume;

  return (
    <div className="bg-white relative">
      {/* Header with colored background */}
      <header className="bg-resume-lightblue text-white p-8">
        <h1 className="text-3xl font-bold">
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        {personalInfo.objective && (
          <p className="mt-2 text-blue-50">{personalInfo.objective}</p>
        )}
        
        {/* Contact information */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-blue-50">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: Skills and Education */}
        <div className="md:col-span-1 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                Skills
              </h2>
              
              <div className="space-y-4">
                {skills.map((skill) => {
                  let widthClass = "w-1/4"; // beginner
                  if (skill.level === "intermediate") widthClass = "w-2/4";
                  if (skill.level === "advanced") widthClass = "w-3/4";
                  if (skill.level === "expert") widthClass = "w-full";
                  
                  return (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-gray-500 capitalize">
                          {skill.level}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${widthClass} bg-resume-lightblue`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                Education
              </h2>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-resume-lightblue">{edu.fieldOfStudy}</p>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column: Experience and Projects */}
        <div className="md:col-span-2 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                Work Experience
              </h2>
              
              <div className="space-y-6">
                {workExperience.map((job) => (
                  <div key={job.id} className="relative pl-6 border-l-2 border-resume-lightblue pb-6 last:pb-0">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-resume-lightblue"></div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{job.position}</h3>
                        <span className="text-gray-500 text-sm whitespace-nowrap">
                          {job.startDate} - {job.endDate || "Present"}
                        </span>
                      </div>
                      <p className="text-resume-lightblue">{job.company}</p>
                      {job.location && (
                        <p className="text-gray-500 text-sm">{job.location}</p>
                      )}
                      <p className="mt-2 text-gray-600 whitespace-pre-line">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                Projects
              </h2>
              
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{project.title}</h3>
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-resume-lightblue hover:underline text-sm flex items-center"
                        >
                          <LinkIcon className="h-3 w-3 mr-1" /> View
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="text-sm text-resume-lightblue mt-1">
                        {project.technologies}
                      </p>
                    )}
                    <p className="mt-2 text-gray-600 text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModernTemplate;
