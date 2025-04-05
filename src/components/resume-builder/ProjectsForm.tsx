
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume, Project } from "@/contexts/ResumeContext";
import { Plus, Edit, Trash, Link as LinkIcon } from "lucide-react";

const ProjectsForm = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset } = useForm<Project>({
    defaultValues: {
      id: "",
      title: "",
      description: "",
      technologies: "",
      link: ""
    }
  });

  const onSubmit = (data: Project) => {
    if (editingId) {
      dispatch({
        type: "UPDATE_PROJECT",
        payload: { ...data, id: editingId }
      });
      setEditingId(null);
    } else {
      dispatch({
        type: "ADD_PROJECT",
        payload: { ...data, id: Date.now().toString() }
      });
    }
    reset();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    reset(project);
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_PROJECT", payload: id });
    if (editingId === id) {
      setEditingId(null);
      reset();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        <p className="text-gray-600">
          Add your notable personal or professional projects to showcase your skills.
        </p>
      </div>

      {/* Project list */}
      {state.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Added Projects</h3>
          <div className="space-y-4">
            {state.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{project.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(project.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </p>
                  <p className="text-sm mb-2">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-resume-blue hover:underline text-sm flex items-center"
                    >
                      <LinkIcon className="h-3 w-3 mr-1" /> Project Link
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Project form */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Project" : "Add New Project"}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="E-commerce Website, Mobile App, etc."
                {...register("title", { required: true })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="technologies">Technologies Used</Label>
              <Input
                id="technologies"
                placeholder="React, Node.js, Python, etc."
                {...register("technologies")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what the project does, your role, and any notable achievements..."
                rows={4}
                {...register("description", { required: true })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                placeholder="https://github.com/yourusername/project"
                {...register("link")}
              />
              <p className="text-xs text-gray-500 mt-1">
                Link to GitHub, website, or any online demo of your project
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-resume-blue hover:bg-blue-800">
              {editingId ? "Update Project" : (
                <>
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectsForm;
