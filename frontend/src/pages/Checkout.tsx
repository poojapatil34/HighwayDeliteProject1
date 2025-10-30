import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

export default function Checkout() {
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", promoCode: "" });
  const [total, setTotal] = useState(state.experience.price);

  const applyPromo = async () => {
    try {
      const res = await API.post("/promo/validate", { code: form.promoCode });
      if (res.data.valid) {
        const discount = res.data.discount;
        setTotal(
          typeof discount === "number" && discount < 1
            ? total - total * discount
            : total - discount
        );
        alert("Promo applied!");
      }
    } catch {
      alert("Invalid promo code");
    }
  };

  const handleBooking = async () => {
    try {
      await API.post("/bookings", {
        experienceId: state.experience._id,
        name: form.name,
        email: form.email,
        date: state.slot.date,
        time: state.slot.time,
        promoCode: form.promoCode,
        totalPrice: total,
      });
      navigate("/result", { state: { success: true } });
    } catch {
      navigate("/result", { state: { success: false } });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-3"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Promo Code"
          className="border p-2 flex-1"
          onChange={e => setForm({ ...form, promoCode: e.target.value })}
        />
        <button onClick={applyPromo} className="bg-gray-800 text-white px-4 rounded">
          Apply
        </button>
      </div>
      <p className="text-lg font-bold mb-4">Total: ₹{total}</p>
      <button onClick={handleBooking} className="bg-blue-600 text-white px-6 py-2 rounded">
        Confirm Booking
      </button>
    </div>
  );
}
