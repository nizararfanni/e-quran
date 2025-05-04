import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// interface Surah {
//   number: number;
//   name: string;
//   englishName: string;
//   //   ayahs: Ayah[];
// }

interface translate {
  surah: number;
  ts: string;
}

export const UseGetTranslation = ({ surah, ts }: translate) => {
  return useQuery({
    queryKey: ["id", surah, ts],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surah}/${ts}`
      );
      return response.data.data;
    },
  });
};

export const UseGetAllSurah = () => {
  return useQuery({
    queryKey: ["surah"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.alquran.cloud/v1/quran/quran-uthmani"
      );
      return response.data.data.surahs;
    },
  });
};

//audio for surah
export const UseGetVoiceSurah = (surah: number) => {
  return useQuery({
    queryKey: ["audio", surah],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surah}/ar.alafasy`
      );
      return response.data.data.ayahs;
    },
  });
};

//detail surah
export const UseGetDetailSurah = (surah: number) => {
  return useQuery({
    queryKey: ["surah", surah],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surah}`
      );
      return response.data.data;
    },
  });
};

//search by keyword on quran

interface SearchResult {
  text: string;
  number: number;
  numberInSurah: number;
  surah: {
    number: number;
    englishName: string;
    name: string;
  };
}
export const UseSearchKeyword = (word: string) => {
  return useQuery<SearchResult[]>({
    queryKey: ["keyword", word],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/search/${word}/all/id`
      );
      return response.data.data.matches;
    },
    refetchInterval: 5000,
    enabled: !!word,
  });
};

interface Juz {
  number: number;
  ayahs: Ayah[];
  surahs: object;
  edition: object;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  arabText: string;
  audio: string;
  latin: string;
}
interface JuzParams {
  juzPage: number;
  edition: string;
}

export const UseGetAllJuz = ({ juzPage, edition }: JuzParams) => {
  return useQuery<Juz>({
    queryKey: ["juz", juzPage, edition],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/juz/${juzPage}/${edition}`
      );
      return response.data.data;
    },
  });
};
