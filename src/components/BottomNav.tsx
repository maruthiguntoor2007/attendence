import React from 'react';
import { TabType } from '../types/campus';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f9f9ff]/92 backdrop-blur-xl border-t border-[#dee8ff]/70 shadow-[0_-2px_12px_rgba(17,28,45,0.05)] transition-all">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1 relative">
        {/* Dashboard */}
        <button
          onClick={() => onChangeTab('dashboard')}
          aria-current={currentTab === 'dashboard' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all active:scale-95 ${
            currentTab === 'dashboard'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#111c2d]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'dashboard' ? 'material-symbols-filled' : ''
            }`}
          >
            dashboard
          </span>
          <span className="font-body text-[11px] mt-0.5 font-medium">Dashboard</span>
        </button>

        {/* Analytics */}
        <button
          onClick={() => onChangeTab('analytics')}
          aria-current={currentTab === 'analytics' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all active:scale-95 ${
            currentTab === 'analytics'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#111c2d]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'analytics' ? 'material-symbols-filled' : ''
            }`}
          >
            analytics
          </span>
          <span className="font-body text-[11px] mt-0.5 font-medium">Analytics</span>
        </button>

        {/* Check-in Center Raised Action */}
        <button
          onClick={() => onChangeTab('check-in')}
          aria-current={currentTab === 'check-in' ? 'page' : undefined}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] -mt-5 transition-transform active:scale-95 group"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,74,198,0.38)] text-[#ffffff] transition-all ${
              currentTab === 'check-in'
                ? 'bg-[#003ea8] ring-4 ring-[#dbe1ff]'
                : 'bg-[#004ac6] group-hover:bg-[#003ea8]'
            }`}
          >
            <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
          </div>
          <span
            className={`font-body text-[11px] mt-1 ${
              currentTab === 'check-in'
                ? 'text-[#004ac6] font-bold'
                : 'text-[#434655] font-medium'
            }`}
          >
            Check-in
          </span>
        </button>

        {/* Leave / OD */}
        <button
          onClick={() => onChangeTab('leave-od')}
          aria-current={currentTab === 'leave-od' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all active:scale-95 ${
            currentTab === 'leave-od'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#111c2d]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'leave-od' ? 'material-symbols-filled' : ''
            }`}
          >
            description
          </span>
          <span className="font-body text-[11px] mt-0.5 font-medium">Leave / OD</span>
        </button>

        {/* Schedule */}
        <button
          onClick={() => onChangeTab('schedule')}
          aria-current={currentTab === 'schedule' || currentTab === 'hall-map' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all active:scale-95 ${
            currentTab === 'schedule' || currentTab === 'hall-map'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#111c2d]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'schedule' || currentTab === 'hall-map'
                ? 'material-symbols-filled'
                : ''
            }`}
          >
            calendar_today
          </span>
          <span className="font-body text-[11px] mt-0.5 font-medium">Schedule</span>
        </button>
      </div>
    </nav>
  );
};
