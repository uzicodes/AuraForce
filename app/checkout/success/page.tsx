import Link from "next/link";
import { FaCheckCircle, FaArrowRight, FaDumbbell } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Confetti / Decor Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center relative z-10 shadow-2xl">

        {/* Success Icon Animation */}
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <FaCheckCircle className="text-5xl text-emerald-500" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 font-heading">Payment Successful!</h1>
        <p className="text-zinc-400 mb-8 font-satoshi">
          Welcome to the team! Your membership is now active. A confirmation email has been sent to you.
        </p>

        <div className="space-y-3">
          <Link href="/profile" className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
            Go to Profile
          </Link>

          <Link href="/" className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3.5 rounded-xl transition-all">
            Back to Home
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PaymentSuccess;