import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
        <div style="
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: ${color};
          opacity: 0.2;
          border-radius: 50%;
        "></div>
        <div style="
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${color};
          border: 1.5px solid #ffffff;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const greenIcon = createCustomIcon('#3fb978');
const yellowIcon = createCustomIcon('#eab308');
const redIcon = createCustomIcon('#ef4444');

export const InteractiveMap: React.FC = () => {
  const { projects } = useApp();
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
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Geospatial Radar</span>
            <span className="text-white/20">/</span>
            <span>Indian Coastal Coordinate Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Coastal Carbon Habitats Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Georeferenced spatial boundaries of registered mangrove forests, tidal salt marshes, and seagrass meadows across the Indian coastline.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 border border-white/[0.08] bg-[#0c120e] p-3 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3fb978]" />
            <span className="text-[#c2c9bf]">Verified</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#eab308]" />
            <span className="text-[#c2c9bf]">In Audit</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-1 border border-white/[0.08] bg-[#070a08] p-1 text-xs font-mono">
          {(['ALL', 'Mangrove', 'Seagrass', 'Salt Marsh'] as const).map(eco => (
            <button
              key={eco}
              onClick={() => setSelectedEcosystem(eco)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                selectedEcosystem === eco ? 'bg-[#18241c] text-[#3fb978] font-semibold' : 'text-[#8d998b] hover:text-white'
              }`}
            >
              {eco === 'ALL' ? 'All Habitats' : eco}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 border border-white/[0.08] bg-[#070a08] p-1 text-xs font-mono">
          {(['ALL', 'Verified', 'Pending'] as const).map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                selectedStatus === st ? 'bg-[#18241c] text-[#3fb978] font-semibold' : 'text-[#8d998b] hover:text-white'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Map Display Frame */}
      <div className="editorial-panel p-2 overflow-hidden">
        <div className="h-[520px] w-full relative">
          <MapContainer
            center={[18.5, 82.0]}
            zoom={5}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {filteredProjects.map((p) => (
              <Marker
                key={p.id}
                position={[p.lat, p.lng]}
                icon={getMarkerIcon(p.status)}
              >
                <Popup>
                  <div className="p-3 space-y-2 max-w-xs font-sans">
                    <div className="flex items-center justify-between border-b border-white/[0.1] pb-1 text-[10px] font-mono">
                      <span className="text-[#3fb978]">{p.id}</span>
                      <span className="text-[#8d998b]">{p.ecosystem}</span>
                    </div>
                    <div className="font-bold text-xs text-[#f5f6f2]">{p.name}</div>
                    <p className="text-[11px] text-[#8d998b] leading-tight line-clamp-2">{p.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] border-t border-white/[0.05]">
                      <div>
                        <span className="text-[#8d998b] block">Area:</span>
                        <span className="text-[#f5f6f2] font-semibold">{p.areaHectares} ha</span>
                      </div>
                      <div>
                        <span className="text-[#8d998b] block">Annual Sink:</span>
                        <span className="text-[#3fb978] font-semibold">{p.estimatedCarbonTons.toLocaleString()} t</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

    </div>
  );
};
