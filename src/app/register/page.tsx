
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="w-full max-w-md rounded-3xl bg-[#071132] p-8 border border-white/10">
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
          />

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
