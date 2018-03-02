package org.hengsir.icma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author hengsir
 * @date 2018/3/1 下午3:22
 */
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class,args);
        System.out.println("-----------------嘤嘤嘤嘤嘤~~~~启动成功！！！！！------------------" + new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
    }
}
