
import { ResumeData } from "@/contexts/ResumeContext";
import { Phone, Mail, Home, Link as LinkIcon, Briefcase, GraduationCap, Award } from "lucide-react";

interface ProfessionalTemplateProps {
  resume: ResumeData;
}

const ProfessionalTemplate = ({ resume }: ProfessionalTemplateProps) => {
  const { personalInfo, education, workExperience, skills, projects } = resume;

  return (
    <div className="bg-white p-8 shadow-lg text-left">
      {/* Header */}
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-resume-blue">
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-gray-600">
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
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.objective && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-resume-blue">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.objective}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-resume-blue flex items-center">
            <Briefcase className="h-5 w-5 mr-2" /> Work Experience
          </h2>
          
          <div className="space-y-4">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{job.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {job.startDate} - {job.endDate || "Present"}
                  </span>
                </div>
                <h4 className="text-gray-700">{job.company}{job.location ? `, ${job.location}` : ""}</h4>
                <p className="mt-1 text-gray-600 whitespace-pre-line">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-resume-blue flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" /> Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <h4 className="text-gray-700">{edu.institution}</h4>
                {edu.description && (
                  <p className="mt-1 text-gray-600">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-resume-blue flex items-center">
            <Award className="h-5 w-5 mr-2" /> Skills
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill.name}
                {skill.level !== "intermediate" && (
                  <span className="text-xs ml-1 text-gray-500">
                    ({skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-3 text-resume-blue">Projects</h2>
          
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-resume-blue hover:underline text-sm flex items-center"
                    >
                      <LinkIcon className="h-3 w-3 mr-1" /> View Project
                    </a>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-gray-700 font-medium">
                    Technologies: {project.technologies}
                  </p>
                )}
                <p className="mt-1 text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
