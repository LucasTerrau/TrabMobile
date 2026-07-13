export type SimpleOption = {
  label: string;
  value: string;
  description: string;
};

export const randomNames = [
  'Thomas Bennett',
  'Samuel Carter',
  'Henry Collins',
  'Edward Foster',
  'Daniel Hughes',
  'Arthur Miller',
  'William Turner',
  'George Wilson',
  'James Cooper',
  'Joseph Baker',

  'Lucas Martin',
  'Gabriel Costa',
  'Mateo Ramirez',
  'Diego Morales',
  'Rafael Mendes',
  'Pedro Almeida',
  'Miguel Santos',
  'Leonardo Rocha',
  'Bruno Ferreira',
  'Caio Martins',

  'Elias Moreira',
  'Victor Nogueira',
  'Antônio Ribeiro',
  'Davi Carvalho',
  'Henrique Lopes',
  'Alice Campbell',
  'Emma Walker',
  'Clara Foster',
  'Sofia Mendes',
  'Helena Duarte',

  'Laura Campos',
  'Beatriz Almeida',
  'Marina Costa',
  'Isabel Rocha',
  'Ana Ribeiro',
  'Lívia Nogueira',
  'Carolina Martins',
  'Camila Santos',
  'Elena Morales',
  'Lúcia Ramirez',

  'Sherlock Holmes',
  'John Watson',
  'Jane Eyre',
  'Edward Rochester',
  'Edmond Dantès',
  'Anne Shirley',
  'Elizabeth Bennet',
  'George Knightley',
  'Oliver Twist',
  'David Copperfield',
];

export const regions: SimpleOption[] = [
  {
    label: 'Varisia',
    value: 'Varisia',
    description:
      'Ruínas antigas, cidades livres e regiões selvagens.',
  },
  {
    label: 'Andoran',
    value: 'Andoran',
    description:
      'Uma nação conhecida por seus ideais de liberdade.',
  },
  {
    label: 'Cheliax',
    value: 'Cheliax',
    description:
      'Um império rígido, poderoso e autoritário.',
  },
  {
    label: 'Osirion',
    value: 'Osirion',
    description:
      'Desertos, tumbas antigas e grandes caravanas.',
  },
  {
    label: 'Expansão Mwangi',
    value: 'Expansão Mwangi',
    description:
      'Florestas, ruínas e muitos povos diferentes.',
  },
];

export const origins: SimpleOption[] = [
  {
    label: 'Família nobre',
    value: 'uma família nobre',
    description:
      'Cresceu cercado por responsabilidades e reputação.',
  },
  {
    label: 'Família militar',
    value: 'uma família militar',
    description:
      'Aprendeu desde cedo a seguir ordens e treinar.',
  },
  {
    label: 'Família artesã',
    value: 'uma família artesã',
    description:
      'Cresceu trabalhando e aprendendo um ofício.',
  },
  {
    label: 'Família agricultora',
    value: 'uma família agricultora',
    description:
      'Teve uma vida simples e ligada à comunidade.',
  },
  {
    label: 'Família acadêmica',
    value: 'uma família acadêmica',
    description:
      'Cresceu cercado por livros e discussões.',
  },
  {
    label: 'Companhia mercenária',
    value: 'uma companhia mercenária',
    description:
      'Passou a juventude viajando e enfrentando perigos.',
  },
];

export const virtues: SimpleOption[] = [
  {
    label: 'Lealdade',
    value: 'a lealdade',
    description:
      'Protege aqueles que considera aliados.',
  },
  {
    label: 'Coragem',
    value: 'a coragem',
    description:
      'Age mesmo quando está com medo.',
  },
  {
    label: 'Compaixão',
    value: 'a compaixão',
    description:
      'Tenta ajudar pessoas que estão em dificuldade.',
  },
  {
    label: 'Disciplina',
    value: 'a disciplina',
    description:
      'Controla seus impulsos e mantém seus compromissos.',
  },
  {
    label: 'Curiosidade',
    value: 'a curiosidade',
    description:
      'Sempre quer descobrir algo novo.',
  },
];

export const flaws: SimpleOption[] = [
  {
    label: 'Teimosia',
    value: 'sua teimosia',
    description:
      'Tem dificuldade para mudar de opinião.',
  },
  {
    label: 'Arrogância',
    value: 'sua arrogância',
    description:
      'Frequentemente acredita saber mais que os outros.',
  },
  {
    label: 'Impulsividade',
    value: 'sua impulsividade',
    description:
      'Age antes de pensar nas consequências.',
  },
  {
    label: 'Desconfiança',
    value: 'sua desconfiança',
    description:
      'Demora para acreditar nas intenções dos outros.',
  },
  {
    label: 'Orgulho',
    value: 'seu orgulho',
    description:
      'Evita pedir ajuda ou admitir fraquezas.',
  },
];

export const goals: SimpleOption[] = [
  {
    label: 'Proteger alguém',
    value: 'proteger uma pessoa importante',
    description:
      'Alguém depende do personagem.',
  },
  {
    label: 'Recuperar algo perdido',
    value: 'recuperar algo importante que foi perdido',
    description:
      'Pode ser um objeto, território ou posição.',
  },
  {
    label: 'Conhecer o mundo',
    value: 'conhecer o mundo e viver novas experiências',
    description:
      'A antiga vida parecia pequena demais.',
  },
  {
    label: 'Provar seu valor',
    value: 'provar que é capaz de realizar algo importante',
    description:
      'Deseja ser reconhecido por suas próprias ações.',
  },
];

export const fears: SimpleOption[] = [
  {
    label: 'Ser abandonado',
    value: 'ser abandonado por aqueles em quem confia',
    description:
      'Tem dificuldade para lidar com solidão.',
  },
  {
    label: 'Fracassar com a família',
    value: 'fracassar com sua família',
    description:
      'Sente que precisa corresponder às expectativas.',
  },
  {
    label: 'Perder o controle',
    value: 'perder o controle de suas próprias ações',
    description:
      'Tem medo de machucar alguém ou cometer um erro.',
  },
  {
    label: 'Descobrir uma verdade',
    value: 'descobrir uma verdade dolorosa sobre seu passado',
    description:
      'Suspeita que sua história não é o que parece.',
  },
];

export const bonds: SimpleOption[] = [
  {
    label: 'Um familiar',
    value: 'um familiar muito importante',
    description:
      'Uma pessoa que marcou sua vida.',
  },
  {
    label: 'Uma comunidade',
    value: 'a comunidade onde cresceu',
    description:
      'Sente que precisa proteger sua terra natal.',
  },
  {
    label: 'Um antigo mestre',
    value: 'um antigo mestre',
    description:
      'Alguém que ensinou grande parte do que sabe.',
  },
  {
    label: 'Uma pessoa desaparecida',
    value: 'uma pessoa que desapareceu',
    description:
      'Ainda espera descobrir o que aconteceu.',
  },
];

export const adventureReasons: SimpleOption[] = [
  {
    label: 'Fugiu de casa',
    value: 'precisou fugir de sua antiga casa',
    description:
      'Permanecer no mesmo lugar deixou de ser possível.',
  },
  {
    label: 'Recebeu uma missão',
    value: 'recebeu uma missão que não podia recusar',
    description:
      'Alguém confiou uma responsabilidade ao personagem.',
  },
  {
    label: 'Procura uma pessoa',
    value: 'saiu em busca de uma pessoa desaparecida',
    description:
      'A viagem começou como uma busca pessoal.',
  },
  {
    label: 'Perdeu tudo',
    value: 'perdeu tudo o que possuía',
    description:
      'A aventura surgiu como uma forma de recomeçar.',
  },
];