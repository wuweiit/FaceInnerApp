package com.awesomeproject2;

import java.security.MessageDigest;
/**
 * MD5加密(依赖apache的DigestUtils类)
 * 
 * @author marker
 * 
 * */
public class MD5 {
	
	/**
	 * 私有构造方法
	 * */
    private MD5(){ }   
    
	
    /**
     * 获取MD5加密值
     * @return String md5值
     * 
     * */
	public static String getMD5Code(String plainText) {
        if (plainText == null) return null;

		try {
			//生成实现指定摘要算法的 MessageDigest 对象。
			MessageDigest md = MessageDigest.getInstance("MD5");
			//使用指定的字节数组更新摘要。
			md.update(plainText.getBytes("UTF-8"));
			//通过执行诸如填充之类的最终操作完成哈希计算。
			byte b[] = md.digest();
			//生成具体的md5密码到buf数组
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			return buf.toString();
	 	}
		catch (Exception e) {
			e.printStackTrace();
		}
        return null;
	}   
	
}  
 
