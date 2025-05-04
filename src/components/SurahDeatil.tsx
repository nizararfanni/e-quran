import React from "react";
import { useParams } from "react-router-dom";
import {
  UseGetDetailSurah,
  UseGetTranslation,
  UseGetVoiceSurah,
} from "../services/UseGetEquran";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  translation: string;
  audio: string;
  audioSecondary: string;
  latin: string;
}


const SurahDetail: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const { data: surah, isLoading: loading } = UseGetDetailSurah(Number(number));
  const { data: Audio, isLoading: loadingAudio } = UseGetVoiceSurah(
    Number(number)
  );
  const { data, isLoading, error } = UseGetTranslation({
    surah: Number(number),
    ts: "id.indonesian",
  });
  const { data: textLatin, isLoading: loadingAbjad } = UseGetTranslation({
    surah: Number(number),
    ts: "en.transliteration",
  });

  if (loading || !surah || isLoading || loadingAudio || loadingAbjad || error) {
    return (
      <div className="text-center py-10 min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const combinatedData = surah.ayahs.map((ayah: any) => {
    // Cari teks terjemahan berdasarkan `numberInSurah`
    const translate = data?.ayahs?.find(
      (t: any) => t.numberInSurah === ayah.numberInSurah
    );

    // Cari audio berdasarkan `numberInSurah`
    const audio = Audio?.find(
      (a: any) => a.numberInSurah === ayah.numberInSurah
    );

    //cari bahasa latin arab nya berdasarkan `numberInSurah`
    const latin = textLatin?.ayahs.find(
      (L: Ayah) => L.numberInSurah === ayah.numberInSurah
    );

    // Gabungkan data asli dengan terjemahan
    return {
      ...ayah,
      audio: audio
        ? audio.audio || audio.audioSecondary
        : "tidak ada audio nya",
      translation: translate ? translate.text : "tidak ada terjemahan",
      latin: latin ? latin.text : "tidak ada terjemahan",
    };
  });

  console.log(combinatedData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        {surah.number}. {surah.englishName} ({surah.name})
      </h1>
      <div className="space-y-4">
        {combinatedData.map((ayah: Ayah) => (
          <div
            key={ayah.number}
            className="bg-green-200 hover:-translate-y-1 transition-transform duration-300 p-4 rounded-lg  flex-col space-y-2 border-4 border-white/70 shadow-[8px_8px_0px_rgba(255,255,255,1)] "
          >
            <div className="flex justify-between">
              <span className="text-gray-600">{ayah.numberInSurah}</span>
              <span className="text-gray-600">{ayah.numberInSurah}</span>
            </div>
            <p className="text-right text-xl font-arabic font-bold">
              {ayah.text}
            </p>
            <p className="text-right text-xl font-arabic font-semibold italic">
              {ayah.latin}
            </p>
            <p className="text-left italic font-arabic text-gray-600 py-4 text-sm md:text-xl ">
              {ayah.translation}
            </p>
            <audio controls>
              <source src={ayah.audio} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetail;
