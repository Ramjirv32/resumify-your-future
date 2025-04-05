
import { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  objective: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  selectedTemplate: string;
}

// Define initial state
const initialState: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    objective: '',
  },
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
  selectedTemplate: 'professional',
};

// Define action types
type Action =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: Education }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: WorkExperience }
  | { type: 'REMOVE_WORK_EXPERIENCE'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: Skill }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'SELECT_TEMPLATE'; payload: string }
  | { type: 'CLEAR_RESUME' };

// Create reducer
const resumeReducer = (state: ResumeData, action: Action): ResumeData => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((item) => item.id !== action.payload),
      };
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: [...state.workExperience, action.payload],
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter(
          (item) => item.id !== action.payload
        ),
      };
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((item) => item.id !== action.payload),
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((item) => item.id !== action.payload),
      };
    case 'SELECT_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload,
      };
    case 'CLEAR_RESUME':
      return initialState;
    default:
      return state;
  }
};

// Create context
interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<Action>;
  getMissingFields: () => string[];
}

const ResumeContext = createContext<ResumeContextType>({} as ResumeContextType);

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const getMissingFields = (): string[] => {
    const missing: string[] = [];

    // Check personal info
    const { personalInfo } = state;
    if (!personalInfo.fullName) missing.push('Full Name');
    if (!personalInfo.email) missing.push('Email');
    if (!personalInfo.phone) missing.push('Phone');
    
    // Check if at least one education entry exists
    if (state.education.length === 0) missing.push('Education');
    
    // Check if at least one work experience entry exists
    if (state.workExperience.length === 0) missing.push('Work Experience');
    
    // Check if at least one skill exists
    if (state.skills.length === 0) missing.push('Skills');

    return missing;
  };

  return (
    <ResumeContext.Provider value={{ state, dispatch, getMissingFields }}>
      {children}
    </ResumeContext.Provider>
  );
};
