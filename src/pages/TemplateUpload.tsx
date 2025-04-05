
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useResume } from "@/contexts/ResumeContext";
import { Upload, FileUp, ArrowLeft } from "lucide-react";

const TemplateUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useResume();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      // Check if file is a PDF
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file only",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      
      // Create a preview for the PDF
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF template to upload",
        variant: "destructive",
      });
      return;
    }

    if (!templateName.trim()) {
      toast({
        title: "Template Name Required",
        description: "Please provide a name for your template",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, we would upload the PDF to a server for text extraction
      // For now, let's simulate the text extraction process
      
      // Extract text from PDF would normally happen server-side
      // This is a placeholder for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a custom template entry
      dispatch({ 
        type: "ADD_CUSTOM_TEMPLATE", 
        payload: {
          id: `custom-${Date.now()}`,
          name: templateName,
          description: "Custom uploaded template",
          pdfUrl: filePreview || "",
          // In a real app, we'd also include extracted content structure
        }
      });

      toast({
        title: "Template Uploaded Successfully",
        description: "Your custom template has been added to your collection",
      });

      navigate("/resume/create");
    } catch (error) {
      console.error("Error uploading template:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-resume-blue">Upload Custom Template</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/resume/create")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Resume Builder
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload Your Own Template</h2>
              <p className="mt-2 text-gray-600">
                Upload a PDF resume template. Our system will analyze it and adapt your resume content to match this template's style and layout.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="E.g., My Professional Template"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateFile">Upload PDF Template</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="templateFile"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {filePreview && (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[8.5/11] w-full bg-gray-100 rounded-md overflow-hidden">
                    <iframe
                      src={filePreview}
                      className="w-full h-full"
                      title="PDF Preview"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleUpload}
                disabled={isUploading || !file}
                className="bg-resume-blue hover:bg-blue-800"
              >
                {isUploading ? (
                  <>Processing Template...</>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" /> Upload Template
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateUpload;
