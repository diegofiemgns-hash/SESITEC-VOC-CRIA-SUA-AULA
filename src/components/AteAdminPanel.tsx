import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  Sparkles, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Check, 
  X, 
  Send, 
  FileText, 
  TrendingUp, 
  Activity, 
  BatteryCharging, 
  Cpu, 
  Radio, 
  Printer, 
  Glasses, 
  Mic, 
  Tablet, 
  Boxes, 
  Bot,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { 
  AteEquipment, 
  AteClassSchedule, 
  AteNotice, 
  AteScheduleStatus, 
  AteEquipmentStatus,
  CurricularProposal,
  ExperienceLog
} from '../types';
import { INITIAL_ATE_EQUIPMENT, INITIAL_ATE_SCHEDULES, INITIAL_ATE_NOTICES } from '../data/ateData';
import { SESI_OFFICIAL_PROPOSALS } from '../data/sesiProposals';
import ProposalDetailModal from './ProposalDetailModal';

interface AteAdminPanelProps {
  logs?: ExperienceLog[];
  onOpenProposalModal?: (proposal: CurricularProposal) => void;
  onSwitchToTeacherMode: () => void;
  onLockAte?: () => void;
}

const STORAGE_KEY_ATE_EQUIPMENT = 'sesi_tec_ate_equipment';
const STORAGE_KEY_ATE_SCHEDULES = 'sesi_tec_ate_schedules';
const STORAGE_KEY_ATE_NOTICES = 'sesi_tec_ate_notices';

