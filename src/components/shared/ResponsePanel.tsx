'use client';

import LoadingDots from './LoadingDots';
import { SpeakButton } from '@/hooks/useVoice';

interface ResponsePanelProps {
  isLoading: boolean;
  response: string;
  error: string | null;
  scientistName: string;
  scientistIcon: string;
  scientistRole: string;
  emptyIcon: string;
  emptyText: string;
  voiceId?: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function ResponsePanel({
  isLoading, response, error,
  scientistName, scientistIcon, scientistRole,
  emptyIcon, emptyText, voiceId,
}: ResponsePanelProps) {
  if (error) {
    return (
      <div className="rounded-[14px] border border-bd p-4.5 min-h-[150px]" style={{ background: 'var(--bg2)' }}>
        <div className="flex flex-col items-center justify-center h-[110px] text-xs gap-2 text-center" style={{ color: 'var(--coral)' }}>
          <div className="text-[26px] opacity-50">⚠️</div>
          <div>{error}</div>
          <div className="text-[13px]" style={{ color: 'var(--t3)' }}>
            Check .env.local mein ANTHROPIC_API_KEY set hai ya nahi
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && !response) {
    return (
      <div className="rounded-[14px] border border-bd p-4.5 min-h-[150px]" style={{ background: 'var(--bg2)' }}>
        <div className="flex flex-col items-center justify-center h-[110px] text-xs gap-2 text-center" style={{ color: 'var(--t3)' }}>
          <div className="text-[26px] opacity-35">{emptyIcon}</div>
          <div>{emptyText}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-bd p-4.5 min-h-[150px]" style={{ background: 'var(--bg2)' }}>
      <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-bd">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
          {scientistIcon}
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium">{scientistName}</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>{scientistRole}</div>
        </div>
        {response && <SpeakButton text={response} voiceId={voiceId} />}
      </div>
      {isLoading && !response ? (
        <div className="flex items-center gap-2.5 py-1.5">
          <LoadingDots />
          <span className="text-xs" style={{ color: 'var(--t2)' }}>Physics laws apply kar raha hoon...</span>
        </div>
      ) : (
        <div
          className="resp-body text-[13px] leading-[1.85]"
          dangerouslySetInnerHTML={{ __html: escapeHtml(response) }}
        />
      )}
    </div>
  );
}
