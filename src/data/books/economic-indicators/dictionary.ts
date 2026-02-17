import type { DictionaryEntry } from "@/types/book";

/**
 * Vocabulary from "The Trader's Guide to Key Economic Indicators": definitions in English and Spanish.
 * Contains economic, financial, and trading terminology.
 */
export const dictionary: DictionaryEntry[] = [
  // Core Economic Terms
  { word: "GDP", definition: "Gross Domestic Product: the total market value of all final goods and services produced within a country during a specific period.", definitionEs: "Producto Interno Bruto: el valor total de mercado de todos los bienes y servicios finales producidos dentro de un país durante un período específico." },
  { word: "YOY", definition: "Year-over-Year: a comparison of a metric for one period to the same period in the previous year, expressed as a percentage change.", definitionEs: "Interanual: comparación de una métrica de un período con el mismo período del año anterior, expresada como cambio porcentual." },
  { word: "GNP", definition: "Gross National Product: the total market value of all goods and services produced by a country's residents regardless of location.", definitionEs: "Producto Nacional Bruto: el valor total de mercado de todos los bienes y servicios producidos por los residentes de un país sin importar la ubicación." },
  { word: "macroeconomy", definition: "The large-scale economic factors of a region or country, such as national productivity, interest rates, and unemployment.", definitionEs: "Los factores económicos a gran escala de una región o país, como la productividad nacional, las tasas de interés y el desempleo." },
  { word: "recession", definition: "A significant decline in economic activity lasting more than a few months, typically visible in GDP, income, employment, and sales.", definitionEs: "Una disminución significativa en la actividad económica que dura más de unos meses, típicamente visible en el PIB, ingresos, empleo y ventas." },
  { word: "expansion", definition: "A period of economic growth when GDP increases and business activity rises.", definitionEs: "Un período de crecimiento económico cuando el PIB aumenta y la actividad empresarial crece." },
  { word: "contraction", definition: "A phase of the business cycle where the economy as a whole is in decline.", definitionEs: "Una fase del ciclo económico donde la economía en su conjunto está en declive." },
  { word: "trough", definition: "The lowest point of a business cycle, marking the end of a recession.", definitionEs: "El punto más bajo de un ciclo económico, que marca el fin de una recesión." },
  { word: "peak", definition: "The highest point of a business cycle before the economy begins to contract.", definitionEs: "El punto más alto de un ciclo económico antes de que la economía comience a contraerse." },
  { word: "deflator", definition: "A statistical measure used to convert nominal values to real values by removing the effect of price changes.", definitionEs: "Una medida estadística utilizada para convertir valores nominales a valores reales eliminando el efecto de los cambios de precios." },
  { word: "inflation", definition: "A general increase in prices and fall in the purchasing value of money.", definitionEs: "Un aumento general en los precios y una caída en el poder adquisitivo del dinero." },

  // Business Cycle Terms
  { word: "coincident", definition: "Economic indicators that occur at approximately the same time as the conditions they signify, reflecting current economic state.", definitionEs: "Indicadores económicos que ocurren aproximadamente al mismo tiempo que las condiciones que señalan, reflejando el estado económico actual." },
  { word: "leading", definition: "Economic indicators that change before the economy changes, used to predict future conditions.", definitionEs: "Indicadores económicos que cambian antes de que cambie la economía, utilizados para predecir condiciones futuras." },
  { word: "lagging", definition: "Economic indicators that follow economic events and confirm patterns after they occur.", definitionEs: "Indicadores económicos que siguen a los eventos económicos y confirman patrones después de que ocurren." },
  { word: "benchmark", definition: "A standard or point of reference against which things may be compared or assessed.", definitionEs: "Un estándar o punto de referencia contra el cual se pueden comparar o evaluar las cosas." },

  // National Income Accounting
  { word: "NIPAs", definition: "National Income and Product Accounts: comprehensive set of data about U.S. national output, production, and income distribution.", definitionEs: "Cuentas Nacionales de Ingreso y Producto: conjunto integral de datos sobre la producción nacional, output e distribución de ingresos de EE.UU." },
  { word: "BEA", definition: "Bureau of Economic Analysis: U.S. government agency that produces economic statistics including GDP.", definitionEs: "Oficina de Análisis Económico: agencia del gobierno de EE.UU. que produce estadísticas económicas incluyendo el PIB." },
  { word: "Bureau of Economic Analysis", definition: "U.S. Department of Commerce agency that produces GDP and other key economic statistics.", definitionEs: "Agencia del Departamento de Comercio de EE.UU. que produce el PIB y otras estadísticas económicas clave." },
  { word: "aggregate", definition: "A total or sum formed by combining several elements; in economics, the combined value of all economic activity.", definitionEs: "Un total o suma formado al combinar varios elementos; en economía, el valor combinado de toda la actividad económica." },

  // GDP Components
  { word: "consumption", definition: "Personal consumption expenditures: household spending on goods and services, the largest component of GDP.", definitionEs: "Gastos de consumo personal: gasto de los hogares en bienes y servicios, el componente más grande del PIB." },
  { word: "durable", definition: "Goods that last three or more years, such as automobiles, appliances, and furniture.", definitionEs: "Bienes que duran tres o más años, como automóviles, electrodomésticos y muebles." },
  { word: "nondurable", definition: "Goods consumed quickly, typically within three years, such as food, clothing, and fuel.", definitionEs: "Bienes que se consumen rápidamente, típicamente dentro de tres años, como alimentos, ropa y combustible." },
  { word: "inventory", definition: "Stock of goods held by businesses for future sale or use in production.", definitionEs: "Existencias de bienes mantenidos por las empresas para venta futura o uso en producción." },
  { word: "expenditure", definition: "The act of spending money; an amount of money spent.", definitionEs: "El acto de gastar dinero; una cantidad de dinero gastada." },

  // Market & Trading Terms
  { word: "newswire", definition: "A service that transmits news stories electronically to media outlets and financial institutions.", definitionEs: "Un servicio que transmite noticias electrónicamente a medios de comunicación e instituciones financieras." },
  { word: "consensus", definition: "A general agreement among economists or analysts about expected economic data.", definitionEs: "Un acuerdo general entre economistas o analistas sobre los datos económicos esperados." },
  { word: "hoot-and-holler", definition: "Real-time broadcast of economic data and interpretation on trading floors.", definitionEs: "Transmisión en tiempo real de datos económicos e interpretación en los pisos de negociación." },
  { word: "tape reading", definition: "Monitoring and interpreting real-time market data and news as it crosses the wires.", definitionEs: "Monitorear e interpretar datos de mercado y noticias en tiempo real a medida que cruzan los cables." },
  { word: "ticker", definition: "Electronic display showing current stock prices and market data.", definitionEs: "Pantalla electrónica que muestra precios de acciones actuales y datos del mercado." },
  { word: "tape", definition: "Stream of real-time market data and news (historically printed on ticker tape).", definitionEs: "Flujo de datos de mercado y noticias en tiempo real (históricamente impreso en cinta de teletipo)." },

  // Financial Institutions
  { word: "NBER", definition: "National Bureau of Economic Research: the organization that officially determines U.S. business cycle dates.", definitionEs: "Oficina Nacional de Investigación Económica: la organización que determina oficialmente las fechas del ciclo económico de EE.UU." },
  { word: "Federal Reserve", definition: "The central bank of the United States, responsible for monetary policy.", definitionEs: "El banco central de Estados Unidos, responsable de la política monetaria." },
  { word: "Fed", definition: "Short for Federal Reserve, the U.S. central banking system.", definitionEs: "Abreviatura de Reserva Federal, el sistema de banca central de EE.UU." },

  // Report Types
  { word: "advance report", definition: "The first estimate of GDP, released one month after quarter end.", definitionEs: "La primera estimación del PIB, publicada un mes después del fin del trimestre." },
  { word: "preliminary report", definition: "The second GDP estimate with refinements, released two months after quarter end.", definitionEs: "La segunda estimación del PIB con refinamientos, publicada dos meses después del fin del trimestre." },
  { word: "final report", definition: "The third GDP estimate with most complete data, released three months after quarter end.", definitionEs: "La tercera estimación del PIB con datos más completos, publicada tres meses después del fin del trimestre." },
  { word: "revision", definition: "An update to previously reported economic data based on new information.", definitionEs: "Una actualización de datos económicos previamente reportados basada en nueva información." },

  // Economic Concepts
  { word: "barometer", definition: "Something that reflects changes in conditions; an indicator.", definitionEs: "Algo que refleja cambios en las condiciones; un indicador." },
  { word: "top-down", definition: "An investment approach that starts with macroeconomic analysis before selecting specific securities.", definitionEs: "Un enfoque de inversión que comienza con análisis macroeconómico antes de seleccionar valores específicos." },
  { word: "securities", definition: "Financial instruments such as stocks and bonds that represent ownership or debt.", definitionEs: "Instrumentos financieros como acciones y bonos que representan propiedad o deuda." },
  { word: "currency", definition: "A system of money in general use; money in any form as a medium of exchange.", definitionEs: "Un sistema de dinero de uso general; dinero en cualquier forma como medio de intercambio." },
  { word: "monetary policy", definition: "Actions by a central bank to control money supply and interest rates.", definitionEs: "Acciones de un banco central para controlar la oferta monetaria y las tasas de interés." },

  // Measurement Terms
  { word: "nominal", definition: "Values measured in current prices without adjusting for inflation.", definitionEs: "Valores medidos en precios actuales sin ajustar por inflación." },
  { word: "real", definition: "Values adjusted for inflation to reflect actual purchasing power.", definitionEs: "Valores ajustados por inflación para reflejar el poder adquisitivo real." },
  { word: "seasonally adjusted", definition: "Data modified to remove regular seasonal patterns for clearer trend analysis.", definitionEs: "Datos modificados para eliminar patrones estacionales regulares para un análisis de tendencias más claro." },
  { word: "annualized", definition: "Converted to an annual rate for comparison purposes.", definitionEs: "Convertido a una tasa anual para propósitos de comparación." },
  { word: "quarter", definition: "A three-month period used in financial and economic reporting.", definitionEs: "Un período de tres meses utilizado en informes financieros y económicos." },

  // Book-specific Technical Terms
  { word: "arcane", definition: "Understood by few; mysterious or secret.", definitionEs: "Entendido por pocos; misterioso o secreto." },
  { word: "dubious", definition: "Hesitating or doubtful; not to be relied upon.", definitionEs: "Vacilante o dudoso; en lo que no se puede confiar." },
  { word: "underpinning", definition: "A foundation or basis for something.", definitionEs: "Un fundamento o base para algo." },
  { word: "prognostications", definition: "Predictions or forecasts.", definitionEs: "Predicciones o pronósticos." },
  { word: "disseminated", definition: "Spread widely; distributed.", definitionEs: "Difundido ampliamente; distribuido." },
  { word: "interpolations", definition: "Estimates inserted between known values.", definitionEs: "Estimaciones insertadas entre valores conocidos." },
  { word: "benchmark revision", definition: "Comprehensive update to economic data methodology, typically every five years.", definitionEs: "Actualización integral de la metodología de datos económicos, típicamente cada cinco años." },
  { word: "clandestine", definition: "Kept secret or done secretly.", definitionEs: "Mantenido en secreto o hecho secretamente." },
  { word: "underground economy", definition: "Economic activity not reported to the government; black market transactions.", definitionEs: "Actividad económica no reportada al gobierno; transacciones del mercado negro." },

  // Investment Terms
  { word: "portfolio", definition: "A collection of investments held by an individual or institution.", definitionEs: "Una colección de inversiones mantenidas por un individuo o institución." },
  { word: "volatility", definition: "The degree of variation in trading prices over time.", definitionEs: "El grado de variación en los precios de negociación a lo largo del tiempo." },
  { word: "liquidity", definition: "How easily an asset can be converted to cash without affecting its price.", definitionEs: "Qué tan fácilmente un activo puede convertirse en efectivo sin afectar su precio." },
  { word: "yield", definition: "The income return on an investment, such as interest or dividends.", definitionEs: "El retorno de ingresos de una inversión, como intereses o dividendos." },
  { word: "equity", definition: "Ownership interest in a company, represented by shares of stock.", definitionEs: "Interés de propiedad en una empresa, representado por acciones." },
  { word: "bond", definition: "A debt security where the issuer owes the holder a debt and pays interest.", definitionEs: "Un valor de deuda donde el emisor debe al tenedor una deuda y paga intereses." },

  // Economic Indicators
  { word: "indexes", definition: "Plural of index; statistical measures that track changes in economic variables over time.", definitionEs: "Plural de índice; medidas estadísticas que rastrean cambios en variables económicas a lo largo del tiempo." },
  { word: "PMI", definition: "Purchasing Managers' Index: a measure of manufacturing sector health.", definitionEs: "Índice de Gerentes de Compras: una medida de la salud del sector manufacturero." },
  { word: "CPI", definition: "Consumer Price Index: measures changes in prices paid by consumers.", definitionEs: "Índice de Precios al Consumidor: mide los cambios en los precios pagados por los consumidores." },
  { word: "PPI", definition: "Producer Price Index: measures changes in prices received by producers.", definitionEs: "Índice de Precios al Productor: mide los cambios en los precios recibidos por los productores." },
  { word: "ISM", definition: "Institute for Supply Management: organization that publishes manufacturing indices.", definitionEs: "Instituto de Gestión de Suministros: organización que publica índices de manufactura." },

  // Additional Economic Terms
  { word: "fiscal", definition: "Related to government revenue and spending.", definitionEs: "Relacionado con los ingresos y gastos del gobierno." },
  { word: "stimulus", definition: "Government spending or tax cuts intended to boost economic activity.", definitionEs: "Gasto gubernamental o recortes de impuestos destinados a impulsar la actividad económica." },
  { word: "austerity", definition: "Difficult economic conditions created by government measures to reduce spending.", definitionEs: "Condiciones económicas difíciles creadas por medidas gubernamentales para reducir el gasto." },
  { word: "subsidy", definition: "Money given by the government to support a business or economic sector.", definitionEs: "Dinero dado por el gobierno para apoyar un negocio o sector económico." },
  { word: "tariff", definition: "A tax on imported goods.", definitionEs: "Un impuesto sobre bienes importados." },
  { word: "deficit", definition: "The amount by which expenses exceed income or spending exceeds revenue.", definitionEs: "La cantidad por la cual los gastos exceden los ingresos o el gasto excede los ingresos." },
  { word: "surplus", definition: "An excess of income or revenue over expenditure.", definitionEs: "Un exceso de ingresos sobre los gastos." },

  // Author acknowledgments vocabulary
  { word: "indubitably", definition: "Without doubt; unquestionably.", definitionEs: "Sin duda; incuestionablemente." },
  { word: "disseminated", definition: "Spread or dispersed widely.", definitionEs: "Difundido o dispersado ampliamente." },
  { word: "counselors", definition: "People who give advice or guidance.", definitionEs: "Personas que dan consejos u orientación." },
  { word: "underpinning", definition: "A solid foundation or basis.", definitionEs: "Una base o fundamento sólido." },
  { word: "compendium", definition: "A collection of concise but detailed information about a particular subject.", definitionEs: "Una colección de información concisa pero detallada sobre un tema particular." },
  { word: "subcomponent", definition: "A component that is part of a larger component; a secondary element of an indicator.", definitionEs: "Un componente que forma parte de un componente más grande; un elemento secundario de un indicador." },
  { word: "slipup", definition: "A minor mistake or error, especially one with serious consequences in trading.", definitionEs: "Un error menor o desliz, especialmente uno con consecuencias graves en la negociación." },
  { word: "Regulation FD", definition: "Fair Disclosure regulation adopted in 2000 requiring companies to disclose material information to all investors simultaneously.", definitionEs: "Reglamento de Divulgación Justa adoptado en 2000 que exige a las empresas divulgar información material a todos los inversionistas simultáneamente." },

  // Market activity
  { word: "trading floor", definition: "The area of an exchange where trading takes place.", definitionEs: "El área de una bolsa donde se realiza la negociación." },
  { word: "money-center bank", definition: "A large bank located in a financial center that deals in international money markets.", definitionEs: "Un banco grande ubicado en un centro financiero que opera en mercados monetarios internacionales." },
  { word: "Wall Street", definition: "The financial district in New York City; used to refer to U.S. financial markets in general.", definitionEs: "El distrito financiero en la ciudad de Nueva York; usado para referirse a los mercados financieros de EE.UU. en general." },
  { word: "trader", definition: "A person who buys and sells financial instruments.", definitionEs: "Una persona que compra y vende instrumentos financieros." },
  { word: "analyst", definition: "A person who studies data and makes recommendations, especially in finance.", definitionEs: "Una persona que estudia datos y hace recomendaciones, especialmente en finanzas." },

  // Miscellaneous
  { word: "anecdotal", definition: "Based on personal accounts rather than research or statistical analysis.", definitionEs: "Basado en relatos personales en lugar de investigación o análisis estadístico." },
  { word: "fluctuation", definition: "An irregular rising and falling in number or amount.", definitionEs: "Una subida y bajada irregular en número o cantidad." },
  { word: "amplitude", definition: "The maximum extent of a vibration or oscillation from equilibrium.", definitionEs: "La extensión máxima de una vibración u oscilación desde el equilibrio." },
  { word: "palatable", definition: "Acceptable or agreeable to the mind or feelings.", definitionEs: "Aceptable o agradable para la mente o los sentimientos." },
  { word: "ebullient", definition: "Cheerful and full of energy; exuberant.", definitionEs: "Alegre y lleno de energía; exuberante." },

  // Additional terms from content
  { word: "inclement", definition: "Severe or harsh (especially of weather); stormy.", definitionEs: "Severo o duro (especialmente del clima); tormentoso." },
  { word: "havoc", definition: "Widespread destruction or chaos.", definitionEs: "Destrucción generalizada o caos." },
  { word: "precepts", definition: "General rules intended to regulate behavior or thought.", definitionEs: "Reglas generales destinadas a regular el comportamiento o el pensamiento." },
  { word: "commonsensical", definition: "Based on or in accordance with common sense; reasonable.", definitionEs: "Basado en o de acuerdo con el sentido común; razonable." },
  { word: "arbiter", definition: "A person or organization with the power to settle disputes or make authoritative decisions.", definitionEs: "Una persona u organización con el poder de resolver disputas o tomar decisiones autoritativas." },
  { word: "engender", definition: "To cause or give rise to; to produce.", definitionEs: "Causar o dar lugar a; producir." },
  { word: "embargoed", definition: "Officially prohibited from being released or published until a certain date.", definitionEs: "Oficialmente prohibido de ser publicado hasta cierta fecha." },
  { word: "prudent", definition: "Acting with or showing care and thought for the future.", definitionEs: "Actuar con o mostrar cuidado y pensamiento para el futuro." },
  { word: "apprised", definition: "Informed or made aware of something.", definitionEs: "Informado o consciente de algo." },
  { word: "mosaic", definition: "A picture or pattern produced by arranging small colored pieces; a combination of diverse elements.", definitionEs: "Una imagen o patrón producido al arreglar pequeñas piezas de colores; una combinación de elementos diversos." },
  { word: "hypothesized", definition: "Put forward as a hypothesis; proposed as a possible explanation.", definitionEs: "Propuesto como hipótesis; planteado como posible explicación." },
  { word: "tangible", definition: "Real and able to be measured or understood clearly.", definitionEs: "Real y capaz de ser medido o entendido claramente." },
  { word: "macroeconomic", definition: "Relating to the overall performance of a national or regional economy.", definitionEs: "Relacionado con el desempeño general de una economía nacional o regional." },
  { word: "accounting", definition: "The process of recording and reporting financial transactions.", definitionEs: "El proceso de registrar e informar transacciones financieras." },
  { word: "policymakers", definition: "People responsible for making policy, especially in government.", definitionEs: "Personas responsables de hacer políticas, especialmente en el gobierno." },
  { word: "Simon Kuznets", definition: "Nobel Prize-winning economist who pioneered national income accounting in the 1930s.", definitionEs: "Economista ganador del Premio Nobel que fue pionero en la contabilidad del ingreso nacional en los años 1930." },
  { word: "Great Depression", definition: "The severe worldwide economic downturn from 1929 to the late 1930s.", definitionEs: "La severa recesión económica mundial desde 1929 hasta finales de los años 1930." },
  { word: "Roaring Twenties", definition: "The 1920s decade known for economic prosperity and cultural dynamism.", definitionEs: "La década de 1920 conocida por la prosperidad económica y el dinamismo cultural." },
  { word: "conglomerate", definition: "A large corporation formed by the merger of different business enterprises.", definitionEs: "Una gran corporación formada por la fusión de diferentes empresas comerciales." },
  { word: "daunting", definition: "Seeming difficult to deal with; intimidating.", definitionEs: "Que parece difícil de manejar; intimidante." },
  { word: "roadblocks", definition: "Obstacles or barriers that impede progress.", definitionEs: "Obstáculos o barreras que impiden el progreso." },
  { word: "formulate", definition: "To create or devise methodically; to express in a systematic form.", definitionEs: "Crear o idear metódicamente; expresar en forma sistemática." },
  { word: "attainment", definition: "The act of achieving a goal or reaching a level.", definitionEs: "El acto de alcanzar una meta o llegar a un nivel." },
  { word: "domestically", definition: "Within a country's own borders; relating to internal affairs.", definitionEs: "Dentro de las fronteras de un país; relacionado con asuntos internos." },
  { word: "revere", definition: "To feel deep respect or admiration for.", definitionEs: "Sentir profundo respeto o admiración por." },
  { word: "minuscule", definition: "Extremely small; tiny.", definitionEs: "Extremadamente pequeño; diminuto." },
  { word: "interpolations", definition: "Values estimated between known data points.", definitionEs: "Valores estimados entre puntos de datos conocidos." },
  { word: "counterfeit", definition: "Made in exact imitation with intent to deceive; fake.", definitionEs: "Hecho en imitación exacta con intención de engañar; falso." },
  { word: "clandestine", definition: "Kept secret or done secretly, especially because illicit.", definitionEs: "Mantenido en secreto o hecho secretamente, especialmente porque es ilícito." },
  { word: "dissected", definition: "Analyzed in detail; examined thoroughly.", definitionEs: "Analizado en detalle; examinado a fondo." },
  { word: "susceptible", definition: "Likely to be influenced or affected by something.", definitionEs: "Probable de ser influenciado o afectado por algo." },
  { word: "DaimlerChrysler", definition: "German-American automotive manufacturer (now Stellantis).", definitionEs: "Fabricante automotriz germano-estadounidense (ahora Stellantis)." },
  { word: "Lexus", definition: "Luxury vehicle division of Japanese automaker Toyota.", definitionEs: "División de vehículos de lujo del fabricante japonés Toyota." },
  { word: "Sara Lee", definition: "American consumer goods company known for food products.", definitionEs: "Empresa estadounidense de bienes de consumo conocida por productos alimenticios." },
  { word: "underground economy", definition: "Economic activity that is not reported to the government, including illegal transactions.", definitionEs: "Actividad económica que no se reporta al gobierno, incluyendo transacciones ilegales." },
  { word: "identity", definition: "In mathematics, an equation that is always true regardless of the values of its variables.", definitionEs: "En matemáticas, una ecuación que siempre es verdadera independientemente de los valores de sus variables." },
  { word: "dismal science", definition: "A nickname for economics, coined by Thomas Carlyle in the 19th century.", definitionEs: "Un apodo para la economía, acuñado por Thomas Carlyle en el siglo XIX." },
  { word: "Goodyear", definition: "Goodyear Tire & Rubber Company: major American tire manufacturer.", definitionEs: "Goodyear Tire & Rubber Company: importante fabricante estadounidense de neumáticos." },
  { word: "intermediate", definition: "Goods used as inputs in the production of other goods, not sold to final consumers.", definitionEs: "Bienes utilizados como insumos en la producción de otros bienes, no vendidos a consumidores finales." },
  { word: "services", definition: "Intangible products such as healthcare, education, and financial services that make up a large portion of GDP.", definitionEs: "Productos intangibles como salud, educación y servicios financieros que constituyen una gran porción del PIB." },
  { word: "market value", definition: "The price at which goods or services would trade in a competitive market.", definitionEs: "El precio al cual los bienes o servicios se intercambiarían en un mercado competitivo." },
  { word: "final goods", definition: "Products sold to the end consumer, not used as inputs for other products.", definitionEs: "Productos vendidos al consumidor final, no utilizados como insumos para otros productos." },
  { word: "resales", definition: "The sale of previously purchased goods; not counted in GDP calculations.", definitionEs: "La venta de bienes previamente comprados; no se cuenta en los cálculos del PIB." },
  { word: "double-counting", definition: "The error of counting an economic value more than once, such as counting both raw materials and finished goods.", definitionEs: "El error de contar un valor económico más de una vez, como contar tanto materias primas como productos terminados." },
  { word: "net factor income", definition: "The difference between receipts from abroad and payments to foreign sources.", definitionEs: "La diferencia entre los recibos del extranjero y los pagos a fuentes extranjeras." },

  // New terms from extended GDP chapter (Personal consumption, investment, government, deflators, national income)
  { word: "Personal Income and Outlays", definition: "A monthly BEA report that is the direct source of data for the personal consumption component of GDP.", definitionEs: "Un informe mensual de la BEA que es la fuente directa de datos para el componente de consumo personal del PIB." },
  { word: "gross private domestic investment", definition: "Spending by businesses on equipment, structures, and inventories, plus residential investment; a main component of GDP.", definitionEs: "Gasto de las empresas en equipo, estructuras e inventarios, más inversión residencial; un componente principal del PIB." },
  { word: "fixed investment", definition: "Gross private domestic investment minus inventories; spending on structures and equipment that lasts multiple years.", definitionEs: "Inversión doméstica privada bruta menos inventarios; gasto en estructuras y equipo que dura varios años." },
  { word: "capital spending", definition: "Nonresidential fixed investment: outlays on equipment, software, and structures such as plants and factories.", definitionEs: "Inversión fija no residencial: desembolsos en equipo, software y estructuras como plantas y fábricas." },
  { word: "net exports", definition: "Exports minus imports; the last component in the GDP equation, often negative for the U.S.", definitionEs: "Exportaciones menos importaciones; el último componente en la ecuación del PIB, a menudo negativo para EE.UU." },
  { word: "chain weighting", definition: "BEA method that updates the base period over time to minimize distortion in real GDP growth rates.", definitionEs: "Método de la BEA que actualiza el período base con el tiempo para minimizar la distorsión en las tasas de crecimiento del PIB real." },
  { word: "chain-weighted", definition: "Calculated using chain weighting; real GDP and components are reported in chained dollars.", definitionEs: "Calculado usando ponderación en cadena; el PIB real y los componentes se reportan en dólares encadenados." },
  { word: "additivity", definition: "Property that the sum of components equals the total; lost under chain weighting.", definitionEs: "Propiedad de que la suma de los componentes iguala el total; se pierde bajo ponderación en cadena." },
  { word: "implicit price deflator", definition: "A measure of inflation derived from the ratio of nominal to real GDP or a component.", definitionEs: "Una medida de la inflación derivada de la razón del PIB nominal al real o de un componente." },
  { word: "national income", definition: "Sum of all incomes generated in production: compensation, net interest, proprietors' income, rental income, and corporate profits.", definitionEs: "Suma de todos los ingresos generados en la producción: compensación, interés neto, ingreso de propietarios, ingreso por alquiler y ganancias corporativas." },
  { word: "compensation of employees", definition: "Wages, salaries, and supplements (e.g., employer social insurance) paid to workers; about 70% of national income.", definitionEs: "Salarios, sueldos y suplementos (p. ej. seguro social del empleador) pagados a los trabajadores; aproximadamente 70% del ingreso nacional." },
  { word: "net interest", definition: "Interest paid by businesses and related entities minus interest received; part of national income.", definitionEs: "Interés pagado por empresas y entidades relacionadas menos interés recibido; parte del ingreso nacional." },
  { word: "proprietors' income", definition: "Earnings of unincorporated businesses (sole proprietorships and partnerships); part of national income.", definitionEs: "Ganancias de empresas no incorporadas (propietarios únicos y sociedades); parte del ingreso nacional." },
  { word: "rental income", definition: "Rents from property and royalties from copyrights and patents, for persons not mainly in real estate; part of national income.", definitionEs: "Alquileres de propiedad y regalías por derechos de autor y patentes, de personas no principalmente en bienes raíces; parte del ingreso nacional." },
  { word: "corporate profits", definition: "Earnings of corporations before or after tax; part of national income, with IVA and CCAdj applied.", definitionEs: "Ganancias de corporaciones antes o después de impuestos; parte del ingreso nacional, con IVA y CCAdj aplicados." },
  { word: "inventory valuation adjustment", definition: "IVA; adjustment so inventory is valued at current replacement cost rather than historical cost.", definitionEs: "IVA; ajuste para que el inventario se valore al costo de reemplazo actual en lugar del costo histórico." },
  { word: "IVA", definition: "Inventory valuation adjustment: aligns inventory valuation with BEA's current-replacement-cost method.", definitionEs: "Ajuste por valoración de inventarios: alinea la valoración de inventarios con el método de costo de reemplazo actual de la BEA." },
  { word: "capital consumption adjustment", definition: "CCAdj; adjustment for differences between business and national-accounts treatment of depreciation.", definitionEs: "CCAdj; ajuste por diferencias entre el tratamiento empresarial y el de cuentas nacionales de la depreciación." },
  { word: "CCAdj", definition: "Capital consumption adjustment: reconciles depreciation and capital consumption in national income.", definitionEs: "Ajuste por consumo de capital: reconcilia la depreciación y el consumo de capital en el ingreso nacional." },
  { word: "depreciation", definition: "Reduction in value of assets over the measurement period; economists call it capital consumption.", definitionEs: "Reducción en el valor de los activos durante el período de medición; los economistas lo llaman consumo de capital." },
  { word: "book profits", definition: "Pretax profits as reported on company books before tax and distribution to shareholders.", definitionEs: "Ganancias antes de impuestos según los libros de la empresa antes de impuestos y distribución a accionistas." },
  { word: "operating profits", definition: "Profits from current production after IVA and CCAdj; used in national income.", definitionEs: "Ganancias de la producción actual después del IVA y CCAdj; usadas en el ingreso nacional." },
  { word: "after-tax profits", definition: "Corporate profits after subtracting tax liability; available for dividends and retention.", definitionEs: "Ganancias corporativas después de restar el pasivo fiscal; disponibles para dividendos y retención." },
  { word: "consumption of fixed capital", definition: "Depreciation charge for private and government fixed capital used in production.", definitionEs: "Cargo por depreciación del capital fijo privado y gubernamental usado en la producción." },
  { word: "indirect business taxes", definition: "Sales, excise, property taxes, and customs duties paid by businesses; added to national income to get from NI to GDP.", definitionEs: "Impuestos a las ventas, especiales, a la propiedad y derechos aduaneros pagados por las empresas; se suman al ingreso nacional para pasar de IN a PIB." },
  { word: "transfer payments", definition: "Payments by businesses or government to individuals without a good or service in exchange (e.g., donations, liability payments).", definitionEs: "Pagos de empresas o gobierno a individuos sin un bien o servicio a cambio (p. ej. donaciones, pagos por responsabilidad)." },
  { word: "judgmental trend", definition: "BEA method to extrapolate or interpolate when source data are only available annually.", definitionEs: "Método de la BEA para extrapolar o interpolar cuando los datos fuente solo están disponibles anualmente." },
  { word: "quinquennial", definition: "Occurring every five years; e.g., Census Bureau quinquennial censuses.", definitionEs: "Que ocurre cada cinco años; p. ej. censos quinquenales de la Oficina del Censo." },
  { word: "extrapolation", definition: "Estimating values outside the range of known data (e.g., quarterly from annual).", definitionEs: "Estimar valores fuera del rango de datos conocidos (p. ej. trimestral a partir de anual)." },
  { word: "statistical discrepancy", definition: "Difference between expenditure-based GDP and income-based gross domestic income due to data sources.", definitionEs: "Diferencia entre el PIB basado en gastos y el ingreso doméstico bruto basado en ingresos debido a las fuentes de datos." },
  { word: "gross domestic income", definition: "GDP measured by the income approach; should equal expenditure-based GDP after adjustments.", definitionEs: "PIB medido por el enfoque del ingreso; debería igualar al PIB basado en gastos después de los ajustes." },
  { word: "mother lode", definition: "A rich or abundant source of something; a main vein of ore.", definitionEs: "Una fuente rica o abundante de algo; una veta principal de mineral." },
  { word: "REITs", definition: "Real estate investment trusts: companies that own or finance income-producing real estate.", definitionEs: "Fideicomisos de inversión en bienes raíces: empresas que poseen o financian bienes raíces que generan ingresos." },
  { word: "fixed-income", definition: "Referring to securities that pay a fixed return, such as bonds; sensitive to inflation and interest rates.", definitionEs: "Referido a valores que pagan un retorno fijo, como bonos; sensibles a la inflación y tasas de interés." },
  { word: "headline number", definition: "The main or most watched figure in an economic report (e.g., quarterly annualized real GDP growth).", definitionEs: "La cifra principal o más vigilada en un informe económico (p. ej. crecimiento trimestral anualizado del PIB real)." },
  { word: "deflation", definition: "A sustained decrease in the general price level; the opposite of inflation, and rare in the U.S.", definitionEs: "Una disminución sostenida en el nivel general de precios; lo opuesto a la inflación, y rara en EE.UU." },
  { word: "sell-off", definition: "A rapid selling of securities, often leading to a sharp decline in prices.", definitionEs: "Una venta rápida de valores, que a menudo lleva a una caída brusca de los precios." },
  { word: "torrid", definition: "Very hot or intense; used for strong economic growth that may fuel inflation.", definitionEs: "Muy caliente o intenso; usado para un crecimiento económico fuerte que puede alimentar la inflación." },

  // Summary section terms
  { word: "NAIRCU", definition: "Non-Accelerating Inflation Rate of Capacity Utilization: the level of capacity utilization above which inflation tends to accelerate.", definitionEs: "Tasa de Utilización de Capacidad que No Acelera la Inflación: el nivel de utilización de capacidad por encima del cual la inflación tiende a acelerarse." },
  { word: "NAIRU", definition: "Non-Accelerating Inflation Rate of Unemployment: the unemployment rate below which inflation tends to rise.", definitionEs: "Tasa de Desempleo que No Acelera la Inflación: la tasa de desempleo por debajo de la cual la inflación tiende a subir." },
  { word: "diffusion index", definition: "A measure showing the percentage of components that are rising; above 50 means more are expanding than contracting.", definitionEs: "Una medida que muestra el porcentaje de componentes que están subiendo; por encima de 50 significa que más están expandiéndose que contrayéndose." },
  { word: "yield curve", definition: "A graph plotting interest rates of bonds with different maturities; an inverted curve (short rates above long rates) has preceded every modern recession.", definitionEs: "Un gráfico que traza las tasas de interés de bonos con diferentes vencimientos; una curva invertida (tasas cortas por encima de las largas) ha precedido cada recesión moderna." },
  { word: "output gap", definition: "The difference between actual GDP and potential GDP; a positive gap signals inflation risk, a negative gap signals slack.", definitionEs: "La diferencia entre el PIB real y el PIB potencial; una brecha positiva señala riesgo de inflación, una brecha negativa señala holgura." },
  { word: "multiplier effect", definition: "The amplified impact of an initial spending change on total economic output, as spending circulates through the economy.", definitionEs: "El impacto amplificado de un cambio inicial en el gasto sobre la producción económica total, a medida que el gasto circula por la economía." },
  { word: "NDCGXA", definition: "Nondefense Capital Goods Excluding Aircraft: a key proxy for business investment intentions in the GDP report.", definitionEs: "Bienes de Capital No Relacionados con Defensa Excluyendo Aeronaves: un indicador clave de las intenciones de inversión empresarial en el informe del PIB." },
  { word: "GAFO", definition: "General Merchandise, Apparel, Furniture, and Other: a retail sales subset that reveals core discretionary consumer spending.", definitionEs: "Mercancía General, Ropa, Muebles y Otros: un subconjunto de ventas minoristas que revela el gasto discrecional básico del consumidor." },
  { word: "wealth effect", definition: "The tendency for consumers to spend more when the value of their assets (stocks, real estate) increases.", definitionEs: "La tendencia de los consumidores a gastar más cuando el valor de sus activos (acciones, bienes raíces) aumenta." },
  { word: "Misery Index", definition: "The sum of the unemployment rate and the inflation rate; a simple gauge of economic distress.", definitionEs: "La suma de la tasa de desempleo y la tasa de inflación; una medida simple del malestar económico." },
  { word: "demand-pull", definition: "Inflation caused by increased demand exceeding supply; considered more persistent and worrisome than cost-push inflation.", definitionEs: "Inflación causada por un aumento de la demanda que excede la oferta; considerada más persistente y preocupante que la inflación por empuje de costos." },
  { word: "cost-push", definition: "Inflation caused by rising production costs (materials, wages) that are passed on to consumers.", definitionEs: "Inflación causada por el aumento de los costos de producción (materiales, salarios) que se trasladan a los consumidores." },
  { word: "disinflation", definition: "A slowing in the rate of price increases; prices still rise but at a decreasing pace.", definitionEs: "Una desaceleración en la tasa de aumento de precios; los precios siguen subiendo pero a un ritmo decreciente." },
  { word: "animal spirits", definition: "A term coined by Keynes describing the emotional and instinctive impulses that drive consumer and investor behavior.", definitionEs: "Un término acuñado por Keynes que describe los impulsos emocionales e instintivos que impulsan el comportamiento de consumidores e inversores." },
  { word: "LEI", definition: "Leading Economic Index: a composite of 10 forward-looking indicators published by the Conference Board.", definitionEs: "Índice Económico Adelantado: un compuesto de 10 indicadores prospectivos publicado por el Conference Board." },
  { word: "BLS", definition: "Bureau of Labor Statistics: the U.S. agency that produces the Employment Situation report, CPI, and PPI.", definitionEs: "Oficina de Estadísticas Laborales: la agencia de EE.UU. que produce el informe de la Situación del Empleo, el CPI y el PPI." },
  { word: "nonfarm payrolls", definition: "The total number of paid U.S. workers excluding farm employees, government workers, and nonprofit employees; the headline number from the Employment Situation report.", definitionEs: "El número total de trabajadores remunerados en EE.UU. excluyendo empleados agrícolas, gubernamentales y de organizaciones sin fines de lucro; la cifra principal del informe de la Situación del Empleo." },
  { word: "PCE", definition: "Personal Consumption Expenditures: a measure of consumer spending that the Fed prefers over CPI for gauging inflation.", definitionEs: "Gastos de Consumo Personal: una medida del gasto del consumidor que la Fed prefiere sobre el CPI para medir la inflación." },
  { word: "M2", definition: "A measure of the money supply that includes cash, checking deposits, savings deposits, and money market securities.", definitionEs: "Una medida de la oferta monetaria que incluye efectivo, depósitos a la vista, depósitos de ahorro y valores del mercado monetario." },
  { word: "frictional", definition: "Unemployment that occurs naturally as workers transition between jobs; a normal part of a healthy economy.", definitionEs: "Desempleo que ocurre naturalmente cuando los trabajadores transitan entre empleos; una parte normal de una economía saludable." },
  { word: "structural", definition: "Unemployment caused by a mismatch between workers' skills and the skills demanded by employers, often due to technological change.", definitionEs: "Desempleo causado por un desajuste entre las habilidades de los trabajadores y las habilidades demandadas por los empleadores, a menudo debido al cambio tecnológico." },
  { word: "cyclical", definition: "Unemployment that rises during recessions and falls during expansions; directly tied to the business cycle.", definitionEs: "Desempleo que sube durante las recesiones y baja durante las expansiones; directamente ligado al ciclo económico." },

  // Additional technical & financial terms
  { word: "amortization", definition: "The gradual paying off of a debt or the spreading of costs over time.", definitionEs: "La liquidación gradual de una deuda o la distribución de costos a lo largo del tiempo." },
  { word: "arbitrage", definition: "The simultaneous buying and selling of securities in different markets to profit from price differences.", definitionEs: "La compra y venta simultánea de valores en diferentes mercados para beneficiarse de las diferencias de precio." },
  { word: "collateral", definition: "Property or assets pledged as security for repayment of a loan.", definitionEs: "Propiedad o activos dados como garantía para el pago de un préstamo." },
  { word: "derivative", definition: "A financial instrument whose value depends on the value of an underlying asset.", definitionEs: "Un instrumento financiero cuyo valor depende del valor de un activo subyacente." },
  { word: "diversification", definition: "The strategy of spreading investments across different assets to reduce risk.", definitionEs: "La estrategia de distribuir inversiones entre diferentes activos para reducir el riesgo." },
  { word: "fiduciary", definition: "A person or organization that acts on behalf of another, bound to put the other's interests first.", definitionEs: "Una persona u organización que actúa en nombre de otra, obligada a anteponer los intereses del otro." },
  { word: "hedge", definition: "An investment made to reduce the risk of adverse price movements in an asset.", definitionEs: "Una inversión realizada para reducir el riesgo de movimientos adversos de precios en un activo." },
  { word: "insolvency", definition: "The state of being unable to pay debts owed.", definitionEs: "El estado de ser incapaz de pagar las deudas debidas." },
  { word: "leverage", definition: "The use of borrowed capital to increase the potential return of an investment.", definitionEs: "El uso de capital prestado para aumentar el rendimiento potencial de una inversión." },
  { word: "maturity", definition: "The date on which a financial instrument (bond, loan) becomes due for payment.", definitionEs: "La fecha en que un instrumento financiero (bono, préstamo) vence para su pago." },
  { word: "principal", definition: "The original sum of money borrowed or invested, excluding interest.", definitionEs: "La suma original de dinero prestada o invertida, excluyendo intereses." },
  { word: "quantitative easing", definition: "A monetary policy where a central bank purchases securities to increase money supply and stimulate lending.", definitionEs: "Una política monetaria donde un banco central compra valores para aumentar la oferta monetaria y estimular los préstamos." },
  { word: "stagflation", definition: "A condition of slow economic growth combined with high unemployment and rising prices.", definitionEs: "Una condición de crecimiento económico lento combinado con alto desempleo y precios en aumento." },
  { word: "underwriting", definition: "The process of evaluating and assuming financial risk, especially in insurance and securities.", definitionEs: "El proceso de evaluar y asumir riesgo financiero, especialmente en seguros y valores." },
  { word: "valuation", definition: "The process of determining the current worth of an asset or company.", definitionEs: "El proceso de determinar el valor actual de un activo o empresa." },
  { word: "solvency", definition: "The ability of a company to meet its long-term financial obligations.", definitionEs: "La capacidad de una empresa para cumplir con sus obligaciones financieras a largo plazo." },
  { word: "depreciation", definition: "The decrease in value of an asset over time due to wear and tear or obsolescence.", definitionEs: "La disminución en el valor de un activo a lo largo del tiempo debido al desgaste u obsolescencia." },
  { word: "appreciation", definition: "An increase in the value of an asset over time.", definitionEs: "Un aumento en el valor de un activo a lo largo del tiempo." },
  { word: "capitalization", definition: "The total market value of a company's outstanding shares; or the conversion of income into capital.", definitionEs: "El valor total de mercado de las acciones en circulación de una empresa; o la conversión de ingresos en capital." },
  { word: "commodities", definition: "Raw materials or primary agricultural products that can be bought and sold (oil, gold, wheat).", definitionEs: "Materias primas o productos agrícolas primarios que se pueden comprar y vender (petróleo, oro, trigo)." },
  { word: "correlation", definition: "A statistical measure showing how two variables move in relation to each other.", definitionEs: "Una medida estadística que muestra cómo dos variables se mueven en relación entre sí." },
  { word: "fundamentals", definition: "The basic underlying factors that determine the value of an investment or economy.", definitionEs: "Los factores subyacentes básicos que determinan el valor de una inversión o economía." },
  { word: "speculation", definition: "The act of trading in risky financial transactions in hopes of substantial profits.", definitionEs: "El acto de negociar en transacciones financieras riesgosas con la esperanza de ganancias sustanciales." },
  { word: "stagnation", definition: "A prolonged period of little or no growth in an economy.", definitionEs: "Un período prolongado de poco o ningún crecimiento en una economía." },
  { word: "exogenous", definition: "Originating from outside a system; an external shock or factor affecting the economy.", definitionEs: "Que se origina fuera de un sistema; un choque o factor externo que afecta la economía." },
  { word: "endogenous", definition: "Originating from within a system; internal factors driving economic change.", definitionEs: "Que se origina dentro de un sistema; factores internos que impulsan el cambio económico." },
];

/** Lowercased map for fast lookup */
const dictMap = new Map<string, DictionaryEntry>();
dictionary.forEach((entry) => {
  dictMap.set(entry.word.toLowerCase(), entry);
});

export function getDefinition(word: string): DictionaryEntry | undefined {
  const normalized = word.replace(/[^\w']/g, "").toLowerCase();
  return dictMap.get(normalized) ?? dictMap.get(word.toLowerCase());
}

/** Check if a token might be a word we have */
export function hasWord(word: string): boolean {
  return getDefinition(word) !== undefined;
}
