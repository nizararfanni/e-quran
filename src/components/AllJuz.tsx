import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sekeltoncard: React.FC = () => {
  return (
    <div className="p-6  flex items-center space-x-4 rounded-lg bg-gray-300 animate-pulse">
      <div className="bg-gray-400 h-6 w-1/4 rounded"></div>
      <div className="bg-gray-400 h-6 w-3/4 rounded"></div>
    </div>
  );
};

const AllJuz: React.FC = () => {
  const [juzNumber, setJuzNumber] = useState<number[] | null>(null);

  useEffect(() => {
    const fetchJuzNumbers = async () => {
      let numbers = [];
      for (let i = 1; i <= 30; i++) {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/juz/${i}/quran-uthmani`
        );

        if (response.data) {
          numbers.push(response.data.data.number);
        }
      }
      setJuzNumber(numbers);
    };

    fetchJuzNumbers();
  }, []);
  // console.log(juzNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center md:mt-16 text-white">Daftar Juz</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {juzNumber
          ? // tampilkan semua juz
            juzNumber.map((juz, index) => (
              <Link
                key={index}
                to={`/juz/${juz}`}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg  hover:-translate-y-1  transition-transform duration-300"  
              >
                <h2 className="text-lg font-semibold">Juz {juz}</h2>
              </Link>
            ))
          : Array.from({ length: 15 }).map((_, index) => (
              <Sekeltoncard key={index} />
            ))}
      </div>
    </div>
  );
};

export default AllJuz;
