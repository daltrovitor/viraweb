'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { 
  Plus, 
  Search, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  X, 
  Check, 
  ArrowRight,
  User,
  ShoppingBag,
  CreditCard,
  Briefcase
} from 'lucide-react';

interface Budget {
  id: string;
  client: string;
  total: number;
  status: 'Rascunho' | 'Enviado' | 'Aprovado' | 'Rejeitado' | 'Expirado' | 'Pago';
  date: string;
  items: string[];
}

export default function GdcSpotlight() {
  const { t, language } = useTranslation();

  const getTabLabel = (tab: string) => {
    if (language === 'en') {
      switch (tab) {
        case 'Todos': return 'All';
        case 'Rascunho': return 'Draft';
        case 'Enviado': return 'Sent';
        case 'Aprovado': return 'Approved';
        case 'Pago': return 'Paid';
      }
    }
    if (language === 'es') {
      switch (tab) {
        case 'Todos': return 'Todos';
        case 'Rascunho': return 'Borrador';
        case 'Enviado': return 'Enviado';
        case 'Aprovado': return 'Aprobado';
        case 'Pago': return 'Pagado';
      }
    }
    return tab;
  };

  const getStatusLabel = (status: string) => {
    if (language === 'en') {
      switch (status) {
        case 'Rascunho': return 'Draft';
        case 'Enviado': return 'Sent';
        case 'Aprovado': return 'Approved';
        case 'Pago': return 'Paid';
      }
    }
    if (language === 'es') {
      switch (status) {
        case 'Rascunho': return 'Borrador';
        case 'Enviado': return 'Enviado';
        case 'Aprovado': return 'Aprobado';
        case 'Pago': return 'Pagado';
      }
    }
    return status;
  };

  const translateItem = (item: string) => {
    if (language === 'en') {
      if (item === 'Landing Page Premium') return 'Premium Landing Page';
      if (item === 'Integração ViraBot IA') return 'ViraBot IA Integration';
      if (item === 'Setup CRM GDC') return 'GDC CRM Setup';
      if (item === 'Landing Page de Alta Conversão') return 'High-Converting Landing Page';
      if (item === 'Integração ViraBot IA (Atendimento)') return 'ViraBot IA Integration (Support)';
      if (item === 'Setup Completo CRM & Funil GDC') return 'Full CRM & Funnel GDC Setup';
      if (item === 'Campanha de Tráfego de Elite') return 'Elite Traffic Campaign';
    }
    if (language === 'es') {
      if (item === 'Landing Page Premium') return 'Landing Page Premium';
      if (item === 'Integração ViraBot IA') return 'Integración ViraBot IA';
      if (item === 'Setup CRM GDC') return 'Configuración CRM GDC';
      if (item === 'Landing Page de Alta Conversão') return 'Landing Page de Alta Conversión';
      if (item === 'Integração ViraBot IA (Atendimento)') return 'Integración ViraBot IA (Soporte)';
      if (item === 'Setup Completo CRM & Funil GDC') return 'Configuración Completa CRM & Embudo GDC';
      if (item === 'Campanha de Tráfego de Elite') return 'Campaña de Tráfico de Élite';
    }
    return item;
  };
  
  // Grid size configuration
  const gridSquaresSize = '36px 36px'; // slightly larger squares as requested

  // Budget List State
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '#ORC-2026-001', client: 'Carlos Eduardo (PME)', total: 4500, status: 'Aprovado', date: '29/06/2026', items: ['Landing Page Premium'] },
    { id: '#ORC-2026-002', client: 'Fernanda Lima (E-commerce)', total: 9500, status: 'Enviado', date: '28/06/2026', items: ['Integração ViraBot IA', 'Setup CRM GDC'] }
  ]);

  const [activeTab, setActiveTab] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Wizard state
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  
  // New budget form state
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<{ name: string; price: number }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('Pix (À Vista)');
  
  // Available mock clients for search
  const availableClients = [
    'Carlos Eduardo',
    'Fernanda Lima',
    'Roberto Alves',
    'Juliana Nogueira',
    'TechStart Ltda',
    'Sabor Digital'
  ];

  // Available mock services
  const availableServices = [
    { name: 'Landing Page de Alta Conversão', price: 4500 },
    { name: 'Integração ViraBot IA (Atendimento)', price: 6000 },
    { name: 'Setup Completo CRM & Funil GDC', price: 3500 },
    { name: 'Campanha de Tráfego de Elite', price: 5000 }
  ];

  // Calculation for stats
  const totalRevenue = budgets.reduce((acc, curr) => acc + curr.total, 0);
  const netRevenue = totalRevenue * 0.85; // 85% net estimate
  const approvedCount = budgets.filter(b => b.status === 'Aprovado' || b.status === 'Pago').length;
  const conversionRate = budgets.length > 0 ? Math.round((approvedCount / budgets.length) * 100) : 0;

  const handleAddService = (service: { name: string; price: number }) => {
    if (selectedServices.find(s => s.name === service.name)) {
      setSelectedServices(selectedServices.filter(s => s.name !== service.name));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleCreateBudget = () => {
    const total = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
    const newBudget: Budget = {
      id: `#ORC-2026-00${budgets.length + 1}`,
      client: selectedClient || 'Cliente Avulso',
      total,
      status: 'Enviado',
      date: new Date().toLocaleDateString('pt-BR'),
      items: selectedServices.map(s => s.name)
    };

    setBudgets([newBudget, ...budgets]);
    
    // Reset wizard
    setShowWizard(false);
    setWizardStep(1);
    setSelectedClient('');
    setSelectedServices([]);
    setPaymentMethod('Pix (À Vista)');
  };

  const filteredBudgets = budgets.filter(b => {
    const matchesSearch = b.client.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'Todos' || b.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <section id="gdc" className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      
      {/* Evident Blueprint Background Grid with Custom Square Size */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: gridSquaresSize
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Product pitch (Explaining the entire GDC Platform with simulator callout) */}
          <div className="gdc-left-col lg:col-span-4 flex flex-col items-start text-left select-none animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-[1.5px] bg-[#2563EB]" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#475569] uppercase">
                {language === 'en' ? 'Proprietary Tech — 1 of 14 Modules' : language === 'es' ? 'Tecnología Propietaria — 1 de 14 Módulos' : 'Tecnologia Proprietária — 1 de 14 Módulos'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#0F172A] tracking-tighter leading-none mb-6">
              {language === 'en' ? (
                <>
                  GDC <br />
                  <span className="text-[#2563EB]">Platform</span>
                </>
              ) : language === 'es' ? (
                <>
                  Plataforma <br />
                  <span className="text-[#2563EB]">GDC</span>
                </>
              ) : (
                <>
                  Plataforma <br />
                  <span className="text-[#2563EB]">GDC</span>
                </>
              )}
            </h2>
            
            <p className="text-[#475569] text-sm md:text-base leading-relaxed mb-6 max-w-[45ch]">
              {language === 'en' 
                ? 'The GDC is our proprietary control center that integrates CRM, automated billing, metrics dashboards, and AI agents into a single ecosystem to run your business without spreadsheets.'
                : language === 'es'
                ? 'El GDC es nuestro centro de mando propietario que integra CRM, facturación automatizada, paneles de métricas y agentes de IA en un único ecosistema para dirigir su empresa sin hojas de cálculo.'
                : 'O GDC é a nossa central de comando proprietária que integra CRM, faturamento automatizado, painéis de métricas e agentes de IA em um único ecossistema para rodar sua empresa de ponta a ponta sem planilhas.'
              }
            </p>

            {/* Informational Callout clarifying the example */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl mb-6 w-full max-w-[45ch]">
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                {language === 'en'
                  ? '👉 The simulator on the right demonstrates our Invoicing & Budgeting Module, which is just 1 of the 14 operational modules integrated within the GDC Platform.'
                  : language === 'es'
                  ? '👉 El simulador de la derecha muestra nuestro Módulo de Invoicing y Presupuestos, que es solo 1 de los 14 módulos operativos integrados dentro de la Plataforma GDC.'
                  : '👉 O simulador ao lado demonstra o nosso Módulo de Orçamentos e Faturamento, que é apenas 1 dos 14 módulos operacionais integrados na Plataforma GDC.'
                }
              </p>
            </div>

            {/* Key Modules List */}
            <div className="space-y-3.5 w-full mb-8 font-sans text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <span><strong>{language === 'en' ? 'CRM & Operational' : 'CRM & Operacional'}:</strong> {language === 'en' ? 'Client history, scheduling, and service logs.' : 'Histórico de clientes, escalas e prontuários vinculados.'}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <span><strong>{language === 'en' ? 'Financial Automation' : 'Automação Financeira'}:</strong> {language === 'en' ? 'Split sales, commissions, cashflow, and invoicing.' : 'Controle de caixa, parcelamentos de vendas e comissões automáticas.'}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <span><strong>{language === 'en' ? 'Business Intelligence' : 'BI & Dashboards'}:</strong> {language === 'en' ? 'Real-time MRR, CAC, LTV, and sales volume metrics.' : 'MRR, faturamento líquido, LTV e métricas de conversão em tempo real.'}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                <span><strong>{language === 'en' ? 'Integrated AI Agent' : 'ViraBot IA Integrado'}:</strong> {language === 'en' ? 'Operational analysis and automated actions 24/7.' : 'Assistente cognitivo para análise de faturamento e funil integrado.'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
              <button
                onClick={() => setShowWizard(true)}
                className="bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:scale-[1.02] shrink-0"
              >
                {language === 'en' ? 'Simulate Invoicing' : language === 'es' ? 'Simular Presupuesto' : 'Simular Módulo de Orçamentos'}
                <Plus className="w-4 h-4" />
              </button>
              <a
                href="https://gdc.viraweb.online"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-200 hover:border-slate-400 bg-white text-slate-800 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 text-center w-full sm:w-auto"
              >
                {language === 'en' ? 'Access GDC' : language === 'es' ? 'Acceder a GDC' : 'Acessar GDC'}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Budget Simulation Panel (Matching User Screenshots) */}
          <div className="gdc-right-col lg:col-span-8 w-full">
            <div className="w-full bg-white rounded-none shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-[#E2E8F0] p-6 sm:p-8 relative min-h-[480px]">
              
              {!showWizard ? (
                /* SCREEN 1: BUDGETS DASHBOARD (Image 1 reference) */
                <div className="flex flex-col text-left">
                  
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-5 select-none">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-none">
                        {language === 'en' ? 'Budgets' : language === 'es' ? 'Presupuestos' : 'Orçamentos'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {language === 'en' ? 'Create and manage professional budgets' : language === 'es' ? 'Cree y gestione presupuestos profesionales' : 'Crie e gerencie orçamentos profissionais'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowWizard(true)}
                      className="gdc-new-budget-btn bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 flex items-center gap-1.5 cursor-pointer rounded-none active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      {language === 'en' ? 'New Budget' : language === 'es' ? 'Nuevo Presupuesto' : 'Novo Orçamento'}
                    </button>
                  </div>

                  {/* Summary 4-Cards Grid */}
                  <div className="gdc-stats-grid grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 select-none">
                    {/* Card 1: Count */}
                    <div className="bg-white border border-[#E2E8F0] p-4 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 border border-blue-100 text-blue-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">
                          {language === 'en' ? 'Budgets' : language === 'es' ? 'Presupuestos' : 'Orçamentos'}
                        </div>
                        <div className="text-lg font-black text-slate-900">{budgets.length}</div>
                      </div>
                    </div>

                    {/* Card 2: Total Revenue */}
                    <div className="bg-white border border-[#E2E8F0] p-4 flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">
                          {language === 'en' ? 'Total Revenue' : language === 'es' ? 'Ingreso Total' : 'Receita Total'}
                        </div>
                        <div className="text-sm font-black text-slate-900">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
                      </div>
                    </div>

                    {/* Card 3: Net Revenue */}
                    <div className="bg-white border border-[#E2E8F0] p-4 flex items-center gap-3">
                      <div className="p-2 bg-cyan-50 border border-cyan-100 text-cyan-600">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">
                          {language === 'en' ? 'Net Revenue' : language === 'es' ? 'Ingreso Neto' : 'Receita Líquida'}
                        </div>
                        <div className="text-sm font-black text-slate-900">R$ {netRevenue.toLocaleString('pt-BR')}</div>
                      </div>
                    </div>

                    {/* Card 4: Conversion */}
                    <div className="bg-white border border-[#E2E8F0] p-4 flex items-center gap-3">
                      <div className="p-2 bg-amber-50 border border-amber-100 text-amber-600">
                        <Percent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">
                          {language === 'en' ? 'Conversion' : language === 'es' ? 'Conversión' : 'Conversão'}
                        </div>
                        <div className="text-lg font-black text-slate-900">{conversionRate}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar & Tabs Grid */}
                  <div className="gdc-search-tabs flex flex-col gap-4 mb-4 select-none">
                    <div className="relative">
                       <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder={language === 'en' ? 'Search by client or ID...' : language === 'es' ? 'Buscar por client o ID...' : 'Buscar por cliente ou ID...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Status Tabs marquee */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {['Todos', 'Rascunho', 'Enviado', 'Aprovado', 'Pago'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                            activeTab === tab 
                              ? 'bg-[#2563EB] text-white border-[#2563EB]' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {getTabLabel(tab)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List Content */}
                  <div className="gdc-list-content border border-slate-100 divide-y divide-slate-100 min-h-[160px]">
                    {filteredBudgets.length > 0 ? (
                      filteredBudgets.map(b => (
                        <div key={b.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                          <div className="text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{b.id}</span>
                              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 font-mono">{b.date}</span>
                            </div>
                            <div className="text-slate-700 font-semibold mt-1">{b.client}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{b.items.map(item => translateItem(item)).join(', ')}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900 text-xs">R$ {b.total.toLocaleString('pt-BR')}</div>
                            <span className={`inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 mt-1 ${
                              b.status === 'Aprovado' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              b.status === 'Pago' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                              'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              {getStatusLabel(b.status)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-center select-none text-slate-400">
                        <FileText className="w-10 h-10 stroke-1 mb-2" />
                        <div className="font-bold text-xs text-slate-800">
                          {language === 'en' ? 'No budget found' : language === 'es' ? 'Ningún presupuesto encontrado' : 'Nenhum orçamento encontrado'}
                        </div>
                        <div className="text-[10px] mt-1">
                          {language === 'en' ? 'Try changing the filter or add a new budget' : language === 'es' ? 'Intente cambiar el filtro o agregue un nuevo presupuesto' : 'Experimente mudar o filtro ou adicione um novo orçamento'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* SCREEN 2: MULTI-STEP CREATION WIZARD (Image 2 reference) */
                <div className="flex flex-col text-left">
                  
                  {/* Wizard Header */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6 select-none">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-none">
                        {language === 'en' ? 'New Budget' : language === 'es' ? 'Nuevo Presupuesto' : 'Novo Orçamento'}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {language === 'en' ? `Step ${wizardStep} of 4` : language === 'es' ? `Etapa ${wizardStep} de 4` : `Etapa ${wizardStep} de 4`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowWizard(false);
                        setWizardStep(1);
                      }}
                      className="text-slate-400 hover:text-slate-900 border border-slate-200 px-3 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      {language === 'en' ? 'Cancel' : language === 'es' ? 'Cancelar' : 'Cancelar'}
                    </button>
                  </div>

                  {/* Wizard Steps indicator bar */}
                  <div className="flex items-center justify-between gap-2 mb-8 select-none">
                    {[
                      { num: 1, label: language === 'en' ? 'Client' : language === 'es' ? 'Cliente' : 'Cliente', icon: <User className="w-3 h-3" /> },
                      { num: 2, label: language === 'en' ? 'Products' : language === 'es' ? 'Productos' : 'Produtos', icon: <ShoppingBag className="w-3 h-3" /> },
                      { num: 3, label: language === 'en' ? 'Payment' : language === 'es' ? 'Pago' : 'Pagamento', icon: <CreditCard className="w-3 h-3" /> },
                      { num: 4, label: language === 'en' ? 'Summary' : language === 'es' ? 'Resumen' : 'Resumo', icon: <Check className="w-3 h-3" /> }
                    ].map(step => (
                      <div key={step.num} className="flex-1 flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          wizardStep >= step.num 
                            ? 'bg-[#2563EB] text-white' 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {step.num}
                        </div>
                        <span className={`text-[10px] font-bold hidden sm:inline ${
                          wizardStep === step.num ? 'text-slate-900' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </span>
                        {step.num < 4 && <div className="flex-1 h-[1.5px] bg-slate-100" />}
                      </div>
                    ))}
                  </div>

                  {/* Wizard Body content */}
                  <div className="min-h-[220px]">
                    {wizardStep === 1 && (
                      /* STEP 1: SELECT CLIENT */
                      <div>
                        <h4 className="font-bold text-xs text-slate-700 uppercase mb-3">
                          {language === 'en' ? 'Select client' : language === 'es' ? 'Seleccione el cliente' : 'Selecione o cliente'}
                        </h4>
                        <div className="relative mb-4">
                          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder={language === 'en' ? 'Search client...' : language === 'es' ? 'Buscar cliente...' : 'Buscar cliente...'}
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            className="w-full bg-white border border-slate-200 pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 font-medium"
                          />
                        </div>
                        
                        {/* Suggest list */}
                        <div className="space-y-1 font-semibold text-xs text-slate-600">
                          {availableClients
                            .filter(c => c.toLowerCase().includes(selectedClient.toLowerCase()))
                            .map(c => (
                              <div
                                key={c}
                                onClick={() => setSelectedClient(c)}
                                className={`p-3 border cursor-pointer flex justify-between items-center transition-colors ${
                                  selectedClient === c 
                                    ? 'border-blue-500 bg-blue-50/20 text-blue-700 font-bold' 
                                    : 'border-slate-100 hover:bg-slate-50'
                                }`}
                              >
                                <span>{c}</span>
                                {selectedClient === c && <Check className="w-3.5 h-3.5 text-blue-600" />}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {wizardStep === 2 && (
                      /* STEP 2: PRODUCTS/SERVICES */
                      <div>
                        <h4 className="font-bold text-xs text-slate-700 uppercase mb-3">
                          {language === 'en' ? 'Services & Products' : language === 'es' ? 'Servicios y Productos' : 'Serviços & Produtos'}
                        </h4>
                        <div className="space-y-2">
                          {availableServices.map(service => {
                            const isAdded = selectedServices.some(s => s.name === service.name);
                            return (
                              <div
                                key={service.name}
                                onClick={() => handleAddService(service)}
                                className={`p-3 border cursor-pointer flex justify-between items-center text-xs font-semibold transition-all ${
                                  isAdded 
                                    ? 'border-blue-500 bg-blue-50/20 text-blue-700 font-bold' 
                                    : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div>
                                  <div>{translateItem(service.name)}</div>
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">R$ {service.price.toLocaleString('pt-BR')}</div>
                                </div>
                                <div className={`w-5 h-5 border flex items-center justify-center ${
                                  isAdded ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                                }`}>
                                  {isAdded && <Check className="w-3.5 h-3.5" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {wizardStep === 3 && (
                      /* STEP 3: PAYMENT CONDITIONS */
                      <div>
                        <h4 className="font-bold text-xs text-slate-700 uppercase mb-3">
                          {language === 'en' ? 'Payment Conditions' : language === 'es' ? 'Condiciones de Pago' : 'Condições de Pagamento'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                          {[
                            'Pix (À Vista - 5% Desconto)',
                            'Boleto Bancário (15 dias)',
                            'Boleto Parcelado (3x)',
                            'Cartão de Crédito (1x)',
                            'Cartão de Crédito (Até 12x)'
                          ].map(method => {
                            const translatePaymentMethod = (m: string) => {
                              if (language === 'en') {
                                if (m.startsWith('Pix')) return 'Pix (Cash - 5% Discount)';
                                if (m.includes('15 dias')) return 'Bank Slip (15 days)';
                                if (m.includes('3x')) return 'Split Slip (3x)';
                                if (m.includes('1x')) return 'Credit Card (1x)';
                                if (m.includes('12x')) return 'Credit Card (Up to 12x)';
                              }
                              if (language === 'es') {
                                if (m.startsWith('Pix')) return 'Pix (Al contado - 5% Descuento)';
                                if (m.includes('15 dias')) return 'Factura bancaria (15 días)';
                                if (m.includes('3x')) return 'Factura a plazos (3x)';
                                if (m.includes('1x')) return 'Tarjeta de crédito (1x)';
                                if (m.includes('12x')) return 'Tarjeta de crédito (Hasta 12x)';
                              }
                              return m;
                            };
                            return (
                              <div
                                key={method}
                                onClick={() => setPaymentMethod(method)}
                                className={`p-4 border cursor-pointer flex justify-between items-center transition-all ${
                                  paymentMethod === method 
                                    ? 'border-blue-500 bg-blue-50/20 text-blue-700 font-bold' 
                                    : 'border-slate-100 hover:bg-slate-50'
                                }`}
                              >
                                <span>{translatePaymentMethod(method)}</span>
                                {paymentMethod === method && <Check className="w-3.5 h-3.5 text-blue-600" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {wizardStep === 4 && (
                      /* STEP 4: SUMMARY/SUBMIT */
                      <div className="bg-slate-50 border border-slate-100 p-5 rounded-none text-xs">
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">
                          {language === 'en' ? 'Proposal Summary' : language === 'es' ? 'Resumen de la Propuesta' : 'Resumo da Proposta'}
                        </h4>
                        
                        <div className="space-y-3 font-semibold text-slate-700">
                          <div className="flex justify-between">
                            <span className="text-slate-400">
                              {language === 'en' ? 'Client' : language === 'es' ? 'Cliente' : 'Cliente'}
                            </span>
                            <span className="text-slate-900">{selectedClient || (language === 'en' ? 'Not selected' : language === 'es' ? 'No seleccionado' : 'Não selecionado')}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-slate-400">
                              {language === 'en' ? 'Conditions' : language === 'es' ? 'Condiciones' : 'Condições'}
                            </span>
                            <span className="text-slate-900">
                              {(() => {
                                const m = paymentMethod;
                                if (language === 'en') {
                                  if (m.startsWith('Pix')) return 'Pix (Cash - 5% Discount)';
                                  if (m.includes('15 dias')) return 'Bank Slip (15 days)';
                                  if (m.includes('3x')) return 'Split Slip (3x)';
                                  if (m.includes('1x')) return 'Credit Card (1x)';
                                  if (m.includes('12x')) return 'Credit Card (Up to 12x)';
                                }
                                if (language === 'es') {
                                  if (m.startsWith('Pix')) return 'Pix (Al contado - 5% Descuento)';
                                  if (m.includes('15 dias')) return 'Factura bancaria (15 días)';
                                  if (m.includes('3x')) return 'Factura a plazos (3x)';
                                  if (m.includes('1x')) return 'Tarjeta de crédito (1x)';
                                  if (m.includes('12x')) return 'Tarjeta de crédito (Hasta 12x)';
                                }
                                return m;
                              })()}
                            </span>
                          </div>

                          <div className="border-t border-slate-200/60 pt-3">
                            <span className="text-slate-400 block mb-2">
                              {language === 'en' ? 'Contracted Services' : language === 'es' ? 'Servicios Contratados' : 'Serviços Contratados'}
                            </span>
                            {selectedServices.map(s => (
                              <div key={s.name} className="flex justify-between font-medium text-slate-800 py-1">
                                <span>{translateItem(s.name)}</span>
                                <span className="font-mono">R$ {s.price.toLocaleString('pt-BR')}</span>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-slate-200 pt-3 flex justify-between font-black text-sm text-[#2563EB]">
                            <span>{language === 'en' ? 'TOTAL PROPOSAL' : language === 'es' ? 'TOTAL PROPUESTA' : 'TOTAL PROPOSTA'}</span>
                            <span className="font-mono">
                              R$ {selectedServices.reduce((acc, curr) => acc + curr.price, 0).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Wizard Navigation Actions */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 select-none">
                    <button
                      onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
                      disabled={wizardStep === 1}
                      className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer disabled:opacity-40"
                    >
                      {language === 'en' ? 'Back' : language === 'es' ? 'Volver' : 'Voltar'}
                    </button>
                    
                    {wizardStep < 4 ? (
                      <button
                        onClick={() => setWizardStep(prev => prev + 1)}
                        disabled={wizardStep === 1 ? !selectedClient : wizardStep === 2 ? selectedServices.length === 0 : false}
                        className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-6 py-2 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                      >
                        {language === 'en' ? 'Next' : language === 'es' ? 'Avanzar' : 'Avançar'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleCreateBudget}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2 flex items-center gap-1.5 cursor-pointer"
                      >
                        {language === 'en' ? 'Generate Budget' : language === 'es' ? 'Generar Presupuesto' : 'Gerar Orçamento'}
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              )}

              {/* Watermark Logo behind */}
              <img
                src="/favicon.png"
                alt="Watermark"
                className="absolute right-4 top-4 w-12 h-12 opacity-[0.03] select-none pointer-events-none"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
