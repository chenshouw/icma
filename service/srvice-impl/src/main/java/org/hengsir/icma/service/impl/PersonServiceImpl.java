package org.hengsir.icma.service.impl;

import com.youtu.Youtu;
import org.hengsir.icma.dao.ImageWriteDao;
import org.hengsir.icma.dao.PersonWriteDao;
import org.hengsir.icma.entity.Image;
import org.hengsir.icma.entity.Person;
import org.hengsir.icma.service.PersonService;
import org.hengsir.icma.utils.InitBean;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author hengsir
 * @date 2018/1/10 上午11:47
 */
@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonWriteDao personWriteDao;

    @Autowired
    private ImageWriteDao imageWriteDao;

    private Youtu youtu = InitBean.getYoutu();

    @Override
    public int create(Person person, Image image) {
        List<String> list = new ArrayList<>();
        list.add(person.getGroupId()+"");
        try {
            JSONObject response = youtu.NewPerson(image.getImageUrl(),person.getPersonId(),list);
            if(response.getInt("errorcode") == 0){
                image.setFaceId((String)response.get("face_id"));
                return personWriteDao.create(person);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int delete(String personId) {
        try {
            JSONObject response = youtu.DelPerson(personId);
            if(response.getInt("errorcode") == 0){
                return personWriteDao.delete(personId);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public boolean addPhoto(String personId, List<Image> imageList) {
        return false;
    }

    @Override
    public boolean deletePhoto(String personId, List<Image> imageList) {
        return false;
    }

    @Override
    public boolean addFace(String personId, List<Image> imageList) {
        List<String> list = new ArrayList<String>();
        for (Image i : imageList){
            list.add(i.getImageUrl());
        }
        try {
            JSONObject resp = youtu.AddFace(personId,list);
            if(resp.getInt("errorcode") == 0){
                String[] arr = (String[]) resp.get("face_ids");
                int index = 0;
                for (int i = 0;i < imageList.size();i++) {
                    imageList.get(i).setFaceId(arr[i]);
                     index += imageWriteDao.addImg(imageList.get(i));
                }
                if (index > 0){
                    return true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean deleteFace(String personId, List<String> faceIds) {
        try {
            JSONObject resp = youtu.DelFace(personId,faceIds);
            if(resp.getInt("errorcode") == 0){
                int index = imageWriteDao.deleteImg(faceIds);
                if (index > 0){
                    return true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return false;
    }
}
