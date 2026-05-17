/* ============================================
   DATA LAYER — Projects, Certificates, Skills, Experience
   ============================================ */

// ---- PROJECTS ----
export type ProjectStatus = 'production' | 'beta' | 'mvp' | 'concept' | 'archived';

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'live' | 'github' | 'docs' | 'dashboard' | 'case-study';
}

export interface ProjectOverview {
  objective: string;
  problem: string;
  audience: string;
  businessContext: string;
  differentials: string[];
  strategy: string;
}

export interface ProjectArchitecture {
  frontend: string;
  backend: string;
  apis: string;
  database: string;
  flow: string;
  integrations: string[];
  auth: string;
  hosting: string;
  infra: string;
  scalability: string;
}

export interface ProjectDataEngineering {
  ingestion: string;
  transformations: string;
  processing: string;
  consumption: string;
  schema: string;
  pipeline: string;
  performance: string;
  strategies: string[];
}

export interface ProjectStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  infrastructure?: string[];
  libraries?: string[];
  tools?: string[];
  analytics?: string[];
  deploy?: string[];
}

export interface ProjectGalleryItem {
  src: string;
  caption: string;
  alt: string;
}

export interface ProjectChallenge {
  title: string;
  problem: string;
  decision: string;
  outcome: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  embedUrl: string | null; // Power BI embed URL — null = placeholder
  gridClass: string; // Tailwind grid span classes
  sections: {
    architecture: string;
    etl: string;
    modeling: string;
    flowchart: string;
  };
  mermaidDiagrams: {
    architecture: string;
    flowchart: string;
    erDiagram: string;
  };
  // ----- Case-study fields (optional, populated progressively) -----
  category?: string;
  status?: ProjectStatus;
  executiveSummary?: string;
  links?: ProjectLink[];
  overview?: ProjectOverview;
  architecture?: ProjectArchitecture;
  dataEngineering?: ProjectDataEngineering;
  stack?: ProjectStack;
  gallery?: ProjectGalleryItem[];
  challenges?: ProjectChallenge[];
  futureRoadmap?: string[];
  metrics?: { label: string; value: string; hint?: string }[];
}

