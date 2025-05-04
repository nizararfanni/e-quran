import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import { UseSearchKeyword } from "../services/UseGetEquran";
import { useEffect, useState } from "react";
import { auth} from "../services/firesore-config";
import { onAuthStateChanged } from "firebase/auth";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState("");
  const { data, isLoading } = UseSearchKeyword(searchQuery);
  const [getUserName, setGetUserName] = useState("");

  const handleOnchange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchCLick = () => {
    setSearchQuery("");
  };
  useEffect(() => {
    const username = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGetUserName(user.displayName || user.email || "");
      } else {
        setGetUserName("");
      }
    });
    return () => username();
  }, []);
  if (isLoading) {
    <p>Loading</p>;
  }

  return (
    <>
      {/* Navbar untuk desktop */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 shadow-lg rounded-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 bg-green-200/50 z-50 backdrop-blur-md rounded-md">
          <h1 className="text-2xl font-bold text-primary text-center tracking-tight text-white">
            E-Qur'an
          </h1>
          <div className="flex space-x-8 text-black">
            <Link
              to="/"
              className={
                isActive === "Ayahs" ? "text-blue-400 italic" : "text-black"
              }
              onClick={() => setIsActive("Ayahs")}
            >
              Ayahs
            </Link>
            <Link
              to="/juz"
              className={
                isActive === "juz" ? "text-blue-400 italic" : "text-black"
              }
              onClick={() => setIsActive("juz")}
            >
              Juz
            </Link>
            <Link
              to="/about"
              className={
                isActive === "about" ? "text-blue-400 italic" : "text-black"
              }
              onClick={() => setIsActive("about")}
            >
              About
            </Link>
            <Link
              to="/login"
              className={
                isActive === "login" ? "text-blue-400 italic" : "text-black"
              }
              onClick={() => setIsActive("login")}
            >
              Login
            </Link>
          </div>
          <div className="flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleOnchange}
              placeholder=" Search the text of the Quran"
              className="p-2 rounded-l-md border focus:outline-none ring-white focus:ring-2"
            />
            <button
              type="submit"
              className="p-2 bg-primary text-white rounded-r-md hover:bg-secondary transition-colors duration-200 "
            >
              🔍
            </button>
            <p>{getUserName}</p>
            {/* result search */}
            <div className="absolute top-12 left-0 right-0 p-2 text-center gap-3 flex flex-col h-[300px] ">
              {isLoading ? (
                <p>Loading...</p>
              ) : searchQuery && data ? (
                <List
                  height={400}
                  itemCount={data.length}
                  itemSize={100}
                  width="100%"
                  className="overflow-y-scroll "
                >
                  {({ index, style }) => {
                    console.log("Rendering Item:", data[index]);
                    return (
                      <Link
                        to={`/surah/${data[index]?.surah?.number}`}
                        onClick={handleSearchCLick}
                        style={style}
                        className="bg-green-500/50 p-5 flex flex-col justify-center items-center gap-3 text-white "
                      >
                        <p>Name Surah: {data[index]?.surah?.englishName}</p>
                        <p>Ayat: {data[index]?.numberInSurah}</p>
                      </Link>
                    );
                  }}
                </List>
              ) : searchQuery ? (
                <p>Search the text of the Quran</p>
              ) : null}
            </div>
          </div>
        </div>
      </nav>{" "}
      {/* Navbar untuk mobile */}
      <nav className="block md:hidden fixed bottom-0 left-0 right-0 shadow-lg bg-green-200/50 z-50 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-around py-4 px-6 text-black">
          <h1 className="text-2xl font-bold text-primary text-center tracking-tight text-black">
            E-Qur'an
          </h1>
          <Link
            to="/"
            className={
              isActive === "Ayahs" ? "text-blue-400 italic" : "text-black"
            }
            onClick={() => setIsActive("Ayahs")}
          >
            {" "}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Ayahs</span>
          </Link>
          <Link
            to="/juz"
            className={
              isActive === "Juz" ? "text-blue-400 italic" : "text-black"
            }
            onClick={() => setIsActive("Juz")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Juz
          </Link>
          <Link
            to="/about"
            className={
              isActive === "about"
                ? "text-blue-400 italic"
                : "text-black flex justify-center items-center flex-col"
            }
            onClick={() => setIsActive("about")}
          >
            {" "}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            About
          </Link>
          <Link
            to="/login"
            className={
              isActive === "login"
                ? "text-blue-400 italic"
                : "text-black flex justify-center items-center flex-col"
            }
            onClick={() => setIsActive("login")}
          >
            {" "}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
