export type EncyclopediaTopic = {
  id: string;
  title: string;
  shortDescription: string;
  introduction: string;
  tips: string[];
  examples: string[];
};

export const encyclopediaTopics: EncyclopediaTopic[] = [
  {
    id: 'virtudes',
    title: 'Virtudes',
    shortDescription:
      'Qualidades que orientam as decisões do personagem.',
    introduction:
      'A virtude representa uma qualidade que o personagem tenta seguir. Ela não precisa aparecer em todas as situações, mas deve influenciar decisões importantes.',
    tips: [
      'Escolha uma virtude que possa aparecer durante as sessões.',
      'Demonstre a virtude através de ações.',
      'Permita que a virtude também cause dificuldades.',
      'Evite interpretar a virtude como uma obrigação absoluta.',
    ],
    examples: [
      'Lealdade: protege aliados mesmo quando isso é arriscado.',
      'Coragem: age apesar do medo.',
      'Compaixão: tenta entender pessoas em dificuldade.',
      'Disciplina: controla impulsos e mantém compromissos.',
    ],
  },
  {
    id: 'falhas',
    title: 'Falhas',
    shortDescription:
      'Defeitos que criam conflitos e decisões complicadas.',
    introduction:
      'A falha ajuda o personagem a parecer mais humano. Ela deve causar problemas interessantes sem impedir completamente o grupo de jogar.',
    tips: [
      'Escolha uma falha que seja possível interpretar.',
      'Não use a falha para prejudicar o grupo o tempo todo.',
      'Mostre a falha especialmente em situações de pressão.',
      'Permita que o personagem reconheça ou enfrente sua falha.',
    ],
    examples: [
      'Teimosia: demora para mudar de opinião.',
      'Arrogância: acredita saber mais que os outros.',
      'Impulsividade: age antes de pensar.',
      'Desconfiança: demora para aceitar ajuda.',
    ],
  },
  {
    id: 'objetivos',
    title: 'Objetivos',
    shortDescription:
      'Aquilo que o personagem deseja alcançar.',
    introduction:
      'Um objetivo oferece direção para o personagem. Ele pode ser pessoal, familiar, político, religioso ou ligado à aventura.',
    tips: [
      'Escolha algo que possa gerar decisões durante a campanha.',
      'Defina por que esse objetivo é importante.',
      'Pense no que o personagem sacrificaria para alcançá-lo.',
      'O objetivo pode mudar conforme a história avança.',
    ],
    examples: [
      'Restaurar o nome de sua família.',
      'Encontrar uma pessoa desaparecida.',
      'Descobrir a origem de um artefato.',
      'Proteger sua comunidade.',
    ],
  },
  {
    id: 'medos',
    title: 'Medos',
    shortDescription:
      'Inseguranças que afetam o comportamento do personagem.',
    introduction:
      'O medo não precisa ser uma fobia. Pode ser uma insegurança, uma preocupação ou uma situação que o personagem evita.',
    tips: [
      'Escolha um medo relacionado à história do personagem.',
      'Use o medo para criar hesitação e conflito.',
      'O personagem ainda pode agir mesmo estando com medo.',
      'Evite medos que impeçam toda participação na aventura.',
    ],
    examples: [
      'Fracassar com sua família.',
      'Ser abandonado pelos companheiros.',
      'Perder o controle dos próprios poderes.',
      'Descobrir que dedicou a vida a uma mentira.',
    ],
  },
  {
    id: 'vinculos',
    title: 'Vínculos',
    shortDescription:
      'Pessoas, lugares ou ideias importantes.',
    introduction:
      'Um vínculo conecta o personagem ao mundo. Pode ser uma pessoa, uma organização, uma comunidade, um objeto ou um ideal.',
    tips: [
      'Crie pelo menos um vínculo fora do grupo.',
      'Explique por que ele é importante.',
      'Pense em como o personagem age para protegê-lo.',
      'O vínculo pode ser positivo ou complicado.',
    ],
    examples: [
      'Um irmão mais novo.',
      'A vila onde nasceu.',
      'Uma antiga ordem militar.',
      'A arma deixada por seu mestre.',
    ],
  },
  {
    id: 'interpretacao',
    title: 'Interpretação',
    shortDescription:
      'Dicas práticas para agir e falar como o personagem.',
    introduction:
      'Interpretar não exige mudar completamente a voz ou atuar o tempo todo. Pequenas decisões consistentes já ajudam a diferenciar o personagem.',
    tips: [
      'Defina uma forma comum de reagir a problemas.',
      'Escolha um hábito ou maneira de falar.',
      'Use a virtude e a falha nas decisões.',
      'Pense no que o personagem percebe primeiro em uma cena.',
    ],
    examples: [
      'Sempre verifica as saídas de um lugar.',
      'Evita falar sobre sua família.',
      'Tenta resolver conflitos através de negociação.',
      'Faz perguntas quando encontra algo desconhecido.',
    ],
  },
];

export function findEncyclopediaTopic(id: string) {
  return encyclopediaTopics.find((topic) => topic.id === id);
}