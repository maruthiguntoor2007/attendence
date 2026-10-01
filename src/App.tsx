/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, StudentProfile } from './types/campus';
import { INITIAL_STUDENT, COURSES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { AnalyticsView } from './components/AnalyticsView';
import { CheckInView } from './components/CheckInView';
import { LeavePortalView } from './components/LeavePortalView';
import { ScheduleView } from './components/ScheduleView';
import { HallTicketView } from './components/HallTicketView';
import { AttendanceSlipModal } from './components/AttendanceSlipModal';
import { DisputeModal } from './components/DisputeModal';
import { ProfileModal } from './components/ProfileModal';
import { CondonationModal } from './components/CondonationModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [courses, setCourses] = useState(COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('cs304');

  // Modals state
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [disputingLectureId, setDisputingLectureId] = useState<string | null>(null);
  const [isCondonationOpen, setIsCondonationOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const handleDisputeClass = (lectureId: string) => {
    setDisputingLectureId(lectureId);
    setIsDisputeOpen(true);
  };

  const handleSubmitDispute = (lectureId: string, _reason: string) => {
    setIsDisputeOpen(false);
    showToast(`✓ Dispute ticket submitted for ${lectureId}. Academic Dean notified.`);
  };

  const handleSubmitCondonation = (_reason: string, _category: string) => {
    setIsCondonationOpen(false);
    showToast('✓ Condonation claim registered. HOD & Academic Registrar notified.');
  };

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen flex flex-col antialiased selection:bg-[#dbe1ff]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        student={student}
        onOpenProfile={() => setIsProfileOpen(true)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
        showBack={currentTab === 'check-in' || currentTab === 'hall-map'}
        onBack={() => setCurrentTab('dashboard')}
      />

      {/* Main Content View with padding for fixed top and bottom bars */}
      <main className="flex-1 w-full pt-18 pb-24">
        {currentTab === 'dashboard' && (
          <DashboardView
            student={student}
            courses={courses}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onSelectCourseForAnalytics={(id) => {
              setSelectedCourseId(id);
              setCurrentTab('analytics');
            }}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsView
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onExportSlip={() => setIsSlipOpen(true)}
            onDisputeClass={handleDisputeClass}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'check-in' && (
          <CheckInView
            onBack={() => setCurrentTab('dashboard')}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'leave-od' && (
          <LeavePortalView onShowToast={showToast} />
        )}

        {currentTab === 'schedule' && (
          <ScheduleView
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'hall-map' && (
          <HallTicketView
            student={student}
            onShowToast={showToast}
            onDownloadPass={() => setIsSlipOpen(true)}
            onFileCondonation={() => setIsCondonationOpen(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={(tab) => setCurrentTab(tab)}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 max-w-[92vw] bg-[#263143] text-[#ecf1ff] px-4 py-2.5 rounded-full text-[12px] font-medium shadow-2xl flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#6cf8bb]">
            check_circle
          </span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <AttendanceSlipModal
        isOpen={isSlipOpen}
        onClose={() => setIsSlipOpen(false)}
        student={student}
        courses={courses}
        onDownloadDone={() => {
          setIsSlipOpen(false);
          showToast('✓ Official CS304 Attendance Slip PDF downloaded');
        }}
      />

      <DisputeModal
        lectureId={disputingLectureId}
        isOpen={isDisputeOpen}
        onClose={() => setIsDisputeOpen(false)}
        onSubmitDispute={handleSubmitDispute}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        student={student}
        onShowToast={showToast}
      />

      <CondonationModal
        isOpen={isCondonationOpen}
        onClose={() => setIsCondonationOpen(false)}
        onSubmit={handleSubmitCondonation}
      />
    </div>
  );
}
