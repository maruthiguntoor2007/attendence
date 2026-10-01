import React, { useState } from 'react';
import { LeaveRequest } from '../types/campus';
import { INITIAL_LEAVES } from '../data/mockData';

interface LeavePortalViewProps {
  onShowToast: (msg: string) => void;
}

export const LeavePortalView: React.FC<LeavePortalViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);

  // Form state
  const [category, setCategory] = useState<'medical' | 'od' | 'casual'>('od');
  const [startDate, setStartDate] = useState('2024-10-28');
  const [endDate, setEndDate] = useState('2024-10-29');
  const [reason, setReason] = useState(
    'Representing university at ACM Inter-College Hackathon at IIT Bombay'
  );
  const [attachedFile, setAttachedFile] = useState<string | null>('Proof_hackathon_invite.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const approvedCount = leaves.filter((l) => l.status === 'Approved').length;
  const pendingCount = leaves.filter((l) => l.status === 'Pending').length;
  const rejectedCount = leaves.filter((l) => l.status === 'Rejected').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newLeave: LeaveRequest = {
        id: `leave-${Date.now()}`,
        category,
        title:
          category === 'od'
            ? 'ACM Hackathon IIT Bombay'
            : category === 'medical'
            ? 'Medical Leave Request'
            : 'Personal Leave Request',
        dates: 'Oct 28 - Oct 29, 2024',
        affectedLecturesCount: 6,
        status: 'Pending',
        statusDetails: 'Pending Advisor',
        reason,
        attachedFile: attachedFile || undefined,
        fileSize: attachedFile ? '1.2 MB' : undefined,
        submittedAt: 'Submitted just now',
      };

      setLeaves((prev) => [newLeave, ...prev]);
      setIsSubmitting(false);
      onShowToast('✓ Request Dispatched! Class Advisor & HOD notified.');
      setActiveTab('history');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <h2 className="font-headline text-[18px] font-bold text-[#111c2d]">Leave &amp; OD Portal</h2>
          <span className="font-body text-[12px] text-[#434655]">
            Manage absences &amp; on-duty attendance credit
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#e7eeff] rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
          <span className="text-[11px] text-[#006c49] font-bold">Semester 5 Active</span>
        </div>
      </div>

      {/* Status Overview & Notice Card */}
      <div className="bg-[#f0f3ff] rounded-2xl p-4 shadow-sm border border-[#dee8ff] flex flex-col space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#ffffff] rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="font-headline text-[26px] text-[#006c49] font-bold leading-none">
              {String(approvedCount).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-[#434655] mt-1 font-medium">Approved</span>
          </div>
          <div className="bg-[#ffffff] rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="font-headline text-[26px] text-[#996100] font-bold leading-none">
              {String(pendingCount).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-[#434655] mt-1 font-medium">Pending</span>
          </div>
          <div className="bg-[#ffffff] rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="font-headline text-[26px] text-[#434655] font-bold leading-none">
              {String(rejectedCount).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-[#434655] mt-1 font-medium">Rejected</span>
          </div>
        </div>

        {/* Compliance Callout */}
        <div className="flex items-start gap-2.5 bg-[#e7eeff] rounded-xl p-3">
          <span
            className="material-symbols-outlined text-[#004ac6] text-[20px] shrink-0 mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <p className="font-body text-[12px] text-[#434655] leading-snug">
            <span className="font-bold text-[#111c2d]">Impact Notice:</span> Approved ODs are
            credited back directly to your mandatory 75% attendance quota upon official HOD
            approval.
          </p>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="flex bg-[#e7eeff] rounded-xl p-1" role="tablist">
        <button
          onClick={() => setActiveTab('apply')}
          className={`flex-1 py-2.5 rounded-lg font-headline text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            activeTab === 'apply'
              ? 'bg-[#004ac6] text-[#ffffff] shadow-sm'
              : 'text-[#434655] hover:text-[#111c2d]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">post_add</span>
          <span>New Application</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 rounded-lg font-headline text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            activeTab === 'history'
              ? 'bg-[#004ac6] text-[#ffffff] shadow-sm'
              : 'text-[#434655] hover:text-[#111c2d]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          <span>Pending &amp; History</span>
        </button>
      </div>

      {/* TAB PANE 1: New Application Form */}
      {activeTab === 'apply' && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col space-y-4"
        >
          {/* Leave Category Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#434655]">Select Absence Category</label>
            <div className="grid grid-cols-1 gap-2">
              {/* Medical */}
              <label
                onClick={() => setCategory('medical')}
                className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  category === 'medical'
                    ? 'bg-[#dee8ff]/70 border-[#004ac6]'
                    : 'bg-[#f0f3ff] border-transparent hover:bg-[#e7eeff]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    category === 'medical'
                      ? 'bg-[#004ac6] text-[#ffffff]'
                      : 'bg-[#ffffff] text-[#004ac6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">medical_services</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                    Medical Leave
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    Doctor slip required for &gt;2 days
                  </span>
                </div>
                {category === 'medical' && (
                  <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                    check_circle
                  </span>
                )}
              </label>

              {/* OD */}
              <label
                onClick={() => setCategory('od')}
                className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  category === 'od'
                    ? 'bg-[#dee8ff]/70 border-[#004ac6]'
                    : 'bg-[#f0f3ff] border-transparent hover:bg-[#e7eeff]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    category === 'od'
                      ? 'bg-[#004ac6] text-[#ffffff]'
                      : 'bg-[#ffffff] text-[#004ac6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                    On-Duty (OD)
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    Technical / Sports / Symposium
                  </span>
                </div>
                {category === 'od' && (
                  <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                    check_circle
                  </span>
                )}
              </label>

              {/* Casual */}
              <label
                onClick={() => setCategory('casual')}
                className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  category === 'casual'
                    ? 'bg-[#dee8ff]/70 border-[#004ac6]'
                    : 'bg-[#f0f3ff] border-transparent hover:bg-[#e7eeff]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    category === 'casual'
                      ? 'bg-[#004ac6] text-[#ffffff]'
                      : 'bg-[#ffffff] text-[#004ac6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">event_busy</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                    Casual Leave
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    Personal emergencies &amp; family obligations
                  </span>
                </div>
                {category === 'casual' && (
                  <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                    check_circle
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Duration of Absence */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#434655]">Duration of Absence</label>
            <div className="bg-[#f0f3ff] rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                    date_range
                  </span>
                  <span className="font-headline text-[13px] font-bold text-[#111c2d]">
                    Oct 28, 2024 → Oct 29, 2024
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#dee8ff] rounded text-[11px] text-[#004ac6] font-bold">
                  2 Days
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#434655]">
                <span className="material-symbols-outlined text-[16px] text-[#784b00]">
                  schedule
                </span>
                <span className="text-[12px]">
                  <strong className="text-[#111c2d] font-bold">6 Lectures</strong> impacted across
                  this period
                </span>
              </div>
            </div>
          </div>

          {/* Auto-detected Affected Classes List */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#434655]">
                Affected Timetable Slots
              </span>
              <span className="text-[11px] text-[#006c49] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span> Auto-detected
              </span>
            </div>

            <div className="bg-[#e7eeff] rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded-lg shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-1 bg-[#dee8ff] rounded text-[#004ac6] text-[11px] font-bold">
                    CS301
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline text-[13px] font-semibold text-[#111c2d]">
                      Database Engineering
                    </span>
                    <span className="text-[11px] text-[#434655]">Dr. S. Nair • Lab 2</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#434655] font-semibold bg-[#f0f3ff] px-2 py-0.5 rounded">
                  2 hrs
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded-lg shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-1 bg-[#dee8ff] rounded text-[#004ac6] text-[11px] font-bold">
                    CS304
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline text-[13px] font-semibold text-[#111c2d]">
                      Computer Networks
                    </span>
                    <span className="text-[11px] text-[#434655]">Prof. A. Roy • Hall 102</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#434655] font-semibold bg-[#f0f3ff] px-2 py-0.5 rounded">
                  2 hrs
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded-lg shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-1 bg-[#dee8ff] rounded text-[#004ac6] text-[11px] font-bold">
                    CS308
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline text-[13px] font-semibold text-[#111c2d]">
                      Software Architecture
                    </span>
                    <span className="text-[11px] text-[#434655]">Dr. P. Deshmukh • Sem 4</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#434655] font-semibold bg-[#f0f3ff] px-2 py-0.5 rounded">
                  2 hrs
                </span>
              </div>
            </div>
          </div>

          {/* Reason and Context */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="leave-reason" className="text-[12px] font-bold text-[#434655]">
              Reason &amp; Activity Brief
            </label>
            <textarea
              id="leave-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#f0f3ff] rounded-xl p-3 text-[#111c2d] text-[13px] outline-none focus:ring-2 focus:ring-[#004ac6] transition-all resize-none placeholder:text-[#737686]"
              rows={3}
              placeholder="Specify activity details, event name, or medical condition"
            />
            <span className="text-[11px] text-[#434655]">
              Class Advisor will review justification against college records.
            </span>
          </div>

          {/* Document Attachment Box */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#434655]">
              Supporting Documents (Invites/Certificates)
            </label>

            {attachedFile ? (
              <div className="bg-[#f0f3ff] rounded-xl p-3 flex items-center justify-between shadow-xs border border-[#dee8ff]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#dee8ff] flex items-center justify-center text-[#004ac6] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">description</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline text-[13px] font-bold text-[#111c2d] truncate">
                      {attachedFile}
                    </span>
                    <span className="text-[11px] text-[#434655]">
                      1.2 MB • Uploaded verified PDF
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAttachedFile(null);
                    onShowToast('Attachment removed');
                  }}
                  aria-label="Delete attached document"
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAttachedFile('Proof_hackathon_invite.pdf');
                  onShowToast('Attached: Proof_hackathon_invite.pdf');
                }}
                className="py-3 px-4 rounded-xl bg-[#e7eeff] text-[#004ac6] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#dee8ff] transition-colors border border-dashed border-[#004ac6]/40 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">upload_file</span>
                Attach Supporting Document
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#004ac6] text-[#ffffff] rounded-xl font-headline text-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,74,198,0.28)] hover:bg-[#003ea8] active:scale-[0.99] transition-all mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                <span>Transmitting Application...</span>
              </>
            ) : (
              <>
                <span>Submit Request to Class Advisor</span>
                <span className="material-symbols-outlined text-[20px]">send</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* TAB PANE 2: History & Pending Requests */}
      {activeTab === 'history' && (
        <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
          {/* Pending Group */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#434655] uppercase tracking-wider px-1">
              Awaiting Decision ({pendingCount})
            </span>

            {leaves
              .filter((l) => l.status === 'Pending')
              .map((leave) => (
                <div
                  key={leave.id}
                  className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="font-headline text-[15px] font-bold text-[#111c2d]">
                        {leave.title}
                      </span>
                      <span className="text-[12px] text-[#434655]">
                        {leave.category.toUpperCase()} • {leave.dates}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#ffddb8] text-[#2a1700] text-[11px] shrink-0 flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                      {leave.statusDetails}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#434655] bg-[#f0f3ff] p-2 rounded-lg">
                    {leave.reason}
                  </p>

                  <div className="bg-[#f0f3ff] rounded-xl p-2.5 flex items-center justify-between mt-1 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                        schedule
                      </span>
                      <span className="text-[#111c2d] font-semibold">
                        {leave.affectedLecturesCount} Sessions affected
                      </span>
                    </div>
                    <span className="text-[#434655]">{leave.submittedAt}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Past Approved Group */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#434655] uppercase tracking-wider px-1">
              Approved Records (Past)
            </span>

            {leaves
              .filter((l) => l.status === 'Approved')
              .map((leave) => (
                <div
                  key={leave.id}
                  className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline text-[15px] font-bold text-[#111c2d]">
                          {leave.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[10px] font-bold">
                          {leave.statusDetails}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#434655] mt-0.5">
                        {leave.dates} • {leave.reason}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#6cf8bb]/15 p-2 rounded-xl text-[#006c49] text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[16px]">add_task</span>
                    <span>Attendance adjusted (+{leave.restoredLectures || 3} lectures restored)</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
