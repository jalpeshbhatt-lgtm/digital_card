export default function TemplateCard({
  title,
}: {
  title: string;
}) {
  return (
    <div className="border rounded p-4">
      <div className="h-40 bg-gray-200 rounded" />

      <h3 className="mt-3 font-semibold">
        {title}
      </h3>

      <button className="mt-2 border px-4 py-2 rounded">
        Select
      </button>
    </div>
  );
}