import { useState } from "react";
import { Home, Globe, Users, Settings } from "lucide-react";

export default function Homepage() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Ahabanza", icon: <Home size={20} />, key: "Ahabanza" },
    { name: "imigani migufi/imigenurano", icon: <Globe size={20} />, key: "imigani migufi" },
    { name: "ibisakuzo", icon: <Users size={20} />, key: "ibisakuzo" },
    { name: "inkuru n'imigani miremire", icon: <Settings size={20} />, key: "imigani miremire" },
    { name: "insigamigani", icon: <Settings size={20} />, key: "insigamigani" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white/80 backdrop-blur-md shadow-md px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.svg"
            alt="My Culture Logo"
            className="w-12 h-12 rounded-full shadow-md border border-gray-200"
          />
          <h1 className="text-3xl font-bold text-purple-700 tracking-wide">
            umuco wacu
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center bg-white/70 backdrop-blur-md border-b shadow-sm">
        <ul className="flex space-x-6 py-3">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActive(item.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    active === item.name
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white/80 rounded-2xl shadow-xl p-6 text-center">
          {active === "home" && (
            <h2 className="text-xl font-semibold text-gray-800">
              🌸 Welcome to <span className="text-purple-600">My Culture</span>!
            </h2>
          )}
          {active === "culture" && (
            <p className="text-lg text-gray-700">
              Discover cultural insights and traditions 💡
            </p>
          )}
          {active === "community" && (
            <p className="text-lg text-gray-700">
              Connect with amazing people around the world 🌍
            </p>
          )}
          {active === "settings" && (
            <p className="text-lg text-gray-700">
              Manage your preferences and personalize your experience ⚙️
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
