import { useState } from 'react';
import { 
  Compass, 
  Rocket, 
  Cpu, 
  Heart, 
  Sparkles, 
  CheckCircle, 
  Award, 
  Star, 
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_MISSIONS, PROFILE_DEFINITIONS } from '../data/mockData';
import { Mission, TeacherUser } from '../types';

interface MissionsAndBadgesProps {
  user: TeacherUser;
  onMissionToggle: (missionId: string) => void;
}

export default function MissionsAndBadges({ user, onMissionToggle }: MissionsAndBadgesProps) {
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const STAGES = [
    { name: 'all', label: 'Todas as Missões', icon: Sparkles },
    { name: 'Descobrir', label: '1. Descobrir', icon: Compass },
    { name: 'Experimentar', label: '2. Experimentar', icon: Rocket },
    { name: 'Criar', label: '3. Criar', icon: Cpu },
    { name: 'Compartilhar', label: '4. Compartilhar', icon: Heart },
    { name: 'Inspirar', label: '5. Inspirar', icon: Star }
  ];

  const filteredMissions = INITIAL_MISSIONS.filter(m => {
    if (selectedStage === 'all') return true;
    return m.stage === selectedStage;
  });

  const totalCompleted = user.completedMissions.length;
  const totalMissions = INITIAL_MISSIONS.length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / totalMissions) * 100));

  return (
    <div className="space-y-6">
      {/* Journey Progress Hero */}
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-red-950 text-white border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Sua Jornada Pessoal • Sem Competição</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Evolução Pedagógica SESI TEC
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Cada passo dado em sala com seus estudantes é uma conquista autêntica. Avance no seu próprio ritmo, do seu jeito.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-xl min-w-[240px] w-full md:w-auto">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-semibold">Missões Realizadas</span>
              <span className="text-amber-400 font-bold">{totalCompleted} de {totalMissions} ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-linear-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>Nível Atual:</span>
              <span className="text-emerald-400 font-semibold">{user.evolutionLevel}</span>
            </div>
          </div>
        </div>

        {/* 5 Stages Pipeline representation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-700/60">
          {[
            { label: 'Descobrir', desc: 'Conhecer novas opções', active: true },
            { label: 'Experimentar', desc: 'Primeiro teste em sala', active: totalCompleted >= 1 },
            { label: 'Criar', desc: 'Produção com os alunos', active: totalCompleted >= 2 },
            { label: 'Compartilhar', desc: 'Troca com colegas', active: totalCompleted >= 3 },
            { label: 'Inspirar', desc: 'Multiplicação de práticas', active: totalCompleted >= 4 }
          ].map((st, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all ${
                st.active 
                  ? 'bg-red-500/10 border-red-500/40 text-white' 
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                Passo 0{idx + 1}
              </div>
              <div className="text-xs font-bold">{st.label}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {STAGES.map(st => {
          const Icon = st.icon;
          const isSelected = selectedStage === st.name;
          return (
            <button
              key={st.name}
              type="button"
              onClick={() => setSelectedStage(st.name)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>

      {/* Missions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map(m => {
          const isDone = user.completedMissions.includes(m.id);
          return (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone 
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isDone 
                      ? 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    Etapa: {m.stage}
                  </span>

                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    +{m.xpPoints} XP
                  </span>
                </div>

                <h3 className={`text-base font-bold mb-1.5 ${isDone ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                  {m.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Selo: {m.rewardBadge}</span>
                </span>

                <button
                  type="button"
                  onClick={() => onMissionToggle(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Concluída' : 'Marcar como Feita'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
