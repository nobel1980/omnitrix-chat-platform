import { IntentRepository } from './intent.repository';
export class IntentService {
  private repo = new IntentRepository();
  public async track(intent: string) {
    return this.repo.logIntent(intent);
  }
}
