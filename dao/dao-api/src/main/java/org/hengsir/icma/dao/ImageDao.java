package org.hengsir.icma.dao;

import org.hengsir.icma.entity.Image;
import org.hengsir.icma.entity.Person;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 上午11:58
 */
public interface ImageDao {

    /**
     * 找出每个person自己的照片
     * @param person
     * @return
     */
    public List<Image> findByPerson(Person person);

    /**
     * 根据图片id查找图片
     *
     * @param imageId
     * @return
     */
    public Image findById(int imageId);

    /**
     * 根据条件查询全部图片
     *
     * @param image
     * @return
     */
    public List<Image> findAll(Image image);
}