export default function AteAdminPanel({
  logs = [],
  onSwitchToTeacherMode,
  onLockAte
}: AteAdminPanelProps) {
  // Persistence state
  const [equipmentList, setEquipmentList] = useState<AteEquipment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATE_EQUIPMENT);
      return saved ? JSON.parse(saved) : INITIAL_ATE_EQUIPMENT;
    } catch {
      return INITIAL_ATE_EQUIPMENT;
    }
  });

  const [schedules, setSchedules] = useState<AteClassSchedule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATE_SCHEDULES);
      return saved ? JSON.parse(saved) : INITIAL_ATE_SCHEDULES;
    } catch {
      return INITIAL_ATE_SCHEDULES;
    }
  });

  const [notices, setNotices] = useState<AteNotice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATE_NOTICES);
      return saved ? JSON.parse(saved) : INITIAL_ATE_NOTICES;
    } catch {
      return INITIAL_ATE_NOTICES;
    }
  });

  // UI Navigation
  const [activeTab, setActiveTab] = useState<'solicitacoes' | 'inventario' | 'metricas' | 'comunicados'>('solicitacoes');
  const [statusFilter, setStatusFilter] = useState<AteScheduleStatus | 'todas'>('todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected proposal for full on-screen preview
  const [selectedProposalPreview, setSelectedProposalPreview] = useState<CurricularProposal | null>(null);

  // Quick Action Modal / Editing Note
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  // New Notice Modal
  const [isNewNoticeModalOpen, setIsNewNoticeModalOpen] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeMessage, setNewNoticeMessage] = useState('');
  const [newNoticePriority, setNewNoticePriority] = useState<'normal' | 'importante' | 'urgente'>('normal');

  // Helper to save schedules
  const updateSchedules = (newSchedules: AteClassSchedule[]) => {
    setSchedules(newSchedules);
    try {
      localStorage.setItem(STORAGE_KEY_ATE_SCHEDULES, JSON.stringify(newSchedules));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper to save equipment
  const updateEquipment = (newEquipment: AteEquipment[]) => {
    setEquipmentList(newEquipment);
    try {
      localStorage.setItem(STORAGE_KEY_ATE_EQUIPMENT, JSON.stringify(newEquipment));
    } catch (e) {
      console.error(e);
    }
  };

  // Status Change Handler for Schedule
  const handleUpdateScheduleStatus = (scheduleId: string, newStatus: AteScheduleStatus) => {
    const updated = schedules.map(sch => {
      if (sch.id === scheduleId) {
        return {
          ...sch,
          status: newStatus
        };
      }
      return sch;
    });
    updateSchedules(updated);
  };

  // Save Note Handler
  const handleSaveScheduleNote = (scheduleId: string) => {
    const updated = schedules.map(sch => {
      if (sch.id === scheduleId) {
        return {
          ...sch,
          ateNotes: editingNoteText
        };
      }
      return sch;
    });
    updateSchedules(updated);
    setEditingScheduleId(null);
    setEditingNoteText('');
  };

  // Equipment Status Toggle
  const handleToggleEquipmentStatus = (eqId: string, nextStatus: AteEquipmentStatus) => {
    const updated = equipmentList.map(eq => {
      if (eq.id === eqId) {
        return {
          ...eq,
          status: nextStatus,
          lastCheckDate: 'Agora mesmo'
        };
      }
      return eq;
    });
    updateEquipment(updated);
  };

  // Add Notice Handler
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeMessage.trim()) return;

    const notice: AteNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle.trim(),
      message: newNoticeMessage.trim(),
      date: 'Hoje',
      priority: newNoticePriority,
      author: 'ATE - Assistente de Tecnologia Educacional'
    };

    const nextNotices = [notice, ...notices];
    setNotices(nextNotices);
    try {
      localStorage.setItem(STORAGE_KEY_ATE_NOTICES, JSON.stringify(nextNotices));
    } catch (e) {
      console.error(e);
    }

    setNewNoticeTitle('');
    setNewNoticeMessage('');
    setIsNewNoticeModalOpen(false);
  };

  // Filtered Schedules
  const filteredSchedules = schedules.filter(sch => {
    const matchesStatus = statusFilter === 'todas' || sch.status === statusFilter;
    const matchesSearch = sch.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sch.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sch.techName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sch.className.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const pendingCount = schedules.filter(s => s.status === 'pendente').length;
  const preparedCount = schedules.filter(s => s.status === 'preparado').length;
  const inProgressCount = schedules.filter(s => s.status === 'em_andamento').length;
  const totalEquipments = equipmentList.reduce((acc, eq) => acc + eq.totalCount, 0);
  const availableEquipments = equipmentList.reduce((acc, eq) => acc + eq.availableCount, 0);

  // Helper for status badge
  const getStatusBadge = (status: AteScheduleStatus) => {
    switch (status) {
      case 'pendente':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pendente de Preparo</span>;
      case 'preparado':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Equipamentos Prontos</span>;
      case 'em_andamento':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 flex items-center gap-1"><Activity className="w-3.5 h-3.5 animate-pulse" /> Em Execução na Aula</span>;
      case 'concluido':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Concluída & Devolvida</span>;
      case 'cancelado':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Cancelada</span>;
    }
  };

  const getEquipmentIcon = (techId: string) => {
    switch (techId) {
      case 'impressora-3d': return <Printer className="w-5 h-5 text-red-600" />;
      case 'labdisc': return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'vr-oculos': return <Glasses className="w-5 h-5 text-purple-600" />;
      case 'estudio': return <Mic className="w-5 h-5 text-amber-600" />;
      case 'tablets': return <Tablet className="w-5 h-5 text-blue-600" />;
      case 'braco-robotico': return <Bot className="w-5 h-5 text-orange-600" />;
      case 'lego-spike': return <Boxes className="w-5 h-5 text-teal-600" />;
      default: return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: ATE Identification & Mode Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 opacity-10 pointer-events-none">
          <ShieldCheck className="w-72 h-72 text-red-500" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white tracking-wider uppercase shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Painel Administrativo do ATE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-slate-200">
                Assistente de Tecnologia Educacional • Unidade SESI
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Monitoramento & Suporte Tecnológico
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Supervisione as solicitações dos professores, garanta a prontidão dos equipamentos (impressoras 3D, LabDiscs, óculos VR) e apoie a prática pedagógica com segurança.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onSwitchToTeacherMode}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              title="Alternar para visão do professor"
            >
              <Users className="w-4 h-4 text-red-600" />
              <span>Acessar Modo Professor</span>
            </button>

            {onLockAte && (
              <button
                type="button"
                onClick={onLockAte}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-red-950/70 hover:bg-red-900 border border-red-800/80 text-rose-200 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                title="Bloquear painel do ATE para que outros usuários precisem da chave de acesso"
              >
                <Lock className="w-3.5 h-3.5 text-rose-300" />
                <span>Bloquear Painel</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-700/70">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Aguardando Preparo
            </span>
            <div className="text-2xl font-black text-amber-400 mt-0.5 flex items-center gap-2">
              <span>{pendingCount}</span>
              <Clock className="w-4 h-4 opacity-70" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Prontos para Aula
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-0.5 flex items-center gap-2">
              <span>{preparedCount}</span>
              <CheckCircle2 className="w-4 h-4 opacity-70" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Em Execução Agora
            </span>
            <div className="text-2xl font-black text-sky-400 mt-0.5 flex items-center gap-2">
              <span>{inProgressCount}</span>
              <Activity className="w-4 h-4 opacity-70 animate-pulse" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Equipamentos Disponíveis
            </span>
            <div className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <span>{availableEquipments}</span>
              <span className="text-xs text-slate-300 font-normal">/ {totalEquipments} un.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-xs gap-2 overflow-x-auto">
        {[
          { id: 'solicitacoes', label: 'Solicitações de Aulas', icon: Calendar, badge: pendingCount > 0 ? pendingCount : null },
          { id: 'inventario', label: 'Inventário & Status dos Equipamentos', icon: Wrench },
          { id: 'metricas', label: 'Métricas de Uso Pedagógico', icon: TrendingUp },
          { id: 'comunicados', label: 'Mural de Avisos & Dicas do ATE', icon: MessageSquare }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                active 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  active ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SOLICITAÇÕES DE AULAS */}
      {activeTab === 'solicitacoes' && (
        <div className="space-y-4">
          
          {/* Filters and search */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtrar Status:
              </span>
              {[
                { id: 'todas', label: 'Todas' },
                { id: 'pendente', label: 'Pendentes' },
                { id: 'preparado', label: 'Preparadas' },
                { id: 'em_andamento', label: 'Em Andamento' },
                { id: 'concluido', label: 'Concluídas' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatusFilter(f.id as any)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === f.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar professor, tecnologia, turma..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* List of Schedules */}
          <div className="space-y-3">
            {filteredSchedules.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500">
                <Calendar className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="font-semibold text-sm">Nenhuma solicitação encontrada com os filtros atuais.</p>
              </div>
            ) : (
              filteredSchedules.map(sch => (
                <div
                  key={sch.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(sch.status)}
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        {getEquipmentIcon(sch.techId)}
                        <span>{sch.techName}</span>
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Qtd: <strong className="text-slate-800 dark:text-slate-200">{sch.quantityRequested} un.</strong>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{sch.proposalTitle}</span>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Solicitante: <strong className="text-slate-900 dark:text-white">{sch.teacherName}</strong> • {sch.discipline} • <span className="text-red-600 font-semibold">{sch.className}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        <span>Data solicitada: <strong className="text-slate-800 dark:text-slate-200">{sch.requestedDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Turno: <strong className="capitalize text-slate-800 dark:text-slate-200">{sch.requestedPeriod}</strong></span>
                      </div>
                    </div>

                    {/* ATE Notes Box */}
                    {sch.ateNotes && (
                      <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-slate-900 dark:text-white mb-0.5">Anotação Técnica do ATE:</span>
                          <span>{sch.ateNotes}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions for ATE */}
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700/80 pt-3 md:pt-0 md:pl-4">
                    
                    {/* View full proposal on screen */}
                    <button
                      type="button"
                      onClick={() => {
                        // Find matching official proposal or create a preview
                        const match = SESI_OFFICIAL_PROPOSALS.find(p => p.title.toLowerCase().includes(sch.proposalTitle.toLowerCase()) || p.recommendedTechId === sch.techId);
                        if (match) {
                          setSelectedProposalPreview(match);
                        } else if (SESI_OFFICIAL_PROPOSALS[0]) {
                          setSelectedProposalPreview(SESI_OFFICIAL_PROPOSALS[0]);
                        }
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Ver roteiro completo na tela"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-red-600" />
                      <span>Ver Ficha na Tela</span>
                    </button>

                    {sch.status === 'pendente' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateScheduleStatus(sch.id, 'preparado')}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmar Preparo</span>
                      </button>
                    )}

                    {sch.status === 'preparado' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateScheduleStatus(sch.id, 'em_andamento')}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Entregar na Sala</span>
                      </button>
                    )}

                    {sch.status === 'em_andamento' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateScheduleStatus(sch.id, 'concluido')}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Concluir Devolução</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setEditingScheduleId(sch.id);
                        setEditingNoteText(sch.ateNotes || '');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{sch.ateNotes ? 'Editar Nota' : 'Add Nota'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INVENTÁRIO DOS EQUIPAMENTOS */}
      {activeTab === 'inventario' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Equipamentos Educacionais da Unidade SESI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Acompanhe o estado operacional, calibração de sensores e consumíveis da Sala Maker e laboratórios.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Monitoramento Ativo do ATE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipmentList.map(eq => (
              <div
                key={eq.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700">
                      {getEquipmentIcon(eq.techId)}
                    </div>

                    <div className="text-right">
                      {eq.status === 'disponivel' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Disponível
                        </span>
                      )}
                      {eq.status === 'atencao' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          Atenção / Conferência
                        </span>
                      )}
                      {eq.status === 'manutencao' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                          Em Manutenção
                        </span>
                      )}
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        Checagem: {eq.lastCheckDate}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    {eq.name}
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                    📍 {eq.location}
                  </span>

                  {/* Quantities summary */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Total</span>
                      <strong className="text-sm font-black text-slate-900 dark:text-white">{eq.totalCount}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 uppercase font-bold block">Livres</span>
                      <strong className="text-sm font-black text-emerald-600">{eq.availableCount}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-sky-600 uppercase font-bold block">Em Uso</span>
                      <strong className="text-sm font-black text-sky-600">{eq.inUseCount}</strong>
                    </div>
                  </div>

                  {eq.batteryLevel !== undefined && (
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
                      <span className="flex items-center gap-1"><BatteryCharging className="w-3.5 h-3.5 text-emerald-500" /> Carga Média:</span>
                      <strong className="font-bold">{eq.batteryLevel}%</strong>
                    </div>
                  )}

                  {eq.consumables && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Insumos:</span> {eq.consumables}
                    </div>
                  )}

                  {eq.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg">
                      "{eq.notes}"
                    </p>
                  )}
                </div>

                {/* Status Toggle buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleEquipmentStatus(eq.id, eq.status === 'disponivel' ? 'atencao' : 'disponivel')}
                    className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {eq.status === 'disponivel' ? 'Marcar Revisão' : 'Liberar para Uso'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MÉTRICAS DE USO PEDAGÓGICO */}
      {activeTab === 'metricas' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
              Indicadores de Adoção de Tecnologia Educacional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dados consolidados do apoio técnico prestado aos professores da unidade escolar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
                <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase">Tecnologia Mais Demandada</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1">Impressora 3D</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  14 projetos de prototipagem em Arte, Ciências, Biologia e Física este mês.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Índice de Prontidão ATE</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1">98.4%</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Solicitações preparadas com antecedência antes do início das aulas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/40">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase">Aulas Realizadas com Sucesso</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1">32 Aulas</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Cobriu da Educação Infantil ao Ensino Médio regular e itinerários.
                </p>
              </div>
            </div>
          </div>

          {/* Feedback from Teachers (Logs) */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Registros de Experiência e Avaliação dos Professores</span>
            </h3>

            {logs.length === 0 ? (
              <p className="text-xs text-slate-500">
                Nenhum relato registrado pelos professores ainda nesta sessão. Conforme os professores aplicarem as aulas pelo painel, os feedbacks com estrelas de engajamento aparecerão aqui em tempo real.
              </p>
            ) : (
              <div className="space-y-3">
                {logs.map(log => (
                  <div 
                    key={log.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-red-600">{log.techName}</span>
                        <span className="text-xs text-slate-400">• Turma: {log.targetClass}</span>
                        <span className="text-xs text-slate-400">• Data: {log.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {log.proposalTitle}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        "{log.teacherImpression}"
                      </p>
                      {log.nextStepWish && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                          Próximo desejo com a turma: {log.nextStepWish}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-amber-500">
                        {'★'.repeat(log.studentEngagementRating)}
                        <span className="text-slate-300">{'★'.repeat(5 - log.studentEngagementRating)}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: COMUNICADOS DO ATE */}
      {activeTab === 'comunicados' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Mural de Avisos & Dicas do ATE
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Publique recados sobre chegada de filamentos, manutenção programada ou novidades da Sala Maker para todos os professores.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsNewNoticeModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Comunicado</span>
            </button>
          </div>

          <div className="space-y-3">
            {notices.map(notice => (
              <div
                key={notice.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {notice.priority === 'urgente' && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                        Urgente
                      </span>
                    )}
                    {notice.priority === 'importante' && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Importante
                      </span>
                    )}
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {notice.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400">{notice.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {notice.message}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-400">
                  Publicado por: <strong>{notice.author}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editingScheduleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-red-600" />
              <span>Anotação Técnica do ATE</span>
            </h3>
            <p className="text-xs text-slate-500">
              Registre detalhes da preparação (ex: "Filamento PLA trocado", "Cabos USB conferidos", "Mesa nivelada").
            </p>
            <textarea
              rows={3}
              value={editingNoteText}
              onChange={e => setEditingNoteText(e.target.value)}
              placeholder="Digite aqui a orientação para o professor ou lembrete técnico..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingScheduleId(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleSaveScheduleNote(editingScheduleId)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-500"
              >
                Salvar Nota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Notice Modal */}
      {isNewNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-red-600" />
              <span>Novo Comunicado do ATE</span>
            </h3>
            <form onSubmit={handleAddNotice} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Título do Aviso
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Novo lote de filamentos PLA disponível"
                  value={newNoticeTitle}
                  onChange={e => setNewNoticeTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Prioridade
                </label>
                <select
                  value={newNoticePriority}
                  onChange={e => setNewNoticePriority(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="normal">Normal (Informativo)</option>
                  <option value="importante">Importante</option>
                  <option value="urgente">Urgente (Manutenção/Aviso Geral)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Mensagem Detalhada
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Escreva a mensagem para o corpo docente da escola..."
                  value={newNoticeMessage}
                  onChange={e => setNewNoticeMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewNoticeModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-500 shadow-xs"
                >
                  Publicar Comunicado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* On-screen Proposal Preview Modal */}
      {selectedProposalPreview && (
        <ProposalDetailModal
          proposal={selectedProposalPreview}
          onClose={() => setSelectedProposalPreview(null)}
          onApplyProposal={() => setSelectedProposalPreview(null)}
        />
      )}

    </div>
  );
}
