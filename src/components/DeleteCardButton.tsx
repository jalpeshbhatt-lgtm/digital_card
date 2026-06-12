"use client";

export default function DeleteCardButton({
  cardId,
}: {
  cardId: string;
}) {
  async function handleDelete() {
    const confirmed = confirm(
      "Delete this card?"
    );

    if (!confirmed) return;

    await fetch(`/api/cards/${cardId}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
}