import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position: relative; width: 28px; height: 28px;">
        <div style="
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: ${color};
          opacity: 0.3;
          animation: pulse 2s infinite;
        "></div>
        <div style="
          position: absolute;
          top: 4px;
          left: 4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${color};
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px ${color};
        "></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const greenIcon = createCustomIcon('#10b981');
const yellowIcon = createCustomIcon('#f59e0b');
const redIcon = createCustomIcon('#ef4444');

export const InteractiveMap: React.FC = () => {
  const { projects, setActiveView, userRole } = useApp();
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemType | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'Verified' | 'Pending' | 'Rejected'>('ALL');

  const filteredProjects = projects.filter(p => {
    const matchesEco = selectedEcosystem === 'ALL' || p.ecosystem === selectedEcosystem;
    const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;
    return matchesEco && matchesStatus;
  });

  const getMarkerIcon = (status: string) => {
    if (status === 'Verified') return greenIcon;
    if (status === 'Pending') return yellowIcon;
    return redIcon;
  };

  return (
    <div className="space-y-4">
      
      {/* Map Control Bar & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-sky-400" />
            <span>Interactive Blue Carbon Ecosystem Map</span>
          </h2>
          <p className="text-xs text-slate-400">Geospatial location tracking for registered coastal carbon offset sites</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Ecosystem Filter */}
          <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 text-[10px] font-semibold uppercase">Ecosystem:</span>
            {(['ALL', 'Mangrove', 'Seagrass', 'Salt Marsh'] as const).map(eco => (
              <button
                key={eco}
                onClick={() => setSelectedEcosystem(eco)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedEcosystem === eco 
                    ? 'bg-sky-500 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {eco}
              </button>
            ))}
          </div>

          {/* Status Legend Buttons */}
          <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 text-[10px] font-semibold uppercase">Status:</span>
            
            <button
              onClick={() => setSelectedStatus('ALL')}
              className={`px-2 py-1 rounded-lg text-xs font-medium ${selectedStatus === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              All ({projects.length})
            </button>

            <button
              onClick={() => setSelectedStatus('Verified')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === 'Verified' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40' : 'text-emerald-400/80'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Verified ({projects.filter(p => p.status === 'Verified').length})</span>
            </button>

            <button
              onClick={() => setSelectedStatus('Pending')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === 'Pending' ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40' : 'text-amber-400/80'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Pending ({projects.filter(p => p.status === 'Pending').length})</span>
            </button>

            <button
              onClick={() => setSelectedStatus('Rejected')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === 'Rejected' ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40' : 'text-rose-400/80'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Rejected ({projects.filter(p => p.status === 'Rejected').length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[600px] w-full rounded-2xl overflow-hidden glass-panel border border-sky-500/20 shadow-2xl">
        <MapContainer
          center={[16.5000, 80.5000]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {filteredProjects.map(project => (
            <Marker
              key={project.id}
              position={[project.lat, project.lng]}
              icon={getMarkerIcon(project.status)}
            >
              <Popup>
                <div className="p-1 max-w-xs space-y-2 text-slate-100">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      project.status === 'Verified' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40' :
                      project.status === 'Pending' ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40' :
                      'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-mono text-sky-400">{project.id}</span>
                  </div>

                  <h4 className="font-bold text-sm text-white line-clamp-1">{project.name}</h4>
                  
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ecosystem:</span>
                      <span className="font-semibold text-sky-300">{project.ecosystem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span>{project.state}, {project.district}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Area:</span>
                      <span className="font-mono text-emerald-400">{project.areaHectares} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Est. Carbon:</span>
                      <span className="font-mono text-teal-300">{project.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
                    {project.status === 'Verified' && (
                      <button
                        onClick={() => setActiveView('marketplace')}
                        className="w-full py-1 rounded bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-[10px] text-center"
                      >
                        Buy Credits (${project.pricePerCreditUSD}/ton)
                      </button>
                    )}
                    {project.status === 'Pending' && userRole === 'GOV_ADMIN' && (
                      <button
                        onClick={() => setActiveView('verify')}
                        className="w-full py-1 rounded bg-blue-600 text-white font-bold text-[10px] text-center"
                      >
                        Verify in Gov Portal
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};
