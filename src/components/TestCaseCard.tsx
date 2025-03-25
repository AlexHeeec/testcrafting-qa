
import { TestCase } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface TestCaseCardProps {
  testCase: TestCase;
}

const TestCaseCard = ({ testCase }: TestCaseCardProps) => {
  // Function to get the appropriate badge color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="test-case-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{testCase.name}</CardTitle>
          <Badge className={`${getPriorityColor(testCase.priority)} ml-2`}>
            {testCase.priority}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Preconditions</h4>
            <p className="text-sm bg-secondary/40 p-2 rounded-md">{testCase.preconditions}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Steps</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm bg-secondary/40 p-2 rounded-md">
              {testCase.steps.map((step, index) => (
                <li key={index} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Expected Results</h4>
            <div className="flex items-start space-x-2 text-sm bg-secondary/40 p-2 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <p>{testCase.expected}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCaseCard;
