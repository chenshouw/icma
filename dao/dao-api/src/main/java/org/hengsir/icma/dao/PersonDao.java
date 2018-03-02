package org.hengsir.icma.dao;

import org.hengsir.icma.entity.Person;
import org.hengsir.icma.utils.Page;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 上午11:51
 */
public interface PersonDao {

    public Page<Person> findAll(Page<Person> page, Person person);

    public List<Person> findAll(Person person);
}
