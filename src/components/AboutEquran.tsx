import React from "react";

const AboutEQuran: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Tentang E-Qur'an
        </h1>
        <p className="text-gray-700 text-lg">
          E-Qur'an adalah platform digital yang menyediakan akses mudah ke
          Al-Qur'an dengan berbagai edisi dan terjemahan. Kami berkomitmen untuk
          memberikan pengalaman membaca yang nyaman dan membantu pengguna
          memahami makna ayat-ayat suci dengan jelas.
        </p>
        <div className="mt-6">
        
        </div>
        <div className="mt-6">
          <p className="text-gray-600">
            Dengan fitur pencarian, audio, dan tampilan yang intuitif, E-Qur'an
            menjadi sahabat terbaik dalam perjalanan spiritual Anda. Semoga
            memberi manfaat bagi banyak orang.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutEQuran;
