"use client";

import { useSearchParams } from 'next/navigation';
import dynamic from "next/dynamic";
import { ReferralSource } from "@/types";
import referrals from "@/data/refferals";

const ReferralAnimation = dynamic(() => import('./RefferalAnimation'), {
  ssr: false
});

export default function ReferralAnimationWrapper() {
  const searchParams = useSearchParams();
  const referralParam = searchParams.get('r');

  let referralSource: ReferralSource = referrals.default;

  if (referralParam) {
    const referralKey = referralParam.toLowerCase();
    referralSource = referrals[referralKey] || referrals.default;
  }

  return <ReferralAnimation referral={referralParam ? referralSource : null} />;
}