import { useState } from 'react';
import { 
  Compass, 
  Hammer, 
  LayoutGrid, 
  Search, 
  BookOpen, 
  Map, 
  Wrench, 
  Calendar, 
  Microscope, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Target, 
  Award, 
  Layers, 
  FolderPlus, 
  History,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  BookMarked,
  GraduationCap,
  Plus,
  Check,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';
import { PROFILE_DEFINITIONS, EDUCATION_STAGES, SCHOOL_PERIODS, TECHNOLOGIES } from '../data/mockData';
import { CurricularProposal, ExperienceLog, ProfileType, TeacherUser } from '../types';
import { SESI_OFFICIAL_PROPOSALS } from '../data/sesiProposals';
import LessonPlanner from './LessonPlanner';
import TechCatalog from './TechCatalog';
import MissionsAndBadges from './MissionsAndBadges';
import ClassManagerModal from './ClassManagerModal';
import ProposalDetailModal from './ProposalDetailModal';
import AteAdminPanel from './AteAdminPanel';
import AteAuthModal, { STORAGE_KEY_ATE_AUTH } from './AteAuthModal';

interface DashboardProps {
  user: TeacherUser;
  onUpdateUser: (updated: TeacherUser) => void;
  onOpenApplyModal: (proposal: CurricularProposal) => void;
  logs: ExperienceLog[];
}

export default function Dashboard({ 
  user, 
  onUpdateUser, 
  onOpenApplyModal, 
  logs 
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'planner' | 'catalog' | 'missions' | 'logs' | 'ate'>('home');
  const [selectedTechForLesson, setSelectedTechForLesson] = useState<string | null>(null);
  const [isClassManagerOpen, setIsClassManagerOpen] = useState(false);
  const [activeProposalModal, setActiveProposalModal] = useState<CurricularProposal | null>(null);
  const [isAteAuthModalOpen, setIsAteAuthModalOpen] = useState(false);
  const [isAteAuthorized, setIsAteAuthorized] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ATE_AUTH) === 'true' || user.role === 'ate';
    } catch {
      return false;
    }
  });

  const activeClass = user.classes?.find(c => c.id === user.activeClassId) || user.classes?.[0];
  const activeStageInfo = activeClass ? EDUCATION_STAGES.find(s => s.id === activeClass.stage) : null;
  const activePeriodInfo = activeClass ? SCHOOL_PERIODS.find(p => p.id === activeClass.period) : null;

  const profileDef = PROFILE_DEFINITIONS[user.profile] || PROFILE_DEFINITIONS.explorador;

  // Allows instant live simulation of different profiles to demonstrate the responsive UX!
  const handleSwitchProfileDemo = (newProfile: ProfileType) => {
    onUpdateUser({
      ...user,
      profile: newProfile,
      evolutionLevel: PROFILE_DEFINITIONS[newProfile].evolutionTitle
    });
  };

  const handleSelectTechFromCatalog = (techId: string) => {
    setSelectedTechForLesson(techId);
    setActiveTab('planner');
  };

  const handleAteLock = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_ATE_AUTH);
    } catch (e) {
      console.error(e);
    }
    setIsAteAuthorized(false);
    if (user.role === 'ate') {
      onUpdateUser({ ...user, role: 'professor' });
    }
    setActiveTab('home');
  };

  // Archetype Theme Accent Styles
  const getThemeBadge = () => {
    switch (user.profile) {
      case 'explorador':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
          btn: 'bg-emerald-600 hover:bg-emerald-500',
          ring: 'focus:ring-emerald-500',
          borderAccent: 'border-emerald-500/40'
        };
      case 'criador':
        return {
          bg: 'bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300',
          btn: 'bg-sky-600 hover:bg-sky-500',
          ring: 'focus:ring-sky-500',
          borderAccent: 'border-sky-500/40'
        };
      case 'estrategista':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300',
          btn: 'bg-amber-600 hover:bg-amber-500',
          ring: 'focus:ring-amber-500',
          borderAccent: 'border-amber-500/40'
        };
      case 'investigador':
        return {
          bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300',
          btn: 'bg-indigo-600 hover:bg-indigo-500',
          ring: 'focus:ring-indigo-500',
          borderAccent: 'border-indigo-500/40'
        };
      case 'narrador':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300',
          btn: 'bg-rose-600 hover:bg-rose-500',
          ring: 'focus:ring-rose-500',
          borderAccent: 'border-rose-500/40'
        };
    }
  };

  const theme = getThemeBadge();

  const getCharacterIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Hammer': return <Hammer className="w-6 h-6" />;
      case 'LayoutGrid': return <LayoutGrid className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const getProposalCardImage = (prop: CurricularProposal) => {
    if (prop.imageUrl) return prop.imageUrl;
    const matched = TECHNOLOGIES.find(
      t => t.id === prop.recommendedTechId || 
           (t.name && prop.techName && (
             t.name.toLowerCase().includes(prop.techName.toLowerCase()) ||
             prop.techName.toLowerCase().includes(t.name.toLowerCase())
           ))
    );
    return matched?.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div className="space-y-6">
      {/* Top Profile & Identity Bar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Character Avatar and Teacher Name */}
          <div className="flex items-center gap-3.5">
            <div 
              className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0 ${theme.btn}`}
              title={`Personagem: ${user.avatar?.name || 'Personagem'}`}
            >
              {getCharacterIcon(user.avatar?.iconName)}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${theme.bg}`}>
                  {profileDef.title}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/70 border border-slate-200/60 dark:border-slate-600 flex items-center gap-1">
                  <span>🎭 {user.avatar?.name || 'Personagem'}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {user.unit}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic">
                “{profileDef.motto}”
              </p>
            </div>
          </div>

          {/* Quick Profile Morph Switcher and ATE Area Button */}
          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1.5 rounded-xl">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-2" />
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Modo Visual:
              </span>
              <select
                value={user.profile}
                onChange={(e) => handleSwitchProfileDemo(e.target.value as ProfileType)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 border-0 focus:ring-0 cursor-pointer pr-3"
              >
                <option value="explorador">🧭 Explorador</option>
                <option value="criador">🔨 Criador Maker</option>
                <option value="estrategista">📐 Estrategista</option>
                <option value="investigador">🔬 Investigador</option>
                <option value="narrador">✨ Narrador</option>
              </select>
            </div>

            {/* ATE Admin Shortcut Badge / Trigger */}
            {isAteAuthorized ? (
              <button
                type="button"
                onClick={() => setActiveTab('ate')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                title="Acessar painel do ATE"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Painel ATE Ativo</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAteAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                title="Acesso restrito ao Assistente de Tecnologia Educacional"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Acesso ATE (Adm)</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 scrollbar-none">
          {[
            { id: 'home', label: 'Meu Hub Personalizado', icon: profileDef.layoutStyle === 'map' ? Map : profileDef.layoutStyle === 'workshop' ? Wrench : LayoutGrid },
            { id: 'planner', label: 'Criar / Planejar Aula', icon: Target },
            { id: 'catalog', label: 'Tecnologias da Unidade', icon: Layers },
            { id: 'missions', label: 'Jornada & Selos', icon: Award },
            { id: 'logs', label: `Aulas Registradas (${logs.length})`, icon: History },
            { 
              id: 'ate', 
              label: 'Área do ATE (Adm)', 
              icon: ShieldCheck, 
              isAteTab: true 
            }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'ate') {
                    if (isAteAuthorized || user.role === 'ate') {
                      setActiveTab('ate');
                    } else {
                      setIsAteAuthModalOpen(true);
                    }
                  } else {
                    setActiveTab(tab.id as any);
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? `${theme.btn} text-white shadow-xs`
                    : tab.id === 'ate'
                      ? isAteAuthorized
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60'
                        : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'ate' && !isAteAuthorized && (
                  <Lock className="w-3 h-3 text-amber-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Class & Disciplines Selector Bar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Active Class Display */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Turma Ativa:
                </span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {activeClass?.name || 'Turma Principal'}
                </span>
                {activeStageInfo && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
                    {activeStageInfo.name}
                  </span>
                )}
                {activePeriodInfo && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40">
                    {activePeriodInfo.name}
                  </span>
                )}
                {activeClass?.discipline && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {activeClass.discipline}
                  </span>
                )}
              </div>

              {/* Disciplines of the teacher */}
              {user.disciplines && user.disciplines.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                  <span className="font-medium">Suas disciplinas:</span>
                  {user.disciplines.map(d => (
                    <span key={d} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-[11px]">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick switcher buttons & Manage button */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Mudar Turma:
            </span>
            {user.classes?.map(cls => {
              const isSelected = cls.id === (user.activeClassId || user.classes[0]?.id);
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => onUpdateUser({ ...user, activeClassId: cls.id })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cls.name}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsClassManagerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs ml-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Gerenciar Turmas</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB CONTENT: PERSONALIZED HOME HUB */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          {/* ARCHETYPE ADAPTIVE GREETING HERO */}
          {user.profile === 'explorador' && (
            <div className="bg-linear-to-r from-emerald-900/90 via-teal-900/80 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-emerald-700/50 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Modo Expedição & Descoberta Ativado</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    Olá, {user.name}! Que novos caminhos vamos abrir hoje?
                  </h2>
                  <p className="text-emerald-100 text-sm max-w-xl leading-relaxed">
                    Separamos rotas e estações com tablets e óculos VR para provocar a curiosidade autêntica dos estudantes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('planner')}
                  className="px-5 py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md text-sm shrink-0"
                >
                  <span>Explorar Nova Trilha de Aula</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Explorer visual milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-emerald-800/60">
                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-0.5">Estação 01</span>
                  <span className="text-xs font-semibold text-white">Tablets em Rotação Investigativa</span>
                </div>
                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-0.5">Estação 02</span>
                  <span className="text-xs font-semibold text-white">VR: Viagem Espacial e Celular 3D</span>
                </div>
                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-0.5">Estação 03</span>
                  <span className="text-xs font-semibold text-white">Mural Colaborativo de Síntese</span>
                </div>
              </div>
            </div>
          )}

          {user.profile === 'criador' && (
            <div className="bg-linear-to-r from-sky-900/90 via-cyan-900/80 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-sky-700/50 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold">
                    <Hammer className="w-3.5 h-3.5" />
                    <span>Modo Oficina Maker & Prototipagem</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    Bancada pronta, {user.name}! O que vamos construir?
                  </h2>
                  <p className="text-sky-100 text-sm max-w-xl leading-relaxed">
                    Kits de robótica LEGO SPIKE e braço robótico preparados na sua unidade para transformar teorias em engenharia concreta.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('planner')}
                  className="px-5 py-3 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md text-sm shrink-0"
                >
                  <span>Projetar Atividade de Montagem</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-sky-800/60">
                <div className="bg-sky-950/40 p-3 rounded-xl border border-sky-800/40">
                  <span className="text-[11px] font-bold text-sky-400 block mb-0.5">Ferramenta 01</span>
                  <span className="text-xs font-semibold text-white">LEGO SPIKE: Sensores e Motores</span>
                </div>
                <div className="bg-sky-950/40 p-3 rounded-xl border border-sky-800/40">
                  <span className="text-[11px] font-bold text-sky-400 block mb-0.5">Ferramenta 02</span>
                  <span className="text-xs font-semibold text-white">Braço Robótico Indústria 4.0</span>
                </div>
                <div className="bg-sky-950/40 p-3 rounded-xl border border-sky-800/40">
                  <span className="text-[11px] font-bold text-sky-400 block mb-0.5">Ferramenta 03</span>
                  <span className="text-xs font-semibold text-white">Chromebooks com Blocos de Código</span>
                </div>
              </div>
            </div>
          )}

          {user.profile === 'estrategista' && (
            <div className="bg-linear-to-r from-amber-900/90 via-orange-900/80 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-amber-700/50 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Painel Executivo & Planejamento Sequencial</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    Roteiro estruturado, {user.name}!
                  </h2>
                  <p className="text-amber-100 text-sm max-w-xl leading-relaxed">
                    Sequências didáticas cronometradas e alinhadas à BNCC para maximizar cada minuto em sala de aula.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('planner')}
                  className="px-5 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md text-sm shrink-0"
                >
                  <span>Estruturar Sequência de Aulas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-amber-800/60">
                <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
                  <span className="text-[11px] font-bold text-amber-400 block mb-0.5">Etapa 01</span>
                  <span className="text-xs font-semibold text-white">Diagnóstico Prévio (15 min)</span>
                </div>
                <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
                  <span className="text-[11px] font-bold text-amber-400 block mb-0.5">Etapa 02</span>
                  <span className="text-xs font-semibold text-white">Atividade Guiada com Rubrica (45 min)</span>
                </div>
                <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
                  <span className="text-[11px] font-bold text-amber-400 block mb-0.5">Etapa 03</span>
                  <span className="text-xs font-semibold text-white">Avaliação Formativa e Síntese (30 min)</span>
                </div>
              </div>
            </div>
          )}

          {user.profile === 'investigador' && (
            <div className="bg-linear-to-r from-indigo-900/90 via-purple-900/80 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-indigo-700/50 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Modo Laboratório de Evidências & Hipóteses</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    Pronto para a pesquisa, {user.name}?
                  </h2>
                  <p className="text-indigo-100 text-sm max-w-xl leading-relaxed">
                    Simuladores científicos e sensores digitais para testar hipóteses com dados reais em sala de aula.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('planner')}
                  className="px-5 py-3 rounded-xl font-bold bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md text-sm shrink-0"
                >
                  <span>Lançar Problema Investigativo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-indigo-800/60">
                <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40">
                  <span className="text-[11px] font-bold text-indigo-400 block mb-0.5">Pista 01</span>
                  <span className="text-xs font-semibold text-white">Simulador Digital de Fenômenos</span>
                </div>
                <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40">
                  <span className="text-[11px] font-bold text-indigo-400 block mb-0.5">Pista 02</span>
                  <span className="text-xs font-semibold text-white">Coleta e Comparação de Dados</span>
                </div>
                <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40">
                  <span className="text-[11px] font-bold text-indigo-400 block mb-0.5">Pista 03</span>
                  <span className="text-xs font-semibold text-white">Validação das Hipóteses da Turma</span>
                </div>
              </div>
            </div>
          )}

          {user.profile === 'narrador' && (
            <div className="bg-linear-to-r from-rose-900/90 via-pink-900/80 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-rose-700/50 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Modo Storytelling & Comunicação Humana</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    Que história vamos contar juntos, {user.name}?
                  </h2>
                  <p className="text-rose-100 text-sm max-w-xl leading-relaxed">
                    Kits de podcast, murais visuais e recursos audiovisuais para dar voz e protagonismo aos estudantes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('planner')}
                  className="px-5 py-3 rounded-xl font-bold bg-rose-500 hover:bg-rose-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md text-sm shrink-0"
                >
                  <span>Criar Aula Narrativa com Podcast</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-rose-800/60">
                <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-800/40">
                  <span className="text-[11px] font-bold text-rose-400 block mb-0.5">Capítulo 01</span>
                  <span className="text-xs font-semibold text-white">Roteiro e Pesquisa com Empatia</span>
                </div>
                <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-800/40">
                  <span className="text-[11px] font-bold text-rose-400 block mb-0.5">Capítulo 02</span>
                  <span className="text-xs font-semibold text-white">Gravação de Podcast em Estúdio</span>
                </div>
                <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-800/40">
                  <span className="text-[11px] font-bold text-rose-400 block mb-0.5">Capítulo 03</span>
                  <span className="text-xs font-semibold text-white">Audição Coletiva e Debate Crítico</span>
                </div>
              </div>
            </div>
          )}

          {/* OFFICIAL SESI PROPOSALS WITH IMAGES & DIRECT ON-SCREEN ACCESS */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                    Propostas Oficiais SESI
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Direto na Tela (Sem PDF)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                  Propostas Pedagógicas por Equipamento da Unidade
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Clique em qualquer proposta para ver o roteiro passo a passo, habilidades BNCC e rubricas na sua tela.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/60 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Ver Todas no Catálogo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid of proposal cards with visual photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SESI_OFFICIAL_PROPOSALS.slice(0, 6).map((proposal) => (
                <div
                  key={proposal.id}
                  className="group bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Photo Banner */}
                    <div 
                      className="relative h-36 w-full bg-slate-900 overflow-hidden cursor-pointer"
                      onClick={() => setActiveProposalModal(proposal)}
                    >
                      {(() => {
                        const img = getProposalCardImage(proposal);
                        return (
                          <img
                            src={img}
                            alt={proposal.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        );
                      })()}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-xs">
                          {proposal.curricularComponent}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white">
                          {proposal.targetYear}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-[11px] font-medium text-slate-300 truncate block">
                          Equipamento: {proposal.techName}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 
                        className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
                        onClick={() => setActiveProposalModal(proposal)}
                      >
                        {proposal.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {proposal.pedagogicalIntentionality || proposal.objective}
                      </p>

                      {proposal.bnccSkills && proposal.bnccSkills.length > 0 && (
                        <div className="text-[10px] font-bold text-red-600 dark:text-red-400 truncate">
                          BNCC: {proposal.bnccSkills[0].split(')')[0] + ')'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProposalModal(proposal)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ver na Tela</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenApplyModal(proposal)}
                      className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                      title="Registrar aplicação com a turma"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* THREE ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Explore Missions */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 w-fit mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  1. Missões da Sua Jornada
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Desafios simples de 1 aula para você experimentar no seu ritmo, sem pressão e com reconhecimento constante.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('missions')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ver Minhas Conquistas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Tech Available */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 w-fit mb-3">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  2. Tecnologias da Sua Unidade
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Veja quais equipamentos estão disponíveis no SESI (Tablets, LEGO SPIKE, Braço Robótico, VR) com dicas do ATE.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Abrir Inventário do SESI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Custom Lesson Planner */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 w-fit mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  3. Criar Minha Aula Personalizada
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Selecione sua disciplina, conteúdo e tempo. Receba um roteiro passo a passo pronto para aplicar ou adaptar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Criar Aula Agora</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RECENT ACTIVITY & MANIFESTO FOOTER */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-600 text-white font-bold text-xs">
                SESI
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Apoio Técnico Pedagógico (ATE) Sempre Disponível
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tem alguma dúvida sobre baterias, conexões ou reservas de equipamentos? O ATE é seu mentor presencial.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('planner')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 shrink-0 cursor-pointer"
            >
              Consultar Propostas em PDF Digitalizadas
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PLANNER */}
      {activeTab === 'planner' && (
        <LessonPlanner 
          user={user}
          onUpdateUser={onUpdateUser}
          onApplyProposal={onOpenApplyModal}
          onOpenClassManager={() => setIsClassManagerOpen(true)}
          initialTechId={selectedTechForLesson}
        />
      )}

      {/* TAB CONTENT: CATALOG */}
      {activeTab === 'catalog' && (
        <TechCatalog 
          onSelectTechForLesson={handleSelectTechFromCatalog}
          userClasses={user.classes}
          activeClassId={user.activeClassId}
          onApplyProposal={onOpenApplyModal}
        />
      )}

      {/* TAB CONTENT: MISSIONS */}
      {activeTab === 'missions' && (
        <MissionsAndBadges 
          user={user} 
          onMissionToggle={(missionId) => {
            const isCompleted = user.completedMissions.includes(missionId);
            const nextCompleted = isCompleted
              ? user.completedMissions.filter(id => id !== missionId)
              : [...user.completedMissions, missionId];

            onUpdateUser({
              ...user,
              completedMissions: nextCompleted
            });
          }} 
        />
      )}

      {/* TAB CONTENT: LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Histórico de Experiências Aplicadas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Seus registros de sala de aula e reflexões pedagógicas.
            </p>
          </div>

          {logs.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 text-center space-y-3">
              <BookMarked className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                Nenhuma aula registrada ainda
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Ao aplicar ou planejar sua próxima aula no botão "Utilizei / Vou Aplicar Esta Aula!", o registro aparecerá aqui.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Ir para o Planejador de Aulas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map(log => (
                <div 
                  key={log.id} 
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-red-600 dark:text-red-400">
                        {log.curricularComponent}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {log.targetClass}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400">{log.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {log.proposalTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Tecnologia: <strong className="text-slate-700 dark:text-slate-200">{log.techName}</strong>
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl mt-3 text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60">
                      <strong>Reflexão do Professor:</strong> “{log.teacherImpression}”
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                      Engajamento: {log.studentEngagementRating}/5 ★
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ATE ADMIN & MONITORING PANEL */}
      {activeTab === 'ate' && (
        <AteAdminPanel
          logs={logs}
          onOpenProposalModal={(p) => setActiveProposalModal(p)}
          onSwitchToTeacherMode={() => setActiveTab('home')}
          onLockAte={handleAteLock}
        />
      )}

      {/* Class Manager Modal */}
      {isClassManagerOpen && (
        <ClassManagerModal
          user={user}
          onUpdateUser={onUpdateUser}
          onClose={() => setIsClassManagerOpen(false)}
        />
      )}

      {/* On-Screen Proposal Detail Modal (No PDF!) */}
      {activeProposalModal && (
        <ProposalDetailModal
          proposal={activeProposalModal}
          userClasses={user.classes}
          activeClassId={user.activeClassId}
          onClose={() => setActiveProposalModal(null)}
          onApplyProposal={(p) => {
            setActiveProposalModal(null);
            onOpenApplyModal(p);
          }}
        />
      )}

      {/* ATE Authentication & Role Gatekeeper Modal */}
      <AteAuthModal
        user={user}
        isOpen={isAteAuthModalOpen}
        onClose={() => setIsAteAuthModalOpen(false)}
        onAuthenticated={() => {
          setIsAteAuthorized(true);
          setActiveTab('ate');
        }}
        onUpdateUserRole={(newRole) => {
          onUpdateUser({ ...user, role: newRole });
        }}
      />
    </div>
  );
}
