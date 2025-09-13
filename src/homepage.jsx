import { useState } from "react";
import {
  Home,
  BookOpen,
  Puzzle,
  ScrollText,
  Quote,
  Menu,
  X,
  Bookmark,
} from "lucide-react";
import Ibisakuzo from "./pages/ibisakuzo";
import Imiganimigufi from "./pages/imigani-migufi";
import Imiganimiremire from "./pages/imigani-miremire"
import Insigamigani from "./pages/insigamigani"
import Ahabanza from "./pages/dashboard";
import Ikeshamvugo from "./pages/ikeshamvugo";

export default function Homepage() {
  const [active, setActive] = useState("Ahabanza");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Ahabanza", icon: <Home size={20} />, key: "Ahabanza" },
    {name: "Imigani migufi / Imigenurano",icon: <Quote size={20} />,key: "imigani-migufi",
    },
    { name: "Ibisakuzo", icon: <Puzzle size={20} />, key: "ibisakuzo" 
    },
    { name: "ikeshamvugo", icon: <Bookmark size={20} />, key: "ikeshamvugo" 
    },
    {name: "Inkuru n'Imigani miremire",icon: <ScrollText size={20} />,key: "imigani-miremire",
    },
    { name: "Insigamigani", icon: <BookOpen size={20} />, key: "insigamigani" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white/80 backdrop-blur-md shadow-md px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.svg"
            alt="Umuco Logo"
            className="w-12 h-12 rounded-full shadow-md border border-gray-200"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-purple-700 tracking-wide">
            <h2 className="text-2xl md:text-5xl font-bold text-center text-purple-700 mb-4">
          Umuco<span className="text-green-600">Wacu</span>
        </h2>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-purple-700 hover:bg-purple-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-md border-b shadow-sm">
        <ul
          className={`flex flex-col md:flex-row md:space-x-6 py-3 transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.key} className="text-center md:text-left">
              <button
                onClick={() => {
                  setActive(item.key);
                  setMenuOpen(false); // close on mobile after click
                }}
                className={`flex items-center justify-center md:justify-start space-x-2 w-full md:w-auto px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    active === item.key
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
      <main className="flex-1 p-2">
        <div className="bg-white/80 rounded-2xl shadow-xl p-2 text-center">
          
          {active === "Ahabanza" && <Ahabanza/>}
          {active === "imigani-migufi" && <Imiganimigufi/>}
          {active === "ibisakuzo" && <Ibisakuzo/>}
          {active === "ikeshamvugo" && <Ikeshamvugo/>}
          {active === "imigani-miremire" && <Imiganimiremire/>}
          {active === "insigamigani" && <Insigamigani/>}

        </div>
      </main>
    </div>
  );
}
