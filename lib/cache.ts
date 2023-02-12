import fs from 'fs';
import path from 'path';

const cachePath = path.resolve(process.cwd(), 'data', 'cache.json');

function cacheData(key : string, data: any) {

    if (fs.existsSync(cachePath)) {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        cache[key] = {};
        cache[key].data = data;
        cache[key].timestamp = new Date().getTime();
        fs.writeFileSync(cachePath, JSON.stringify(cache));
    } else {
        const cache = {
            [key]: {
                data: data,
                timestamp: new Date().getTime()
            }
        }
        fs.writeFileSync(cachePath, JSON.stringify(cache));
    }
}

function getCacheByKey(key: string, timestamp: boolean = false) {
    if (fs.existsSync(cachePath)) {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        try {
            return timestamp ? { data: cache[key].data, timestamp: cache[key].timestamp } : cache[key].data;
        } catch (error) {
            return undefined;
        }
    } else {
        return undefined;
    }
}

function clearCache() {
    if (fs.existsSync(path.join(__dirname, '/data/cache.json'))) {
        fs.unlinkSync(path.join(__dirname, '/data/cache.json'));
    }
}

function clearCacheByKey(key: string) {
    if (fs.existsSync(path.join(__dirname, '/data/cache.json'))) {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        delete cache[key];
        fs.writeFileSync(path.join(__dirname, '/data/cache.json'), JSON.stringify(cache));
    }
}

function isCacheExpired(key: string) {
    const cache = getCacheByKey(key, true);

    if (cache) {
        const now = new Date().getTime();
        const diff = now - cache.timestamp;
        return diff > 600000;

    } else {
        return true;
    }
}

export { cacheData, getCacheByKey, clearCache, isCacheExpired, clearCacheByKey }