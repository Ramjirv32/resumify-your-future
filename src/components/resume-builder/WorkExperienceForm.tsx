
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume, WorkExperience } from "@/contexts/ResumeContext";
import { Plus, Edit, Trash } from "lucide-react";

const WorkExperienceForm = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset } = useForm<WorkExperience>({
    defaultValues: {
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  });

  const onSubmit = (data: WorkExperience) => {
    if (editingId) {
      dispatch({
        type: "UPDATE_WORK_EXPERIENCE",
        payload: { ...data, id: editingId }
      });
      setEditingId(null);
    } else {
      dispatch({
        type: "ADD_WORK_EXPERIENCE",
        payload: { ...data, id: Date.now().toString() }
      });
    }
    reset();
  };

  const handleEdit = (experience: WorkExperience) => {
    setEditingId(experience.id);
    reset(experience);
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_WORK_EXPERIENCE", payload: id });
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
        <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
        <p className="text-gray-600">
          Add your work history, internships, and professional experiences.
        </p>
      </div>

      {/* Experience list */}
      {state.workExperience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Added Work Experience</h3>
          <div className="space-y-4">
            {state.workExperience.map((exp) => (
              <Card key={exp.id}>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{exp.position} at {exp.company}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(exp)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(exp.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm text-gray-500">
                    {exp.location} | {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                  <p className="text-sm mt-2 line-clamp-2">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Experience form */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Work Experience" : "Add New Work Experience"}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization *</Label>
              <Input
                id="company"
                placeholder="Google, Amazon, etc."
                {...register("company", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position/Title *</Label>
              <Input
                id="position"
                placeholder="Software Engineer, Product Manager, etc."
                {...register("position", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State or Remote"
                {...register("location")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  placeholder="MM/YYYY"
                  {...register("startDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  placeholder="MM/YYYY or Present"
                  {...register("endDate")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your responsibilities, achievements, and the impact of your work..."
              rows={4}
              {...register("description")}
            />
            <p className="text-xs text-gray-500 mt-1">
              Pro tip: Use bullet points and action verbs to highlight your achievements
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-resume-blue hover:bg-blue-800">
              {editingId ? "Update" : (
                <>
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
