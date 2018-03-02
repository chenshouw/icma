package org.hengsir.icma.entity;

import org.hengsir.icma.model.Model;

public class Person implements Model<String>{
    /**
     * 专属的personId在人脸库中
     */
    private String personId;

    /**
     * 名字
     */
    private String personName;

    /**
     * 所属机构
     */
    private int groupId;

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    @Override
    public String getKey() {
        return this.personId;
    }
}
