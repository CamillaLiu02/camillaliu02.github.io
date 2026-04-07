'use client';

import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <HiArrowLeft />
      <span>Back</span>
    </button>
  );
}
