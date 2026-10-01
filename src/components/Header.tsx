import React, { useState } from 'react';
import { APP_ASSETS, NOTIFICATIONS_LIST } from '../data/mockData';
import { TabType, StudentProfile } from '../types/campus';

interface HeaderProps {
  currentTab: TabType;
  subTitle?: string;
  student: StudentProfile;
  onOpenProfile: () => void;
  onNavigateTab: (tab: TabType) => void;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  subTitle,
  student,
  onOpenProfile,
  onNavigateTab,
  showBack = false,
  onBack,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_LIST);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getHeaderTitle = () => {
    if (subTitle) return subTitle;
    switch (currentTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'analytics':
        return 'Attendance Analytics';
      case 'check-in':
        return 'Qr Check In';
      case 'leave-od':
        return 'Leave And Od';
      case 'schedule':
        return 'Timetable & Exam Eligibility';
      case 'hall-map':
        return 'Exam Hall & Seating Map';
      default:
        return 'Dashboard';
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 pt-safe bg-[#f9f9ff]/85 backdrop-blur-xl border-b border-[#dee8ff]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
        <div className="h-16 px-4 max-w-md mx-auto flex items-center justify-between gap-2">
          {/* Left brand or back */}
          <div className="flex items-center gap-2 min-w-0">
            {showBack ? (
              <button
                onClick={onBack || (() => onNavigateTab('dashboard'))}
                aria-label="Back"
                className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-[#434655] hover:text-[#111c2d] hover:bg-[#dee8ff]/60 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            ) : null}

            <button
              onClick={() => onNavigateTab('dashboard')}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity text-left min-w-0"
            >
              <img
                src={APP_ASSETS.logo}
                alt="CampusTrack App Logo"
                className="h-8 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-headline font-bold text-[18px] text-[#004ac6] leading-tight tracking-tight">
                  CampusTrack
                </span>
                <span className="font-body text-[11px] text-[#434655] font-medium leading-none truncate">
                  {getHeaderTitle()}
                </span>
              </div>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#434655] hover:text-[#111c2d] hover:bg-[#dee8ff]/60 active:scale-95 transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#f9f9ff]"></span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-32px)] z-40 bg-[#ffffff] rounded-2xl shadow-xl border border-[#dee8ff] p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff] px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline font-semibold text-[14px] text-[#111c2d]">
                          Notifications
                        </span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] text-[#004ac6] font-semibold hover:underline"
                        >
                          Mark read
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-[#e7eeff] max-h-72 overflow-y-auto no-scrollbar py-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 hover:bg-[#f0f3ff] rounded-xl transition-colors cursor-pointer ${
                            n.unread ? 'bg-[#f0f3ff]/60' : ''
                          }`}
                          onClick={() => {
                            if (n.id === 'notif-1') onNavigateTab('analytics');
                            if (n.id === 'notif-2') onNavigateTab('schedule');
                            if (n.id === 'notif-3') onNavigateTab('check-in');
                            if (n.id === 'notif-4') onNavigateTab('leave-od');
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-headline font-semibold text-[12px] text-[#111c2d]">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-[#737686] whitespace-nowrap">
                              {n.time}
                            </span>
                          </div>
                          <p className="font-body text-[11px] text-[#434655] mt-0.5 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={onOpenProfile}
              aria-label="Profile"
              className="w-11 h-11 flex items-center justify-center rounded-full hover:opacity-90 active:scale-95 transition-opacity"
            >
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.08)] ring-2 ring-[#2563eb]/20"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
