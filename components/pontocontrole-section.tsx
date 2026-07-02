'use client';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Camera, MapPin, ShieldCheck, Home, FileText, Users, Clock, ArrowRight, UserPlus, Download } from 'lucide-react';

export default function PontoControleSection({ showOnly }: { showOnly?: 'simulator' | 'cards' }) {
  const { t, language } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Interactive biometrics simulation state
  const [employees, setEmployees] = useState([
    { name: 'Maria Silva', role: 'Doméstica', lastPunch: '08:00 (Entrada)', status: 'Presente', gps: 'Bueno, Gyn' },
    { name: 'João Santos', role: 'Motorista', lastPunch: '09:12 (Entrada)', status: 'Presente', gps: 'Marista, Gyn' },
    { name: 'Ana Souza', role: 'Cuidadora', lastPunch: '12:00 (Almoço)', status: 'Intervalo', gps: 'Oeste, Gyn' }
  ]);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('Doméstica');
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const translateRole = (r: string) => {
    if (language === 'en') {
      if (r === 'Doméstica') return 'Housekeeper';
      if (r === 'Motorista') return 'Driver';
      if (r === 'Cuidadora') return 'Caregiver';
      if (r === 'PME Equipe') return 'SMB Team';
    }
    if (language === 'es') {
      if (r === 'Doméstica') return 'Doméstica';
      if (r === 'Motorista') return 'Chofer';
      if (r === 'Cuidadora') return 'Cuidadora';
      if (r === 'PME Equipe') return 'Equipo PyME';
    }
    return r;
  };

  const translatePunch = (p: string) => {
    if (language === 'en') {
      return p.replace('Entrada', 'Check-in').replace('Almoço', 'Lunch').replace('Saída', 'Check-out');
    }
    if (language === 'es') {
      return p.replace('Almoço', 'Almuerzo').replace('Saída', 'Salida');
    }
    return p;
  };

  const translateStatus = (s: string) => {
    if (language === 'en') {
      if (s === 'Presente') return 'PRESENT';
      if (s === 'Intervalo') return 'BREAK';
      if (s === 'Pendente') return 'PENDING';
    }
    if (language === 'es') {
      if (s === 'Presente') return 'PRESENTE';
      if (s === 'Intervalo') return 'RECESO';
      if (s === 'Pendente') return 'PENDIENTE';
    }
    return s;
  };

  const handleWhatsAppRedirect = () => {
    const text = language === 'en'
      ? 'Hello ViraWeb! I am interested in PontoControle for employee attendance.'
      : language === 'es'
      ? '¡Hola ViraWeb! Estou interesado en la herramienta PontoControle.'
      : 'Olá ViraWeb! Estou interessado no PontoControle para controle de ponto e banco de horas.';
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  const handleSimulateScan = () => {
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('success');
      setEmployees(prev => [
        {
          name: 'Roberto Souza',
          role: 'PME Equipe',
          lastPunch: '16:53 (Saída)',
          status: 'Presente',
          gps: 'Setor Sul, Gyn'
        },
        ...prev
      ]);
      setTimeout(() => {
        setScanStatus('idle');
      }, 2000);
    }, 1500);
  };

  const featureCards = [
    {
      title: language === 'en' ? 'FACIAL RECOGNITION' : language === 'es' ? 'RECONOCIMIENTO FACIAL' : 'RECONHECIMENTO FACIAL',
      desc: language === 'en' 
        ? 'Advanced facial biometrics system that validates identity on every clock-in with high precision.' 
        : language === 'es' 
        ? 'Sistema avanzado de biometría facial que valida la identidad en cada registro con alta precisión.' 
        : 'Sistema avançado de biometria facial que valida a identidade em cada registro de ponto com alta precisão.',
      icon: <Camera className="w-5 h-5 text-blue-600" />
    },
    {
      title: language === 'en' ? 'GEOLOCATION' : language === 'es' ? 'GEOLOCALIZACIÓN' : 'GEOLOCALIZAÇÃO',
      desc: language === 'en' 
        ? 'Automatic capture of GPS location with every clock-in for complete transparency and compliance.' 
        : language === 'es' 
        ? 'Captura automática de la ubicación GPS en cada registro para total transparencia.' 
        : 'Captura automática da localização GPS em cada batida de ponto para total transparência e controle.',
      icon: <MapPin className="w-5 h-5 text-blue-600" />
    },
    {
      title: language === 'en' ? 'TOTAL SECURITY' : language === 'es' ? 'SEGURIDAD TOTAL' : 'SEGURANÇA TOTAL',
      desc: language === 'en' 
        ? 'Data encryption, full logging, and compliance with data protection laws for maximum safety.' 
        : language === 'es' 
        ? 'Cifrado de datos, auditoría completa y cumplimiento de la ley de protección de datos.' 
        : 'Criptografia de dados, auditoria completa e conformidade com a LGPD para proteção máxima.',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
    },
    {
      title: language === 'en' ? 'HOUSEHOLD MANAGEMENT' : language === 'es' ? 'GESTIÓN DEL HOGAR' : 'GESTÃO PARA O LAR',
      desc: language === 'en' 
        ? 'Ideal for managing domestic workers, caregivers, and small service teams accurately.' 
        : language === 'es' 
        ? 'Ideal para gestionar empleados domésticos, cuidadores y pequeños equipos.' 
        : 'Ideal para gerenciar funcionários domésticos, cuidadores e pequenas equipes com precisão.',
      icon: <Home className="w-5 h-5 text-blue-600" />
    },
    {
      title: language === 'en' ? 'PDF REPORTS' : language === 'es' ? 'REPORTES EN PDF' : 'RELATÓRIOS EM PDF',
      desc: language === 'en' 
        ? 'Generate detailed reports of attendance, hours worked, and overtime exportable to PDF.' 
        : language === 'es' 
        ? 'Genere informes detallados de asistencia, horas trabajadas y horas extras exportables en PDF.' 
        : 'Gere relatórios detalhados de frequência, horas trabalhadas e atrasos exportáveis em PDF.',
      icon: <FileText className="w-5 h-5 text-blue-600" />
    },
    {
      title: language === 'en' ? 'TEAM MANAGEMENT' : language === 'es' ? 'GESTIÓN DE EQUIPOS' : 'GESTÃO DE EQUIPE',
      desc: language === 'en' 
        ? 'Comprehensive panel to track all employees, their schedules, and status in real-time.' 
        : language === 'es' 
        ? 'Panel completo para monitorear a todos los empleados, sus horarios y estado en tiempo real.' 
        : 'Painel completo para acompanhar todos os funcionários, seus horários e status em tempo real.',
      icon: <Users className="w-5 h-5 text-blue-600" />
    }
  ];

  return (
    <section id="pontocontrole" className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden w-full">
      
      {/* Blueprint grid lines for layout texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[25%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[75%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block: Rendered for full stack or simulator slide */}
        {(!showOnly || showOnly === 'simulator') && (
          <div className={cn("pc-header text-center max-w-3xl mx-auto mb-16 flex flex-col items-center select-none", showOnly && "mb-8")}>
            <img
              src="/logo.png"
              alt="PontoControle Logo"
              className={cn("h-10 sm:h-12 w-auto object-contain mb-8", showOnly && "mb-4 h-8")}
            />
            
            <h2 className={cn("text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4", showOnly && "text-2xl md:text-4xl mb-2")}>
              {language === 'en' ? <>Technology that <span className="text-[#2563EB]">simplifies</span></> : language === 'es' ? <>Tecnología que <span className="text-[#2563EB]">simplifica</span></> : <>Tecnologia que <span className="text-[#2563EB]">simplifica</span></>}
            </h2>
            {!showOnly && (
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[65ch]">
                {language === 'en' ? 'Our platform was built with the most modern tools to guarantee accuracy and ease in daily routines.' : language === 'es' ? 'Nuestra plataforma fue construida con lo último en tecnología para garantizar precisión y facilidad en el día a día.' : 'Nossa plataforma foi construída com o que há de mais moderno para garantir precisão e facilidade no dia a dia.'}
              </p>
            )}
          </div>
        )}

        {/* Header Block: Rendered for cards features slide */}
        {showOnly === 'cards' && (
          <div className="pc-header text-center max-w-3xl mx-auto mb-8 flex flex-col items-center select-none">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-2">
              {language === 'en' ? 'Why choose PontoControle?' : language === 'es' ? '¿Por qué elegir PontoControle?' : 'Por que escolher o PontoControle?'}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[65ch]">
              {language === 'en' ? 'Core features that optimize your domestic or team management.' : language === 'es' ? 'Características clave que optimizan la gestión de sus empleados.' : 'Recursos essenciais que otimizam a gestão de seus funcionários.'}
            </p>
          </div>
        )}

        {/* Part 1: Interactive biometrics punching simulator combined with a GPS log list */}
        {(!showOnly || showOnly === 'simulator') && (
          <div className="pc-simulator w-full bg-white rounded-none shadow-[0_15px_40px_rgba(15,23,42,0.06)] border border-[#E2E8F0] p-6 sm:p-8 select-none mb-16 max-w-5xl mx-auto">
            
            {/* Mock Browser Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 border border-[#E2E8F0] px-4 py-0.5 rounded shadow-sm">
                pontocontrole.com.br/pontos
              </div>
              <div className="w-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Box: Biometrics Face Scanner Simulator */}
              <div className="md:col-span-5 bg-[#F8FAFC] border border-[#E2E8F0] p-6 flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-full flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                  <span className="text-[10px] font-bold text-slate-900 uppercase">
                    {language === 'en' ? 'Facial Scanner' : language === 'es' ? 'Escáner Facial' : 'Scanner Facial'}
                  </span>
                  <span className={cn(
                    'text-[9px] font-bold px-1.5 py-0.5 rounded font-mono',
                    scanStatus === 'scanning' ? 'bg-amber-50 text-amber-500 border border-amber-100 animate-pulse' :
                    scanStatus === 'success' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' :
                    'bg-slate-100 text-slate-500'
                  )}>
                    {scanStatus === 'scanning' ? (language === 'en' ? 'GEOLOCATING...' : 'GEOLOCALIZANDO...') : scanStatus === 'success' ? (language === 'en' ? 'SUCCESS' : language === 'es' ? 'ÉXITO' : 'SUCESSO') : 'ONLINE'}
                  </span>
                </div>

                {/* Camera Circle */}
                <div className="my-6 relative flex items-center justify-center">
                  <div className={cn(
                    'w-36 h-36 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                    scanStatus === 'scanning' && 'border-amber-400 scale-105',
                    scanStatus === 'success' && 'border-emerald-500 bg-emerald-50/10 scale-100',
                    scanStatus === 'idle' && 'border-slate-300'
                  )}>
                    <Camera className={cn(
                      'w-8 h-8 transition-colors',
                      scanStatus === 'scanning' && 'text-amber-500 animate-pulse',
                      scanStatus === 'success' && 'text-emerald-500',
                      scanStatus === 'idle' && 'text-slate-400'
                    )} />
                  </div>

                  {/* Simulated Geofence active circle */}
                  <div className="absolute -inset-2 border border-dashed border-blue-500/10 rounded-full animate-spin" />
                </div>

                <button
                  onClick={handleSimulateScan}
                  disabled={scanStatus !== 'idle'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-none transition-colors cursor-pointer disabled:opacity-50"
                >
                  {scanStatus === 'scanning' 
                    ? (language === 'en' ? 'Punching...' : 'Registrando...') 
                    : scanStatus === 'success' 
                    ? (language === 'en' ? 'Punch Confirmed!' : language === 'es' ? '¡Registro Confirmado!' : 'Ponto Confirmado!') 
                    : (language === 'en' ? 'Simulate Clock-In' : language === 'es' ? 'Simular Registro de Punto' : 'Simular Batida de Ponto')}
                </button>
              </div>

              {/* Right Box: Real-time Employee List */}
              <div className="pc-table-box md:col-span-7 flex flex-col justify-between">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] text-slate-500 font-bold">
                        <th className="pb-3 pr-4">{language === 'en' ? 'Employee' : language === 'es' ? 'Empleado' : 'Funcionário'}</th>
                        <th className="pb-3 px-4">{language === 'en' ? 'Role' : language === 'es' ? 'Puesto' : 'Função'}</th>
                        <th className="pb-3 px-4">{language === 'en' ? 'Last Punch' : language === 'es' ? 'Último Registro' : 'Último Registro'}</th>
                        <th className="pb-3 px-4">GPS</th>
                        <th className="pb-3 pl-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {employees.map((emp, index) => (
                        <tr key={index} className="hover:bg-[#F8FAFC]/50 transition-colors">
                          <td className="py-3 pr-4 font-bold text-slate-900">{emp.name}</td>
                          <td className="py-3 px-4 text-slate-500">{translateRole(emp.role)}</td>
                          <td className="py-3 px-4 font-mono">{translatePunch(emp.lastPunch)}</td>
                          <td className="py-3 px-4 text-blue-600 font-semibold">{emp.gps}</td>
                          <td className="py-3 pl-4 text-right">
                            <span className={cn(
                              'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase',
                              emp.status === 'Presente' && 'bg-emerald-50 text-emerald-600 border border-emerald-100',
                              emp.status === 'Intervalo' && 'bg-amber-50 text-amber-600 border border-amber-100',
                              emp.status === 'Pendente' && 'bg-slate-50 text-slate-500 border border-slate-200'
                            )}>
                              {translateStatus(emp.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Status bar */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>
                      {language === 'en' ? 'Compliance with Decree 671 MTE' : language === 'es' ? 'Cumplimiento con la Ordenanza 671 MTE' : 'Conformidade com a Portaria 671 MTE'}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:underline flex items-center gap-1 font-bold">
                    <Download className="w-3.5 h-3.5" /> AFD / AFDT
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Part 2: 3x2 Square Grid Cards (Exactly like Image 4) */}
        {(!showOnly || showOnly === 'cards') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none mb-16 max-w-5xl mx-auto">
            {featureCards.map((card, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="pc-feature-card bg-white p-8 rounded-none border border-[#E2E8F0] shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 relative group text-left min-h-[220px] flex flex-col justify-between"
              >
                <div>
                  {/* Icon wrapper */}
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 rounded-none">
                    {card.icon}
                  </div>
                  
                  {/* Title */}
                  <h4 className="font-bold text-slate-900 text-sm tracking-wide mb-3 uppercase">
                    {card.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-slate-500 text-[12px] leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>

                {/* Slider Blue line at bottom (Image 4 hover style) */}
                <div
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-[3px] bg-[#2563EB] transition-transform duration-300 origin-left',
                    hoveredCard === idx ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA block */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 select-none w-full sm:w-auto">
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {language === 'en' ? 'Talk to Specialist' : language === 'es' ? 'Hablar con Especialista' : 'Falar com Especialista'}
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://pontocontrole.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-200 hover:border-slate-400 bg-white text-slate-800 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 text-center w-full sm:w-auto"
          >
            {language === 'en' ? 'Access PontoControle' : language === 'es' ? 'Acceder a PontoControle' : 'Acessar PontoControle'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
