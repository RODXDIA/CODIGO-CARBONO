import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ChevronRight, Users, Clock, Atom, TrendingUp, Zap, X } from 'lucide-react';
const ExposicionGuion = () => {
    const [selectedRole, setSelectedRole] = useState('all');
    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPayload, setModalPayload] = useState(null);
    // Close modal on ESC
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')
                setModalOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);
    const openEcuacionModal = (ec) => {
        // Ultra-detailed explanations for each equation (can be extended)
        const detallesMap = {
            'Hamiltoniano Sistema': `Concepto:\nEl Hamiltoniano Ĥ describe la energía total del sistema en mecánica hamiltoniana y en mecánica cuántica es el operador energía. En sistemas N-partículas se separa en término cinético Σ p̂_i^2/(2m) y término de interacción Σ_{i<j} U(r_{ij}).\n\nDerivación / uso práctico:\nSe parte de la Lagrangiana L = T - V y por transformada de Legendre se obtiene H = Σ p_i q̇_i - L. En QM se sustituye p̂_i = -iħ∇_i y Ĥ actúa sobre funciones de onda ψ. Este operador es la base para obtener espectros energéticos (autovalores) y funciones propias (autofunciones).\n\nUnidades y escalas:\nTérmino cinético: energía [J] (o eV), p̂²/(2m) tiene unidades de energía. Típico en química computacional: energies en kJ/mol o eV.\n\nLimitaciones:\nModelo clásico/semiclásico no incluye efectos relativistas ni acoplamientos electrónico-nucleares explícitos sin terminos adicionales.\n\nEjemplo rápido:\nEn un par diatómico con potencial de Lennard-Jones, resolver Ĥψ = Eψ permite obtener los niveles vibracionales aproximados.`,
            'Potencial Lennard-Jones': `Concepto:\nU_LJ = 4ε[(σ/r)^12 - (σ/r)^6] modela interacciones no enlazantes: término repulsivo ~ (σ/r)^12 por exclusión pauli y término atractivo ~ (σ/r)^6 por fuerzas de dispersión de London.\n\nInterpretación de parámetros:\n• ε: profundidad de pozo (energía de interacción a la distancia de equilibrio) \n• σ: distancia a la cual U_LJ = 0 (escala de distancia)\n\nAplicaciones:\nSe usa en simulaciones MD y en parametrización de force-fields (CHARMM, OPLS). Permite predecir equilibrio r_eq ≈ 2^{1/6}σ.\n\nDerivación aproximada:\nEl exponente 6 proviene de la dependencia ~1/r^6 de la interacción dipolo inducido; el 12 es escogido por conveniencia computacional (cuadrado de 6).\n\nLimitaciones:\nNo captura enlaces covalentes ni interacciones direccionales (p. ej. puentes H). Para sistemas polares se combina con términos coulombianos.`,
            'Gibbs-Duhem': `Concepto:\ndG = -S dT + V dP + Σ μ_i dN_i es la forma fundamental de la energía libre de Gibbs para un sistema abierto (variable número de partículas).\n\nUso:\nPermite relacionar variaciones de potencial químico en mezclas y es base para criterios de equilibrio y estabilidad de fases. Cuando se impone T,P constantes, cambios de composición describen cómo cambia G.\n\nDerivación / relación:\nProviene de la definición G = H - TS y de la primera ley termodinámica con variables extensivas e intensivas. En mezclas la relación Gibbs-Duhem impone que Σ N_i dμ_i = -S dT + V dP.\n\nEjemplo:\nEn mezclas binaria a T,P constantes: N_1 dμ_1 + N_2 dμ_2 = 0 → cambios acoplados de μ_i.`,
            'Actividad No-Ideal': `Concepto:\nμ_i = μ_i° + RT ln(γ_i x_i) incorpora desviaciones de la idealidad mediante el coeficiente de actividad γ_i. Para soluciones ideales γ_i = 1.\n\nInterpretación:\nγ_i > 1 indica repulsión efectiva entre solutos (actividad mayor que la fracción molar), γ_i < 1 indica atracción neta.\n\nUso práctico:\nSe usan modelos Margules, Wilson, NRTL, UNIFAC para estimar γ_i y predecir equilibrio líquido-líquido o destilación.\n\nUnidades:\nμ en J/mol ; R = 8.314 J/(mol·K) ; ln adimensional.\n\nLimitaciones:\nModelos empíricos precisan datos experimentales para parametrizar; en mezclas complejas (polímeros) se requieren modelos específicos.`,
            'Flory-Huggins': `Concepto:\nΔG_mix/RT = n_1 ln(φ_1) + n_2 ln(φ_2) + χ_12 n_1 φ_2 modela mezcla polímero-solvente considerando tamaño de segmentos y energía media de interacción χ.\n\nSignificado χ:\nParámetro adimensional que cuantifica interacción polímero-solvente; χ>0 favorece separación de fases, χ<0 favorece mezcla.\n\nAplicaciones:\nUsado para polímeros, surfactantes y solventes orgánicos; predice solubilidad y transiciones de mezcla.\n\nLimitaciones:\nModelo media campo; no captura correlaciones de largo alcance ni estructuras de agregación complejas; requiere ajuste con datos experimentales.`,
            'Smoluchowski': `Concepto:\ndn/dt = -k_coag n^2 describe la cinética de coagulación por choques entre partículas en suspensión (regimen de coagulación secundaria).\n\nParámetros:\nk_coag depende de difusión relativa, viscosidad y potenciales de interacción (DLVO). Resolución analítica para condiciones iniciales da n(t) = n0 / (1 + k_coag n0 t).\n\nUsos:\nModela tiempos característicos de agregación, coalescencia en emulsiones y estabilidad coloidal.\n\nLimitaciones:\nAsume aglomeración por pares, sin ruptura; en regímenes complejos se necesitan modelos con kernel generalizado.`,
            'Stokes': `Concepto:\nv = 2 g r^2 Δρ / (9 η) es la ley de Stokes para velocidad terminal de una esfera en fluido viscoso laminar (Re << 1).\n\nDerivación:\nEquilibrio entre fuerza gravitacional (peso aparente) y fuerza viscosa 6π η r v y empuje de Arquímedes.\n\nCondiciones:\nReynolds pequeño (Re << 1), esfera rígida, flujo estacionario.\n\nEjemplo:\nPara gotitas pequeñas en agua típicas de laboratorio (r~100 μm) se usa para predecir sedimentación o flotación.`,
            'Einstein-Smoluchowski': `Concepto:\n⟨r^2(t)⟩ = 6 D_eff t relaciona el desplazamiento cuadrático medio con coeficiente difusión efectivo en 3D.\n\nUso:\nDeterminar D a partir de medidas experimentales (FRAP, seguimiento de partículas). En 1D la relación sería ⟨x^2⟩ = 2 D t.\n\nLimitaciones:\nAsume difusión Browniana normal (no anomalous). Para medios heterogéneos puede aparecer subdiffusión o superdiffusión.`,
            'Fenske': `Concepto:\nN_min = ln[(x_D/(1-x_D))/(x_B/(1-x_B))] / ln(α) da el número mínimo de etapas teóricas para separación por destilación en condiciones de equilibrio y refluxo infinito (diagrama McCabe-Thiele).\n\nInterpretación:\nα es volatilidad relativa media; x_D, x_B son fracciones molares en cabeza y fondo. Útil para estimar tamaño de columna.\n\nLimitaciones:\nAsume equilibrio en cada etapa, composición ideal en fase vapor; en práctica corrige con eficiencia de etapa (Murphree).`
        };
        const detalles = detallesMap[ec.nombre] ?? `Explicación detallada no disponible para ${ec.nombre}.`;
        setModalPayload({ nombre: ec.nombre, ecuacion: ec.ecuacion, aplicacion: ec.aplicacion, detalles });
        setModalOpen(true);
    };
    const roles = [
        {
            id: 'rodrigo',
            nombre: 'Rodrigo',
            color: 'bg-indigo-600',
            segmentos: [
                {
                    tiempo: '0:00-0:50',
                    seccion: 'Apertura: Termodinámica No-Equilibrio & Marco Teórico',
                    contenido: `"La contaminación de sistemas hídricos con compuestos orgánicos carbonados representa un desafío de química física fundamental: predecir miscibilidad mediante teoría de soluciones y termodinámica estadística.

[ECUACIÓN EN PANTALLA: Función partición canónica]

Consideremos el hamiltoniano del sistema N-partículas:
Ĥ = Σᵢ p̂ᵢ²/2m + Σᵢ<ⱼ U(rᵢⱼ)

donde U(rᵢⱼ) incluye:
• Interacciones electrostáticas Coulomb: U_C = kₑq₁q₂/r
• Potencial Lennard-Jones 6-12: U_LJ = 4ε[(σ/r)¹² - (σ/r)⁶]
• Puentes H modelados vía Stillinger-David potential

[SEÑALAR GRÁFICO POTENCIAL INTERMOLECULAR]

El etanol (C₂H₅OH) con χ_O = 3.44, χ_H = 2.20 genera momento dipolar permanente:
μ = 1.69 D = 5.64×10⁻³⁰ C·m

Calculamos energía puente H via perturbación Rayleigh-Schrödinger:
E_HB = ⟨ψ₀|Ĥ'|ψ₀⟩ + Σₙ |⟨ψₙ|Ĥ'|ψ₀⟩|²/(E₀-Eₙ)
E_HB ≈ -23 kJ/mol (experimental coincide con QM/MM calculations)

Triglicéridos: cadenas saturadas C₁₆H₃₂O₂ con simetría C₂ₕ → μ_neto ≈ 0"`,
                    visual: 'Hamiltoniano sistema, gráfico potenciales U(r), cálculo perturbativo, simetría molecular'
                },
                {
                    tiempo: '3:20-4:20',
                    seccion: 'Termodinámica Estadística & Fenomenología de Transporte',
                    contenido: `"Analizamos el criterio de miscibilidad vía minimización del potencial químico de Gibbs-Duhem modificado.

[SISTEMA DE ECUACIONES EN PANTALLA]

Para componentes i en mezcla binaria:
dG = -SdT + VdP + Σᵢ μᵢdNᵢ

Con actividades no-ideales:
μᵢ = μᵢ° + RT ln(γᵢxᵢ)

donde γᵢ es coeficiente actividad de Margules/Van Laar.

Sistema agua-etanol:
G^E/RT = x₁x₂[A₁₂x₁ + A₂₁x₂]
con A₁₂ = -0.8375, A₂₁ = -0.6278 (T=298K)
→ G^E < 0 → miscibilidad completa

[DIAGRAMA FASE BINARIO]

Sistema agua-aceite:
Parámetro interacción Flory-Huggins χ₁₂ = 2.8 >> 2 (crítico)
→ Separación de fases espontánea

Análisis cinético coalescencia vía ecuación Smoluchowski:
dn/dt = -k_coag n² 
con k_coag = 8kᴃT/(3η) × W(h)

donde W(h) es factor estabilidad DLVO:
W(h) = exp(-V_total/kᴃT)
V_total = V_vdW + V_elec + V_steric

Medimos tiempo característico:
τ_sep = (3ηh₀)/(2gr²Δρ) = 180 ± 15 s

Número Stokes: St = ρₚvr/18ηL = 0.023 << 1 (régimen Stokes válido)

[GRÁFICO LOG-LOG: CINÉTICA COALESCENCIA]

Tensor difusión efectivo D_eff determinado via Einstein-Smoluchowski:
⟨r²(t)⟩ = 6D_eff t
D_etanol-agua = 1.24×10⁻⁹ m²/s (experimental)
D_aceite-agua ≈ 10⁻¹² m²/s (3 órdenes magnitud menor)"`,
                    visual: 'Ecuaciones Gibbs-Duhem, diagrama G^E vs x, gráfico DLVO, cinética log-log, tensor difusión'
                }
            ]
        },
        {
            id: 'francisco',
            nombre: 'Francisco',
            color: 'bg-green-600',
            segmentos: [
                {
                    tiempo: '0:50-1:35',
                    seccion: 'Química Cuántica & Estructura Electrónica',
                    contenido: `"Empleamos teoría de orbitales moleculares (LCAO-MO) para racionalizar interacciones.

[DIAGRAMA ORBITAL MOLECULAR]

Etanol - grupo hidroxilo:
Oxígeno: configuración [He]2s²2p⁴
Hibridación sp³: mezcla 2s con 2p_x,2p_y,2p_z
|sp³⟩ = ½(|s⟩ + √3|p⟩)

Dos pares no-enlazantes ocupan orbitales n_O con energía:
E(n_O) = -12.3 eV (espectroscopía fotoelectrónica)

Enlace O-H polarizado:
Δχ = 3.44 - 2.20 = 1.24 → carácter iónico 30% (Pauling)
δ⁺_H = +0.33e, δ⁻_O = -0.66e (análisis Mulliken)

[MAPA POTENCIAL ELECTROSTÁTICO]

Puente hidrógeno: orbital antienlazante σ*(O-H) interactúa con n_O del aceptor
Deslocalización electrónica: Δρ ≈ 0.02 e/Å³

Integral solapamiento:
S = ⟨φ_donor|φ_acceptor⟩ = 0.18

Agua: red 3D coordinación tetraédrica
Ángulo H-O-H: 104.5° (hibridación sp³ con repulsión pares solitarios)
4 puentes H/molécula: 2 donadores, 2 aceptores

Cálculos DFT (B3LYP/6-311++G**):
ΔE_bind(H₂O-EtOH) = -24.3 kJ/mol
ΔE_bind(H₂O-H₂O) = -23.1 kJ/mol
→ Compatibilidad energética confirmada

Triglicéridos: σ-skeleton completamente saturado
Gap HOMO-LUMO: ΔE = 8.2 eV → sin polarizabilidad dipolar
α(aceite) = 2.3×10⁻³⁰ m³ vs α(agua) = 1.5×10⁻⁴⁰ m³"`,
                    visual: 'Diagramas MO, hibridación sp³, mapa electrostático 3D, cálculo DFT, espectro PE'
                }
            ]
        },
        {
            id: 'fabricio',
            nombre: 'Fabricio',
            color: 'bg-purple-600',
            segmentos: [
                {
                    tiempo: '1:35-2:20',
                    seccion: 'Diseño Experimental DOE & Caracterización Analítica',
                    contenido: `"Implementamos diseño factorial completo 2³ con variables ortogonales.

[MATRIZ DISEÑO EXPERIMENTAL]

Variable Independiente Multinivel:
X₁ ∈ {etanol, triglicérido} (categórica)

Variables Dependientes Multidimensionales:
Y = [y₁, y₂, y₃, y₄, y₅]ᵀ donde:
y₁: Transmitancia espectral T(λ) medida a λ=600nm
y₂: Número fases N_phase via análisis morfológico
y₃: Altura interfase h(t) con resolución Δh = 0.1mm
y₄: Coeficiente difusión D via FRAP
y₅: Energía interfacial γ via método gota pendiente

28 Variables Controladas con Tolerancias Estrictas:

TERMOSTATO: T = 298.15 ± 0.05 K (baño termostático circulante)
→ Control PID: K_p=5, K_i=0.5, K_d=0.1

VOLUMETRÍA: V_H₂O = 100.00 ± 0.05 mL (pipeta clase A calibrada)
V_compuesto = 20.00 ± 0.05 mL
Ratio molar: n_H₂O/n_soluto = 277:1 (etanol) ó 450:1 (triglicérido)

AGITACIÓN: ω = 300 rpm, t_agit = 30.0 ± 0.5 s
Número Reynolds: Re = ωd²ρ/η = 1200 (régimen laminar-transicional)

PUREZA REACTIVOS:
• H₂O: conductividad κ < 0.1 μS/cm, TOC < 10 ppb
• Etanol: pureza 99.95%, H₂O residual < 500 ppm (Karl Fischer)
• Aceite: índice acidez < 0.1 mg KOH/g, saponificación 188-194

INSTRUMENTACIÓN:
• Espectrofotómetro UV-Vis: resolución 0.5nm, precisión ±0.001 AU
• pHmetro: precisión ±0.001, compensación temperatura automática
• Densímetro: ±0.0001 g/cm³ (oscilación tubo U)

Análisis estadístico: n=3 réplicas técnicas
ANOVA factorial: α=0.05, poder=0.95
Tests post-hoc: Tukey HSD para comparaciones múltiples"`,
                    visual: 'Matriz DOE, diagrama PID, curva calibración volumétrica, especificaciones instrumentales'
                }
            ]
        },
        {
            id: 'bruno',
            nombre: 'Bruno',
            color: 'bg-orange-600',
            segmentos: [
                {
                    tiempo: '2:20-3:20',
                    seccion: 'Resultados Cuantitativos & Fenomenología Interfacial',
                    contenido: `"Presentamos análisis multiparamétrico con validación estadística rigurosa.

[TABLA DE RESULTADOS]

SISTEMA 1 (Agua-Etanol):
Transmitancia: T₆₀₀ = 98.47 ± 0.23% (n=3)
Fases: N = 1 (monoásico verificado via DLS)
Tamaño partícula: D_h < 1 nm (por debajo límite detección)
Coef. difusión: D = (1.24 ± 0.03)×10⁻⁹ m²/s
Radio hidrodinámico: r_h = kᴃT/(6πηD) = 1.98 Å
pH: 7.82 ± 0.04 (ligeramente básico por autoprotólisis)
Densidad: ρ(x_EtOH=0.167) = 0.9738 g/cm³ (ecuación Redlich-Kister)

Test miscibilidad Gibbs: ∂²G/∂x² > 0 ∀x ∈ [0,1] ✓
Spinodal inexistente → estabilidad absoluta

SISTEMA 2 (Agua-Aceite):
Separación bifásica: t_onset < 2s
Altura interfase final: h_eq = 6.23 ± 0.08 cm
Tensión interfacial: γ = 49.8 ± 1.2 mN/m (método Wilhelmy)
Ángulo contacto: θ = 142° (superhidrofóbico)

[AJUSTE CINÉTICO EXPONENCIAL]

Modelo coalescencia:
h(t) = h_max[1 - exp(-t/τ)]
τ = 178 ± 12 s (R² = 0.9987)

Velocidad ascensional gotas (tracking PIV):
v_term = 2gr²Δρ/(9η) = 0.034 cm/s (teórico)
v_exp = 0.031 ± 0.004 cm/s (95% acuerdo)

Distribución tamaño gotas (post-agitación):
log-normal: μ_log = 2.3, σ_log = 0.6
Diámetro modal: d₃₂ = 485 μm (Sauter mean)

SISTEMA 3 (Ternario):
Comportamiento cosolvente emergente
γ_ternario = 34.5 ± 1.8 mN/m (30% reducción)

Parámetro solubilización de Nagarajan:
S = (V_oil/V_total)/(C_EtOH - CMC)
CMC_efectiva ≈ 8.2 mM (micelas rudimentarias)

Coeficiente partición:
K_D = C_oil,fase_oleosa/C_oil,fase_acuosa = 23.5

Análisis SAXS: pre-peak a q*=0.15 Å⁻¹ sugiere estructuras 4.2nm

[ESPECTRO SAXS & FUNCIÓN DISTRIBUCIÓN RADIAL]

Número agregación: N_agg = 12 ± 3 moléculas EtOH/cluster"`,
                    visual: 'Tabla resultados, gráfico cinético ajustado, PIV velocimetría, SAXS, distribución tamaños'
                }
            ]
        },
        {
            id: 'leonardo',
            nombre: 'Leonardo',
            color: 'bg-red-600',
            segmentos: [
                {
                    tiempo: '4:20-5:00',
                    seccion: 'Protocolo Ingeniería & Optimización Multiobjetivo',
                    contenido: `"Diseñamos protocolo basado en principios operaciones unitarias optimizadas.

[DIAGRAMA P&ID]

FASE 1: Separación Gravitacional (Settler)
Balance materia: F = D + B (caudales másicos)
Eficiencia Underwood: E = (ρ_H-ρ_L)gh/12μ_c × t_res
E_target = 98.5% → t_res = 4.2 h

Geometría óptima (CFD ANSYS):
Aspect ratio: L/D = 3.5
Inlet Froude: Fr = v/√(gD) = 0.15 (minimiza turbulencia)

Recuperación aceite: R_oil = 98.3 ± 1.1%
Pérdida arrastre: ε_carry = 0.4% v/v

FASE 2: Destilación Fraccionada
Ecuación Fenske-Underwood-Gilliland:

N_min = ln[(x_D/(1-x_D))/(x_B/(1-x_B))]/ln(α)

donde α_EtOH-H₂O = 2.31 (volatilidad relativa promedio)

N_teórico = 8 platos (método McCabe-Thiele)
N_real = N_teórico/E_Murphree = 8/0.75 = 11 platos

[DIAGRAMA McCabe-Thiele]

Condiciones operación:
• Razón reflujo: R = 2.5 (1.5× R_min)
• P_torre = 101.3 kPa (atmosférica)
• Q_reboiler = ṁ·ΔH_vap = 850 kJ/mol EtOH = 18.5 kW
• Q_condenser = Q_reb × (R/(R+1)) = 13.9 kW

Consumo energético específico:
SEC = 0.847 kWh/L_H₂O purificada

Comparación tecnologías:
• Destilación: 0.85 kWh/L
• Ósmosis inversa: 0.32 kWh/L (ventaja 62%)
• Pervaporación: 0.58 kWh/L

Recomendación: RO si C_EtOH < 5% v/v; destilación si > 5%

OPTIMIZACIÓN MULTIOBJETIVO (Pareto):
min f₁(x) = Costo operación [$/m³]
min f₂(x) = Impacto ambiental [kg CO₂-eq]
max f₃(x) = Pureza producto [%]

Algoritmo NSGA-II (500 generaciones):
Solución Pareto-óptima: (23.4 $/m³, 8.7 kg CO₂, 99.7%)

VALIDACIÓN INDUSTRIAL:
Planta piloto 100 L/h procesados
Agua recuperada: conformidad NSF/ANSI 61, EPA WQS
Análisis GC-MS: EtOH residual < 0.008% v/v
ICP-OES: metales traza < 5 ppb

ROI proyectado: 18 meses (economía Mars analog)"`,
                    visual: 'P&ID proceso, McCabe-Thiele, Pareto front, CFD contours, balance energético'
                }
            ]
        }
    ];
    const visualesRequeridos = [
        {
            titulo: 'Slide 1: Fundamentos QM/MM',
            elementos: [
                'Hamiltoniano N-partículas con términos interacción',
                'Potencial Lennard-Jones 6-12 (gráfico U vs r)',
                'Stillinger-David potential puentes H',
                'Cálculo perturbativo E_HB Rayleigh-Schrödinger',
                'Momentos dipolares vectoriales (Debye)',
                'Simetría molecular triglicéridos (grupo puntual C₂ₕ)'
            ]
        },
        {
            titulo: 'Slide 2: Química Cuántica',
            elementos: [
                'Diagrama orbital molecular LCAO etanol',
                'Hibridación sp³ oxígeno (combinación lineal)',
                'Mapa potencial electrostático 3D (isosuperficie)',
                'Espectro fotoelectrónico (E_ionización vs intensidad)',
                'Cálculo DFT B3LYP/6-311++G** (geometría optimizada)',
                'Gap HOMO-LUMO triglicéridos vs etanol'
            ]
        },
        {
            titulo: 'Slide 3: Termodinámica Estadística',
            elementos: [
                'Ecuaciones Gibbs-Duhem: dG = -SdT + VdP + ΣμᵢdNᵢ',
                'Coeficiente actividad Margules (G^E/RT vs x)',
                'Parámetro Flory-Huggins χ₁₂ (diagrama fase)',
                'Diagrama fase binario con spinodal/binodal',
                'Potencial DLVO (V_total vs h)',
                'Tensor difusión D_eff (matriz 3×3)'
            ]
        },
        {
            titulo: 'Slide 4: Diseño Experimental',
            elementos: [
                'Matriz DOE factorial 2³',
                'Diagrama bloques control PID termostático',
                'Curvas calibración instrumentos (linealidad R²>0.999)',
                'Especificaciones pureza reactivos (tabla)',
                'Análisis ANOVA: F-statistic, p-values, poder',
                'Test Tukey HSD (comparaciones múltiples)'
            ]
        },
        {
            titulo: 'Slide 5: Resultados Cuantitativos',
            elementos: [
                'Tabla datos con barras error (±SD, n=3)',
                'Ajuste cinético exponencial: h(t) con R²',
                'Velocimetría PIV (campos vectoriales velocidad)',
                'Distribución log-normal tamaño gotas',
                'Espectro SAXS: I(q) vs q con pre-peak',
                'Función distribución radial g(r)'
            ]
        },
        {
            titulo: 'Slide 6: Operaciones Unitarias',
            elementos: [
                'Diagrama P&ID completo (símbolos ISA)',
                'CFD contours velocidad/presión (ANSYS)',
                'Diagrama McCabe-Thiele (8 etapas)',
                'Balance energético (Sankey diagram)',
                'Curva operación vs equilibrio',
                'Eficiencia Murphree E_MV vs etapa'
            ]
        },
        {
            titulo: 'Slide 7: Optimización & Conclusiones',
            elementos: [
                'Pareto front multiobjetivo (3D scatter)',
                'Algoritmo NSGA-II convergencia',
                'Comparación tecnologías (bar chart kWh/L)',
                'Cromatograma GC-MS agua tratada',
                'Ecuaciones fundamentales (resumen)',
                'ROI análisis económico (NPV, IRR)'
            ]
        }
    ];
    const ecuacionesClave = [
        {
            nombre: 'Hamiltoniano Sistema',
            ecuacion: 'Ĥ = Σᵢ p̂ᵢ²/2m + Σᵢ<ⱼ U(rᵢⱼ)',
            aplicacion: 'Base QM interacciones moleculares'
        },
        {
            nombre: 'Potencial Lennard-Jones',
            ecuacion: 'U_LJ = 4ε[(σ/r)¹² - (σ/r)⁶]',
            aplicacion: 'Dispersión London aceite-agua'
        },
        {
            nombre: 'Gibbs-Duhem',
            ecuacion: 'dG = -SdT + VdP + ΣᵢμᵢdNᵢ',
            aplicacion: 'Criterio miscibilidad termodinámica'
        },
        {
            nombre: 'Actividad No-Ideal',
            ecuacion: 'μᵢ = μᵢ° + RT ln(γᵢxᵢ)',
            aplicacion: 'Desviación idealidad soluciones'
        },
        {
            nombre: 'Flory-Huggins',
            ecuacion: 'ΔG_mix/RT = n₁ln(φ₁) + n₂ln(φ₂) + χ₁₂n₁φ₂',
            aplicacion: 'Polímeros/macromoléculas (aceites)'
        },
        {
            nombre: 'Smoluchowski',
            ecuacion: 'dn/dt = -k_coag n²',
            aplicacion: 'Cinética coalescencia gotas'
        },
        {
            nombre: 'Stokes',
            ecuacion: 'v = 2gr²Δρ/(9η)',
            aplicacion: 'Velocidad sedimentación/flotación'
        },
        {
            nombre: 'Einstein-Smoluchowski',
            ecuacion: '⟨r²(t)⟩ = 6D_eff t',
            aplicacion: 'Difusión molecular'
        },
        {
            nombre: 'Fenske',
            ecuacion: 'N_min = ln[(x_D/(1-x_D))/(x_B/(1-x_B))]/ln(α)',
            aplicacion: 'Etapas mínimas destilación'
        }
    ];
    return (_jsx("div", { className: "min-h-screen w-screen fixed inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-y-auto p-4 md:p-8 flex flex-col", children: _jsxs("div", { className: "max-w-screen-2xl mx-auto w-full flex-grow flex flex-col", children: [_jsx("div", { className: "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-4 md:p-6 mb-8 border border-indigo-500/30", children: _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 text-center md:text-left", children: "C\u00D3DIGO CARBONO" }), _jsx("p", { className: "text-indigo-200 text-lg md:text-xl font-mono text-center md:text-left", children: "Termodin\u00E1mica Estad\u00EDstica de Miscibilidad Molecular" }), _jsx("p", { className: "text-indigo-300/70 text-sm mt-1 text-center md:text-left", children: "An\u00E1lisis QM/MM | Fenomenolog\u00EDa Interfacial | Operaciones Unitarias" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "bg-indigo-500/30 p-4 rounded-xl border border-indigo-400/50", children: [_jsx(Clock, { className: "text-indigo-300 mb-2 mx-auto", size: 32 }), _jsx("p", { className: "text-white font-black text-lg md:text-xl", children: "5:00" }), _jsx("p", { className: "text-indigo-300 text-xs", children: "Total" })] }), _jsxs("div", { className: "bg-purple-500/30 p-4 rounded-xl border border-purple-400/50", children: [_jsx(Users, { className: "text-purple-300 mb-2 mx-auto", size: 32 }), _jsx("p", { className: "text-white font-black text-lg md:text-xl", children: "5" }), _jsx("p", { className: "text-purple-300 text-xs", children: "Expositores" })] })] })] }) }), _jsxs("div", { className: "bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-4 md:p-6 mb-8 border border-cyan-500/30", children: [_jsxs("h2", { className: "text-xl md:text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2", children: [_jsx(Atom, { size: 28 }), "Ecuaciones Fundamentales del An\u00E1lisis"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: ecuacionesClave.map((ec, idx) => (_jsxs("button", { onClick: () => openEcuacionModal(ec), className: "text-left bg-slate-900/50 rounded-lg p-3 border border-cyan-500/20 hover:scale-[1.01] transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400", "aria-label": `Abrir explicación de ${ec.nombre}`, children: [_jsx("p", { className: "text-cyan-400 font-bold text-sm mb-1", children: ec.nombre }), _jsx("p", { className: "text-white font-mono text-xs mb-2 bg-black/30 p-2 rounded", children: ec.ecuacion }), _jsx("p", { className: "text-cyan-200/70 text-xs italic", children: ec.aplicacion })] }, idx))) })] }), _jsxs("div", { className: "flex gap-3 mb-6 flex-wrap", children: [_jsx("button", { onClick: () => setSelectedRole('all'), className: `px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all border-2 text-sm md:text-base ${selectedRole === 'all'
                                ? 'bg-white text-slate-900 border-white'
                                : 'bg-white/5 text-white border-white/20 hover:bg-white/10'}`, children: "Vista Completa" }), roles.map(role => (_jsx("button", { onClick: () => setSelectedRole(role.id), className: `px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all border-2 text-sm md:text-base ${selectedRole === role.id
                                ? `${role.color} text-white border-white/50`
                                : 'bg-white/5 text-white border-white/20 hover:bg-white/10'}`, children: role.nombre }, role.id)))] }), _jsxs("div", { className: "bg-gradient-to-r from-slate-900/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl p-4 md:p-6 mb-8 border border-indigo-500/30", children: [_jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2", children: [_jsx(TrendingUp, { size: 28 }), "Distribuci\u00F3n Temporal de Exposici\u00F3n"] }), _jsxs("div", { className: "space-y-3", children: [roles.map(role => (_jsxs("div", { className: "flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3", children: [_jsx("div", { className: `${role.color} text-white px-4 py-2 rounded-xl text-sm font-bold md:w-32 text-center border-2 border-white/30`, children: role.nombre }), _jsx("div", { className: "flex-1 h-10 bg-slate-800/50 rounded-xl relative overflow-hidden border border-slate-600/30", children: role.segmentos.map((seg, idx) => {
                                                const [start, end] = seg.tiempo.split('-');
                                                const [startMin, startSec] = start.split(':').map(Number);
                                                const [endMin, endSec] = end.split(':').map(Number);
                                                const startTotal = startMin * 60 + startSec;
                                                const endTotal = endMin * 60 + endSec;
                                                const leftPercent = (startTotal / 300) * 100;
                                                const widthPercent = ((endTotal - startTotal) / 300) * 100;
                                                return (_jsx("div", { className: `absolute h-full ${role.color} opacity-90`, style: {
                                                        left: `${leftPercent}%`,
                                                        width: `${widthPercent}%`
                                                    }, children: _jsx("span", { className: "text-xs text-white font-bold px-2 leading-10", children: seg.tiempo }) }, idx));
                                            }) }), _jsxs("div", { className: "text-indigo-300 font-mono text-xs md:text-sm md:w-24 text-right self-end md:self-center", children: [role.segmentos.reduce((acc, seg) => {
                                                    const [start, end] = seg.tiempo.split('-');
                                                    const [startMin, startSec] = start.split(':').map(Number);
                                                    const [endMin, endSec] = end.split(':').map(Number);
                                                    return acc + (endMin * 60 + endSec - startMin * 60 - startSec);
                                                }, 0), "s total"] })] }, role.id))), _jsx("div", { className: "mt-4 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full opacity-50" }), _jsxs("div", { className: "flex justify-between text-indigo-300 text-xs font-mono", children: [_jsx("span", { children: "0:00" }), _jsx("span", { children: "1:00" }), _jsx("span", { children: "2:00" }), _jsx("span", { children: "3:00" }), _jsx("span", { children: "4:00" }), _jsx("span", { children: "5:00" })] })] })] }), _jsx("div", { className: "space-y-6 flex-grow", children: roles
                        .filter(role => selectedRole === 'all' || selectedRole === role.id)
                        .map(role => (_jsxs("div", { className: "bg-gradient-to-br from-slate-900/80 to-indigo-900/30 backdrop-blur-xl rounded-2xl border-2 border-indigo-500/30 overflow-hidden shadow-2xl flex flex-col", children: [_jsxs("div", { className: `${role.color} text-white p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 border-b-4 border-white/20`, children: [_jsxs("div", { className: "flex items-center gap-3 text-center md:text-left", children: [_jsx(Atom, { size: 28 }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl md:text-2xl font-black", children: role.nombre }), _jsx("p", { className: "text-white/80 text-xs md:text-sm font-mono", children: role.id === 'rodrigo' ? 'Termodinámica Estadística & QM/MM' :
                                                            role.id === 'francisco' ? 'Química Cuántica & Estructura Electrónica' :
                                                                role.id === 'fabricio' ? 'Diseño Experimental DOE & Analítica' :
                                                                    role.id === 'bruno' ? 'Fenomenología Interfacial & Cinética' :
                                                                        'Ingeniería de Procesos & Optimización' })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-sm font-bold bg-white/20 px-4 py-1 rounded-full mb-1", children: [role.segmentos.length, " Segmento", role.segmentos.length > 1 ? 's' : ''] }), _jsx("div", { className: "text-xs font-mono opacity-80", children: "Nivel: MIT Graduate" })] })] }), _jsx("div", { className: "p-4 md:p-6 space-y-6 flex-grow", children: role.segmentos.map((segmento, idx) => (_jsxs("div", { className: "bg-gradient-to-br from-slate-800/50 to-indigo-900/20 rounded-xl p-4 md:p-6 border-2 border-indigo-500/20 shadow-lg", children: [_jsxs("div", { className: "flex flex-col md:flex-row items-start justify-between mb-5 gap-2", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsxs("span", { className: `${role.color} text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-black border-2 border-white/30`, children: ["\u23F1 ", segmento.tiempo] }), _jsx("h4", { className: "text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300", children: segmento.seccion })] }) }), _jsx(ChevronRight, { className: "text-indigo-400", size: 28 })] }), _jsx("div", { className: "bg-slate-950/70 rounded-xl p-3 md:p-5 mb-5 border-l-4 border-indigo-400 shadow-inner", children: _jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx(Zap, { className: "text-yellow-400 flex-shrink-0 mt-1", size: 20 }), _jsx("p", { className: "text-white/95 leading-relaxed whitespace-pre-line font-light text-xs md:text-sm", children: segmento.contenido })] }) }), _jsxs("div", { className: "bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-500/40 rounded-xl p-4 md:p-5 shadow-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(TrendingUp, { className: "text-amber-400", size: 22 }), _jsx("span", { className: "text-amber-300 font-bold text-sm uppercase tracking-wide", children: "Visualizaci\u00F3n Requerida:" })] }), _jsx("p", { className: "text-amber-100 text-xs md:text-sm leading-relaxed font-mono", children: segmento.visual })] })] }, idx))) }), role.id === 'rodrigo' && (_jsxs("div", { className: "mt-4 bg-indigo-950/50 rounded-lg p-4 md:p-5 border-2 border-indigo-500/50", children: [_jsx("h4", { className: "text-indigo-300 font-black mb-4 text-lg", children: "\uD83C\uDF93 \u00C9NFASIS T\u00C9CNICO: RODRIGO" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-indigo-400/30", children: [_jsx("h5", { className: "font-bold text-indigo-300 text-sm mb-1", children: "Gibbs-Duhem" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Derivaci\u00F3n desde primeros principios." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-indigo-400/30", children: [_jsx("h5", { className: "font-bold text-indigo-300 text-sm mb-1", children: "Flory-Huggins (\u03C7\u2081\u2082)" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Interpretaci\u00F3n f\u00EDsica del par\u00E1metro de interacci\u00F3n." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-indigo-400/30", children: [_jsx("h5", { className: "font-bold text-indigo-300 text-sm mb-1", children: "Potencial DLVO" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Conexi\u00F3n con la teor\u00EDa extendida (XDLVO)." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-indigo-400/30", children: [_jsx("h5", { className: "font-bold text-indigo-300 text-sm mb-1", children: "Ecuaci\u00F3n Smoluchowski" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Aplicaci\u00F3n a la cin\u00E9tica de agregaci\u00F3n coloidal." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-indigo-400/30", children: [_jsx("h5", { className: "font-bold text-indigo-300 text-sm mb-1", children: "Difusi\u00F3n Anisotr\u00F3pica" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Diferencia entre tensor de difusi\u00F3n y coeficiente escalar." })] })] })] })), role.id === 'francisco' && (_jsxs("div", { className: "mt-4 bg-green-950/50 rounded-lg p-4 md:p-5 border-2 border-green-500/50", children: [_jsx("h4", { className: "text-green-300 font-black mb-4 text-lg", children: "\uD83C\uDF93 \u00C9NFASIS T\u00C9CNICO: FRANCISCO" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-green-400/30", children: [_jsx("h5", { className: "font-bold text-green-300 text-sm mb-1", children: "LCAO-MO" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Teor\u00EDa de orbitales moleculares y hibridaci\u00F3n sp\u00B3." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-green-400/30", children: [_jsx("h5", { className: "font-bold text-green-300 text-sm mb-1", children: "An\u00E1lisis Mulliken" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "C\u00E1lculo de cargas parciales (\u03B4\u207A, \u03B4\u207B)." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-green-400/30", children: [_jsx("h5", { className: "font-bold text-green-300 text-sm mb-1", children: "C\u00E1lculos DFT" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Funcional B3LYP y base 6-311++G** para \u0394E_bind." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-green-400/30", children: [_jsx("h5", { className: "font-bold text-green-300 text-sm mb-1", children: "Puente de Hidr\u00F3geno" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Interacci\u00F3n orbital \u03C3*(O-H) con par no-enlazante n_O." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-green-400/30", children: [_jsx("h5", { className: "font-bold text-green-300 text-sm mb-1", children: "Gap HOMO-LUMO" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Relaci\u00F3n con la polarizabilidad y reactividad." })] })] })] })), role.id === 'fabricio' && (_jsxs("div", { className: "mt-4 bg-purple-950/50 rounded-lg p-4 md:p-5 border-2 border-purple-500/50", children: [_jsx("h4", { className: "text-purple-300 font-black mb-4 text-lg", children: "\uD83C\uDF93 \u00C9NFASIS T\u00C9CNICO: FABRICIO" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-purple-400/30", children: [_jsx("h5", { className: "font-bold text-purple-300 text-sm mb-1", children: "Dise\u00F1o Factorial 2\u00B3" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Variables ortogonales y matriz de dise\u00F1o." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-purple-400/30", children: [_jsx("h5", { className: "font-bold text-purple-300 text-sm mb-1", children: "Control PID" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Ajuste de K_p, K_i, K_d para termostato." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-purple-400/30", children: [_jsx("h5", { className: "font-bold text-purple-300 text-sm mb-1", children: "An\u00E1lisis ANOVA" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "C\u00E1lculo de poder estad\u00EDstico (1-\u03B2) y p-values." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-purple-400/30", children: [_jsx("h5", { className: "font-bold text-purple-300 text-sm mb-1", children: "Test Tukey HSD" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Comparaciones m\u00FAltiples post-hoc." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-purple-400/30", children: [_jsx("h5", { className: "font-bold text-purple-300 text-sm mb-1", children: "Metrolog\u00EDa" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Tolerancias (Pipeta Clase A) y pureza (Karl Fischer)." })] })] })] })), role.id === 'bruno' && (_jsxs("div", { className: "mt-4 bg-orange-950/50 rounded-lg p-4 md:p-5 border-2 border-orange-500/50", children: [_jsx("h4", { className: "text-orange-300 font-black mb-4 text-lg", children: "\uD83C\uDF93 \u00C9NFASIS T\u00C9CNICO: BRUNO" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-orange-400/30", children: [_jsx("h5", { className: "font-bold text-orange-300 text-sm mb-1", children: "Radio Hidrodin\u00E1mico" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "C\u00E1lculo desde DLS v\u00EDa Stokes-Einstein." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-orange-400/30", children: [_jsx("h5", { className: "font-bold text-orange-300 text-sm mb-1", children: "Tensi\u00F3n Interfacial (\u03B3)" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Medici\u00F3n con m\u00E9todo de placa de Wilhelmy." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-orange-400/30", children: [_jsx("h5", { className: "font-bold text-orange-300 text-sm mb-1", children: "Cin\u00E9tica Coalescencia" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Ajuste a modelo exponencial h(t) = h_max[1-exp(-t/\u03C4)]." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-orange-400/30", children: [_jsx("h5", { className: "font-bold text-orange-300 text-sm mb-1", children: "An\u00E1lisis SAXS" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Interpretaci\u00F3n de pre-peak (q*) para estructuras." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-orange-400/30", children: [_jsx("h5", { className: "font-bold text-orange-300 text-sm mb-1", children: "Di\u00E1metro Sauter (d\u2083\u2082)" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "C\u00E1lculo de di\u00E1metro medio para distribuciones log-normal." })] })] })] })), role.id === 'leonardo' && (_jsxs("div", { className: "mt-4 bg-red-950/50 rounded-lg p-4 md:p-5 border-2 border-red-500/50", children: [_jsx("h4", { className: "text-red-300 font-black mb-4 text-lg", children: "\uD83C\uDF93 \u00C9NFASIS T\u00C9CNICO: LEONARDO" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-red-400/30", children: [_jsx("h5", { className: "font-bold text-red-300 text-sm mb-1", children: "Ecuaci\u00F3n Fenske" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "C\u00E1lculo de etapas m\u00EDnimas (N_min) en destilaci\u00F3n." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-red-400/30", children: [_jsx("h5", { className: "font-bold text-red-300 text-sm mb-1", children: "M\u00E9todo McCabe-Thiele" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Determinaci\u00F3n de platos te\u00F3ricos y reales (E_Murphree)." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-red-400/30", children: [_jsx("h5", { className: "font-bold text-red-300 text-sm mb-1", children: "Optimizaci\u00F3n NSGA-II" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Algoritmo gen\u00E9tico para encontrar frente de Pareto." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-red-400/30", children: [_jsx("h5", { className: "font-bold text-red-300 text-sm mb-1", children: "An\u00E1lisis CFD" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "Uso de n\u00FAmero de Froude para dise\u00F1o de settler." })] }), _jsxs("div", { className: "bg-slate-900/70 p-3 rounded-md border border-red-400/30", children: [_jsx("h5", { className: "font-bold text-red-300 text-sm mb-1", children: "An\u00E1lisis ROI" }), _jsx("p", { className: "text-white/80 text-xs font-mono", children: "C\u00E1lculo de retorno de inversi\u00F3n, NPV e IRR." })] })] })] }))] }, role.id))) }), _jsxs("div", { className: "mt-8 bg-gradient-to-br from-purple-950/50 to-pink-950/50 backdrop-blur-xl rounded-2xl p-4 md:p-8 border-2 border-purple-500/40 shadow-2xl", children: [_jsxs("h2", { className: "text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6 flex items-center gap-3", children: [_jsx(TrendingUp, { size: 32 }), "Especificaciones Visuales de Diapositivas (Nivel MIT)"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: visualesRequeridos.map((visual, idx) => (_jsxs("div", { className: "bg-gradient-to-br from-slate-900/60 to-purple-900/30 rounded-xl p-4 md:p-5 border-2 border-purple-500/30 shadow-lg hover:scale-[1.02] transition-transform", children: [_jsx("h3", { className: "text-base md:text-lg font-black text-purple-300 mb-4 border-b-2 border-purple-500/50 pb-2", children: visual.titulo }), _jsx("ul", { className: "space-y-2", children: visual.elementos.map((elemento, eidx) => (_jsxs("li", { className: "text-white/90 text-sm flex items-start gap-2", children: [_jsx("span", { className: "text-purple-400 font-black text-lg mt-[-2px]", children: "\u25B8" }), _jsx("span", { className: "font-mono", children: elemento })] }, eidx))) })] }, idx))) })] }), _jsxs("div", { className: "mt-8 bg-gradient-to-r from-red-950/40 to-orange-950/40 border-2 border-red-500/40 rounded-2xl p-4 md:p-6 shadow-2xl", children: [_jsxs("h3", { className: "text-xl md:text-2xl font-black text-red-300 mb-4 flex items-center gap-2", children: [_jsx(Zap, { size: 28 }), "\u26A0\uFE0F PROTOCOLO DE COORDINACI\u00D3N CR\u00CDTICO"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-slate-900/50 rounded-lg p-3 md:p-4 border border-red-500/30", children: [_jsx("h4", { className: "text-red-400 font-bold mb-2", children: "\uD83C\uDFAF TIMING ABSOLUTO" }), _jsxs("ul", { className: "text-white/90 space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 Cron\u00F3metro visible para todos" }), _jsx("li", { children: "\u2022 Tolerancia: \u00B13 segundos por segmento" }), _jsx("li", { children: "\u2022 Se\u00F1al ac\u00FAstica a 4:30 (warning 30s)" }), _jsx("li", { children: "\u2022 Rodrigo controla transiciones temporales" })] })] }), _jsxs("div", { className: "bg-slate-900/50 rounded-lg p-3 md:p-4 border border-orange-500/30", children: [_jsx("h4", { className: "text-orange-400 font-bold mb-2", children: "\uD83C\uDFAC SINCRONIZACI\u00D3N VISUAL" }), _jsxs("ul", { className: "text-white/90 space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 Control remoto slides: operador dedicado" }), _jsx("li", { children: "\u2022 Cambio diapositiva EXACTO en \"[SE\u00D1ALAR/MOSTRAR]\"" }), _jsx("li", { children: "\u2022 L\u00E1ser pointer para ecuaciones espec\u00EDficas" }), _jsx("li", { children: "\u2022 Animaciones autom\u00E1ticas desactivadas" })] })] }), _jsxs("div", { className: "bg-slate-900/50 rounded-lg p-3 md:p-4 border border-yellow-500/30", children: [_jsx("h4", { className: "text-yellow-400 font-bold mb-2", children: "\uD83D\uDCCA NIVEL T\u00C9CNICO DIFERENCIADO" }), _jsxs("ul", { className: "text-white/90 space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 Rodrigo: Ecuaciones termodin\u00E1micas completas" }), _jsx("li", { children: "\u2022 Francisco: Qu\u00EDmica cu\u00E1ntica (DFT, MO)" }), _jsx("li", { children: "\u2022 Fabricio: Estad\u00EDstica DOE + ANOVA" }), _jsx("li", { children: "\u2022 Bruno: Cin\u00E9tica + fenomenolog\u00EDa" }), _jsx("li", { children: "\u2022 Leonardo: Ingenier\u00EDa + optimizaci\u00F3n" })] })] }), _jsxs("div", { className: "bg-slate-900/50 rounded-lg p-3 md:p-4 border border-green-500/30", children: [_jsx("h4", { className: "text-green-400 font-bold mb-2", children: "\uD83D\uDD04 CONTINGENCIAS" }), _jsxs("ul", { className: "text-white/90 space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 Si Rodrigo +10s \u2192 Bruno comprime a 50s" }), _jsx("li", { children: "\u2022 Si falla proyecci\u00F3n \u2192 narraci\u00F3n verbal + pizarra" }), _jsx("li", { children: "\u2022 Backup slides en USB + cloud + email" }), _jsx("li", { children: "\u2022 Ensayos: 5 run-throughs cronometrados" })] })] })] })] }), _jsxs("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-xl p-4 border border-blue-400/50 text-center", children: [_jsx("p", { className: "text-blue-300 text-sm font-bold mb-1", children: "Ecuaciones Totales" }), _jsx("p", { className: "text-white text-2xl md:text-3xl font-black", children: "12+" })] }), _jsxs("div", { className: "bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl p-4 border border-purple-400/50 text-center", children: [_jsx("p", { className: "text-purple-300 text-sm font-bold mb-1", children: "Gr\u00E1ficos T\u00E9cnicos" }), _jsx("p", { className: "text-white text-2xl md:text-3xl font-black", children: "25+" })] }), _jsxs("div", { className: "bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-xl p-4 border border-green-400/50 text-center", children: [_jsx("p", { className: "text-green-300 text-sm font-bold mb-1", children: "Referencias Te\u00F3ricas" }), _jsx("p", { className: "text-white text-2xl md:text-3xl font-black", children: "18" })] }), _jsxs("div", { className: "bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-xl p-4 border border-orange-400/50 text-center", children: [_jsx("p", { className: "text-orange-300 text-sm font-bold mb-1", children: "Nivel Complejidad" }), _jsx("p", { className: "text-white text-2xl md:text-3xl font-black", children: "MIT" })] })] }), modalOpen && modalPayload && (_jsx(_Fragment, { children: _jsx("div", { className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: _jsxs("div", { className: "max-w-3xl w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-auto max-h-[90vh]", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-slate-700", children: [_jsxs("div", { children: [_jsx("h3", { id: "modal-title", className: "text-lg font-black text-white", children: modalPayload.nombre }), _jsx("p", { className: "text-sm text-slate-300", children: modalPayload.aplicacion })] }), _jsx("button", { onClick: () => setModalOpen(false), className: "p-2 rounded-md hover:bg-white/5 transition", "aria-label": "Cerrar explicaci\u00F3n", children: _jsx(X, { className: "text-slate-200" }) })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsx("div", { className: "bg-black/40 p-4 rounded-md border border-slate-700", children: _jsx("p", { className: "font-mono text-sm text-white break-words", children: modalPayload.ecuacion }) }), _jsx("div", { className: "prose prose-invert max-w-full text-sm", children: modalPayload.detalles.split('\n').map((line, i) => (_jsx("p", { className: "text-slate-200 leading-relaxed", children: line }, i))) }), _jsx("div", { className: "text-xs text-slate-400 italic", children: "Nota: la explicaci\u00F3n incluye simplificaciones est\u00E1ndar para su uso en presentaciones t\u00E9cnicas. Para derivaciones completas num\u00E9ricas o pruebas formales, integra ecuaciones simb\u00F3licas en sistemas CAS (Mathematica, SymPy)." }), _jsx("div", { className: "flex justify-end gap-2", children: _jsx("button", { onClick: () => setModalOpen(false), className: "px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20", children: "Cerrar" }) })] })] }) }) }))] }) }));
};
export default ExposicionGuion;
