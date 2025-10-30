import { useEffect, useState } from "react";
import API from "../api";
import ExperienceCard from "../components/ExperienceCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    API.get("/experiences").then(res => setExperiences(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {experiences.map((exp: any) => (
        <Link key={exp._id} to={`/details/${exp._id}`}>
          <ExperienceCard exp={exp} />
        </Link>
      ))}
    </div>
  );
}
