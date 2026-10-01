import React, { useState } from 'react';
import { StudentProfile, Course, TabType } from '../types/campus';

interface DashboardViewProps {
  student: StudentProfile;
  courses: Course[];
  onNavigateTab: (tab: TabType) => void;
  onSelectCourseForAnalytics: (courseId: string) => void;
  onShowToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  courses,
  onNavigateTab,
  onSelectCourseForAnalytics,
  onShowToast,
}) => {
  const [liveMarked, setLiveMarked] = useState(false);

  const handleSelfMark = () => {
    setLiveMarked(true);
    onShowToast('✓ Operating Systems attendance marked! Verified via Campus Wi-Fi.');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 space-y-4 pt-1 pb-6">
      {/* Student Identification Header */}
      <section className="flex items-center justify-between pt-1">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-headline text-[20px] font-bold text-[#111c2d] truncate">
              Hi, {student.name}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-semibold tracking-wide shadow-xs">
              {student.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-[#434655] text-[12px] font-body">
            <span>{student.semester} • {student.program}</span>
            <span className="w-1 h-1 rounded-full bg-[#c3c6d7]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737686]">
              {student.id}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-full bg-[#dee8ff] flex items-center justify-center text-[#004ac6] shadow-xs shrink-0">
          <span className="material-symbols-outlined text-[24px]">school</span>
        </div>
      </section>

      {/* Overall Attendance Hero Card */}
      <section className="w-full rounded-2xl bg-[#ffffff] p-4 shadow-sm border border-[#e7eeff] relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          {/* Circular Progress Meter */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 112 112">
              {/* Background track */}
              <circle
                className="text-[#e7eeff]"
                cx="56"
                cy="56"
                fill="transparent"
                r="46"
                stroke="currentColor"
                strokeWidth="9"
              />
              {/* Foreground stroke mapped to 84.2% */}
              <circle
                className="text-[#004ac6] transition-all duration-1000 ease-out"
                cx="56"
                cy="56"
                fill="transparent"
                r="46"
                stroke="currentColor"
                strokeDasharray="289"
                strokeDashoffset="45.6"
                strokeLinecap="round"
                strokeWidth="9"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-headline text-[22px] text-[#111c2d] leading-none font-bold">
                {student.aggregatedAttendance}%
              </span>
              <span className="font-body text-[10px] text-[#434655] uppercase tracking-wider font-semibold mt-1">
                Aggregated
              </span>
            </div>
          </div>

          {/* Stats & Status Details */}
          <div className="flex flex-col min-w-0 flex-1 justify-center space-y-1.5">
            <div className="inline-flex items-center self-start gap-1 px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-semibold">
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span>Safe Zone (&gt;75%)</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[18px] text-[#111c2d] font-bold tracking-tight">
                {student.attendedHours} / {student.totalHours}
              </span>
              <span className="font-body text-[12px] text-[#434655]">Class hours logged</span>
            </div>
            <p className="font-body text-[12px] text-[#006c49] font-medium leading-snug">
              You can comfortably miss up to{' '}
              <span className="font-bold">{student.safeBunkTotal}</span> lectures.
            </p>
          </div>
        </div>

        {/* Micro Progress Indicator / Bar Breakdown */}
        <div className="mt-3 pt-1 border-t border-[#f0f3ff]">
          <div className="w-full bg-[#e7eeff] h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-[#006c49] h-full rounded-full transition-all duration-700"
              style={{ width: `${student.aggregatedAttendance}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-[#434655] text-[11px] font-medium">
            <span>Min benchmark: 75%</span>
            <span>Goal: 85%</span>
          </div>
        </div>
      </section>

      {/* Quick Action Pills */}
      <section className="w-full">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          <button
            onClick={() => onNavigateTab('check-in')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#004ac6] text-[#ffffff] font-headline text-[12px] font-semibold shadow-sm whitespace-nowrap active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>Scan QR</span>
          </button>
          <button
            onClick={() => onNavigateTab('leave-od')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#dee8ff] text-[#00174b] font-headline text-[12px] font-semibold whitespace-nowrap active:scale-95 transition-transform shrink-0 hover:bg-[#d8e3fb]"
          >
            <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
            <span>Apply Leave / OD</span>
          </button>
          <button
            onClick={() => {
              onSelectCourseForAnalytics('cs304');
              onNavigateTab('analytics');
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#e7eeff] text-[#434655] font-headline text-[12px] font-semibold whitespace-nowrap active:scale-95 transition-transform shrink-0 hover:bg-[#dee8ff]"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Margin Calc</span>
          </button>
          <button
            onClick={() => onNavigateTab('schedule')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#e7eeff] text-[#434655] font-headline text-[12px] font-semibold whitespace-nowrap active:scale-95 transition-transform shrink-0 hover:bg-[#dee8ff]"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
            <span>Full Timetable</span>
          </button>
        </div>
      </section>

      {/* Today's Lecture Schedule */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <span className="font-headline text-[17px] font-bold text-[#111c2d]">
              Today's Schedule
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#dee8ff] text-[#004ac6] font-semibold">
              4 Sessions
            </span>
          </div>
          <span className="text-[11px] text-[#434655] font-semibold">Thursday</span>
        </div>

        <div className="flex flex-col space-y-2">
          {/* 01: Past Lecture (Present) */}
          <div className="w-full bg-[#ffffff] rounded-xl p-3.5 flex items-center justify-between shadow-xs border border-[#e7eeff]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#e7eeff] flex flex-col items-center justify-center shrink-0 text-[#434655]">
                <span className="text-[11px] font-bold leading-none">09:00</span>
                <span className="text-[9px] leading-tight opacity-75">AM</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-[13px] font-semibold text-[#111c2d] truncate">
                    Database Systems
                  </span>
                  <span className="text-[11px] text-[#434655]">CS301</span>
                </div>
                <span className="text-[12px] text-[#434655] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">meeting_room</span> Hall
                  204
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-semibold shrink-0">
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>Present</span>
            </div>
          </div>

          {/* 02: Active Live Lecture (Live Now) */}
          <div className="w-full bg-[#ffffff] rounded-xl p-3.5 flex flex-col space-y-2.5 shadow-sm border-2 border-[#2563eb]/40 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#2563eb] text-[#ffffff] flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-[11px] font-bold leading-none">10:15</span>
                  <span className="text-[9px] leading-tight opacity-90">AM</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline text-[13px] font-semibold text-[#111c2d] truncate">
                      Operating Systems
                    </span>
                    <span className="text-[11px] text-[#434655]">CS304</span>
                  </div>
                  <span className="text-[12px] text-[#434655] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">science</span> Lab 3
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#004ac6] text-[#ffffff] text-[11px] font-bold shadow-xs shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffffff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffffff]"></span>
                </span>
                <span>Live Now</span>
              </div>
            </div>

            {/* Inline quick action inside active session card */}
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f3ff]">
              <span className="text-[11px] text-[#004ac6] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">sensors</span>
                Check-in Open (Radius: Campus Wi-Fi)
              </span>
              {liveMarked ? (
                <span className="px-3 py-1 rounded-lg bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check</span> Marked
                </span>
              ) : (
                <button
                  onClick={handleSelfMark}
                  className="px-3 py-1.5 rounded-lg bg-[#004ac6] text-[#ffffff] text-[11px] font-bold active:scale-95 transition-transform shadow-xs hover:bg-[#003ea8]"
                >
                  Self Mark
                </button>
              )}
            </div>
          </div>

          {/* 03: Upcoming Lecture 1 */}
          <div className="w-full bg-[#ffffff] rounded-xl p-3.5 flex items-center justify-between shadow-xs border border-[#e7eeff] opacity-90">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#e7eeff] flex flex-col items-center justify-center shrink-0 text-[#434655]">
                <span className="text-[11px] font-bold leading-none">11:30</span>
                <span className="text-[9px] leading-tight opacity-75">AM</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-[13px] font-semibold text-[#111c2d] truncate">
                    Computer Networks
                  </span>
                  <span className="text-[11px] text-[#434655]">CS308</span>
                </div>
                <span className="text-[12px] text-[#434655] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">meeting_room</span> Room
                  102
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#434655] text-[11px] font-semibold shrink-0">
              Upcoming
            </span>
          </div>

          {/* 04: Upcoming Lecture 2 */}
          <div className="w-full bg-[#ffffff] rounded-xl p-3.5 flex items-center justify-between shadow-xs border border-[#e7eeff] opacity-90">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#e7eeff] flex flex-col items-center justify-center shrink-0 text-[#434655]">
                <span className="text-[11px] font-bold leading-none">02:00</span>
                <span className="text-[9px] leading-tight opacity-75">PM</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-[13px] font-semibold text-[#111c2d] truncate">
                    Discrete Mathematics
                  </span>
                  <span className="text-[11px] text-[#434655]">MA202</span>
                </div>
                <span className="text-[12px] text-[#434655] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">domain</span> Block B •
                  R301
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#434655] text-[11px] font-semibold shrink-0">
              Upcoming
            </span>
          </div>
        </div>
      </section>

      {/* Subject-wise Attendance Breakdown */}
      <section className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <span className="font-headline text-[17px] font-bold text-[#111c2d]">
            Subject Margins
          </span>
          <button
            onClick={() => onNavigateTab('analytics')}
            className="text-[12px] text-[#004ac6] font-semibold flex items-center gap-0.5 hover:underline"
          >
            Detailed View{' '}
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="space-y-2">
          {/* Course 1: Database Systems */}
          <div
            onClick={() => {
              onSelectCourseForAnalytics('cs301');
              onNavigateTab('analytics');
            }}
            className="w-full bg-[#ffffff] rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col space-y-2 hover:border-[#004ac6]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-headline text-[14px] font-semibold text-[#111c2d]">
                  Database Systems
                </span>
                <span className="text-[12px] text-[#434655]">Prof. K. Sharma • 22/25 Attended</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-[18px] text-[#111c2d] font-bold">88%</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-semibold">
                  Safe
                </span>
              </div>
            </div>
            <div className="w-full bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '88%' }} />
            </div>
            <div className="flex items-center justify-between text-[#434655] text-[11px] pt-0.5">
              <span className="text-[#006c49] font-medium">Bunk allowance: 3 classes safely</span>
              <span>Target 75%</span>
            </div>
          </div>

          {/* Course 2: Operating Systems (Warning Defaulter Risk) */}
          <div
            onClick={() => {
              onSelectCourseForAnalytics('cs304');
              onNavigateTab('analytics');
            }}
            className="w-full bg-[#ffffff] rounded-2xl p-4 shadow-xs border border-[#ffdad6] flex flex-col space-y-2 hover:border-[#ba1a1a]/40 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-[14px] font-semibold text-[#111c2d]">
                    Operating Systems
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">
                    warning
                  </span>
                </div>
                <span className="text-[12px] text-[#434655]">
                  Dr. Aris Vance • 19/26 Attended
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-[18px] text-[#ba1a1a] font-bold">73%</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold">
                  Critical
                </span>
              </div>
            </div>
            <div className="w-full bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '73%' }} />
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[11px] text-[#ba1a1a] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">priority_high</span> Need 2
                consecutive classes for 75%
              </span>
              <span className="text-[11px] text-[#434655]">-2% short</span>
            </div>
          </div>

          {/* Course 3: Computer Networks */}
          <div
            onClick={() => {
              onSelectCourseForAnalytics('cs308');
              onNavigateTab('analytics');
            }}
            className="w-full bg-[#ffffff] rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col space-y-2 hover:border-[#004ac6]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-headline text-[14px] font-semibold text-[#111c2d]">
                  Computer Networks
                </span>
                <span className="text-[12px] text-[#434655]">
                  Prof. Elena Rostova • 20/22 Attended
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-[18px] text-[#111c2d] font-bold">91%</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-semibold">
                  Safe
                </span>
              </div>
            </div>
            <div className="w-full bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '91%' }} />
            </div>
            <div className="flex items-center justify-between text-[#434655] text-[11px] pt-0.5">
              <span className="text-[#006c49] font-medium">Bunk allowance: 4 classes safely</span>
              <span>Target 75%</span>
            </div>
          </div>

          {/* Course 4: Discrete Mathematics */}
          <div
            onClick={() => {
              onSelectCourseForAnalytics('ma202');
              onNavigateTab('analytics');
            }}
            className="w-full bg-[#ffffff] rounded-2xl p-4 shadow-xs border border-[#e7eeff] flex flex-col space-y-2 hover:border-[#004ac6]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-headline text-[14px] font-semibold text-[#111c2d]">
                  Discrete Mathematics
                </span>
                <span className="text-[12px] text-[#434655]">
                  Dr. M. Sundaram • 17/21 Attended
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-[18px] text-[#111c2d] font-bold">81%</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-semibold">
                  Safe
                </span>
              </div>
            </div>
            <div className="w-full bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '81%' }} />
            </div>
            <div className="flex items-center justify-between text-[#434655] text-[11px] pt-0.5">
              <span className="text-[#006c49] font-medium">Bunk allowance: 1 class safely</span>
              <span>Target 75%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Academic Delight Card / Motivational Tip */}
      <section
        onClick={() => onNavigateTab('hall-map')}
        className="w-full rounded-2xl bg-[#dee8ff] p-4 flex items-center justify-between gap-3 shadow-xs border border-[#d8e3fb] cursor-pointer hover:bg-[#d8e3fb] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#004ac6] text-[#ffffff] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-[13px] font-bold text-[#00174b] truncate">
              Pro Attendance Tip
            </span>
            <span className="font-body text-[12px] text-[#434655] leading-snug">
              Attending next 2 Operating Systems lectures eliminates your exam hall-ticket block
              warning.
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#004ac6] text-[20px] shrink-0">
          chevron_right
        </span>
      </section>
    </div>
  );
};