export const projects: Project[] = [
  {
    slug: 'simulador-preco-rodoviario',
    title: 'Simulador de Preço Rodoviário',
    subtitle: 'Modelagem Cost-Plus para precificação logística',
    description:
      'Ferramenta interativa de simulação de preços para o modal rodoviário, utilizando modelagem cost-plus com variáveis dinâmicas de custo operacional, margem e impostos.',
    tags: ['Power BI', 'DAX', 'Modelagem de Dados', 'Pricing', 'Excel VBA'],
    embedUrl: null,
    gridClass: 'md:col-span-2 md:row-span-2',
    sections: {
      architecture:
        'A solução foi desenhada para integrar múltiplas fontes de dados (ERPs locais e planilhas de filiais) em um repositório centralizado. Utilizamos o Power BI em conjunto com bancos relacionais para garantir a governança e segurança das informações.',
      etl:
        'Processo de extração desenvolvido em Python para capturar dados não-estruturados, seguido por transformações no Power Query (M) para limpeza de nulos, desnormalização de tabelas e aplicação de regras de negócio de tributação.',
      modeling:
        'Implementação de Star Schema otimizado, separando tabelas fato (fato_simulacao, fato_custos) e dimensões (dim_rota, dim_veiculo, dim_cliente). As medidas DAX incluem cálculos avançados de context transition e time-intelligence.',
      flowchart:
        'O fluxo inicia na ingestão diária via scripts automatizados → staging area no SQL Server → transformações e validações de qualidade → modelo semântico importado no Power BI Premium.',
    },
    mermaidDiagrams: {
      architecture: `graph TB
    subgraph Fontes["Fontes de Dados"]
        ERP["ERP Local"]
        XLS["Planilhas Filiais"]
        API["APIs Externas"]
    end
    subgraph Ingestao["Camada de Ingestão"]
        PY["Scripts Python"]
        PQ["Power Query M"]
    end
    subgraph Storage["Data Warehouse"]
        STG["Staging Area"]
        SQL["SQL Server"]
    end
    subgraph BI["Camada Analítica"]
        SEM["Modelo Semântico"]
        PBI["Power BI Premium"]
    end
    ERP --> PY
    XLS --> PQ
    API --> PY
    PY --> STG
    PQ --> STG
    STG --> SQL
    SQL --> SEM
    SEM --> PBI`,
      flowchart: `graph LR
    A["Ingestão Diária"] --> B["Staging SQL Server"]
    B --> C["Validação de Qualidade"]
    C --> D["Transformação ETL"]
    D --> E["Modelo Star Schema"]
    E --> F["Power BI Import"]
    F --> G["Dashboard Interativo"]
    
    style A fill:#0056D2,color:#fff
    style G fill:#00F0FF,color:#000`,
      erDiagram: `erDiagram
    fato_simulacao {
        int id_simulacao PK
        int id_rota FK
        int id_veiculo FK
        int id_cliente FK
        float custo_total
        float margem_aplicada
        float preco_final
        date data_simulacao
    }
    fato_custos {
        int id_custo PK
        int id_rota FK
        float combustivel
        float pedagio
        float manutencao
        float depreciacao
    }
    dim_rota {
        int id_rota PK
        string origem
        string destino
        float km_total
        string regiao
    }
    dim_veiculo {
        int id_veiculo PK
        string tipo
        float capacidade_ton
        float consumo_km
    }
    dim_cliente {
        int id_cliente PK
        string razao_social
        string segmento
        string uf
    }
    fato_simulacao ||--o{ dim_rota : "rota"
    fato_simulacao ||--o{ dim_veiculo : "veículo"
    fato_simulacao ||--o{ dim_cliente : "cliente"
    fato_custos ||--o{ dim_rota : "rota"`,
    },
    // ---- Case-study (mock completo) ----
    category: 'Data & Pricing Intelligence',
    status: 'production',
    executiveSummary:
      'Plataforma cost-plus que centraliza simulação de fretes rodoviários em tempo real, reduzindo o ciclo de cotação de horas para minutos e padronizando margens por filial, rota e tipo de veículo.',
    links: [
      { label: 'Acessar dashboard', href: '#', kind: 'dashboard' },
      { label: 'GitHub', href: 'https://github.com/Evanillson', kind: 'github' },
      { label: 'Documentação técnica', href: '#', kind: 'docs' },
    ],
    metrics: [
      { label: 'Redução do ciclo de cotação', value: '−87%', hint: 'De 6h para ~45min' },
      { label: 'Filiais integradas', value: '23', hint: 'Cobertura nacional' },
      { label: 'Acurácia de margem', value: '99.4%', hint: 'vs. fechamento contábil' },
      { label: 'Linhas processadas/dia', value: '1.2M', hint: 'Pipeline incremental' },
    ],
    overview: {
      objective:
        'Padronizar a precificação rodoviária multi-filial em uma única camada analítica, eliminando planilhas paralelas e dando ao time comercial autonomia para simular cenários complexos com governança.',
      problem:
        'Cada filial mantinha sua própria planilha de cotação com regras de margem distintas, sem rastreabilidade. O fechamento mensal apresentava divergências entre o preço cotado e o custo real, comprometendo a margem bruta.',
      audience:
        'Time comercial regional, controladoria, diretoria de operações logísticas e parceiros que consomem o motor de pricing via integração.',
      businessContext:
        'Operação rodoviária com mais de 20 filiais, alta volatilidade de combustível e exigência de SLA comercial de 2h. O negócio precisava de uma única fonte de verdade para preço — auditável e versionada.',
      differentials: [
        'Modelo cost-plus parametrizável por filial, modal e cliente',
        'Versionamento de tabelas de preço com snapshot diário',
        'DAX context transition para simulação em tempo real',
        'Camada de governança com Row-Level Security por região',
        'Histórico completo de simulações com replay analítico',
      ],
      strategy:
        'Adoção de arquitetura medallion com SQL Server como warehouse central, Python para ingestão das fontes não estruturadas e Power BI Premium como camada semântica. Toda regra de negócio foi versionada em DAX/SQL e documentada como ADRs.',
    },
    architecture: {
      frontend:
        'Power BI Premium como front-end analítico embutido em um wrapper Next.js para single sign-on corporativo. Dashboards parametrizados por bookmarks dinâmicos e drill-through por rota.',
      backend:
        'Camada de serviços em FastAPI (Python 3.11) expondo o motor de pricing como API REST, com cache em Redis para parâmetros estáveis (tabelas tributárias, dim_rota).',
      apis:
        'Endpoints REST: POST /simulate, GET /history, GET /margins. Documentação OpenAPI gerada automaticamente. Autenticação via JWT emitido pelo Azure AD.',
      database:
        'SQL Server (warehouse), PostgreSQL (catálogo de regras de negócio versionadas) e Redis (cache de hot-path). Particionamento por data_simulacao na fato principal.',
      flow:
        'Cliente → API Gateway → FastAPI → Motor de pricing (DAX-as-code) → Persistência da simulação → Evento Kafka → Replicação no DW → Atualização do modelo semântico.',
      integrations: [
        'ERP Local (TOTVS Protheus) via JDBC',
        'Tabela ANP de combustíveis (web scraping diário)',
        'Receita Federal — alíquotas tributárias',
        'Azure AD — autenticação corporativa',
        'Slack — alertas de margem fora do range',
      ],
      auth:
        'SSO via Azure AD (OAuth 2.0 / OIDC). RBAC com três papéis: viewer, simulator e governance. Row-Level Security aplicado tanto na API quanto no Power BI.',
      hosting: 'Azure App Service (API), Azure SQL (warehouse), Power BI Premium Capacity (P1).',
      infra:
        'IaC com Terraform, pipelines no GitHub Actions, observabilidade com Application Insights e dashboards de saúde no Grafana.',
      scalability:
        'API stateless com auto-scaling horizontal (3–12 instâncias). Warehouse escalado verticalmente até 16 vCores. Cache Redis com TTL adaptativo reduz 78% das chamadas ao SQL em horários de pico.',
    },
    dataEngineering: {
      ingestion:
        'Ingestão híbrida: pull diário do ERP via stored procedures + push real-time das filiais via API. Arquivos não-estruturados (planilhas legadas) parseados com pandas + openpyxl em janelas de lote.',
      transformations:
        'Camadas Bronze → Silver → Gold no SQL Server. Bronze guarda o payload bruto, Silver aplica deduplicação e tipagem, Gold materializa fatos e dimensões otimizados para o modelo semântico.',
      processing:
        'Orquestração com Apache Airflow (DAGs idempotentes), com testes de qualidade Great Expectations entre camadas e alerting automático em caso de drift.',
      consumption:
        'Power BI Premium consome a camada Gold via Import Mode com refresh incremental por partição mensal. APIs REST consomem a mesma camada Gold com leitura otimizada.',
      schema:
        'Star Schema clássico com 2 tabelas fato (fato_simulacao, fato_custos) e 4 dimensões (rota, veículo, cliente, tempo). Surrogate keys em todas as dimensões.',
      pipeline:
        'Ingestão (00:30) → Validação Great Expectations (00:50) → Transformação Silver (01:10) → Materialização Gold (01:35) → Refresh Power BI (02:00) → Health-check (02:15).',
      performance:
        'Pipeline diário completo em ~95 minutos para 1.2M linhas. Refresh incremental do modelo semântico em 4 minutos. Latência p95 da API de simulação: 180ms.',
      strategies: [
        'Particionamento por data_simulacao (mensal)',
        'Índices columnstore na fato_simulacao',
        'Aggregations no Power BI para drill-through rápido',
        'Cache Redis para parâmetros estáveis',
        'Refresh incremental no Power BI Premium',
      ],
    },
    stack: {
      frontend: ['Next.js 16', 'TailwindCSS', 'Framer Motion', 'Power BI Embedded'],
      backend: ['Python 3.11', 'FastAPI', 'Pydantic', 'SQLAlchemy'],
      database: ['SQL Server 2022', 'PostgreSQL 16', 'Redis 7'],
      infrastructure: ['Azure App Service', 'Azure SQL', 'Power BI Premium', 'Terraform'],
      libraries: ['pandas', 'openpyxl', 'Great Expectations', 'pytest'],
      tools: ['Power Query M', 'DAX Studio', 'Tabular Editor', 'Apache Airflow'],
      analytics: ['Power BI', 'DAX Avançado', 'Application Insights'],
      deploy: ['GitHub Actions', 'Docker', 'Azure Pipelines'],
    },
    gallery: [
      {
        src: '/dashboard_placeholder.png',
        alt: 'Visão geral do dashboard de pricing',
        caption: 'Visão executiva — margem por filial e modal',
      },
      {
        src: '/dashboard_placeholder.png',
        alt: 'Simulador de cenários',
        caption: 'Simulador interativo de cenários cost-plus',
      },
      {
        src: '/dashboard_placeholder.png',
        alt: 'Diagrama de arquitetura',
        caption: 'Drill-through por rota e tipo de veículo',
      },
    ],
    challenges: [
      {
        title: 'Reconciliação multi-filial',
        problem:
          'Cada filial usava nomenclaturas diferentes para rota, veículo e cliente, gerando duplicidades no DW.',
        decision:
          'Implementação de uma dimensão mestre centralizada com matching fuzzy (rapidfuzz) e revisão humana via interface de governança.',
        outcome:
          'Redução de 73% das duplicidades no primeiro mês. Hoje >99% dos registros caem em match determinístico.',
      },
      {
        title: 'Latência da API em horários de pico',
        problem:
          'Simulações concorrentes saturavam o pool de conexões do SQL Server, levando a p95 acima de 1.5s.',
        decision:
          'Introdução de cache Redis para parâmetros estáveis e migração das queries hot-path para stored procedures pré-compiladas.',
        outcome: 'p95 caiu para 180ms, com −78% de chamadas ao SQL no horário comercial.',
      },
      {
        title: 'Governança de regras de margem',
        problem:
          'Mudanças em regras de margem eram aplicadas direto no DAX sem rastreabilidade.',
        decision:
          'Migração das regras para um catálogo versionado em PostgreSQL com ADRs (Architecture Decision Records) obrigatórios.',
        outcome:
          'Auditoria de mudanças passou de "impossível" para 100% rastreável, com rollback em <5min.',
      },
    ],
    futureRoadmap: [
      'Motor de pricing dinâmico baseado em ML (XGBoost) para sugestão de margem',
      'API pública para parceiros com rate limiting por contrato',
      'Versionamento semântico das tabelas de preço (semver para regras)',
      'Migração para Lakehouse (Delta Lake) com unificação de batch e streaming',
    ],
  },
  {
    slug: 'analise-bids-logisticos',
    title: 'Análise de BIDs Logísticos',
    subtitle: 'Intelligence para licitações e concorrências',
    description:
      'Dashboard analítico para avaliação de biddings logísticos, com scoring de competitividade, análise de concorrentes e simulação de cenários de preço.',
    tags: ['Power BI', 'SQL', 'Python', 'Estatística', 'DAX'],
    embedUrl: null,
    gridClass: 'md:col-span-1 md:row-span-1',
    sections: {
      architecture:
        'Plataforma analítica na nuvem que consolida históricos de licitações. A arquitetura conecta APIs externas de cotação de mercado a um Data Warehouse estruturado, fornecendo dados para visualização avançada.',
      etl:
        'Pipeline construído com bibliotecas Pandas e SQLAlchemy (Python) para realizar o parsing de editais em PDF e planilhas, inserindo-os em uma base de dados relacional (SQL Server) com tratamento de tipagem e padronização.',
      modeling:
        'Modelagem dimensional robusta no Power BI. Desenvolvimento de lógicas em DAX para regressão linear simples, estimando faixas de preços baseadas em padrões históricos de ganhos e perdas (win-rate).',
      flowchart:
        'Fontes de mercado/BIDs → Ingestão Python → Data Warehouse SQL Server → Modelagem Tabular → Dashboards Estratégicos com RLS (Row-Level Security).',
    },
    mermaidDiagrams: {
      architecture: `graph TB
    subgraph Fontes["Fontes de Dados"]
        MKT["APIs de Mercado"]
        PDF["Editais PDF"]
        HIST["Histórico BIDs"]
    end
    subgraph Pipeline["Pipeline ETL"]
        PD["Pandas"]
        SA["SQLAlchemy"]
    end
    subgraph DW["Data Warehouse"]
        SQL["SQL Server"]
        RLS["Row-Level Security"]
    end
    subgraph Analytics["Analytics"]
        PBI["Power BI"]
        DAX["DAX Avançado"]
    end
    MKT --> PD
    PDF --> PD
    HIST --> SA
    PD --> SQL
    SA --> SQL
    SQL --> RLS
    RLS --> PBI
    PBI --> DAX`,
      flowchart: `graph LR
    A["Editais + Mercado"] --> B["Parsing Python"]
    B --> C["SQL Server DW"]
    C --> D["Modelagem Tabular"]
    D --> E["RLS Security"]
    E --> F["Dashboards Estratégicos"]
    
    style A fill:#0056D2,color:#fff
    style F fill:#00F0FF,color:#000`,
      erDiagram: `erDiagram
    fato_bid {
        int id_bid PK
        int id_cliente FK
        int id_rota FK
        float preco_proposto
        float preco_mercado
        string status
        float win_rate
        date data_bid
    }
    dim_concorrente {
        int id_concorrente PK
        string nome
        string porte
        float market_share
    }
    dim_rota {
        int id_rota PK
        string origem
        string destino
        string modal
    }
    fato_bid ||--o{ dim_rota : "rota"
    fato_bid ||--o{ dim_concorrente : "concorrente"`,
    },
    category: 'Competitive Intelligence',
    status: 'beta',
    executiveSummary:
      'Plataforma de inteligência competitiva para licitações logísticas, combinando histórico interno e sinal de mercado para estimar faixas de preço e probabilidade de vitória.',
  },
  {
    slug: 'governanca-fluxo-gbs',
    title: 'Governança e Fluxo GBS',
    subtitle: 'Gestão de processos e SLAs em serviços compartilhados',
    description:
      'Painel de governança para Global Business Services (GBS) com monitoramento de SLAs, fluxo de tickets e indicadores de performance operacional.',
    tags: ['Power BI', 'DAX', 'SQL', 'Automação', 'Databricks'],
    embedUrl: null,
    gridClass: 'md:col-span-1 md:row-span-1',
    sections: {
      architecture:
        'Arquitetura Medallion implementada no Databricks. Camada Bronze para dados brutos de ServiceNow e SAP, Silver para enriquecimento e Gold para consumo final otimizado pelo Power BI via DirectQuery.',
      etl:
        'Processamento massivo de dados (Big Data) gerenciado no Databricks, garantindo atualização e governança de dados operacionais complexos com alta performance (Spark).',
      modeling:
        'Star Schema avançado focado na otimização de performance do DirectQuery. Criação de view materializadas na camada Gold e modelagem DAX para análise de aging e SLA compliance com cálculos dinâmicos.',
      flowchart:
        'ServiceNow/SAP APIs → Databricks (Bronze → Silver → Gold) → Power BI Premium (DirectQuery) → Painel Executivo de Governança.',
    },
    mermaidDiagrams: {
      architecture: `graph TB
    subgraph Fontes["Sistemas Fonte"]
        SN["ServiceNow"]
        SAP["SAP ERP"]
    end
    subgraph Databricks["Databricks Lakehouse"]
        BRZ["Bronze - Raw"]
        SLV["Silver - Curated"]
        GLD["Gold - Aggregated"]
    end
    subgraph Consumo["Camada de Consumo"]
        DQ["DirectQuery"]
        PBI["Power BI Premium"]
    end
    SN --> BRZ
    SAP --> BRZ
    BRZ --> SLV
    SLV --> GLD
    GLD --> DQ
    DQ --> PBI`,
      flowchart: `graph LR
    A["ServiceNow/SAP"] --> B["Databricks Bronze"]
    B --> C["Silver - Enriquecimento"]
    C --> D["Gold - Views"]
    D --> E["DirectQuery"]
    E --> F["Painel Executivo"]
    
    style A fill:#0056D2,color:#fff
    style F fill:#00F0FF,color:#000`,
      erDiagram: `erDiagram
    fato_ticket {
        int id_ticket PK
        int id_area FK
        int id_prioridade FK
        datetime abertura
        datetime resolucao
        float sla_horas
        string status
        bool sla_cumprido
    }
    dim_area {
        int id_area PK
        string nome_area
        string gestor
        string vertical
    }
    dim_prioridade {
        int id_prioridade PK
        string nivel
        int sla_target_horas
    }
    fato_ticket ||--o{ dim_area : "área"
    fato_ticket ||--o{ dim_prioridade : "prioridade"`,
    },
    category: 'Operations Analytics',
    status: 'production',
    executiveSummary:
      'Painel executivo de governança para Global Business Services consolidando SLAs, aging e cargas de trabalho em tempo quase real via arquitetura Lakehouse.',
  },
];

