
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useResume, Skill } from "@/contexts/ResumeContext";
import { Plus, X } from "lucide-react";

const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const SkillsForm = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState("intermediate");
  
  const { register, handleSubmit, reset, setValue, watch } = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    }
  });

  const skillName = watch("name");

  const onSubmit = (data: { name: string }) => {
    const newSkill: Skill = {
      id: editingId || Date.now().toString(),
      name: data.name,
      level: skillLevel,
    };

    if (editingId) {
      dispatch({
        type: "UPDATE_SKILL",
        payload: newSkill
      });
      setEditingId(null);
    } else {
      dispatch({
        type: "ADD_SKILL",
        payload: newSkill
      });
    }
    
    reset();
    setSkillLevel("intermediate");
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_SKILL", payload: id });
    if (editingId === id) {
      setEditingId(null);
      reset();
      setSkillLevel("intermediate");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setValue("name", skill.name);
    setSkillLevel(skill.level);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-blue-100 text-blue-800";
      case "intermediate":
        return "bg-green-100 text-green-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <p className="text-gray-600">
          Add your technical skills, soft skills, and competencies.
        </p>
      </div>

      {/* Skills list */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Skills</h3>
        <div className="flex flex-wrap gap-2">
          {state.skills.length === 0 ? (
            <p className="text-gray-500">No skills added yet.</p>
          ) : (
            state.skills.map((skill) => (
              <Badge 
                key={skill.id} 
                className={`px-3 py-1.5 ${getLevelColor(skill.level)} cursor-pointer`}
                onClick={() => handleEdit(skill)}
              >
                {skill.name}
                <button 
                  className="ml-2 hover:text-gray-700 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(skill.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>

      {/* Add skill form */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Skill" : "Add New Skill"}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name *</Label>
              <Input
                id="skillName"
                placeholder="JavaScript, Communication, Project Management, etc."
                {...register("name", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">Proficiency Level</Label>
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger id="skillLevel">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {editingId && (
              <Button type="button" variant="outline" onClick={() => {
                setEditingId(null);
                reset();
                setSkillLevel("intermediate");
              }}>
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              className="bg-resume-blue hover:bg-blue-800"
              disabled={!skillName}
            >
              {editingId ? "Update Skill" : (
                <>
                  <Plus className="h-4 w-4 mr-2" /> Add Skill
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;
