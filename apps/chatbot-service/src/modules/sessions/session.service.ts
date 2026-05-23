import { SessionRepository } from './session.repository';
export class SessionService {
  private repo = new SessionRepository();
  public async getSession(id: string) {
    return this.repo.get(id);
  }
}
