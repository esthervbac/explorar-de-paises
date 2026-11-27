# 🌍 Explorador de Países

Aplicação web moderna construída com **Angular**, **TypeScript** e **Tailwind CSS** para explorar informações detalhadas de mais de 250 países e territórios ao redor do mundo, com busca em tempo real, filtros combinados, sistema de favoritos e alternância de tema claro/escuro.

---

## Acessar o site

Link: [https://explorar-de-paises.vercel.app/](https://explorar-de-paises.vercel.app/)

---

## ✨ Funcionalidades

- **Listagem e Busca Reativa:** Pesquisa instantânea por nome do país com atualização em tempo real via Angular Signals.
- **Filtros e Ordenação Combinados:**
  - Filtro por continente/região (`Africa`, `Americas`, `Asia`, `Europe`, `Oceania`).
  - Filtro exclusivo para países favoritados.
  - Ordenação dinâmica por nome (`A–Z`, `Z–A`) e por maior população (`localeCompare` em `pt-BR`).
- **Página de Detalhes (`/pais/:name`):** Exibe bandeira em alta resolução (SVG), nome oficial, capital, região/sub-região, população formatada, idiomas falados, moedas e países vizinhos clicáveis.
- **Sistema de Favoritos Persistente:** Permite favoritar/desfavoritar países tanto na grade principal quanto na tela de detalhes, salvando automaticamente no `localStorage`.
- **Tema Light / Dark Mode:** Alternância fluida entre modo claro e escuro com persistência no `localStorage`.
- **Cache de Requisições HTTP:** Uso de RxJS `shareReplay(1)` no `CountryService` para evitar chamadas redundantes à API durante a navegação.

---

## 🛠️ Tecnologias Utilizadas

- **[Angular](https://angular.dev/)** (Standalone Components, Signals, `computed()`, `effect()`, `inject()`, Novo Control Flow `@if` / `@for`)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[RxJS](https://rxjs.dev/)** (`map`, `switchMap`, `shareReplay`)
- **Dados e Bandeiras:** Dataset `mledoze/countries` integrado com bandeiras vetoriais via **FlagCDN**.

---

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── components/
│   │   ├── country-card/     # Card reutilizável com bandeira, resumo e botão de favorito
│   │   └── navbar/           # Cabeçalho global com navegação e alternador de tema
│   ├── models/
│   │   └── country.model.ts  # Tipagem estrita da entidade Country
│   ├── pages/
│   │   ├── country-detail/   # Rota dinâmica (/pais/:name) com detalhes e fronteiras
│   │   └── home/             # Página inicial com filtros, ordenação e grade responsiva
│   ├── services/
│   │   ├── country.ts        # Consumo de dados, normalização e cache em memória
│   │   ├── favorites.ts      # Estado reativo e persistência dos favoritos
│   │   └── theme.ts          # Gerenciamento do tema Light/Dark
│   ├── app.config.ts         # Configuração do Router e HttpClient (withFetch)
│   ├── app.routes.ts         # Definição das rotas da aplicação
│   └── app.routes.server.ts  # Configuração de renderização (Client/Prerender)
└── public/
    └── favicon.svg           # Ícone vetorial personalizado da aplicação
```

---

## 🚀 Como Executar Localmente

1. Clone o repositório:

```
git clone [https://github.com/esthervbac/explorar-de-paises.git](https://github.com/esthervbac/explorar-de-paises.git)
cd seu-repositorio
```

2. Instale as dependências:

```
npm install
```

3. Inicie o servidor de desenvolvimento:

```
ng serve
```

4. Acesse `http://localhost:4200/` no navegador.
