import { useState } from "react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

export default function RowMenu({ onEdit, onRemove }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-[#2e2e33] text-gray-400 hover:text-white"
      >
        <MoreHorizontal size={18} />
      </button>

      
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg bg-[#27272A] shadow-lg border border-black/20 z-20">
          <div className="flex flex-col">
            
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#A1A1AA] hover:bg-[#323235] rounded-md"
            >
              <Pencil size={15} className="text-[#A1A1AA]" />
              Edit Holdings
            </button>

            
            <div className="h-px bg-[#212124] my-1" />

            
            <button
              onClick={() => {
                onRemove();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#FDA4AF] hover:bg-[#323235] rounded-md"
            >
              <Trash size={15} className="text-[#FB7185]" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
