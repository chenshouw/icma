package org.hengsir.icma.dao;

import org.hengsir.icma.entity.Image;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 下午12:00
 */
public interface ImageWriteDao extends ImageDao {

    /**
     * 新增一张人脸图片
     *
     * @param image
     * @return
     */
    public int addImg(Image image);

    /**
     * 删除一张人脸图片
     *
     * @param faceId
     * @return
     */
    public int deleteImg(List<String> faceId);
}
