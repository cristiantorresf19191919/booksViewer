import type { TocEntry } from "@/types/book";

/**
 * Table of contents for "The Trader's Guide to Key Economic Indicators".
 * Each entry has titleEn, titleEs, and optional match string to find paragraph index.
 */
export const bookToc: TocEntry[] = [
  {
    id: "acknowledgments",
    titleEn: "Acknowledgments",
    titleEs: "Agradecimientos",
    match: "Acknowledgments",
  },
  {
    id: "introduction",
    titleEn: "Introduction",
    titleEs: "Introducción",
    match: "Introduction",
    children: [
      {
        id: "intro-business-cycle",
        titleEn: "The Business Cycle",
        titleEs: "El Ciclo Económico",
        match: "The Business Cycle",
      },
      {
        id: "intro-indicators-markets",
        titleEn: "Indicators and the Markets",
        titleEs: "Indicadores y los Mercados",
        match: "Indicators and the Markets",
      },
      {
        id: "intro-how-to-use",
        titleEn: "How to Use This Book",
        titleEs: "Cómo Usar Este Libro",
        match: "How to Use This Book",
      },
      {
        id: "intro-who-benefits",
        titleEn: "Who Can Benefit from This Book?",
        titleEs: "¿Quién Puede Beneficiarse de Este Libro?",
        match: "Who Can Benefit from This Book",
      },
    ],
  },
  {
    id: "ch1-gdp",
    titleEn: "Chapter 1: Gross Domestic Product",
    titleEs: "Capítulo 1: Producto Interno Bruto",
    match: "Chapter 1: Gross Domestic Product",
    children: [
      {
        id: "ch1-evolution",
        titleEn: "Evolution of an Indicator",
        titleEs: "Evolución de un Indicador",
        match: "Evolution of an Indicator",
      },
      {
        id: "ch1-digging",
        titleEn: "Digging for the Data",
        titleEs: "Buscando los Datos",
        match: "Digging for the Data",
      },
      {
        id: "ch1-definitions",
        titleEn: "Some Definitions",
        titleEs: "Algunas Definiciones",
        match: "Some Definitions",
      },
      {
        id: "ch1-gdp-vs-gnp",
        titleEn: "GDP Versus GNP",
        titleEs: "PIB vs PNB",
        match: "GDP Versus GNP",
      },
      {
        id: "ch1-calculating",
        titleEn: "Calculating GDP: The Aggregate Expenditure Approach",
        titleEs: "Calculando el PIB: El Enfoque del Gasto Agregado",
        match: "Calculating GDP: The Aggregate Expenditure Approach",
      },
      {
        id: "ch1-deflators",
        titleEn: "Deflators",
        titleEs: "Deflactores",
        match: "DEFLATORS",
      },
      {
        id: "ch1-consumption",
        titleEn: "Consumption Expenditures",
        titleEs: "Gastos de Consumo",
        match: "CONSUMPTION EXPENDITURES",
      },
      {
        id: "ch1-investment",
        titleEn: "Investment Spending",
        titleEs: "Gasto en Inversión",
        match: "INVESTMENT SPENDING",
      },
      {
        id: "ch1-government",
        titleEn: "Government Spending",
        titleEs: "Gasto Gubernamental",
        match: "GOVERNMENT SPENDING",
      },
      {
        id: "ch1-exports",
        titleEn: "Net Exports",
        titleEs: "Exportaciones Netas",
        match: "NET EXPORTS",
      },
      {
        id: "ch1-final-sales",
        titleEn: "Final Sales",
        titleEs: "Ventas Finales",
        match: "FINAL SALES",
      },
      {
        id: "ch1-corporate-profits",
        titleEn: "Corporate Profits",
        titleEs: "Ganancias Corporativas",
        match: "CORPORATE PROFITS",
      },
      {
        id: "ch1-how-to-use",
        titleEn: "How to Use What You See",
        titleEs: "Cómo Usar Lo Que Ves",
        match: "HOW TO USE WHAT YOU SEE",
      },
      {
        id: "ch1-tricks",
        titleEn: "Tricks from the Trenches",
        titleEs: "Trucos desde las Trincheras",
        match: "TRICKS FROM THE TRENCHES",
      },
    ],
  },
  {
    id: "ch2-indices",
    titleEn: "Chapter 2: Indices of Leading, Lagging, and Coincident Indicators",
    titleEs: "Capítulo 2: Índices de Indicadores Adelantados, Rezagados y Coincidentes",
    match: "Indices of Leading, Lagging, and Coincident Indicators",
    children: [
      {
        id: "ch2-evolution",
        titleEn: "Evolution of an Indicator",
        titleEs: "Evolución de un Indicador",
        match: "EVOLUTION OF AN INDICATOR",
      },
      {
        id: "ch2-digging",
        titleEn: "Digging for the Data",
        titleEs: "Buscando los Datos",
        match: "DIGGING FOR THE DATA",
      },
      {
        id: "ch2-coincident",
        titleEn: "Coincident Index",
        titleEs: "Índice Coincidente",
        match: "COINCIDENT INDEX",
      },
      {
        id: "ch2-leading",
        titleEn: "Leading Economic Index",
        titleEs: "Índice Económico Adelantado",
        match: "LEADING ECONOMIC INDEX",
      },
      {
        id: "ch2-lagging",
        titleEn: "Lagging Index",
        titleEs: "Índice Rezagado",
        match: "LAGGING INDEX",
      },
      {
        id: "ch2-meaning",
        titleEn: "What Does It All Mean?",
        titleEs: "¿Qué Significa Todo Esto?",
        match: "WHAT DOES IT ALL MEAN?",
      },
      {
        id: "ch2-tricks",
        titleEn: "Tricks from the Trenches",
        titleEs: "Trucos desde las Trincheras",
        match: "TRICKS FROM THE TRENCHES",
      },
    ],
  },
  {
    id: "ch3-employment",
    titleEn: "Chapter 3: The Employment Situation",
    titleEs: "Capítulo 3: La Situación del Empleo",
    match: "The Employment Situation",
  },
  {
    id: "ch4-industrial",
    titleEn: "Chapter 4: Industrial Production and Capacity Utilization",
    titleEs: "Capítulo 4: Producción Industrial y Utilización de Capacidad",
    match: "Industrial Production and Capacity Utilization",
  },
  {
    id: "ch5-ism",
    titleEn: "Chapter 5: Institute for Supply Management Indices",
    titleEs: "Capítulo 5: Índices del Instituto de Gestión de Suministros",
    match: "Institute for Supply Management Indices",
  },
  {
    id: "ch6-manufacturers",
    titleEn: "Chapter 6: Manufacturers' Shipments, Inventories, and Orders",
    titleEs: "Capítulo 6: Envíos, Inventarios y Pedidos de Fabricantes",
    match: "Manufacturers' Shipments, Inventories, and Orders",
  },
  {
    id: "ch7-inventories",
    titleEn: "Chapter 7: Manufacturing and Trade Inventories and Sales",
    titleEs: "Capítulo 7: Inventarios y Ventas de Manufactura y Comercio",
    match: "Manufacturing and Trade Inventories and Sales",
  },
  {
    id: "ch8-residential",
    titleEn: "Chapter 8: New Residential Construction",
    titleEs: "Capítulo 8: Nueva Construcción Residencial",
    match: "New Residential Construction",
  },
  {
    id: "ch9-consumer-confidence",
    titleEn: "Chapter 9: Consumer Confidence and Consumer Sentiment Indices",
    titleEs: "Capítulo 9: Índices de Confianza y Sentimiento del Consumidor",
    match: "Conference Board Consumer Confidence",
  },
  {
    id: "ch10-retail",
    titleEn: "Chapter 10: Advance Monthly Sales for Retail Trade and Food Services",
    titleEs: "Capítulo 10: Ventas Mensuales Anticipadas de Comercio Minorista y Servicios de Alimentos",
    match: "Advance Monthly Sales for Retail Trade",
  },
  {
    id: "ch11-personal-income",
    titleEn: "Chapter 11: Personal Income and Outlays",
    titleEs: "Capítulo 11: Ingresos y Gastos Personales",
    match: "Personal Income and Outlays",
  },
  {
    id: "ch12-price-indices",
    titleEn: "Chapter 12: Consumer and Producer Price Indices",
    titleEs: "Capítulo 12: Índices de Precios al Consumidor y al Productor",
    match: "Consumer and Producer Price Indices",
  },
  {
    id: "summary",
    titleEn: "Chapter-by-Chapter Summary",
    titleEs: "Resumen Capítulo por Capítulo",
    match: "Chapter-by-Chapter Summary",
    children: [
      {
        id: "summary-intro",
        titleEn: "Introduction — Why Economic Indicators Matter",
        titleEs: "Introducción — Por Qué Importan los Indicadores Económicos",
        match: "Summary: Introduction",
      },
      {
        id: "summary-ch1",
        titleEn: "Chapter 1 — GDP",
        titleEs: "Capítulo 1 — PIB",
        match: "Summary: Chapter 1",
        children: [
          { id: "s-ch1-evolution", titleEn: "Evolution", titleEs: "Evolución", match: "Evolution" },
          { id: "s-ch1-data", titleEn: "How the Data Works", titleEs: "Cómo Funcionan los Datos", match: "How the Data Works" },
          { id: "s-ch1-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
          { id: "s-ch1-tricks", titleEn: "Tricks From the Trenches", titleEs: "Trucos desde las Trincheras", match: "Tricks From the Trenches" },
        ],
      },
      {
        id: "summary-ch2",
        titleEn: "Chapter 2 — Leading, Lagging, Coincident",
        titleEs: "Capítulo 2 — Adelantados, Rezagados, Coincidentes",
        match: "Summary: Chapter 2",
        children: [
          { id: "s-ch2-composites", titleEn: "The Three Composites", titleEs: "Los Tres Compuestos", match: "The Three Composites" },
          { id: "s-ch2-insights", titleEn: "Key Analytical Insights", titleEs: "Perspectivas Analíticas Clave", match: "Key Analytical Insights" },
        ],
      },
      {
        id: "summary-ch3",
        titleEn: "Chapter 3 — Employment Situation",
        titleEs: "Capítulo 3 — Situación del Empleo",
        match: "Summary: Chapter 3",
        children: [
          { id: "s-ch3-why", titleEn: "Why It Matters", titleEs: "Por Qué Importa", match: "Why It Matters" },
          { id: "s-ch3-surveys", titleEn: "Two Surveys, One Report", titleEs: "Dos Encuestas, Un Informe", match: "Two Surveys, One Report" },
          { id: "s-ch3-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
        ],
      },
      {
        id: "summary-ch4",
        titleEn: "Chapter 4 — Industrial Production",
        titleEs: "Capítulo 4 — Producción Industrial",
        match: "Summary: Chapter 4",
        children: [
          { id: "s-ch4-data", titleEn: "How the Data Works", titleEs: "Cómo Funcionan los Datos", match: "How the Data Works" },
          { id: "s-ch4-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
        ],
      },
      {
        id: "summary-ch5",
        titleEn: "Chapter 5 — ISM Indices (PMI)",
        titleEs: "Capítulo 5 — Índices ISM (PMI)",
        match: "Summary: Chapter 5",
        children: [
          { id: "s-ch5-survey", titleEn: "How the Survey Works", titleEs: "Cómo Funciona la Encuesta", match: "How the Survey Works" },
          { id: "s-ch5-subindices", titleEn: "Key Sub-Indices", titleEs: "Subíndices Clave", match: "Key Sub-Indices" },
          { id: "s-ch5-nonmfg", titleEn: "ISM Non-Manufacturing", titleEs: "ISM No Manufacturero", match: "ISM Non-Manufacturing Survey" },
        ],
      },
      {
        id: "summary-ch6",
        titleEn: "Chapter 6 — Manufacturers' Orders",
        titleEs: "Capítulo 6 — Pedidos de Fabricantes",
        match: "Summary: Chapter 6",
        children: [
          { id: "s-ch6-concepts", titleEn: "Key Concepts", titleEs: "Conceptos Clave", match: "Key Concepts" },
          { id: "s-ch6-volatility", titleEn: "The Volatility Problem", titleEs: "El Problema de la Volatilidad", match: "The Volatility Problem" },
        ],
      },
      {
        id: "summary-ch7",
        titleEn: "Chapter 7 — Inventories and Sales",
        titleEs: "Capítulo 7 — Inventarios y Ventas",
        match: "Summary: Chapter 7",
        children: [
          { id: "s-ch7-why", titleEn: "Why Inventories Matter", titleEs: "Por Qué Importan los Inventarios", match: "Why Inventories Matter" },
          { id: "s-ch7-data", titleEn: "Data Structure", titleEs: "Estructura de Datos", match: "Data Structure" },
        ],
      },
      {
        id: "summary-ch8",
        titleEn: "Chapter 8 — Residential Construction",
        titleEs: "Capítulo 8 — Construcción Residencial",
        match: "Summary: Chapter 8",
        children: [
          { id: "s-ch8-data", titleEn: "Data Structure", titleEs: "Estructura de Datos", match: "Data Structure" },
          { id: "s-ch8-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
        ],
      },
      {
        id: "summary-ch9",
        titleEn: "Chapter 9 — Consumer Confidence",
        titleEs: "Capítulo 9 — Confianza del Consumidor",
        match: "Summary: Chapter 9",
        children: [
          { id: "s-ch9-surveys", titleEn: "Two Surveys Compared", titleEs: "Dos Encuestas Comparadas", match: "Two Surveys Compared" },
          { id: "s-ch9-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
        ],
      },
      {
        id: "summary-ch10",
        titleEn: "Chapter 10 — Retail Sales",
        titleEs: "Capítulo 10 — Ventas Minoristas",
        match: "Summary: Chapter 10",
        children: [
          { id: "s-ch10-data", titleEn: "Data Structure", titleEs: "Estructura de Datos", match: "Data Structure" },
          { id: "s-ch10-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
        ],
      },
      {
        id: "summary-ch11",
        titleEn: "Chapter 11 — Personal Income",
        titleEs: "Capítulo 11 — Ingresos Personales",
        match: "Summary: Chapter 11",
        children: [
          { id: "s-ch11-data", titleEn: "Data Structure", titleEs: "Estructura de Datos", match: "Data Structure" },
          { id: "s-ch11-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
          { id: "s-ch11-drivers", titleEn: "Three Key Spending Drivers", titleEs: "Tres Factores Clave del Gasto", match: "Three Key Spending Drivers" },
        ],
      },
      {
        id: "summary-ch12",
        titleEn: "Chapter 12 — CPI / PPI",
        titleEs: "Capítulo 12 — CPI / PPI",
        match: "Summary: Chapter 12",
        children: [
          { id: "s-ch12-indices", titleEn: "Two Very Different Indices", titleEs: "Dos Índices Muy Diferentes", match: "Two Very Different Indices" },
          { id: "s-ch12-relationships", titleEn: "Key Analytical Relationships", titleEs: "Relaciones Analíticas Clave", match: "Key Analytical Relationships" },
        ],
      },
      {
        id: "summary-quick-ref",
        titleEn: "Quick Reference Table",
        titleEs: "Tabla de Referencia Rápida",
        match: "Summary: Quick Reference Table",
      },
      {
        id: "summary-note",
        titleEn: "Note on Figures and Charts",
        titleEs: "Nota sobre Figuras y Gráficos",
        match: "Note on Figures and Charts",
      },
    ],
  },
];

// resolveToc is now in @/utils/toc
