import { useState, useEffect } from "react";

import { fetchmedicines } from "../api";
import { Loader } from "../components";
import MedicineCard from "../components/MedicineCard";

const HomePage = () => {
  const [medicines, setmedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchmedicines()
      .then(({data}) => {
        setmedicines(data.medicines.reverse());
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="w-full max-w-7xl m-auto sm:px-32 py-20 flex gap-6 flex-wrap justify-center">
      
      {loading && <Loader />}

      {!loading && medicines.length === 0 && (
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">
          No Medicines to show!
        </h1>
      )}

      {medicines && medicines.map((medicine) => <MedicineCard medicine={medicine} key={medicine._id} /> )}
    </main>
  );
};

export default HomePage;
