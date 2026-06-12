export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Profile Settings
      </h1>

      <div className="mt-6 space-y-4">
        <input
          className="border p-3 w-full"
          placeholder="Name"
        />

        <input
          className="border p-3 w-full"
          placeholder="Email"
        />

        <button
          className="bg-black text-white px-5 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}