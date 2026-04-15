import { useEffect, useState } from "react";
import { getCabins, getGuests, getSettings, createBooking } from "../services/hotelApi";

export function useBookingForm() {
  const [cabins, setCabins]     = useState([]);
  const [guests, setGuests]     = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    cabinId: "",
    guestId: "",
    startDate: "",
    endDate: "",
    numGuests: 1,
    observations: "",
    hasBreakfast: false,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [c, g, s] = await Promise.all([
          getCabins(),
          getGuests(),
          getSettings(),
        ]);
        setCabins(c);
        setGuests(g);
        setSettings(s);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Tính số đêm & tổng tiền
  const selectedCabin = cabins.find((c) => c.id === Number(form.cabinId));
  const numNights =
    form.startDate && form.endDate
      ? Math.max(
          0,
          Math.round(
            (new Date(form.endDate) - new Date(form.startDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const cabinPrice   = selectedCabin ? selectedCabin.regularPrice * numNights : 0;
  const breakfastPrice =
    form.hasBreakfast && settings
      ? settings.breakfastPrice * numNights * form.numGuests
      : 0;
  const totalPrice = cabinPrice + breakfastPrice;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createBooking({
        ...form,
        cabinId:    Number(form.cabinId),
        guestId:    Number(form.guestId),
        numGuests:  Number(form.numGuests),
        numNights,
        cabinPrice,
        extrasPrice: breakfastPrice,
        totalPrice,
        status: "unconfirmed",
        isPaid: false,
      });
      alert("✅ Đặt phòng thành công!");
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return {
    cabins, guests, settings, loading, submitting,
    form, handleChange, handleSubmit,
    selectedCabin, numNights, cabinPrice, breakfastPrice, totalPrice,
  };
}