import React, { useState } from 'react';

interface DisputeModalProps {
  lectureId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitDispute: (lectureId: string, reason: string) => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  lectureId,
  isOpen,
  onClose,
  onSubmitDispute,
}) => {
  const [reason, setReason] = useState(
    'I was physically seated at Desk 14 in Hall 204. QR camera scanner timed out due to campus Wi-Fi handover.'
  );
  const [evidenceType, setEvidenceType] = useState('beacon');

  if (!isOpen || !lectureId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitDispute(lectureId, reason);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111c2d]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-2xl overflow-hidden border border-[#dee8ff] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#ffdad6] text-[#93000a] px-5 py-3.5 flex items-center justify-between border-b border-[#ffdad6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">contact_support</span>
            <span className="font-headline font-bold text-[15px]">
              Dispute Absence: {lectureId}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center text-[#93000a]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-[#f0f3ff] p-3 rounded-xl text-[12px] text-[#434655] space-y-1">
            <div className="flex justify-between font-semibold text-[#111c2d]">
              <span>Operating Systems (CS304)</span>
              <span>Oct 24, 10:15 AM</span>
            </div>
            <p>Faculty In-Charge: Dr. Aris Vance • Marked by Faculty</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-[#434655]">Evidence Category</label>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <button
                type="button"
                onClick={() => setEvidenceType('beacon')}
                className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                  evidenceType === 'beacon'
                    ? 'bg-[#dee8ff] border-[#004ac6] text-[#00174b]'
                    : 'bg-[#f0f3ff] border-[#dee8ff] text-[#434655]'
                }`}
              >
                📡 Campus Wi-Fi Beacon Log
              </button>
              <button
                type="button"
                onClick={() => setEvidenceType('peer')}
                className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                  evidenceType === 'peer'
                    ? 'bg-[#dee8ff] border-[#004ac6] text-[#00174b]'
                    : 'bg-[#f0f3ff] border-[#dee8ff] text-[#434655]'
                }`}
              >
                👥 Peer Seating Attestation
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="dispute-explanation" className="text-[12px] font-bold text-[#434655]">
              Student Justification
            </label>
            <textarea
              id="dispute-explanation"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#f0f3ff] rounded-xl p-3 text-[12px] text-[#111c2d] outline-none focus:ring-2 focus:ring-[#004ac6] resize-none"
            />
          </div>

          <p className="text-[11px] text-[#737686]">
            Submitted ticket will be audited against Faculty Access logs &amp; Class Wi-Fi router
            telemetry within 24 hours.
          </p>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] font-bold text-[13px] hover:bg-[#f0f3ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#004ac6] text-[#ffffff] font-bold text-[13px] hover:bg-[#003ea8] shadow-xs"
            >
              Submit Dispute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
