export type ProfileType = 
  | 'explorador'
  | 'criador'
  | 'estrategista'
  | 'investigador'
  | 'narrador';

export type EducationStage = 
  | 'infantil'       // Educação Infantil (0 a 5 anos)
  | 'fundamental1'   // Ensino Fundamental I - Anos Iniciais (1º ao 5º ano)
  | 'fundamental2'   // Ensino Fundamental II - Anos Finais (6º ao 9º ano)
  | 'medio'          // Ensino Médio (1º ao 3º ano / Itinerários)
  | 'eja_tecnico';   // EJA / Educação Profissional e Técnica

export type SchoolPeriod = 
  | 'matutino'       // Manhã
  | 'vespertino'     // Tarde
  | 'noturno'        // Noite
  | 'integral';      // Tempo Integral

export interface TeacherClass {
  id: string;
  name: string; // ex: "3º Ano B", "1º Ano EM A", "5º Ano Tarde", "Grupo 4"
  educationStage?: EducationStage;
  stage?: EducationStage; // alias for stage/educationStage
  period: SchoolPeriod;
  discipline: string; // ex: "Matemática", "Ciências", "Polivalente / Alfabetização", "Robótica", etc.
  studentCount?: number;
  studentsCount?: number; // alias
}

export interface AvatarOption {
  id: string;
  name: string;
  role: string;
  color: string;
  iconName: string;
  description: string;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    description: string;
    profile: ProfileType;
    icon: string;
  }[];
}

export interface ProfileDefinition {
  type: ProfileType;
  title: string;
  evolutionTitle: string;
  badge: string;
  motto: string;
  welcomeMessage: string;
  description: string;
  themeColor: {
    primary: string;
    secondary: string;
    bgLight: string;
    border: string;
    accent: string;
    gradient: string;
  };
  layoutStyle: 'map' | 'workshop' | 'planner' | 'lab' | 'story';
  recommendedTechs: string[];
}

export interface Technology {
  id: string;
  name: string;
  category: 'robotica' | 'audiovisual' | 'imersao' | 'computacao' | 'colaboracao';
  description: string;
  subtitle?: string;
  imageUrl?: string;
  pedagogicalBenefits: string[];
  preparationTimeMinutes: number;
  difficultyLevel: 'Muito Acessível' | 'Passo a Passo Guiado' | 'Desafio Estimulante';
  icon: string;
  unitAvailableCount: number;
  tags: string[];
  tipsForTeachers: string;
  suitableStages: (EducationStage | 'todas')[];
}

export interface CurricularProposal {
  id: string;
  title: string;
  thematicTitle?: string;
  thematicArea?: string; // Linguagens, Ciências da Natureza, Ciências Humanas, Matemática, Educação Infantil
  curricularComponent: string;
  educationStage: EducationStage | 'todas';
  suitablePeriods?: (SchoolPeriod | 'todos')[];
  content: string;
  objective: string;
  targetYear: string;
  durationClasses: number;
  recommendedTechId: string;
  techName: string;
  equipmentSupport?: string[];
  classFormat: 'individual' | 'duplas' | 'grupos' | 'coletivo';
  description: string;
  imageUrl?: string;
  bnccSkills?: string[];
  pedagogicalIntentionality?: string;
  supportTools?: string[];
  sessionSteps?: {
    sessionNumber: string;
    title: string;
    description: string;
    details?: string[];
  }[];
  steps: {
    stage: string;
    duration: string;
    action: string;
  }[];
  resourceLinks?: {
    label: string;
    url: string;
    note?: string;
  }[];
  evaluationSuggestion: string;
  evaluationRubric?: {
    criteria: string;
    excellent: string;
    satisfactory: string;
    unsatisfactory: string;
  }[];
  ateTip?: string;
  isCustomized?: boolean;
}

export interface Mission {
  id: string;
  stage: 'Descobrir' | 'Experimentar' | 'Criar' | 'Compartilhar' | 'Inspirar';
  title: string;
  description: string;
  rewardBadge: string;
  xpPoints: number;
  techTag: string;
  completed: boolean;
  recommendedFor: ProfileType[];
}

export interface TeacherUser {
  name: string;
  email: string;
  role?: 'professor' | 'ate' | 'coordenador';
  unit: string;
  disciplines: string[]; // Disciplinas que leciona
  classes: TeacherClass[]; // Múltiplas turmas cadastradas
  activeClassId?: string; // Turma selecionada atualmente
  avatar: AvatarOption;
  profile: ProfileType;
  secondaryAffinities: { [key in ProfileType]?: number };
  evolutionLevel: string;
  completedMissions: string[];
  appliedProposalsCount: number;
  usedTechnologies: string[];
  onboardingCompleted: boolean;
  atePin?: string; // Chave de segurança personalizada do ATE
}

export interface ExperienceLog {
  id: string;
  date: string;
  proposalTitle: string;
  curricularComponent: string;
  techName: string;
  targetClass: string;
  studentEngagementRating: number; // 1 to 5
  teacherImpression: string;
  nextStepWish: string;
}

export type AteEquipmentStatus = 'disponivel' | 'atencao' | 'manutencao' | 'em_uso';

export interface AteEquipment {
  id: string;
  name: string;
  techId: string;
  category: string;
  totalCount: number;
  availableCount: number;
  inUseCount: number;
  maintenanceCount: number;
  status: AteEquipmentStatus;
  location: string;
  batteryLevel?: number; // 0 to 100
  consumables?: string;
  lastCheckDate: string;
  notes?: string;
}

export type AteScheduleStatus = 'pendente' | 'preparado' | 'em_andamento' | 'concluido' | 'cancelado';

export interface AteClassSchedule {
  id: string;
  teacherName: string;
  teacherEmail?: string;
  discipline: string;
  className: string;
  stage: EducationStage;
  proposalTitle: string;
  techId: string;
  techName: string;
  requestedDate: string;
  requestedPeriod: SchoolPeriod;
  quantityRequested: number;
  status: AteScheduleStatus;
  ateNotes?: string;
  createdAt: string;
}

export interface AteNotice {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'normal' | 'importante' | 'urgente';
  author: string;
}
