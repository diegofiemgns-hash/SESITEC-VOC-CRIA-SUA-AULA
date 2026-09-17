import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Users, 
  Sliders, 
  CheckCircle2, 
  Layers, 
  Wrench, 
  Save, 
  Printer, 
  BookOpen,
  ArrowRight,
  Edit3,
  GraduationCap,
  Calendar,
  Filter,
  Check,
  Plus
} from 'lucide-react';
import { 
  CURRICULAR_COMPONENTS, 
  CURRICULAR_CONTENTS, 
  INITIAL_PROPOSALS, 
  TECHNOLOGIES,
  EDUCATION_STAGES,
  SCHOOL_PERIODS
} from '../data/mockData';
import { CurricularProposal, EducationStage, SchoolPeriod, TeacherClass, TeacherUser } from '../types';

interface LessonPlannerProps {
  user?: TeacherUser;
  onUpdateUser?: (updated: TeacherUser) => void;
  onApplyProposal: (proposal: CurricularProposal) => void;
  onOpenClassManager?: () => void;
  accentColorClass?: string;
  initialTechId?: string | null;
}

export default function LessonPlanner({ 
  user, 
  onUpdateUser, 
  onApplyProposal, 
  onOpenClassManager,
  accentColorClass = 'text-red-600',
  initialTechId
}: LessonPlannerProps) {
  const activeClass = user?.classes?.find(c => c.id === user.activeClassId) || user?.classes?.[0];

  // Stage & Period Filters
  const [filterStage, setFilterStage] = useState<EducationStage | 'todas'>(activeClass?.stage || 'todas');
  const [filterPeriod, setFilterPeriod] = useState<SchoolPeriod | 'todos'>(activeClass?.period || 'todos');

  // Selected parameters for generator
  const [selectedComponent, setSelectedComponent] = useState<string>(activeClass?.discipline || 'Matemática');
  const [selectedContent, setSelectedContent] = useState<string>('Função do 2º grau e Parábolas');
  const [selectedObjective, setSelectedObjective] = useState<string>('Investigar e relacionar com situações reais');
  const [selectedDuration, setSelectedDuration] = useState<number>(2);
  const [selectedFormat, setSelectedFormat] = useState<'individual' | 'duplas' | 'grupos' | 'coletivo'>('duplas');
  const [selectedTech, setSelectedTech] = useState<string>(initialTechId || 'auto');

  // Proposal State
  const [currentProposal, setCurrentProposal] = useState<CurricularProposal>(INITIAL_PROPOSALS[0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState(INITIAL_PROPOSALS[0].title);
  const [customSteps, setCustomSteps] = useState(INITIAL_PROPOSALS[0].steps);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync with active class when it changes
  useEffect(() => {
    if (activeClass) {
      setFilterStage(activeClass.stage);
      setFilterPeriod(activeClass.period);
      if (activeClass.discipline && CURRICULAR_COMPONENTS.includes(activeClass.discipline)) {
        setSelectedComponent(activeClass.discipline);
        const contents = CURRICULAR_CONTENTS[activeClass.discipline] || ['Conceitos Fundamentais'];
        setSelectedContent(contents[0]);
      }
      // Find matching proposal for this stage & discipline
      const match = INITIAL_PROPOSALS.find(p => p.educationStage === activeClass.stage);
      if (match) {
        setCurrentProposal(match);
        setCustomTitle(match.title);
        setCustomSteps(match.steps);
      }
    }
  }, [activeClass?.id, activeClass?.stage]);

  const availableContents = CURRICULAR_CONTENTS[selectedComponent] || [
    'Conceitos Fundamentais',
    'Aplicações Práticas Contemporâneas',
    'Resolução de Desafios em Grupo'
  ];

  // Filtered proposals list for instant picking
  const matchingProposals = INITIAL_PROPOSALS.filter(p => {
    const stageMatch = filterStage === 'todas' || p.educationStage === filterStage || p.educationStage === 'todas';
    const periodMatch = filterPeriod === 'todos' || !p.suitablePeriods || p.suitablePeriods.includes('todos') || p.suitablePeriods.includes(filterPeriod as SchoolPeriod);
    return stageMatch && periodMatch;
  });

  const handleSelectClass = (classItem: TeacherClass) => {
    if (user && onUpdateUser) {
      onUpdateUser({
        ...user,
        activeClassId: classItem.id
      });
    }
    setFilterStage(classItem.stage);
    setFilterPeriod(classItem.period);
    if (classItem.discipline) {
      setSelectedComponent(classItem.discipline);
      const contents = CURRICULAR_CONTENTS[classItem.discipline] || ['Conceitos Fundamentais'];
      setSelectedContent(contents[0]);
    }
    showNotice(`Turma "${classItem.name}" selecionada! Propostas ajustadas.`);
  };

  const handleComponentChange = (comp: string) => {
    setSelectedComponent(comp);
    const contents = CURRICULAR_CONTENTS[comp] || ['Introdução ao Conteúdo'];
    setSelectedContent(contents[0]);
    updateProposalRecommendation(comp, contents[0], selectedTech, filterStage);
  };

  const handleContentChange = (content: string) => {
    setSelectedContent(content);
    updateProposalRecommendation(selectedComponent, content, selectedTech, filterStage);
  };

  const handleStageFilterChange = (st: EducationStage | 'todas') => {
    setFilterStage(st);
    const match = INITIAL_PROPOSALS.find(p => st === 'todas' || p.educationStage === st);
    if (match) {
      setCurrentProposal(match);
      setCustomTitle(match.title);
      setCustomSteps(match.steps);
    }
  };

  const updateProposalRecommendation = (comp: string, content: string, tech: string, stage: EducationStage | 'todas') => {
    // 1. Try to find exact match in pre-built proposals
    const found = INITIAL_PROPOSALS.find(p => 
      p.curricularComponent === comp && (stage === 'todas' || p.educationStage === stage || p.educationStage === 'todas')
    );

    if (found) {
      setCurrentProposal(found);
      setCustomTitle(found.title);
      setCustomSteps(found.steps);
      return;
    }

    // 2. Generate customized proposal tailored to the stage & period!
    const effectiveStage = stage !== 'todas' ? stage : 'medio';
    const chosenTechObj = tech !== 'auto' 
      ? TECHNOLOGIES.find(t => t.id === tech) 
      : TECHNOLOGIES[Math.floor(Math.random() * TECHNOLOGIES.length)];

    let targetYearStr = 'Ensino Médio';
    let step1 = `Apresentação de uma situação-problema cotidiana conectando ${content} à realidade.`;
    let step2 = `Estudantes em ${selectedFormat} utilizam ${chosenTechObj?.name} para investigar, simular ou prototipar a solução.`;
    let step3 = 'Socialização dos resultados e fechamento pedagógico formalizando os conceitos.';

    if (effectiveStage === 'infantil') {
      targetYearStr = 'Educação Infantil (3 a 5 anos)';
      step1 = `Roda de acolhimento e contação de história lúdica sobre ${content} despertando a imaginação das crianças.`;
      step2 = `Pequenos grupos interagem de forma tátil e guiada com ${chosenTechObj?.name} explorando cores, sons e formas.`;
      step3 = 'Dança, cantiga ou registro fotográfico coletivo valorizando a expressão de cada criança.';
    } else if (effectiveStage === 'fundamental1') {
      targetYearStr = '3º ao 5º Ano do Ensino Fundamental';
      step1 = `Desafio misterioso em quadrinhos ou jogo introdutório sobre ${content}.`;
      step2 = `Em duplas, as crianças montam, calculam ou criam no ${chosenTechObj?.name} com apoio passo a passo do professor.`;
      step3 = 'Mural de exibição na sala com troca de elogios entre as duplas sobre as soluções encontradas.';
    } else if (effectiveStage === 'fundamental2') {
      targetYearStr = '6º ao 9º Ano do Ensino Fundamental';
      step1 = `Enigma STEAM do mundo real: como ${content} afeta nossa cidade e comunidade?`;
      step2 = `Equipes investigam dados ou programam sensores com ${chosenTechObj?.name} testando hipóteses colaborativas.`;
      step3 = 'Debate simulado e síntese em painel digital destacando as descobertas da turma.';
    } else if (effectiveStage === 'eja_tecnico') {
      targetYearStr = 'EJA e Educação Profissional / Técnico';
      step1 = `Conexão imediata com o mundo do trabalho, mercado e vida adulta envolvendo ${content}.`;
      step2 = `Aplicação direta em bancada ou simulação prática com ${chosenTechObj?.name} para resolver gargalos reais.`;
      step3 = 'Elaboração de um plano de ação ou relatório executivo aplicável na rotina dos estudantes.';
    }

    const generated: CurricularProposal = {
      id: `prop-gen-${Date.now()}`,
      title: `Missão: ${content} com ${chosenTechObj?.name || 'Tecnologia SESI'}`,
      curricularComponent: comp,
      educationStage: effectiveStage,
      suitablePeriods: ['matutino', 'vespertino', 'noturno', 'integral'],
      content: content,
      objective: selectedObjective,
      targetYear: targetYearStr,
      durationClasses: selectedDuration,
      recommendedTechId: chosenTechObj?.id || 'tablets',
      techName: chosenTechObj?.name || 'Tablets Educacionais',
      classFormat: selectedFormat,
      imageUrl: chosenTechObj?.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      description: `Proposta estruturada especialmente para estudantes de ${targetYearStr}. Os estudantes exploram ${content} através de metodologia ativa e ${chosenTechObj?.name || 'tecnologia educacional'}.`,
      steps: [
        { stage: 'Abertura & Contextualização (15 min)', duration: '15 min', action: step1 },
        { stage: 'Mão na Massa com Tecnologia (45 min)', duration: '45 min', action: step2 },
        { stage: 'Síntese Coletiva & Avaliação (30 min)', duration: '30 min', action: step3 }
      ],
      evaluationSuggestion: `Avaliação formativa acolhedora observando o processo de exploração, trabalho coletivo e raciocínio lógico em torno de ${content}.`
    };

    setCurrentProposal(generated);
    setCustomTitle(generated.title);
    setCustomSteps(generated.steps);
  };

  const handleSelectPrebuiltProposal = (prop: CurricularProposal) => {
    setCurrentProposal(prop);
    setCustomTitle(prop.title);
    setCustomSteps(prop.steps);
    setSelectedComponent(prop.curricularComponent);
    setSelectedContent(prop.content);
    showNotice(`Proposta "${prop.title}" carregada com sucesso!`);
  };

  const handleSaveCustomization = () => {
    const updated: CurricularProposal = {
      ...currentProposal,
      title: customTitle,
      steps: customSteps,
      durationClasses: selectedDuration,
      classFormat: selectedFormat,
      isCustomized: true
    };
    setCurrentProposal(updated);
    setIsEditing(false);
    showNotice('Proposta personalizada salva com sucesso!');
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* ACTIVE CLASS SELECTION BANNER */}
      {user?.classes && user.classes.length > 0 && (
        <div className="bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Active class info */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Turma Ativa para este Planejamento:
                  </span>
                  <span className="text-sm font-black text-white px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                    {activeClass?.name || 'Turma Principal'}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                    {EDUCATION_STAGES.find(s => s.id === activeClass?.stage)?.name || activeClass?.stage}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {SCHOOL_PERIODS.find(p => p.id === activeClass?.period)?.name || activeClass?.period}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Disciplina vinculada: <strong className="text-slate-200">{activeClass?.discipline || 'Geral'}</strong>. As propostas abaixo foram filtradas para este público.
                </p>
              </div>
            </div>

            {/* Quick Switcher among teacher's classes */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold hidden lg:inline">
                Alternar Turma:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {user.classes.map(cls => {
                  const isSelected = cls.id === activeClass?.id;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => handleSelectClass(cls)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                      }`}
                    >
                      {cls.name}
                    </button>
                  );
                })}

                {onOpenClassManager && (
                  <button
                    type="button"
                    onClick={onOpenClassManager}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors cursor-pointer"
                    title="Gerenciar ou adicionar turmas"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Gerenciar</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FILTER TABS BY EDUCATION STAGE */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Filtrar por Etapa de Ensino:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => handleStageFilterChange('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                filterStage === 'todas'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todas as Etapas
            </button>

            {EDUCATION_STAGES.map(st => {
              const isActive = filterStage === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleStageFilterChange(st.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {st.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CURATED PROPOSALS CAROUSEL FOR THIS STAGE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Propostas Prontas para Esta Etapa ({matchingProposals.length}):</span>
          </span>
          <span className="text-[11px] text-slate-400">
            Clique em qualquer uma para carregar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {matchingProposals.map(prop => {
            const isCurrent = currentProposal.id === prop.id;
            const stageInfo = EDUCATION_STAGES.find(s => s.id === prop.educationStage);

            return (
              <div
                key={prop.id}
                onClick={() => handleSelectPrebuiltProposal(prop)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left overflow-hidden ${
                  isCurrent
                    ? 'bg-red-50 dark:bg-red-950/30 border-red-500 ring-2 ring-red-500/20 shadow-xs'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  {prop.imageUrl && (
                    <div className="relative h-24 -mx-3.5 -mt-3.5 mb-2.5 overflow-hidden rounded-t-xl bg-slate-900">
                      <img 
                        src={prop.imageUrl} 
                        alt={prop.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                        {prop.curricularComponent}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    {!prop.imageUrl && (
                      <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase truncate">
                        {prop.curricularComponent}
                      </span>
                    )}
                    {stageInfo && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0 ml-auto">
                        {stageInfo.name}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {prop.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate">{prop.techName}</span>
                  <span className="shrink-0 font-medium">{prop.durationClasses} aula(s)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PARAMETERS FORM */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gerador Pedagógico • Personalização Sob Medida</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Ajustar Parâmetros da Aula
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
              Altere os campos abaixo para o SESI TEC adaptar automaticamente o roteiro da aula.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-xs font-semibold flex items-center gap-2 cursor-pointer self-start md:self-auto"
            title="Imprimir plano de aula"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir Ficha</span>
          </button>
        </div>

        {/* Dynamic Filters Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60">
          {/* Componente Curricular */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              1. Disciplina / Componente
            </label>
            <select
              value={selectedComponent}
              onChange={(e) => handleComponentChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              {CURRICULAR_COMPONENTS.map(comp => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          {/* Conteúdo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              2. Conteúdo ou Campo Temático
            </label>
            <select
              value={selectedContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              {availableContents.map(cnt => (
                <option key={cnt} value={cnt}>{cnt}</option>
              ))}
            </select>
          </div>

          {/* Objetivo Pedagógico */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              3. Objetivo da Aula
            </label>
            <select
              value={selectedObjective}
              onChange={(e) => {
                setSelectedObjective(e.target.value);
                updateProposalRecommendation(selectedComponent, selectedContent, selectedTech, filterStage);
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="Investigar e relacionar com situações reais">Investigar e explorar na prática</option>
              <option value="Construir protótipo ou artefato em grupo">Construir ou prototipar artefato</option>
              <option value="Simular fenômenos complexos em escala digital">Simular fenômenos com tecnologia</option>
              <option value="Debater e produzir síntese argumentativa">Debater e produzir conteúdo autoral</option>
              <option value="Sensibilização lúdica e expressão corporal">Sensibilização lúdica e expressão</option>
            </select>
          </div>

          {/* Tempo Disponível */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              4. Duração da Atividade
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value={1}>1 aula / momento (50 minutos)</option>
              <option value={2}>2 aulas geminadas (100 minutos)</option>
              <option value={3}>3 aulas / Projeto temático (150 minutos)</option>
            </select>
          </div>

          {/* Formato da Turma */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              5. Formato de Organização
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="duplas">Em Duplas colaborativas</option>
              <option value="grupos">Em Grupos de 3 a 5 estudantes</option>
              <option value="coletivo">Roda Coletiva com Telão / Projetor</option>
              <option value="individual">Individual com dispositivos</option>
            </select>
          </div>

          {/* Tecnologia Preferida */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              6. Equipamento SESI
            </label>
            <select
              value={selectedTech}
              onChange={(e) => {
                setSelectedTech(e.target.value);
                updateProposalRecommendation(selectedComponent, selectedContent, e.target.value, filterStage);
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="auto">✨ Aberto a Sugestões SESI TEC</option>
              {TECHNOLOGIES.map(tech => (
                <option key={tech.id} value={tech.id}>{tech.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SUGGESTED PROPOSAL DETAILS CARD */}
      <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-md transition-all overflow-hidden">
        {/* Visual Header of Selected Proposal */}
        {(() => {
          const matchedTech = TECHNOLOGIES.find(
            t => t.id === currentProposal.recommendedTechId || 
                 (t.name && currentProposal.techName && (
                   t.name.toLowerCase().includes(currentProposal.techName.toLowerCase()) ||
                   currentProposal.techName.toLowerCase().includes(t.name.toLowerCase())
                 ))
          );
          const displayImg = currentProposal.imageUrl || matchedTech?.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
          return (
            <div className="relative h-44 sm:h-52 -mx-6 -mt-6 mb-6 overflow-hidden bg-slate-900">
              <img 
                src={displayImg} 
                alt={currentProposal.title}
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
                  {currentProposal.curricularComponent}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                  {currentProposal.techName}
                </span>
              </div>
            </div>
          );
        })()}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Proposta Pedagógica Selecionada
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {currentProposal.targetYear}
              </span>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full text-xl font-bold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-900 dark:text-white"
              />
            ) : (
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentProposal.title}
              </h3>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              {currentProposal.durationClasses} {currentProposal.durationClasses === 1 ? 'aula' : 'aulas'} ({currentProposal.durationClasses * 50} min)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <Wrench className="w-3.5 h-3.5" />
              {currentProposal.techName}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed my-4">
          {currentProposal.description}
        </p>

        {/* Steps Grid */}
        <div className="my-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Roteiro Passo a Passo da Aula:</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {customSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">
                      Etapa {idx + 1}: {step.stage}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {step.duration}
                    </span>
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={step.action}
                      onChange={(e) => {
                        const newSteps = [...customSteps];
                        newSteps[idx].action = e.target.value;
                        setCustomSteps(newSteps);
                      }}
                      className="w-full text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-2 mt-1"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step.action}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation note */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Sugestão de Avaliação Formativa Acolhedora:</strong>
            <span>{currentProposal.evaluationSuggestion}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveCustomization}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all text-sm cursor-pointer shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Minha Versão Adaptada</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Personalizar Detalhes desta Proposta</span>
              </button>
            )}
          </div>

          <button
            id="btn-apply-proposal"
            type="button"
            onClick={() => onApplyProposal(currentProposal)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 active:scale-98 transition-all shadow-md text-sm sm:text-base cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Utilizei / Vou Aplicar Esta Aula!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
