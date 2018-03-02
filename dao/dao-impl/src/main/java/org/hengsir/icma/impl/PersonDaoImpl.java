package org.hengsir.icma.impl;

import org.hengsir.icma.dao.PersonWriteDao;
import org.hengsir.icma.entity.Person;
import org.hengsir.icma.mapper.PersonMapper;
import org.hengsir.icma.utils.Page;
import org.hengsir.icma.utils.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 上午11:55
 */
@Service
public class PersonDaoImpl implements PersonWriteDao {

    @Autowired
    private PersonMapper personMapper;

    @Override
    public int create(Person person) {
        return personMapper.create(person);
    }

    @Override
    public int delete(String personId) {
        return personMapper.delete(personId);
    }

    @Override
    public Page<Person> findAll(Page<Person> page, Person person) {
        PageHelper.startPage(page.getPageNum(),page.getPageSize());
        personMapper.findAll(person);
        return PageHelper.endPage();
    }

    @Override
    public List<Person> findAll(Person person) {
        return personMapper.findAll(person);
    }
}
