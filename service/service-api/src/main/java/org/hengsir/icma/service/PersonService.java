package org.hengsir.icma.service;

import org.hengsir.icma.entity.Image;
import org.hengsir.icma.entity.Person;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 上午11:09
 */
public interface PersonService {

    /**
     * 新增个体
     * @param person
     * @return
     */
    public int create(Person person, Image image);

    /**
     * 删除个体
     * @param personId
     * @return
     */
    public int delete(String personId);

    /**
     * 添加人脸照片
     * @param personId
     * @return
     */
    public boolean addPhoto(String personId, List<Image> imageList);

    /**
     * 删除人脸照片
     * @param personId
     * @return
     */
    public boolean deletePhoto(String personId, List<Image> imageList);

    /**
     * 新增人脸
     * @param personId
     * @return
     */
    public boolean addFace(String personId, List<Image> imageList);

    /**
     * 删除人脸
     * @param personId
     * @param faceIds
     * @return
     */
    public boolean deleteFace(String personId, List<String> faceIds);
}
