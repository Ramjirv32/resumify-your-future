
import { useEffect, useRef, useState } from "react";
import { ResumeData } from "@/contexts/ResumeContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Edit, Save } from "lucide-react";

interface CustomPdfTemplateProps {
  resume: ResumeData;
  pdfUrl: string;
}

interface FieldMapping {
  id: string;
  type: "text" | "list";
  label: string;
  value: string;
  position: { top: number; left: number };
  width: number;
}

const CustomPdfTemplate = ({ resume, pdfUrl }: CustomPdfTemplateProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([
    // Default mappings based on resume data
    {
      id: "name",
      type: "text",
      label: "Full Name",
      value: resume.personalInfo.fullName,
      position: { top: 10, left: 10 },
      width: 200,
    },
    {
      id: "email",
      type: "text",
      label: "Email",
      value: resume.personalInfo.email,
      position: { top: 40, left: 10 },
      width: 200,
    },
    {
      id: "phone",
      type: "text",
      label: "Phone",
      value: resume.personalInfo.phone,
      position: { top: 70, left: 10 },
      width: 200,
    },
    // Education fields
    ...(resume.education.length > 0
      ? [
          {
            id: "education-title",
            type: "text",
            label: "Education",
            value: "EDUCATION",
            position: { top: 120, left: 10 },
            width: 200,
          },
          {
            id: "education-1",
            type: "text",
            label: "Institution",
            value: resume.education[0].institution,
            position: { top: 150, left: 10 },
            width: 300,
          },
        ]
      : []),
    // Work experience fields
    ...(resume.workExperience.length > 0
      ? [
          {
            id: "experience-title",
            type: "text",
            label: "Experience",
            value: "WORK EXPERIENCE",
            position: { top: 210, left: 10 },
            width: 200,
          },
          {
            id: "experience-1",
            type: "text",
            label: "Company",
            value: resume.workExperience[0].company,
            position: { top: 240, left: 10 },
            width: 300,
          },
        ]
      : []),
  ]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, this would be where we'd inject the resume data 
    // into the PDF template using a PDF manipulation library
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [resume, pdfUrl]);
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const startEditMode = () => {
    setIsEditMode(true);
    toast({
      title: "Edit Mode Activated",
      description: "Click and drag fields to position them on your resume template.",
    });
  };

  const saveMapping = () => {
    setIsEditMode(false);
    toast({
      title: "Field Mapping Saved",
      description: "Your resume field positions have been saved.",
    });
    // In a real implementation, we would save this mapping to the backend
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("fieldId", id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const fieldId = e.dataTransfer.getData("fieldId");
    
    // Get the overlay container's position
    const overlayRect = overlayRef.current?.getBoundingClientRect();
    
    if (!overlayRect) return;
    
    // Calculate position within the overlay
    const x = e.clientX - overlayRect.left;
    const y = e.clientY - overlayRect.top;
    
    setFieldMappings(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, position: { top: y, left: x } } 
          : field
      )
    );
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="p-8">
          <Skeleton className="h-8 w-2/3 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />
          
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5 mb-6" />
        </div>
      ) : (
        <div className="p-0">
          <div className="flex justify-end mb-4 gap-2">
            {isEditMode ? (
              <Button onClick={saveMapping} className="flex items-center gap-2 bg-resume-blue hover:bg-blue-800">
                <Save className="h-4 w-4" />
                Save Field Mapping
              </Button>
            ) : (
              <Button onClick={startEditMode} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Map Resume Fields
              </Button>
            )}
          </div>
          
          {/* PDF Viewer with interactive data overlay */}
          <div className="relative">
            <iframe 
              ref={iframeRef}
              src={pdfUrl}
              className={`w-full h-[1100px] ${isEditMode ? 'pointer-events-none' : ''}`}
              onLoad={handleIframeLoad}
              title="Resume Template"
            />
            
            {/* Interactive data overlay */}
            <div 
              ref={overlayRef}
              className={`absolute top-0 left-0 w-full h-full ${isEditMode ? 'cursor-grab' : 'pointer-events-none'}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {fieldMappings.map(field => (
                <div
                  key={field.id}
                  draggable={isEditMode}
                  onDragStart={e => handleDragStart(e, field.id)}
                  style={{
                    position: 'absolute',
                    top: `${field.position.top}px`,
                    left: `${field.position.left}px`,
                    width: `${field.width}px`,
                  }}
                  className={`p-1 ${
                    isEditMode 
                      ? 'border border-dashed border-gray-400 bg-white/30 cursor-move' 
                      : 'border-none'
                  }`}
                >
                  {isEditMode && (
                    <div className="text-xs bg-white/80 p-1 mb-1 rounded text-gray-600">
                      {field.label}
                    </div>
                  )}
                  <div 
                    className={`${
                      isEditMode ? 'bg-white/80 text-black p-1 rounded' : 'text-black'
                    }`}
                  >
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-gray-50 border-t text-center text-gray-500 text-sm">
        <p>
          {isEditMode 
            ? "Drag and drop fields to position them on your resume template."
            : "This is a custom uploaded template. Your resume data has been mapped to this template's format."}
        </p>
      </div>
    </div>
  );
};

export default CustomPdfTemplate;
