import { 
  AvatarOption, 
  DiagnosticQuestion, 
  ProfileDefinition, 
  Technology, 
  CurricularProposal, 
  Mission,
  EducationStage,
  SchoolPeriod
} from '../types';
import { SESI_OFFICIAL_PROPOSALS } from './sesiProposals';

export const EDUCATION_STAGES: {
  id: EducationStage;
  label: string;
  name: string;
  ageRange: string;
  ageGroup: string;
  badge: string;
  description: string;
  defaultDisciplines: string[];
}[] = [
  {
    id: 'infantil',
    label: 'Educação Infantil',
    name: 'Educação Infantil',
    ageRange: '0 a 5 anos',
    ageGroup: '0 a 5 anos',
    badge: 'Infantil',
    description: 'Foco na ludicidade, campos de experiências da BNCC, sensorialidade, cooperação e primeiras descobertas.',
    defaultDisciplines: [
      'Campos de Experiência / Polivalente',
      'Contação de Histórias & Paisagens Sonoras',
      'Espaços, Tempos, Quantidades e Formas',
      'Corpo, Gestos e Movimentos',
      'Exploração Tátil & Primeiras Construções'
    ]
  },
  {
    id: 'fundamental1',
    label: 'Ensino Fundamental I (Anos Iniciais)',
    name: 'Ensino Fundamental I (Anos Iniciais)',
    ageRange: '1º ao 5º ano • 6 a 10 anos',
    ageGroup: '1º ao 5º ano • 6 a 10 anos',
    badge: 'Fund. I',
    description: 'Alfabetização, letramento matemático, curiosidade investigativa, primeiros passos maker e pensamento computacional.',
    defaultDisciplines: [
      'Polivalente / Alfabetização',
      'Matemática',
      'Língua Portuguesa',
      'Ciências da Natureza',
      'História e Geografia',
      'Arte e Expressão',
      'Robótica Maker & STEAM'
    ]
  },
  {
    id: 'fundamental2',
    label: 'Ensino Fundamental II (Anos Finais)',
    name: 'Ensino Fundamental II (Anos Finais)',
    ageRange: '6º ao 9º ano • 11 a 14 anos',
    ageGroup: '6º ao 9º ano • 11 a 14 anos',
    badge: 'Fund. II',
    description: 'Aprofundamento conceitual, projetos interdisciplinares, pensamento crítico, argumentação e resolução autônoma de problemas.',
    defaultDisciplines: [
      'Matemática',
      'Língua Portuguesa',
      'Ciências',
      'História',
      'Geografia',
      'Artes',
      'Inglês',
      'Robótica & Programação em Blocos',
      'Educação Física'
    ]
  },
  {
    id: 'medio',
    label: 'Ensino Médio',
    name: 'Ensino Médio',
    ageRange: '1º ao 3º ano • 15 a 18 anos',
    ageGroup: '1º ao 3º ano • 15 a 18 anos',
    badge: 'Ensino Médio',
    description: 'Preparação para o mundo do trabalho, vestibulares, iniciação científica, itinerários formativos e autonomia intelectual.',
    defaultDisciplines: [
      'Matemática',
      'Física',
      'Química',
      'Biologia',
      'Língua Portuguesa',
      'Literatura & Redação',
      'História',
      'Geografia',
      'Filosofia & Sociologia',
      'Inglês',
      'Robótica Industrial & Automação',
      'Itinerário Formativo SESI'
    ]
  },
  {
    id: 'eja_tecnico',
    label: 'EJA & Educação Profissional',
    name: 'EJA & Educação Profissional',
    ageRange: 'Jovens e Adultos',
    ageGroup: 'Jovens e Adultos',
    badge: 'EJA / Técnico',
    description: 'Educação contextualizada com a vida adulta, requalificação produtiva, tecnologia aplicada ao trabalho e cidadania.',
    defaultDisciplines: [
      'Matemática Aplicada',
      'Comunicação & Redação Profissional',
      'Tecnologia da Informação & Ferramentas Digitais',
      'Automação & Indústria 4.0',
      'Ciências e Sustentabilidade no Trabalho',
      'Sociedade, Trabalho e Cidadania'
    ]
  }
];

