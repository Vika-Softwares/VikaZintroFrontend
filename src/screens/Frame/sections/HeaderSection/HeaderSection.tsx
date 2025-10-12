import { BellIcon } from "lucide-react";
import React from "react";
import { NavigationTabs } from "../../../../components/navigation/NavigationTabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { NavigationItem } from "../../../../types";

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "cadastros", label: "Cadastros", path: "/cadastros" },
  { id: "financeiro", label: "Financeiro", path: "/financeiro" },
];

interface HeaderSectionProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <header className="flex items-center justify-between pt-3 pb-[13px] px-10 bg-white border-b border-solid shadow-[0px_1px_2px_#0000000d] w-full">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <img src="/logo_zyntro.png" alt="Vika Zyntro" className="w-8 h-8" />
        </div>

        <NavigationTabs
          items={navigationItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      <div className="flex items-center justify-end flex-1">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
          >
            <BellIcon className="w-6 h-6" />
          </Button>

          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
