
import { HistoryItem as HistoryItemType } from "@/types";
import { FileText, Calendar } from "lucide-react";

interface HistoryItemProps {
  item: HistoryItemType;
  onClick: () => void;
}

const HistoryItem = ({ item, onClick }: HistoryItemProps) => {
  return (
    <div 
      className="p-3 border rounded-md hover:border-primary/50 hover:bg-secondary/40 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium truncate">{item.title}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{item.date}</span>
        </div>
        <div className="flex items-center">
          <FileText className="h-3 w-3 mr-1" />
          <span>{item.testCaseCount} tests</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
