'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useReducer } from 'react';

interface ForgotPasswordState {
  email: string;
  password: string;
  code: string;
  successfulCreation: boolean;
  loading: boolean;
}

type ForgotPasswordAction = 
  | { type: 'SET_FIELD'; field: keyof ForgotPasswordState; value: string | boolean }
  | { type: 'SUCCESSFUL_CREATION' };

const initialState: ForgotPasswordState = {
  email: '',
  password: '',
  code: '',
  successfulCreation: false,
  loading: false,
};

function formReducer(state: ForgotPasswordState, action: ForgotPasswordAction): ForgotPasswordState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SUCCESSFUL_CREATION':
      return { ...state, successfulCreation: true, loading: false };
    default:
      return state;
  }
}

const ForgotPassword = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, password, code, successfulCreation, loading } = state;

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) return null;

  // STEP 1: Send the Password Reset Code
  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_FIELD', field: 'loading', value: true });

    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      dispatch({ type: 'SUCCESSFUL_CREATION' });
      toast.success('Reset code sent to your email');
    } catch (err: any) {
      console.error('error', err.errors[0].longMessage);
      toast.error(err.errors[0].longMessage || "Invalid email address");
      dispatch({ type: 'SET_FIELD', field: 'loading', value: false });
    }
  };

  // STEP 2: Verify Code and Set New Password
  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_FIELD', field: 'loading', value: true });

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Password reset successfully!');
        router.push('/');
      } else {
        console.log(result);
        toast.error("Verification failed. Please try again.");
        dispatch({ type: 'SET_FIELD', field: 'loading', value: false });
      }
    } catch (err: any) {
      console.error('error', err.errors[0].longMessage);
      toast.error(err.errors[0].longMessage || "Something went wrong");
      dispatch({ type: 'SET_FIELD', field: 'loading', value: false });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/90 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="relative z-20 w-full max-w-sm bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {successfulCreation ? "Reset Password" : "Forgot Password?"}
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            {successfulCreation 
              ? "Enter the code sent to your email" 
              : "Enter your email to receive a reset code"}
          </p>
        </div>

        {!successfulCreation ? (
          // FORM 1: SEND EMAIL
          <form onSubmit={create} className="px-8 pb-8 space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="w-3.5 h-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                  className="block w-full py-2.5 pl-9 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-sm font-bold text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all disabled:opacity-50">
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
            <div className="text-center mt-4">
               <Link href="/login" className="text-xs text-zinc-400 hover:text-white transition-colors">
                 Back to Login
               </Link>
            </div>
          </form>
        ) : (
          // FORM 2: VERIFY CODE & NEW PASSWORD
          <form onSubmit={reset} className="px-8 pb-8 space-y-4">
            
            {/* Code Input */}
            <div className="space-y-1">
              <label htmlFor="code" className="text-xs font-medium text-zinc-300 ml-1">Verification Code</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaKey className="w-3.5 h-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'code', value: e.target.value })}
                  className="block w-full py-2.5 pl-9 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:outline-none transition-all"
                  placeholder="Enter code"
                  required
                />
              </div>
            </div>

            {/* New Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-medium text-zinc-300 ml-1">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-3.5 h-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                  className="block w-full py-2.5 pl-9 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:outline-none transition-all"
                  placeholder="New secure password"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-2.5 text-sm font-bold text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all disabled:opacity-50">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;