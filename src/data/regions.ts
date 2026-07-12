export type Region = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  peoples: string[];
  occupations: string[];
  characterIdeas: string[];
};

export const regions: Region[] = [
  {
    id: 'varisia',
    name: 'Varisia',
    shortDescription:
      'Uma terra de ruínas antigas, cidades independentes e regiões selvagens.',
    description:
      'Varisia reúne grandes cidades, pequenas comunidades e áreas pouco exploradas. É uma boa origem para viajantes, estudiosos de ruínas, mercenários e pessoas que cresceram longe de autoridades centralizadas.',
    peoples: [
      'Humanos varisianos',
      'Shoanti',
      'Halflings',
      'Elfos',
      'Anões',
    ],
    occupations: [
      'Guia',
      'Caçador',
      'Mercador',
      'Artista itinerante',
      'Explorador de ruínas',
    ],
    characterIdeas: [
      'Um explorador procurando artefatos antigos.',
      'Um artista viajante que nunca permanece muito tempo no mesmo lugar.',
      'Um morador de uma pequena vila que deseja conhecer grandes cidades.',
    ],
  },
  {
    id: 'andoran',
    name: 'Andoran',
    shortDescription:
      'Uma nação que valoriza liberdade, democracia e resistência contra tiranos.',
    description:
      'Andoran é conhecida por seus ideais de liberdade e por grupos que combatem escravidão e governos opressores. Personagens dessa região podem ser idealistas, soldados, comerciantes ou agentes políticos.',
    peoples: [
      'Humanos',
      'Halflings',
      'Anões',
      'Elfos',
      'Gnomos',
    ],
    occupations: [
      'Marinheiro',
      'Soldado',
      'Mercador',
      'Lenhador',
      'Agente libertador',
    ],
    characterIdeas: [
      'Um idealista que enfrenta governos autoritários.',
      'Um marinheiro acostumado a viajar entre diferentes países.',
      'Um comerciante que tenta agir de forma justa.',
    ],
  },
  {
    id: 'cheliax',
    name: 'Cheliax',
    shortDescription:
      'Um império poderoso, rígido e marcado por contratos infernais.',
    description:
      'Cheliax possui uma sociedade hierárquica e fortemente controlada. É uma origem interessante para nobres, soldados, rebeldes, advogados, fugitivos e pessoas criadas em ambientes autoritários.',
    peoples: [
      'Humanos',
      'Tieflings',
      'Halflings',
      'Elfos',
      'Anões',
    ],
    occupations: [
      'Soldado',
      'Advogado',
      'Nobre',
      'Servo',
      'Agente do governo',
    ],
    characterIdeas: [
      'Um antigo servidor do império que decidiu fugir.',
      'Um nobre que tenta proteger o nome de sua família.',
      'Um rebelde que cresceu escondendo suas opiniões.',
    ],
  },
  {
    id: 'osirion',
    name: 'Osirion',
    shortDescription:
      'Uma região de desertos, cidades antigas e monumentos esquecidos.',
    description:
      'Osirion possui grande interesse histórico e arqueológico. Personagens podem ter ligação com caravanas, templos, expedições, comércio e estudo de civilizações antigas.',
    peoples: [
      'Humanos',
      'Anões',
      'Elfos',
      'Gnomos',
      'Catfolk',
    ],
    occupations: [
      'Arqueólogo',
      'Guarda de caravana',
      'Mercador',
      'Sacerdote',
      'Explorador',
    ],
    characterIdeas: [
      'Um estudioso em busca de uma tumba desaparecida.',
      'Um guarda que passou anos protegendo caravanas.',
      'Um descendente de uma família ligada a um antigo templo.',
    ],
  },
  {
    id: 'mwangi',
    name: 'Expansão Mwangi',
    shortDescription:
      'Uma vasta região de florestas, cidades antigas e muitos povos diferentes.',
    description:
      'A Expansão Mwangi possui grande diversidade cultural e ambiental. É uma boa origem para estudiosos, caçadores, diplomatas, curandeiros e pessoas que cresceram próximas de florestas e ruínas antigas.',
    peoples: [
      'Humanos',
      'Elfos',
      'Orcs',
      'Leshies',
      'Catfolk',
    ],
    occupations: [
      'Caçador',
      'Curandeiro',
      'Diplomata',
      'Guia',
      'Pesquisador',
    ],
    characterIdeas: [
      'Um guia acostumado a proteger estrangeiros.',
      'Um estudioso interessado em cidades antigas.',
      'Um curandeiro que viaja para aprender novas técnicas.',
    ],
  },
];

export function findRegionById(id: string) {
  return regions.find((region) => region.id === id);
}