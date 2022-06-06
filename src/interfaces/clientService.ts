import { Client } from '../types/client';

export interface ClientService {
  getClients(organizationId: number): Promise<Client[]>;
  createClient(client: Client): Promise<Client>;
  updateClient(client: Partial<Client>): Promise<Client>;
  deleteClient(id: number): Promise<void>;
}
