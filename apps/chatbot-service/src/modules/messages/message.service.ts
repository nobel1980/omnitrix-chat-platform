import { MessageRepository } from './message.repository';
export class MessageService {
  private repo = new MessageRepository();
  public async persist(msg: any) {
    return this.repo.save(msg);
  }
}
