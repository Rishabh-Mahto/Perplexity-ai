import {
  Home,
  Globe,
  PlusCircle,
  Search,
  User,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-[70px] bg-[#f0f0e9] h-screen flex flex-col items-center justify-between py-3">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="mt-1 mb-1">
          <Sparkles size={25} color="#0c1a19" />
        </div>
        <div className="rounded-full bg-[#e6e6df] w-8 h-8 flex items-center justify-center mb-1 cursor-pointer hover:bg-gray-200">
          <PlusCircle size={20} color="#0c1a19" />
        </div>
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="flex flex-col items-center w-full">
            <div className="bg-[#e6e6df] rounded-lg w-8 h-8 flex items-center justify-center mb-1">
              <Search size={20} color="#0c1a19" />
            </div>
            <span className="text-[#0c1a19] text-[11px] font-semibold mb-2">
              Home
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="rounded-lg w-8 h-8 flex items-center justify-center mb-1">
              <Globe size={20} color="#444" />
            </div>
            <span className="text-[#444] text-[11px] mb-2">Discover</span>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="rounded-lg w-8 h-8 flex items-center justify-center mb-1">
              <LayoutDashboard size={16} color="#444" />
            </div>
            <span className="text-[#444] text-[11px] mb-2">Spaces</span>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col items-center mb-1">
        <div className="w-8 h-8 rounded-full bg-[#21867a] flex items-center justify-center text-white text-sm font-semibold mb-1">
          N
        </div>
        <span className="text-[#444] text-[11px]">Account</span>
      </div>
    </div>
  );
}
