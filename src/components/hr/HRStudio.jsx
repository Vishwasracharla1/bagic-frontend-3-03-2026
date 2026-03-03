export default function HRStudio() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-magic text-primary-blue text-xl"></i>
                    Program Studio
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Create and configure new coaching programs</p>
            </div>

            {/* Wizard Steps */}
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                {[
                    { num: 1, label: 'Details', active: true },
                    { num: 2, label: 'Eligibility', active: false },
                    { num: 3, label: 'Content', active: false },
                    { num: 4, label: 'Metrics', active: false },
                    { num: 5, label: 'Review', active: false },
                ].map((step, i) => (
                    <div key={i} className="flex items-center">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${step.active ? 'bg-primary-blue border-primary-blue text-white shadow-sm shadow-primary-blue/20' : 'bg-white border-gray-100 text-gray-400'}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step.active ? 'bg-white text-primary-blue' : 'bg-gray-100 text-gray-400'}`}>
                                {step.num}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{step.label}</span>
                        </div>
                        {i < 4 && <div className="w-4 h-px bg-gray-100 mx-1"></div>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/10 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-800 tracking-tight">Step 1: Program Essentials</h2>
                            <span className="text-[9px] text-primary-blue font-bold uppercase tracking-widest bg-primary-blue/5 px-2 py-0.5 rounded">Draft</span>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className="block mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Program Identity</label>
                                    <input type="text" placeholder="e.g., New Manager Accelerator" className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] font-medium text-gray-800 outline-none focus:bg-white focus:border-primary-blue/30 focus:ring-4 focus:ring-primary-blue/5 transition-all" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Executive Summary</label>
                                    <textarea rows="3" placeholder="Describe objectives..." className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] font-medium text-gray-800 outline-none focus:bg-white focus:border-primary-blue/30 focus:ring-4 focus:ring-primary-blue/5 transition-all resize-none"></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Launch Date</label>
                                        <input type="date" className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] font-medium text-gray-800 outline-none focus:bg-white focus:border-primary-blue/30 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cycle Depth (Days)</label>
                                        <input type="number" defaultValue="90" className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] font-medium text-gray-800 outline-none focus:bg-white focus:border-primary-blue/30 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logic Blueprint</label>
                                    <select className="w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] font-bold text-gray-700 outline-none focus:bg-white focus:border-primary-blue/30 transition-all appearance-none cursor-pointer">
                                        <option value="">Custom Logical Flow</option>
                                        <option value="new-manager">New Manager Path</option>
                                        <option value="feedback">Feedback Mastery Path</option>
                                        <option value="hipo">HiPo Growth Path</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                                <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer">Discard Progress</button>
                                <div className="flex gap-2">
                                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all">Save Draft</button>
                                    <button className="bg-primary-blue text-white border-none px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all shadow-sm shadow-primary-blue/20 flex items-center gap-2">
                                        Next Stage <i className="fas fa-chevron-right text-[8px]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-primary-blue/5 rounded-xl border border-primary-blue/10 p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary-blue text-xs shadow-sm border border-primary-blue/5">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <div>
                                <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-tight mb-1">AI Logic Suggestion</h3>
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Templates automatically wire up AI guardrails, goal nodes, and sentiment tracking triggers.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-layer-group text-primary-blue text-[10px]"></i> Quick Start Blueprints
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {[
                                { title: 'New Manager Path', desc: 'Feedback, Delegation & 1:1s', color: 'primary-blue' },
                                { title: 'Feedback Mastery', desc: 'SBI Framework & Role-play', color: 'success' },
                                { title: 'HiPo Pipeline', desc: 'Strategic Growth & Influence', color: 'warning' },
                            ].map((blueprint, i) => (
                                <div key={i} className="p-3 bg-gray-50/50 rounded-xl border border-gray-100/50 group hover:border-primary-blue/30 transition-all cursor-pointer">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-[11px] font-bold text-gray-800 tracking-tight group-hover:text-primary-blue transition-colors">{blueprint.title}</h3>
                                        <i className="fas fa-plus text-[8px] text-gray-300 group-hover:text-primary-blue"></i>
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-medium leading-tight">{blueprint.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
