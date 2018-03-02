package org.hengsir.icma.manage.user.controller;


import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.hengsir.icma.dao.UserDao;
import org.hengsir.icma.entity.User;
import org.hengsir.icma.manage.controller.BaseController;
import org.hengsir.icma.manage.shiro.PasswordHash;
import org.hengsir.icma.manage.shiro.RetryLimitCredentialsMatcher;
import org.hengsir.icma.service.UserService;
import org.hengsir.icma.utils.DecodeUtil;
import org.hengsir.icma.utils.ValidateCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 管理端登录。
 */
@Controller
@RequestMapping("/org/hengsir/icma/manage")
public class LoginController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    /*@Autowired
    private VerifyCodeService verifyCodeService;*/

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordHash passwordHash;

    @Autowired
    private RetryLimitCredentialsMatcher retryLimitCredentialsMatcher;

    /**
     * 账号登陆。
     *
     * @return 成功跳转到index or null 失败返回异常信息
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Object login(
        String userAccount, String userPassword, String captcha,
        @RequestParam(value = "rememberMe", defaultValue = "0") Integer rememberMe,
        HttpSession session) {
        String msg = "登陆成功";
        int code = 1;
        JSONObject jsonObject = new JSONObject();
        if (StringUtils.isBlank(userAccount)) {
            code = 2;
            msg = "用户名/手机号不能为空";
            jsonObject.accumulate("code", code);
            jsonObject.accumulate("msg", msg);
            return jsonObject;
        }
        if (StringUtils.isBlank(userPassword)) {
            code = 3;
            msg = "密码不能为空";
            jsonObject.accumulate("code", code);
            jsonObject.accumulate("msg", msg);
            return jsonObject;
        }
        if (StringUtils.isBlank(captcha)) {
            code = 4;
            msg = "验证码不能为空";
            jsonObject.accumulate("code", code);
            jsonObject.accumulate("msg", msg);
            return jsonObject;
        }
        //对密码解码
        String newPass = new String(DecodeUtil.decode(userPassword));
        //        String verifyCode = redisTemplate.opsForValue().get("verifyCode");
        String verifyCode = (String) session.getAttribute("validateCode");
        if (null == verifyCode || "".equals(verifyCode)) {
            code = 5;
            msg = "验证码已失效，请重新输入";
            jsonObject.accumulate("code", code);
            jsonObject.accumulate("msg", msg);
            return jsonObject;
        }
        if (!captcha.toLowerCase().equals(verifyCode.toLowerCase())) {
            msg = "验证码错误，请重新输入";
            code = 6;
            jsonObject.accumulate("code", code);
            jsonObject.accumulate("msg", msg);
            return jsonObject;
        }


        UsernamePasswordToken token = new UsernamePasswordToken(userAccount, newPass, captcha);
        Subject currentUser = SecurityUtils.getSubject();
        try {
            //记住密码
            token.setRememberMe(1 == rememberMe);
            currentUser.login(token);
            User userBo = userDao.selectUserByAccount(userAccount);


            currentUser.getSession().setAttribute("userAccount", userBo.getUserAccount());
            msg = "登陆成功";
            code = 1;
        } catch (IncorrectCredentialsException ex) {
            code = 7;
            AtomicInteger atomicInteger = retryLimitCredentialsMatcher.getPasswordRetryCache().get(
                userAccount);
            int error = atomicInteger.get();
            int count = retryLimitCredentialsMatcher.getPasswordFailNumber();
            if (error == count) {
                msg = "登录密码错误" + error + "次,账户将锁定半小时";
            } else {
                msg = "登录密码错误" + error + "次," + count + "次错误账号将锁定半小时,请谨慎";
            }
            logger.error(msg, ex);
        } catch (ExcessiveAttemptsException ex) {
            code = 8;
            msg = "登录密码已错误" + retryLimitCredentialsMatcher.getPasswordFailNumber() + "次，账号已锁定半小时";
            logger.error(msg, ex);
        } catch (LockedAccountException ex) {
            code = 9;
            msg = "帐号已被锁定";
            logger.error(msg, ex);
        } catch (DisabledAccountException ex) {
            code = 10;
            msg = "帐号已被禁用";
            logger.error(msg, ex);
        } catch (ExpiredCredentialsException ex) {
            code = 11;
            msg = "帐号已过期";
            logger.error(msg, ex);
        } catch (UnknownAccountException ex) {
            code = 12;
            msg = "帐号不存在";
            logger.error(msg, ex);
        } catch (UnauthorizedException ex) {
            code = 13;
            msg = "该账号未分配角色，请先联系管理员分配角色";
            logger.error(msg, ex);
        } catch (AuthenticationException ex) {
            code = 14;
            msg = ex.getMessage();
            logger.error(msg, ex);
        }
        jsonObject.accumulate("code", code);
        jsonObject.accumulate("msg", msg);
        return jsonObject;
    }

    @RequestMapping("/logout")
    public String logout() {
        SecurityUtils.getSubject().logout();
        return "redirect:/login";
    }

    /**
     * 获取验证码图片和文本(验证码文本会保存在HttpSession中)。
     */
    @RequestMapping("/genCaptcha")
    public void genCaptcha(
            HttpServletRequest request, HttpServletResponse response, HttpSession session)
        throws IOException {
        ////设置页面不缓存
        //response.setHeader("Pragma", "no-cache");
        //response.setHeader("Cache-Control", "no-cache");
        //response.setDateHeader("Expires", 0);
        //String verifyCode = VerifyCodeUtil.generateTextCode(VerifyCodeUtil.TYPE_NUM_ONLY,4,null);
        //redisTemplate.opsForValue().set("verifyCode", verifyCode, 1, TimeUnit.MINUTES);
        //logger.info("本次生成的验证码为[" + verifyCode + "],已存放到redis中");
        ////设置输出的内容的类型为JPEG图像
        //response.setContentType("image/jpeg");
        //BufferedImage bufferedImage = VerifyCodeUtil.generateImageCode(verifyCode, 90, 30,
        //5, true, Color.WHITE, null, null);
        ////写给浏览器
        //ImageIO.write(bufferedImage, "JPEG", response.getOutputStream());
        response.setContentType("image/png");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        ValidateCodeUtil validateCodeUtil = new ValidateCodeUtil(120, 50, 4, 150);
        session.removeAttribute("validateCode");
        session.setAttribute("validateCode", validateCodeUtil.getCode());
        try {
            validateCodeUtil.write(response.getOutputStream());
        } catch (IOException ex) {
            logger.error("生成二维码异常", ex);
        }

    }


    /**
     * 修改密码时跳转页面。
     */
    @RequestMapping(value = "/touser-password")
    public ModelAndView touserPassword(String mobile) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("mobile", mobile);
        modelAndView.setViewName("/rights/user-password");
        return modelAndView;
    }

    @RequestMapping(value = "/user-password")
    @ResponseBody
    public Object userPassword(String userPassword, String mobile) {
        User user = null;
        //对密码进行加密处理
        boolean flag = false;
        if (user != null) {
            String salt = "12345";
            String encodePass = passwordHash.toHex(userPassword, salt);
            user.setUserPassword(encodePass);
            flag = userService.updatePass(user);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.accumulate("result", flag);
        return jsonObject;
    }

    @RequestMapping(value = "/touser-account")
    public ModelAndView touserAccount() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/rights/user-account");
        return modelAndView;
    }

    @RequestMapping(value = "/user-account")
    @ResponseBody
    public Object userAccount(String userAccount) {
        JSONObject jsonObject = new JSONObject();
        String flag = ""; //标示用户不存在
        User user = userDao.selectUserByAccount(userAccount);
        if (user == null) {
            flag = "用户不存在";
        } else {
            String mobile = user.getMobile();
            if (mobile == null || "".equals(mobile)) {
                flag = "该用户未绑定手机号";//用户存在，且未绑定手机号
            } else {
                jsonObject.accumulate("mobile", mobile);
                flag = "2";//用户存在，且绑定了手机号
            }
        }
        jsonObject.accumulate("result", flag);
        return jsonObject;
    }

    @RequestMapping(value = "/touser-mobile")
    public ModelAndView touserMobile(String mobile) {
        ModelAndView modelAndView = new ModelAndView();
        mobile = new String(DecodeUtil.decode(mobile));
        String userMobile = mobile.substring(0, 3) + "****" + mobile.substring(7);
        modelAndView.addObject("userMobile", userMobile);
        modelAndView.addObject("mobile", mobile);
        modelAndView.setViewName("/rights/user-mobile");
        return modelAndView;
    }


    /**
     * 跳转到登录页面。
     */
    @RequestMapping(value = "/add-success")
    public String addSuccess() {
        return "login";
    }
}