// ---- EXPERIENCE ----
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Especialista em Power BI & Engenharia de Dados',
    company: 'Confidencial — Multinacional Logística',
    period: 'Jan 2023 — Presente',
    description:
      'Liderança técnica no desenvolvimento de ecossistemas analíticos completos para operações logísticas de larga escala. Responsável pela arquitetura de dados, governança e entrega de dashboards executivos para C-Level.',
    achievements: [
      'Arquitetou solução de precificação dinâmica que otimizou margem em 12%',
      'Reduziu tempo de geração de reports de 4h para 15min com automação ETL',
      'Implementou governança de dados (RLS) para +200 usuários simultaneos',
      'Desenvolveu +15 dashboards executivos com impacto direto em decisões estratégicas',
    ],
    technologies: ['Power BI', 'DAX', 'SQL Server', 'Python', 'Databricks'],
    current: true,
  },
  {
    id: 'exp-2',
    role: 'Analista de Business Intelligence',
    company: 'Empresa de Logística — GBS',
    period: 'Mar 2021 — Dez 2022',
    description:
      'Atuação no time de Global Business Services com foco em análise de dados operacionais, construção de KPIs e monitoramento de SLAs para serviços compartilhados.',
    achievements: [
      'Construiu painel de governança GBS monitorando +5.000 tickets/mês',
      'Automatizou processos de ETL reduzindo erros manuais em 90%',
      'Implementou Star Schema otimizado para DirectQuery em ambiente corporativo',
      'Treinou equipe de 8 analistas em modelagem DAX avançada',
    ],
    technologies: ['Power BI', 'SQL Server', 'Excel', 'Power Query', 'SharePoint'],
  },
  {
    id: 'exp-3',
    role: 'Analista de Dados Jr.',
    company: 'Consultoria de Dados',
    period: 'Jun 2019 — Fev 2021',
    description:
      'Primeiro contato profissional com engenharia e análise de dados. Responsável por construção de relatórios, modelagem básica e suporte a projetos de BI em diversos setores.',
    achievements: [
      'Desenvolveu primeiros dashboards Power BI da empresa, substituindo reports em Excel',
      'Participou de +10 projetos de implementação de BI para clientes externos',
      'Criou biblioteca de templates DAX reutilizáveis para a equipe',
    ],
    technologies: ['Power BI', 'Excel', 'SQL', 'Power Query'],
  },
];

