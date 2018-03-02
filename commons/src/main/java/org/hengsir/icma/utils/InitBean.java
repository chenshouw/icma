package org.hengsir.icma.utils;

import com.youtu.Youtu;

/**
 * @author hengsir
 * @date 2018/1/10 上午10:44
 */
public class InitBean {

    private static String APP_ID = "your appid";
    private static String SECRET_ID = "your secretId ";
    private static String SECRET_KEY = "your secretKey ";
    private static String USER_ID = "your qq ";
    private static Youtu youtu;

    public InitBean(String APP_ID, String SECRET_ID, String SECRET_KEY, String USER_ID) {
        this.APP_ID = APP_ID;
        this.SECRET_ID = SECRET_ID;
        this.SECRET_KEY = SECRET_KEY;
        this.USER_ID = USER_ID;
    }

    public InitBean(){}

    public static Youtu getYoutu() {
        return youtu;
    }

    public void init(){
        youtu = new Youtu(APP_ID, SECRET_ID, SECRET_KEY,Youtu.API_YOUTU_END_POINT,USER_ID);
    }


    public String getAPP_ID() {
        return APP_ID;
    }

    public void setAPP_ID(String APP_ID) {
        this.APP_ID = APP_ID;
    }

    public String getSECRET_ID() {
        return SECRET_ID;
    }

    public void setSECRET_ID(String SECRET_ID) {
        this.SECRET_ID = SECRET_ID;
    }

    public String getSECRET_KEY() {
        return SECRET_KEY;
    }

    public void setSECRET_KEY(String SECRET_KEY) {
        this.SECRET_KEY = SECRET_KEY;
    }

    public String getUSER_ID() {
        return USER_ID;
    }

    public void setUSER_ID(String USER_ID) {
        this.USER_ID = USER_ID;
    }
}
