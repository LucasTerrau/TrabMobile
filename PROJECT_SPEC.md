# PROJECT_SPEC — Criador de Histórias PF2e

## Objetivo
Aplicativo mobile em Expo/React Native para ajudar jogadores a criar a história, a personalidade e um guia de interpretação para personagens de Pathfinder 2e.

O aplicativo não monta ficha mecânica. O foco é região, origem social, virtude, falha, objetivos, medos, vínculos e motivação para se aventurar.

## Restrições técnicas
- Expo SDK 54.
- TypeScript em modo estrito.
- Expo Router.
- Entrega principal em Android/APK.
- Não atualizar versões principais durante o desenvolvimento.
- Não incluir `node_modules`, `.expo`, builds ou APK no repositório/ZIP de código.

## Requisitos acadêmicos
- Pelo menos três tipos de navegação: Stack, Drawer e Tabs.
- CRUD em banco local ou remoto.
- TextInput para pesquisar dados do banco.
- Quatro tipos de componentes de interface.
- Um gesto.
- Um elemento usando Animated View.
- Pelo menos seis páginas, incluindo login, início, sobre e not found.
- Dois requisitos opcionais.

## Solução planejada
- Stack: autenticação e fluxos de detalhes/criação.
- Drawer: área autenticada, Enciclopédia e Sobre.
- Tabs: Início, Personagens e Explorar.
- SQLite: CRUD de personagens no Marco 2.
- Firebase Authentication com verificação de e-mail: marco posterior.
- Câmera/galeria para retrato: marco posterior.
- Double tap para favoritar e animações de seleção: marco posterior.

## Fluxo de criação
1. Identidade básica.
2. Região e origem.
3. Virtude e falha.
4. Objetivo, medo, vínculo e motivo para se aventurar.
5. Resumo e guia de interpretação.

## Rotas principais
- `/`: login.
- `/cadastro`: cadastro.
- `/verificar-email`: verificação simulada no Marco 1.
- `/home`: início.
- `/personagens`: listagem futura do SQLite.
- `/explorar`: regiões.
- `/enciclopedia`: conteúdo de apoio.
- `/sobre`: informações do projeto.
- `/criar/*`: cinco páginas do assistente.
- `/regiao/[id]`: detalhes de região.
- `+not-found`: rota inexistente.

## Modelo visual inicial
O Marco 1 utiliza um tema simples e consistente:
- fundo escuro;
- superfícies em cinza azulado;
- dourado como cor principal;
- textos claros;
- vermelho reservado para ações destrutivas.

O design final será produzido apenas depois que navegação e dados estiverem estáveis.

## Fora do escopo inicial
- IA generativa.
- Enciclopédia completa de Golarion.
- Mapa geográfico real ou serviço externo de mapas.
- Criação de ficha mecânica de Pathfinder 2e.
- Sincronização de personagens entre aparelhos.
