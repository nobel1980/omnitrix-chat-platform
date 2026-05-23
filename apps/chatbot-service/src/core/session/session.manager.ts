export class SessionManager {
  public async retrieve(id: string) {
    return { id, active: true };
  }
}
