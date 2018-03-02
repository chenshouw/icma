  package org.hengsir.icma.dao;


  import org.hengsir.icma.entity.LeftMenu;

  /**
   * 菜单读写接口。
   * @author yuanyaping
   * @createTime 2017年12月1日
   * @version 1.0.0
   */
  public interface LeftMenuWriteDao extends LeftMenuDao {
      /**
       * 新增菜单。
       * @param leftMenu 菜单对象
       * @return 新增的菜单对象
       */
      public LeftMenu create(LeftMenu leftMenu);

      /**
       * 修改菜单。
       * @param leftMenu 菜单
       * @return true： 修改成功,false： 修改失败
       */
      public boolean update(LeftMenu leftMenu);

      /**
       * 通过id删除菜单。
       * @param id 菜单id
       * @return true： 修改成功,false： 修改失败
       */
      public boolean delete(Long id);

      /**
       * 修改菜单的权限。
       * @param leftMenu 菜单对象
       */
      public boolean updateSysIdById(LeftMenu leftMenu);
  }
