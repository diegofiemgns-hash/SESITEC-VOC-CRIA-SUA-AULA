import { useState } from 'react';
import { 
  Tablet, 
  Laptop, 
  Glasses, 
  Boxes, 
  Bot, 
  Sparkles, 
  Mic, 
  Users, 
  Clock, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  BookOpen,
  GraduationCap,
  Layers,
  Printer,
  Cpu,
  Eye,
  ChevronRight,
  X
} from 'lucide-react';
import { TECHNOLOGIES, INITIAL_PROPOSALS } from '../data/mockData';
import { SESI_OFFICIAL_PROPOSALS } from '../data/sesiProposals';
import { Technology, CurricularProposal, TeacherClass } from '../types';
import ProposalDetailModal from './ProposalDetailModal';

interface TechCatalogProps {
  onSelectTechForLesson: (techId: string) => void;
  userClasses?: TeacherClass[];
  activeClassId?: string;
  onApplyProposal?: (proposal: CurricularProposal) => void;
}

export default function TechCatalog({ 
  onSelectTechForLesson,
  userClasses,
  activeClassId,
  onApplyProposal
}: TechCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Selected Tech for viewing its proposals
  const [activeTechWithProposals, setActiveTechWithProposals] = useState<Technology | null>(null);
  
  // Modal for displaying a proposal directly on screen (NO PDF!)
  const [activeProposalOnScreen, setActiveProposalOnScreen] = useState<CurricularProposal | null>(null);

  // Fallback icon helper
  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Glasses': return <Glasses className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  // Combine official proposals with all proposals
  const allProposals = [...SESI_OFFICIAL_PROPOSALS, ...INITIAL_PROPOSALS.filter(p => !SESI_OFFICIAL_PROPOSALS.some(op => op.id === p.id))];

  // Helper to count proposals per technology
  const getProposalsForTech = (techId: string) => {
    return allProposals.filter(p => {
      if (p.recommendedTechId === techId) return true;
      if (techId === 'impressora-3d' && p.techName?.toLowerCase().includes('impressora')) return true;
      if (techId === 'vr-oculos' && (p.techName?.toLowerCase().includes('vr') || p.techName?.toLowerCase().includes('realidade virtual'))) return true;
      if (techId === 'labdisc' && p.techName?.toLowerCase().includes('labdisc')) return true;
      if (techId === 'estudio' && (p.techName?.toLowerCase().includes('estúdio') || p.techName?.toLowerCase().includes('chroma'))) return true;
      if (techId === 'tablets' && p.techName?.toLowerCase().includes('tablet')) return true;
      if (techId === 'projetor-chromecast' && (p.techName?.toLowerCase().includes('projetor') || p.techName?.toLowerCase().includes('chromecast'))) return true;
      return false;
    });
  };

  const filteredTechnologies = TECHNOLOGIES.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tech.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tech.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Header */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Catálogo Visual SESI TEC
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                Acesso Direto na Tela
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Equipamentos e Propostas Práticas por Tecnologia
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              Clique em qualquer equipamento para ver suas propostas pedagógicas oficiais com passo a passo na tela.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar impressora 3D, LabDisc, VR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Filter categories pills */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          {[
            { id: 'all', label: 'Todas as Tecnologias' },
            { id: 'robotica', label: 'Impressora 3D & Maker' },
            { id: 'imersao', label: 'Realidade Virtual (VR)' },
            { id: 'audiovisual', label: 'Estúdio & Audiovisual' },
            { id: 'computacao', label: 'LabDisc & Chromebooks' },
            { id: 'colaboracao', label: 'Tablets & Murais' }
          ].map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Technology Cards with Real Photographic Imagery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnologies.map(tech => {
          const techProposals = getProposalsForTech(tech.id);
          const isExpanded = activeTechWithProposals?.id === tech.id;

          return (
            <div 
              key={tech.id}
              className={`bg-white dark:bg-slate-800 border rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between ${
                isExpanded 
                  ? 'border-red-600 ring-2 ring-red-500/20' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div>
                {/* Tech Image Banner */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden group cursor-pointer" onClick={() => setActiveTechWithProposals(tech)}>
                  {tech.imageUrl ? (
                    <img 
                      src={tech.imageUrl} 
                      alt={tech.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-red-600 to-amber-700 flex items-center justify-center">
                      {getTechIcon(tech.icon)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-red-600 text-white shadow-md">
                      {tech.unitAvailableCount} un. na unidade
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-white">
                      {tech.difficultyLevel}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base sm:text-lg font-black leading-tight drop-shadow-sm flex items-center gap-2">
                      <span>{tech.name}</span>
                    </h3>
                    {tech.subtitle && (
                      <p className="text-xs text-slate-200 font-medium line-clamp-1 mt-0.5">
                        {tech.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tech.tags.slice(0, 3).map((t, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* ATE Prep Info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Preparo: ~{tech.preparationTimeMinutes} min</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Apoio do ATE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTechWithProposals(tech)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-red-500" />
                  <span>Ver Propostas ({techProposals.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTechForLesson(tech.id)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors border border-red-200 dark:border-red-900 flex items-center gap-1 cursor-pointer"
                  title="Criar novo plano com este equipamento"
                >
                  <span>Planejar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TECH PROPOSALS DRAWER / MODAL DIRECTLY ON SCREEN */}
      {activeTechWithProposals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header with Tech Image Banner */}
            <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
              {activeTechWithProposals.imageUrl && (
                <img 
                  src={activeTechWithProposals.imageUrl} 
                  alt={activeTechWithProposals.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              <button
                type="button"
                onClick={() => setActiveTechWithProposals(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer z-10"
                title="Fechar painel de propostas"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                    Equipamento: {activeTechWithProposals.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-slate-200">
                    {activeTechWithProposals.unitAvailableCount} disponíveis na Unidade
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  Propostas Pedagógicas Oficiais com {activeTechWithProposals.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                  Clique em qualquer proposta para ver o roteiro completo diretamente na tela.
                </p>
              </div>
            </div>

            {/* List of Proposals for this Tech */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {(() => {
                const proposals = getProposalsForTech(activeTechWithProposals.id);
                if (proposals.length === 0) {
                  return (
                    <div className="p-8 text-center bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500">
                      <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                      <p className="font-semibold text-sm">Nenhuma proposta vinculada a esta tecnologia no momento.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTechWithProposals(null);
                          onSelectTechForLesson(activeTechWithProposals.id);
                        }}
                        className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white"
                      >
                        Gerar Proposta Personalizada
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {proposals.map(prop => (
                      <div
                        key={prop.id}
                        className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Proposal Card Photo */}
                          <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                            <img 
                              src={prop.imageUrl || activeTechWithProposals.imageUrl} 
                              alt={prop.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = activeTechWithProposals.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                                {prop.curricularComponent}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                                {prop.targetYear}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 space-y-2">

                            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                              {prop.title}
                            </h4>

                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {prop.pedagogicalIntentionality || prop.objective}
                            </p>

                            {prop.bnccSkills && prop.bnccSkills.length > 0 && (
                              <div className="text-[11px] text-red-600 dark:text-red-400 font-semibold truncate">
                                BNCC: {prop.bnccSkills[0].split(')')[0] + ')'}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Bottom CTA */}
                        <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveProposalOnScreen(prop)}
                            className="flex-1 py-2 px-3 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Direto na Tela</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveTechWithProposals(null);
                              onSelectTechForLesson(activeTechWithProposals.id);
                            }}
                            className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors cursor-pointer"
                            title="Abrir no Planejador"
                          >
                            Planejar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                💡 Dica: Todas as propostas contam com o suporte presencial do ATE na unidade escolar.
              </span>
              <button
                type="button"
                onClick={() => setActiveTechWithProposals(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                Voltar ao Catálogo
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FULL ON-SCREEN PROPOSAL DETAIL MODAL (NO PDF!) */}
      {activeProposalOnScreen && (
        <ProposalDetailModal
          proposal={activeProposalOnScreen}
          userClasses={userClasses}
          activeClassId={activeClassId}
          onClose={() => setActiveProposalOnScreen(null)}
          onApplyProposal={(p) => {
            setActiveProposalOnScreen(null);
            if (onApplyProposal) {
              onApplyProposal(p);
            }
          }}
        />
      )}

    </div>
  );
}
