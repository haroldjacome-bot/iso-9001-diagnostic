import React, { useState, useMemo, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from 'recharts';
import { CheckCircle, PieChart, ChevronDown, ChevronUp, Info, LayoutDashboard, Building2, Calendar, UserCheck, FileText, Download, Upload, Printer } from 'lucide-react';

const ISO_STRUCTURE = [
  {
    id: '4',
    title: '4. Contexto de la organización',
    items: [
      { isHeader: true, text: '4.1 Comprensión de la organización y su contexto' },
      { id: '4.1-1', text: 'La empresa cuenta con análisis del contexto de la organización que permitan identificar el análisis interno y externo de la organización' },
      { isHeader: true, text: '4.2 Comprensión de las necesidades y expectativas de las partes interesadas' },
      { id: '4.2-1', text: 'Determinar las partes interesadas que son pertinentes al SGC. ( Matriz de partes interesadas )' },
      { id: '4.2-2', text: 'Determinar los requisitos pertinentes de estas partes interesadas para el SGC ( Matriz de requisitos legales )' },
      { id: '4.2-3', text: 'Realizar el seguimiento y la revisión de la información sobre estas partes interesadas y sus requisitos pertinentes.' },
      { isHeader: true, text: '4.3 Determinación del alcance del SGC' },
      { id: '4.3-1', text: 'La organización debe definir el alcance, limites, incluir los servicios, definir exclusiones y por ultimo tener coherencia' },
      { isHeader: true, text: '4.4 SGC y sus procesos' },
      { isHeader: true, text: '4.4.1 La organización Debe:', level: 2 },
      { id: '4.4.1-1', text: 'Identificar sus procesos' },
      { id: '4.4.1-2', text: 'Identificar como se relacionan: ejemplo ( Usuario → Atención → Servicio → Seguimiento)' },
      { id: '4.4.1-3', text: 'Determinar las entradas requeridas y las salidas esperadas de estos procesos' },
      { id: '4.4.1-4', text: 'Definir entradas y salidas' },
      { id: '4.4.1-5', text: 'Controlar los procesos mediante los indicadores y el seguimiento' },
      { id: '4.4.1-6', text: 'Asignar responsables en los procesos' },
      { id: '4.4.1-7', text: 'Tener recursos como: Personal, Tecnología, Equipos entre otros' },
      { id: '4.4.1-8', text: 'Gestionar riesgos para Identificar problemas posibles y prevenirlos' },
      { id: '4.4.1-9', text: 'Evaluar y mejorar Si el proceso funciona Cómo hacerlo mejor' },
      { isHeader: true, text: '4.4.2 En la medida en que sea necesario la organización debe:', level: 2 },
      { id: '4.4.2-1', text: 'La organización debe mantener información documentada ( Procedimientos, Manuales, Instructivos) para apoyar la operación de sus procesos' },
      { id: '4.4.2-2', text: 'La organización debe conservar la información documentada ( Formatos diligenciados, Reportes, Registros de atención al usuario ) para tener la confianza de que los procesos se realizan según lo planificado.' }
    ]
  },
  {
    id: '5',
    title: '5. Liderazgo',
    items: [
      { isHeader: true, text: '5.1 Liderazgo y compromiso' },
      { isHeader: true, text: '5.1.1 Generalidades. La alta dirección Debe:', level: 2 },
      { id: '5.1.1-1', text: 'Asumir la responsabilidad y obligación de rendir cuentas con relación a la eficacia del SGC' },
      { id: '5.1.1-2', text: 'Asegurar que se establezcan la política de calidad y los objetivos de la calidad para el SGC, y que estos sean compatibles con el contexto y la dirección estratégica de la organización' },
      { id: '5.1.1-3', text: 'Promover el uso del enfoque a procesos y el pensamiento basado en riesgos' },
      { id: '5.1.1-4', text: 'Comunicar la importancia de una gestión de la calidad eficaz y conforme con los requisitos del SGC' },
      { id: '5.1.1-5', text: 'Asegurarse de que el SGC logre los resultados previstos, como los objetivos del sistema' },
      { id: '5.1.1-6', text: 'Promover la mejora continua' },
      { isHeader: true, text: '5.1.2 Enfoque al cliente. La alta dirección Debe:', level: 2 },
      { id: '5.1.2-1', text: 'Demostrar liderazgo y compromiso con respecto al enfoque al usuario (Atención rápida, y oportuna )' },
      { id: '5.1.2-2', text: 'Asegurarse que se determinan, se comprenden y se cumplen regularmente los requisitos del cliente y los legales y reglamentarios aplicables' },
      { id: '5.1.2-3', text: 'Asegurar que se determinan y se consideran los riesgos y oportunidades que pueden afectar a la conformidad de la prestación del servicio y a la capacidad del usuario' },
      { id: '5.1.2-4', text: 'Asegurar que se mantiene el enfoque en el aumento de la satisfacción del Usuario' },
      { isHeader: true, text: '5.2 Política' },
      { isHeader: true, text: '5.2.1 Establecimiento de la política de calidad. La alta dirección Debe:', level: 2 },
      { id: '5.2.1-1', text: 'La organización debe establecer, implementar y mantener una política de calidad alineada con su propósito y contexto, que sirva como base para definir los objetivos de calidad, incluya el compromiso de cumplir los requisitos aplicables y promueva la mejora continua del SGC' },
      { isHeader: true, text: '5.2.2 Comunicación de la política de calidad. La política de calidad Debe:', level: 2 },
      { id: '5.2.2-1', text: 'La organización debe asegurar que la política de calidad esté documentada, sea comunicada, entendida y aplicada dentro de la organización, y que esté disponible para las partes interesadas pertinentes.' },
      { isHeader: true, text: '5.3 Roles, responsabilidades y autoridades en la organización' },
      { id: '5.3-1', text: 'Asignar la responsabilidad y autoridad para asegurarse de que el SGC es conforme con los requisitos de esta Norma Internacional ( Organigrama )' },
      { id: '5.3-2', text: 'Asignar la responsabilidad y autoridad para asegurarse de que los procesos están generando y proporcionando las salidas previstas ( Manual de funciones, Perfiles de cargo )' },
      { id: '5.3-3', text: 'Asegurarse de que se promueve el enfoque al usuario en toda la organización' },
      { id: '5.3-4', text: 'Asignar la responsabilidad y autoridad para asegurarse de que la integridad del SGC se mantiene cuando se planifican e implementan cambios en el SGC ( líder de calidad )' }
    ]
  },
  {
    id: '6',
    title: '6. Planificación',
    items: [
      { isHeader: true, text: '6.1 Acciones para abordar riesgos y oportunidades' },
      { isHeader: true, text: '6.1.1 Al planificar el SGC la organización Debe:', level: 2 },
      { id: '6.1.1-1', text: 'La empresa ha identificado los riesgos y oportunidades para cada uno de sus procesos que permitan asegurar que el sistema de gestión de calidad cumpla con sus objetivos y se logre la mejora continua ( Matriz de riesgos )' },
      { isHeader: true, text: '6.1.2 La organización Debe planificar:', level: 2 },
      { id: '6.1.2-1', text: 'La empresa debe definir, aplicar y evaluar acciones para manejar riesgos y oportunidades dentro de sus procesos. ( Identificar riesgos )' },
      { id: '6.1.2-2', text: 'La manera de evaluar la eficacia de estas acciones.' },
      { isHeader: true, text: '6.2 Objetivos de la calidad y planificación para lograrlos' },
      { isHeader: true, text: '6.2.1 La organización Debe:', level: 2 },
      { id: '6.2.1-1', text: 'Establecer objetivos de la calidad para las funciones y niveles pertinentes y los procesos necesarios para el SGC.' },
      { id: '6.2.1-2', text: 'Mantener información documentada sobre los objetivos de la calidad.' },
      { id: '6.2.1-3', text: 'Ser coherentes con la política de calidad' },
      { id: '6.2.1-4', text: 'Ser medibles' },
      { id: '6.2.1-5', text: 'Tener en cuenta los requisitos aplicables' },
      { id: '6.2.1-6', text: 'Ser pertinentes para la conformidad de los productos y servicios y para el aumento de la satisfacción del cliente' },
      { id: '6.2.1-7', text: 'Comunicarse' },
      { id: '6.2.1-8', text: 'Actualizarse, según corresponda' },
      { isHeader: true, text: '6.2.2 Al planificar como lograr sus objetivos de la calidad, la organización Debe:', level: 2 },
      { id: '6.2.2-1', text: 'Determinar qué se va a hacer' },
      { id: '6.2.2-2', text: 'Determinar qué recursos se requerirán' },
      { id: '6.2.2-3', text: 'Determinar quién será responsable' },
      { id: '6.2.2-4', text: 'Determinar cuándo se finalizará' },
      { id: '6.2.2-5', text: 'Determinar cómo se evaluarán los resultados' },
      { isHeader: true, text: '6.3 Planificación de los cambios' },
      { id: '6.3-1', text: 'Identificar la necesidad de cambio' },
      { id: '6.3-2', text: 'Analizar la oportunidad' },
      { id: '6.3-3', text: 'Planificar el cambio' },
      { id: '6.3-4', text: 'Implementarlo' },
      { id: '6.3-5', text: 'Evaluar resultados' }
    ]
  },
  {
    id: '7',
    title: '7. Soporte',
    items: [
      { isHeader: true, text: '7.1 Recurso' },
      { isHeader: true, text: '7.1.1 Generalidades. La organización Debe:', level: 2 },
      { id: '7.1.1-1', text: 'Determinar y proporcionar los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del SGC. ( plan de recursos y inventarios )' },
      { id: '7.1.1-2', text: 'Considerar las capacidades y limitaciones de los recursos internos existentes' },
      { id: '7.1.1-3', text: 'Considerar que se necesita obtener de los proveedores externos.' },
      { isHeader: true, text: '7.1.2 Personas. La organización Debe:', level: 2 },
      { id: '7.1.2-1', text: 'Determinar y proporcionar las personas necesarias para la implementación eficaz de su SGC y para la operación y control de sus procesos. (Manual de funciones, Perfiles de cargo, Contratos)' },
      { isHeader: true, text: '7.1.3 Infraestructura. La organización Debe:', level: 2 },
      { id: '7.1.3-1', text: 'La empresa cuenta con programa de mantenimiento y procedimientos escritos ( Programa de mantenimiento )' },
      { id: '7.1.3-2', text: 'La empresa cuenta con programa de calibración y procedimientos escritos ( Programa de calibración de equipos )' },
      { id: '7.1.3-3', text: 'Dentro del programa de mantenimiento, se cuenta con las hojas de vida de los equipos y maquinaria ( Hoja de vida de equipos )' },
      { isHeader: true, text: '7.1.4 Ambiente para la operación de los procesos. La organización Debe:', level: 2 },
      { id: '7.1.4-1', text: 'Determinar, proporcionar y mantener el ambiente necesario (Clima laboral, bienestar, registros mantenimiento instalaciones, SST)' },
      { isHeader: true, text: '7.1.5 Recursos de Seguimiento y Medición' },
      { isHeader: true, text: '7.1.5.1 Generalidades. La organización Debe:', level: 2 },
      { id: '7.1.5.1-1', text: 'Definir recursos de medición y indicadores ( Listado de recursos de medición )' },
      { id: '7.1.5.1-2', text: 'Asegurar que los recursos de seguimiento y medición se mantienen y controlan adecuadamente' },
      { isHeader: true, text: '7.1.5.2 Trazabilidad de la Medición, el equipo de medición debe', level: 2 },
      { id: '7.1.5.2-1', text: 'Asegurar la trazabilidad mediante calibración, identificación, protección y control (Registros de calibración, Historial, Reportes fallas)' },
      { isHeader: true, text: '7.1.6 Conocimientos de la Organización' },
      { id: '7.1.6-1', text: 'Identificar qué conocimientos necesita el personal ( Normatividad en salud, Manejo de sistemas)' },
      { id: '7.1.6-2', text: 'Mantener y poner a disposición el conocimiento y determinar cómo adquirir conocimientos adicionales' },
      { isHeader: true, text: '7.2 Competencia' },
      { id: '7.2-1', text: 'Determinar, asegurar y evidenciar las competencias del personal (Perfiles, Hojas de vida, Capacitación, Desempeño)' },
      { isHeader: true, text: '7.3 Toma de Conciencia' },
      { id: '7.3-1', text: 'Asegurar que el personal conozca la política, los objetivos, su contribución y las consecuencias del incumplimiento' },
      { isHeader: true, text: '7.4 Comunicación' },
      { id: '7.4-1', text: 'Determinar las comunicaciones internas y externas (Qué, Cuándo, A quién, Cómo, Quién comunica)' },
      { isHeader: true, text: '7.5 Información Documentada' },
      { isHeader: true, text: '7.5.1 Generalidades:', level: 2 },
      { id: '7.5.1-1', text: 'Incluir programa de gestión documental y listado maestro de documentos, formatos y registros' },
      { isHeader: true, text: '7.5.2 Creación y actualización', level: 2 },
      { id: '7.5.2-1', text: 'Asegurar identificación, formato y revisión/aprobación de la información documentada' },
      { isHeader: true, text: '7.5.3 Control de la Información Documentada' },
      { id: '7.5.3-1', text: 'Los documentos estén organizados, claros, actualizados y protegidos' },
      { id: '7.5.3-2', text: 'Abordar distribución, acceso, almacenamiento, control de cambios y disposición' }
    ]
  },
  {
    id: '8',
    title: '8. Operación',
    items: [
      { isHeader: true, text: '8.1 Planificación y control operacional' },
      { id: '8.1-1', text: 'Planificar, implementar y controlar procesos y determinar requisitos de productos/servicios' },
      { id: '8.1-2', text: 'Establecer criterios para los procesos y su aceptación' },
      { id: '8.1-3', text: 'Implementar control de procesos y mantener información documentada' },
      { isHeader: true, text: '8.2 Requisitos para los productos y servicios' },
      { isHeader: true, text: '8.2.1 Comunicación con el cliente', level: 2 },
      { id: '8.2.1-1', text: 'Canales de atención, PQRS, Satisfacción, Quejas, Contratos, Protocolos' },
      { isHeader: true, text: '8.2.2 Determinación de los requisitos', level: 2 },
      { id: '8.2.2-1', text: 'Servicio documentado, Normatividad, Fichas de servicio, Capacidad operativa' },
      { isHeader: true, text: '8.2.3 Revisión de los requisitos', level: 2 },
      { id: '8.2.3-1', text: 'Verificar capacidad de cumplimiento y revisar requisitos antes de aceptar' },
      { id: '8.2.3-2', text: 'Conservar información documentada de resultados de revisión ( Registros de revisión )' },
      { isHeader: true, text: '8.2.4 Cambios en los requisitos', level: 2 },
      { id: '8.2.4-1', text: 'Asegurar que los cambios se actualicen y comuniquen' },
      { isHeader: true, text: '8.3 Diseño y desarrollo' },
      { id: '8.3-1', text: 'Establecer, implementar y mantener proceso de diseño y desarrollo ( Procedimiento de diseño y desarrollo )' },
      { isHeader: true, text: '8.4 Control de suministros externos' },
      { isHeader: true, text: '8.4.1 Generalidades', level: 2 },
      { id: '8.4.1-1', text: 'Programa de control a proveedores, compras y selección/evaluación' },
      { id: '8.4.1-2', text: 'Realizar auditorías a proveedores y evaluar desempeño' },
      { isHeader: true, text: '8.4.2 Tipo y alcance del control', level: 2 },
      { id: '8.4.2-1', text: 'Asegurar que proveedores no afecten calidad y definir controles (Auditorias, Indicadores)' },
      { isHeader: true, text: '8.4.3 Información para proveedores', level: 2 },
      { id: '8.4.3-1', text: 'Comunicar requisitos para procesos, productos, servicios, aprobación y seguimiento' },
      { isHeader: true, text: '8.5 Producción y provisión del servicio' },
      { isHeader: true, text: '8.5.1 Control de la producción', level: 2 },
      { id: '8.5.1-1', text: 'Condiciones controladas, identificación, seguimiento y protección del cliente' },
      { isHeader: true, text: '8.5.2 Identificación y trazabilidad', level: 2 },
      { id: '8.5.2-1', text: 'Programa escrito de trazabilidad ( materias primas, proceso y terminados )' },
      { isHeader: true, text: '8.5.3 Propiedad del cliente', level: 2 },
      { id: '8.5.3-1', text: 'Proteger y salvaguardar propiedad del cliente (Protección de datos, Control acceso)' },
      { isHeader: true, text: '8.5.6 Control de cambios', level: 2 },
      { id: '8.5.6-1', text: 'Revisar y controlar cambios para la prestación del servicio y conservar actas de aprobación' },
      { isHeader: true, text: '8.6 Liberación de productos y servicios' },
      { id: '8.6-1', text: 'Verificar y aprobar antes de entrega, conservando evidencia de conformidad y responsables' },
      { isHeader: true, text: '8.7 Control de salidas no conformes' },
      { id: '8.7-1', text: 'Identificar y controlar no conformidades (Plan de acción, Seguimiento)' },
      { id: '8.7-2', text: 'Documentar no conformidad, acciones, concesiones y autoridad' }
    ]
  },
  {
    id: '9',
    title: '9. Evaluación del desempeño',
    items: [
      { isHeader: true, text: '9.1 Seguimiento, medición, análisis y evaluación' },
      { id: '9.1.1', text: 'Determinar qué necesita seguimiento, métodos, realizar medición y evaluar desempeño' },
      { id: '9.1.2', text: 'Seguimiento de la satisfacción del cliente y sus métodos de obtención' },
      { id: '9.1.3', text: 'Análisis y evaluación de conformidad, satisfacción, SGC, riesgos y proveedores' },
      { isHeader: true, text: '9.2 Auditoría interna' },
      { id: '9.2.1', text: 'Llevar a cabo auditorías internas a intervalos planificados' },
      { id: '9.2.2', text: 'Planificar programa de auditoría, definir criterios, seleccionar auditores y tomar acciones' },
      { isHeader: true, text: '9.3 Revisión por la dirección' },
      { id: '9.3.1', text: 'Alta dirección debe revisar SGC para asegurar conveniencia y adecuación' },
      { id: '9.3.2', text: 'Considerar tendencias, auditorías, proveedores, recursos, riesgos y mejoras' },
      { id: '9.3.3', text: 'Salidas deben incluir decisiones sobre mejora, cambios en SGC y recursos' }
    ]
  },
  {
    id: '10',
    title: '10. Mejora',
    items: [
      { isHeader: true, text: '10.1 Generalidades' },
      { id: '10.1-1', text: 'Identificar oportunidades de mejora, implementar acciones y corregir efectos no deseados' },
      { isHeader: true, text: '10.2 No conformidad y acción correctiva' },
      { id: '10.2.1', text: 'Reaccionar ante no conformidad: Registro, Plan acción, Análisis causa, Seguimiento, Cierre' },
      { id: '10.2.2', text: 'Conservar información documentada de la naturaleza de no conformidades y resultados' },
      { isHeader: true, text: '10.3 Mejora continua' },
      { id: '10.3-1', text: 'Mejorar continuamente la conveniencia, adecuación y eficacia del SGC ( Plane de mejora continua )' }
    ]
  }
];

const EVALUATION_LEVELS = [
  { value: '', label: 'Seleccione un nivel...' },
  { value: 0, label: '0% - No existe nada' },
  { value: 25, label: '25% - Existe en un nivel inicial' },
  { value: 50, label: '50% - Parcialmente implementado' },
  { value: 75, label: '75% - Implementado pero con desviaciones' },
  { value: 100, label: '100% - Totalmente implementado y controlado' }
];

const COLORS = ['#1e40af', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981'];

export default function App() {
  const [activeTab, setActiveTab] = useState('checklist');
  const [expandedSection, setExpandedSection] = useState('4');
  const [evaluations, setEvaluations] = useState({});
  const fileInputRef = useRef(null);
  
  const [generalInfo, setGeneralInfo] = useState({
    companyName: '',
    date: new Date().toISOString().split('T')[0],
    responsible: ''
  });

  const handleEvaluationChange = (id, field, value) => {
    setEvaluations(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value }
    }));
  };

  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo(prev => ({ ...prev, [name]: value }));
  };

  // Exportar datos como archivo JSON
  const exportData = () => {
    const data = {
      generalInfo,
      evaluations,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Diagnostico_ISO9001_${generalInfo.companyName || 'Empresa'}_${generalInfo.date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Importar datos desde archivo JSON
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.generalInfo) setGeneralInfo(json.generalInfo);
        if (json.evaluations) setEvaluations(json.evaluations);
      } catch (err) {
        console.error("Error cargando el archivo", err);
      }
    };
    reader.readAsText(file);
  };

  const printReport = () => {
    window.print();
  };

  const dashboardData = useMemo(() => {
    let totalScoreSum = 0;
    let totalCriteriaCount = 0;
    
    const clauseData = ISO_STRUCTURE.map(clause => {
      let clauseScoreSum = 0;
      let evaluableItemsCount = 0;
      let answeredCount = 0;

      clause.items.forEach(item => {
        if (!item.isHeader) {
          evaluableItemsCount++;
          totalCriteriaCount++;
          const evaluation = evaluations[item.id];
          if (evaluation && evaluation.score !== '' && evaluation.score !== undefined) {
            clauseScoreSum += Number(evaluation.score);
            answeredCount++;
            totalScoreSum += Number(evaluation.score);
          }
        }
      });

      const averageScore = evaluableItemsCount > 0 
        ? Math.round(clauseScoreSum / evaluableItemsCount) 
        : 0;

      return {
        id: clause.id,
        name: `Cláusula ${clause.id}`,
        fullTitle: clause.title,
        score: averageScore,
        answered: answeredCount,
        total: evaluableItemsCount
      };
    });

    const overallImplementation = totalCriteriaCount > 0 
      ? Math.round(totalScoreSum / totalCriteriaCount) 
      : 0;

    return { clauseData, overallImplementation, totalCriteriaCount };
  }, [evaluations]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans print:bg-white">
      {/* Estilos para impresión */}
      <style>{`
        @media print {
          nav, header, .no-print, button, .instructions-card {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background-color: white;
            color: black;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .card {
            box-shadow: none !important;
            border: 1px solid #e2e8f0 !important;
            break-inside: avoid;
            margin-bottom: 20px;
          }
          .recharts-responsive-container {
            width: 100% !important;
            height: 350px !important;
          }
        }
      `}</style>

      {/* Header Principal - No se imprime */}
      <header className="bg-slate-900 text-white shadow-xl p-6 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CheckCircle size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">Diagnóstico ISO 9001:2015</h1>
              <p className="text-slate-400 text-xs font-medium">SISTEMA DE GESTIÓN DE CALIDAD</p>
            </div>
          </div>
          
          <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'checklist' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <CheckCircle size={16} />
              Evaluación
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutDashboard size={16} />
              Resultados
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Acciones de Archivo (Guardar/Cargar) - No se imprime */}
        <div className="flex flex-wrap justify-end gap-3 mb-6 no-print">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={importData} 
            className="hidden" 
            accept=".json"
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
          >
            <Upload size={14} /> Importar Datos
          </button>
          <button 
            onClick={exportData}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            <Download size={14} /> Guardar Progreso
          </button>
          <button 
            onClick={printReport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            <Printer size={14} /> Descargar Reporte (PDF)
          </button>
        </div>

        {activeTab === 'checklist' ? (
          <div className="space-y-6 no-print">
            {/* Sección de Información General */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 card">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <FileText className="text-blue-600" size={20} />
                <h3 className="font-bold text-slate-800">Ficha Técnica del Diagnóstico</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Razón Social</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="companyName"
                      value={generalInfo.companyName}
                      onChange={handleGeneralInfoChange}
                      placeholder="Nombre de la empresa"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Aplicación</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input
                      type="date"
                      name="date"
                      value={generalInfo.date}
                      onChange={handleGeneralInfoChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Responsable del Diagnóstico</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="responsible"
                      value={generalInfo.responsible}
                      onChange={handleGeneralInfoChange}
                      placeholder="Nombre completo"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl flex gap-4 items-center instructions-card">
              <Info className="text-blue-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Instrucciones de Evaluación</h4>
                <p className="text-blue-800 text-xs">Complete cada ítem evaluable. Las categorías numéricas sirven como guía estructural. Los resultados se guardarán automáticamente en su sesión actual.</p>
              </div>
            </div>

            {ISO_STRUCTURE.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden card">
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className={`w-full px-8 py-5 flex justify-between items-center transition-all ${expandedSection === section.id ? 'bg-slate-50 border-b border-slate-100' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {section.id}
                    </span>
                    <h2 className="text-lg font-bold text-slate-800">{section.title}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400">
                      {dashboardData.clauseData.find(c => c.id === section.id)?.answered} / {dashboardData.clauseData.find(c => c.id === section.id)?.total}
                    </span>
                    {expandedSection === section.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                  </div>
                </button>
                
                {expandedSection === section.id && (
                  <div className="divide-y divide-slate-100">
                    {section.items.map((item, idx) => {
                      if (item.isHeader) {
                        return (
                          <div key={`h-${idx}`} className={`px-8 py-3 bg-slate-50 border-l-4 border-slate-300 font-bold text-slate-600 ${item.level === 2 ? 'text-xs pl-12 uppercase tracking-wider' : 'text-sm'}`}>
                            {item.text}
                          </div>
                        );
                      }
                      const evalData = evaluations[item.id] || { score: '', observation: '' };
                      return (
                        <div key={item.id} className="p-8 hover:bg-blue-50/30 transition-colors">
                          <p className="text-slate-800 font-medium mb-4 text-sm leading-relaxed">{item.text}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Calificación</label>
                              <select
                                value={evalData.score}
                                onChange={(e) => handleEvaluationChange(item.id, 'score', e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                              >
                                {EVALUATION_LEVELS.map(lvl => <option key={lvl.label} value={lvl.value}>{lvl.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Observaciones</label>
                              <textarea
                                value={evalData.observation}
                                onChange={(e) => handleEvaluationChange(item.id, 'observation', e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-12"
                                placeholder="Evidencia encontrada..."
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header del Reporte - Se ve en pantalla y se imprime */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden card">
              <div className="bg-slate-900 text-white p-10 print:bg-slate-900 print:text-white">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">Reporte de Diagnóstico ISO 9001:2015</h2>
                    <p className="text-slate-400 text-sm">Estado de implementación del Sistema de Gestión de Calidad</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nivel General</p>
                    <p className="text-3xl font-black text-blue-400">{dashboardData.overallImplementation}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organización</span>
                    <span className="text-lg font-medium">{generalInfo.companyName || 'Sin especificar'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Cierre</span>
                    <span className="text-lg font-medium">{generalInfo.date || 'Sin fecha'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auditor / Responsable</span>
                    <span className="text-lg font-medium">{generalInfo.responsible || 'Sin asignar'}</span>
                  </div>
                </div>
              </div>

              {/* KPI TOTAL - Visualmente impactante */}
              <div className="p-16 flex flex-col items-center justify-center relative bg-white border-b border-slate-50">
                <h2 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-6">Grado Total de Cumplimiento Normativo</h2>
                <div className="relative inline-flex items-center justify-center">
                   <div className="text-9xl font-black text-slate-900 leading-none">
                    {dashboardData.overallImplementation}
                  </div>
                  <div className="text-5xl font-bold text-blue-600 ml-2">%</div>
                </div>
                <div className="w-full max-w-lg bg-slate-100 h-4 rounded-full overflow-hidden mt-10">
                  <div className="bg-blue-600 h-full transition-all duration-1000 ease-out" style={{ width: `${dashboardData.overallImplementation}%` }}></div>
                </div>
                <div className="flex gap-10 mt-10 text-center">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Items Totales</p>
                        <p className="text-xl font-bold text-slate-700">{dashboardData.totalCriteriaCount}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Items Evaluados</p>
                        <p className="text-xl font-bold text-blue-600">{dashboardData.clauseData.reduce((acc, curr) => acc + curr.answered, 0)}</p>
                    </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* BARRAS */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 card">
                <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                  <PieChart className="text-blue-600" size={18} />
                  Desempeño Comparativo por Cláusula
                </h3>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.clauseData} layout="vertical" margin={{ left: 30, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                      />
                      <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={25}>
                        {dashboardData.clauseData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RADIAL */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 card">
                <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2 text-center">
                  <PieChart className="text-indigo-600" size={18} />
                  Gráfica Radial de Madurez (Radar)
                </h3>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dashboardData.clauseData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                      <Radar name="Nivel SGC" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.5} />
                      <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* TABLA DETALLADA - Crucial para el reporte */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden card">
               <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                 <h3 className="font-bold text-slate-800">Resumen Estadístico de Implementación</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                   <thead>
                     <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                       <th className="px-10 py-6">Estructura Normativa (Cláusulas)</th>
                       <th className="px-10 py-6 text-center">Ítems Cubiertos</th>
                       <th className="px-10 py-6 text-center">Brecha</th>
                       <th className="px-10 py-6 text-right">Resultado</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {dashboardData.clauseData.map((clause, idx) => (
                       <tr key={clause.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="px-10 py-6 font-bold text-slate-700">{clause.fullTitle}</td>
                         <td className="px-10 py-6 text-center">
                           <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-black uppercase tracking-wider">
                             {clause.answered} de {clause.total}
                           </span>
                         </td>
                         <td className="px-10 py-6 text-center">
                            <span className="text-rose-500 font-bold">{(100 - clause.score)}%</span>
                         </td>
                         <td className="px-10 py-6 text-right">
                           <div className="flex items-center justify-end gap-5">
                             <div className="w-36 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${clause.score}%`, backgroundColor: COLORS[idx % COLORS.length] }}></div>
                             </div>
                             <span className="font-black text-slate-900 text-lg w-12">{clause.score}%</span>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <div className="p-10 bg-slate-900 text-white print-only hidden text-center italic text-xs">
                    Reporte generado automáticamente por la Plataforma de Diagnóstico ISO 9001:2015. 
                    Confidencial y de uso interno.
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer solo para reporte impreso */}
      <footer className="hidden print:block fixed bottom-0 left-0 w-full p-6 text-center text-[10px] text-slate-400 border-t border-slate-100 bg-white">
        Reporte de Diagnóstico ISO 9001:2015 - {generalInfo.companyName} - Generado el {new Date().toLocaleString()}
      </footer>
    </div>
  );
}