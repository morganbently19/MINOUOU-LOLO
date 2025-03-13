import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function FloatingActionButton() {
  return (
    <div className="fixed bottom-20 left-4 md:hidden z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <Plus className="ml-2 h-4 w-4" />
            إضافة حساب جديد
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="ml-2 h-4 w-4" />
            تحويل جديد
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus className="ml-2 h-4 w-4" />
            هدف ادخار جديد
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
