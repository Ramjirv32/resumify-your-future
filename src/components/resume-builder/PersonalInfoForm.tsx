
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/contexts/ResumeContext";
import { PersonalInfo } from "@/contexts/ResumeContext";

const PersonalInfoForm = () => {
  const { state, dispatch } = useResume();
  const { register, handleSubmit, reset } = useForm<PersonalInfo>({
    defaultValues: state.personalInfo,
  });

  useEffect(() => {
    reset(state.personalInfo);
  }, [reset, state.personalInfo]);

  const onSubmit = (data: PersonalInfo) => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: data });
  };

  return (
    <form onChange={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600">
          Add your personal details so employers can contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            {...register("fullName")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="(123) 456-7890"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="123 Main St, City, State"
            {...register("address")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/johndoe"
            {...register("linkedin")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Portfolio/Website</Label>
          <Input
            id="website"
            placeholder="https://johndoe.com"
            {...register("website")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objective">Career Objective</Label>
        <Textarea
          id="objective"
          placeholder="A brief summary of your career goals and expertise..."
          rows={4}
          {...register("objective")}
        />
      </div>
    </form>
  );
};

export default PersonalInfoForm;
