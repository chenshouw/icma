package org.hengsir.icma.utils;

import org.apache.shiro.crypto.hash.Md5Hash;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * MD5算法加密工具类
 */
public class MD5Util {

	private static final char[] HEX = new char[]{'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F',};

	/**
	 * MD5加密
	 * @param src 明文
	 * @return 加密之后长度为32的十六进制字符串
	 */
	public static String md5(String src)
	{
		try {
			//1.返回实现指定摘要算法的 MessageDigest 对象
			MessageDigest md = MessageDigest.getInstance("MD5");

			//2.获取src的字节数组
			byte[] input = src.getBytes();

			//3.使用指定的 byte 数组更新摘要
			md.update(input);

			//4.加密： 通过执行诸如填充之类的最终操作完成哈希计算
			byte[] bytes = md.digest();//长度为16

			//{110, 37, 57, 97, 82, -41, 89, 11, 66, -6, -66, -64, 70, -128, 9, -47}
			/*System.out.println("长度" +bytes.length+":"+Arrays.toString(bytes));

			byte b = -41;
			System.out.println(Integer.toBinaryString(b));            //111111111111111111111111 1101 0111  byte有效位8位
			System.out.println(Integer.toBinaryString(b >>> 4 & 0xF));//b >>> 4 ： 111111111111111111111111 1101  >>>无符号右移4位，&运算将多余的24个1去掉
																      //0xF    ：  000000000000000000000000 1111
		      														  //&结果          ：  000000000000000000000000 [1101]
			System.out.println(Integer.toBinaryString(b & 0xF));// b  :111111111111111111111111 1101 0111
																// 0xF:000000000000000000000000 0000 1111
																//&结果 :000000000000000000000000 0000 [0111]

			System.out.println(b >>> 4 & 0xF);//13 十进制
			System.out.println(b & 0xF);	  //7    十进制

			System.out.println(Integer.toHexString(b >>> 4 & 0xF)); // d 十六进制
			System.out.println(Integer.toHexString(b & 0xF));		// 7   十六进制

			System.out.println(HEX[b >>> 4 & 0xF]); // d 十六进制
			System.out.println(HEX[b & 0xF]);		// 7   十六进制*/

			//5.将长度为16的字节数组转换为长度为32的十六进制字符串
			char[] result = new char[bytes.length * 2];//存储结果的char数组

			int k = 0;

			for (int i = 0; i < bytes.length; i++) {
				byte c = bytes[i];

				result[k++] = HEX[c >>> 4 & 0xF];//前四位
				result[k++] = HEX[c & 0xF];		 //后四位
			}

			return new String(result);

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		return "";
	}

	/**
	 * md5加盐加密处理
	 *
	 * @param password
	 * @param salt
	 * @return
	 */
	public static String encodeMD5(String password,String salt){
		return new Md5Hash(password,salt).toString();
	}


	public static void main(String[] args) {
		String result = md5("12中abc");
		System.out.println("加密之后的字符串："+result);
	}
}
