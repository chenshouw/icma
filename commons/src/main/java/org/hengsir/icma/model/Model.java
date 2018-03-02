package org.hengsir.icma.model;
import java.io.Serializable;

/**
 * 基础实体bean接口（序列化）
 * @author hengsir
 * @version 1.0.0
 */
public abstract interface Model<PK extends Serializable> extends Serializable{
    public abstract PK getKey();
}