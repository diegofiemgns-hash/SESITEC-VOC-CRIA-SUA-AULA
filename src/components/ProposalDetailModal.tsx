import { useState } from 'react';
import { 
  X, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Clock, 
  Users, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  Award,
  Image as ImageIcon,
  Maximize2
} from 'lucide-react';
import { CurricularProposal, TeacherClass } from '../types';
import { TECHNOLOGIES } from '../data/mockData';

interface ProposalDetailModalProps {
  proposal: CurricularProposal;
  userClasses?: TeacherClass[];
  activeClassId?: string;
  onClose: () => void;
  onApplyProposal: (proposal: CurricularProposal) => void;
}

export default function ProposalDetailModal({
  proposal,
  userClasses,
  activeClassId,
  onClose,
  onApplyProposal
}: ProposalDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'roteiro' | 'bncc' | 'avaliacao' | 'recursos'>('roteiro');
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Match tech from catalog for fallback image and details
  const matchedTech = TECHNOLOGIES.find(
    t => t.id === proposal.recommendedTechId || 
         (t.name && proposal.techName && (
           t.name.toLowerCase().includes(proposal.techName.toLowerCase()) ||
           proposal.techName.toLowerCase().includes(t.name.toLowerCase())
         ))
  );

  const defaultFallbackImage = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80';
  const initialImageUrl = proposal.imageUrl || matchedTech?.imageUrl || defaultFallbackImage;
  const [activeImageUrl, setActiveImageUrl] = useState<string>(initialImageUrl);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const handleImageError = () => {
    if (matchedTech?.imageUrl && activeImageUrl !== matchedTech.imageUrl) {
      setActiveImageUrl(matchedTech.imageUrl);
    } else if (activeImageUrl !== defaultFallbackImage) {
      setActiveImageUrl(defaultFallbackImage);
    } else {
      setImageLoadFailed(true);
    }
  };

  const activeClass = userClasses?.find(c => c.id === activeClassId) || userClasses?.[0];

  const handleCopyPlan = () => {
    const text = `
PLANO PEDAGÓGICO SESI TEC: ${proposal.title}
Temática: ${proposal.thematicTitle || proposal.title}
Etapa: ${proposal.educationStage} | Ano: ${proposal.targetYear}
Componente: ${proposal.curricularComponent}
Tecnologia: ${proposal.techName}

INTENCIONALIDADE PEDAGÓGICA:
${proposal.pedagogicalIntentionality || proposal.objective}

HABILIDADES BNCC:
${proposal.bnccSkills?.join('\n') || 'Conforme plano de curso da unidade.'}

ESTRATÉGIA DE MEDIAÇÃO:
${proposal.sessionSteps?.map(s => `${s.sessionNumber} - ${s.title}:\n${s.description}\n`).join('\n') || proposal.steps.map(s => `• ${s.stage} (${s.duration}): ${s.action}`).join('\n')}

AVALIAÇÃO:
${proposal.evaluationSuggestion}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-xs overflow-y-auto animate-fadeIn print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none">
        
        {/* Header with Photo Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950 print:h-36 shrink-0">
          {!imageLoadFailed ? (
            <img 
              src={activeImageUrl} 
              alt={proposal.title} 
              className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
              referrerPolicy="no-referrer"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white/40" />
            </div>
          )}

          {/* Balanced gradient: photo stays vibrant and bright while text is 100% readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />

          {/* Top badges bar */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10 shadow-xs">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Referência Visual SESI TEC</span>
            </span>

            <button
              type="button"
              onClick={() => setIsImageZoomed(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white text-[10px] font-medium border border-white/10 cursor-pointer transition-all"
              title="Ver foto em tela cheia"
            >
              <Maximize2 className="w-3 h-3 text-slate-300" />
              <span>Ampliar Foto</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer z-10 print:hidden shadow-md"
            title="Fechar proposta"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title & Badges */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white shadow-xs">
                {proposal.techName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                {proposal.targetYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/90 text-white">
                {proposal.curricularComponent}
              </span>
              {proposal.thematicArea && (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-200">
                  {proposal.thematicArea}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight drop-shadow-md">
              {proposal.title}
            </h2>
            {proposal.thematicTitle && proposal.thematicTitle !== proposal.title && (
              <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1 mt-0.5">
                Temática: {proposal.thematicTitle}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 pt-3 gap-2 overflow-x-auto print:hidden">
          {[
            { id: 'roteiro', label: 'Roteiro da Aula', icon: BookOpen },
            { id: 'bncc', label: 'Habilidades BNCC', icon: GraduationCap },
            { id: 'avaliacao', label: 'Avaliação & Rubricas', icon: Award },
            { id: 'recursos', label: 'Recursos & Equipamentos', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  active 
                    ? 'border-red-600 text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 rounded-t-xl shadow-xs' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800 dark:text-slate-200">
          
          {/* TAB 1: ROTEIRO DA AULA */}
          {activeTab === 'roteiro' && (
            <div className="space-y-6">

              {/* DEDICATED VISUAL SHOWCASE CARD: PHOTO & ARTIFACT IN THE PROPOSAL */}
              <div className="bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    <span>Referência Visual do Projeto & Tecnologia Maker</span>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-900/40">
                    {proposal.techName}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div 
                    onClick={() => setIsImageZoomed(true)}
                    className="md:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 aspect-video sm:aspect-4/3 shadow-xs cursor-pointer group"
                    title="Clique para ampliar"
                  >
                    <img
                      src={activeImageUrl}
                      alt={proposal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                      <div className="flex items-center justify-between w-full text-white text-[11px]">
                        <span className="font-semibold truncate">{proposal.thematicTitle || proposal.title}</span>
                        <Maximize2 className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 shrink-0 ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      O que os estudantes produzem nesta aula:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {proposal.pedagogicalIntentionality || proposal.description || proposal.objective}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Artefato / Experimento Maker</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                        <span>Apoio do ATE na bancada</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intencionalidade Pedagógica Box */}
              <div className="bg-red-50/70 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/40 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Intencionalidade Pedagógica</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {proposal.pedagogicalIntentionality || proposal.objective}
                </p>
              </div>

              {/* General Info Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-semibold block">Duração Total</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>{proposal.durationClasses} {proposal.durationClasses === 1 ? 'aula' : 'aulas'}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-semibold block">Organização</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 capitalize">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>{proposal.classFormat}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-semibold block">Público / Ano</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-sky-600" />
                    <span>{proposal.targetYear}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-400 font-semibold block">Tecnologia</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span className="truncate">{proposal.techName}</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Sessions */}
              <div className="space-y-4">
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  <span>Estratégia de Mediação de Aprendizagem (Aula por Aula)</span>
                </h3>

                {proposal.sessionSteps && proposal.sessionSteps.length > 0 ? (
                  <div className="space-y-3">
                    {proposal.sessionSteps.map((session, idx) => (
                      <div 
                        key={idx}
                        className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-red-600 text-white">
                            {session.sessionNumber}
                          </span>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {session.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {session.description}
                        </p>

                        {session.details && session.details.length > 0 && (
                          <div className="mt-3 pl-3 border-l-2 border-red-500/40 space-y-1.5">
                            {session.details.map((detail, dIdx) => (
                              <div key={dIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                <span className="text-red-500 font-bold">•</span>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {proposal.steps.map((step, idx) => (
                      <div 
                        key={idx}
                        className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {step.stage}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {step.action}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ATE Tip Callout */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  <span className="font-bold block text-emerald-800 dark:text-emerald-300 mb-0.5">
                    💡 Apoio do Assistente de Tecnologias Educacionais (ATE):
                  </span>
                  {proposal.ateTip || "Agende com o ATE da sua escola 2 dias antes para garantir que os equipamentos estejam carregados e os arquivos configurados na sala maker."}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HABILIDADES BNCC */}
          {activeTab === 'bncc' && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Alinhamento Curricular Nacional
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Competências e Habilidades da Base Nacional Comum Curricular (BNCC)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Esta proposta pedagógica foi desenhada diretamente a partir das diretrizes oficiais de ensino da Rede SESI.
                </p>
              </div>

              <div className="space-y-3">
                {proposal.bnccSkills && proposal.bnccSkills.length > 0 ? (
                  proposal.bnccSkills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs">
                        {sIdx + 1}
                      </div>
                      <div>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                          {skill}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    Habilidades mapeadas de acordo com as diretrizes curriculares do SESI para {proposal.curricularComponent}.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: AVALIAÇÃO & RUBRICAS */}
          {activeTab === 'avaliacao' && (
            <div className="space-y-5">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Instrumentos Avaliativos SESI
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Critérios Formativos e Processuais
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {proposal.evaluationSuggestion}
                </p>
              </div>

              {proposal.evaluationRubric && proposal.evaluationRubric.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Matriz de Rubrica Oficial:
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                          <th className="p-3 border-b border-slate-200 dark:border-slate-700 w-1/4">Critério</th>
                          <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 w-1/4">100% • Muito Bom</th>
                          <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-400 w-1/4">70% • Satisfatório</th>
                          <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-rose-700 dark:text-rose-400 w-1/4">40% / 0% • Em Desenvolvimento</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {proposal.evaluationRubric.map((rubric, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-semibold text-slate-900 dark:text-white">{rubric.criteria}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">{rubric.excellent}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">{rubric.satisfactory}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">{rubric.unsatisfactory}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RECURSOS & SOFTWARES */}
          {activeTab === 'recursos' && (
            <div className="space-y-5">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Ecossistema Físico & Digital SESI
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Equipamento Maker & Ferramentas Digitais
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Equipamentos da sala tecnológica e softwares recomendados para uso imediato em aula.
                </p>
              </div>

              {/* Hardware / Equipment Showcase Card with Photo */}
              {matchedTech && (
                <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-12">
                    <div className="sm:col-span-5 relative h-48 sm:h-auto bg-slate-950">
                      <img 
                        src={matchedTech.imageUrl} 
                        alt={matchedTech.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                          Equipamento Principal
                        </span>
                      </div>
                    </div>
                    <div className="sm:col-span-7 p-4 sm:p-5 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-base">
                            {matchedTech.name}
                          </h4>
                          {matchedTech.unitAvailableCount && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                              {matchedTech.unitAvailableCount} un. na escola
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {matchedTech.subtitle || matchedTech.description}
                        </p>
                      </div>

                      {matchedTech.tipsForTeachers && (
                        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40 rounded-xl p-3 text-[11px] text-amber-900 dark:text-amber-200">
                          <span className="font-bold block text-amber-800 dark:text-amber-300 mb-0.5">
                            📌 Dica Técnica do ATE:
                          </span>
                          {matchedTech.tipsForTeachers}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tools chips */}
              {proposal.supportTools && proposal.supportTools.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Softwares & Aplicativos de Apoio
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proposal.supportTools.map((tool, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        🛠️ {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct links */}
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                  Links & Recursos Rápidos
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {proposal.resourceLinks && proposal.resourceLinks.length > 0 ? (
                    proposal.resourceLinks.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:border-red-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors block">
                            {link.label}
                          </span>
                          {link.note && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                              {link.note}
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors shrink-0 ml-2" />
                      </a>
                    ))
                  ) : (
                    <div className="col-span-2 p-4 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      Nenhum link externo obrigatório para esta proposta; utilize os materiais físicos da escola.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyPlan}
              className="flex-1 sm:flex-none text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Roteiro Copiado!' : 'Copiar Roteiro'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Ficha</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onApplyProposal(proposal);
              }}
              className="w-full sm:w-auto text-xs sm:text-sm font-bold text-white px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Vou Aplicar Esta Aula {activeClass ? `com ${activeClass.name}` : ''}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Photo Zoom */}
      {isImageZoomed && (
        <div 
          onClick={() => setIsImageZoomed(false)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={activeImageUrl} 
              alt={proposal.title} 
              className="w-full max-h-[80vh] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-slate-900/90 flex items-center justify-between text-white">
              <div>
                <span className="text-xs font-bold text-amber-400 block">{proposal.techName}</span>
                <span className="text-sm font-semibold">{proposal.thematicTitle || proposal.title}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageZoomed(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
