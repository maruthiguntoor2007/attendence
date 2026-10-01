import React from 'react';
import { StudentProfile, Course } from '../types/campus';
import { APP_ASSETS } from '../data/mockData';

interface AttendanceSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  courses: Course[];
  onDownloadDone: () => void;
}

export const AttendanceSlipModal: React.FC<AttendanceSlipModalProps> = ({
  isOpen,
  onClose,
  student,
  courses,
  onDownloadDone,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
    onDownloadDone();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111c2d]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl overflow-hidden border border-[#dee8ff] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#004ac6] text-[#ffffff] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">verified</span>
            <span className="font-headline font-bold text-[14px]">
              Official Academic Attendance Slip
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Slip Body (Printable Paper Look) */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4 bg-[#f9f9ff]">
          {/* Institution Header */}
          <div className="text-center border-b border-[#dee8ff] pb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img src={APP_ASSETS.logo} alt="Logo" className="h-8 object-contain" />
              <span className="font-headline text-[18px] font-bold text-[#004ac6]">
                Apex Institute of Technology
              </span>
            </div>
            <p className="text-[11px] text-[#434655]">
              Office of the Controller of Examinations &amp; Academic Registrar
            </p>
            <p className="text-[10px] font-mono text-[#737686] mt-0.5">
              Ref: AIT/REG/ATT-2024/VI-402 • Issue Date: Oct 24, 2024
            </p>
          </div>

          {/* Student Bio Strip */}
          <div className="bg-[#ffffff] rounded-xl p-3 border border-[#e7eeff] grid grid-cols-2 gap-2 text-[12px]">
            <div>
              <span className="text-[#737686] text-[10px] block">STUDENT NAME</span>
              <strong className="text-[#111c2d]">{student.name}</strong>
            </div>
            <div>
              <span className="text-[#737686] text-[10px] block">REGISTRATION NO.</span>
              <strong className="font-mono text-[#111c2d]">{student.id}</strong>
            </div>
            <div>
              <span className="text-[#737686] text-[10px] block">DEGREE &amp; BRANCH</span>
              <span className="text-[#111c2d]">{student.program}</span>
            </div>
            <div>
              <span className="text-[#737686] text-[10px] block">SEMESTER</span>
              <span className="text-[#111c2d]">{student.semester}</span>
            </div>
          </div>

          {/* Courses Table */}
          <div className="bg-[#ffffff] rounded-xl border border-[#e7eeff] overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#f0f3ff] text-[#434655] font-bold border-b border-[#e7eeff]">
                <tr>
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-2 text-center">Attended / Total</th>
                  <th className="py-2 px-2 text-center">%</th>
                  <th className="py-2 px-3 text-right">Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3ff]">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f9f9ff]">
                    <td className="py-2 px-3">
                      <span className="font-bold text-[#111c2d]">{c.code}</span>
                      <span className="text-[#434655] block truncate max-w-[140px]">{c.name}</span>
                    </td>
                    <td className="py-2 px-2 text-center font-mono">
                      {c.attended} / {c.total}
                    </td>
                    <td className="py-2 px-2 text-center font-bold">
                      <span className={c.percentage < 75 ? 'text-[#ba1a1a]' : 'text-[#006c49]'}>
                        {c.percentage}%
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      {c.percentage < 75 ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-bold">
                          Blocked
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] font-bold">
                          Eligible
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aggregated Total Strip */}
          <div className="bg-[#e7eeff] rounded-xl p-3 flex items-center justify-between text-[12px]">
            <div>
              <span className="font-bold text-[#00174b]">Aggregated Attendance Record</span>
              <p className="text-[11px] text-[#434655]">Total Hours: 142 / 168</p>
            </div>
            <div className="text-right">
              <span className="font-headline text-[18px] font-bold text-[#004ac6]">84.2%</span>
              <span className="text-[10px] text-[#006c49] font-bold block">✓ Safe Standing</span>
            </div>
          </div>

          {/* Registrar Digital Signatory Block */}
          <div className="border border-[#dee8ff] rounded-xl p-3 bg-[#ffffff] flex items-center justify-between">
            <div className="flex flex-col text-[11px] text-[#434655]">
              <span className="font-bold text-[#111c2d]">Digitally Certified by Registrar</span>
              <span className="text-[10px]">SHA-256: 8e4b9...c31f</span>
              <span className="text-[10px] text-[#006c49] font-bold mt-0.5">
                ● Authentic Registrar Timestamp
              </span>
            </div>
            <div className="w-12 h-12 border-2 border-dashed border-[#004ac6]/40 rounded-lg flex items-center justify-center text-[#004ac6] text-[10px] font-bold text-center">
              ACADEMIC SEAL
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#ffffff] p-3.5 border-t border-[#dee8ff] flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] font-bold text-[13px] hover:bg-[#f0f3ff]"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-[#004ac6] text-[#ffffff] font-bold text-[13px] hover:bg-[#003ea8] flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
