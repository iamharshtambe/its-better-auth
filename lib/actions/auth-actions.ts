'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';
import { redirect } from 'next/navigation';

export async function signUp(name: string, email: string, password: string) {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: '/dashboard',
    },
  });

  return result;
}

export async function signIn(email: string, password: string) {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: '/dashboard',
    },
  });

  return result;
}

export async function signInSocial(provider: 'google') {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: '/dashboard',
    },
  });

  if (url) {
    redirect(url);
  }
}

export async function signOut() {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
}
