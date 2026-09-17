import { useState } from 'react';
import { 
  X, 
  Plus, 
  GraduationCap, 
  Check, 
  Trash2, 
  Edit3, 
  Clock, 
  BookMarked,
  Sparkles,
  Users
} from 'lucide-react';
import { EDUCATION_STAGES, SCHOOL_PERIODS, CURRICULAR_COMPONENTS } from '../data/mockData';
import { EducationStage, SchoolPeriod, TeacherClass, TeacherUser } from '../types';

interface ClassManagerModalProps {
  user: TeacherUser;
  onUpdateUser: (updated: TeacherUser) => void;
  onClose: () => void;
}

export default function ClassManagerModal({ user, onUpdateUser, onClose }: ClassManagerModalProps) {
  const [classes, setClasses] = useState<TeacherClass[]>(user.classes || []);
  const [activeClassId, setActiveClassId] = useState<string>(user.activeClassId || user.classes?.[0]?.id || '');
  
  // New class form state
  const [isAdding, setIsAdding] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassStage, setNewClassStage] = useState<EducationStage>('fundamental2');
  const [newClassPeriod, setNewClassPeriod] = useState<SchoolPeriod>('vespertino');
  const [newClassDiscipline, setNewClassDiscipline] = useState(user.disciplines?.[0] || 'Matemática');
  const [newClassStudents, setNewClassStudents] = useState<number>(28);

  const getStageInfo = (stageKey: EducationStage) => {
    return EDUCATION_STAGES.find(s => s.id === stageKey) || EDUCATION_STAGES[0];
  };

  const getPeriodInfo = (periodKey: SchoolPeriod) => {
    return SCHOOL_PERIODS.find(p => p.id === periodKey) || SCHOOL_PERIODS[0];
  };

  const handleSelectActiveClass = (id: string) => {
    setActiveClassId(id);
    const updated: TeacherUser = {
      ...user,
      classes: classes,
      activeClassId: id
    };
    onUpdateUser(updated);
  };

  const handleAddNewClass = () => {
    if (!newClassName.trim()) return;

    const newId = `class-${Date.now()}`;
    const newClassItem: TeacherClass = {
      id: newId,
      name: newClassName.trim(),
      stage: newClassStage,
      educationStage: newClassStage,
      period: newClassPeriod,
      discipline: newClassDiscipline,
      studentsCount: newClassStudents || 25,
      studentCount: newClassStudents || 25
    };

    const nextClasses = [...classes, newClassItem];
    setClasses(nextClasses);
    setActiveClassId(newId);

    const updated: TeacherUser = {
      ...user,
      classes: nextClasses,
      activeClassId: newId
    };
    onUpdateUser(updated);

    setNewClassName('');
    setIsAdding(false);
  };

  const handleDeleteClass = (id: string) => {
    if (classes.length <= 1) return;
    const nextClasses = classes.filter(c => c.id !== id);
    const nextActiveId = activeClassId === id ? nextClasses[0]?.id : activeClassId;
    setClasses(nextClasses);
    setActiveClassId(nextActiveId);

    const updated: TeacherUser = {
      ...user,
      classes: nextClasses,
      activeClassId: nextActiveId
    };
    onUpdateUser(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Gerenciar Minhas Turmas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecione a turma ativa ou cadastre novas turmas de qualquer etapa educacional e período.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Classes List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Turmas Cadastradas ({classes.length})
            </span>

            {!isAdding && (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Turma</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classes.map((cls) => {
              const isActive = cls.id === activeClassId;
              const stage = getStageInfo(cls.stage);
              const period = getPeriodInfo(cls.period);

              return (
                <div
                  key={cls.id}
                  className={`p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-red-50/80 dark:bg-red-950/20 border-red-500 ring-2 ring-red-500/20 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {cls.name}
                      </span>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          <span>Ativa</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                        {cls.discipline}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 font-semibold border border-sky-300 dark:border-sky-800/50">
                        {stage.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-semibold border border-amber-300 dark:border-amber-800/50">
                        {period.name}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3 pt-1">
                      <span>{stage.ageGroup}</span>
                      <span>•</span>
                      <span>{period.timeRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200 dark:border-slate-700/60">
                    {!isActive ? (
                      <button
                        type="button"
                        onClick={() => handleSelectActiveClass(cls.id)}
                        className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                      >
                        Definir como Turma Ativa
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Turma em uso no planejador
                      </span>
                    )}

                    {classes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteClass(cls.id)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Remover turma"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Class Form */}
        {isAdding && (
          <div className="bg-slate-50 dark:bg-slate-900 border border-emerald-500/40 rounded-xl p-4 space-y-4">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cadastrar Nova Turma</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nome da Turma
                </label>
                <input
                  type="text"
                  placeholder="Ex: 3º Ano B, Pré II - Manhã, Turma EJA..."
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Disciplina da Turma
                </label>
                <select
                  value={newClassDiscipline}
                  onChange={(e) => setNewClassDiscipline(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  {CURRICULAR_COMPONENTS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Etapa Educacional
                </label>
                <select
                  value={newClassStage}
                  onChange={(e) => setNewClassStage(e.target.value as EducationStage)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  {EDUCATION_STAGES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.ageGroup})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Período da Turma
                </label>
                <select
                  value={newClassPeriod}
                  onChange={(e) => setNewClassPeriod(e.target.value as SchoolPeriod)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  {SCHOOL_PERIODS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.timeRange})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddNewClass}
                disabled={!newClassName.trim()}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-xs cursor-pointer"
              >
                Salvar Turma
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
          >
            Concluir
          </button>
        </div>

      </div>
    </div>
  );
}
