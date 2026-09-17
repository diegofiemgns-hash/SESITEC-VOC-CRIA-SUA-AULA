import { CurricularProposal } from '../types';

export const SESI_OFFICIAL_PROPOSALS: CurricularProposal[] = [
  // ==========================================
  // IMPRESSORA 3D
  // ==========================================
  {
    id: 'prop-3d-mascaras-africanas-8ano',
    title: 'Máscaras Africanas: do Tradicional ao Contemporâneo',
    thematicTitle: 'Máscaras africanas – do tradicional ao contemporâneo',
    thematicArea: 'Linguagens / Artes',
    curricularComponent: 'Arte',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Arte e Tecnologia, Elementos da Linguagem e Matrizes Culturais',
    objective: 'Estudar as culturas africanas e suas simbologias gestuais e imagéticas, criando prototipagens de máscaras no Tinkercad e materializando na impressora 3D',
    targetYear: '8º ano (Ensino Fundamental Anos Finais)',
    durationClasses: 4,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Tinkercad)',
    equipmentSupport: ['Impressora 3D', 'Notebooks'],
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Os estudantes pesquisam traços tradicionais áfricos, modelam suas próprias máscaras geométricas no Tinkercad e acompanham a impressão 3D na escola.',
    bnccSkills: [
      '(EF69AR04) Analisar os elementos constitutivos das artes visuais (ponto, linha, forma, direção, cor, tom, escala, dimensão, espaço, movimento etc.) na apreciação de diferentes produções artísticas.',
      '(EF69AR06) Desenvolver processos de criação em artes visuais, com base em temas ou interesses artísticos, de modo individual, coletivo e colaborativo.',
      '(EF69AR35) Identificar e manipular diferentes tecnologias e recursos digitais para acessar, apreciar, produzir, registrar e compartilhar práticas artísticas.',
      '(EF69AR01) Pesquisar, apreciar e analisar formas distintas das artes visuais tradicionais e contemporâneas em diferentes matrizes estéticas e culturais.'
    ],
    pedagogicalIntentionality: 'Valorizar a importância dos elementos culturais africanos na nossa formação, realizar estudos sobre as culturas africanas e suas simbologias gestuais e imagéticas, criando prototipagens de máscaras africanas no Tinkercad e utilizar a impressora 3D para materializar as produções estudadas e construídas.',
    supportTools: ['Tinkercad', 'Youtube', 'MakerBot Print / GTMax'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Explanação Cultural & Ambientação Tinkercad',
        description: 'Exposição dialogada sobre as máscaras e culturas africanas, analisando materialidades tradicionais e contemporâneas. Em duplas com notebooks, os alunos conhecem a plataforma Tinkercad e criam o perfil do grupo para pesquisar iconograficamente as máscaras.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Prototipagem 3D no Tinkercad',
        description: 'Em duplas nos notebooks, os alunos combinam critérios de criação, formas geométricas que usarão, dimensões e simbologia africana, finalizando o arquivo digital .STL.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Impressão 3D na Prática & Revezamento',
        description: 'Envio dos arquivos ao assistente de tecnologia educacional (ATE). Revezamento das duplas para acompanhar os minutos iniciais de deposição de filamento na impressora 3D.'
      },
      {
        sessionNumber: 'Aula 04',
        title: 'Montagem da Exposição Coletiva',
        description: 'Com as máscaras impressas, os alunos pintam detalhes característicos, definem local, data, elaboram as legendas com ficha técnica e organizam a mostra para a comunidade escolar.'
      }
    ],
    steps: [
      { stage: 'Pesquisa Cultural e Formas (50 min)', duration: '50 min', action: 'Investigação das matrizes tradicionais africanas e introdução ao software Tinkercad.' },
      { stage: 'Modelagem Tridimensional (50 min)', duration: '50 min', action: 'Prototipagem em duplas no Tinkercad definindo relevo, olhos, boca e adereços.' },
      { stage: 'Impressão 3D com ATE (50 min)', duration: '50 min', action: 'Acompanhamento do processo de fatiamento e início da impressão na sala maker.' },
      { stage: 'Acabamento e Exposição (50 min)', duration: '50 min', action: 'Pintura das máscaras, confecção de etiquetas informativas e exposição.' }
    ],
    resourceLinks: [
      { label: 'Tinkercad - Plataforma de Modelagem 3D', url: 'https://www.tinkercad.com/', note: 'Ambiente gratuito no navegador' },
      { label: 'Tutorial Básico Tinkercad', url: 'https://www.youtube.com/watch?v=R-OQC7plR-U', note: 'Vídeo oficial de apoio' },
      { label: 'Máscaras Africanas - Referências', url: 'https://www.youtube.com/watch?v=YEKRKcRfeLA', note: 'Vídeo explicativo sobre arte africana' }
    ],
    evaluationSuggestion: 'Autoavaliação formativa de participação e envolvimento nos processos através de rubrica avaliando frequência, criticidade artística, pesquisa e uso responsável da impressora 3D.',
    evaluationRubric: [
      { criteria: 'Pesquisa e Simbologia Africana', excellent: 'Pesquisou em múltiplas fontes com profundidade, aplicando símbolos com respeito e embasamento.', satisfactory: 'Pesquisou conceitos básicos e incorporou alguns elementos estéticos.', unsatisfactory: 'Apresentou pesquisa superficial sem relação consistente com a cultura africana.' },
      { criteria: 'Prototipagem no Tinkercad', excellent: 'Dominou os comandos geométricos no software, criando uma peça sólida e apta à impressão.', satisfactory: 'Utilizou o software com apoio dos colegas ou professor, concluindo o modelo.', unsatisfactory: 'Teve grande dificuldade na modelagem e não finalizou a peça.' },
      { criteria: 'Trabalho Colaborativo', excellent: 'Colaborou ativamente na dupla, dividindo as decisões estéticas e técnicas de forma harmoniosa.', satisfactory: 'Participou das decisões da dupla na maior parte do tempo.', unsatisfactory: 'Não se envolveu na divisão das tarefas da equipe.' }
    ],
    ateTip: 'Acerte previamente com o ATE o tamanho das máscaras (sugestão: 10 a 12 cm de altura) e verifique o estoque de filamento PLA antes da Aula 2.'
  },

  {
    id: 'prop-3d-modelos-atomicos-9ano',
    title: 'Modelos Atômicos em 3D: de Dalton a Bohr',
    thematicTitle: 'Modelos atômicos',
    thematicArea: 'Ciências da Natureza',
    curricularComponent: 'Ciências',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'A matéria e os átomos: Modelos atômicos de Dalton, Thomson, Rutherford e Bohr',
    objective: 'Analisar e compreender a evolução do conceito atômico, sua organização e estrutura subatômica através de modelagem e impressão 3D',
    targetYear: '9º ano (Ensino Fundamental Anos Finais)',
    durationClasses: 3,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Tinkercad & Thingiverse)',
    equipmentSupport: ['Impressora 3D', 'Notebooks', 'Tablets'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Os alunos constroem átomos no simulador PhET, pesquisam a evolução histórica no Sway e imprimem em 3D os modelos atômicos clássicos.',
    bnccSkills: [
      '(EF09CI03) Identificar modelos que descrevem a estrutura da matéria (constituição do átomo e composição de moléculas simples) e reconhecer sua evolução histórica.'
    ],
    pedagogicalIntentionality: 'Analisar e compreender a evolução do conceito atômico, sua organização e estrutura subatômica (partículas atômicas) através de prototipagem tangível.',
    supportTools: ['Tinkercad', 'Simulador PhET Build an Atom', 'Thingiverse', 'Microsoft Sway'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Fundamentação Teórica, Simulação PhET e Sorteio',
        description: 'Debate disparador sobre o que é o átomo. Simulação interativa no PhET "Construindo um Átomo". Sorteio de um modelo histórico por grupo (Dalton, Thomson, Rutherford ou Bohr) e pesquisa nos notebooks com auxílio do Sway.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Prototipagem no Tinkercad e Início da Impressão',
        description: 'Os grupos modelam no Tinkercad ou refinam modelos do Thingiverse. O professor e o ATE colocam uma peça inicial para imprimir enquanto os alunos finalizam as demais.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Apresentação dos Modelos Impressos no Sway',
        description: 'Cada grupo dispõe de até 10 minutos para demonstrar o modelo atômico impresso em 3D, contextualizando o momento histórico e as evidências científicas que sustentaram o modelo.'
      }
    ],
    steps: [
      { stage: 'Simulação e Pesquisa Histórica (50 min)', duration: '50 min', action: 'Construção de partículas no simulador PhET e levantamento dos experimentos científicos.' },
      { stage: 'Modelagem 3D dos Átomos (50 min)', duration: '50 min', action: 'Prototipagem no Tinkercad representando núcleo, elétrons e níveis energéticos.' },
      { stage: 'Apresentação com Protótipo em Mãos (50 min)', duration: '50 min', action: 'Seminário de 10 min com auxílio do Sway explicando o modelo impresso.' }
    ],
    resourceLinks: [
      { label: 'Simulador PhET - Construindo um Átomo', url: 'https://phet.colorado.edu/pt_BR/simulations/build-an-atom', note: 'Simulador interativo gratuito' },
      { label: 'Thingiverse - Modelos Atômicos Didáticos', url: 'https://www.thingiverse.com/thing:1376817', note: 'Modelos STL de referência' },
      { label: 'Tinkercad', url: 'https://www.tinkercad.com/', note: 'Modelagem 3D online' }
    ],
    evaluationSuggestion: 'Avaliação das três etapas: qualidade da pesquisa teórica entregue, precisão conceitual do modelo 3D e clareza na apresentação oral.',
    ateTip: 'Utilize filamentos de cores diferentes (azul para elétrons, vermelho para prótons, cinza para nêutrons) para facilitar a visualização didática.'
  },

  {
    id: 'prop-3d-celula-estruturas-6ano',
    title: 'A Célula e suas Estruturas Tridimensionais',
    thematicTitle: 'A célula e suas estruturas',
    thematicArea: 'Ciências da Natureza',
    curricularComponent: 'Ciências',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'As células e os níveis de organização: procariotas, eucariotas animal e vegetal',
    objective: 'Prototipar modelos em 3D a partir da observação de desenhos para representar, visualizar e diferenciar célula procariota, eucariota animal e vegetal',
    targetYear: '6º ano (Ensino Fundamental Anos Finais)',
    durationClasses: 3,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Tinkercad & Thingiverse)',
    equipmentSupport: ['Impressora 3D', 'Notebooks', 'Tablets'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    description: 'Estudo das organelas celulares com prototipagem 3D desmontável de células animal, vegetal e bacteriana.',
    bnccSkills: [
      '(EF06CI05) Explicar a organização básica das células e seu papel como unidade estrutural e funcional dos seres vivos.'
    ],
    pedagogicalIntentionality: 'Prototipar modelos em 3D a partir da observação de imagens para representar, visualizar e diferenciar célula procariota, eucariota animal e eucariota vegetal, reconhecendo as estruturas presentes em cada célula.',
    supportTools: ['Tinkercad', 'Thingiverse'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Pesquisa e Comparação das Organelas',
        description: 'Explanação comparativa sobre células procariotas e eucariotas. Divisão em 6 grupos (2 para procariota, 2 para animal, 2 para vegetal). Preenchimento da tabela de estruturas presentes/ausentes.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Prototipagem das Organelas e Envio para Impressão',
        description: 'Prototipagem no Tinkercad das organelas (mitocôndria, ribossomos, complexo de Golgi, núcleo, parede celular, etc.). Envio dos arquivos ao ATE para fatiamento.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Montagem Tátil da Célula Impressa e Apresentação',
        description: 'Apresentação do protótipo em 3D de 5 a 8 minutos, explicando a função biológica de cada organela para a turma.'
      }
    ],
    steps: [
      { stage: 'Diferenciação Celular (50 min)', duration: '50 min', action: 'Mapeamento das organelas ausentes e presentes no caderno.' },
      { stage: 'Modelagem das Organelas (50 min)', duration: '50 min', action: 'Desenho das estruturas em relevo no Tinkercad.' },
      { stage: 'Apresentação Tátil (50 min)', duration: '50 min', action: 'Identificação ao vivo das partes da célula impressa.' }
    ],
    resourceLinks: [
      { label: 'Thingiverse - Célula Procariota 3D', url: 'https://www.thingiverse.com/thing:864044', note: 'Arquivo STL gratuito' },
      { label: 'Thingiverse - Célula Vegetal 3D', url: 'https://www.thingiverse.com/thing:864049', note: 'Arquivo STL gratuito' },
      { label: 'Thingiverse - Célula Animal 3D', url: 'https://www.thingiverse.com/thing:864060', note: 'Arquivo STL gratuito' }
    ],
    evaluationSuggestion: 'Rubrica avaliando clareza conceitual na exposição oral, postura da equipe e gestão do tempo de apresentação.',
    ateTip: 'Para otimizar o tempo, programe a impressão das bases celulares com filamento branco e deixe que os alunos pintem as organelas com canetas permanentes ou tinta acrílica.'
  },

  {
    id: 'prop-3d-rosa-dos-ventos-4ano',
    title: 'Localização Geográfica na Palma da Mão (Rosa dos Ventos 3D)',
    thematicTitle: 'Localização geográfica na palma da mão',
    thematicArea: 'Ciências Humanas / Geografia',
    curricularComponent: 'Geografia',
    educationStage: 'fundamental1',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Os pontos cardeais e colaterais: orientação e espacialidade',
    objective: 'Construir a rosa dos ventos em 3D para associar a sombra do gnômon, os pontos cardeais e a localização em mapas do bairro da escola',
    targetYear: '4º ano (Ensino Fundamental Anos Iniciais)',
    durationClasses: 3,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Tinkercad)',
    equipmentSupport: ['Impressora 3D', 'Notebooks', 'Tablets'],
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    description: 'Alunos do 4º ano compreendem a orientação no espaço construindo a rosa dos ventos na impressora 3D e aplicando-a sobre mapas locais.',
    bnccSkills: [
      '(EF04CI09) Identificar os pontos cardeais, com base no registro de diferentes posições relativas do Sol e da sombra de uma vara (gnômon).',
      '(EF04CI10) Comparar as indicações dos pontos cardeais resultantes da observação das sombras de uma vara (gnômon) com aquelas obtidas por meio de uma bússola.'
    ],
    pedagogicalIntentionality: 'Mostrar aos alunos de forma prática a funcionalidade da rosa dos ventos, que serve de referência para localização em mapas. A construção começa desde a modelagem até a impressão 3D física.',
    supportTools: ['Tinkercad', 'Thingiverse'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Pontos Cardeais e Visita à Impressora 3D',
        description: 'Discussão sobre o movimento do Sol e os pontos de referência. Apresentação da impressora 3D na sala maker, explicando filamento, fatiamento e aplicações.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Prototipagem no Tinkercad em Duplas',
        description: 'Em duplas nos computadores, as crianças exploram as pontas da estrela de 4 e 8 pontas no Tinkercad, personalizando o modelo.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Desafio Prático com o Mapa do Bairro',
        description: 'Com a rosa dos ventos 3D impressa, as crianças a posicionam sobre o mapa do bairro e encontram os pontos comerciais a Norte, Sul, Leste e Oeste.'
      }
    ],
    steps: [
      { stage: 'Orientação pelo Sol (50 min)', duration: '50 min', action: 'Observação dos pontos de referência e visita à impressora 3D.' },
      { stage: 'Modelagem 3D Guiada (50 min)', duration: '50 min', action: 'Criação da rosa dos ventos no Tinkercad com apoio do professor.' },
      { stage: 'Leitura Cartográfica (50 min)', duration: '50 min', action: 'Uso da peça impressa em cima do mapa impresso da escola.' }
    ],
    resourceLinks: [
      { label: 'Modelo 3D da Rosa dos Ventos - Thingiverse', url: 'https://www.thingiverse.com/thing:2899376', note: 'Download direto para impressão rápida' },
      { label: 'Tinkercad Educacional', url: 'https://www.tinkercad.com/', note: 'Acesso para alunos' }
    ],
    evaluationSuggestion: 'Avaliação formativa observando interesse na aula expositiva, curiosidade ao usar o Tinkercad e precisão na localização dos pontos no mapa.',
    ateTip: 'Imprima previamente uma rosa dos ventos em duas cores contrastantes para demonstração na bancada.'
  },

  {
    id: 'prop-3d-mascote-robo-infantil',
    title: 'Meu Amigo Robô: Mascote da Turma Impresso em 3D',
    thematicTitle: 'Meu amigo Robô!',
    thematicArea: 'Educação Infantil',
    curricularComponent: 'Campos de Experiência / Polivalente',
    educationStage: 'infantil',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Espaços, tempos, quantidades, relações e transformações / Letramento digital lúdico',
    objective: 'Apresentar as funcionalidades da impressora 3D e prototipagens através da leitura do livro "Meu amigo Robô" e criação de um mascote coletivo',
    targetYear: '1º e 2º Período (Educação Infantil • 4 a 5 anos)',
    durationClasses: 3,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Sala Maker)',
    equipmentSupport: ['Impressora 3D', 'Notebook', 'Projetor'],
    classFormat: 'coletivo',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'As crianças ouvem a história "Meu amigo Robô", escolhem as características do mascote da sala e visitam a sala Maker para vê-lo nascer camada por camada.',
    bnccSkills: [
      '(EI03ET02) Observar e descrever mudanças em diferentes materiais, resultantes de ações sobre eles, em experimentos envolvendo fenômenos naturais e artificiais.',
      '(EI03ET08) Expressar medidas (peso, altura etc.), construindo gráficos básicos.',
      '(EI03EF01) Expressar ideias, desejos e sentimentos sobre suas vivências, por meio da linguagem oral e escrita (escrita espontânea).',
      '(EI03EF08) Selecionar livros e textos de gêneros conhecidos para a leitura de um adulto e/ou para sua própria leitura.'
    ],
    pedagogicalIntentionality: 'Propiciar o letramento digital e o conhecimento do equipamento, funcionamento e utilização na criação de objetos significativos para o contexto educacional infantil.',
    supportTools: ['Livro digital Meu Amigo Robô', 'Thingiverse', 'Projetor Datashow'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Contação de Histórias & Escolha do Mascote',
        description: 'Leitura projetada de "Meu amigo Robô" (Ruth Rocha). Roda de conversa e votação da aparência do robô mascote que a impressora 3D vai construir.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Visita à Sala Maker & O Robô que Nasce do Fio',
        description: 'Visita em pequenos grupos de 3 a 4 crianças à Sala Maker para observar a impressora trabalhando e entender que o plástico derretido vira brinquedo.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Batismo do Mascote & Diário de Bordo Familiar',
        description: 'Retirada cuidadosa da peça com o ATE. Votação do nome do mascote e início do projeto de visita à casa de cada aluno no fim de semana.'
      }
    ],
    steps: [
      { stage: 'Contação e Encantamento (40 min)', duration: '40 min', action: 'Leitura de história e imaginação das formas do mascote.' },
      { stage: 'Expedição à Impressora 3D (30 min)', duration: '30 min', action: 'Visita guiada com o ATE para ver a deposição do filamento.' },
      { stage: 'Acolhimento e Batismo (40 min)', duration: '40 min', action: 'Votação do nome do robô e pintura cooperativa com tinta acrílica PVA.' }
    ],
    resourceLinks: [
      { label: 'Livro Digital "Meu amigo robô"', url: 'https://www.euleioparaumacrianca.com.br/historias/meu-amigo-robo/', note: 'Acesso gratuito' },
      { label: 'Thingiverse - Robô Articulado Didático', url: 'https://www.thingiverse.com/', note: 'Arquivos 3D seguros para crianças' }
    ],
    evaluationSuggestion: 'Avaliação através da observação da turma durante as rodas de conversa, interação verbal e curiosidade sobre como a tecnologia constrói coisas reais.',
    ateTip: 'Imprima o robô em filamento de cor primária vibrante (azul ou amarelo) com preenchimento de 15% para que seja leve e resistente a quedas.'
  },

  {
    id: 'prop-3d-monstros-das-cores-infantil',
    title: 'Monstros das Cores e as Emoções em 3D',
    thematicTitle: '“Eu sinto, eu me expresso”',
    thematicArea: 'Educação Infantil',
    curricularComponent: 'Campos de Experiência / Traços, sons, cores e formas',
    educationStage: 'infantil',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Expressão de sentimentos, percepção visual e cores emocionais',
    objective: 'Explorar as emoções (alegria, tristeza, raiva, medo, calma) com apoio dos personagens do livro "O Monstro das Cores" impressos em 3D para pintura pelas crianças',
    targetYear: '1º Período (Educação Infantil • 3 a 4 anos)',
    durationClasses: 2,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Sala Maker)',
    equipmentSupport: ['Impressora 3D', 'Projetor', 'Tintas Guache/Acrílicas'],
    classFormat: 'coletivo',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    description: 'A partir do clássico livro de Anna Llenas, as crianças pintam e manipulam miniaturas tridimensionais dos monstrinhos das emoções.',
    bnccSkills: [
      '(EI03TS02) Expressar-se livremente por meio de desenho, pintura, colagem, dobradura e escultura, criando produções bidimensionais e tridimensionais.',
      '(EI03EO04) Comunicar suas ideias e sentimentos a pessoas e grupos diversos.',
      '(EI03EF04) Recontar histórias ouvidas e planejar coletivamente roteiros de encenações.'
    ],
    pedagogicalIntentionality: 'Uso da história Monstro das Cores e dos personagens impressos em 3D para explorar as emoções, estimulando a concentração, expressão e compreensão de cada sentimento.',
    supportTools: ['Thingiverse', 'Youtube Varal de Histórias'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'A História das Cores & Visita à Sala Maker',
        description: 'Contação de "O Monstro das Cores" no projetor. As crianças nomeiam as emoções e visitam a impressora 3D para ver os bonequinhos brancos saindo da bandeja.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Oficina de Pintura das Emoções & Cesta dos Sentimentos',
        description: 'Cada criança escolhe a emoção que deseja pintar (amarelo=alegria, azul=tristeza, vermelho=raiva, cinza=medo, verde=calma). Os monstros compõem o cantinho do acolhimento na sala.'
      }
    ],
    steps: [
      { stage: 'Contação e Diálogo (30 min)', duration: '30 min', action: 'Identificação das emoções e conversa carinhosa em roda.' },
      { stage: 'Oficina de Pintura (40 min)', duration: '40 min', action: 'Pintura dos monstrinhos impressos em 3D com pincéis e guache.' },
      { stage: 'Cantinho do Sentir (20 min)', duration: '20 min', action: 'Organização dos monstrinhos na estante de acolhimento da sala.' }
    ],
    resourceLinks: [
      { label: 'Thingiverse - Monstro das Cores 3D', url: 'https://www.thingiverse.com/thing:4961495', note: 'Modelo 3D oficial para download gratuito' },
      { label: 'Vídeo Varal de Histórias - O Monstro das Cores', url: 'https://www.youtube.com/watch?v=5dYNbRHJ15Q', note: 'Narração lúdica' }
    ],
    evaluationSuggestion: 'Observação da capacidade de expressar verbalmente o que cada cor representa e do envolvimento afetivo com a proposta.',
    ateTip: 'Imprima 6 a 8 unidades de monstros em filamento branco de acabamento fosco para que a tinta fixe facilmente.'
  },

  {
    id: 'prop-3d-vertebrados-embrioes-medio',
    title: 'A Evolução dos Vertebrados na Palma das Mãos (Embriões 3D)',
    thematicTitle: 'A evolução dos vertebrados na palma das mãos',
    thematicArea: 'Ciências da Natureza / Biologia',
    curricularComponent: 'Biologia',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Embriologia comparada, filogenia e anatomia evolutiva dos vertebrados',
    objective: 'Imprimir em 3D modelos embrionários de peixes, anfíbios, répteis, aves e mamíferos para rotação por estações comparativa',
    targetYear: '1ª, 2ª e 3ª séries (Ensino Médio)',
    durationClasses: 4,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Tinkercad & Canva)',
    equipmentSupport: ['Impressora 3D', 'Notebooks', 'Tablets'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Alunos do Ensino Médio comparam embriões impressos em 3D das cinco classes de vertebrados, analisando fendas branquiais, cauda pós-anal e cladogramas.',
    bnccSkills: [
      '(EM13CNT202) Analisar as diversas formas de manifestação da vida em seus diferentes níveis de organização.',
      '(EM13CNT208) Aplicar os princípios da evolução biológica para analisar a história humana e animal, sua diversificação e dispersão.'
    ],
    pedagogicalIntentionality: 'Analisar e comparar os estágios iniciais do desenvolvimento embrionário dos cinco grupos de vertebrados, identificando similaridades e particularidades para compreender os aspectos essenciais da evolução.',
    supportTools: ['Tinkercad', 'Canva', 'Cladogramas Digitais'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Contato com os Modelos Digitais e Comando de Impressão',
        description: 'Análise digital dos embriões no Tinkercad. Pesquisa sobre as estruturas comuns (arcos aórticos, notocorda) e envio dos arquivos STL ao ATE.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Pintura Anatômica & Elaboração das Fichas Descritivas',
        description: 'Divisão em 5 equipes (Peixes, Anfíbios, Répteis, Aves, Mamíferos). Enquanto parte pinta as estruturas do embrião, outra pesquisa no Canva a morfologia e fisiologia da classe.'
      },
      {
        sessionNumber: 'Aulas 03 e 04',
        title: 'Rotação por Estações Evolutiva com Anfitrião',
        description: 'Cada estação é liderada por um anfitrião com o modelo 3D em mãos. Os estudantes passam por todas as estações em ordem evolutiva registrando os dados no tablet.'
      }
    ],
    steps: [
      { stage: 'Análise Embriológica Digital (50 min)', duration: '50 min', action: 'Visualização tridimensional dos embriões e planejamento da impressão.' },
      { stage: 'Pintura e Ficha Técnica (50 min)', duration: '50 min', action: 'Pintura anatômica com tinta acrílica e criação da ficha no Canva.' },
      { stage: 'Estações de Aprendizagem (100 min)', duration: '100 min', action: 'Rodízio das 5 classes com modelo em mãos e preenchimento de rubrica.' }
    ],
    resourceLinks: [
      { label: 'Guia de Pintura em Impressão 3D', url: 'https://3dlab.com.br/pintura-em-impressao-3d/', note: 'Técnicas de acabamento profissional' },
      { label: 'Canva para Fichas Científicas', url: 'https://www.canva.com/', note: 'Modelos de infográficos' }
    ],
    evaluationSuggestion: 'Avaliação tripartite: formulário preparatório da Aula 1, ficha descritiva no Canva e rubrica do anfitrião avaliando a clareza conceitual.',
    ateTip: 'Planeje a impressão dos 5 pares de embriões com pelo menos 3 dias de antecedência para garantir secagem das peças.'
  },

  {
    id: 'prop-3d-catapultas-fisica-medio',
    title: 'Lançamento de Projéteis com Catapultas Impressas em 3D',
    thematicTitle: 'Lançamento de projéteis',
    thematicArea: 'Ciências da Natureza / Física',
    curricularComponent: 'Física',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Cinemática vetorial: Lançamento oblíquo, alcance máximo e ângulo de 45°',
    objective: 'Simular lançamentos oblíquos no PhET e imprimir protótipos de catapultas em 3D para testar na prática a relação entre ângulo, velocidade inicial e alcance',
    targetYear: '1ª Série (Ensino Médio)',
    durationClasses: 3,
    recommendedTechId: 'impressora-3d',
    techName: 'Impressora 3D (Tinkercad & PhET)',
    equipmentSupport: ['Impressora 3D', 'Tablets', 'Notebooks'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Competição saudável onde os alunos utilizam simuladores de física, escolhem modelos de catapultas no Thingiverse e realizam disparos reais aferindo distâncias.',
    bnccSkills: [
      '(EM13CNT205) Interpretar resultados e realizar previsões sobre atividades experimentais, fenômenos naturais e processos tecnológicos.',
      '(EM13CNT301) Construir questões, elaborar hipóteses, previsões e estimativas, empregar instrumentos de medição e representar modelos explicativos.'
    ],
    pedagogicalIntentionality: 'Estudar o movimento oblíquo de forma qualitativa e quantitativa, usando catapultas impressas em 3D e o simulador para gerar maior interação e significado aos cálculos vetoriais.',
    supportTools: ['Simulador PhET Lançamento de Projétil', 'Tinkercad', 'Thingiverse'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Simulação no PhET & O Desafio dos Engenheiros',
        description: 'No simulador PhET, os alunos testam disparos a 25°, 35°, 45°, 65° e 85°, descobrindo por que 45° gera o alcance máximo e como ângulos complementares têm mesmo alcance.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Escolha e Prototipagem da Catapulta no Tinkercad',
        description: 'Pesquisa no Thingiverse e ajustes de escala no Tinkercad. Alinhamento com o técnico da escola para o agendamento da impressão das estruturas.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Campeonato de Lançamentos na Sala Maker / Pátio',
        description: 'Cada equipe posiciona sua catapulta 3D com elásticos e projeta pequenas esferas, medindo com fita métrica o alcance e comparando com as previsões teóricas.'
      }
    ],
    steps: [
      { stage: 'Simulação Vetorial (50 min)', duration: '50 min', action: 'Disparos no simulador PhET variando velocidades e ângulos.' },
      { stage: 'Prototipagem Mecânica (50 min)', duration: '50 min', action: 'Seleção do modelo de alavanca de disparo no Tinkercad.' },
      { stage: 'Desafio Prático de Alcance (50 min)', duration: '50 min', action: 'Lançamentos reais na trena e cálculo do desvio percentual.' }
    ],
    resourceLinks: [
      { label: 'Simulador PhET - Lançamento de Projéteis', url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_pt_BR.html', note: 'Simulador oficial' },
      { label: 'Thingiverse - Modelos de Catapultas 3D', url: 'https://www.thingiverse.com/search?q=catapult', note: 'Modelos testados para impressão rápida' }
    ],
    evaluationSuggestion: 'Avaliação da participação nos três momentos: levantamento no simulador, preparo do protótipo e relatório de fechamento comparando teoria e prática.',
    ateTip: 'Use elásticos de dinheiro comuns para a tensão do braço da catapulta e bolinhas de papel alumínio de 1g para segurança dos alunos.'
  },

  // ==========================================
  // LABORATÓRIO DIGITAL LABDISC
  // ==========================================
  {
    id: 'prop-labdisc-agua-torneira-5ano',
    title: 'Analisando a Água da Torneira: pH e Temperatura com LabDisc',
    thematicTitle: 'Analisando a água da torneira',
    thematicArea: 'Ciências da Natureza',
    curricularComponent: 'Ciências',
    educationStage: 'fundamental1',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Propriedades físicas dos materiais, ciclo hidrológico e potabilidade da água',
    objective: 'Medir o pH e a temperatura da água tratada, da torneira e engarrafada utilizando os sensores do LabDisc Biochem',
    targetYear: '5º ano (Ensino Fundamental Anos Iniciais)',
    durationClasses: 2,
    recommendedTechId: 'labdisc',
    techName: 'Laboratório Portátil LabDisc (Biochem)',
    equipmentSupport: ['LabDisc Biochem', 'Sensor de pH', 'Béqueres', 'Notebook com GlobiLab'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'As crianças mergulham o sensor de pH do LabDisc em diferentes amostras de água da escola para testar se estão na faixa saudável de 6,0 a 9,5.',
    bnccSkills: [
      '(EF05CI04) Identificar os principais usos da água e de outros materiais nas atividades cotidianas para discutir e propor formas sustentáveis de utilização desses recursos.',
      '(EF05CI05) Construir propostas coletivas para um consumo mais consciente e criar soluções tecnológicas.',
      '(EF05CI01) Explorar fenômenos da vida cotidiana que evidenciem propriedades físicas dos materiais.'
    ],
    pedagogicalIntentionality: 'Compreender a importância do uso da tecnologia como ferramenta para medir o grau de acidez ou alcalinidade da água, constatando a importância do tratamento para a saúde humana.',
    supportTools: ['Software GlobiLab', 'LabDisc Biochem'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'O que é pH? Medição Coletiva com LabDisc',
        description: 'Apresentação da escala de 1 a 14 (ácido, neutro e alcalino). Demonstração do LabDisc na palma da mão. Coleta e leitura das amostras em béqueres.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Interpretação dos Gráficos e Relatório da Prática',
        description: 'Análise dos gráficos gerados pelo software GlobiLab. Levantamento de hipóteses e redação guiada de relatório sobre a qualidade da água consumida na escola.'
      }
    ],
    steps: [
      { stage: 'Introdução ao pH (30 min)', duration: '30 min', action: 'Roda de conversa sobre o rótulo das garrafinhas e escala de pH.' },
      { stage: 'Experimentação Científica (40 min)', duration: '40 min', action: 'Inserção do eletrodo de pH nas amostras e leitura na tela do LabDisc.' },
      { stage: 'Conclusões e Relatório (30 min)', duration: '30 min', action: 'Discussão sobre tratamento de água e preenchimento da ficha de investigação.' }
    ],
    evaluationSuggestion: 'Elaboração de relatório investigativo respondendo perguntas reflexivas sobre a importância do tratamento da água e a leitura do pH ideal.',
    ateTip: 'Lembre-se de lavar a sonda do eletrodo de pH com água destilada entre uma amostra e outra para não contaminar as leituras.'
  },

  {
    id: 'prop-labdisc-batimentos-som-infantil',
    title: 'Que Batida é Essa? Som e Coração com LabDisc',
    thematicTitle: 'Que batida é essa?',
    thematicArea: 'Educação Infantil',
    curricularComponent: 'Campos de Experiência / Traços, sons, cores e formas',
    educationStage: 'infantil',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Intensidade sonora, altura e ritmo do corpo humano',
    objective: 'Perceber som e ritmo através da aferição de decibéis e batimentos cardíacos com os sensores do LabDisc Gensci',
    targetYear: '1º Período (Educação Infantil • 3 a 4 anos)',
    durationClasses: 3,
    recommendedTechId: 'labdisc',
    techName: 'Laboratório Portátil LabDisc (Gensci)',
    equipmentSupport: ['LabDisc Gensci', 'Tablet', 'Projetor'],
    classFormat: 'coletivo',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    description: 'A partir do clássico "Pedro e o Lobo", as crianças usam o LabDisc para medir o barulho das palmas e escutam o ritmo do próprio coração.',
    bnccSkills: [
      '(EI03TS03) Reconhecer as qualidades do som (intensidade, duração, altura e timbre), utilizando-as em suas produções sonoras.',
      '(EI03TS01) Utilizar sons produzidos por materiais, objetos e instrumentos musicais durante brincadeiras.',
      '(EI03CG05) Coordenar suas habilidades manuais no atendimento adequado a seus interesses e necessidades.'
    ],
    pedagogicalIntentionality: 'Explorar a percepção do som através da música, do ritmo e dos batimentos do coração, despertando a curiosidade científica das crianças com o LabDisc.',
    supportTools: ['Vídeo Pedro e o Lobo', 'LabDisc Gensci com sensor de decibéis'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'História Pedro e o Lobo & Sons dos Instrumentos',
        description: 'Exibição animada da história onde cada personagem é um instrumento. Roda de conversa sobre sons graves, agudos, fortes e fracos.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Medindo o Barulho com o Sensor de Decibéis',
        description: 'As crianças fazem palmas, estalos e silêncio enquanto o LabDisc mede em tempo real os decibéis projetados na tela.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'O Ritmo do Coração: Nosso Instrumento Interno',
        description: 'Demonstração do clipe de frequência cardíaca. As crianças escutam as batidas do coração e entendem que ele também tem ritmo como uma canção.'
      }
    ],
    steps: [
      { stage: 'Apreciação Musical (30 min)', duration: '30 min', action: 'Audição de Pedro e o Lobo e exploração de timbres.' },
      { stage: 'Teste dos Decibéis (40 min)', duration: '40 min', action: 'Experimentação com o microfone do LabDisc em momentos de ruído e silêncio.' },
      { stage: 'Batimentos do Coração (30 min)', duration: '30 min', action: 'Aferição do ritmo cardíaco das crianças e conversa sobre saúde.' }
    ],
    evaluationSuggestion: 'Avaliação processual observando o engajamento na roda de conversa e a compreensão intuitiva entre som alto, baixo e ritmo.',
    ateTip: 'Projete a tela do software GlobiLab no datashow para que as crianças vejam as ondas sonoras subirem e descerem conforme cantam.'
  },

  {
    id: 'prop-labdisc-fotossintese-medio',
    title: 'Monitoramento da Fotossíntese em Tempo Real com Sensor DO2',
    thematicTitle: 'A fotossíntese em tempo real',
    thematicArea: 'Ciências da Natureza / Biologia',
    curricularComponent: 'Biologia',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Bioenergética: fotossíntese, comprimentos de onda de luz e oxigênio dissolvido',
    objective: 'Monitorar em tempo real a produção de oxigênio de uma planta aquática (Elodea) exposta a diferentes comprimentos de onda de luz usando o sensor DO2 do LabDisc',
    targetYear: '1ª série (Ensino Médio)',
    durationClasses: 2,
    recommendedTechId: 'labdisc',
    techName: 'Laboratório Portátil LabDisc (Biochem)',
    equipmentSupport: ['LabDisc Biochem', 'Sensor DO2 (oxigênio dissolvido)', 'Lâmpadas LED coloridas', 'Planta Elodea'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes investigam se a cor da luz (amarela, verde, vermelha) altera a taxa de fotossíntese medindo oxigênio dissolvido com o LabDisc.',
    bnccSkills: [
      '(EM13CNT202) Analisar as diversas formas de manifestação da vida em seus diferentes níveis de organização.',
      '(EM13CNT101) Analisar e representar as transformações e conservações em sistemas que envolvam quantidade de matéria e energia.'
    ],
    pedagogicalIntentionality: 'Monitorar, analisar e discutir o processo de fotossíntese realizado por uma planta aquática exposta a diferentes comprimentos de onda da luz.',
    supportTools: ['Software GlobiLab', 'LabDisc Biochem'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Calibração do Sensor DO2 e Preparo dos Recipientes',
        description: 'Configuração do datalogger em modo manual no GlobiLab. Montagem de 3 frascos com água e raminhos de Elodea (controle, luz branca e luz colorida).'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Medição do Oxigênio Dissolvido e Análise dos Gráficos',
        description: 'Após 10 minutos de iluminação LED, as equipes medem o oxigênio com a sonda e descobrem por que a luz verde tem menor taxa fotossintética.'
      }
    ],
    steps: [
      { stage: 'Montagem Experimental (50 min)', duration: '50 min', action: 'Calibração do sensor e isolamento dos frascos com luzes de LED.' },
      { stage: 'Coleta de Dados DO2 (50 min)', duration: '50 min', action: 'Leitura contínua dos níveis de oxigênio e exportação para PDF.' }
    ],
    evaluationSuggestion: 'Elaboração de relatório descritivo comparando as curvas de oxigênio sob luz branca, verde e vermelha com fundamentação bioquímica.',
    ateTip: 'A planta aquática Elodea pode ser obtida facilmente em lojas de aquarismo e mantida no laboratório de ciências da unidade.'
  },

  // ==========================================
  // ÓCULOS DE REALIDADE VIRTUAL (VR)
  // ==========================================
  {
    id: 'prop-vr-versalhes-9ano',
    title: 'Criação em Arte Contemporânea: O Palácio de Versalhes em 360°',
    thematicTitle: 'Criação em arte contemporânea – Obras para o Palácio de Versalhes',
    thematicArea: 'Linguagens / Artes',
    curricularComponent: 'Arte',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Estilos artísticos: Barroco francês e intervenções de arte contemporânea',
    objective: 'Conhecer a arquitetura do Palácio de Versalhes em Realidade Virtual 360° e projetar uma obra de arte contemporânea em contraste com o espaço histórico',
    targetYear: '9º ano (Ensino Fundamental Anos Finais)',
    durationClasses: 3,
    recommendedTechId: 'vr-oculos',
    techName: 'Óculos de Realidade Virtual (VR)',
    equipmentSupport: ['Óculos VR com Celular', 'Projetor', 'Youtube 360°'],
    classFormat: 'individual',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    description: 'Imersão nos salões dourados de Versalhes com óculos VR, inspirando os alunos a criarem propostas de esculturas contemporâneas que contrastam com o local.',
    bnccSkills: [
      '(EF69AR02) Pesquisar e analisar diferentes estilos visuais, contextualizando-os no tempo e no espaço.',
      '(EF69AR07) Dialogar com princípios conceituais, proposições temáticas, repertórios imagéticos e processos de criação.',
      '(EF69AR31) Relacionar as práticas artísticas às diferentes dimensões da vida social, estética e ética.'
    ],
    pedagogicalIntentionality: 'Explorar a estrutura artística e arquitetônica barroca para posteriormente apresentar uma proposta autoral contemporânea provocando reflexões de estranhamento e estilo.',
    supportTools: ['Vídeo Versalhes 360° no Youtube', 'Ficha de Identificação da Obra'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Passeio Virtual 360° nos Jardins e Salões de Versalhes',
        description: 'Cada aluno usa os óculos VR por 15 a 20 minutos explorando o Pátio de Mármore e a Galeria dos Espelhos enquanto o professor media aspectos do Absolutismo e Barroco.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Projeto da Obra Contemporânea na Oficina',
        description: 'Análise de intervenções reais feitas por artistas como Joana Vasconcelos e Jeff Koons em Versalhes. Preenchimento da ficha técnica da obra projetada pelo aluno.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Apresentação dos Projetos Projetados em Sala',
        description: 'O professor projeta a foto do espaço de Versalhes escolhido e o estudante defende o conceito da sua intervenção artística diante da turma.'
      }
    ],
    steps: [
      { stage: 'Tour VR Imersivo (50 min)', duration: '50 min', action: 'Navegação em 360 graus pelos aposentos reais franceses.' },
      { stage: 'Criação do Conceito (50 min)', duration: '50 min', action: 'Desenho e ficha técnica da escultura contrastante.' },
      { stage: 'Curadoria e Defesa (50 min)', duration: '50 min', action: 'Apresentação oral articulando Barroco e Arte Contemporânea.' }
    ],
    resourceLinks: [
      { label: 'Vídeo Versalhes 360° 4K VR', url: 'https://www.youtube.com/watch?v=C4tgeO5A4As', note: 'Tour virtual oficial em 360 graus' }
    ],
    evaluationSuggestion: 'Autoavaliação por critérios: participação no tour VR, pesquisa estética, fundamentação da ficha da obra e clareza de apresentação.',
    ateTip: 'Verifique se os smartphones acoplados aos óculos VR estão com o brilho calibrado em 70% e o aplicativo YouTube configurado no modo Cardboard.'
  },

  {
    id: 'prop-vr-sistema-solar-infantil',
    title: 'Uma Viagem Espacial em Realidade Virtual com o Show da Luna',
    thematicTitle: 'Uma Viagem espacial',
    thematicArea: 'Educação Infantil',
    curricularComponent: 'Campos de Experiência / Espaços, tempos, quantidades',
    educationStage: 'infantil',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'O Sistema Solar, estrelas, planetas e imaginação cósmica',
    objective: 'Promover a visualização imersiva dos planetas através de óculos VR de forma lúdica e mediada após contação de histórias',
    targetYear: '1º e 2º período (Educação Infantil • 4 a 5 anos)',
    durationClasses: 3,
    recommendedTechId: 'vr-oculos',
    techName: 'Óculos de Realidade Virtual (VR)',
    equipmentSupport: ['Óculos VR com Celular', 'Livro Estrelas e Planetas', 'Materiais recicláveis'],
    classFormat: 'individual',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'As crianças pequenas viajam pelas estrelas em 360°, observam os anéis de Saturno e depois constroem maquetes planetárias com a família.',
    bnccSkills: [
      '(EI03EO03) Ampliar as relações interpessoais, desenvolvendo atitudes de participação e cooperação.',
      '(EI03ET01) Estabelecer relações de comparação entre objetos, observando suas propriedades.',
      '(EI03ET05) Classificar objetos e figuras de acordo com suas semelhanças e diferenças.'
    ],
    pedagogicalIntentionality: 'Promover a visualização de personagens e cenários espaciais retratados em livros através do recurso tecnológico Óculos VR de forma lúdica, acolhedora e segura.',
    supportTools: ['Vídeo Show da Luna no Espaço', 'Vídeo 360° Sistema Solar'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Roda do Conhecimento & Show da Luna',
        description: 'Leitura do livro "Estrelas e Planetas". Conversa estimulante: "Se você pudesse viajar para as estrelas, o que levaria?".'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'A Viagem com os Óculos VR na Sala Maker',
        description: 'Em grupos de 5 a 6 crianças com o técnico, cada criança coloca os óculos VR por alguns minutos e vê os planetas flutuando ao redor.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Construção da Maquete Espacial Coletiva',
        description: 'Com tintas, papel e bolinhas de isopor, as crianças recriam as cores dos planetas que viram em Realidade Virtual e convidam as famílias.'
      }
    ],
    steps: [
      { stage: 'Sensibilização com Histórias (40 min)', duration: '40 min', action: 'Leitura interativa e vídeo do Show da Luna.' },
      { stage: 'Olhar as Estrelas em 360° (30 min)', duration: '30 min', action: 'Vivência individual guiada com óculos VR na sala maker.' },
      { stage: 'Ateliê dos Planetas (50 min)', duration: '50 min', action: 'Confecção de maquete cósmica com materiais diversos.' }
    ],
    resourceLinks: [
      { label: 'Vídeo 360° Sistema Solar para Crianças', url: 'https://www.youtube.com/watch?v=P5Er2Sd9A5o', note: 'Vídeo imersivo seguro' }
    ],
    evaluationSuggestion: 'Observação das inferências verbais das crianças e do entusiasmo demonstrado na construção manual dos planetas.',
    ateTip: 'Para crianças pequenas, mantenha a sessão de VR em até 3 a 5 minutos por criança com um adulto segurando levemente os óculos para conforto.'
  },

  {
    id: 'prop-vr-montanha-russa-fisica-medio',
    title: 'Energia Mecânica na Montanha-Russa em Realidade Virtual',
    thematicTitle: 'Energia mecânica',
    thematicArea: 'Ciências da Natureza / Física',
    curricularComponent: 'Física',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Conservação da energia mecânica: energia cinética, potencial e dissipação térmica',
    objective: 'Vivenciar o movimento da montanha-russa em Realidade Virtual 360° associando a sensação de aceleração aos gráficos de energia do simulador PhET',
    targetYear: '1ª série (Ensino Médio)',
    durationClasses: 2,
    recommendedTechId: 'vr-oculos',
    techName: 'Óculos de Realidade Virtual (VR & PhET)',
    equipmentSupport: ['Óculos VR', 'Datashow', 'Simulador PhET'],
    classFormat: 'individual',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes sentem a adrenalina de um loop em VR 360° e analisam as trocas de energia mecânica calculando velocidades e alturas.',
    bnccSkills: [
      '(EM13CNT101) Analisar e representar as transformações e conservações em sistemas que envolvam quantidade de matéria, de energia e de movimento.'
    ],
    pedagogicalIntentionality: 'Analisar as transformações de energia envolvidas no movimento do carrinho nos trilhos, consolidando o princípio da conservação da energia mecânica.',
    supportTools: ['Simulador PhET Energia na Pista de Skate', 'Vídeo Roller Coaster 360° VR'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Simulador PhET & Análise dos Gráficos de Barra',
        description: 'Os alunos acompanham o gráfico de energia cinética vs potencial na pista de skate no PhET e discutem a viabilidade de duas montanhas-russas.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Passeio em 360° na Montanha-Russa com Óculos VR',
        description: 'Imersão em Realidade Virtual 360° sentindo os pontos de velocidade máxima (fundo) e altura máxima (pico), resolvendo lista de desafios conceituais.'
      }
    ],
    steps: [
      { stage: 'Simulação Gráfica (50 min)', duration: '50 min', action: 'Construção mental das trocas de energia com PhET.' },
      { stage: 'Imersão em VR e Cálculos (50 min)', duration: '50 min', action: 'Visualização 360° e resolução de problemas de conservação de energia.' }
    ],
    resourceLinks: [
      { label: 'Simulador PhET - Energia na Pista de Skate', url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_pt_BR.html', note: 'Simulador interativo' },
      { label: 'Vídeo Montanha-Russa 360° 4K VR', url: 'https://www.youtube.com/watch?v=XfUX2TVPesc', note: 'Vídeo em realidade virtual' }
    ],
    evaluationSuggestion: 'Lista de exercícios qualitativos e quantitativos contextualizados com a montanha-russa do ENEM e vestibulares.',
    ateTip: 'Permita que os estudantes façam a experiência sentados em cadeiras giratórias para poderem olhar os 360 graus da pista com estabilidade.'
  },

  // ==========================================
  // ESTÚDIO DE GRAVAÇÃO & CHROMA KEY
  // ==========================================
  {
    id: 'prop-estudio-cantigas-1ano',
    title: 'Cantando e Brincando: Cantigas de Roda em Chroma Key',
    thematicTitle: 'Cantando e brincando',
    thematicArea: 'Linguagens / Língua Portuguesa',
    curricularComponent: 'Língua Portuguesa',
    educationStage: 'fundamental1',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Oralidade, cultura popular, rimas e produção audiovisual com fundo verde',
    objective: 'Gravar vídeos dos alunos cantando e dançando cantigas de roda no estúdio escolar com Chroma Key, inserindo cenários ilustrados criados pelas crianças',
    targetYear: '1º ano (Ensino Fundamental Anos Iniciais)',
    durationClasses: 5,
    recommendedTechId: 'estudio',
    techName: 'Estúdio de Gravação & Chroma Key',
    equipmentSupport: ['Câmera / Celular', 'Fundo Verde Chroma Key', 'Iluminação Softbox', 'Microfone Lapela'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'Alunos do 1º ano resgatam cirandas com seus familiares e gravam apresentações musicais mágicas no estúdio com cenários virtuais.',
    bnccSkills: [
      '(EF15LP15) Reconhecer que os textos literários fazem parte do mundo do imaginário e apresentam uma dimensão lúdica.',
      '(EF15LP09) Expressar-se em situações de intercâmbio oral com clareza.',
      '(EF12LP07) Identificar e (re)produzir cantigas, parlendas e canções.',
      '(EF15AR03) Reconhecer a influência de matrizes culturais nas artes.'
    ],
    pedagogicalIntentionality: 'Resgatar a cultura popular brasileira e reforçar a cantiga como instrumento de alfabetização lúdica e desenvolvimento socioemocional.',
    supportTools: ['Editor de vídeo com Chroma Key (CapCut/Canva/Filmora)', 'Fundo verde'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01 e 02',
        title: 'Audição de Cantigas e Entrevista em Família',
        description: 'Apresentação de "Ciranda, cirandinha" com letra projetada. As crianças levam para casa uma pesquisa com pais e avós sobre canções de infância.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Votação das Cantigas Favoritas & Ensaio em Grupo',
        description: 'As crianças compartilham as canções descobertas em casa, elegem as preferidas da turma e ensaiam os gestos e roda em grupos de 5.'
      },
      {
        sessionNumber: 'Aulas 04 e 05',
        title: 'Gravação no Estúdio com Fundo Verde & Exibição',
        description: 'Gravação no estúdio com iluminação softbox. As crianças escolhem o fundo digital da ciranda. Vídeo apresentado no mural ou reunião de pais.'
      }
    ],
    steps: [
      { stage: 'Resgate de Cantigas (100 min)', duration: '100 min', action: 'Leitura apontada das letras no cartaz e pesquisa com as famílias.' },
      { stage: 'Ensaios Coreográficos (50 min)', duration: '50 min', action: 'Organização dos grupos de 5 crianças com a professora de música.' },
      { stage: 'Gravação em Chroma Key (100 min)', duration: '100 min', action: 'Filmagens no estúdio sem roupas verdes para correta sobreposição.' }
    ],
    resourceLinks: [
      { label: 'Modelo de Entrevista Familiar - SESI', url: 'https://fiemg.com.br/', note: 'Roteiro para a lição de casa' }
    ],
    evaluationSuggestion: 'Autoavaliação com carinhas (Não gostei, Gostei, Adorei) sobre as cantigas, envolvimento com a turma e gravação no estúdio.',
    ateTip: 'Avise os responsáveis com antecedência para que as crianças não usem roupas verdes no dia da gravação no Chroma Key!'
  },

  {
    id: 'prop-estudio-telejornal-alimentos-medio',
    title: 'Telejornal Científico: Nutrição e Bioquímica no Estúdio',
    thematicTitle: 'Como a má alimentação pode afetar a saúde?',
    thematicArea: 'Ciências da Natureza / Biologia',
    curricularComponent: 'Biologia',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Bioquímica: Carboidratos, proteínas, lipídios, vitaminas e distúrbios alimentares',
    objective: 'Criar e gravar um telejornal científico (videocast) no estúdio escolar com Chroma Key investigando os efeitos dos nutrientes no corpo',
    targetYear: '1ª série (Ensino Médio)',
    durationClasses: 4,
    recommendedTechId: 'estudio',
    techName: 'Estúdio de Gravação & Chroma Key',
    equipmentSupport: ['Câmeras', 'Iluminação', 'Chroma Key', 'Microfones'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes assumem papéis de âncoras de jornal, repórteres de rua e médicos especialistas gravando no estúdio da escola.',
    bnccSkills: [
      '(EM13CNT302) Comunicar resultados de pesquisas e experimentos utilizando diferentes mídias e tecnologias digitais.',
      '(EM13CNT303) Interpretar textos de divulgação científica, avaliando consistência de dados e fontes confiáveis.'
    ],
    pedagogicalIntentionality: 'Criação de matéria jornalística sobre distúrbios alimentares e os compostos orgânicos para conscientizar e propor hábitos saudáveis.',
    supportTools: ['Canva', 'Capcut / Filmora', 'Reportagens científicas'],
    sessionSteps: [
      {
        sessionNumber: 'Aulas 01 e 02',
        title: 'Pesquisa Temática e Roteirização em Estações',
        description: 'Divisão em 5 grupos (Carboidratos, Lipídios, Proteínas, Vitaminas, Ácidos Nucleicos). Pesquisa de fontes médicas confiáveis e escrita do roteiro.'
      },
      {
        sessionNumber: 'Aulas 03 e 04',
        title: 'Gravação no Estúdio & Edição do Telejornal',
        description: 'Gravação na bancada do estúdio com teleprompter e Chroma Key projetando redação de notícias. Edição de 2 a 3 minutos por reportagem.'
      }
    ],
    steps: [
      { stage: 'Pesquisa e Roteiro (100 min)', duration: '100 min', action: 'Curadoria de dados científicos e escrita do roteiro televisivo.' },
      { stage: 'Gravação em Estúdio (100 min)', duration: '100 min', action: 'Apresentação em estúdio com microfones e iluminação técnica.' }
    ],
    resourceLinks: [
      { label: 'Reportagens de Saúde Confiáveis - SciELO', url: 'https://www.scielo.br/', note: 'Fontes científicas recomendadas' }
    ],
    evaluationSuggestion: 'Rubrica avaliando precisão dos conceitos bioquímicos, clareza da fala na apresentação e qualidade do vídeo final.',
    ateTip: 'Utilize um tablet como teleprompter improvisado com aplicativos gratuitos para que os alunos não precisem memorizar textos longos.'
  },

  // ==========================================
  // PROJETOR & CHROMECAST
  // ==========================================
  {
    id: 'prop-chromecast-performance-8ano',
    title: 'Performance Audiovisual ao Vivo com Chromecast',
    thematicTitle: 'Performance Audiovisual – Sons e imagens criando narrativas ao vivo',
    thematicArea: 'Linguagens / Artes',
    curricularComponent: 'Arte',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Linguagens audiovisuais integradas, performance efêmera e curadoria digital',
    objective: 'Criar uma apresentação performática audiovisual ao vivo transmitindo imagens e sons em sequência sem fio através do Chromecast',
    targetYear: '8º ano (Ensino Fundamental Anos Finais)',
    durationClasses: 3,
    recommendedTechId: 'projetor-chromecast',
    techName: 'Projetor & Chromecast',
    equipmentSupport: ['Projetor de Alta Luminosidade', 'Chromecast', 'Tablets'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    description: 'Grupos projetam obras de arte, fotografias e paisagens sonoras em uma parede ampla, criando uma narrativa multimídia sincronizada.',
    bnccSkills: [
      '(EF69AR03) Analisar situações nas quais as linguagens das artes visuais se integram às linguagens audiovisuais.',
      '(EF69AR23) Explorar e criar improvisações, composições e trilhas sonoras.'
    ],
    pedagogicalIntentionality: 'A partir da imersão de escolhas e percepções coletivas, criar uma narrativa artística ao vivo expondo pesquisas sonoras e imagéticas.',
    supportTools: ['Spotify', 'Freepik', 'Jamendo', 'The Met Collection'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Curadoria de Imagens e Sons nos Tablets',
        description: 'Os grupos escolhem um tema contemporâneo e pesquisam fotografias, obras de museus e faixas sonoras em bancos gratuitos nos tablets.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Criação da Performance ao Vivo em Parede Ampla',
        description: 'Projeção em parede ampla da escola. Os grupos conectam seus tablets em sequência ao Chromecast construindo a narrativa efêmera.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Roda de Conversa e Fruição Estética',
        description: 'Debate coletivo sobre como cada contribuição visual e sonora alterou o rumo da narrativa criada na parede da escola.'
      }
    ],
    steps: [
      { stage: 'Curadoria Audiovisual (50 min)', duration: '50 min', action: 'Seleção das mídias com direitos de uso liberados.' },
      { stage: 'Transmissão Coordenada (50 min)', duration: '50 min', action: 'Espelhamento sem fio via Chromecast alternando grupos.' },
      { stage: 'Reflexão Coletiva (50 min)', duration: '50 min', action: 'Discussão dos impactos sensoriais da performance.' }
    ],
    resourceLinks: [
      { label: 'The Met Museum - Coleção Digital', url: 'https://www.metmuseum.org/art/collection', note: 'Obras de arte em alta resolução' },
      { label: 'Jamendo - Músicas Livres', url: 'https://www.jamendo.com/start', note: 'Trilhas sonoras gratuitas' }
    ],
    evaluationSuggestion: 'Autoavaliação por rubrica focando na criatividade, uso responsável da ferramenta tecnológica e respeito aos momentos de fala.',
    ateTip: 'Configure o Chromecast em uma rede Wi-Fi dedicada de 5GHz para garantir troca de imagens fluida sem engasgos.'
  },

  // ==========================================
  // TABLETS EDUCACIONAIS
  // ==========================================
  {
    id: 'prop-tablet-escape-room-8ano',
    title: 'Escape Room Matemático no Microsoft Forms com Tablets',
    thematicTitle: 'Proporcionalidade: grandezas e medidas',
    thematicArea: 'Matemática e suas Tecnologias',
    curricularComponent: 'Matemática',
    educationStage: 'fundamental2',
    suitablePeriods: ['matutino', 'vespertino', 'integral'],
    content: 'Razão, proporção, grandezas direta e inversamente proporcionais e problemas ENEM',
    objective: 'Resolver enigmas matemáticos interconectados em formato de Escape Room utilizando tablets e Microsoft Forms',
    targetYear: '8º ano (Ensino Fundamental Anos Finais)',
    durationClasses: 2,
    recommendedTechId: 'tablets',
    techName: 'Tablets Educacionais',
    equipmentSupport: ['Tablets', 'Microsoft Forms'],
    classFormat: 'duplas',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    description: 'Desafio gamificado onde cada fase só destrava se a dupla resolver corretamente o cálculo de proporções e decifrar o código final.',
    bnccSkills: [
      '(EF08MA12) Identificar a natureza da variação de duas grandezas diretamente ou inversamente proporcionais.',
      '(EF08MA13) Resolver e elaborar problemas que envolvam grandezas proporcionais por meio de estratégias variadas.'
    ],
    pedagogicalIntentionality: 'Utilizar a metodologia Storytelling e Gamificação para envolver os alunos em problemas contextualizados de forma engajadora.',
    supportTools: ['Microsoft Forms', 'Código Morse'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Storytelling e Desafios A, B e C',
        description: 'Os alunos acessam o formulário no tablet. Desafio A (Código Morse), Desafio B (Segurança em eventos - proporção de policiais) e Desafio C (Concentração de fibras em pães).'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Desafios D, E e Fuga do Escape Room',
        description: 'Desafio D (Tanque de combustível e postos na estrada) e Desafio E (Custo de ingredientes e pizzas do ENEM). Validação coletiva do gabarito.'
      }
    ],
    steps: [
      { stage: 'Início da Missão (50 min)', duration: '50 min', action: 'Resolução das três primeiras estações no formulário protegido.' },
      { stage: 'Desafio Final e Gabarito (50 min)', duration: '50 min', action: 'Cálculo de custo de produção e conferência da chave de escape.' }
    ],
    resourceLinks: [
      { label: 'Modelo do Escape Room no Forms', url: 'https://forms.office.com/', note: 'Formulário duplicável do SESI' }
    ],
    evaluationSuggestion: 'Avaliação atitudinal do trabalho colaborativo em duplas e conferência das justificativas matemáticas inseridas no formulário.',
    ateTip: 'Configure o Forms com ramificação de seções para que o formulário só avance quando a senha correta da fase for digitada.'
  },

  // ==========================================
  // ROBÔS COLABORATIVOS (BRAÇO ROBÓTICO UR)
  // ==========================================
  {
    id: 'prop-cobot-automacao-medio',
    title: 'Operação do Braço Robótico: Indústria 4.0 na Prática',
    thematicTitle: 'Braço Robótico Colaborativo',
    thematicArea: 'Tecnologia & Mundo do Trabalho',
    curricularComponent: 'Automação & Indústria 4.0',
    educationStage: 'medio',
    suitablePeriods: ['matutino', 'vespertino', 'noturno', 'integral'],
    content: 'Interface Homem-Máquina (IHM), coordenadas cartesianas no espaço e segurança industrial',
    objective: 'Aprender as melhores práticas de inicialização do robô UR, liberação de freios, controle pela IHM e programação da rotina "selecionar e posicionar"',
    targetYear: '1ª a 3ª série EM e EJA / Técnico',
    durationClasses: 3,
    recommendedTechId: 'braco-robotico',
    techName: 'Robôs Colaborativos (Braço Robótico UR)',
    equipmentSupport: ['Braço Robótico Universal Robots', 'IHM Touchscreen', 'Notebook'],
    classFormat: 'grupos',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Estudantes do SESI aprendem a operar o robô colaborativo real utilizado nas indústrias automotivas e de manufatura moderna.',
    bnccSkills: [
      '(EM13CNT302) Comunicar resultados utilizando tecnologias digitais de informação e comunicação.',
      '(EM13MAT301) Resolver problemas que envolvem geometria analítica e coordenadas cartesianas no espaço tridimensional.'
    ],
    pedagogicalIntentionality: 'Aproximar o estudante do ambiente fabril moderno, desenvolvendo responsabilidade técnica, raciocínio espacial e letramento em automação industrial.',
    supportTools: ['Software Polyscope UR', 'Simulador UR Academy'],
    sessionSteps: [
      {
        sessionNumber: 'Aula 01',
        title: 'Segurança Industrial, Botão de Emergência e Inicialização',
        description: 'Entendimento do botão tipo cogumelo com retenção. Ligação da IHM, botão Power, aquecimento e liberação dos freios dos 6 eixos articulares.'
      },
      {
        sessionNumber: 'Aula 02',
        title: 'Movimentação em Eixos Cartesianos (X, Y, Z)',
        description: 'Os estudantes aprendem a movimentar o robô pelas setas e pelo menu de Articulações, entendendo a referência do Feature e coordenadas de ferramentas.'
      },
      {
        sessionNumber: 'Aula 03',
        title: 'Criação e Salvamento da Rotina Pick and Place',
        description: 'Programação de pontos de rota (Waypoints), abertura da garra e salvamento do arquivo .urp na memória e pendrive para execução segura.'
      }
    ],
    steps: [
      { stage: 'Procedimentos de Segurança (50 min)', duration: '50 min', action: 'Regras de isolamento, parada de emergência e status normal da IHM.' },
      { stage: 'Controle de Poses (50 min)', duration: '50 min', action: 'Ajuste manual e milimétrico dos eixos e orientação da ferramenta.' },
      { stage: 'Execução do Ciclo Automatizado (50 min)', duration: '50 min', action: 'Loop contínuo de transporte de peças em bancada.' }
    ],
    resourceLinks: [
      { label: 'Universal Robots Academy - Cursos Gratuitos', url: 'https://academy.universal-robots.com/br/cursos-online-gratuitos/curso-e-series-online/', note: 'Módulos de certificação online' }
    ],
    evaluationSuggestion: 'Checklist prático de segurança, verificação do alinhamento dos pontos de rota e execução limpa sem acionamento de colisões.',
    ateTip: 'Mantenha a velocidade de teste em 30% na IHM durante as primeiras programações dos estudantes para garantir total segurança.'
  }
];
