package org.hengsir.icma.manage.role_right.controller;

import net.sf.json.JSONObject;
import org.hengsir.icma.dao.RightDao;
import org.hengsir.icma.dao.RightRoleRelationDao;
import org.hengsir.icma.entity.RightRoleRelation;
import org.hengsir.icma.service.RightRoleRelationService;
import org.hengsir.icma.service.RightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * 角色增加权限。
 */
@Controller
@RequestMapping("/role_right/right-role-relation")
public class RightRoleRelationController {


    @Autowired
    private RightRoleRelationDao rightRoleRelationDao;

    @Autowired
    private RightRoleRelationService rightRoleRelationService;

    @Autowired
    private RightService rightService;

    @Autowired
    private RightDao rightDao;

    /**
     * 增加，删除。
     *
     * @param rightArr 要增加的权限字符串
     * @param roleId   角色id
     * @return 操作结果
     */
    @RequestMapping(value = "/add", method = {RequestMethod.GET})
    @ResponseBody
    public Object add(String rightArr, int roleId) {
        String[] rightStrArray = rightArr.split("[,]");
        boolean flag = true;
        try {
            //删除原有的权限
            List<RightRoleRelation> list = rightRoleRelationDao.findByRightRoleRelation(roleId);
            for (int i = 0; i < list.size(); i++) {
                rightRoleRelationService.remove(roleId);
            }
            //将选中的节点权限ID放入set存储,并保存数据库
            for (int i = 0; i < rightStrArray.length; i++) {
                if (!"".equals(rightStrArray[i])) {
                    RightRoleRelation rightRoleRelation = new RightRoleRelation();
                    rightRoleRelation.setRoleId(roleId);
                    rightRoleRelation.setRightId(Integer.valueOf(rightStrArray[i]));
                    flag = rightRoleRelationService.create(rightRoleRelation);
                }
            }
        } catch (Exception ex) {
            flag = false;

        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("result", flag);
        return jsonObject;
    }

    @RequestMapping(value = "/getRoleRelRight", method = {RequestMethod.GET})
    @ResponseBody
    public Object getRoleRelRight(int roleId) {
        List<RightRoleRelation> list = rightRoleRelationDao.findByRightRoleRelation(roleId);
        String rights = "";
        for (int count = 0; count < list.size(); count++) {
            if (count > 0) {
                rights += ",";
            }
            rights += list.get(count).getRightId();
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("result", rights);
        return jsonObject;
    }
}




