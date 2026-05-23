export interface Step {
  id: string;
  type: string;
  data: any;
}
export interface Workflow {
  id: string;
  steps: Step[];
}
