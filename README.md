# Criador de Histórias PF2e

Aplicativo mobile que ajuda jogadores de **Pathfinder 2e** a criar a história e a personalidade dos seus personagens. Ele não monta a ficha mecânica. O foco é quem o personagem é: região de origem, origem social, virtude, falha, objetivos, medos, vínculos e o motivo para sair em aventura. No fim, o app gera um resumo e um guia de interpretação.

Projeto da disciplina de desenvolvimento mobile do curso de Ciência da Computação (IFSULDEMINAS - Campus Passos).

## Funcionalidades

- **Cadastro e login** com e-mail e senha pelo Firebase Authentication, com verificação de e-mail.
- **Assistente de criação em 5 etapas:** identidade, região e origem, virtude e falha, objetivos e vínculos, e resumo.
- **CRUD de personagens** salvo no aparelho com SQLite: criar, listar, editar, excluir e favoritar.
- **Busca** de personagens por nome, região ou origem.
- **Retrato do personagem** tirado pela câmera ou escolhido da galeria.
- **Toque duplo** no card para favoritar, com animação.
- **Explorar regiões** e uma **enciclopédia** de apoio sobre o cenário.

## Tecnologias

React Native · Expo SDK 54 · Expo Router · TypeScript (modo estrito) · SQLite (expo-sqlite) · Firebase Authentication · React Native Gesture Handler · Reanimated · expo-image-picker

## Navegação

O app combina os três tipos de navegação do Expo Router:

- **Stack:** login, cadastro e as telas de detalhe e de criação
- **Drawer:** área logada, com Enciclopédia e Sobre
- **Tabs:** Início, Personagens e Explorar

## Como rodar

```bash
npm install
npx expo start
```

Abra no Expo Go, num emulador Android ou num build de desenvolvimento.

## Estrutura

```
app/                 rotas (Expo Router)
  (app)/(tabs)/      Início, Personagens e Explorar
  (app)/criar/       as 5 etapas do assistente
  personagem/        detalhes e edição
src/
  components/        componentes reutilizáveis (botões, modal, dropdown, cards)
  contexts/          autenticação e rascunho do personagem em criação
  database/          acesso ao SQLite
  data/              regiões, origens e textos da enciclopédia
  services/          configuração do Firebase
```

---

Lucas Terra Wachsmuth · [LinkedIn](https://www.linkedin.com/in/lucasterrau) · [GitHub](https://github.com/LucasTerrau)
