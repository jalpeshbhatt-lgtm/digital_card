"use client";

import { useState } from "react";
export default function LeadForm({
  cardId,
  primaryColor = "#EAB308",
}: {
  cardId: string;
  primaryColor?: string;
}) {
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId,
        name,
        mobile,
        message,
      }),
    });

    alert("Lead submitted successfully!");

    setName("");
    setMobile("");
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 border rounded-lg"
    >
  <h3
  className="text-center font-bold text-lg mb-6"
  style={{ color: primaryColor }}
>
  Contact Us
</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

 <button
  type="submit"
  className="w-full text-white py-3 rounded-lg font-semibold"
  style={{
    backgroundColor: primaryColor,
  }}
>
  Submit Enquiry
</button>
   </form>
  );
}