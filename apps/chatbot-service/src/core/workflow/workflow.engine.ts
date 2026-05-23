export class WorkflowEngine {
  public async execute(workflowId: string, context: any) {
    return { success: true, finished: true };
  }
}
