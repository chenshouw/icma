package org.hengsir.icma.manage.shiro.cache;

import org.apache.shiro.cache.CacheException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.Cache.ValueWrapper;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

/**
 * 使用spring-cache作为shiro缓存。
 */
public class ShiroSpringCache<K, V> implements org.apache.shiro.cache.Cache<K, V> {
    private static final Logger logger = LoggerFactory.getLogger(ShiroSpringCache.class);

    private final Cache cache;

    public ShiroSpringCache(Cache cache) {
        if (cache == null) {
            throw new IllegalArgumentException("Cache argument cannot be null.");
        }
        this.cache = cache;
    }

    @Override
    public V get(K key) throws CacheException {
        if (logger.isTraceEnabled()) {
            logger.trace("从cache中获取值 [" + this.cache.getName() + "],key名： [" + key + "]，key类型:" + key.getClass());
        }
        ValueWrapper valueWrapper = cache.get(key);
        if (valueWrapper == null) {
            if (logger.isTraceEnabled()) {
                logger.trace("Element for [" + key + "] is null.");
            }
            return null;
        }
        return (V) valueWrapper.get();
    }

    @Override
    public V put(K key, V value) throws CacheException {
        if (logger.isTraceEnabled()) {
            logger.trace("设置值到缓存中， [" + this.cache.getName() + "] key名称： [" + key + "] key类型:" + key.getClass());
        }
        V previous = get(key);
        cache.put(key, value);
        return previous;
    }

    @Override
    public V remove(K key) throws CacheException {
        if (logger.isTraceEnabled()) {
            logger.trace("从cache中移除指定key的值 [" + this.cache.getName() + "] key： [" + key + "] key类型:" + key.getClass());
        }
        V previous = get(key);
        cache.evict(key);
        return previous;
    }

    @Override
    public void clear() throws CacheException {
        if (logger.isTraceEnabled()) {
            logger.trace("清空cache [" + this.cache.getName() + "]");
        }
        cache.clear();
    }

    @Override
    public int size() {
        return 0;
    }

    @Override
    public Set<K> keys() {
        return Collections.emptySet();
    }

    @Override
    public Collection<V> values() {
        return Collections.emptySet();
    }

    @Override
    public String toString() {
        return "ShiroSpringCache [" + this.cache.getName() + "]";
    }
}
