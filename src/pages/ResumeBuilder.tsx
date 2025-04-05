
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useResume } from "@/contexts/ResumeContext";
import { toast } from "@/components/ui/use-toast";
import PersonalInfoForm from "@/components/resume-builder/PersonalInfoForm";
import EducationForm from "@/components/resume-builder/EducationForm";
import WorkExperienceForm from "@/components/resume-builder/WorkExperienceForm";
import SkillsForm from "@/components/resume-builder/SkillsForm";
import ProjectsForm from "@/components/resume-builder/ProjectsForm";
import TemplateSelection from "@/components/resume-builder/TemplateSelection";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

const ResumeBuilder = () => {
  const [currentTab, setCurrentTab] = useState("personal-info");
  const { getMissingFields } = useResume();
  const navigate = useNavigate();

  const tabs = [
    { id: "personal-info", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "work-experience", label: "Work Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "template", label: "Template" },
  ];

  const getCurrentTabIndex = () => {
    return tabs.findIndex((tab) => tab.id === currentTab);
  };

  const handleNext = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSave = () => {
    const missing = getMissingFields();
    if (missing.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in the following: ${missing.join(", ")}`,
        variant: "destructive",
      });
    } else {
      // In a real app, we would save the data to the backend here
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
      });
      navigate("/resume/preview");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-resume-blue">Build Your Resume</h1>
          <Button onClick={handleSave} className="bg-resume-blue hover:bg-blue-800">
            <Save className="h-4 w-4 mr-2" /> Save & Preview
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <TabsContent value="personal-info">
              <PersonalInfoForm />
            </TabsContent>
            <TabsContent value="education">
              <EducationForm />
            </TabsContent>
            <TabsContent value="work-experience">
              <WorkExperienceForm />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsForm />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsForm />
            </TabsContent>
            <TabsContent value="template">
              <TemplateSelection />
            </TabsContent>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={getCurrentTabIndex() === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            {getCurrentTabIndex() === tabs.length - 1 ? (
              <Button onClick={handleSave} className="bg-resume-blue hover:bg-blue-800">
                <Save className="h-4 w-4 mr-2" /> Save & Preview
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-resume-blue hover:bg-blue-800">
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default ResumeBuilder;
