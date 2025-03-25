
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, History, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import HistoryItem from "./HistoryItem";
import { HistoryItem as HistoryItemType } from "@/types";

interface LeftPanelProps {
  onFileUpload: (file: File) => void;
  onTextInput: (text: string) => void;
  currentFile: File | null;
  inputContent: string;
  onGenerate: () => void;
  isProcessing: boolean;
}

const LeftPanel = ({
  onFileUpload,
  onTextInput,
  currentFile,
  inputContent,
  onGenerate,
  isProcessing
}: LeftPanelProps) => {
  const [text, setText] = useState("");
  
  // Sample history items
  const historyItems: HistoryItemType[] = [
    {
      id: "1",
      title: "User Authentication Requirements",
      date: "2023-11-15",
      testCaseCount: 5
    },
    {
      id: "2",
      title: "Payment Processing Module",
      date: "2023-11-12",
      testCaseCount: 8
    },
    {
      id: "3",
      title: "User Profile Management",
      date: "2023-11-10",
      testCaseCount: 4
    }
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileType = file.type;
    
    // Check file type
    if (
      fileType !== "application/pdf" &&
      fileType !== "application/msword" &&
      fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast.error("Please upload a PDF or Word document");
      return;
    }
    
    onFileUpload(file);
    toast.success(`Uploaded: ${file.name}`);
  };
  
  const handleTextSubmit = () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }
    
    onTextInput(text);
    toast.success("Requirements text submitted");
  };
  
  const handleHistoryItemClick = (item: HistoryItemType) => {
    // In a real app, we would load the content and test cases for this history item
    toast.info(`Loading ${item.title}`);
  };

  return (
    <div className="p-4 panel overflow-y-auto">
      <h2 className="panel-header">Requirements</h2>
      
      <Tabs defaultValue="upload" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="text">
            <FileText className="h-4 w-4 mr-2" />
            Text
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="animate-fade-in">
          <Card>
            <CardContent className="pt-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports PDF, DOC, DOCX
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Select File</span>
                  </Button>
                </label>
              </div>
              
              {currentFile && (
                <div className="mt-4 p-3 border rounded-md bg-secondary/40 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm truncate">{currentFile.name}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="text" className="animate-fade-in">
          <Card>
            <CardContent className="pt-4">
              <Textarea
                placeholder="Paste or type your requirements here..."
                className="min-h-32 mb-4"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button onClick={handleTextSubmit} className="w-full">
                Submit Text
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {inputContent && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Current Input:</h3>
          <div className="p-3 text-sm border rounded-md bg-secondary/40 max-h-40 overflow-y-auto">
            {inputContent}
          </div>
          <Button 
            className="w-full mt-4 btn-primary" 
            onClick={onGenerate}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-2" />
                Generate Test Cases
              </>
            )}
          </Button>
        </div>
      )}
      
      <div>
        <h3 className="flex items-center text-sm font-medium mb-2">
          <History className="h-4 w-4 mr-2" />
          History
        </h3>
        <div className="space-y-2">
          {historyItems.map((item) => (
            <HistoryItem 
              key={item.id} 
              item={item}
              onClick={() => handleHistoryItemClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
