package org.hengsir.icma.impl;

import org.hengsir.icma.dao.ImageWriteDao;
import org.hengsir.icma.entity.Image;
import org.hengsir.icma.entity.Person;
import org.hengsir.icma.mapper.ImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 下午2:52
 */
@Service
public class ImageDaoImpl implements ImageWriteDao {

    @Autowired
    private ImageMapper imageMapper;

    @Override
    public int addImg(Image image) {
        return imageMapper.addImg(image);
    }



    @Override
    public int deleteImg(List<String> faceId) {
        return imageMapper.deleteImg(faceId);
    }

    @Override
    public List<Image> findByPerson(Person person) {
        return imageMapper.findByPerson(person);
    }


    @Override
    public Image findById(int imageId) {
        return imageMapper.findById(imageId);
    }

    @Override
    public List<Image> findAll(Image image) {
        return imageMapper.findAll(image);
    }
}
