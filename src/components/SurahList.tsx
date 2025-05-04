import { Link } from "react-router-dom";
import { UseGetAllSurah } from "../services/UseGetEquran";
import { UseQueryResult } from "@tanstack/react-query";
import Navbar from "./Navbar";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
}

const SkeletonCard: React.FC = () => {
  return (
    <div className="card p-6 flex items-center space-x-4 rounded-lg bg-gray-300 animate-pulse">
      <div className="bg-gray-400 h-6 w-10 rounded"></div>
      <div className="flex-5 space-y-2">
        <div className="h-6 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

const SurahList: React.FC = () => {
  const {
    data: surahs,
    isLoading,
    error,
  }: UseQueryResult<Surah[], Error> = UseGetAllSurah();

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Terjadi kesalahan saat memuat data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:pt-20">
      <Navbar></Navbar>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Render skeleton jika masih loading
            Array.from({ length: 12 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : // Render daftar surah jika data sudah ada
            surahs?.map((surah) => (
              <Link
                key={surah.number}
                to={`/surah/${surah.number}`}
                className="card p-6 flex items-center space-x-4 rounded-lg bg-green-200 transform hover:-translate-y-1 transition-transform duration-300 px-8 py-4 border-4 border-white/70 shadow-[8px_8px_0px_rgba(255,255,255,1)] place-content-center"
              >
                <span className="text-secondary font-semibold text-lg">
                  {surah.number}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-primary">
                    {surah.englishName}{" "}
                    <span className="font-arabic">({surah.name})</span>
                  </h2>
                  <p className="text-gray-500">
                    {surah.englishNameTranslation} Ayahs
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default SurahList;
