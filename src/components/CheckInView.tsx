import React, { useState, useEffect, useRef } from 'react';

interface CheckInViewProps {
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const CheckInView: React.FC<CheckInViewProps> = ({ onBack, onShowToast }) => {
  const [torchOn, setTorchOn] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(163);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [checkInDone, setCheckInDone] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `Closes in ${mins}:${secs} mins`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const char = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    // Auto-advance
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCheckInDone(true);
      onShowToast('✓ Marked Present for Operating Systems (CS304) Hall 204!');
    }, 1000);
  };

  const handleSimulateScan = () => {
    if (checkInDone) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCheckInDone(true);
      onShowToast('✓ Dynamic QR Code decoded! Attendance logged with Registrar.');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 space-y-4">
      {/* Screen Narrative Card */}
      <div className="bg-[#ffffff] rounded-2xl p-4 shadow-sm border border-[#e7eeff] flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#004ac6] uppercase tracking-wider font-bold">
            Live Attendance Verification
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-ping"></span>
            Active Session
          </span>
        </div>
        <div>
          <h2 className="font-headline text-[18px] font-bold text-[#111c2d]">Scan Lecture QR</h2>
          <p className="font-body text-[13px] text-[#434655] flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">school</span>
            Operating Systems (CS304) • Hall 204
          </p>
        </div>
      </div>

      {/* Geofence & Proximity Radar Status Banner */}
      <div className="bg-[#f0f3ff] rounded-2xl p-4 shadow-sm border border-[#dee8ff] flex flex-col space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Location Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/30 text-[#00714d]">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              my_location
            </span>
            <span className="text-[11px] font-bold">Verified: Hall 204 (Acc: 4m)</span>
          </div>

          {/* Timer Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffeedd] text-[#784b00]">
            <span className="material-symbols-outlined text-[16px]">timer</span>
            <span className="text-[11px] font-bold">{formatCountdown(remainingSeconds)}</span>
          </div>
        </div>

        {/* Realtime Beacon Proximity Meter */}
        <div className="bg-[#ffffff] rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#e7eeff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[18px]">bluetooth_connected</span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-[#111c2d] truncate">
                Beacon: CS-HALL204-AP02 Connected
              </p>
              <p className="text-[11px] text-[#434655] truncate">
                RSSI: -58 dBm • Direct Proximity Match
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#006c49] shrink-0">
            <span className="material-symbols-outlined text-[18px]">signal_cellular_4_bar</span>
            <span className="text-[11px] font-bold">Locked</span>
          </div>
        </div>
      </div>

      {/* Camera Viewfinder Card with Simulated Dynamic Glow */}
      <div
        onClick={handleSimulateScan}
        className={`relative bg-[#263143] rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-between p-4 min-h-[350px] transition-all cursor-pointer select-none ${
          checkInDone ? 'ring-4 ring-[#6cf8bb]' : ''
        }`}
      >
        {/* Flashlight background ambient illumination */}
        {torchOn && (
          <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay z-0 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#004ac6]/20 via-transparent to-[#004ac6]/30 pointer-events-none"></div>

        {/* Live Permissions Pill Overlay */}
        <div className="relative z-10 w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111c2d]/80 backdrop-blur-md text-[#ecf1ff]">
            <span className="w-2 h-2 rounded-full bg-[#6cf8bb]"></span>
            <span className="text-[11px] font-medium">GPS &amp; Optics Active</span>
          </div>

          {/* Flashlight toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTorchOn(!torchOn);
              onShowToast(torchOn ? 'Torch turned off' : 'Torch activated');
            }}
            aria-label="Toggle Flashlight"
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              torchOn
                ? 'bg-[#004ac6] text-[#ffffff] ring-2 ring-white'
                : 'bg-white/20 text-[#ffffff] hover:bg-white/30'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {torchOn ? 'flash_on' : 'flash_off'}
            </span>
          </button>
        </div>

        {/* Optical Viewfinder Frame */}
        <div className="relative z-10 w-56 h-56 my-auto flex items-center justify-center">
          {/* Corner Reticle Indicators */}
          <div className="absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-[#004ac6] rounded-tl-lg shadow-sm"></div>
          <div className="absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-[#004ac6] rounded-tr-lg shadow-sm"></div>
          <div className="absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-[#004ac6] rounded-bl-lg shadow-sm"></div>
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-[#004ac6] rounded-br-lg shadow-sm"></div>

          {/* Scanning Beam Animation */}
          {!checkInDone && (
            <div className="absolute inset-x-2 top-2 h-1 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent opacity-90 rounded-full animate-bounce"></div>
          )}

          {/* Interior Subtle Reticle Grid or Success Checkmark */}
          {checkInDone ? (
            <div className="w-44 h-44 rounded-xl bg-[#6cf8bb]/20 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center animate-in zoom-in-75 duration-300">
              <span className="material-symbols-outlined text-[56px] text-[#6cf8bb]">
                check_circle
              </span>
              <span className="text-[12px] font-bold text-white mt-1">Verified Present!</span>
            </div>
          ) : (
            <div className="w-44 h-44 rounded-xl bg-white/5 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center">
              <span className="material-symbols-outlined text-[44px] text-[#2563eb]/80 animate-pulse">
                qr_code_scanner
              </span>
              <span className="text-[10px] text-white/70 mt-2">Tap frame to test scan</span>
            </div>
          )}
        </div>

        {/* Frame Bottom Micro-hint */}
        <div className="relative z-10 w-full text-center">
          <p className="text-[13px] font-bold text-[#ecf1ff] drop-shadow-xs">
            Align professor's dynamic QR code within the frame
          </p>
          <p className="text-[11px] text-[#dee8ff]/80 mt-0.5">
            Codes refresh every 15 seconds to prevent sharing
          </p>
        </div>
      </div>

      {/* Manual Code Alternative Action */}
      <div className="bg-[#e7eeff] rounded-2xl p-4 shadow-sm border border-[#dee8ff] flex flex-col space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#d8e3fb] flex items-center justify-center text-[#004ac6] shrink-0">
            <span className="material-symbols-outlined text-[20px]">pin</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-headline text-[14px] font-bold text-[#111c2d]">
              Backup Classroom Code
            </h3>
            <p className="font-body text-[11px] text-[#434655]">
              Professor gave a numeric OTP? Tap to enter 6-digit backup code.
            </p>
          </div>
        </div>

        {/* Manual 6-digit Input Segment */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex gap-2 justify-between">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                placeholder="•"
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-12 text-center font-headline text-[20px] font-bold bg-[#ffffff] text-[#111c2d] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004ac6] shadow-xs transition-all placeholder:text-[#c3c6d7]"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={isVerifying || checkInDone}
            className={`w-full h-11 rounded-xl text-[13px] font-bold font-headline flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-sm ${
              checkInDone
                ? 'bg-[#6cf8bb] text-[#00714d]'
                : 'bg-[#004ac6] text-[#ffffff] hover:bg-[#003ea8]'
            }`}
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                <span>Validating Session...</span>
              </>
            ) : checkInDone ? (
              <>
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>Session Verified &amp; Recorded</span>
              </>
            ) : (
              <>
                <span>Validate Code &amp; Mark Present</span>
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recent Successful Check-ins */}
      <div className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline text-[15px] font-bold text-[#111c2d]">Recent Check-ins</h3>
          <span className="text-[11px] text-[#004ac6] font-bold">Semester Log</span>
        </div>

        {/* Item 1 */}
        <div className="bg-[#ffffff] rounded-2xl p-3.5 shadow-xs border border-[#e7eeff] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#6cf8bb]/20 text-[#006c49] flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-headline text-[13px] font-bold text-[#111c2d] truncate">
                  Database Systems
                </p>
                <span className="inline-flex px-1.5 py-0.2 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[10px] font-bold">
                  Safe
                </span>
              </div>
              <p className="font-body text-[11px] text-[#434655] truncate">
                Prof. Vance • Verified via QR Code (Hall 201)
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] font-bold text-[#111c2d]">Today</p>
            <p className="text-[11px] text-[#434655]">09:02 AM</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-[#ffffff] rounded-2xl p-3.5 shadow-xs border border-[#e7eeff] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#6cf8bb]/20 text-[#006c49] flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-headline text-[13px] font-bold text-[#111c2d] truncate">
                  Discrete Maths
                </p>
                <span className="inline-flex px-1.5 py-0.2 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[10px] font-bold">
                  Safe
                </span>
              </div>
              <p className="font-body text-[11px] text-[#434655] truncate">
                Prof. Anita • Verified via QR Code
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] font-bold text-[#111c2d]">Yesterday</p>
            <p className="text-[11px] text-[#434655]">02:04 PM</p>
          </div>
        </div>
      </div>

      {/* Attendance Health Metric Teaser */}
      <div className="bg-[#f0f3ff] rounded-2xl p-4 shadow-sm border border-[#dee8ff] flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-[#004ac6] font-bold uppercase tracking-wider">
            Course Standing
          </span>
          <h4 className="font-headline text-[16px] font-bold text-[#111c2d]">
            88.4% Attendance
          </h4>
          <p className="text-[12px] text-[#006c49] font-semibold">Can miss 2 classes safely</p>
        </div>

        {/* Circular Metric Ring */}
        <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              className="stroke-[#dee8ff]"
              cx="18"
              cy="18"
              fill="none"
              r="15.5"
              strokeWidth="3"
            />
            <circle
              className="stroke-[#006c49]"
              cx="18"
              cy="18"
              fill="none"
              r="15.5"
              strokeDasharray="97.4"
              strokeDashoffset="11.3"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <span className="absolute font-headline text-[13px] font-bold text-[#111c2d]">
            88%
          </span>
        </div>
      </div>
    </div>
  );
};
