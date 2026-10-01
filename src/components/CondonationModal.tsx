import React, { useState } from 'react';

interface CondonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, category: string) => void;
}

export const CondonationModal: React.FC<CondonationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState(
    'Requesting condonation for CS304 (73.1%) due to university sanctioned technical hackathon attendance at IIT Bombay.'
  );
  const [category, setCategory] = useState<'medical' | 'od'>('od');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reason, category);
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
            <span className="material-symbols-outlined text-[22px]">gavel</span>
            <span className="font-headline font-bold text-[15px]">
              Academic Condonation Waiver
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
            <div className="flex justify-between font-bold text-[#111c2d]">
              <span>CS304 Operating Systems</span>
              <span className="text-[#ba1a1a]">Current: 73.1% (Requires 75%)</span>
            </div>
            <p>Shortfall: 2 missed lectures to reach mandatory examination clearance.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-[#434655]">Exemption Category</label>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <button
                type="button"
                onClick={() => setCategory('od')}
                className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                  category === 'od'
                    ? 'bg-[#dee8ff] border-[#004ac6] text-[#00174b]'
                    : 'bg-[#f0f3ff] border-[#dee8ff] text-[#434655]'
                }`}
              >
                🏆 Official On-Duty Credit
              </button>
              <button
                type="button"
                onClick={() => setCategory('medical')}
                className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                  category === 'medical'
                    ? 'bg-[#dee8ff] border-[#004ac6] text-[#00174b]'
                    : 'bg-[#f0f3ff] border-[#dee8ff] text-[#434655]'
                }`}
              >
                🩺 Medical Exemption
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="condonation-details" className="text-[12px] font-bold text-[#434655]">
              Condonation Statement
            </label>
            <textarea
              id="condonation-details"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#f0f3ff] rounded-xl p-3 text-[12px] text-[#111c2d] outline-none focus:ring-2 focus:ring-[#004ac6] resize-none"
            />
          </div>

          <div className="p-3 bg-[#e7eeff] rounded-xl text-[11px] text-[#00174b] space-y-1">
            <span className="font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">info</span> Condonation
              Fee / HOD Rule
            </span>
            <p>
              Applications within 65% – 74.9% are reviewed by the Dean of Academics. If approved,
              your Hall Ticket for CS304 will unlock immediately.
            </p>
          </div>

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
              className="flex-1 py-2.5 rounded-xl bg-[#ba1a1a] text-[#ffffff] font-bold text-[13px] hover:bg-[#93000a] shadow-xs"
            >
              Submit Condonation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
