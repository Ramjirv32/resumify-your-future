
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResume } from "@/contexts/ResumeContext";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Download, Edit } from "lucide-react";
import ProfessionalTemplate from "@/components/resume-templates/ProfessionalTemplate";
import ModernTemplate from "@/components/resume-templates/ModernTemplate";

const ResumePreview = () => {
  const { state, getMissingFields } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  
  const missingFields = getMissingFields();

  const handleEdit = () => {
    navigate("/resume/create");
  };

  const handleDownload = async () => {
    if (missingFields.length > 0) {
      toast({
        title: "Cannot Download",
        description: "Please fill in all required information before downloading",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    toast({
      title: "Preparing Download",
      description: "Your resume is being prepared for download...",
    });

    // In a real app, we would use html2pdf.js or jsPDF to download the resume
    // This is just a mock implementation
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully.",
      });
    }, 2000);
  };

  const renderTemplate = () => {
    switch (state.selectedTemplate) {
      case "modern":
        return <ModernTemplate resume={state} />;
      case "professional":
      default:
        return <ProfessionalTemplate resume={state} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-resume-blue">Resume Preview</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" /> Edit Resume
            </Button>
            <Button 
              onClick={handleDownload} 
              className="bg-resume-blue hover:bg-blue-800"
              disabled={isDownloading || missingFields.length > 0}
            >
              <Download className="h-4 w-4 mr-2" /> 
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </header>

      {/* Missing fields warning */}
      {missingFields.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 mt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h3 className="font-medium text-amber-800">Missing Information</h3>
              <p className="text-amber-700 text-sm mt-1">
                Please complete the following sections before downloading:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {missingFields.map((field) => (
                  <Badge key={field} variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
            <Button 
              onClick={handleEdit} 
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 mt-4 sm:mt-0"
            >
              Complete Resume
            </Button>
          </div>
        </div>
      )}

      {/* Resume preview */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-10 flex flex-col items-center">
        <div className="resume-paper w-full bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          {renderTemplate()}
        </div>

        <Button variant="outline" onClick={() => navigate("/dashboard")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
      </main>
    </div>
  );
};

export default ResumePreview;
