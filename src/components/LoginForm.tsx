import { useState } from "react";
import { auth } from "../services/firesore-config"; // Pastikan ini sudah benar
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Untuk redirect setelah login

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login berhasil!", userCredential.user);
      navigate("/home");
    } catch (err: any) {
      const errorCode = err.code;

      // Tentukan pesan error custom
      switch (errorCode) {
        case "auth/user-not-found":
          setError("Email tidak terdaftar. Silakan buat akun terlebih dahulu.");
          break;
        case "auth/wrong-password":
          setError("Password salah. Coba lagi atau reset password.");
          break;
        case "auth/invalid-email":
          setError("Format email tidak valid. Masukkan email yang benar.");
          break;
        case "auth/invalid-credential":
          setError("Email atau password salah. Silakan coba lagi.");
          break;
        default:
          setError("Terjadi kesalahan, coba lagi nanti.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightGreen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Login E-Quran
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
          <div className="flex items-center justify-between mt-4">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="font-bold text-blue-500 hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
