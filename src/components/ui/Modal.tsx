import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg-inverse/50 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-md overflow-hidden p-0 shadow-elevated"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <h3 className="text-h3">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-text-sub hover:text-text-main inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border-subtle"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5 text-body">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t border-border-subtle px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
