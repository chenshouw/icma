package org.hengsir.icma.entity;

import org.hengsir.icma.model.Model;

public class Group implements Model<Integer>{
    private int groupId;
    private String groupName;
    private int parentGroupId;

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getParentGroupId() {
        return parentGroupId;
    }

    public void setParentGroupId(int parentGroupId) {
        this.parentGroupId = parentGroupId;
    }

    @Override
    public Integer getKey() {
        return this.groupId;
    }
}
