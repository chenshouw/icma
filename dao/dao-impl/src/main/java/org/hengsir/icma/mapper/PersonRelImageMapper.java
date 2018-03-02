package org.hengsir.icma.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.hengsir.icma.entity.PersonImageRelation;

/**
 * @author hengsir
 * @date 2018/1/5 下午4:09
 */
@Mapper
public interface PersonRelImageMapper {

    /**
     * 个体修改：增加人脸图片
     *
     * @return
     */
    public int addFace(PersonImageRelation personImageRelation);

    /**
     * 个体修改：删除人脸图片
     *
     * @return
     */
    public int deleteFace(PersonImageRelation personImageRelation);
}
