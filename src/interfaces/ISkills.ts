export interface ISkills {
  name: string;
  text: string;
  picture: string;
  experience?: string;
}

export interface ISkillsProps {
  skills: ISkills[];
}
