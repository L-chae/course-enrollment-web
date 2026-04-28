import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-bg-inverse/50 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="card shadow-elevated animate-in fade-in zoom-in w-full max-w-md duration-200">
        <div
          className="border-border-subtle flex items-center justify-between border-b"
          style={{ paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}
        >
          <h3 className="text-h3">{title}</h3>
          <button onClick={onClose} className="text-text-mute hover:text-text-main">
            ✕
          </button>
        </div>
        <div className="text-body">{children}</div>
      </div>
    </div>
  );
}