export const SCHOOL_PERIODS: {
  id: SchoolPeriod;
  label: string;
  name: string;
  turnName: string;
  timeRange: string;
  badgeColor: string;
  characteristics: string;
}[] = [
  {
    id: 'matutino',
    label: 'Matutino (Manhã)',
    name: 'Matutino (Manhã)',
    turnName: 'Manhã',
    timeRange: 'Manhã (07h às 12h)',
    badgeColor: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300',
    characteristics: 'Excelente para rotação por estações, raciocínio lógico e momentos de maior foco intelectual.'
  },
  {
    id: 'vespertino',
    label: 'Vespertino (Tarde)',
    name: 'Vespertino (Tarde)',
    turnName: 'Tarde',
    timeRange: 'Tarde (13h às 18h)',
    badgeColor: 'bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-300',
    characteristics: 'Ritmo ativo com prototipagem maker, atividades práticas em grupo e recursos dinâmicos para manter alto o engajamento.'
  },
  {
    id: 'noturno',
    label: 'Noturno (Noite)',
    name: 'Noturno (Noite)',
    turnName: 'Noite',
    timeRange: 'Noite (18h30 às 22h30)',
    badgeColor: 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border-indigo-300',
    characteristics: 'Aulas objetivas, práticas diretas ao ponto, com foco em aplicabilidade para alunos trabalhadores e EJA.'
  },
  {
    id: 'integral',
    label: 'Tempo Integral',
    name: 'Tempo Integral',
    turnName: 'Integral',
    timeRange: 'Integral (08h às 17h)',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300',
    characteristics: 'Espaço ideal para projetos de longo fôlego STEAM, experimentos científicos aprofundados e ateliês criativos.'
  }
];

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'av-explorador',
    name: 'Personagem Explorador',
    role: 'Arquétipo de Descobertas',
    color: 'emerald',
    iconName: 'Compass',
    description: 'Adora trilhar novos caminhos, metodologias ativas e experimentar com curiosidade.'
  },
  {
    id: 'av-criador',
    name: 'Personagem Criador Maker',
    role: 'Arquétipo Mão na Massa',
    color: 'sky',
    iconName: 'Hammer',
    description: 'Gosta de prototipagem física, transformar conceitos em objetos e cultura maker.'
  },
  {
    id: 'av-estrategista',
    name: 'Personagem Estrategista',
    role: 'Arquétipo de Planejamento',
    color: 'amber',
    iconName: 'LayoutGrid',
    description: 'Valoriza planejamento claro, etapas sequenciais, alinhamento BNCC e objetivos nítidos.'
  },
  {
    id: 'av-investigador',
    name: 'Personagem Investigador',
    role: 'Arquétipo Científico',
    color: 'indigo',
    iconName: 'Search',
    description: 'Apaixonado por testes práticos com sensores, simulações e verificação de hipóteses.'
  },
  {
    id: 'av-narrador',
    name: 'Personagem Comunicador',
    role: 'Arquétipo Narrativo & Mídias',
    color: 'rose',
    iconName: 'BookOpen',
    description: 'Conecta turmas por meio de narrativas, estúdio de gravação, podcasts e projetos coletivos.'
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: 'Quando você pensa em preparar uma nova aula, o que mais acende sua motivação?',
    subtitle: 'Escolha a opção que mais se aproxima do seu estilo natural de ensinar:',
    options: [
      {
        text: 'Navegar por ideias inusitadas e descobrir recursos novos para surpreender a turma.',
        description: 'Foco na curiosidade, inovação e exploração sem amarras.',
        profile: 'explorador',
        icon: 'Compass'
      },
      {
        text: 'Propor projetos práticos onde os alunos construam protótipos ou produtos concretos.',
        description: 'Foco em fazer com as mãos, testar materiais e criar artefatos.',
        profile: 'criador',
        icon: 'Hammer'
      },
      {
        text: 'Estruturar um roteiro muito bem organizado, com tempos, etapas e metas claras.',
        description: 'Foco em clareza metodológica, assertividade e previsibilidade pedagógica.',
        profile: 'estrategista',
        icon: 'ClipboardList'
      },
      {
        text: 'Lançar enigmas, problemas investigativos e simulações para os estudantes resolverem.',
        description: 'Foco em análise crítica, testes de hipóteses e investigação.',
        profile: 'investigador',
        icon: 'Microscope'
      },
      {
        text: 'Construir uma narrativa envolvente, conectando o conteúdo a histórias e vivências.',
        description: 'Foco em diálogo, empatia, recursos audiovisuais e impacto emocional.',
        profile: 'narrador',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: 2,
    question: 'Ao utilizar uma nova tecnologia na sala de aula, qual sensação você prefere ter?',
    subtitle: 'Como você se sente mais confortável e acolhido ao dar seus passos:',
    options: [
      {
        text: 'A sensação de desbravar um território fértil, aprendendo junto com meus alunos.',
        description: 'Abertura ao imprevisto saudável e à descoberta conjunta.',
        profile: 'explorador',
        icon: 'Map'
      },
      {
        text: 'A sensação de estar em uma oficina maker ou ateliê de criação autêntica.',
        description: 'Espaço vivo onde erros geram novos protótipos e ideias.',
        profile: 'criador',
        icon: 'Wrench'
      },
      {
        text: 'A segurança de que o recurso otimiza o tempo da aula e garante o foco no currículo.',
        description: 'Tecnologia a serviço de um planejamento fluido e sem desperdício de tempo.',
        profile: 'estrategista',
        icon: 'Target'
      },
      {
        text: 'O rigor de simular fenômenos difíceis de ver a olho nu com precisão científica.',
        description: 'Tecnologia como lente analítica que amplia a visão dos fenômenos.',
        profile: 'investigador',
        icon: 'Activity'
      },
      {
        text: 'O poder de dar voz aos estudantes para que expressem suas próprias narrativas.',
        description: 'Tecnologia como meio de expressão, podcast, vídeo ou debate.',
        profile: 'narrador',
        icon: 'MessageSquare'
      }
    ]
  },
  {
    id: 3,
    question: 'Qual formato de atividade mais combina com o ritmo das suas turmas?',
    subtitle: 'Pense no tipo de movimento que você mais gosta de orquestrar na aula:',
    options: [
      {
        text: 'Estações de rotação onde cada grupo desbrava uma pista ou aplicativo diferente.',
        description: 'Dinâmica com movimento e autonomia dos estudantes.',
        profile: 'explorador',
        icon: 'Navigation'
      },
      {
        text: 'Desafio Maker em grupos: montagem de robôs, maquetes ou infográficos interativos.',
        description: 'Produção em equipes com divisão de papéis criativos.',
        profile: 'criador',
        icon: 'Cpu'
      },
      {
        text: 'Sequência didática guiada com rubrica de avaliação e autoavaliação clara.',
        description: 'Critérios transparentes que dão tranquilidade aos estudantes.',
        profile: 'estrategista',
        icon: 'CheckSquare'
      },
      {
        text: 'Estudo de caso e laboratório com dados reais, gráficos e conclusões embasadas.',
        description: 'Método científico vivo aplicado ao mundo cotidiano.',
        profile: 'investigador',
        icon: 'Database'
      },
      {
        text: 'Produção audiovisual, debates simulados ou painel de murais colaborativos.',
        description: 'Criação de histórias, argumentos e sínteses visuais.',
        profile: 'narrador',
        icon: 'Film'
      }
    ]
  },
  {
    id: 4,
    question: 'Se pudesse escolher um parceiro digital para apoiar sua aula amanhã, o que pediria?',
    subtitle: 'A tecnologia ideal para o seu momento presente:',
    options: [
      {
        text: 'Um radar que me mostre ideias inovadoras que outros professores pelo mundo usam.',
        description: 'Inspiração contínua e novas possibilidades.',
        profile: 'explorador',
        icon: 'Compass'
      },
      {
        text: 'Um kit de blocos ou materiais prontos para os alunos construírem em 50 minutos.',
        description: 'Recursos rápidos que evitam perder tempo de montagem.',
        profile: 'criador',
        icon: 'Box'
      },
      {
        text: 'Um plano de aula pronto e estruturado que se encaixe perfeitamente no meu cronograma.',
        description: 'Previsibilidade, objetivos BNCC e facilidade de aplicação.',
        profile: 'estrategista',
        icon: 'Calendar'
      },
      {
        text: 'Um simulador digital interativo para demonstrar com facilidade fórmulas ou teorias.',
        description: 'Visualização de conceitos abstratos de forma intuitiva.',
        profile: 'investigador',
        icon: 'Sliders'
      },
      {
        text: 'Ferramentas de engajamento visual para prender a atenção e gerar discussões ricas.',
        description: 'Estética acolhedora, storytelling e comunicação clara.',
        profile: 'narrador',
        icon: 'Smile'
      }
    ]
  }
];

export const PROFILE_DEFINITIONS: Record<string, ProfileDefinition> = {
  explorador: {
    type: 'explorador',
    title: 'Professor Explorador',
    evolutionTitle: 'Explorador Visionário',
    badge: '🧭 Bússola de Descobertas',
    motto: 'Aprender é uma expedição contínua.',
    welcomeMessage: 'Sua curiosidade pedagógica abre caminhos onde seus alunos ganham coragem para desbravar o desconhecido.',
    description: 'Você se destaca pela vontade de inovar, pela flexibilidade e por ver cada aula como uma oportunidade de aventura do saber.',
    themeColor: {
      primary: 'emerald-600',
      secondary: 'emerald-500',
      bgLight: 'bg-emerald-50/50',
      border: 'border-emerald-200',
      accent: 'text-emerald-700',
      gradient: 'from-emerald-600 to-teal-700'
    },
    layoutStyle: 'map',
    recommendedTechs: ['tablets', 'vr-oculos', 'ia-educacional', 'plataformas-colab']
  },
  criador: {
    type: 'criador',
    title: 'Professor Criador',
    evolutionTitle: 'Mestre da Prototipagem',
    badge: '🔨 Engrenagem Criativa',
    motto: 'Pensar com as mãos transforma ideias em realidade.',
    welcomeMessage: 'Sua aula tem a energia de uma oficina viva, onde a teoria ganha corpo, cor, movimento e sentido prático.',
    description: 'Você gosta de transformar conceitos abstratos em objetos palpáveis, incentivando o protagonismo autêntico da turma.',
    themeColor: {
      primary: 'sky-600',
      secondary: 'sky-500',
      bgLight: 'bg-sky-50/50',
      border: 'border-sky-200',
      accent: 'text-sky-700',
      gradient: 'from-sky-600 to-cyan-700'
    },
    layoutStyle: 'workshop',
    recommendedTechs: ['lego-spike', 'braco-robotico', 'notebooks', 'maker-kit']
  },
  estrategista: {
    type: 'estrategista',
    title: 'Professor Estrategista',
    evolutionTitle: 'Arquiteto Pedagógico',
    badge: '📐 Régua de Precisão',
    motto: 'Bons roteiros geram aprendizagens consistentes.',
    welcomeMessage: 'Sua clareza e organização constroem pontes sólidas onde nenhum aluno fica para trás por falta de rumo.',
    description: 'Você planeja com cuidado cada etapa, aproveitando ao máximo cada minuto letivo e alinhando tecnologia a objetivos precisos.',
    themeColor: {
      primary: 'amber-600',
      secondary: 'amber-500',
      bgLight: 'bg-amber-50/50',
      border: 'border-amber-200',
      accent: 'text-amber-700',
      gradient: 'from-amber-600 to-orange-700'
    },
    layoutStyle: 'planner',
    recommendedTechs: ['notebooks', 'plataformas-colab', 'ia-educacional', 'tablets']
  },
  investigador: {
    type: 'investigador',
    title: 'Professor Investigador',
    evolutionTitle: 'Cientista Educacional',
    badge: '🔬 Lente da Evidência',
    motto: 'Grandes perguntas movem a ciência.',
    welcomeMessage: 'Seu olhar investigativo ensina aos jovens a arte de questionar dados, levantar hipóteses e buscar evidências reais.',
    description: 'Você prefere tecnologias que permitam simular, medir, coletar e analisar fenômenos, tornando a ciência evidente e viva.',
    themeColor: {
      primary: 'indigo-600',
      secondary: 'indigo-500',
      bgLight: 'bg-indigo-50/50',
      border: 'border-indigo-200',
      accent: 'text-indigo-700',
      gradient: 'from-indigo-600 to-purple-700'
    },
    layoutStyle: 'lab',
    recommendedTechs: ['notebooks', 'tablets', 'braco-robotico', 'ia-educacional']
  },
  narrador: {
    type: 'narrador',
    title: 'Professor Narrador',
    evolutionTitle: 'Curador de Narrativas',
    badge: '✨ Pena da Comunicação',
    motto: 'O conhecimento vive nas histórias que compartilhamos.',
    welcomeMessage: 'Sua capacidade de envolver e dar voz aos estudantes transforma qualquer tema complexo em uma jornada emocionante.',
    description: 'Você valoriza a empatia, o diálogo, o audiovisual e a reflexão crítica, usando ferramentas digitais para amplificar a expressão.',
    themeColor: {
      primary: 'rose-600',
      secondary: 'rose-500',
      bgLight: 'bg-rose-50/50',
      border: 'border-rose-200',
      accent: 'text-rose-700',
      gradient: 'from-rose-600 to-pink-700'
    },
    layoutStyle: 'story',
    recommendedTechs: ['audiovisual-podcast', 'vr-oculos', 'plataformas-colab', 'tablets']
  }
};

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'impressora-3d',
    name: 'Impressora 3D (MakerBot / GTMax)',
    subtitle: 'Prototipagem física, modelos táteis e engenharia 3D',
    category: 'robotica',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Prototipagem tridimensional tangível para materializar criações no Tinkercad, modelos atômicos, células, mapas táteis e peças mecânicas.',
    pedagogicalBenefits: ['Materialização de conceitos abstratos', 'Raciocínio espacial e tridimensional', 'Engenharia maker e design thinking'],
    preparationTimeMinutes: 15,
    difficultyLevel: 'Passo a Passo Guiado',
    icon: 'Boxes',
    unitAvailableCount: 4,
    tags: ['Impressão 3D', 'Maker', 'Tinkercad', 'Modelagem', 'Ciências'],
    tipsForTeachers: 'Envie o arquivo .STL para o ATE antecipadamente para fatiamento e verificação do filamento.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'labdisc',
    name: 'Laboratório Portátil LabDisc (Biochem & Gensci)',
    subtitle: 'Sensores de pH, temperatura, oxigênio dissolvido e som',
    category: 'computacao',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Dispositivo compacto com múltiplos sensores digitais calibrados para medições em tempo real de fenômenos físicos, químicos e biológicos.',
    pedagogicalBenefits: ['Letramento científico empírico', 'Gráficos automáticos na tela', 'Investigação e formulação de hipóteses'],
    preparationTimeMinutes: 10,
    difficultyLevel: 'Muito Acessível',
    icon: 'Boxes',
    unitAvailableCount: 12,
    tags: ['Sensores', 'Ciências', 'Biologia', 'Física', 'Química', 'Água'],
    tipsForTeachers: 'Conecte o LabDisc via Bluetooth ao tablet ou notebook com o GlobiLab projetado na tela para a turma acompanhar.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'vr-oculos',
    name: 'Óculos de Realidade Virtual (VR)',
    subtitle: 'Imersão 360° em museus, espaço cósmico e ecossistemas',
    category: 'imersao',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    description: 'Experiências imersivas 360° para visitas virtuais a sítios históricos, órgãos do corpo humano, fundo do mar e viagens espaciais.',
    pedagogicalBenefits: ['Impacto emocional e fixação imediata', 'Visualização de espaços inacessíveis ao olho humano', 'Memória de longo prazo'],
    preparationTimeMinutes: 10,
    difficultyLevel: 'Passo a Passo Guiado',
    icon: 'Glasses',
    unitAvailableCount: 8,
    tags: ['Imersão 360°', 'Ciências', 'Geografia', 'História', 'Artes'],
    tipsForTeachers: 'Use em formato de ilha ou rodízio de 5 a 7 minutos por estudante, enquanto os outros registram as impressões.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'estudio',
    name: 'Estúdio de Gravação & Chroma Key',
    subtitle: 'Produção audiovisual, telejornais escolares e cantigas',
    category: 'audiovisual',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'Espaço com iluminação softbox, fundo verde (Chroma Key) e microfones para gravação de telejornais, documentários e videocasts.',
    pedagogicalBenefits: ['Oratória e comunicação multimídia', 'Trabalho em equipe com divisão de funções', 'Criatividade e síntese textual'],
    preparationTimeMinutes: 15,
    difficultyLevel: 'Passo a Passo Guiado',
    icon: 'Mic',
    unitAvailableCount: 2,
    tags: ['Chroma Key', 'Vídeo', 'Telejornal', 'Comunicação', 'Artes'],
    tipsForTeachers: 'Peça aos alunos que não usem roupas verdes no dia da gravação para permitir a correta aplicação dos cenários.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'tablets',
    name: 'Tablets Educacionais',
    subtitle: 'Pesquisa ativa, leitura digital, simuladores e desenho tátil',
    category: 'colaboracao',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'Dispositivos táteis individuais ou em duplas para exploração sensorial, pesquisa rápida, mapas conceituais e simuladores PhET.',
    pedagogicalBenefits: ['Mobilidade e dinamismo em sala', 'Respostas visuais e táteis imediatas', 'Acesso fácil a simuladores e formulários'],
    preparationTimeMinutes: 5,
    difficultyLevel: 'Muito Acessível',
    icon: 'Tablet',
    unitAvailableCount: 32,
    tags: ['Pesquisa', 'Interatividade', 'PhET', 'Forms', 'Gamificação'],
    tipsForTeachers: 'Deixe os tablets já na rede Wi-Fi da escola com os links salvos em favoritos ou via QR Code no quadro.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'projetor-chromecast',
    name: 'Projetor & Chromecast',
    subtitle: 'Espelhamento sem fio, apresentações interativas e performances',
    category: 'audiovisual',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    description: 'Sistema de transmissão audiovisual sem fio permitindo que professores e grupos de estudantes transmitam suas telas para debate imediato.',
    pedagogicalBenefits: ['Espelhamento ágil sem cabos', 'Apresentação coletiva', 'Performances audiovisuais ao vivo'],
    preparationTimeMinutes: 5,
    difficultyLevel: 'Muito Acessível',
    icon: 'Laptop',
    unitAvailableCount: 14,
    tags: ['Projeção', 'Chromecast', 'Performance', 'Apresentação'],
    tipsForTeachers: 'Permita que os grupos alternem a transmissão de seus dispositivos para apresentações relâmpago dinâmicas.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'braco-robotico',
    name: 'Braço Robótico Colaborativo (Universal Robots)',
    subtitle: 'Automação industrial 4.0, IHM e cinemática cartesiana',
    category: 'robotica',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Equipamento didático que replica a automação industrial moderna (indústria 4.0), operando com coordenadas cartesianas e controle milimétrico.',
    pedagogicalBenefits: ['Conexão direta com o mundo do trabalho', 'Coordenadas cartesianas reais', 'Automação aplicada e logística'],
    preparationTimeMinutes: 15,
    difficultyLevel: 'Desafio Estimulante',
    icon: 'Bot',
    unitAvailableCount: 2,
    tags: ['Indústria 4.0', 'Matemática', 'Física', 'Logística', 'IHM'],
    tipsForTeachers: 'Uma demonstração guiada pelo professor ou ATE antes de passar o controle aos alunos gera fascínio instantâneo.',
    suitableStages: ['fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'lego-spike',
    name: 'Kits LEGO Education SPIKE Prime & Essential',
    subtitle: 'Construção mecânica, sensores e programação em blocos',
    category: 'robotica',
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80',
    description: 'Conjuntos modulares de robótica com sensores de cor, motores inteligentes e programação visual por blocos para desafios STEAM em todas as idades.',
    pedagogicalBenefits: ['Pensamento computacional desde cedo', 'Resolução prática de desafios em equipe', 'Engenharia e mecânica viva'],
    preparationTimeMinutes: 15,
    difficultyLevel: 'Passo a Passo Guiado',
    icon: 'Boxes',
    unitAvailableCount: 16,
    tags: ['Robótica', 'Mão na Massa', 'STEAM', 'Mecânica'],
    tipsForTeachers: 'Peça auxílio ao ATE para deixar as caixas organizadas por cor e as baterias carregadas com antecedência.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio']
  },
  {
    id: 'notebooks',
    name: 'Notebooks / Chromebooks',
    subtitle: 'Redação, programação, planilhas e simuladores',
    category: 'computacao',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Equipamentos completos para redação de relatórios, planilhas, programação em blocos e navegação em simuladores avançados.',
    pedagogicalBenefits: ['Digitação rápida e fluida', 'Ambiente multitarefa estruturado', 'Compatibilidade total com simuladores científicos e editores'],
    preparationTimeMinutes: 8,
    difficultyLevel: 'Muito Acessível',
    icon: 'Laptop',
    unitAvailableCount: 36,
    tags: ['Redação', 'Simulação', 'Pesquisa', 'Planilhas'],
    tipsForTeachers: 'Ideal para trabalhos que exigem mais de uma fonte de consulta aberta simultaneamente ou cálculos estruturados.',
    suitableStages: ['fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  },
  {
    id: 'audiovisual-podcast',
    name: 'Kit Podcast e Produção Audiovisual',
    subtitle: 'Microfones condensadores, ring light e gravação oral',
    category: 'audiovisual',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    description: 'Microfones condensadores, iluminação ring light, fones de ouvido e aplicativos intuitivos de gravação para dar voz ativa aos estudantes.',
    pedagogicalBenefits: ['Oratória, escuta ativa e argumentação', 'Expressão autoral e registro de vivências', 'Trabalho colaborativo com papéis claros'],
    preparationTimeMinutes: 10,
    difficultyLevel: 'Passo a Passo Guiado',
    icon: 'Mic',
    unitAvailableCount: 6,
    tags: ['Podcast', 'Contação de Histórias', 'Linguagens', 'Debate'],
    tipsForTeachers: 'Divida a turma em roteiristas, locutores, operadores de som e entrevistados para que todos colaborem com gosto.',
    suitableStages: ['infantil', 'fundamental1', 'fundamental2', 'medio', 'eja_tecnico']
  }
];

export const CURRICULAR_COMPONENTS = [
  'Matemática',
  'Língua Portuguesa',
  'Ciências / Biologia',
  'Física',
  'Química',
  'História',
  'Geografia',
  'Arte e Expressão',
  'Robótica & Pensamento Computacional',
  'Campos de Experiência / Polivalente',
  'Filosofia e Sociologia',
  'Inglês',
  'Educação Física',
  'Automação & Indústria 4.0'
];

export const CURRICULAR_CONTENTS: Record<string, string[]> = {
  'Matemática': [
    'Função do 2º grau e Parábolas',
    'Geometria Espacial e Volume',
    'Estatística e Análise de Gráficos',
    'Sistema Monetário e Troco Inteligente',
    'Trigonometria no Triângulo Retângulo',
    'Frações, Proporções e Escalas',
    'Probabilidade e Tomada de Decisão'
  ],
  'Língua Portuguesa': [
    'Gêneros Textuais e Produção de Opinião',
    'Argumentação e Coesão Textual',
    'Fábulas, Contos e Histórias em Quadrinhos',
    'Análise de Notícias e Checagem de Fatos (Fake News)',
    'Variação Linguística e Oralidade',
    'Roteirização de Podcast e Comunicação'
  ],
  'Ciências / Biologia': [
    'Ecossistemas e Cadeias Alimentares',
    'Fisiologia Humana e Sistema Nervoso',
    'Mudanças Climáticas e Sustentabilidade',
    'Diversidade dos Seres Vivos e Insetos',
    'Genética, Células e Biotecnologia',
    'Propriedades da Água e Recursos Naturais'
  ],
  'Física': [
    'Leis de Newton e Força de Atrito',
    'Termodinâmica e Fontes de Energia',
    'Circuitos Elétricos e Consumo Consciente',
    'Óptica, Cores e Refração da Luz',
    'Cinemática e Movimento Retilíneo'
  ],
  'Química': [
    'Tabela Periódica e Ligações Químicas',
    'Cinética Química e Catalisadores',
    'Transformações da Matéria no Cotidiano',
    'Química Orgânica e Polímeros Sustentáveis',
    'Soluções e Misturas'
  ],
  'História': [
    'Revolução Industrial e Mundo do Trabalho',
    'Brasil República, Cidadania e Direitos',
    'Patrimônio Cultural e Memória Coletiva',
    'Guerras Mundiais e Direitos Humanos',
    'Povos Originários e Cultura Afro-Brasileira'
  ],
  'Geografia': [
    'Cartografia Digital e Sensoriamento Remoto',
    'Urbanização e Cidades Sustentáveis',
    'Biomas Brasileiros e Bacias Hidrográficas',
    'Dinâmica Climática e Fenômenos Naturais',
    'Geopolítica e Fronteiras Contemporâneas'
  ],
  'Arte e Expressão': [
    'Criação Visual e Desenho Digital',
    'Paisagens Sonoras e Música com Objetos',
    'Patrimônio Cultural e Museus Virtuais 360°',
    'Teatro de Sombras e Expressão Corporal',
    'Design de Jogos e Animação'
  ],
  'Robótica & Pensamento Computacional': [
    'Mecanismos, Alavancas e Engrenagens',
    'Programação por Blocos Lógicos e Condicionais',
    'Sensores de Luz, Cor e Ultrassom',
    'Automação de Cidades Sustentáveis',
    'Programação de Braço Robótico Articulado'
  ],
  'Campos de Experiência / Polivalente': [
    'Sons da Natureza e Cantigas Populares',
    'Formas Geométricas no Mundo ao Redor',
    'Cores, Luzes e Sombras Mágicas',
    'Identidade, Família e Convivência em Grupo',
    'Contação de Histórias com Fantoches Digitais'
  ],
  'Filosofia e Sociologia': [
    'Ética e Sociedade da Informação',
    'Direitos Humanos e Cidadania Ativa',
    'Mundo do Trabalho e Juventudes',
    'Inteligência Artificial e o Futuro Humano'
  ],
  'Automação & Indústria 4.0': [
    'Sensores Industriais e Automação de Esteiras',
    'Robótica Colaborativa e Segurança do Trabalho',
    'Programação e Controle de Movimento Robótico',
    'Logística Inteligente e Distribuição'
  ]
};

export const INITIAL_PROPOSALS: CurricularProposal[] = [
  ...SESI_OFFICIAL_PROPOSALS,
  // EDUCAÇÃO INFANTIL
  {
    id: 'prop-inf-sons',
    title: 'Pequenos Exploradores: O Som dos Bichos e da Floresta',
    curricularComponent: 'Campos de Experiência / Polivalente',
    educationStage: 'infantil',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Sons da Natureza e Cantigas Populares',
    objective: 'Reconhecer sons do ambiente, imitar timbres da natureza e expressar sentimentos através de gravações afetivas',
    targetYear: 'Educação Infantil (Grupo 4 e 5)',
    durationClasses: 1,
    recommendedTechId: 'audiovisual-podcast',
    techName: 'Microfone Condensador Lúdico + Efeitos Sonoros',
    classFormat: 'coletivo',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    description: 'As crianças ouvem pistas sonoras de animais da floresta, imitam seus sons em frente ao microfone e depois escutam a própria voz com efeitos de eco e chuva na sala, criando uma trilha sonora coletiva.',
    steps: [
      {
        stage: 'Roda de Acolhimento e Escuta (10 min)',
        duration: '10 min',
        action: 'Em roda no tapete, o professor toca sons misteriosos (vento, grilo, sapo, onça) para as crianças adivinharem de olhos fechados.'
      },
      {
        stage: 'Estúdio da Bicharada (25 min)',
        duration: '25 min',
        action: 'Cada criança ou pequeno grupo vai até o microfone fazer o som de seu animal favorito, enquanto o professor grava e reproduz com carinho.'
      },
      {
        stage: 'Dança e Movimento com a Gravação (15 min)',
        duration: '15 min',
        action: 'A turma dança livremente ao som da música da turma recém-gravada, celebrando a participação de todos.'
      }
    ],
    evaluationSuggestion: 'Observação da curiosidade auditiva, prazer em participar e respeito ao momento de fala dos colegas.'
  },
  {
    id: 'prop-inf-lego',
    title: 'Oficina de Casinhas e Pontes Coloridas',
    curricularComponent: 'Campos de Experiência / Polivalente',
    educationStage: 'infantil',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Formas Geométricas no Mundo ao Redor',
    objective: 'Desenvolver coordenação motora fina, noções espaciais e cooperação ao empilhar blocos e criar estruturas',
    targetYear: 'Educação Infantil (3 a 5 anos)',
    durationClasses: 1,
    recommendedTechId: 'lego-spike',
    techName: 'Kits LEGO e Blocos Estruturais',
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    description: 'Desafio lúdico onde as crianças montam pontes e túneis com peças coloridas para que bonequinhos ou carrinhos possam passar por baixo sem derrubar a construção.',
    steps: [
      {
        stage: 'Contação e Enigma (10 min)',
        duration: '10 min',
        action: 'História do barquinho que precisa passar pelo rio. "Como podemos construir uma ponte bem firme para ajudá-lo?"'
      },
      {
        stage: 'Construção em Pequenos Grupos (30 min)',
        duration: '30 min',
        action: 'Em duplas ou trios com as bandejas de blocos, as crianças testam equilíbrios e alturas com apoio do professor.'
      },
      {
        stage: 'Passeio pela Cidade dos Blocos (10 min)',
        duration: '10 min',
        action: 'Toda a turma caminha ao redor das mesas admirando e elogiando a construção dos outros colegas.'
      }
    ],
    evaluationSuggestion: 'Registro fotográfico das estruturas e observação de trocas de peças sem disputas.'
  },

  // ENSINO FUNDAMENTAL I
  {
    id: 'prop-fund1-fabula',
    title: 'Fábula Animada: Nossa História em Quadrinhos Digital',
    curricularComponent: 'Língua Portuguesa',
    educationStage: 'fundamental1',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Fábulas, Contos e Histórias em Quadrinhos',
    objective: 'Criar sequências narrativas com início, meio e fim utilizando personagens e cenários digitais',
    targetYear: '3º ao 5º Ano do Ensino Fundamental',
    durationClasses: 2,
    recommendedTechId: 'tablets',
    techName: 'Tablets Educacionais + App de Quadrinhos',
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes escolhem uma moral clássica (ex: cooperação, honestidade) e criam 4 quadrinhos no tablet inserindo balões de diálogo e personagens desenhados ou fotografados na escola.',
    steps: [
      {
        stage: 'Leitura Dramatizada (15 min)',
        duration: '15 min',
        action: 'Leitura expressiva de uma fábula curta destacando o conflito e a moral da história.'
      },
      {
        stage: 'Roteiro e Desenho nos Tablets (45 min)',
        duration: '45 min',
        action: 'Em duplas, os estudantes criam os 4 quadros arrastando balões de fala, personagens e fundos temáticos.'
      },
      {
        stage: 'Mural Virtual de Quadrinhos (30 min)',
        duration: '30 min',
        action: 'Compartilhamento das historinhas no painel digital para leitura mútua entre os alunos.'
      },
      {
        stage: 'Reconhecimento Coletivo (10 min)',
        duration: '10 min',
        action: 'Cada dupla conta qual foi a fala de personagem mais divertida que inventou.'
      }
    ],
    evaluationSuggestion: 'Critério simples: presença de fala nos balões, ordem cronológica clara e trabalho cooperativo da dupla.'
  },
  {
    id: 'prop-fund1-mercadinho',
    title: 'Mercadinho Matemático e Troco Inteligente',
    curricularComponent: 'Matemática',
    educationStage: 'fundamental1',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Sistema Monetário e Troco Inteligente',
    objective: 'Resolver situações-problema de adição, subtração e cálculo de troco simulando compras em uma planilha interativa',
    targetYear: '4º e 5º Ano do Ensino Fundamental',
    durationClasses: 2,
    recommendedTechId: 'notebooks',
    techName: 'Notebooks + Simulador de Caixa de Mercado',
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    description: 'Um aluno faz o papel de cliente e escolhe produtos alimentícios saudáveis; o outro é o operador de caixa e insere os preços no notebook, calculando o valor total e o troco com cédulas didáticas.',
    steps: [
      {
        stage: 'Desafio do Carrinho de Compras (15 min)',
        duration: '15 min',
        action: 'Apresentação de uma lista de compras para um piquenique saudável na escola com orçamento fixo de R$ 50,00.'
      },
      {
        stage: 'Operação do Mercadinho no Notebook (45 min)',
        duration: '45 min',
        action: 'Duplas alternam os papéis: inserem itens na planilha com fórmulas automáticas de soma e testam o cálculo mental do troco.'
      },
      {
        stage: 'Desafio do Desconto Surpresa (25 min)',
        duration: '25 min',
        action: 'O professor lança um "cupom de desconto de R$ 5,00" e os alunos recalculam rapidamente.'
      },
      {
        stage: 'Reflexão Financeira (15 min)',
        duration: '15 min',
        action: 'Debate sobre escolhas conscientes e produtos mais econômicos.'
      }
    ],
    evaluationSuggestion: 'Verificação da precisão dos cálculos e raciocínio lógico no preenchimento do formulário da compra.'
  },
  {
    id: 'prop-fund1-spike',
    title: 'Mecânica Divertida: Carrossel com Engrenagens LEGO',
    curricularComponent: 'Robótica & Pensamento Computacional',
    educationStage: 'fundamental1',
    suitablePeriods: ['vespertino', 'integral'],
    content: 'Mecanismos, Alavancas e Engrenagens',
    objective: 'Compreender a transmissão de movimento e variação de velocidade através de engrenagens de diferentes tamanhos',
    targetYear: '3º ao 5º Ano do Ensino Fundamental',
    durationClasses: 2,
    recommendedTechId: 'lego-spike',
    techName: 'Kit LEGO SPIKE Essential + Motor Inteligente',
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Equipes montam um brinquedo giratório de parque e testam a relação entre uma engrenagem grande ligada a uma pequena, descobrindo como multiplicar giros com menos esforço.',
    steps: [
      {
        stage: 'Provocação STEAM (15 min)',
        duration: '15 min',
        action: 'O professor mostra duas engrenagens conectadas: "Se eu girar a grande uma vez, quantas voltas a pequenina dará?"'
      },
      {
        stage: 'Montagem Guiada em Equipes (45 min)',
        duration: '45 min',
        action: 'Alunos montam a base mecânica e conectam o motor inteligente com a programação visual em blocos de ícones.'
      },
      {
        stage: 'Teste de Velocidade e Segurança (25 min)',
        duration: '25 min',
        action: 'Ajuste de potência do motor no tablet para verificar o limite sem soltar os bonequinhos passageiros.'
      },
      {
        stage: 'Registro da Descoberta (15 min)',
        duration: '15 min',
        action: 'Cada equipe anota na ficha de engenheiro a razão de engrenagens observada.'
      }
    ],
    evaluationSuggestion: 'Autoavaliação da equipe sobre divisão de tarefas de montagem e funcionamento mecânico do carrossel.'
  },

  // ENSINO FUNDAMENTAL II
  {
    id: 'prop-fund2-vr',
    title: 'Expedição ao Centro da Terra: Tectônica e Vulcões em 360°',
    curricularComponent: 'Geografia',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Dinâmica Climática e Fenômenos Naturais',
    objective: 'Explorar a estrutura interna do planeta, placas tectônicas e erupções vulcânicas por meio de imersão virtual',
    targetYear: '6º e 7º Ano do Ensino Fundamental',
    durationClasses: 1,
    recommendedTechId: 'vr-oculos',
    techName: 'Óculos de Realidade Virtual (VR) + Tablets de Apoio',
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    description: 'Em formato de rodízio, um estudante mergulha em 360° na cratera de um vulcão ativo narrando as camadas da crosta terrestre para o colega que preenche o mapa físico no tablet.',
    steps: [
      {
        stage: 'Preparação da Expedição (10 min)',
        duration: '10 min',
        action: 'Projeção rápida do mapa das placas tectônicas e o "Círculo de Fogo do Pacífico".'
      },
      {
        stage: 'Rodízio Imersivo nos Óculos VR (30 min)',
        duration: '30 min',
        action: 'Estudantes alternam no visor VR observando o fluxo de magma, falhas geológicas e sismos.'
      },
      {
        stage: 'Síntese Cartográfica Coletiva (10 min)',
        duration: '10 min',
        action: 'Marcação conjunta no mural digital dos pontos onde ocorrem mais terremotos no globo.'
      }
    ],
    evaluationSuggestion: 'Precisão na identificação dos elementos geológicos relatados durante a experiência de imersão.'
  },
  {
    id: 'prop-fund2-podcast',
    title: 'Podcast Investigativo: Vozes da Comunidade e Checagem de Fatos',
    curricularComponent: 'Língua Portuguesa',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'noturno', 'integral'],
    content: 'Análise de Notícias e Checagem de Fatos (Fake News)',
    objective: 'Desenvolver senso crítico na apuração de notícias e gravar um boletim informativo com checagem de fontes',
    targetYear: '8º e 9º Ano do Ensino Fundamental',
    durationClasses: 2,
    recommendedTechId: 'audiovisual-podcast',
    techName: 'Kit Podcast e Microfones Condensadores',
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    description: 'Equipes recebem manchetes duvidosas que circulam nas redes, investigam em sites oficiais de checagem e gravam um episódio de 3 minutos desmistificando o boato com argumentos sólidos.',
    steps: [
      {
        stage: 'Agência de Checagem (25 min)',
        duration: '25 min',
        action: 'Análise de boatos reais e aplicação do método de checagem: data, autor, veículo oficial e evidências.'
      },
      {
        stage: 'Redação da Pauta e Roteiro (25 min)',
        duration: '25 min',
        action: 'Criação do roteiro com abertura, entrevista rápida simulada e conclusão com veredito ("Fato ou Boato").'
      },
      {
        stage: 'Gravação no Estúdio SESI (35 min)',
        duration: '35 min',
        action: 'Gravação da locução e inserção de vinhetas sonoras de alerta informativo.'
      },
      {
        stage: 'Audição Crítica (15 min)',
        duration: '15 min',
        action: 'Audição em conjunto na sala e votação no episódio mais esclarecedor.'
      }
    ],
    evaluationSuggestion: 'Rubrica avaliando coerência das evidências apresentadas e clareza na locução.'
  },

  // ENSINO MÉDIO
  {
    id: 'prop-mat-parabola',
    title: 'Missão: Investigando o Voo da Parábola e Balística',
    curricularComponent: 'Matemática',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Função do 2º grau e Parábolas',
    objective: 'Compreender visualmente o vértice, raízes e concavidade da parábola conectando a lançamentos reais',
    targetYear: '1º Ano do Ensino Médio',
    durationClasses: 2,
    recommendedTechId: 'notebooks',
    techName: 'Notebooks + Simulador GeoGebra Interativo',
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    description: 'Os alunos utilizam controles deslizantes nos notebooks para alterar os coeficientes a, b e c da função quadrática, observando instantaneamente como uma trajetória de foguete ou cesta de basquete muda de curvatura.',
    steps: [
      {
        stage: 'Aquecimento (15 min)',
        duration: '15 min',
        action: 'Apresentação de um vídeo de lançamento de foguete ou arremesso. Pergunta: "Como a gravidade desenha essa curva?"'
      },
      {
        stage: 'Exploração Guiada (40 min)',
        duration: '40 min',
        action: 'Em duplas nos notebooks, alunos manipulam controles deslizantes e anotam o impacto do coeficiente "a" e do vértice.'
      },
      {
        stage: 'Desafio Prático "Acertar o Alvo" (25 min)',
        duration: '25 min',
        action: 'Estudantes deduzem a equação correta para fazer a parábola interceptar três coordenadas na tela.'
      },
      {
        stage: 'Síntese Coletiva (20 min)',
        duration: '20 min',
        action: 'Formalização algébrica do vértice (-b/2a) a partir do que foi visto geometricamente.'
      }
    ],
    evaluationSuggestion: 'Avaliação formativa da ficha com as coordenadas encontradas e o raciocínio algébrico.'
  },
  {
    id: 'prop-fis-braco',
    title: 'Missão: Automatizando a Linha de Montagem Industrial',
    curricularComponent: 'Física',
    educationStage: 'medio',
    suitablePeriods: ['vespertino', 'integral'],
    content: 'Leis de Newton e Força de Atrito',
    objective: 'Investigar forças motrizes, atrito e precisão de movimento em maquinários industriais reais',
    targetYear: '2º e 3º Ano do Ensino Médio',
    durationClasses: 2,
    recommendedTechId: 'braco-robotico',
    techName: 'Braço Robótico Articulado + Sensores',
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes programam o braço robótico para manipular peças de diferentes materiais (madeira, borracha, acrílico), medindo o equilíbrio de forças e o atrito estático necessário para evitar quedas.',
    steps: [
      {
        stage: 'Contextualização da Indústria 4.0 (15 min)',
        duration: '15 min',
        action: 'Vídeo rápido sobre a fábrica inteligente e a robótica colaborativa no chão de fábrica.'
      },
      {
        stage: 'Programação de Trajetória e Garra (45 min)',
        duration: '45 min',
        action: 'Com apoio do ATE, grupos ajustam ângulos articulares e pressão na garra do manipulador.'
      },
      {
        stage: 'Experimento de Atrito (30 min)',
        duration: '30 min',
        action: 'Testes sistemáticos com 3 superfícies e cálculo empírico do coeficiente de atrito.'
      },
      {
        stage: 'Conclusão Técnica (10 min)',
        duration: '10 min',
        action: 'Preenchimento da ficha técnica com as forças mínimas seguras de preensão.'
      }
    ],
    evaluationSuggestion: 'Rubrica simples avaliando precisão da programação e compreensão das forças da física.'
  },
  {
    id: 'prop-ia-etica',
    title: 'Debate Crítico: IA Generativa, Ética e Autoria',
    curricularComponent: 'Filosofia e Sociologia',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'noturno', 'integral'],
    content: 'Inteligência Artificial e o Futuro Humano',
    objective: 'Analisar criticamente o impacto dos algoritmos, viés de dados, direitos autorais e o futuro do trabalho',
    targetYear: '1º ao 3º Ano do Ensino Médio',
    durationClasses: 2,
    recommendedTechId: 'ia-educacional',
    techName: 'IA Educacional + Notebooks',
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes solicitam à IA que escreva argumentos a favor e contra temas polêmicos da atualidade, analisando de onde vieram as fontes, possíveis alucinações e vieses culturais presentes nas respostas.',
    steps: [
      {
        stage: 'Ensaio com Prompts Provocativos (25 min)',
        duration: '25 min',
        action: 'Grupos testam perguntas abertas na IA e marcam trechos que parecem tendenciosos ou genéricos.'
      },
      {
        stage: 'Auditoria Humana de Fontes (35 min)',
        duration: '35 min',
        action: 'Estudantes checam as fontes citadas em artigos acadêmicos reais e identificam pontos cegos.'
      },
      {
        stage: 'Tribunal Filosófico da Autoria (30 min)',
        duration: '30 min',
        action: 'Debate simulado entre equipes defendendo o papel insubstituível da criatividade e ética humana.'
      },
      {
        stage: 'Carta de Princípios da Turma (10 min)',
        duration: '10 min',
        action: 'Elaboração coletiva de 5 regras éticas para uso de IA nos estudos da escola.'
      }
    ],
    evaluationSuggestion: 'Qualidade dos argumentos levantados e capacidade de identificar limitações nos modelos de linguagem.'
  },

  // EJA & EDUCAÇÃO PROFISSIONAL
  {
    id: 'prop-eja-esteira',
    title: 'Automação de Esteira e Separação Logística',
    curricularComponent: 'Automação & Indústria 4.0',
    educationStage: 'eja_tecnico',
    suitablePeriods: ['noturno', 'integral'],
    content: 'Sensores Industriais e Automação de Esteiras',
    objective: 'Aplicar lógica de controle e sensores fotoelétricos para separação automatizada de peças por tamanho ou cor',
    targetYear: 'Módulo Técnico / EJA Profissionalizante',
    durationClasses: 2,
    recommendedTechId: 'braco-robotico',
    techName: 'Braço Robótico + Esteira Didática',
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Pensada especialmente para alunos do período noturno ou cursos técnicos: simulação de um centro de distribuição onde o braço robótico separa caixas defeituosas a partir da leitura de sensores.',
    steps: [
      {
        stage: 'Desafio Operacional do Chão de Fábrica (15 min)',
        duration: '15 min',
        action: 'Análise de um problema real de gargalo logístico em armazéns de e-commerce e indústria de peças.'
      },
      {
        stage: 'Configuração dos Sensores e Parâmetros (45 min)',
        duration: '45 min',
        action: 'Em bancada, estudantes conectam o sensor de cor/presença ao ciclo do braço robótico.'
      },
      {
        stage: 'Simulação Contínua em Tempo Real (30 min)',
        duration: '30 min',
        action: 'Teste com lote de 10 peças consecutivas medindo tempo de ciclo e taxa de acerto.'
      },
      {
        stage: 'Relatório Técnico de Produtividade (10 min)',
        duration: '10 min',
        action: 'Elaboração de melhorias para aumentar a eficiência energética do sistema.'
      }
    ],
    evaluationSuggestion: 'Avaliação prática do funcionamento do ciclo automatizado e raciocínio de segurança operacional.'
  },
  {
    id: 'prop-eja-orcamento',
    title: 'Planejamento Financeiro Familiar e Profissional no Digital',
    curricularComponent: 'Matemática',
    educationStage: 'eja_tecnico',
    suitablePeriods: ['noturno', 'vespertino', 'matutino'],
    content: 'Sistema Monetário e Troco Inteligente',
    objective: 'Criar uma planilha funcional de fluxo de caixa, cálculo de juros compostos e planejamento de metas financeiras',
    targetYear: 'EJA - Ensino Fundamental e Médio',
    durationClasses: 1,
    recommendedTechId: 'notebooks',
    techName: 'Notebooks + Planilhas Eletrônicas em Nuvem',
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Atividade altamente prática e contextualizada com a vida adulta: os estudantes estruturam uma planilha de receitas e despesas, comparam simulações de compras à vista versus parceladas com juros e salvam o arquivo para uso na sua própria vida.',
    steps: [
      {
        stage: 'Armadilhas do Crédito e Juros (15 min)',
        duration: '15 min',
        action: 'Análise de uma fatura de cartão de crédito e simulação da diferença entre juros rotativos e pagamento integral.'
      },
      {
        stage: 'Construção da Planilha Orçamentária (30 min)',
        duration: '30 min',
        action: 'Alunos inserem dados reais ou hipotéticos com fórmulas simples de porcentagem e saldo mensal.'
      },
      {
        stage: 'Simulador de Reserva de Emergência (15 min)',
        duration: '15 min',
        action: 'Projeção de economia mensal e prazo para atingir objetivos familiares ou de negócio autônomo.'
      }
    ],
    evaluationSuggestion: 'Funcionalidade da planilha e clareza na aplicação das fórmulas matemáticas.'
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mis-1',
    stage: 'Descobrir',
    title: 'Pioneiro da Curiosidade',
    description: 'Explore o catálogo de tecnologias SESI e selecione 1 equipamento que você nunca usou em sala.',
    rewardBadge: '🧭 Radar de Novidades',
    xpPoints: 100,
    techTag: 'Todas',
    completed: false,
    recommendedFor: ['explorador', 'criador', 'estrategista', 'investigador', 'narrador']
  },
  {
    id: 'mis-2',
    stage: 'Experimentar',
    title: 'Primeiro Voo Digital',
    description: 'Personalize uma proposta pedagógica para uma de suas turmas usando tablets ou notebooks.',
    rewardBadge: '🚀 Decolagem Pedagógica',
    xpPoints: 200,
    techTag: 'Tablets / Notebooks',
    completed: false,
    recommendedFor: ['explorador', 'estrategista']
  },
  {
    id: 'mis-3',
    stage: 'Criar',
    title: 'Mão na Massa com Alunos',
    description: 'Aplique uma atividade onde os estudantes construam algo com blocos, robótica ou gravação de áudio.',
    rewardBadge: '⚙️ Protótipo em Ação',
    xpPoints: 300,
    techTag: 'Robótica / Áudio',
    completed: false,
    recommendedFor: ['criador', 'investigador', 'narrador']
  },
  {
    id: 'mis-4',
    stage: 'Compartilhar',
    title: 'Inspiração entre Pares',
    description: 'Registre o feedback de uma aula com tecnologia para alimentar as boas práticas da sua unidade SESI.',
    rewardBadge: '🌱 Semente Compartilhada',
    xpPoints: 250,
    techTag: 'Comunidade',
    completed: false,
    recommendedFor: ['narrador', 'estrategista', 'explorador']
  },
  {
    id: 'mis-5',
    stage: 'Inspirar',
    title: 'Mentor da Tecnologia Humanizada',
    description: 'Convide ou auxilie um colega de outro componente a planejar uma aula integrada com apoio do ATE.',
    rewardBadge: '⭐ Farol Educativo',
    xpPoints: 500,
    techTag: 'Integração',
    completed: false,
    recommendedFor: ['explorador', 'criador', 'estrategista', 'investigador', 'narrador']
  }
];
