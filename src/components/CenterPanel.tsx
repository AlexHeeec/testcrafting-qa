
import { TestCase } from "@/types";
import TestCaseCard from "./TestCaseCard";
import { Progress } from "@/components/ui/progress";
import { Activity, FileText } from "lucide-react";

interface CenterPanelProps {
  testCases: TestCase[];
  isProcessing: boolean;
}

const CenterPanel = ({ testCases, isProcessing }: CenterPanelProps) => {
  return (
    <div className="p-6 panel overflow-y-auto">
      <h2 className="panel-header">Test Case Preview</h2>
      
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4 animate-pulse">
          <Activity className="h-10 w-10 text-primary" />
          <h3 className="text-lg font-medium">Generating Test Cases...</h3>
          <Progress value={45} className="w-64" />
          <p className="text-sm text-muted-foreground">
            Our AI is analyzing your requirements and creating comprehensive test cases.
          </p>
        </div>
      ) : testCases.length > 0 ? (
        <div className="space-y-6">
          {testCases.map((testCase) => (
            <TestCaseCard key={testCase.id} testCase={testCase} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
          <div className="h-24 w-24 rounded-full bg-muted/30 flex items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No Test Cases Yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Upload a requirements document or enter text, then click "Generate Test Cases" to create comprehensive test cases.
          </p>
        </div>
      )}
    </div>
  );
};

export default CenterPanel;
