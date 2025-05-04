import { useParams } from "react-router-dom";
import { UseGetAllJuz } from "../services/UseGetEquran";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  indoensiaText?: string;
  audio: string;
  audioSecondary?: string;
  latin?: string;
  surah?: {
    number: number;
    name: string;
    englishName: string;
  };
}
const DetailJuz = () => {
  const { juzNumber } = useParams();
  const { data: detailJuz, isLoading } = UseGetAllJuz({
    juzPage: Number(juzNumber),
    edition: "ar.alafasy",
  });
  const { data: indoensianTextJuz, isLoading: loadingIndonesian } =
    UseGetAllJuz({
      juzPage: Number(juzNumber),
      edition: "id.indonesian",
    });
  const { data: LatinTextJuz, isLoading: loadingLatin } = UseGetAllJuz({
    juzPage: Number(juzNumber),
    edition: "en.transliteration",
  });

  if (isLoading || !detailJuz || loadingIndonesian || loadingLatin) {
    return (
      <div className="text-center py-10 min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const resultDetailJuz = detailJuz?.ayahs?.map((ayah: Ayah) => {
    // Cari teks terjemahan berdasarkan `numberInSurah` indoensia
    const indoensiaText = indoensianTextJuz?.ayahs?.find(
      (n: any) => n.numberInSurah === ayah.numberInSurah
    );
    // Cari teks terjemahan berdasarkan `numberInSurah` latin
    const latinText = LatinTextJuz?.ayahs?.find(
      (n: any) => n.numberInSurah === ayah.numberInSurah
    );

    return {
      ...ayah,
      indoensiaText: indoensiaText?.text,
      latin: latinText?.text,
    };
  });

  // console.log(resultDetailJuz);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mt-16 text-white">
        Juz {juzNumber}
      </h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {resultDetailJuz?.map((ayah: Ayah) => (
          <div
            key={ayah.number}
            className="bg-green-200 hover:-translate-y-1 transition-transform duration-300 p-4 rounded-lg  flex-col space-y-2 border-4 border-white/70 shadow-[8px_8px_0px_rgba(255,255,255,1)]  shadow-green-200"
          >
            <div className="flex justify-between">
              <span className="text-gray-600">{ayah.numberInSurah}</span>
              <p className="text-right text-xl font-arabic font-bold">
                {ayah.surah?.englishName}
              </p>
            </div>
            <p className="text-right text-xl font-arabic font-bold">
              {ayah.text}
            </p>
            <p className="text-right text-xl font-arabic font-semibold italic">
              {ayah.latin}
            </p>
            <p className="text-left italic font-arabic text-gray-600 py-4 text-sm md:text-xl ">
              {ayah.indoensiaText}
            </p>
            <audio controls>
              <source
                src={ayah.audio || ayah.audioSecondary}
                type="audio/mpeg"
              />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailJuz;
