
export interface TestCase {
  id: string;
  name: string;
  preconditions: string;
  steps: string[];
  expected: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  testCaseCount: number;
}
