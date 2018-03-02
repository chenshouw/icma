package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.hengsir.icma.entity.Image;
import org.hengsir.icma.entity.Person;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/5 下午4:22
 */
@Mapper
public interface ImageMapper {

    /**
     * 新增一张人脸图片
     *
     * @param image
     * @return
     */
    public int addImg(Image image);

    /**
     * 删除人脸图片
     *
     * @param faceId
     * @return
     */
    public int deleteImg(List<String> faceId);

    /**
     * 根据图片id查找图片
     *
     * @param imageId
     * @return
     */
    public Image findById(@Param("imageId") int imageId);

    /**
     * 根据条件查询全部图片
     *
     * @param image
     * @return
     */
    public List<Image> findAll(Image image);

    public List<Image> findByPerson(Person person);
}
