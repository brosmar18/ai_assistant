import { atom } from 'jotai';

export const assistantIdAtom = atom<string>(process.env.NEXT_PUBLIC_ASSISTANT_ID || '');
export const userThreadAtom = atom<{ id: string } | null>(null);
