import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Heart, 
  HelpCircle, 
  GraduationCap, 
  ExternalLink,
  Layers,
  Award,
  ChevronDown
} from 'lucide-react';
import { TeacherUser, CurricularProposal, ExperienceLog } from './types';
import OnboardingFlow from './components/OnboardingFlow';
import Dashboard from './components/Dashboard';
import ExperienceLoggerModal from './components/ExperienceLoggerModal';

const STORAGE_KEY_USER = 'sesi_tec_user';
const STORAGE_KEY_LOGS = 'sesi_tec_logs';

export default function App() {
  const [user, setUser] = useState<TeacherUser | null>(null);
  const [logs, setLogs] = useState<ExperienceLog[]>([]);
  const [isLoggingModalOpen, setIsLoggingModalOpen] = useState(false);
  const [proposalToLog, setProposalToLog] = useState<CurricularProposal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Ensure backward compatibility if stored user has no classes or disciplines
        if (!parsed.classes || parsed.classes.length === 0) {
          parsed.classes = [
            {
              id: 'class-1',
              name: 'Turma 101',
              stage: 'medio',
              period: 'matutino',
              discipline: parsed.disciplines?.[0] || 'Matemática',
              studentsCount: 30
            }
          ];
        }
        if (!parsed.disciplines || parsed.disciplines.length === 0) {
          parsed.disciplines = ['Matemática'];
        }
        if (!parsed.activeClassId) {
          parsed.activeClassId = parsed.classes[0].id;
        }

        // Migrate avatar from personal name to generic character if needed
        if (parsed.avatar) {
          if (!parsed.avatar.name || parsed.avatar.name.includes('Sofia')) {
            parsed.avatar.name = 'Personagem Explorador';
            parsed.avatar.role = 'Arquétipo de Descobertas';
          } else if (parsed.avatar.name.includes('Marcos')) {
            parsed.avatar.name = 'Personagem Criador Maker';
            parsed.avatar.role = 'Arquétipo Mão na Massa';
          } else if (parsed.avatar.name.includes('Helena')) {
            parsed.avatar.name = 'Personagem Estrategista';
            parsed.avatar.role = 'Arquétipo de Planejamento';
          } else if (parsed.avatar.name.includes('André') || parsed.avatar.name.includes('Andre')) {
            parsed.avatar.name = 'Personagem Investigador';
            parsed.avatar.role = 'Arquétipo Científico';
          } else if (parsed.avatar.name.includes('Beatriz')) {
            parsed.avatar.name = 'Personagem Comunicador';
            parsed.avatar.role = 'Arquétipo Narrativo & Mídias';
          }
        }

        setUser(parsed);
      }
      const storedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (e) {
      console.error('Erro ao recuperar dados locais:', e);
    }
  }, []);

  const handleCompleteOnboarding = (newUser: TeacherUser) => {
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    } catch (e) {
      console.error('Erro ao salvar usuário:', e);
    }
    showToast(`Bem-vindo(a) ao SESI TEC, ${newUser.name}! Seu perfil foi criado.`);
  };

  const handleUpdateUser = (updatedUser: TeacherUser) => {
    setUser(updatedUser);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Erro ao atualizar usuário:', e);
    }
  };

  const handleResetJourney = () => {
    if (window.confirm('Deseja reiniciar a jornada e responder ao diagnóstico novamente?')) {
      localStorage.removeItem(STORAGE_KEY_USER);
      setUser(null);
    }
  };

  const handleOpenApplyModal = (proposal: CurricularProposal) => {
    setProposalToLog(proposal);
    setIsLoggingModalOpen(true);
  };

  const handleSaveLog = (newLog: ExperienceLog) => {
    const nextLogs = [newLog, ...logs];
    setLogs(nextLogs);
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(nextLogs));
    } catch (e) {
      console.error('Erro ao salvar registro de aula:', e);
    }

    if (user) {
      const updatedUser: TeacherUser = {
        ...user,
        appliedProposalsCount: (user.appliedProposalsCount || 0) + 1,
        usedTechnologies: Array.from(new Set([...user.usedTechnologies, newLog.techName]))
      };
      handleUpdateUser(updatedUser);
    }

    setIsLoggingModalOpen(false);
    setProposalToLog(null);
    showToast('Parabéns! Aula registrada e progresso atualizado com sucesso!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo SESI TEC */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-md shadow-red-600/20">
              SESI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                  SESI TEC
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400">
                  Todas as Etapas • Infantil ao Médio & EJA
                </span>
              </div>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-none">
                Sua aula, seu jeito
              </span>
            </div>
          </div>

          {/* Right Header actions */}
          <div className="flex items-center gap-3">
            {user && (
              <button
                type="button"
                onClick={handleResetJourney}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors cursor-pointer"
                title="Refazer diagnóstico de perfil"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Refazer Diagnóstico</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Rede SESI Conectada</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!user || !user.onboardingCompleted ? (
          <OnboardingFlow onComplete={handleCompleteOnboarding} />
        ) : (
          <Dashboard 
            user={user}
            onUpdateUser={handleUpdateUser}
            onOpenApplyModal={handleOpenApplyModal}
            logs={logs}
          />
        )}
      </main>

      {/* Experience Logger Modal */}
      {isLoggingModalOpen && (
        <ExperienceLoggerModal 
          proposal={proposalToLog}
          userClasses={user?.classes}
          activeClassId={user?.activeClassId}
          onClose={() => {
            setIsLoggingModalOpen(false);
            setProposalToLog(null);
          }}
          onSaveLog={handleSaveLog}
        />
      )}

      {/* Footer with Pedagogical Manifesto */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            “Continue sendo você. Vamos encontrar a tecnologia que potencializa a sua maneira de ensinar.”
          </p>
          <p className="text-[11px] text-slate-400">
            Plataforma SESI TEC • Desenvolvida para acolher, inspirar e valorizar os professores em todas as etapas educacionais.
          </p>
        </div>
      </footer>
    </div>
  );
}
