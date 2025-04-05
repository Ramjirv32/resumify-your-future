
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 lg:py-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-resume-blue">
            Create Your Professional Resume in Minutes
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Stand out from the crowd with a professionally designed resume. 
            Our easy-to-use builder helps you create impressive resumes that get noticed by employers.
          </p>
          <div className="mt-10">
            <Link to="/login">
              <Button className="px-8 py-6 text-lg rounded-lg bg-resume-blue hover:bg-blue-800 transition-colors">
                Get Started <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-gray-500">{i}</span>
                </div>
              ))}
            </div>
            <p className="ml-4 text-sm text-gray-600">
              Joined by 10,000+ job seekers this month
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 bg-resume-lightgray flex items-center justify-center p-12">
          <div className="resume-paper bg-white w-full max-w-md aspect-[1/1.414] p-8 rounded-md">
            <div className="h-10 w-1/2 bg-resume-blue rounded-sm mb-6"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded-sm mb-3"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-sm mb-8"></div>
            
            <div className="h-6 w-1/3 bg-gray-400 rounded-sm mb-4"></div>
            <div className="h-3 w-full bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-3 w-3/4 bg-gray-200 rounded-sm mb-6"></div>
            
            <div className="h-6 w-1/3 bg-gray-400 rounded-sm mb-4"></div>
            <div className="h-3 w-full bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded-sm mb-6"></div>
            
            <div className="h-6 w-1/3 bg-gray-400 rounded-sm mb-4"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-6 w-16 bg-resume-lightblue/30 rounded-full"></div>
              ))}
            </div>
            
            <div className="h-6 w-1/3 bg-gray-400 rounded-sm mb-4"></div>
            <div className="h-3 w-full bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded-sm mb-2"></div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Resume Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Templates",
                description: "Choose from multiple professionally designed templates to make your resume stand out."
              },
              {
                title: "Easy to Use",
                description: "Our intuitive interface makes it simple to create and edit your resume in minutes."
              },
              {
                title: "Download as PDF",
                description: "Export your resume as a PDF file, ready to send to potential employers."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-resume-blue/10 text-resume-blue rounded-lg flex items-center justify-center mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Resumify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
