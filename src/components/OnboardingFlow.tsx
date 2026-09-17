import { useState } from 'react';
import { 
  Compass, 
  Hammer, 
  LayoutGrid, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Check, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck,
  Zap,
  Award,
  Plus,
  Trash2,
  GraduationCap,
  Clock,
  BookMarked,
  Sun,
  Sunset,
  Moon,
  Clock3
} from 'lucide-react';
import { 
  AVATAR_OPTIONS, 
  DIAGNOSTIC_QUESTIONS, 
  PROFILE_DEFINITIONS,
  EDUCATION_STAGES,
  SCHOOL_PERIODS,
  CURRICULAR_COMPONENTS
} from '../data/mockData';
import { 
  AvatarOption, 
  ProfileType, 
  TeacherUser, 
  EducationStage, 
  SchoolPeriod, 
  TeacherClass 
} from '../types';

interface OnboardingFlowProps {
  onComplete: (user: TeacherUser) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<'welcome' | 'classes' | 'avatar' | 'quiz' | 'reveal'>('welcome');
  
  // Teacher basic data
  const [teacherName, setTeacherName] = useState('');
  const [teacherUnit, setTeacherUnit] = useState('SESI — Escola da Comunidade');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(['Matemática']);
  const [customDisciplineInput, setCustomDisciplineInput] = useState('');

  // Multiple Classes state
  const [classes, setClasses] = useState<TeacherClass[]>([
    {
      id: 'class-1',
      name: 'Turma 101',
      stage: 'medio',
      period: 'matutino',
      discipline: 'Matemática',
      studentsCount: 30
    }
  ]);

  // Form for adding a new class
  const [newClassName, setNewClassName] = useState('');
  const [newClassStage, setNewClassStage] = useState<EducationStage>('fundamental2');
  const [newClassPeriod, setNewClassPeriod] = useState<SchoolPeriod>('vespertino');
  const [newClassDiscipline, setNewClassDiscipline] = useState('Matemática');
  const [isAddingClass, setIsAddingClass] = useState(false);

  // Avatar & Quiz
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(AVATAR_OPTIONS[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ProfileType[]>([]);
  const [calculatedProfile, setCalculatedProfile] = useState<ProfileType>('explorador');

  const getAvatarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-7 h-7" />;
      case 'Hammer': return <Hammer className="w-7 h-7" />;
      case 'LayoutGrid': return <LayoutGrid className="w-7 h-7" />;
      case 'Search': return <Search className="w-7 h-7" />;
      case 'BookOpen': return <BookOpen className="w-7 h-7" />;
      default: return <Sparkles className="w-7 h-7" />;
    }
  };

