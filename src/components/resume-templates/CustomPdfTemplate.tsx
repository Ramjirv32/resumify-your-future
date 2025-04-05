
import { useEffect, useRef, useState } from "react";
import { ResumeData } from "@/contexts/ResumeContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomPdfTemplateProps {
  resume: ResumeData;
  pdfUrl: string;
}

const CustomPdfTemplate = ({ resume, pdfUrl }: CustomPdfTemplateProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
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
          {/* PDF Viewer with data overlay */}
          <div className="relative">
            <iframe 
              ref={iframeRef}
              src={pdfUrl}
              className="w-full h-[1100px] pointer-events-none"
              onLoad={handleIframeLoad}
              title="Resume Template"
            />
            
            {/* Data overlay - in a real implementation, this would be precisely
                positioned to match the template's layout */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Note: In a real implementation, these elements would be positioned 
                    based on the structure extracted from the PDF */}
              <div className="absolute top-[10%] left-[10%] text-transparent">
                <p>{resume.personalInfo.fullName}</p>
                <p>{resume.personalInfo.email}</p>
                <p>{resume.personalInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-gray-50 border-t text-center text-gray-500 text-sm">
        <p>
          This is a custom uploaded template. Your resume data has been mapped to this template's format.
        </p>
      </div>
    </div>
  );
};

export default CustomPdfTemplate;
