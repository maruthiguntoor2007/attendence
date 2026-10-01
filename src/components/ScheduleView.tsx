import React, { useState } from 'react';
import { TabType } from '../types/campus';

interface ScheduleViewProps {
  onNavigateTab: (tab: TabType) => void;
  onShowToast: (msg: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onNavigateTab, onShowToast }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Thu 07 (Today)
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'lectures' | 'labs' | 'seminars'>('all');
  const [liveCheckedIn, setLiveCheckedIn] = useState(false);

  const days = [
    { day: 'Mon', date: '04', dots: ['bg-[#c3c6d7]', 'bg-[#c3c6d7]'] },
    { day: 'Tue', date: '05', dots: ['bg-[#c3c6d7]', 'bg-[#c3c6d7]', 'bg-[#c3c6d7]'] },
    { day: 'Wed', date: '06', dots: ['bg-[#c3c6d7]', 'bg-[#006c49]'] },
    { day: 'Thu', date: '07', isToday: true, dots: ['bg-[#dbe1ff]', 'bg-[#6ffbbe]', 'bg-[#dbe1ff]', 'bg-[#dbe1ff]'] },
    { day: 'Fri', date: '08', dots: ['bg-[#784b00]', 'bg-[#c3c6d7]'] },
    { day: 'Sat', date: '09', dots: ['bg-[#c3c6d7]'] },
  ];

  const handleLiveCheckIn = () => {
    setLiveCheckedIn(true);
    onShowToast('✓ Operating Systems attendance verified via Room Lab-3 Beacon!');
  };

  const handleSyncCalendar = () => {
    onShowToast('✓ Semester VI schedule synced with your Google Calendar!');
  };

