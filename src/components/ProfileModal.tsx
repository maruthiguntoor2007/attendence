import React from 'react';
import { StudentProfile } from '../types/campus';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onShowToast: (msg: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onShowToast,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111c2d]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden border border-[#dee8ff] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with avatar */}
        <div className="bg-[#004ac6] pt-6 pb-12 px-5 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <h3 className="font-headline font-bold text-[16px]">Student Academic Profile</h3>
          <span className="text-[11px] text-[#dbe1ff]">Apex Institute of Technology</span>
        </div>

        <div className="px-5 pb-5 -mt-9 relative z-10 flex flex-col items-center">
          <div className="w-18 h-18 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-white">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h4 className="font-headline text-[17px] font-bold text-[#111c2d] mt-2">
            {student.name}
          </h4>
          <span className="text-[12px] font-mono text-[#434655] font-semibold">{student.id}</span>

          <div className="flex items-center gap-2 mt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold">
              {student.status}
            </span>
            <span className="text-[11px] text-[#434655]">
              {student.semester} • {student.program}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="w-full grid grid-cols-2 gap-2 mt-4 text-center">
            <div className="p-3 bg-[#f0f3ff] rounded-xl border border-[#dee8ff]">
              <span className="text-[10px] text-[#434655] uppercase font-bold block">
                AGGREGATED
              </span>
              <span className="font-headline text-[18px] font-bold text-[#004ac6]">
                {student.aggregatedAttendance}%
              </span>
              <span className="text-[10px] text-[#006c49] font-semibold block">Safe Zone</span>
            </div>

            <div className="p-3 bg-[#f0f3ff] rounded-xl border border-[#dee8ff]">
              <span className="text-[10px] text-[#434655] uppercase font-bold block">
                CUMULATIVE CGPA
              </span>
              <span className="font-headline text-[18px] font-bold text-[#111c2d]">8.92</span>
              <span className="text-[10px] text-[#004ac6] font-semibold block">First Class</span>
            </div>
          </div>

          {/* Institutional Identifiers */}
          <div className="w-full bg-[#f9f9ff] rounded-2xl p-3 border border-[#e7eeff] mt-3 space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#737686]">Class Advisor:</span>
              <span className="font-semibold text-[#111c2d]">Dr. S. Nair</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737686]">Academic Email:</span>
              <span className="font-mono text-[#111c2d]">a.rivera@ait.edu</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737686]">NFC Campus Card:</span>
              <span className="font-mono text-[#006c49] font-bold">Active (#8491-002)</span>
            </div>
          </div>

          <button
            onClick={() => {
              onShowToast('✓ Digital Student ID added to device wallet!');
              onClose();
            }}
            className="w-full mt-4 py-2.5 rounded-xl bg-[#004ac6] text-white font-headline text-[13px] font-bold shadow-xs hover:bg-[#003ea8] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Download Digital ID Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
