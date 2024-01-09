/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/lib/actions/auth";
import Link from "next/link";

export default function RegisterForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(signUp, initialState);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8">
        <h1 className={` text-2xl`}>Inscrivez-vous</h1>
        <p className="mb-4 text-gray-500">pour continuer avec NextRoom</p>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Entrez votre adresse email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.email ? (
              <div
                id="name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.email.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
                minLength={8}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.password ? (
              <div
                id="name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.password.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <RegisterButton />
        <div className="flex h-15 items-end space-x-1">
          {state.message ? (
            <div
              id="error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              <p>{state.message}</p>
            </div>
          ) : null}
        </div>
        <p className="mt-2 text-sm">
          Vous avez déjà un compte ?
          <Link href="/sign-in" className="hover:text-slate-500">
            {" "}
            Connectez-vous
          </Link>
        </p>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      S'inscrire <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
