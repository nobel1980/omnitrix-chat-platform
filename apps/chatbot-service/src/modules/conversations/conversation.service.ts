import { ConversationRepository } from './conversation.repository';
export class ConversationService {
  private repo = new ConversationRepository();
  public async getDetails(id: string) {
    return this.repo.findById(id);
  }
}
