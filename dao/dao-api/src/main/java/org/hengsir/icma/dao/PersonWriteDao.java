package org.hengsir.icma.dao;

import org.hengsir.icma.entity.Person;

/**
 * @author hengsir
 * @date 2018/1/10 上午11:55
 */
public interface PersonWriteDao extends PersonDao{
    /**
     * 新增个体
     * @param person
     * @return
     */
    public int create(Person person);

    /**
     * 删除个体
     * @param personId
     * @return
     */
    public int delete(String personId);

}
