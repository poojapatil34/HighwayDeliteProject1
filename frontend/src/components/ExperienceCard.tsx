export default function ExperienceCard({ exp }: any) {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white hover:scale-105 transition">
      <img src={exp.image} alt={exp.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{exp.title}</h2>
        <p className="text-gray-600">{exp.location}</p>
        <p className="font-bold mt-2">₹{exp.price}</p>
      </div>
    </div>
  );
}