  const toggleDiscipline = (disc: string) => {
    if (selectedDisciplines.includes(disc)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter(d => d !== disc));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, disc]);
    }
  };

  const handleAddCustomDiscipline = () => {
    const trimmed = customDisciplineInput.trim();
    if (trimmed && !selectedDisciplines.includes(trimmed)) {
      setSelectedDisciplines([...selectedDisciplines, trimmed]);
      setCustomDisciplineInput('');
    }
  };

  const handleAddNewClass = () => {
    const name = newClassName.trim() || `Turma ${classes.length + 1}`;
    const newClassItem: TeacherClass = {
      id: `class-${Date.now()}`,
      name: name,
      stage: newClassStage,
      educationStage: newClassStage,
      period: newClassPeriod,
      discipline: newClassDiscipline || selectedDisciplines[0] || 'Geral',
      studentsCount: 25,
      studentCount: 25
    };
    setClasses([...classes, newClassItem]);
    setNewClassName('');
    setIsAddingClass(false);
  };

  const handleRemoveClass = (id: string) => {
    if (classes.length > 1) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const handleConfirmClasses = () => {
    if (!teacherName.trim()) {
      setTeacherName('Professor(a)');
    }
    setStep('avatar');
  };

  const handleConfirmAvatar = () => {
    setStep('quiz');
  };

  const handleSelectAnswer = (profile: ProfileType) => {
    const nextAnswers = [...answers, profile];
    setAnswers(nextAnswers);

    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const counts: Record<ProfileType, number> = {
        explorador: 0,
        criador: 0,
        estrategista: 0,
        investigador: 0,
        narrador: 0
      };

      nextAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1;
      });

      let winner: ProfileType = 'explorador';
      let maxCount = -1;
      (Object.keys(counts) as ProfileType[]).forEach((p) => {
        if (counts[p] > maxCount) {
          maxCount = counts[p];
          winner = p;
        }
      });

      setCalculatedProfile(winner);
      setStep('reveal');
    }
  };

  const handleEnterPlatform = () => {
    const newUser: TeacherUser = {
      name: teacherName.trim() || 'Professor(a)',
      email: 'professor@sesi.org.br',
      unit: teacherUnit,
      disciplines: selectedDisciplines.length > 0 ? selectedDisciplines : ['Polivalente'],
      classes: classes,
      activeClassId: classes[0]?.id || 'class-1',
      avatar: selectedAvatar,
      profile: calculatedProfile,
      secondaryAffinities: {
        explorador: 1,
        criador: 1,
        estrategista: 1
      },
      evolutionLevel: PROFILE_DEFINITIONS[calculatedProfile].evolutionTitle,
      completedMissions: [],
      appliedProposalsCount: 0,
      usedTechnologies: [],
      onboardingCompleted: true
    };

    onComplete(newUser);
  };

  const getStageInfo = (stageKey: EducationStage) => {
    return EDUCATION_STAGES.find(s => s.id === stageKey) || EDUCATION_STAGES[0];
  };

  const getPeriodInfo = (periodKey: SchoolPeriod) => {
    return SCHOOL_PERIODS.find(p => p.id === periodKey) || SCHOOL_PERIODS[0];
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
        
        {/* Top Progress bar */}
        <div className="w-full bg-slate-950/60 h-2 flex">
          <div 
            className="h-full bg-linear-to-r from-red-600 via-amber-500 to-emerald-500 transition-all duration-500"
            style={{ 
              width: step === 'welcome' ? '15%' 
                : step === 'classes' ? '35%' 
                : step === 'avatar' ? '55%' 
                : step === 'quiz' ? `${60 + (currentQuestionIndex / DIAGNOSTIC_QUESTIONS.length) * 30}%` 
                : '100%' 
            }}
          />
        </div>

        {/* STEP 1: WELCOME */}
        {step === 'welcome' && (
          <div className="p-6 sm:p-10 md:p-12 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>SESI TEC • Para Todas as Etapas e Idades</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Sua aula, <span className="bg-linear-to-r from-red-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">seu jeito</span>.
            </h1>

            <p className="text-slate-300 max-w-xl text-sm sm:text-base mb-6 font-medium">
              Da <strong>Educação Infantil</strong> ao <strong>Ensino Médio</strong> e <strong>EJA/Educação Profissional</strong>.
              Descubra propostas pedagógicas práticas conectadas às suas disciplinas e turmas.
            </p>

            {/* Core Manifesto */}
            <div className="max-w-2xl bg-slate-900/70 border border-slate-700/60 rounded-xl p-6 mb-8 text-left space-y-4">
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
                  “Continue sendo você. Vamos encontrar a tecnologia que potencializa a sua maneira de ensinar.”
                </p>
              </div>

              <div className="border-t border-slate-800 pt-3 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  “Não queremos ensinar o professor a usar tecnologia. Queremos ajudá-lo a descobrir como a tecnologia cabe na aula que ele já sabe dar.”
                </p>
              </div>
            </div>

            <button
              id="btn-start-journey"
              onClick={() => setStep('classes')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 active:scale-98 transition-all shadow-lg shadow-red-900/30 text-lg cursor-pointer"
            >
              <span>Configurar meu perfil e turmas</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: TEACHER PROFILE & MULTIPLE CLASSES */}
        {step === 'classes' && (
          <div className="p-6 sm:p-10 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-semibold mb-3">
                  <span>Passo 1 de 3 • Identidade, Disciplinas & Turmas</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Conte-nos sobre o seu trabalho no SESI
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Cadastre as disciplinas que você leciona e as turmas que atende (para trazer roteiros sob medida!).
                </p>
              </div>

              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Como você prefere ser chamado(a)?
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Profa. Mariana, Prof. Ricardo..."
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Unidade SESI
                  </label>
                  <input
                    type="text"
                    value={teacherUnit}
                    onChange={(e) => setTeacherUnit(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Disciplines Section */}
              <div className="bg-slate-900/60 border border-slate-700/70 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-amber-400" />
                    <span>Disciplinas que Você Trabalha</span>
                  </label>
                  <span className="text-xs text-slate-400">
                    Selecione uma ou mais
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {CURRICULAR_COMPONENTS.map((disc) => {
                    const isSelected = selectedDisciplines.includes(disc);
                    return (
                      <button
                        key={disc}
                        type="button"
                        onClick={() => toggleDiscipline(disc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-xs border border-red-500'
                            : 'bg-slate-800 text-slate-300 border border-slate-700/60 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{disc}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom discipline input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Adicionar outra disciplina personalizada..."
                    value={customDisciplineInput}
                    onChange={(e) => setCustomDisciplineInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomDiscipline())}
                    className="flex-1 bg-slate-950/70 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomDiscipline}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>

              {/* Classes Section (Support Multiple Classes) */}
              <div className="bg-slate-900/60 border border-slate-700/70 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>Suas Turmas Cadastradas ({classes.length})</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Você pode cadastrar turmas de diferentes etapas e períodos.
                    </p>
                  </div>

                  {!isAddingClass && (
                    <button
                      type="button"
                      onClick={() => setIsAddingClass(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar Turma</span>
                    </button>
                  )}
                </div>

                {/* List of current classes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {classes.map((cls) => {
                    const stage = getStageInfo(cls.stage);
                    const period = getPeriodInfo(cls.period);
                    return (
                      <div 
                        key={cls.id}
                        className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 flex items-start justify-between gap-3 relative group"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm truncate">
                              {cls.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-700 text-slate-200">
                              {cls.discipline}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/30">
                              {stage.name}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {period.name}
                            </span>
                          </div>
                        </div>

                        {classes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveClass(cls.id)}
                            title="Remover turma"
                            className="text-slate-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Form to add another class */}
                {isAddingClass && (
                  <div className="bg-slate-950/80 border border-emerald-500/40 rounded-xl p-4 space-y-4 animate-fade-in">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Nova Turma
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Nome da Turma
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: 2º Ano B, Grupo 4 Tarde..."
                          value={newClassName}
                          onChange={(e) => setNewClassName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Disciplina Nesta Turma
                        </label>
                        <select
                          value={newClassDiscipline}
                          onChange={(e) => setNewClassDiscipline(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          {selectedDisciplines.map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Etapa da Turma
                        </label>
                        <select
                          value={newClassStage}
                          onChange={(e) => setNewClassStage(e.target.value as EducationStage)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          {EDUCATION_STAGES.map(st => (
                            <option key={st.id} value={st.id}>
                              {st.name} ({st.ageGroup})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Período da Turma
                        </label>
                        <select
                          value={newClassPeriod}
                          onChange={(e) => setNewClassPeriod(e.target.value as SchoolPeriod)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          {SCHOOL_PERIODS.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.timeRange})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingClass(false)}
                        className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleAddNewClass}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                      >
                        Salvar Turma
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('welcome')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Voltar
                </button>

                <button
                  id="btn-confirm-classes"
                  type="button"
                  onClick={handleConfirmClasses}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-md text-sm cursor-pointer"
                >
                  <span>Continuar para Avatar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: AVATAR SELECTION */}
        {step === 'avatar' && (
          <div className="p-6 sm:p-10 md:p-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-semibold mb-3">
                  <span>Passo 2 de 3 • Escolha do Personagem</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Escolha seu Personagem de Jornada
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Selecione o arquétipo visual de personagem que melhor representa seu estilo pedagógico.
                </p>
              </div>

              {/* Avatar choices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {AVATAR_OPTIONS.map((avatar) => {
                  const isSelected = selectedAvatar.id === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start text-center sm:text-left ${
                        isSelected 
                          ? 'bg-red-500/10 border-red-500 ring-2 ring-red-500/30 shadow-md' 
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className={`p-3 rounded-full mb-3 ${
                        isSelected ? 'bg-red-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {getAvatarIcon(avatar.iconName)}
                      </div>
                      <h4 className="font-bold text-white text-sm">{avatar.name}</h4>
                      <span className="text-xs text-amber-400 font-medium mb-1">{avatar.role}</span>
                      <p className="text-xs text-slate-400 line-clamp-2">{avatar.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('classes')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAvatar}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-md text-sm cursor-pointer"
                >
                  <span>Ir para o Diagnóstico Rápido</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DIAGNOSTIC QUIZ */}
        {step === 'quiz' && (
          <div className="p-6 sm:p-10 md:p-12">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-semibold">
                  <span>Diagnóstico Acolhedor • Pergunta {currentQuestionIndex + 1} de {DIAGNOSTIC_QUESTIONS.length}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {Math.round(((currentQuestionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}% concluído
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].question}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].subtitle}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {DIAGNOSTIC_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.profile)}
                    className="w-full p-4 rounded-xl border border-slate-700/70 bg-slate-900/50 hover:bg-slate-700/40 hover:border-red-500/50 text-left transition-all flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white">
                        {opt.text}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {opt.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-red-400 transition-colors shrink-0 self-center" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REVEAL PROFILE */}
        {step === 'reveal' && (
          <div className="p-6 sm:p-10 md:p-12 text-center flex flex-col items-center">
            <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Perfil Pedagógico Identificado
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Seu jeito de ensinar tem muito de{' '}
              <span className="text-amber-400">
                {PROFILE_DEFINITIONS[calculatedProfile].title}!
              </span>
            </h2>

            <p className="text-slate-300 italic text-base sm:text-lg mb-6 max-w-xl">
              “{PROFILE_DEFINITIONS[calculatedProfile].motto}”
            </p>

            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 max-w-xl text-left mb-8 shadow-inner space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>O que preparamos para você:</span>
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {PROFILE_DEFINITIONS[calculatedProfile].welcomeMessage}
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Identidade da Interface:</span>
                  <span className="text-slate-200 font-medium">Estilo {PROFILE_DEFINITIONS[calculatedProfile].layoutStyle.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Turmas Prontas:</span>
                  <span className="text-emerald-400 font-medium">{classes.length} turma(s) vinculadas</span>
                </div>
              </div>
            </div>

            <button
              id="btn-enter-platform"
              onClick={handleEnterPlatform}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 active:scale-98 transition-all shadow-lg shadow-red-900/40 text-base sm:text-lg cursor-pointer"
            >
              <span>Entrar no Meu SESI TEC Personalizado</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