// ---- CERTIFICATES ----
export interface AcademicProject {
  name: string;
  tech: string[];
  description: string;
}

export interface TccInfo {
  title: string;
  summary: string;
  methodology: string;
  result: string;
}

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  type: 'mba' | 'pos' | 'graduacao' | 'certificacao';
  year: string;
  description: string;
  image: string | null; // Path to certificate image — null = placeholder
  pdfUrl: string | null; // Path to certificate PDF
  modules?: string[];
  tcc?: TccInfo;
  academicProjects?: AcademicProject[];
  technologies?: string[];
  highlights?: string[];
  duration?: string;
  status?: string;
}

export const certificates: Certificate[] = [
  {
    id: 'mba-data-science',
    title: 'MBA em Data Science e Analytics',
    institution: 'USP ESALQ',
    type: 'mba',
    year: 'Conclusão Dez/2026',
    description:
      'Programa avançado com foco em Machine Learning, Análise Estatística, Big Data e aplicações de Data Science para tomada de decisão empresarial.',
    image: null,
    pdfUrl: null,
    duration: '18 meses — 360 horas',
    status: 'Em andamento',
    modules: [
      'Estatística Aplicada',
      'Machine Learning Supervisionado',
      'Machine Learning Não-Supervisionado',
      'Deep Learning e Redes Neurais',
      'Big Data Analytics com Spark',
      'Visualização de Dados e Storytelling',
      'Análise de Séries Temporais',
      'Processamento de Linguagem Natural (NLP)',
      'Business Analytics e KPIs',
      'Modelagem Preditiva',
      'Data Engineering Fundamentals',
      'Projeto de Conclusão (TCC)',
    ],
    tcc: {
      title: 'Modelo Preditivo para Otimização de Preços no Transporte Rodoviário de Cargas',
      summary:
        'Desenvolvimento de um modelo de regressão ensemble (Random Forest + Gradient Boosting) para previsão de preços de frete rodoviário, considerando variáveis operacionais, sazonais e macroeconômicas. O modelo atingiu R² de 0.89 e reduziu o erro de precificação em 23% comparado ao método manual.',
      methodology:
        'Coleta de +50.000 registros históricos de fretes. Pré-processamento com Pandas (tratamento de outliers, encoding, normalização). Feature Engineering com variáveis derivadas (km/custo, índice de sazonalidade, diesel/km). Treinamento com validação cruzada K-Fold (k=10). Deploy via API Flask para consumo no Power BI.',
      result:
        'O modelo foi implementado em produção, integrado ao simulador de preços da empresa, gerando economia estimada de R$ 2.3M/ano em otimização de precificação e redução de perda de biddings por subprecificação.',
    },
    academicProjects: [
      {
        name: 'Análise de Churn com ML',
        tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
        description:
          'Modelo de classificação para previsão de churn de clientes B2B no setor logístico, com acurácia de 92% usando Random Forest e SMOTE para balanceamento.',
      },
      {
        name: 'Dashboard de Séries Temporais',
        tech: ['Power BI', 'Python', 'Prophet', 'DAX'],
        description:
          'Construção de dashboard com forecasting integrado usando Facebook Prophet, visualizando tendências de demanda e sazonalidade do mercado de transportes.',
      },
      {
        name: 'NLP para Classificação de Editais',
        tech: ['Python', 'NLTK', 'Spacy', 'FastAPI'],
        description:
          'Sistema de classificação automática de editais de licitação usando processamento de linguagem natural, reduzindo o tempo de triagem em 85%.',
      },
    ],
    technologies: [
      'Python', 'R', 'SQL', 'Spark', 'Pandas', 'Scikit-learn',
      'TensorFlow', 'Power BI', 'Jupyter', 'Git',
    ],
    highlights: [
      'TCC nota máxima com banca de defesa',
      'Projeto aplicado em ambiente corporativo real',
      'Premiado como melhor projeto aplicado da turma',
    ],
  },
  {
    id: 'pos-controladoria',
    title: 'Pós-Graduação em Controladoria e Finanças',
    institution: 'USP ESALQ',
    type: 'pos',
    year: '2023',
    description:
      'Especialização em controladoria estratégica, gestão de custos, planejamento financeiro e análise de performance corporativa.',
    image: null,
    pdfUrl: '/certificates/pos-controladoria.pdf',
    duration: '12 meses — 360 horas',
    status: 'Concluído',
    modules: [
      'Contabilidade Gerencial',
      'Gestão Estratégica de Custos',
      'Planejamento e Orçamento Empresarial',
      'Controladoria Estratégica',
      'Finanças Corporativas',
      'Análise de Investimentos',
      'Governança Corporativa',
      'Auditoria e Compliance',
    ],
    technologies: ['Excel', 'Power BI', 'SQL', 'SAP'],
    highlights: [
      'Especialização que fortaleceu visão de negócio',
      'Base sólida em finanças para análise de dados',
    ],
  },
  {
    id: 'graduacao-ads',
    title: 'Graduação em Análise e Desenvolvimento de Sistemas',
    institution: 'Uninove',
    type: 'graduacao',
    year: '2023',
    description:
      'Formação em Análise e Desenvolvimento de Sistemas com foco em programação, banco de dados, engenharia de software e infraestrutura tecnológica para soluções analíticas.',
    image: null,
    pdfUrl: '/certificates/graduacao-ads-uninove.pdf',
    duration: '2,5 anos',
    status: 'Concluído',
    modules: [
      'Lógica de Programação e Algoritmos',
      'Banco de Dados e SQL',
      'Engenharia de Software',
      'Estruturas de Dados',
      'Desenvolvimento Web',
      'Análise de Sistemas',
      'Infraestrutura e Redes',
    ],
    technologies: ['SQL', 'Python', 'JavaScript', 'Git', 'Linux'],
  },
  {
    id: 'cert-power-bi-data-analyst',
    title: 'Microsoft Power BI Data Analyst (PL-300)',
    institution: 'Microsoft',
    type: 'certificacao',
    year: '2023',
    description:
      'Certificação oficial Microsoft validando competências avançadas em modelagem de dados, DAX, Power Query e criação de dashboards profissionais.',
    image: null,
    pdfUrl: '/certificates/pl300.pdf',
  },
  {
    id: 'cert-databricks-fundamentals',
    title: 'Databricks Lakehouse Fundamentals',
    institution: 'Databricks',
    type: 'certificacao',
    year: '2024',
    description:
      'Certificação em arquitetura Lakehouse, processamento de dados com Spark e engenharia de dados na plataforma Databricks.',
    image: null,
    pdfUrl: '/certificates/databricks-fundamentals.pdf',
  },
  {
    id: 'cert-sql-advanced',
    title: 'SQL Avançado para Análise de Dados',
    institution: 'Alura',
    type: 'certificacao',
    year: '2022',
    description:
      'Formação completa em SQL avançado incluindo CTEs, Window Functions, otimização de queries e modelagem relacional.',
    image: null,
    pdfUrl: '/certificates/sql-avancado.pdf',
  },
];

