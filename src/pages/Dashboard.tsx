
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { FilePlus, FileEdit, Download, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-resume-blue">Resumify</Link>
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-600">
              Welcome, {user?.name || "User"}
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>

        <Tabs defaultValue="resumes" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="templates">Resume Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create new resume card */}
              <Link to="/resume/create">
                <Card className="h-52 border-dashed border-2 hover:border-resume-blue transition-colors cursor-pointer flex items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <FilePlus className="h-10 w-10 text-resume-blue mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Create New Resume</h3>
                    <p className="text-gray-500 text-sm mt-2">Start building from scratch</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Sample resume card */}
              <Card className="h-52 overflow-hidden">
                <div className="h-32 bg-gray-100 p-4">
                  <div className="h-6 w-1/3 bg-resume-blue rounded-sm mb-3"></div>
                  <div className="h-3 w-2/3 bg-gray-300 rounded-sm mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-300 rounded-sm mb-3"></div>
                  <div className="h-4 w-2/3 bg-gray-400 rounded-sm"></div>
                </div>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Professional Resume</h3>
                    <p className="text-xs text-gray-500">Last edited: 1 day ago</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Professional', 'Modern', 'Creative', 'Simple', 'Executive', 'Technical'].map((template) => (
                <Link key={template} to={`/resume/create?template=${template.toLowerCase()}`}>
                  <Card className="h-64 overflow-hidden hover:border-resume-blue transition-colors cursor-pointer">
                    <div className="h-44 bg-gray-100 p-5 border-b">
                      <div className="h-6 w-1/3 bg-resume-blue rounded-sm mb-3"></div>
                      <div className="h-3 w-2/3 bg-gray-300 rounded-sm mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded-sm mb-3"></div>
                      <div className="h-4 w-2/3 bg-gray-400 rounded-sm mb-3"></div>
                      <div className="h-3 w-full bg-gray-300 rounded-sm mb-2"></div>
                      <div className="h-3 w-full bg-gray-300 rounded-sm"></div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{template} Template</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
