'use client';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Camera, MapPin, ShieldCheck, Home, FileText, Users, Clock, ArrowRight, UserPlus, Download } from 'lucide-react';

export default function PontoControleSection() {
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

  const addEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim()) return;
    setEmployees([
      ...employees,
      {
        name: newEmpName,
        role: newEmpRole,
        lastPunch: '--:--',
        status: 'Pendente',
        gps: 'Sem sinal'
      }
    ]);
    setNewEmpName('');
  };

  const featureCards = [
    {
      title: 'RECONHECIMENTO FACIAL',
      desc: 'Sistema avançado de biometria facial que valida a identidade em cada registro de ponto com alta precisão.',
      icon: <Camera className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'GEOLOCALIZAÇÃO',
      desc: 'Captura automática da localização GPS em cada batida de ponto para total transparência e controle.',
      icon: <MapPin className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'SEGURANÇA TOTAL',
      desc: 'Criptografia de dados, auditoria completa e conformidade com a LGPD para proteção máxima.',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'GESTÃO PARA O LAR',
      desc: 'Ideal para gerenciar funcionários domésticos, cuidadores e pequenas equipes com precisão.',
      icon: <Home className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'RELATÓRIOS EM PDF',
      desc: 'Gere relatórios detalhados de frequência, horas trabalhadas e atrasos exportáveis em PDF.',
      icon: <FileText className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'GESTÃO DE EQUIPE',
      desc: 'Painel completo para acompanhar todos os funcionários, seus horários e status em tempo real.',
      icon: <Users className="w-5 h-5 text-blue-600" />
    }
  ];

  return (
    <section id="pontocontrole" className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      
      {/* Blueprint grid lines for layout texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[25%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[75%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block with PontoControle Logo (Exactly what user requested: white and logo.png) */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center select-none">
          <img
            src="/logo.png"
            alt="PontoControle Logo"
            className="h-10 sm:h-12 w-auto object-contain mb-8"
          />
          
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
            Tecnologia que <span className="text-[#2563EB]">simplifica</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[65ch]">
            Nossa plataforma foi construída com o que há de mais moderno para garantir precisão e facilidade no dia a dia.
          </p>
        </div>

        {/* Part 1: Interactive biometrics punching simulator combined with a GPS log list */}
        <div className="w-full bg-white rounded-none shadow-[0_15px_40px_rgba(15,23,42,0.06)] border border-[#E2E8F0] p-6 sm:p-8 select-none mb-16 max-w-5xl mx-auto">
          
          {/* Mock Browser Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            </div>
            <div className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 border border-[#E2E8F0] px-4 py-0.5 rounded shadow-sm">
              app.pontocontrole.com.br/pontos
            </div>
            <div className="w-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box: Biometrics Face Scanner Simulator */}
            <div className="md:col-span-5 bg-[#F8FAFC] border border-[#E2E8F0] p-6 flex flex-col justify-between items-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <span className="text-[10px] font-bold text-slate-900 uppercase">Scanner Facial</span>
                <span className={cn(
                  'text-[9px] font-bold px-1.5 py-0.5 rounded font-mono',
                  scanStatus === 'scanning' ? 'bg-amber-50 text-amber-500 border border-amber-100 animate-pulse' :
                  scanStatus === 'success' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' :
                  'bg-slate-100 text-slate-500'
                )}>
                  {scanStatus === 'scanning' ? 'GEOLOCATING...' : scanStatus === 'success' ? 'SUCCESS' : 'ONLINE'}
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
                {scanStatus === 'scanning' ? 'Registrando...' : scanStatus === 'success' ? 'Ponto Confirmado!' : 'Simular Batida de Ponto'}
              </button>
            </div>

            {/* Right Box: Real-time Employee List */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-slate-500 font-bold">
                      <th className="pb-3 pr-4">Funcionário</th>
                      <th className="pb-3 px-4">Função</th>
                      <th className="pb-3 px-4">Último Registro</th>
                      <th className="pb-3 px-4">GPS</th>
                      <th className="pb-3 pl-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {employees.map((emp, index) => (
                      <tr key={index} className="hover:bg-[#F8FAFC]/50 transition-colors">
                        <td className="py-3 pr-4 font-bold text-slate-900">{emp.name}</td>
                        <td className="py-3 px-4 text-slate-500">{emp.role}</td>
                        <td className="py-3 px-4 font-mono">{emp.lastPunch}</td>
                        <td className="py-3 px-4 text-blue-600 font-semibold">{emp.gps}</td>
                        <td className="py-3 pl-4 text-right">
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase',
                            emp.status === 'Presente' && 'bg-emerald-50 text-emerald-600 border border-emerald-100',
                            emp.status === 'Intervalo' && 'bg-amber-50 text-amber-600 border border-amber-100',
                            emp.status === 'Pendente' && 'bg-slate-50 text-slate-500 border border-slate-200'
                          )}>
                            {emp.status}
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
                  <span>Conformidade com a Portaria 671 MTE</span>
                </div>
                <button className="text-blue-600 hover:underline flex items-center gap-1 font-bold">
                  <Download className="w-3 h-3" /> AFD / AFDT
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Part 2: 3x2 Square Grid Cards (Exactly like Image 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none mb-16 max-w-5xl mx-auto">
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white p-8 rounded-none border border-[#E2E8F0] shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 relative group text-left min-h-[220px] flex flex-col justify-between"
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

        {/* Bottom CTA block */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Falar com Especialista
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
