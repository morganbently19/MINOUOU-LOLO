import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function AdminFloatingActionButton() {
  return (
    <div className="fixed bottom-20 left-4 md:hidden z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            onClick={() => alert("سيتم فتح نافذة إضافة عميل جديد")}
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة عميل جديد
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert("سيتم فتح نافذة إضافة حساب جديد")}
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة حساب جديد
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert("سيتم فتح نافذة إنشاء تقرير جديد")}
          >
            <Plus className="ml-2 h-4 w-4" />
            إنشاء تقرير
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