// ---- SKILLS ----
export interface Skill {
  name: string;
  icon: string; // Icon identifier for TechIcons component
}

export const skills: Skill[] = [
  { name: 'Power BI', icon: 'powerbi' },
  { name: 'DAX', icon: 'dax' },
  { name: 'SQL Server', icon: 'sqlserver' },
  { name: 'Python', icon: 'python' },
  { name: 'Pandas', icon: 'pandas' },
  { name: 'Databricks', icon: 'databricks' },
  { name: 'Excel', icon: 'excel' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Power Query', icon: 'powerquery' },
  { name: 'Spark', icon: 'spark' },
];

// ---- USER DATA ----
export const userData = {
  name: 'Evanilson Pereira de Freitas',
  shortName: 'Evanilson Freitas',
  age: 26,
  location: 'São Paulo - SP, Brasil',
  role: 'Especialista em Power BI | Engenheiro de Dados | Analista de BI',
  about:
    'Com sólida base empresarial e vivência executiva, atuo na arquitetura e engenharia de dados corporativos. Meu foco é desenvolver ecossistemas analíticos e dashboards complexos em Power BI, aliando técnicas avançadas de modelagem (Star Schema), processos de ETL eficientes e Estatística para potencializar a tomada de decisão estratégica dos negócios.',
  aboutExtended:
    'Profissional com +5 anos de experiência construindo ecossistemas de dados de ponta a ponta para empresas do setor logístico e de serviços compartilhados. Minha atuação abrange desde a extração e transformação de dados (ETL), modelagem relacional avançada (Star Schema/Snowflake), até a entrega de dashboards executivos de alto impacto visual em Power BI.\n\nMinha formação multidisciplinar — combinando MBA em Data Science (USP), Pós em Controladoria e Graduação em Administração — me permite traduzir complexidade técnica em insights acionáveis para o negócio.',
  language: 'Inglês (Leitura e Escrita Técnica)',
  coreCompetencies: [
    'Arquitetura de Dados Corporativos',
    'Power BI (DAX Avançado, Power Query M)',
    'Modelagem Dimensional (Star Schema)',
    'ETL & Engenharia de Dados',
    'SQL Server & Databricks',
    'Python para Análise de Dados',
    'Storytelling com Dados',
    'Governança & RLS',
  ],
  highlights: [
    { metric: '+5', label: 'Anos de Experiência' },
    { metric: '+30', label: 'Dashboards Entregues' },
    { metric: '+200', label: 'Usuários Ativos' },
    { metric: '3', label: 'Especializações' },
  ],
  contact: {
    phone: '11 96463-9228',
    email: 'Evanilson.2631@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/evanilson-p-freitas-303889350/',
    linkedinHandle: '/in/evanilson-p-freitas-303889350/',
  },
};

// ---- NAVIGATION ----
export const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Experiência', href: '/#experiencia' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Educação', href: '/educacao' },
  { label: 'Contato', href: '/#contato' },
];
