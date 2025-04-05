
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume, Education } from "@/contexts/ResumeContext";
import { Plus, Edit, Trash } from "lucide-react";

const EducationForm = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { isValid } } = useForm<Education>({
    defaultValues: {
      id: "",
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  });

  const onSubmit = (data: Education) => {
    if (editingId) {
      dispatch({
        type: "UPDATE_EDUCATION",
        payload: { ...data, id: editingId }
      });
      setEditingId(null);
    } else {
      dispatch({
        type: "ADD_EDUCATION",
        payload: { ...data, id: Date.now().toString() }
      });
    }
    reset();
  };

  const handleEdit = (education: Education) => {
    setEditingId(education.id);
    reset(education);
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_EDUCATION", payload: id });
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
        <h2 className="text-xl font-bold text-gray-900">Education</h2>
        <p className="text-gray-600">
          Add your educational background, degrees, and certifications.
        </p>
      </div>

      {/* Education list */}
      {state.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Added Education</h3>
          <div className="space-y-4">
            {state.education.map((edu) => (
              <Card key={edu.id}>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{edu.institution}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(edu)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(edu.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Education form */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Education" : "Add New Education"}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution/School *</Label>
              <Input
                id="institution"
                placeholder="University of Example"
                {...register("institution", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">Degree *</Label>
              <Input
                id="degree"
                placeholder="Bachelor's, Master's, etc."
                {...register("degree", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study *</Label>
              <Input
                id="fieldOfStudy"
                placeholder="Computer Science, Business, etc."
                {...register("fieldOfStudy", { required: true })}
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
                <Label htmlFor="endDate">End Date (or expected)</Label>
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
              placeholder="Relevant coursework, achievements, or other details..."
              {...register("description")}
            />
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
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
