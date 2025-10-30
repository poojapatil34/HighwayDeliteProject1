import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  useEffect(() => {
    API.get(`/experiences/${id}`).then(res => setExperience(res.data));
  }, [id]);

  return (
    <div className="p-6">
      {experience && (
        <div className="max-w-3xl mx-auto">
          <img src={experience.image} className="w-full rounded-lg mb-6" />
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
          <p className="text-gray-700 mb-4">{experience.description}</p>
          <div className="grid grid-cols-2 gap-4">
            {experience.slots.map((slot: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedSlot(slot)}
                disabled={!slot.available}
                className={`p-3 border rounded-lg ${
                  slot.available
                    ? "hover:bg-blue-500 hover:text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {slot.date} - {slot.time}
              </button>
            ))}
          </div>
          {selectedSlot && (
            <button
              onClick={() => navigate("/checkout", { state: { experience, slot: selectedSlot } })}
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
