package org.hengsir.icma.manage.role_right.controller;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.hengsir.icma.dao.RightRoleRelationDao;
import org.hengsir.icma.dao.RoleDao;
import org.hengsir.icma.entity.RightRoleRelation;
import org.hengsir.icma.entity.Role;
import org.hengsir.icma.entity.RoleVo;
import org.hengsir.icma.service.RightRoleRelationService;
import org.hengsir.icma.service.RoleService;
import org.hengsir.icma.utils.Page;
import org.hengsir.icma.utils.PageHtmlUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

/**
 * 角色管。
 * Created by yuanyaping on 2017/6/12.
 */
@Controller
@RequestMapping("/rights/role")
public class RoleController {

    /**
     * 日志输出。
     */
    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

    @Autowired
    private RoleService roleService;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private RightRoleRelationService rightRoleRelationService;

    @Autowired
    private RightRoleRelationDao rightRoleRelationDao;

    /**
     * 查询。
     *
     * @param roleVo 系统定义数据
     * @param index  当前页数
     * @param size   每页显示的数据量
     * @return modelAndView 返回页面数据
     */
    @RequestMapping(value = "/search")
    @RequiresPermissions("role_search")
    public ModelAndView search(
            RoleVo roleVo, @RequestParam(value = "pageNum", defaultValue = "1") int index,
            @RequestParam(value = "pageSize", defaultValue = "10") int size) {
        //分页查询
        Page<Role> page = roleDao.findByRole(roleVo, new Page<Role>(index,size));

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/rights/role-list");

        //生成分页
        modelAndView.addObject("pageHtml", PageHtmlUtil.initHtml(page));
        modelAndView.addObject("list", page.getResult());
        return modelAndView;
    }

    @RequestMapping(value = "/toadd", method = {RequestMethod.GET})
    @RequiresPermissions("role_add")
    public ModelAndView toadd() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/rights/role-add");
        return modelAndView;
    }

    /**
     * 增加 。
     *
     * @param role 系统定义数据
     * @return modelAndView 返回页面数据
     */
    @RequestMapping(value = "/add", method = {RequestMethod.POST})
    @ResponseBody
    public Object add(Role role) {
        Subject subject = SecurityUtils.getSubject();
        String username = subject.getPrincipal().toString();
        role.setRoleOperator(username);
        role.setCreateTime(new Date());
        boolean flag = false;
        Role ro = roleService.create(role);
        JSONObject jsonObject = new JSONObject();
        if (null == ro) {
            flag = false;
        } else {
            flag = true;
        }
        jsonObject.accumulate("result", flag);
        return jsonObject;
    }

    /**
     * 删除。
     *
     * @param id 数据编号
     * @return 跳转页面
     */
    @RequestMapping(value = "/remove", method = {RequestMethod.GET})
    @ResponseBody
    @RequiresPermissions("role_delete")
    public Object remove(int
                                     id) {
        JSONObject jsonObject = new JSONObject();
        boolean flag = roleService.remove(id);
        //将对应角色的权限删除
        if (flag == true) {
            List<RightRoleRelation> rightRoleRelation = rightRoleRelationDao.findByRightRoleRelation(
                id);
            for (int i = 0; i < rightRoleRelation.size(); i++) {
                rightRoleRelationService.remove(id);
            }
        }
        jsonObject.accumulate("result", flag);
        return jsonObject;
    }

    /**
     * 修改。
     *
     * @param id 数据编号
     * @return 跳转页面
     */
    @RequestMapping(value = "/toUpdate", method = {RequestMethod.GET})
    @RequiresPermissions("role_update")
    public ModelAndView toUpdate(int id) {
        Role role = roleDao.findById(id);
        RoleVo vo = new RoleVo();
        BeanUtils.copyProperties(role, vo);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/rights/role-update");
        modelAndView.addObject("role", vo);
        return modelAndView;
    }

    /**
     * 修改。
     *
     * @param role 卡面值数据
     * @return 是否增加成功
     */
    @RequestMapping(value = "/update", method = {RequestMethod.POST})
    @ResponseBody
    public Object update(@ModelAttribute Role role) {
        Subject subject = SecurityUtils.getSubject();
        String username = subject.getPrincipal().toString();
        role.setRoleOperator(username);
        role.setUpdateTime(new Date());
        JSONObject jsonObject = new JSONObject();
        boolean flag = roleService.update(role);
        jsonObject.accumulate("result", flag);
        return jsonObject;
    }


    /**
     * 查询角色分组信息。
     *
     * @param order      排序
     * @param pageNumber 当前页面
     * @param pageSize   每页显示
     * @return 字符串
     */
    @RequestMapping(value = "/search-list", method = {RequestMethod.GET}, produces = {"application/text;charset=UTF-8"})
    @ResponseBody
    public String searchList(
        String order, String pageNumber, String pageSize, int userId, String roleName,
        String roleCode,String sysId) {
        //页面传递过来的可能是为null的字符串
        if ("null".equals(sysId))
        {
            sysId = "";
        }
        RoleVo ro = new RoleVo();
        ro.setRoleStatus(1);
        ro.setRoleCode(roleCode);
        ro.setRoleName(roleName);
        Page<Role> page = roleDao.findByRole(ro, new Page<Role>(Integer.parseInt(pageNumber),
                                                              Integer.parseInt(pageSize)));
        List<Role> list = page.getResult();
        JSONArray jsonData = new JSONArray();
        //String roleUserId = "";
        //查询到对应用户的角色
        List<Role> roleUser = roleDao.findByUserId(userId);
        int[] roleUserIds = new int[roleUser.size()];

        for (int i = 0; i <= roleUser.size() - 1; i++) {
            roleUserIds[i] = roleUser.get(i).getRoleId();
        }

        for (Role role : list) {
            JSONObject jsonObject = new JSONObject();
            int roleId = role.getRoleId();
            //如果查询到的角色和对应用户的角色匹配。checked返回true,页面选中。
            boolean checkFlag = false;
            for (int k = 0; k <= roleUserIds.length - 1; k++) {
                if (roleId == roleUserIds[k]) {
                    checkFlag = true;
                    break;
                } else {
                    checkFlag = false;
                }
            }

            jsonObject.put("checked", checkFlag);
            jsonObject.put("roleId", roleId);
            jsonObject.put("roleName", role.getRoleName());
            jsonObject.put("roleCode", role.getRoleCode());
            jsonObject.put("roleDesc", role.getRoleDesc());

            jsonData.add(jsonObject);
        }
        int count = roleDao.findRoleCount(ro);
        JSONObject json = new JSONObject();
        json.put("rows", jsonData);//JSONArray
        json.put("total", count);//总记录数
        return json.toString();
    }

    /**
     * 验证角色编码是否已存在。
     */
    @RequestMapping(value = "/codeUnique", method = RequestMethod.POST)
    @ResponseBody
    public Object phoneUnique(
        @RequestParam(value = "oldCode") String oldCode,
        @RequestParam(value = "roleCode") String roleCode) {
        if (oldCode != null && "" != oldCode && oldCode.equals(roleCode)) {
            return true;
        }
        Role role = roleDao.findByCode(roleCode);
        if (role != null) {
            return false;
        } else {
            return true;
        }
    }
}
