import React from "react";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { ModernCard } from "../../../../components/ui/ModernCard";
import { FinancialData } from "../../../../types";
import { formatCurrency } from "../../../../utils/formatters";

interface FinancialOverviewSectionProps {
  data: FinancialData;
}

export const FinancialOverviewSection: React.FC<FinancialOverviewSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <ModernCard
        title="Total a Receber"
        value={formatCurrency(data.totalReceivable)}
        change="+12.5%"
        changeType="positive"
        icon={TrendingUp}
        iconColor="text-white"
        gradient="bg-gradient-to-br from-green-500 to-emerald-600"
      />
      
      <ModernCard
        title="Total a Pagar"
        value={formatCurrency(data.totalPayable)}
        change="-3.2%"
        changeType="positive"
        icon={TrendingDown}
        iconColor="text-white"
        gradient="bg-gradient-to-br from-red-500 to-pink-600"
      />
      
      <ModernCard
        title="Saldo"
        value={formatCurrency(data.balance)}
        change="+8.1%"
        changeType="positive"
        icon={DollarSign}
        iconColor="text-white"
        gradient="bg-gradient-to-br from-blue-500 to-purple-600"
      />
      
      <ModernCard
        title="Clientes"
        value={data.clients.toString()}
        change="+5"
        changeType="positive"
        icon={Users}
        iconColor="text-white"
        gradient="bg-gradient-to-br from-orange-500 to-yellow-600"
      />
    </div>
  );
};
