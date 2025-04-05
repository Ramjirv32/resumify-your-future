
import { useResume } from "@/contexts/ResumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Upload, FileUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and traditional layout, ideal for corporate roles",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a creative touch",
  },
  {
    id: "simple",
    name: "Simple",
    description: "Minimalist design focusing on content",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industry roles",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated layout for senior positions",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Technical focus with skills emphasis",
  },
];

const TemplateSelection = () => {
  const { state, dispatch } = useResume();
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId: string) => {
    dispatch({ type: "SELECT_TEMPLATE", payload: templateId });
  };

  const handleUploadTemplate = () => {
    navigate("/resume/upload-template");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Choose a Template</h2>
          <Button 
            onClick={handleUploadTemplate} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <FileUp className="h-4 w-4" />
            <span>Upload Your Template</span>
          </Button>
        </div>
        <p className="text-gray-600">
          Select a template that best fits your professional style and industry.
        </p>
      </div>

      <RadioGroup
        value={state.selectedTemplate}
        onValueChange={handleSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {templates.map((template) => {
          const isSelected = state.selectedTemplate === template.id;
          
          return (
            <Label
              key={template.id}
              htmlFor={template.id}
              className={`cursor-pointer ${
                isSelected ? "ring-2 ring-resume-blue" : ""
              }`}
            >
              <Card className="h-full overflow-hidden">
                <div className="relative">
                  {/* Template preview */}
                  <div className="h-48 bg-gray-100 p-5 border-b">
                    {/* Mock resume layout */}
                    <div className={`h-6 w-1/3 rounded-sm mb-3 ${
                      template.id === 'modern' ? 'bg-resume-lightblue' : 
                      template.id === 'creative' ? 'bg-purple-500' :
                      template.id === 'simple' ? 'bg-gray-700' :
                      template.id === 'executive' ? 'bg-gray-900' :
                      template.id === 'technical' ? 'bg-green-600' :
                      'bg-resume-blue'
                    }`}></div>
                    <div className="h-3 w-2/3 bg-gray-300 rounded-sm mb-2"></div>
                    <div className="h-3 w-1/2 bg-gray-300 rounded-sm mb-3"></div>
                    <div className="h-4 w-2/3 bg-gray-400 rounded-sm mb-3"></div>
                    <div className="h-3 w-full bg-gray-300 rounded-sm mb-2"></div>
                    <div className="h-3 w-full bg-gray-300 rounded-sm"></div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-resume-blue text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      id={template.id}
                      value={template.id}
                      className="sr-only"
                    />
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          );
        })}

        {/* Custom Templates */}
        {state.customTemplates.map((template) => {
          const isSelected = state.selectedTemplate === template.id;
          
          return (
            <Label
              key={template.id}
              htmlFor={template.id}
              className={`cursor-pointer ${
                isSelected ? "ring-2 ring-resume-blue" : ""
              }`}
            >
              <Card className="h-full overflow-hidden">
                <div className="relative">
                  {/* Custom template preview */}
                  <div className="h-48 bg-gray-100 p-1 border-b">
                    <iframe
                      src={template.pdfUrl}
                      className="w-full h-full"
                      title={`Preview of ${template.name}`}
                    />
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-resume-blue text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      id={template.id}
                      value={template.id}
                      className="sr-only"
                    />
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default TemplateSelection;
