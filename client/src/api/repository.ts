import type { AxiosInstance } from "axios";

/**
 * Generic base repository — receives an axios client via constructor (DI).
 * Domain repositories extend this and are instantiated through RepositoryFactory.
 */
export class BaseRepository<T, TCreate = unknown> {
  protected readonly client: AxiosInstance;
  protected readonly endpoint: string;

  constructor(client: AxiosInstance, endpoint: string) {
    this.client = client;
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    return this.client.get(this.endpoint);
  }

  async getOne(id: number): Promise<T> {
    return this.client.get(`${this.endpoint}/${id}`);
  }

  async create(payload: TCreate): Promise<T> {
    return this.client.post(this.endpoint, payload);
  }

  async delete(id: number): Promise<void> {
    return this.client.delete(`${this.endpoint}/${id}`);
  }
}
