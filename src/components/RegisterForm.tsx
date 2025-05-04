import { useState } from "react";
import { auth, db } from "../services/firesore-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  // Tambahkan state untuk email, password, dan nama
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Saving to Firestore: ", user.uid, name, email);

      await updateProfile(user, {
        displayName: name,
      });

      // Simpan data ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: name,
        email: email,
        createdAt: new Date(),
      });
      console.log("Data berhasil disimpan. Sekarang akan diarahkan ke /login");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      console.error("Error saat register:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightGreen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Register E-Quran
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-green-700">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Register
          </button>
          <div className="flex justify-between items-center ">
            <p>have an account?</p>
            <Link
              to={"/login"}
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
