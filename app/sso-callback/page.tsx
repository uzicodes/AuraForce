// app/sso-callback/page.tsx
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
  return <AuthenticateWithRedirectCallback />;
}
export const metadata = {
  title: 'Sso-callback',
  description: 'Sso-callback page',
};
