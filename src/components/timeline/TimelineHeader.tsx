'use client';

import { memo } from 'react';
import { LightningIcon } from '@/components/icons';

export const TimelineHeader = memo(function TimelineHeader() {
  return (
    <div className="relative flex items-center justify-center mb-8">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30" aria-hidden="true">
        <LightningIcon className="w-4 h-4 text-white" />
      </div>
      <div className="ml-4 text-sm text-neutral-400">
        The journey continues...
      </div>
    </div>
  );
});
