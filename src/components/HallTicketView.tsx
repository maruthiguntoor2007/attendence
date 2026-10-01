import React, { useState } from 'react';
import { APP_ASSETS, EXAM_ALLOCATIONS } from '../data/mockData';
import { StudentProfile } from '../types/campus';

interface HallTicketViewProps {
  student: StudentProfile;
  onShowToast: (msg: string) => void;
  onDownloadPass: () => void;
  onFileCondonation: () => void;
}

export const HallTicketView: React.FC<HallTicketViewProps> = ({
  student,
  onShowToast,
  onDownloadPass,
  onFileCondonation,
}) => {
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'seating' | 'pass'>('seating');
  const [showArModal, setShowArModal] = useState(false);
  const [highlightDesk, setHighlightDesk] = useState(false);

  const selectedExam = EXAM_ALLOCATIONS[selectedExamIndex] || EXAM_ALLOCATIONS[0];

  const handleRecenter = () => {
    setCurrentZoom(1.08);
    setHighlightDesk(true);
    onShowToast('Centered on Desk #42 (Row 4, Col 2)');
    setTimeout(() => {
      setHighlightDesk(false);
    }, 2500);
  };

  const handleZoomIn = () => {
    if (currentZoom < 1.35) {
      setCurrentZoom((prev) => +(prev + 0.1).toFixed(2));
    }
  };

  const handleZoomOut = () => {
    if (currentZoom > 0.85) {
      setCurrentZoom((prev) => +(prev - 0.1).toFixed(2));
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 space-y-4">
      {/* Top Session & Exam Context Header */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span className="text-[11px] text-[#006c49] uppercase tracking-wider font-bold">
              Active Session
            </span>
          </div>
          <span className="text-[11px] text-[#434655]">End-Semester Exams • Nov 2024</span>
        </div>

        {/* View Switcher: Seating Map vs Digital Pass */}
        <div className="flex bg-[#e7eeff] p-1 rounded-xl">
          <button
            onClick={() => setViewMode('seating')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'seating'
                ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
                : 'text-[#434655] hover:text-[#111c2d]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Hall B Seating &amp; Nav</span>
          </button>
          <button
            onClick={() => setViewMode('pass')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'pass'
                ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
                : 'text-[#434655] hover:text-[#111c2d]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>Digital Admit Card</span>
          </button>
        </div>

        {/* Student Identity Quick Strip */}
        <div className="bg-[#ffffff] rounded-2xl p-3 flex items-center justify-between shadow-xs border border-[#e7eeff]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#004ac6] flex items-center justify-center text-[#ffffff] font-headline text-[15px] font-bold shrink-0 shadow-xs">
              AR
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-[13px] font-bold text-[#111c2d] truncate">
                  {student.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#e7eeff] text-[#434655] font-semibold">
                  {student.id}
                </span>
              </div>
              <span className="font-body text-[11px] text-[#434655] truncate">
                B.Tech Computer Science • Sem V
              </span>
            </div>
          </div>
          <div className="text-right shrink-0 pl-2">
            <span className="text-[10px] text-[#434655] block uppercase font-bold">Assigned</span>
            <span className="font-headline text-[16px] text-[#004ac6] font-bold">
              Desk #{selectedExam.deskNumber}
            </span>
          </div>
        </div>

        {/* Exam Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 pt-1 -mx-4 px-4 no-scrollbar">
          {EXAM_ALLOCATIONS.map((exam, idx) => {
            const isSelected = selectedExamIndex === idx;
            return (
              <button
                key={exam.courseCode}
                onClick={() => setSelectedExamIndex(idx)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full transition-all text-left ${
                  isSelected
                    ? 'bg-[#004ac6] text-[#ffffff] shadow-sm'
                    : 'bg-[#ffffff] text-[#111c2d] hover:bg-[#f0f3ff] border border-[#e7eeff]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isSelected
                      ? 'text-[#ffffff]'
                      : exam.status === 'Confirmed'
                      ? 'text-[#006c49]'
                      : 'text-[#784b00]'
                  }`}
                >
                  {exam.status === 'Confirmed' ? 'verified' : 'schedule'}
                </span>
                <div className="flex flex-col pr-1">
                  <span className="font-headline text-[12px] font-bold leading-tight">
                    {exam.courseCode} {exam.courseName}
                  </span>
                  <span
                    className={`text-[10px] leading-none ${
                      isSelected ? 'text-[#dbe1ff]' : 'text-[#434655]'
                    }`}
                  >
                    {exam.examDate.split(',')[0]} • {exam.hallName} • Desk {exam.deskNumber}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'seating' ? (
        <>
          {/* Primary Seating Status & Venue Card */}
          <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#004ac6] mb-1">
                  <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Confirmed Venue
                  </span>
                </div>
                <h2 className="font-headline text-[18px] font-bold text-[#111c2d] leading-tight">
                  {selectedExam.hallName} • {selectedExam.block}
                </h2>
                <span className="font-body text-[12px] text-[#434655]">
                  {selectedExam.level}, {selectedExam.room}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
                  Doors open in 45m
                </span>
                <span className="text-[10px] text-[#434655] mt-1">Gates lock: 09:45 AM</span>
              </div>
            </div>

            {/* Snapshot Strip */}
            <div className="grid grid-cols-3 gap-2 bg-[#f0f3ff] rounded-xl p-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#434655]">Assigned Seat</span>
                <span className="font-headline text-[15px] text-[#004ac6] font-bold">
                  Desk {selectedExam.deskNumber}
                </span>
                <span className="text-[10px] text-[#434655]">
                  Row {selectedExam.row}, Col {selectedExam.col}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#434655]">Invigilator</span>
                <span className="font-headline text-[12px] text-[#111c2d] font-bold truncate">
                  {selectedExam.invigilator}
                </span>
                <span className="text-[10px] text-[#434655] truncate">
                  {selectedExam.department}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#434655]">Reporting</span>
                <span className="font-headline text-[12px] text-[#ba1a1a] font-bold">
                  {selectedExam.reportingTime}
                </span>
                <span className="text-[10px] text-[#434655]">
                  Exam: {selectedExam.examTime.split('-')[0]}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() =>
                  onShowToast('Turn-by-turn guidance started via North Quad to Ramanujan Block')
                }
                className="flex-1 min-h-[44px] px-4 py-2.5 bg-[#004ac6] text-[#ffffff] rounded-xl font-headline text-[13px] font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#003ea8] active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">directions_walk</span>
                <span>Start Navigation</span>
                <span className="text-[11px] opacity-80">(3m walk)</span>
              </button>
              <button
                onClick={onDownloadPass}
                className="min-h-[44px] px-4 py-2.5 bg-[#e7eeff] text-[#00174b] rounded-xl font-headline text-[13px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#dee8ff] active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Pass</span>
              </button>
            </div>
          </div>

          {/* Interactive Hall Floorplan Visualizer */}
          <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
                  grid_view
                </span>
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  Exam Hall B Seating Map
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-[#f0f3ff] rounded-lg p-0.5">
                <span className="px-2 py-1 rounded bg-[#ffffff] text-[#004ac6] shadow-xs text-[11px] font-bold">
                  L2 Plan
                </span>
                <button
                  onClick={() => onShowToast('Switching to 3D Building Floor Overview')}
                  className="px-2 py-1 rounded text-[#434655] hover:text-[#111c2d] text-[11px] font-medium"
                >
                  Building
                </button>
              </div>
            </div>

            {/* Live Beacon Detection Badge */}
            <div className="flex items-center justify-between bg-[#f0f3ff] px-3 py-1.5 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006c49] text-[16px]">sensors</span>
                <span className="text-[11px] text-[#111c2d] font-semibold truncate">
                  Indoor Beacon: BLDG-4-L2-B02
                </span>
              </div>
              <span className="text-[11px] text-[#006c49] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                Strong Signal
              </span>
            </div>

            {/* Controls Overlay */}
            <div className="absolute right-6 top-28 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-[#dee8ff]">
              <button
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className="w-8 h-8 flex items-center justify-center rounded text-[#111c2d] hover:bg-[#f0f3ff] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
              <button
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className="w-8 h-8 flex items-center justify-center rounded text-[#111c2d] hover:bg-[#f0f3ff] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <button
                onClick={handleRecenter}
                aria-label="Recenter on desk 42"
                className="w-8 h-8 flex items-center justify-center rounded text-[#004ac6] hover:bg-[#dee8ff] active:scale-95 transition-transform"
                title="Find my desk"
              >
                <span className="material-symbols-outlined text-[18px]">my_location</span>
              </button>
            </div>

            {/* Hall Graphic Stage */}
            <div
              className="relative w-full rounded-2xl bg-[#f0f3ff] p-3 overflow-hidden transition-transform duration-200"
              style={{ transform: `scale(${currentZoom})` }}
            >
              {/* Podium & Whiteboard */}
              <div className="w-full flex flex-col items-center mb-3">
                <div className="w-3/4 py-1.5 px-3 bg-[#263143] text-[#ecf1ff] rounded-lg text-center flex items-center justify-center gap-2 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#ffddb8]">
                    podium
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    INVIGILATOR PODIUM &amp; WHITEBOARD
                  </span>
                </div>
                <div className="w-full flex justify-between px-2 mt-1">
                  <span className="flex items-center gap-1 text-[10px] text-[#006c49] font-bold">
                    <span className="material-symbols-outlined text-[13px]">login</span> Entry A (Roll 25-50)
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#ba1a1a] font-bold">
                    <span className="material-symbols-outlined text-[13px]">emergency</span> Fire Exit Only
                  </span>
                </div>
              </div>

              {/* Seating Grid (Rows 1 to 5, Columns 1 to 4) */}
              <div className="flex flex-col gap-2">
                {/* Row 1 */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="w-4 text-[10px] font-bold text-[#434655] text-center">R1</span>
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    {[25, 26, 27, 28].map((num) => (
                      <div
                        key={num}
                        className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs"
                      >
                        <span className="text-[11px] font-bold text-[#111c2d] leading-none">
                          {num}
                        </span>
                        <span className="text-[9px] text-[#434655]">Occupied</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="w-4 text-[10px] font-bold text-[#434655] text-center">R2</span>
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">31</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#e7eeff] flex flex-col items-center justify-center opacity-70">
                      <span className="text-[11px] font-semibold text-[#434655] leading-none">32</span>
                      <span className="text-[9px] text-[#434655]">Buffer</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">33</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">34</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="w-4 text-[10px] font-bold text-[#434655] text-center">R3</span>
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    {[37, 38, 39, 40].map((num) => (
                      <div
                        key={num}
                        className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs"
                      >
                        <span className="text-[11px] font-bold text-[#111c2d] leading-none">
                          {num}
                        </span>
                        <span className="text-[9px] text-[#434655]">Occupied</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 4 (DESK 42 IS HERE) */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="w-4 text-[10px] font-bold text-[#004ac6] text-center">R4</span>
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">41</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>

                    {/* HERO DESK 42 */}
                    <div
                      className={`relative h-10 rounded-lg bg-[#004ac6] text-[#ffffff] flex flex-col items-center justify-center shadow-md scale-105 z-10 transition-all ${
                        highlightDesk ? 'ring-4 ring-[#6cf8bb] animate-pulse' : ''
                      }`}
                    >
                      <div className="absolute -top-2.5 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6cf8bb] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#6cf8bb] text-[8px] text-[#002113] font-bold items-center justify-center">
                          YOU
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px] text-[#ffddb8]">
                          power
                        </span>
                        <span className="text-[11px] font-bold leading-none">42</span>
                      </div>
                      <span className="text-[8px] text-[#dbe1ff] leading-none">Alex R.</span>
                    </div>

                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">43</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">44</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="w-4 text-[10px] font-bold text-[#434655] text-center">R5</span>
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">47</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#e7eeff] flex flex-col items-center justify-center opacity-70">
                      <span className="text-[11px] font-semibold text-[#434655] leading-none">48</span>
                      <span className="text-[9px] text-[#434655]">Buffer</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">49</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                    <div className="h-10 rounded-lg bg-[#d8e3fb] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[11px] font-bold text-[#111c2d] leading-none">50</span>
                      <span className="text-[9px] text-[#434655]">Occupied</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rear Facilities */}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#dee8ff] text-[#434655] text-[10px]">
                <div className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[13px]">luggage</span> Bag Deposit
                  Racks
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[13px]">wc</span> Restrooms (Exit
                  Left)
                </div>
              </div>
            </div>

            {/* Map Legend Bar */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#004ac6]"></span>
                <span className="text-[#111c2d] font-bold">Your Assigned Desk (42)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#d8e3fb]"></span>
                <span className="text-[#434655]">Occupied / Student</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#e7eeff]"></span>
                <span className="text-[#434655]">Buffer / Vacant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#784b00]">power</span>
                <span className="text-[#434655]">AC Power Active</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Indoor Walking Route */}
          <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                  turn_sharp_right
                </span>
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  Indoor Navigation Route
                </h3>
              </div>
              <span className="text-[11px] text-[#434655]">From North Campus Gate</span>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#dee8ff] text-[#004ac6] flex items-center justify-center text-[12px] font-bold shrink-0">
                  1
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                      Enter Ramanujan Block
                    </span>
                    <span className="text-[11px] text-[#434655]">50m</span>
                  </div>
                  <p className="font-body text-[11px] text-[#434655] mt-0.5">
                    Walk through North Lobby main glass entrance. Campus ID NFC tap available at
                    turnstiles.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#dee8ff] text-[#004ac6] flex items-center justify-center text-[12px] font-bold shrink-0">
                  2
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                      Elevator / Staircase B to Level 2
                    </span>
                    <span className="text-[11px] text-[#434655]">1 min</span>
                  </div>
                  <p className="font-body text-[11px] text-[#434655] mt-0.5">
                    Turn right immediately past Central Library reception desk. Take Staircase B or
                    Lift 2 to 2nd Floor.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#004ac6] text-[#ffffff] flex items-center justify-center text-[12px] font-bold shrink-0 shadow-xs">
                  3
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                      Hall B • Entrance Door 1
                    </span>
                    <span className="text-[11px] text-[#006c49] font-bold">Arrive</span>
                  </div>
                  <p className="font-body text-[11px] text-[#434655] mt-0.5">
                    Hall B is on your direct left. Check queue for Roll CS21B025 - CS21B050. Desk 42
                    is Row 4.
                  </p>
                </div>
              </div>
            </div>

            {/* Live GPS guidance mini card */}
            <div className="bg-[#f0f3ff] rounded-xl p-2.5 flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-[18px]">
                  explore
                </span>
                <span className="text-[11px] text-[#111c2d] font-semibold">
                  Auto-guidance syncs with your position
                </span>
              </div>
              <button
                onClick={() => setShowArModal(true)}
                className="px-2.5 py-1 rounded-lg bg-[#ffffff] text-[#004ac6] text-[11px] font-bold shadow-xs hover:bg-[#004ac6] hover:text-[#ffffff] transition-all"
              >
                AR Floor View
              </button>
            </div>
          </div>

          {/* Desk Amenities & Exam Room Rules */}
          <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                  policy
                </span>
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  Desk Verification &amp; Rules
                </h3>
              </div>
              <span className="text-[11px] text-[#006c49] font-bold">Ready for Check-in</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f0f3ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                  check_circle
                </span>
                <div className="flex flex-col">
                  <span className="font-headline text-[12px] font-bold text-[#111c2d]">
                    Desk 42 Amenities Active
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    Individual LED reading lamp &amp; 230V socket verified
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">bolt</span>
            </div>

            <div className="flex flex-col gap-2 pt-1 text-[12px]">
              <div className="flex items-start gap-2 text-[#111c2d]">
                <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <p>
                  <strong>Mandatory ID:</strong> Original Physical Student ID Card and printed
                  Semester Hall Ticket are required at Desk 42.
                </p>
              </div>
              <div className="flex items-start gap-2 text-[#111c2d]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">
                  do_not_disturb_on
                </span>
                <p>
                  <strong>Strictly Barred:</strong> Smartwatches, Bluetooth earwear, programmable
                  calculators. Keep in entrance bag lockers.
                </p>
              </div>
            </div>

            <div className="pt-1 border-t border-[#f0f3ff] flex justify-between items-center text-[11px]">
              <button
                onClick={() =>
                  onShowToast('Exam Helpdesk notified for Desk 42 hardware inspection')
                }
                className="text-[#ba1a1a] font-bold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">report_problem</span>
                <span>Report Desk Damage or Roll Number Mismatch</span>
              </button>
              <span className="text-[#434655]">Desk Helpdesk: Ext 402</span>
            </div>
          </div>
        </>
      ) : (
        /* DIGITAL HALL TICKET PASS VIEW */
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Institutional Alert & Freeze Countdown Banner */}
          <div className="w-full rounded-2xl bg-[#dee8ff] p-4 shadow-sm border border-[#d8e3fb] relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ba1a1a] text-[#ffffff] flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                </div>
                <div>
                  <span className="font-headline text-[14px] font-bold text-[#111c2d] block leading-tight">
                    Eligibility Clearance
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    Semester VI Final Examinations
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                  1 At Risk
                </span>
                <span className="text-[11px] text-[#434655] mt-0.5">4 of 5 Cleared</span>
              </div>
            </div>

            <div className="mt-3 bg-white/80 rounded-xl p-3 space-y-1 relative z-10">
              <div className="flex items-center justify-between text-[#111c2d]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#784b00]">
                    lock_clock
                  </span>
                  <span className="text-[12px] font-bold">Portal Freeze: Nov 15</span>
                </div>
                <span className="text-[11px] font-bold text-[#784b00] px-2 py-0.5 rounded-full bg-[#ffddb8]">
                  12 Days Left
                </span>
              </div>
              <p className="font-body text-[11px] text-[#434655] leading-relaxed">
                Mandatory 75% aggregate &amp; per-course attendance threshold required for final
                hall ticket unlocking.
              </p>
            </div>
          </div>

          {/* Digital Hall Ticket Admit Card */}
          <div className="w-full rounded-2xl bg-[#ffffff] shadow-md border border-[#dee8ff] overflow-hidden">
            {/* Header Ribbon */}
            <div className="bg-[#004ac6] text-[#ffffff] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="font-headline text-[12px] font-bold tracking-wider uppercase">
                  CampusTrack Clearance • Sem VI
                </span>
              </div>
              <span className="font-mono text-[11px] opacity-90">#HT-2024-SEM6-402</span>
            </div>

            <div className="p-4 space-y-4">
              {/* Candidate Info */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-xs bg-[#e7eeff] border border-[#dee8ff]">
                    <img
                      src={APP_ASSETS.studentPortrait}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline text-[16px] font-bold text-[#111c2d] truncate">
                      {student.name}
                    </h3>
                    <p className="font-mono text-[11px] text-[#434655]">Roll: {student.id}</p>
                    <p className="font-body text-[11px] text-[#434655] truncate">
                      B.Tech Computer Science &amp; Eng.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-[#dee8ff]/60 text-center border border-[#dee8ff]">
                  <span className="material-symbols-outlined text-[20px] text-[#784b00]">
                    gavel
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#784b00] mt-0.5">
                    Provisional
                  </span>
                  <span className="text-[9px] text-[#434655] leading-none">Under Review</span>
                </div>
              </div>

              {/* Barcode & QR Block */}
              <div className="rounded-xl bg-[#f0f3ff] p-3 flex flex-col items-center justify-center space-y-2 text-center">
                {/* SVG Code 128 Barcode */}
                <div className="w-full flex items-center justify-center py-1">
                  <svg className="h-10 w-4/5 text-[#111c2d]" fill="currentColor" viewBox="0 0 240 40">
                    <rect x="0" y="0" width="3" height="40"></rect>
                    <rect x="6" y="0" width="2" height="40"></rect>
                    <rect x="11" y="0" width="4" height="40"></rect>
                    <rect x="18" y="0" width="2" height="40"></rect>
                    <rect x="23" y="0" width="5" height="40"></rect>
                    <rect x="31" y="0" width="2" height="40"></rect>
                    <rect x="36" y="0" width="3" height="40"></rect>
                    <rect x="42" y="0" width="6" height="40"></rect>
                    <rect x="51" y="0" width="2" height="40"></rect>
                    <rect x="56" y="0" width="4" height="40"></rect>
                    <rect x="63" y="0" width="3" height="40"></rect>
                    <rect x="69" y="0" width="5" height="40"></rect>
                    <rect x="77" y="0" width="2" height="40"></rect>
                    <rect x="82" y="0" width="4" height="40"></rect>
                    <rect x="89" y="0" width="2" height="40"></rect>
                    <rect x="94" y="0" width="6" height="40"></rect>
                    <rect x="103" y="0" width="3" height="40"></rect>
                    <rect x="109" y="0" width="3" height="40"></rect>
                    <rect x="115" y="0" width="5" height="40"></rect>
                    <rect x="123" y="0" width="2" height="40"></rect>
                    <rect x="128" y="0" width="4" height="40"></rect>
                    <rect x="135" y="0" width="2" height="40"></rect>
                    <rect x="140" y="0" width="5" height="40"></rect>
                    <rect x="148" y="0" width="3" height="40"></rect>
                    <rect x="154" y="0" width="2" height="40"></rect>
                    <rect x="159" y="0" width="6" height="40"></rect>
                    <rect x="168" y="0" width="2" height="40"></rect>
                    <rect x="173" y="0" width="4" height="40"></rect>
                    <rect x="180" y="0" width="5" height="40"></rect>
                    <rect x="188" y="0" width="2" height="40"></rect>
                    <rect x="193" y="0" width="3" height="40"></rect>
                    <rect x="199" y="0" width="6" height="40"></rect>
                    <rect x="208" y="0" width="2" height="40"></rect>
                    <rect x="213" y="0" width="4" height="40"></rect>
                    <rect x="220" y="0" width="3" height="40"></rect>
                    <rect x="226" y="0" width="5" height="40"></rect>
                    <rect x="234" y="0" width="2" height="40"></rect>
                    <rect x="238" y="0" width="2" height="40"></rect>
                  </svg>
                </div>
                <div className="flex items-center gap-1.5 text-[#434655] text-[11px] font-medium">
                  <span className="material-symbols-outlined text-[15px] text-[#006c49]">
                    qr_code_scanner
                  </span>
                  <span>SCAN AT ENTRANCE • DESK VALIDATED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={onDownloadPass}
              className="w-full h-11 bg-[#004ac6] text-[#ffffff] rounded-xl font-headline text-[13px] font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#003ea8] active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Official Hall Ticket (PDF)</span>
            </button>
            <button
              onClick={onFileCondonation}
              className="w-full h-11 bg-[#dee8ff] text-[#00174b] rounded-xl font-headline text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#d8e3fb] active:scale-[0.99] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">rule_folder</span>
              <span>File Condonation / Waiver Request</span>
            </button>
          </div>

          {/* Course Clearance Breakdown */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-[15px] font-bold text-[#111c2d]">
                Course Clearance Breakdown
              </h2>
              <span className="text-[11px] text-[#434655]">Min. 75% Per Module</span>
            </div>

            <div className="space-y-2">
              {/* CS301 */}
              <div className="rounded-xl bg-[#ffffff] p-3 shadow-xs border border-[#e7eeff] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e7eeff] flex items-center justify-center text-[#004ac6] font-headline text-[15px] font-bold">
                    88%
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                        Database Systems
                      </span>
                      <span className="text-[10px] text-[#434655]">CS301</span>
                    </div>
                    <span className="text-[11px] text-[#434655]">44 / 50 Sessions Attended</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Eligible
                </span>
              </div>

              {/* CS304 (Blocked / Critical) */}
              <div className="rounded-2xl bg-[#ffdad6]/20 p-3 shadow-xs border border-[#ffdad6] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ffdad6] text-[#93000a] flex items-center justify-center font-headline text-[15px] font-bold">
                      73%
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                          Operating Systems
                        </span>
                        <span className="text-[10px] text-[#434655]">CS304</span>
                      </div>
                      <span className="text-[11px] text-[#ba1a1a] font-bold">
                        Shortfall: 73.1% (Requires 75%)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Blocked
                  </span>
                </div>

                <div className="rounded-xl bg-[#ffffff] p-3 space-y-2 border border-[#dee8ff]">
                  <div className="flex items-start gap-2 text-[12px] text-[#111c2d]">
                    <span className="material-symbols-outlined text-[16px] text-[#ba1a1a] shrink-0 mt-0.5">
                      priority_high
                    </span>
                    <p>
                      <strong>Action Required:</strong> Attend next 2 lectures before Nov 12, or
                      submit verified Medical / On-Duty slip by Nov 10.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={onFileCondonation}
                      className="flex-1 py-1.5 px-2 bg-[#ba1a1a] text-[#ffffff] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">post_add</span>
                      Submit Condonation
                    </button>
                    <button
                      onClick={() => onShowToast('Forwarded to Leave & OD Portal')}
                      className="flex-1 py-1.5 px-2 bg-[#dee8ff] text-[#00174b] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        assignment_turned_in
                      </span>
                      Apply OD Credit
                    </button>
                  </div>
                </div>
              </div>

              {/* CS308 */}
              <div className="rounded-xl bg-[#ffffff] p-3 shadow-xs border border-[#e7eeff] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e7eeff] flex items-center justify-center text-[#004ac6] font-headline text-[15px] font-bold">
                    91%
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                        Computer Networks
                      </span>
                      <span className="text-[10px] text-[#434655]">CS308</span>
                    </div>
                    <span className="text-[11px] text-[#434655]">42 / 46 Sessions Attended</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Eligible
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AR Camera Simulated Modal */}
      {showArModal && (
        <div
          className="fixed inset-0 z-50 bg-[#111c2d]/80 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowArModal(false)}
        >
          <div
            className="w-full max-w-sm bg-[#263143] text-white rounded-3xl p-5 shadow-2xl relative flex flex-col items-center text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-[#004ac6] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[28px]">view_in_ar</span>
            </div>
            <div>
              <h3 className="font-headline text-[18px] font-bold">AR Indoor Floor Guidance</h3>
              <p className="text-[12px] text-[#dee8ff] mt-1 leading-snug">
                Camera calibrated with Ramanujan Block Beacon BLDG-4-L2-B02. Follow glowing arrows
                to Row 4, Desk 42.
              </p>
            </div>

            <div className="w-full h-44 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-[48px] text-[#6cf8bb] animate-bounce">
                <span className="material-symbols-outlined text-[56px]">arrow_upward</span>
              </div>
              <span className="text-[12px] font-bold text-white bg-black/60 px-3 py-1 rounded-full mt-2">
                Straight 12m → Turn Left to Hall B Door 1
              </span>
            </div>

            <button
              onClick={() => setShowArModal(false)}
              className="w-full py-2.5 bg-[#004ac6] text-white rounded-xl text-[13px] font-bold"
            >
              Exit AR Guidance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
