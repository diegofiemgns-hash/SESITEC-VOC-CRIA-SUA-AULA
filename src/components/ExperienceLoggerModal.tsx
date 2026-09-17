import { useState, FormEvent } from 'react';
import { CheckCircle2, Star, Sparkles, X, HeartHandshake, GraduationCap } from 'lucide-react';
import { CurricularProposal, ExperienceLog, TeacherClass } from '../types';
import { EDUCATION_STAGES, SCHOOL_PERIODS } from '../data/mockData';

interface ExperienceLoggerModalProps {
  proposal: CurricularProposal | null;
  onClose: () => void;
  onSaveLog: (log: ExperienceLog) => void;
  userClasses?: TeacherClass[];
  activeClassId?: string;
}

export default function ExperienceLoggerModal({ 
  proposal, 
  onClose, 
  onSaveLog,
  userClasses = [],
  activeClassId
}: ExperienceLoggerModalProps) {
  const activeClass = userClasses.find(c => c.id === activeClassId) || userClasses[0];
  
  const defaultClassName = activeClass 
    ? `${activeClass.name} — ${EDUCATION_STAGES.find(s => s.id === activeClass.stage)?.name || ''} (${SCHOOL_PERIODS.find(p => p.id === activeClass.period)?.name || ''})`
    : 'Turma Geral';

  const [targetClass, setTargetClass] = useState(defaultClassName);
  const [customClassInput, setCustomClassInput] = useState('');
  const [isCustomClass, setIsCustomClass] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [impression, setImpression] = useState('');
  const [nextStep, setNextStep] = useState('');

  if (!proposal) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalClass = isCustomClass ? (customClassInput || 'Turma Personalizada') : targetClass;

    const newLog: ExperienceLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      proposalTitle: proposal.title,
      curricularComponent: proposal.curricularComponent,
      techName: proposal.techName,
      targetClass: finalClass,
      studentEngagementRating: rating,
      teacherImpression: impression || 'Os estudantes demonstraram bastante curiosidade e participação ativa.',
      nextStepWish: nextStep || 'Experimentar mais tempo de autonomia dos alunos na próxima aula.'
    };
    onSaveLog(newLog);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Registrar Experiência Pedagógica
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seu registro valoriza sua prática e inspira os colegas da unidade.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected proposal summary */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-red-600 dark:text-red-400">
              {proposal.curricularComponent} • {proposal.techName}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {proposal.targetYear}
            </span>
          </div>
          <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
            {proposal.title}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Target class from teacher's registered classes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Turma Onde Aplicou (ou Aplicará)</span>
            </label>
            
            <select
              value={isCustomClass ? '__custom__' : targetClass}
              onChange={(e) => {
                if (e.target.value === '__custom__') {
                  setIsCustomClass(true);
                } else {
                  setIsCustomClass(false);
                  setTargetClass(e.target.value);
                }
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-medium"
            >
              {userClasses.length > 0 ? (
                userClasses.map(cls => {
                  const stage = EDUCATION_STAGES.find(s => s.id === cls.stage)?.name || cls.stage;
                  const period = SCHOOL_PERIODS.find(p => p.id === cls.period)?.name || cls.period;
                  const val = `${cls.name} — ${stage} (${period})`;
                  return (
                    <option key={cls.id} value={val}>
                      {cls.name} — {stage} ({period}) • {cls.discipline}
                    </option>
                  );
                })
              ) : (
                <>
                  <option value="Turma 101 — Ensino Médio (Matutino)">Turma 101 — Ensino Médio (Matutino)</option>
                  <option value="Grupo 5 — Ed. Infantil (Vespertino)">Grupo 5 — Ed. Infantil (Vespertino)</option>
                  <option value="Turma EJA — Módulo 1 (Noturno)">Turma EJA — Módulo 1 (Noturno)</option>
                </>
              )}
              <option value="__custom__">➕ Outra turma não cadastrada...</option>
            </select>

            {isCustomClass && (
              <input
                type="text"
                placeholder="Digite o nome e etapa da turma..."
                value={customClassInput}
                onChange={(e) => setCustomClassInput(e.target.value)}
                className="mt-2 w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Engajamento e Reação da Turma
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                </button>
              ))}
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-medium">
                {rating === 5 ? 'Experiência fantástica' : rating >= 4 ? 'Muito bom engajamento' : 'Boa participação'}
              </span>
            </div>
          </div>

          {/* Teacher Impression */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              O Que Deu Mais Certo? (Breve anotação reflexiva)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: As crianças/estudantes adoraram testar a tecnologia em grupos e colaboraram bastante..."
              value={impression}
              onChange={(e) => setImpression(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Next Step Wish */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              O Que Você Gostaria de Tentar na Próxima Vez?
            </label>
            <input
              type="text"
              placeholder="Ex: Deixar mais tempo de autonomia aos estudantes ou registrar em vídeo..."
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-500 active:scale-98 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Concluir Registro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
