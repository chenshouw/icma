package org.hengsir.icma.entity;

import org.hengsir.icma.model.Model;

public class PersonImageRelation implements Model<Integer>{
    private int id;
    private String personId;
    private int imageId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    @Override
    public Integer getKey() {
        return this.id;
    }
}
