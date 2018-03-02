package org.hengsir.icma.utils;

/**
 * 格式转换工具类。
 *
 * @author hengsir
 * @version 1.0.0
 */
public class TransformUtil {

    /**
     * 先将字符串每位之间加空格
     * 再将字符串每4位加一个空格。
     *
     * @param param 输入参数
     * @return 返回结果
     */
    public static String addSpace(String param) {
        if (param != null && !"".equals(param)) {
            char[] bankNos = param.toCharArray();
            StringBuilder outBf = new StringBuilder();
            for (int i = 0; i < bankNos.length; i++) {
                if (i > 0) {
                    outBf.append(" ");
                }
                outBf.append(bankNos[i]);
                if ((i + 1) % 4 == 0 && i != bankNos.length - 1) {
                    outBf.append(" ");
                }
            }
            return outBf.toString();
        }
        return "";
    }

    /**
     * 每一个字符之间加一个空格
     * 再将字符串每split位加一个空格。
     *
     * @param param 参数
     * @param split 空格间隔
     * @return 返回结果
     */
    public static String addSpace(String param, int split) {
        if (param != null && !"".equals(param)) {
            char[] bankNos = param.toCharArray();
            StringBuilder outBf = new StringBuilder();
            for (int i = 0; i < bankNos.length; i++) {
                if (i > 0) {
                    outBf.append(" ");
                }
                outBf.append(bankNos[i]);
                if ((i + 1) % split == 0 && i != bankNos.length - 1) {
                    outBf.append(" ");
                }
            }
            return outBf.toString();
        }
        return "";
    }

    /**
     * 将字符串每4位加一个空格。
     *
     * @param param 输入参数
     * @return 返回结果
     */
    public static String transform(String param) {
        if (param != null && !"".equals(param)) {
            char[] bankNos = param.toCharArray();
            StringBuilder outBf = new StringBuilder();
            for (int i = 0; i < bankNos.length; i++) {
                outBf.append(bankNos[i]);
                if ((i + 1) % 4 == 0 && i != bankNos.length - 1) {
                    outBf.append(" ");
                }
            }
            return outBf.toString();
        }
        return "";
    }

    /**
     * 将字符串每split位加一个空格。
     *
     * @param param 输入参数
     * @param split 分割间隔
     * @return 返回结果
     */
    public static String transform(String param, int split) {
        if (param != null && !"".equals(param)) {
            char[] bankNos = param.toCharArray();
            StringBuilder outBf = new StringBuilder();
            for (int i = 0; i < bankNos.length; i++) {
                outBf.append(bankNos[i]);
                if ((i + 1) % split == 0 && i != bankNos.length - 1) {
                    outBf.append(" ");
                }
            }
            return outBf.toString();
        }
        return "";
    }

    /**
     * 转换字符串。
     *
     * @param param 输入参数
     * @param split 分割间隔
     * @param reStr 分隔符
     * @return 转换结果
     */
    public static String transform(String param, int split, String reStr) {
        if (param != null && !"".equals(param)) {
            char[] bankNos = param.toCharArray();
            StringBuilder outBf = new StringBuilder();
            for (int i = 0; i < bankNos.length; i++) {
                outBf.append(bankNos[i]);
                if ((i + 1) % split == 0 && i != bankNos.length - 1) {
                    outBf.append(reStr);
                }
            }
            return outBf.toString();
        }
        return "";
    }
}