  const handleDownloadPdf = () => {
    onShowToast('✓ Generated Weekly Academic Timetable (PDF)');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 space-y-4">
      {/* Top Context & Term Navigation */}
      <section className="flex flex-col gap-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#004ac6] font-bold">
              Semester VI • CS &amp; Eng
            </span>
            <div className="flex items-center gap-x-1.5 mt-0.5">
              <h1 className="font-headline text-[19px] font-bold text-[#111c2d]">Term Week 14</h1>
              <span className="text-[#c3c6d7] font-bold">•</span>
              <span className="text-[13px] text-[#434655]">Nov 04 – Nov 09</span>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Academic Term Calendar: Weeks 1 - 18')}
            aria-label="Change Week"
            className="w-10 h-10 rounded-full bg-[#f0f3ff] text-[#004ac6] flex items-center justify-center hover:bg-[#dee8ff] active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </button>
        </div>

        {/* View Switcher: Weekly Timetable vs Exam Hall Pass */}
        <div className="flex bg-[#e7eeff] p-1 rounded-xl">
          <button
            className="flex-1 py-1.5 rounded-lg text-[12px] font-bold bg-[#004ac6] text-[#ffffff] shadow-xs flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Weekly Timetable</span>
          </button>
          <button
            onClick={() => onNavigateTab('hall-map')}
            className="flex-1 py-1.5 rounded-lg text-[12px] font-bold text-[#434655] hover:text-[#111c2d] flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>Hall Ticket &amp; Desks</span>
          </button>
        </div>

        {/* Quick Status & Filter Strip */}
        <div className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e7eeff] flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#dee8ff] flex items-center justify-center text-[#004ac6]">
                <span className="material-symbols-outlined text-[20px]">timelapse</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-[13px] font-semibold text-[#111c2d]">
                  Today's Academic Pace
                </span>
                <span className="font-body text-[11px] text-[#434655]">
                  1 Attended • 3 Remaining
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#dee8ff] text-[#004ac6] text-[11px] font-bold tracking-wide">
              1/4 Done
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-x-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setActiveTypeFilter('all')}
              className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTypeFilter === 'all'
                  ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
                  : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
              }`}
            >
              All Types (4)
            </button>
            <button
              onClick={() => setActiveTypeFilter('lectures')}
              className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTypeFilter === 'lectures'
                  ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
                  : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
              }`}
            >
              Lectures (3)
            </button>
            <button
              onClick={() => setActiveTypeFilter('labs')}
              className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTypeFilter === 'labs'
                  ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
                  : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
              }`}
            >
              Labs (1)
            </button>
            <button
              onClick={() => setActiveTypeFilter('seminars')}
              className={`px-3 py-1.5 rounded-full font-headline text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTypeFilter === 'seminars'
                  ? 'bg-[#004ac6] text-[#ffffff] shadow-xs'
                  : 'bg-[#f0f3ff] text-[#434655] hover:bg-[#e7eeff]'
              }`}
            >
              Seminars
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Day Carousel */}
      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[12px] font-bold text-[#434655]">Select Day</span>
          <span className="text-[11px] text-[#004ac6] font-semibold">Semester ends in 18 days</span>
        </div>
        <div className="grid grid-cols-6 gap-x-1.5">
          {days.map((d, index) => {
            const isSelected = selectedDayIndex === index;
            return (
              <button
                key={d.day}
                onClick={() => {
                  setSelectedDayIndex(index);
                  if (index !== 3) {
                    onShowToast(`Viewing ${d.day} Nov ${d.date} timetable`);
                  }
                }}
                className={`flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all shadow-xs relative ${
                  isSelected
                    ? 'bg-[#004ac6] text-[#ffffff] shadow-sm'
                    : 'bg-[#ffffff] text-[#434655] hover:bg-[#f0f3ff] border border-[#e7eeff]'
                }`}
              >
                {d.isToday && (
                  <span className="absolute -top-2 px-1.5 py-0.2 bg-[#6cf8bb] text-[#00714d] text-[9px] rounded-full font-bold shadow-xs">
                    TODAY
                  </span>
                )}
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-[#dbe1ff]' : 'text-[#434655]'
                  }`}
                >
                  {d.day}
                </span>
                <span className="font-headline text-[16px] font-bold mt-0.5 leading-none">
                  {d.date}
                </span>
                <div className="flex gap-x-0.5 mt-2">
                  {d.dots.map((dot, dotIdx) => (
                    <span key={dotIdx} className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tomorrow Notice / Reschedule Alert */}
      <section className="bg-[#f0f3ff] p-3.5 rounded-2xl flex items-start gap-x-3 shadow-sm border border-[#dee8ff]">
        <div className="w-8 h-8 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#2a1700] shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-headline text-[13px] font-bold text-[#111c2d]">
              Tomorrow's Schedule Shift
            </span>
            <span className="text-[11px] text-[#784b00] font-bold">Fri 08</span>
          </div>
          <p className="font-body text-[12px] text-[#434655] mt-0.5 leading-snug">
            Prof. Sarah Jenkins moved{' '}
            <span className="font-semibold text-[#111c2d]">Web Tech (CS309)</span> from 10:00 AM to{' '}
            <strong className="text-[#784b00]">02:00 PM (Lab 4)</strong>.
          </p>
        </div>
      </section>

      {/* Daily Schedule Timeline */}
      <section className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline text-[16px] font-bold text-[#111c2d]">Today's Timeline</h2>
          <span className="text-[11px] text-[#434655] font-semibold">4 Sessions (5 Hours)</span>
        </div>

        <div className="flex flex-col gap-y-3">
          {/* Item 1: Database Systems (Completed) */}
          <article className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e7eeff] flex flex-col gap-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-2">
                <span className="font-body text-[12px] font-bold text-[#434655]">
                  09:00 – 10:00 AM
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#434655] text-[10px] font-bold">
                  Lecture
                </span>
              </div>
              <span className="inline-flex items-center gap-x-1 px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Attended
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                Database Systems
              </h3>
              <span className="text-[11px] text-[#434655] mt-0.5">
                CS301 • Hall 204 • Prof. K. Sharma
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f3ff]">
              <div className="flex items-center gap-x-1.5 text-[#434655]">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span className="text-[11px]">Module 4: ACID Compliance &amp; Isolation Levels</span>
              </div>
              <span className="text-[11px] text-[#006c49] font-bold">92% Course Standing</span>
            </div>
          </article>

          {/* Item 2: Operating Systems (Active Now / Live Check-In / Critical) */}
          <article className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border-2 border-[#004ac6]/40 flex flex-col gap-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#004ac6]"></div>
            <div className="flex items-start justify-between pl-1">
              <div className="flex items-center gap-x-2">
                <span className="text-[12px] font-bold text-[#004ac6]">10:15 – 11:15 AM</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold flex items-center gap-x-1">
                  <span className="material-symbols-outlined text-[12px]">warning</span>
                  Clearance Critical (74.2%)
                </span>
              </div>
              <span className="inline-flex items-center gap-x-1 px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] text-[11px] font-bold animate-pulse">
                Happening Now
              </span>
            </div>

            <div className="flex flex-col pl-1">
              <div className="flex items-baseline justify-between">
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  Operating Systems
                </h3>
                <span className="text-[12px] font-bold text-[#004ac6]">Lab 3</span>
              </div>
              <span className="text-[11px] text-[#434655] mt-0.5">CS304 • Dr. Aris Vance</span>
            </div>

            <div className="flex items-center gap-x-2 pl-1 bg-[#f0f3ff] p-2 rounded-xl text-[12px]">
              <span className="material-symbols-outlined text-[18px] text-[#004ac6]">terminal</span>
              <span className="text-[#111c2d]">Kernel Locks, Semaphores &amp; Mutex Implementation</span>
            </div>

            {/* Beacon Status & Action */}
            <div className="flex items-center justify-between gap-x-2 pt-1 pl-1">
              <div className="flex items-center gap-x-1.5 text-[#006c49]">
                <span className="material-symbols-outlined text-[18px]">bluetooth_connected</span>
                <span className="text-[11px] font-semibold">Beacon: Room Lab-3 Locked</span>
              </div>

              {liveCheckedIn ? (
                <span className="px-3 py-1.5 bg-[#6cf8bb] text-[#00714d] rounded-lg text-[12px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">done_all</span> Checked In!
                </span>
              ) : (
                <button
                  onClick={handleLiveCheckIn}
                  className="px-3.5 py-2 bg-[#004ac6] text-[#ffffff] rounded-xl text-[12px] font-bold shadow-xs hover:bg-[#003ea8] active:scale-95 transition-all flex items-center gap-x-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  <span>Check-in Live</span>
                </button>
              )}
            </div>
          </article>

          {/* Item 3: Computer Networks (Upcoming) */}
          <article className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e7eeff] flex flex-col gap-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-2">
                <span className="text-[12px] font-bold text-[#111c2d]">11:30 AM – 12:30 PM</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#434655] text-[10px] font-bold">
                  Lecture
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#dee8ff] text-[#434655] text-[10px] font-semibold">
                Starts in 1h 15m
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline justify-between">
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  Computer Networks
                </h3>
                <span className="text-[12px] font-semibold text-[#434655]">Room 102</span>
              </div>
              <span className="text-[11px] text-[#434655] mt-0.5">
                CS308 • Prof. Elena Rostova
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f3ff]">
              <div className="flex items-center gap-x-1.5 text-[#434655]">
                <span className="material-symbols-outlined text-[16px]">hub</span>
                <span className="text-[11px]">
                  Transport Layer: Sliding Window &amp; TCP Congestion
                </span>
              </div>
              <span className="text-[11px] text-[#004ac6] font-semibold">Can miss 1 class</span>
            </div>
          </article>

          {/* Lunch Break Slot */}
          <div className="flex items-center justify-center py-1 gap-x-2 text-[#434655]">
            <span className="w-12 h-[1px] bg-[#d8e3fb]"></span>
            <span className="material-symbols-outlined text-[16px]">restaurant</span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#737686]">
              Lunch Break • 12:30 PM – 01:30 PM
            </span>
            <span className="w-12 h-[1px] bg-[#d8e3fb]"></span>
          </div>

          {/* Item 4: System Programming Lab (Upcoming 2hr Block) */}
          <article className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e7eeff] flex flex-col gap-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-2">
                <span className="text-[12px] font-bold text-[#111c2d]">01:30 – 03:30 PM</span>
                <span className="px-2 py-0.5 rounded-full bg-[#dee8ff] text-[#004ac6] text-[10px] font-bold">
                  2 Hr Lab Block
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#dee8ff] text-[#434655] text-[10px] font-semibold">
                Upcoming
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline justify-between">
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  System Programming Lab
                </h3>
                <span className="text-[12px] font-semibold text-[#434655]">HP Lab 1</span>
              </div>
              <span className="text-[11px] text-[#434655] mt-0.5">
                CS312 • Prof. Rajesh Gupta
              </span>
            </div>
            <div className="flex items-center gap-x-2 bg-[#ffeedd] p-2 rounded-xl text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-[#784b00]">
                priority_high
              </span>
              <span className="text-[#2a1700] font-semibold">
                Submission Reminder: Printed Lab Manual v2 Required
              </span>
            </div>
          </article>

          {/* Item 5: Cloud Computing Elective (Upcoming) */}
          <article className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#e7eeff] flex flex-col gap-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-2">
                <span className="text-[12px] font-bold text-[#111c2d]">03:45 – 04:45 PM</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[10px] font-bold">
                  Guest Lecture
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#dee8ff] text-[#434655] text-[10px] font-semibold">
                Upcoming
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline justify-between">
                <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">
                  Elective: Cloud Computing
                </h3>
                <span className="text-[12px] font-semibold text-[#434655]">Seminar Hall C</span>
              </div>
              <span className="text-[11px] text-[#434655] mt-0.5">
                CS402 • Industry Speaker (AWS Cloud Architect)
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f3ff]">
              <div className="flex items-center gap-x-1.5 text-[#434655]">
                <span className="material-symbols-outlined text-[16px]">cloud</span>
                <span className="text-[11px]">
                  Microservices, Containers &amp; Serverless Orchestration
                </span>
              </div>
              <span className="text-[11px] text-[#006c49] font-bold">Safe Margin</span>
            </div>
          </article>
        </div>
      </section>

      {/* Schedule Actions & Export Bar */}
      <section className="flex flex-col gap-y-2 pt-1">
        <span className="text-[12px] font-bold text-[#111c2d] px-1">Calendar Tools &amp; Exports</span>
        <div className="grid grid-cols-2 gap-x-2.5">
          <button
            onClick={handleSyncCalendar}
            className="flex items-center justify-center gap-x-2 py-3 px-3 rounded-xl bg-[#ffffff] hover:bg-[#f0f3ff] text-[#111c2d] text-[12px] font-bold shadow-xs border border-[#e7eeff] transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#004ac6]">sync</span>
            <span className="truncate">Sync Google/iCal</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center justify-center gap-x-2 py-3 px-3 rounded-xl bg-[#ffffff] hover:bg-[#f0f3ff] text-[#111c2d] text-[12px] font-bold shadow-xs border border-[#e7eeff] transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#784b00]">download</span>
            <span className="truncate">Download PDF</span>
          </button>
        </div>
      </section>
    </div>
  );
};
