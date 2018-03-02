package org.hengsir.icma.utils;

import java.util.regex.Pattern;

/**
 * Created by hengsir on 2017/7/11.
 */
public class PhoneUtil {
    /**
     * 将字符串每4位加一个空格。
     *
     * @param phone 11位手机号码
     * @return 返回结果
     */
    public static String transform(String phone) {
        if (phone == null || "".equals(phone)) {
            return phone;
        } else if (isMobile(phone)) {
            char[] phones = phone.toCharArray();
            StringBuilder outBf = new StringBuilder();
            for (int i = 0; i < phones.length; i++) {
                outBf.append(phones[i]);
                if (i == 2 || i == 6) {
                    outBf.append("-");
                }
            }
            return outBf.toString();
        } else {
            throw new RuntimeException("手机号码格式错误");
        }
    }

    /**
     * 检查是否手机号码。
     *
     * @param mobile 手机号
     * @return 是否手机号
     */
    public static boolean isMobile(String mobile) {
        return mobile != null && !"".equals(mobile) &&
               (isChinaTelecomPhoneNum(mobile) || isChinaUnicomPhoneNum(mobile) ||
                isChinaMobilePhoneNum(mobile));
    }

    /**
     * 中国电信号码格式验证 手机段： 133,153,180,181,189,177,1700
     **/
    private static final String CHINA_TELECOM_PATTERN = "(^1(33|53|77|8[019])\\d{8}$)|(^1700\\d{7}$)";

    /**
     * 验证【电信】手机号码的格式
     *
     * @param str 校验手机字符串
     * @return 返回true, 否则为false
     */
    public static boolean isChinaTelecomPhoneNum(String str) {
        Pattern pattern = Pattern.compile(CHINA_TELECOM_PATTERN);
        return str != null && !str.trim().equals("") && pattern.matcher(str).matches();
    }

    /**
     * 中国联通号码格式验证 手机段：130,131,132,155,156,185,186,145,176,1709
     **/
    private static final String CHINA_UNICOM_PATTERN = "(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\\d{8}$)|(^1709\\d{7}$)";

    /**
     * 验证【联通】手机号码的格式
     *
     * @param str 校验手机字符串
     * @return 返回true, 否则为false
     */
    public static boolean isChinaUnicomPhoneNum(String str) {
        Pattern pattern = Pattern.compile(CHINA_UNICOM_PATTERN);
        return str != null && !str.trim().equals("") && pattern.matcher(str).matches();
    }

    /**
     * 中国移动号码格式验证
     * 手机段：134,135,136,137,138,139,150,151,152,157,158,159,182,183,184,187,188,147,178,1705
     **/
    private static final String CHINA_MOBILE_PATTERN = "(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\\d{8}$)|(^1705\\d{7}$)";

    /**
     * 验证【移动】手机号码的格式
     *
     * @param str 校验手机字符串
     * @return 返回true, 否则为false
     */
    public static boolean isChinaMobilePhoneNum(String str) {
        Pattern pattern = Pattern.compile(CHINA_MOBILE_PATTERN);
        return str != null && !str.trim().equals("") && pattern.matcher(str).matches();
    }

}
