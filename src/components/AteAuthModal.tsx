import { useState, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  UserCheck, 
  AlertCircle, 
  X, 
  Check, 
  HelpCircle,
  Building2,
  Info
} from 'lucide-react';
import { TeacherUser } from '../types';

interface AteAuthModalProps {
  user: TeacherUser;
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  onUpdateUserRole?: (newRole: 'professor' | 'ate' | 'coordenador') => void;
}

export const DEFAULT_ATE_PIN = 'ate2026';
export const ALT_ATE_PIN = 'sesi123';
export const STORAGE_KEY_ATE_AUTH = 'sesi_tec_ate_authorized';

export default function AteAuthModal({
  user,
  isOpen,
  onClose,
  onAuthenticated,
  onUpdateUserRole
}: AteAuthModalProps) {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHelper, setShowHelper] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'professor' | 'ate' | 'coordenador'>(user.role || 'professor');

  if (!isOpen) return null;

  const handleValidatePin = (e: FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim();
    const customPin = user.atePin || DEFAULT_ATE_PIN;

    if (cleanPin === customPin || cleanPin === DEFAULT_ATE_PIN || cleanPin === ALT_ATE_PIN) {
      setErrorMsg(null);
      try {
        localStorage.setItem(STORAGE_KEY_ATE_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      if (onUpdateUserRole && selectedRole !== user.role) {
        onUpdateUserRole(selectedRole);
      }
      onAuthenticated();
      onClose();
    } else {
      setErrorMsg('Chave de acesso incorreta. Verifique com a equipe técnica da unidade.');
    }
  };

  const handleQuickAuthenticateDemo = () => {
    try {
      localStorage.setItem(STORAGE_KEY_ATE_AUTH, 'true');
    } catch (e) {
      console.error(e);
    }
    if (onUpdateUserRole) {
      onUpdateUserRole('ate');
    }
    onAuthenticated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-red-600 to-rose-700 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>

          <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
            Controle de Acesso Institucional
          </span>
          <h3 className="text-xl font-black">
            Área Restrita do ATE
          </h3>
          <p className="text-xs text-rose-100 mt-1 leading-relaxed">
            Como o SESI protege as configurações dos equipamentos e inventário técnico.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-left">
          {/* Explanation Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">
                  Como o sistema identifica quem é o ATE?
                </strong>
                Para que professores e alunos não alterem o status das baterias, impressoras ou reservas por engano, a permissão de administrador é validada por <strong>PIN Institucional da Unidade</strong> ou <strong>Cargo do Usuário</strong>.
              </div>
            </div>
          </div>

          {/* Form to enter PIN */}
          <form onSubmit={handleValidatePin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center justify-between">
                <span>Chave / PIN de Acesso do ATE:</span>
                <button
                  type="button"
                  onClick={() => setShowHelper(!showHelper)}
                  className="text-[11px] text-red-600 dark:text-red-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  Qual é a chave padrão?
                </button>
              </label>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="Digite a chave (ex: ate2026)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  autoFocus
                />
              </div>

              {showHelper && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 animate-in fade-in duration-150">
                  <div className="font-bold mb-0.5">Chave de Demonstração do SESI:</div>
                  Use <code className="bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded font-mono font-black text-amber-900 dark:text-amber-200">ate2026</code> ou <code className="bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded font-mono font-black text-amber-900 dark:text-amber-200">sesi123</code>.
                </div>
              )}

              {errorMsg && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Cargo selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Vincular ao seu perfil atual:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('ate')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    selectedRole === 'ate'
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 ring-1 ring-red-500'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-red-500" />
                  <span className="truncate">Sou o ATE da Escola</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('coordenador')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    selectedRole === 'coordenador'
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 ring-1 ring-red-500'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-red-500" />
                  <span className="truncate">Coordenação Pedagógica</span>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Desbloquear Painel do ATE</span>
              </button>

              <button
                type="button"
                onClick={handleQuickAuthenticateDemo}
                className="w-full py-2 px-3 rounded-xl font-semibold text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Liberar Acesso Rápido de Teste (1 Clique)</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
