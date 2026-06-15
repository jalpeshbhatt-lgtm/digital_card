
"use client";

import { useRouter } from "next/navigation";

export default function DeleteCardButton({
  cardId,
}: {
  cardId: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this card?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/cards/${cardId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      alert("Card deleted successfully");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to delete card");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-5
        py-2.5
        rounded-xl
        font-medium
      "
    >
      Delete
    </button>
  );
}
