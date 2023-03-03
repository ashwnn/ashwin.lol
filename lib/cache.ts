import fs from 'fs';
import path from 'path';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class Cache {
  private readonly cachePath: string;
  private data: Record<string, CacheEntry<any>>;

  constructor(cachePath: string) {
    this.cachePath = cachePath;
    this.data = this.loadCacheData();
  }

  private loadCacheData(): Record<string, CacheEntry<any>> {
    if (!fs.existsSync(this.cachePath)) {
      return {};
    }
    const data = fs.readFileSync(this.cachePath, 'utf-8');
    return data ? JSON.parse(data) : {};
  }

  private saveCacheData(): void {
    const dirName = path.dirname(this.cachePath);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
    fs.writeFileSync(this.cachePath, JSON.stringify(this.data));
  }

  public set<T>(key: string, data: T, ttl: number = 86400000): void {
    const timestamp = new Date().getTime();
    this.data[key] = { data, timestamp };
    this.saveCacheData();
  }

  public get<T>(key: string): T | undefined {
    const entry = this.data[key];
    if (!entry) {
      return undefined;
    }
    if (this.isExpired(entry.timestamp)) {
      delete this.data[key];
      this.saveCacheData();
      return undefined;
    }
    return entry.data as T;
  }

  public delete(key: string): void {
    delete this.data[key];
    this.saveCacheData();
  }

  public clear(): void {
    this.data = {};
    this.saveCacheData();
  }

  private isExpired(timestamp: number, ttl: number = 86400000): boolean {
    const now = new Date().getTime();
    const diff = now - timestamp;
    return diff > ttl;
  }
}

const cachePath = process.env.DEV ? path.resolve(process.cwd(), 'data', 'cache.json') : '/tmp/data/cache.json';
const cache = new Cache(cachePath);

export { cache };