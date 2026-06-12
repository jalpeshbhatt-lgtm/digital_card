<div>
  <label className="block mb-2">Account Type</label>

  <select
    value={form.role}
    onChange={(e) =>
      setForm({
        ...form,
        role: e.target.value,
      })
    }
    className="w-full border p-2 rounded"
  >
    <option value="USER">User</option>
    <option value="RESELLER">Reseller</option>
  </select>
</div>
