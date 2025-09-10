import { headers } from 'next/headers';
import { auth } from '../auth';

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

export async function signOut() {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
}
