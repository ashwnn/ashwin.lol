"use client";

import { useSearchParams } from 'next/navigation';
import dynamic from "next/dynamic";
import { ReferralConfig } from "@/types";
import referrals from "@/data/referrals";

const ReferralAnimation = dynamic(() => import('./ReferralAnimation'), {
  ssr: false
});

export default function ReferralAnimationWrapper() {
  const searchParams = useSearchParams();
  const referralParam = searchParams.get('r');

  let referralSource: ReferralConfig = referrals.default;

  if (referralParam) {
    const referralKey = referralParam.toLowerCase();
    referralSource = referrals[referralKey] || referrals.default;
  }

  return <ReferralAnimation referral={referralParam ? referralSource : null} />;
}