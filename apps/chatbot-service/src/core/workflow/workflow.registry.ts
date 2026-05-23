import { Workflow } from './workflow.types';
export class WorkflowRegistry {
  private workflows = new Map<string, Workflow>();
  public get(id: string): Workflow | undefined {
    return this.workflows.get(id);
  }
}
