package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.Person;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/5 下午2:57
 */
@Mapper
public interface PersonMapper {

    /**
     * 根据条件查询所有person
     *
     * @param person
     * @return
     */
    public List<Person> findAll(Person person);

    /**
     * 修改一个person
     *
     * @param person
     * @return
     */
    public int update(Person person);

    /**
     * 创建一个person
     *
     * @param person
     * @return
     */
    public int create(Person person);

    /**
     * 删除一个person
     *
     * @param personId
     * @return
     */
    public int delete(@Param("personId") String personId);
}
