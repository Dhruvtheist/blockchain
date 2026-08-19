import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType, Project } from '../types';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Compass, Layers, Maximize2, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <div style="
          position: absolute;
          width: 32px;
          height: 32px;
          background-color: ${color};
          opacity: 0.28;
          border-radius: 50%;
          animation: pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        "></div>
        <div style="
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: ${color};
          border: 2px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const verifiedIcon = createCustomIcon('#16825D');
const pendingIcon = createCustomIcon('#D97706');
const rejectedIcon = createCustomIcon('#DC4C4C');

const getEcoColor = (eco: EcosystemType, isDark: boolean) => {
  switch (eco) {
    case 'Mangrove': return isDark ? '#3fb978' : '#16825D';
    case 'Seagrass': return isDark ? '#06B6D4' : '#087EA4';
    case 'Salt Marsh': return '#D97706';
    default: return '#16825D';
  }
};

// Helper component to ensure map renders smoothly and handles view centering
const MapController: React.FC<{ targetCoords: [number, number] | null; zoomLevel?: number }> = ({ targetCoords, zoomLevel = 9 }) => {
  const map = useMap();

  useEffect(() => {
    // Invalidate map size to prevent gray tiles on view switch
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (targetCoords) {
      map.flyTo(targetCoords, zoomLevel, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [targetCoords, zoomLevel, map]);

  return null;
};

export const InteractiveMap: React.FC = () => {
  const { projects, theme, setActiveView } = useApp();
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemType | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'Verified' | 'Pending' | 'Rejected'>('ALL');
  const [targetCoords, setTargetCoords] = useState<[number, number] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isDark = theme === 'dark';

  const filteredProjects = projects.filter(p => {
    const matchesEco = selectedEcosystem === 'ALL' || p.ecosystem === selectedEcosystem;
    const matchesStatus = selectedStatus === 'ALL' || 
      (selectedStatus === 'Pending' ? (p.status === 'Pending' || p.status === 'MRV_Submitted') : p.status === selectedStatus);
    return matchesEco && matchesStatus;
  });

  const getMarkerIcon = (status: string) => {
    if (status === 'Verified') return verifiedIcon;
    if (status === 'Pending' || status === 'MRV_Submitted') return pendingIcon;
    return rejectedIcon;
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setTargetCoords([project.lat, project.lng]);
  };

  const handleResetView = () => {
    setSelectedProject(null);
    setTargetCoords([18.5, 82.0]);
  };

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <div className="space-y-6 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <Compass className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Geospatial Radar</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Sentinel-2 Coordinate Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Coastal Carbon Habitats Radar
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Georeferenced spatial boundaries of registered mangrove forests, tidal salt marshes, and seagrass meadows across the Indian coastline.
          </p>
        </div>

        {/* Legend & Reset Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-4 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-xl px-4 py-2 text-xs font-mono shadow-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
              <span className="text-[var(--text-primary)] font-semibold">Verified</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span className="text-[var(--text-primary)] font-semibold">In Audit</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DC4C4C]" />
              <span className="text-[var(--text-primary)] font-semibold">Rejected</span>
            </div>
          </div>

          <button
            onClick={handleResetView}
            className="h-9 px-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Reset to all Indian coastal coordinates"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Reset Radar</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-lg p-1 text-xs font-mono shadow-xs">
            {(['ALL', 'Mangrove', 'Seagrass', 'Salt Marsh'] as const).map(eco => (
              <button
                key={eco}
                onClick={() => setSelectedEcosystem(eco)}
                className={`h-7 px-3 rounded-md text-xs transition-all cursor-pointer ${
                  selectedEcosystem === eco 
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold shadow-xs' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-panel)]'
                }`}
              >
                {eco === 'ALL' ? 'All Habitats' : eco}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-lg p-1 text-xs font-mono shadow-xs">
            {(['ALL', 'Verified', 'Pending', 'Rejected'] as const).map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`h-7 px-3 rounded-md text-xs transition-all cursor-pointer ${
                  selectedStatus === st 
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold shadow-xs' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-panel)]'
                }`}
              >
                {st === 'ALL' ? 'All Status' : st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
          Displaying <span className="text-[var(--text-primary)] font-bold">{filteredProjects.length}</span> active habitats
        </div>
      </div>

      {/* Main Interactive Map & Project Selector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Map Frame (8 Cols) */}
        <div className="lg:col-span-8 editorial-panel p-2 overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
          <div className="h-[560px] w-full relative rounded-xl overflow-hidden">
            <MapContainer
              key={theme}
              center={[18.5, 82.0]}
              zoom={5}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={tileUrl}
                maxZoom={18}
              />

              <MapController targetCoords={targetCoords} zoomLevel={selectedProject ? 9 : 5} />

              {/* Render Polygons */}
              {filteredProjects.map((p) => {
                if (!p.boundaryPolygon || p.boundaryPolygon.length === 0) return null;
                const ecoColor = getEcoColor(p.ecosystem, isDark);
                return (
                  <Polygon
                    key={`poly-${p.id}`}
                    positions={p.boundaryPolygon}
                    pathOptions={{
                      color: ecoColor,
                      fillColor: ecoColor,
                      fillOpacity: 0.22,
                      weight: 2,
                      dashArray: p.status === 'Verified' ? undefined : '4, 4'
                    }}
                    eventHandlers={{
                      click: () => handleSelectProject(p)
                    }}
                  />
                );
              })}

              {/* Render Pulse Markers */}
              {filteredProjects.map((p) => (
                <Marker
                  key={p.id}
                  position={[p.lat, p.lng]}
                  icon={getMarkerIcon(p.status)}
                  eventHandlers={{
                    click: () => handleSelectProject(p)
                  }}
                >
                  <Popup>
                    <div className="p-3.5 space-y-2.5 max-w-xs font-sans text-[var(--text-primary)]">
                      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-[11px] font-mono">
                        <span className="text-[var(--color-primary)] font-bold">{p.id}</span>
                        <span className="text-[var(--text-secondary)] font-semibold">{p.ecosystem}</span>
                      </div>

                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)] font-display leading-tight">{p.name}</div>
                        <div className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">{p.district}, {p.state}</div>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                        {p.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 p-2 bg-[var(--surface-panel)] border border-[var(--border-subtle)] rounded-lg font-mono text-xs tabular-nums">
                        <div>
                          <span className="text-[var(--text-muted)] text-[10px] block uppercase font-semibold">Area</span>
                          <span className="text-[var(--text-primary)] font-bold">{p.areaHectares} ha</span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)] text-[10px] block uppercase font-semibold">Annual Sink</span>
                          <span className="text-[var(--color-success)] font-bold">{p.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setActiveView('mrv')}
                          className="flex-1 h-7 text-[11px] font-mono font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] rounded-md transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Telemetry MRV</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setActiveView('marketplace')}
                          className="flex-1 h-7 text-[11px] font-mono font-semibold border border-[var(--border-color)] bg-[var(--surface-panel)] hover:bg-[var(--surface-card)] text-[var(--text-primary)] rounded-md transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Carbon Store</span>
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Habitat Dossier Navigator (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>Registered Habitats ({filteredProjects.length})</span>
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Click to Inspect</span>
          </div>

          <div className="space-y-2.5 max-h-[515px] overflow-y-auto pr-1">
            {filteredProjects.map((p) => {
              const isSelected = selectedProject?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectProject(p)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] shadow-sm'
                      : 'border-[var(--border-color)] bg-[var(--surface-card)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-panel)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-1.5">
                    <span className="font-bold text-[var(--color-primary)]">{p.id}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      p.status === 'Verified' 
                        ? 'border-[var(--color-success)]/30 bg-[var(--color-success-soft)] text-[var(--color-success)]' 
                        : p.status === 'Rejected'
                        ? 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {p.status === 'Verified' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
                      <span>{p.status}</span>
                    </span>
                  </div>

                  <div className="font-semibold text-xs text-[var(--text-primary)] font-display line-clamp-1 mb-1">
                    {p.name}
                  </div>

                  <div className="text-[11px] text-[var(--text-secondary)] mb-2 font-mono">
                    {p.ecosystem} • {p.district}, {p.state}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[var(--border-subtle)] tabular-nums">
                    <span className="text-[var(--text-muted)]">[{p.lat.toFixed(2)}° N, {p.lng.toFixed(2)}° E]</span>
                    <span className="text-[var(--color-success)] font-bold">{p.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
