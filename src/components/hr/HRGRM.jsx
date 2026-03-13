import React, { useState } from 'react';
import KnowledgeGraphExplorer from '../common/KnowledgeGraphExplorer';

export default function HRGRM() {
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState({ totalNodes: 0, totalEdges: 0 });

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                        <i className="fas fa-search text-primary-blue text-xl"></i>
                        GRM Explorer
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-wide">Graph Reasoning Machine - Audit and explain AI decisions</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Compact Stats */}
                    <div className="flex gap-2">
                        <div className="bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg text-blue-700 text-xs font-bold shadow-sm">
                            {stats.totalNodes.toLocaleString()} <span className="text-blue-400 font-medium">Nodes</span>
                        </div>
                        <div className="bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg text-green-700 text-xs font-bold shadow-sm">
                            {stats.totalEdges.toLocaleString()} <span className="text-green-400 font-medium">Edges</span>
                        </div>
                    </div>

                    {/* Top Search Bar */}
                    <div className="relative group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search items or ID..."
                            className="bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all shadow-sm group-hover:border-gray-300"
                        />
                        <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs group-focus-within:text-blue-500 transition-colors"></i>
                    </div>
                </div>
            </div>

            {/* Knowledge Graph */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <KnowledgeGraphExplorer
                    searchQuery={searchQuery}
                    onStatsUpdate={setStats}
                />
            </div>
        </div>
    );
}
