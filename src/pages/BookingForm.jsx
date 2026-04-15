import { useBookingForm } from "../hook/useBookingForm";

export default function BookingForm() {
  const {
    cabins, guests, loading, submitting,
    form, handleChange, handleSubmit,
    selectedCabin, numNights, cabinPrice, breakfastPrice, totalPrice,
  } = useBookingForm();

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>🏨 Đặt phòng mới</h2>

      {/* Chọn cabin */}
      <label>Chọn phòng</label>
      <select name="cabinId" value={form.cabinId} onChange={handleChange} required>
        <option value="">-- Chọn phòng --</option>
        {cabins.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} — ${c.regularPrice}/đêm (tối đa {c.maxCapacity} khách)
          </option>
        ))}
      </select>

      {/* Chọn khách */}
      <label>Khách hàng</label>
      <select name="guestId" value={form.guestId} onChange={handleChange} required>
        <option value="">-- Chọn khách --</option>
        {guests.map((g) => (
          <option key={g.id} value={g.id}>
            {g.fullName} ({g.email})
          </option>
        ))}
      </select>

      {/* Ngày */}
      <label>Ngày nhận phòng</label>
      <input type="date" name="startDate" value={form.startDate}
        onChange={handleChange} required />

      <label>Ngày trả phòng</label>
      <input type="date" name="endDate" value={form.endDate}
        onChange={handleChange} required />

      {/* Số khách */}
      <label>Số khách</label>
      <input type="number" name="numGuests" value={form.numGuests}
        min={1} max={selectedCabin?.maxCapacity || 10}
        onChange={handleChange} required />

      {/* Breakfast */}
      <label>
        <input type="checkbox" name="hasBreakfast"
          checked={form.hasBreakfast} onChange={handleChange} />
        {" "}Bao gồm bữa sáng
      </label>

      {/* Ghi chú */}
      <label>Ghi chú</label>
      <textarea name="observations" value={form.observations}
        onChange={handleChange} />

      {/* Tóm tắt giá */}
      {numNights > 0 && (
        <div style={{ background: "#f0f4ff", padding: "12px", borderRadius: "8px" }}>
          <p>🌙 Số đêm: <strong>{numNights}</strong></p>
          <p>🛖 Tiền phòng: <strong>${cabinPrice}</strong></p>
          {form.hasBreakfast && <p>🍳 Bữa sáng: <strong>${breakfastPrice}</strong></p>}
          <p>💰 Tổng cộng: <strong>${totalPrice}</strong></p>
        </div>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Đang xử lý..." : "Xác nhận đặt phòng"}
      </button>
    </form>
  );
}