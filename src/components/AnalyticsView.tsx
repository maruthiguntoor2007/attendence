import React, { useState } from 'react';
import { Course, HeatmapDay } from '../types/campus';
import { OCTOBER_HEATMAP, CLASS_AUDIT_LOGS } from '../data/mockData';

interface AnalyticsViewProps {
  courses: Course[];
  selectedCourseId: string;
  onSelectCourse: (id: string) => void;
  onExportSlip: () => void;
  onDisputeClass: (lectureId: string) => void;
  onShowToast: (msg: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  onExportSlip,
  onDisputeClass,
  onShowToast,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'theory' | 'labs' | 'low'>('all');
  const [targetRequirement, setTargetRequirement] = useState<number>(75);
  const [selectedDay, setSelectedDay] = useState<HeatmapDay | null>(null);
  const [showCourseInfo, setShowCourseInfo] = useState(false);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Dynamic simulation calculations
  const attended = currentCourse.attended;
  const total = currentCourse.total;

  const calculateForecast = (targetPercent: number) => {
    const p = targetPercent / 100;
    let needClasses = Math.ceil((p * total - attended) / (1 - p));
    if (needClasses < 0) needClasses = 0;

    let safeBunks = Math.floor((attended - p * total) / p);
    if (safeBunks < 0) safeBunks = 0;

    const projectedCross =
      needClasses > 0
        ? (((attended + needClasses) / (total + needClasses)) * 100).toFixed(1)
        : ((attended / total) * 100).toFixed(1);

    const nextMissPercent = ((attended / (total + 1)) * 100).toFixed(1);

    return { needClasses, safeBunks, projectedCross, nextMissPercent };
  };

  const { needClasses, safeBunks, projectedCross, nextMissPercent } =
    calculateForecast(targetRequirement);

  // SVG Gauge calculations
  // circumference for r=26 is 2 * PI * 26 = 163.36
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (currentCourse.percentage / 100) * circumference;

  const filteredCourses = courses.filter((c) => {
    if (activeFilter === 'theory') return c.type === 'Theory';
    if (activeFilter === 'labs') return c.type === 'Practical/Labs';
    if (activeFilter === 'low') return c.percentage < 75;
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 space-y-4">
      {/* Filter Tabs Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 -mx-4 px-4 no-scrollbar">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all whitespace-nowrap active:scale-95 ${
            activeFilter === 'all'
              ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
              : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
          }`}
        >
          All Subjects ({courses.length})
        </button>
        <button
          onClick={() => setActiveFilter('theory')}
          className={`px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all whitespace-nowrap active:scale-95 ${
            activeFilter === 'theory'
              ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
              : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
          }`}
        >
          Theory
        </button>
        <button
          onClick={() => setActiveFilter('labs')}
          className={`px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all whitespace-nowrap active:scale-95 ${
            activeFilter === 'labs'
              ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
              : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
          }`}
        >
          Practical/Labs
        </button>
        <button
          onClick={() => setActiveFilter('low')}
          className={`px-4 py-2 rounded-full font-headline text-[12px] font-semibold transition-all whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${
            activeFilter === 'low'
              ? 'bg-[#ba1a1a] text-[#ffffff] shadow-xs'
              : 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
          Low Attendance (1)
        </button>
      </div>

      {/* Course Switcher Pills if multiple filtered */}
      {filteredCourses.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filteredCourses.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCourse(c.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                c.id === currentCourse.id
                  ? 'bg-[#dee8ff] text-[#00174b] border-[#004ac6]/40 font-bold'
                  : 'bg-[#ffffff] text-[#434655] border-[#dee8ff] hover:bg-[#f0f3ff]'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      )}

      {/* Main Course Hero Card */}
      <div className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#e7eeff] relative overflow-hidden">
        {currentCourse.percentage < 75 && (
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#ffdad6]/40 rounded-full blur-2xl pointer-events-none"></div>
        )}

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-headline text-[11px] text-[#004ac6] font-bold uppercase tracking-wider">
                {currentCourse.type} Module
              </span>
              <span className="text-[#434655] text-[11px]">•</span>
              <span className="text-[11px] text-[#434655]">{currentCourse.credits} Credits</span>
            </div>
            <h2 className="font-headline text-[18px] font-bold text-[#111c2d] tracking-tight truncate">
              {currentCourse.code} {currentCourse.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {currentCourse.instructorPhoto ? (
                <img
                  className="w-6 h-6 rounded-full object-cover shadow-xs ring-1 ring-[#dee8ff]"
                  src={currentCourse.instructorPhoto}
                  alt={currentCourse.instructor}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#dee8ff] text-[#004ac6] flex items-center justify-center text-[10px] font-bold">
                  {currentCourse.instructor[0]}
                </div>
              )}
              <p className="font-body text-[12px] text-[#434655]">{currentCourse.instructor}</p>
            </div>
          </div>

          <button
            onClick={() => setShowCourseInfo(true)}
            aria-label="Course syllabus and info"
            className="w-9 h-9 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#434655] hover:text-[#111c2d] hover:bg-[#dee8ff] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">info</span>
          </button>
        </div>

        {/* Gauge Metric Card */}
        <div className="mt-5 p-4 rounded-xl bg-[#f0f3ff] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  fill="transparent"
                  r={radius}
                  stroke="#dee8ff"
                  strokeWidth="6"
                />
                <circle
                  className="transition-all duration-700 ease-out"
                  cx="32"
                  cy="32"
                  fill="transparent"
                  r={radius}
                  stroke={currentCourse.percentage < 75 ? '#ba1a1a' : '#006c49'}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="6"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`font-headline text-[15px] font-bold leading-none ${
                    currentCourse.percentage < 75 ? 'text-[#ba1a1a]' : 'text-[#006c49]'
                  }`}
                >
                  {currentCourse.percentage}%
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-[18px] text-[#111c2d] font-bold">
                  {currentCourse.attended}
                </span>
                <span className="font-body text-[12px] text-[#434655]">
                  / {currentCourse.total} classes
                </span>
              </div>
              <p className="text-[11px] text-[#434655] mt-0.5">
                {currentCourse.total - currentCourse.attended} missed lectures total
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            {currentCourse.percentage < 75 ? (
              <>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold tracking-tight shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">warning</span>
                  Defaulter Risk
                </span>
                <span className="text-[11px] text-[#ba1a1a] mt-1.5 font-semibold">
                  Below 75% Criteria
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold tracking-tight shadow-xs">
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  Eligible
                </span>
                <span className="text-[11px] text-[#006c49] mt-1.5 font-semibold">
                  Above Benchmark
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Predictor & Safe-Bunk Simulator */}
      <div className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#e7eeff] flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e7eeff] flex items-center justify-center text-[#004ac6]">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </div>
            <div>
              <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                Predictor &amp; Safe-Bunk
              </h3>
              <p className="font-body text-[11px] text-[#434655]">
                Real-time dynamic recovery simulator
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#004ac6] text-[11px] font-semibold">
            Active Model
          </span>
        </div>

        {/* Range Slider Block */}
        <div className="mt-4 p-4 rounded-xl bg-[#f0f3ff] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label
              htmlFor="threshold-slider"
              className="text-[13px] font-medium text-[#434655]"
            >
              Target Requirement
            </label>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2563eb] text-[#ffffff] font-headline text-[16px] font-bold shadow-xs">
              {targetRequirement}%
            </span>
          </div>
          <input
            id="threshold-slider"
            type="range"
            min={65}
            max={85}
            step={1}
            value={targetRequirement}
            onChange={(e) => setTargetRequirement(parseInt(e.target.value, 10))}
            className="w-full accent-[#004ac6] h-2 bg-[#e7eeff] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#434655] px-0.5">
            <span>65% (Condonation)</span>
            <span className="font-bold text-[#004ac6]">75% (Mandatory)</span>
            <span>85% (Scholarship)</span>
          </div>
        </div>

        {/* Dynamic Simulation Output Cards */}
        <div className="mt-3 grid grid-cols-1 gap-2.5">
          <div className="p-3.5 rounded-xl bg-[#dee8ff]/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563eb] text-[#ffffff] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-headline font-semibold text-[#111c2d] block">
                Prescription to Recover
              </span>
              <p className="font-body text-[12px] text-[#434655] mt-0.5 leading-snug">
                {needClasses > 0 ? (
                  <>
                    Must attend next{' '}
                    <strong className="text-[#004ac6] font-bold">
                      {needClasses} consecutive classes
                    </strong>{' '}
                    without missing to cross{' '}
                    <strong className="text-[#111c2d]">{projectedCross}%</strong>.
                  </>
                ) : (
                  <>
                    You are currently above this goal. Maintain your attendance to keep this safe
                    cushion!
                  </>
                )}
              </p>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl flex items-start gap-3 ${
              safeBunks > 0 ? 'bg-[#6cf8bb]/20' : 'bg-[#ffdad6]/50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs text-[#ffffff] ${
                safeBunks > 0 ? 'bg-[#006c49]' : 'bg-[#ba1a1a]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {safeBunks > 0 ? 'beach_access' : 'block'}
              </span>
            </div>
            <div className="min-w-0">
              <span
                className={`text-[13px] font-headline font-semibold block ${
                  safeBunks > 0 ? 'text-[#006c49]' : 'text-[#93000a]'
                }`}
              >
                Bunk Margin Safety
              </span>
              <p className="font-body text-[12px] text-[#434655] mt-0.5 leading-snug">
                {safeBunks > 0 ? (
                  <>
                    <strong className="text-[#006c49] font-bold">
                      {safeBunks} safe bunks available
                    </strong>{' '}
                    before dropping beneath {targetRequirement}%.
                  </>
                ) : (
                  <>
                    <strong className="text-[#ba1a1a] font-bold">
                      0 safe bunks available right now.
                    </strong>{' '}
                    Any further absence pushes standing down to {nextMissPercent}%.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* October 2024 Heatmap */}
      <div className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#e7eeff] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">October 2024</h3>
            <p className="font-body text-[11px] text-[#434655]">
              Class engagement monthly heat map
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#f0f3ff] rounded-lg p-1">
            <button
              onClick={() => onShowToast('Showing September 2024 records')}
              aria-label="Previous month"
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#ffffff] text-[#434655] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="text-[12px] font-bold px-1 text-[#111c2d]">Oct</span>
            <button
              onClick={() => onShowToast('Showing November 2024 schedule')}
              aria-label="Next month"
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#ffffff] text-[#434655] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-bold text-[#434655] mb-2">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span className="text-[#c3c6d7]">S</span>
          <span className="text-[#c3c6d7]">S</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-[12px]">
          {OCTOBER_HEATMAP.map((item, idx) => {
            const isClickable = item.status !== 'none';
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isClickable) {
                    setSelectedDay(item);
                  }
                }}
                disabled={!isClickable}
                className={`h-9 flex flex-col items-center justify-center rounded-lg transition-transform ${
                  item.dayNumber === 30 && idx === 0 ? 'text-[#c3c6d7]' : ''
                } ${
                  isClickable
                    ? 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#dee8ff] active:scale-95 cursor-pointer'
                    : 'text-[#434655]/60'
                } ${item.isToday ? 'ring-2 ring-[#004ac6]/60 font-bold' : ''}`}
              >
                <span className={item.isToday ? 'text-[#004ac6] font-bold' : ''}>
                  {item.dayNumber}
                </span>
                {item.status === 'present' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] mt-0.5"></span>
                )}
                {item.status === 'absent' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] mt-0.5"></span>
                )}
                {item.status === 'od' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] mt-0.5"></span>
                )}
                {item.status === 'holiday' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 bg-[#f0f3ff]/70 p-2.5 rounded-lg text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span className="text-[#434655]">Present</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span className="text-[#434655]">Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span>
            <span className="text-[#434655]">OD Approved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span className="text-[#434655]">Holiday</span>
          </div>
        </div>
      </div>

      {/* Detailed Class Log */}
      <div className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#e7eeff] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">Detailed Class Log</h3>
            <p className="font-body text-[11px] text-[#434655]">
              Recent lecture records &amp; audit status
            </p>
          </div>
          <span className="text-[11px] text-[#004ac6] font-bold">Latest 4</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {CLASS_AUDIT_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-[#f0f3ff] flex items-center justify-between hover:bg-[#e7eeff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    log.status === 'Absent'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : log.status === 'Present'
                      ? 'bg-[#6cf8bb] text-[#00714d]'
                      : 'bg-[#ffddb8] text-[#2a1700]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {log.status === 'Absent'
                      ? 'close'
                      : log.status === 'Present'
                      ? 'check'
                      : 'badge'}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-[13px] font-semibold text-[#111c2d]">
                      {log.status}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#e7eeff] text-[10px] text-[#434655] font-semibold">
                      {log.lectureNumber}
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-[#434655] truncate mt-0.5">
                    {log.dateStr} • {log.verificationMethod}
                  </p>
                </div>
              </div>

              {log.status === 'Absent' ? (
                <button
                  onClick={() => onDisputeClass(log.lectureNumber)}
                  className="px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#004ac6] text-[11px] font-semibold hover:bg-[#dee8ff] active:scale-95 transition-all shrink-0 shadow-xs"
                >
                  Dispute
                </button>
              ) : log.status === 'Present' ? (
                <span
                  className="material-symbols-outlined text-[#006c49] text-[20px] shrink-0"
                  title="Biometric / QR Cryptographic Proof"
                >
                  verified_user
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-[#ffb95f]/30 text-[#784b00] text-[10px] font-bold shrink-0">
                  Credited
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Action Strip */}
      <div className="flex flex-col gap-2.5 pt-1">
        <button
          onClick={onExportSlip}
          className="w-full h-12 rounded-xl bg-[#004ac6] text-[#ffffff] font-headline text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,74,198,0.28)] hover:bg-[#003ea8] active:scale-[0.99] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          <span>Export Attendance Slip (PDF)</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[#434655] text-[11px]">
          <span className="material-symbols-outlined text-[15px]">lock</span>
          <span>Officially signed by Registrar Academic Portal</span>
        </div>
      </div>

      {/* Day Detail Bottom Sheet / Modal */}
      {selectedDay && (
        <div
          className="fixed inset-0 z-50 bg-[#111c2d]/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="w-full max-w-sm bg-[#ffffff] rounded-2xl p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e7eeff] pb-2">
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-[16px] text-[#111c2d]">
                  Oct {selectedDay.dayNumber}, 2024
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-[#e7eeff] text-[#004ac6]">
                  {selectedDay.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f0f3ff] flex items-center justify-center text-[#434655]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-1.5 text-[12px] text-[#434655]">
              <p>
                <strong>Course:</strong> {currentCourse.code} - {currentCourse.name}
              </p>
              <p>
                <strong>Faculty:</strong> {currentCourse.instructor}
              </p>
              <p>
                <strong>Session Time:</strong> 10:15 AM - 11:15 AM
              </p>
              {selectedDay.label && (
                <p>
                  <strong>Note:</strong> {selectedDay.label}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="w-full py-2 bg-[#004ac6] text-[#ffffff] rounded-lg text-[12px] font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Course Info Modal */}
      {showCourseInfo && (
        <div
          className="fixed inset-0 z-50 bg-[#111c2d]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowCourseInfo(false)}
        >
          <div
            className="w-full max-w-md bg-[#ffffff] rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e7eeff] pb-2">
              <h3 className="font-headline text-[16px] font-bold text-[#111c2d]">
                {currentCourse.code} Syllabus &amp; Policies
              </h3>
              <button
                onClick={() => setShowCourseInfo(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f0f3ff] flex items-center justify-center text-[#434655]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-[12px] text-[#434655]">
              <p>
                <strong>Instructor:</strong> {currentCourse.instructor} (
                {currentCourse.instructorTitle})
              </p>
              <p>
                <strong>Total Lectures Planned:</strong> 42 Lectures + 6 Midterms/Quizzes
              </p>
              <p>
                <strong>Mandatory Minimum:</strong> 75% for regular examination hall ticket
                generation.
              </p>
              <p>
                <strong>Condonation Window:</strong> 65% - 74.9% subject to verified medical
                documents and HOD discretion.
              </p>
            </div>
            <button
              onClick={() => setShowCourseInfo(false)}
              className="w-full py-2 bg-[#004ac6] text-[#ffffff] rounded-lg text-[13px] font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
