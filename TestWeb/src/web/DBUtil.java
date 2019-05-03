package web;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

/**
 * ʹ�������ļ�������JDBC�������ݿ� ���������������ݿ������
 */
public class DBUtil {
    // �������ݿ��·��
    public static String url;
    // �������ݿ���û���
    public static String user;
    // �������ݿ������
    public static String pwd;

    public static String driver;

    // ��̬��
    static {
        try {
            // ��ȡ�����ļ�
            Properties prop = new Properties();
            /*
             * ����д���ǽ��������Ƽ������·�� д����
             */
            InputStream is = DBUtil.class.getClassLoader().getResourceAsStream(
                    "web/db.properties");

            prop.load(is);
            is.close();
            // ��ȡ����
            driver = prop.getProperty("jdbc.driver");
            // ��ȡ��ַ
            url = prop.getProperty("jdbc.url");
            // ��ȡ�û���
            user = prop.getProperty("jdbc.user");
            // ��ȡ����
            pwd = prop.getProperty("jdbc.password");

            // ע������
            Class.forName(driver);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("���ݿ����ӳ���");
        }
    }

    /**
     * ��ȡһ������
     * 
     * @return
     * @throws Exception
     */
    public static Connection getConnection() throws Exception {
        try {
            /*
             * ͨ��DriverManager����һ�����ݿ������ ������
             */
            Connection conn = null;
            conn = DriverManager.getConnection(url, user, pwd);
            /*
             * ThreadLocal��set���� �Ὣ��ǰ�߳���Ϊkey,����������ֵ ��Ϊvalue�����ڲ���map�б��档
             */

            return conn;
        } catch (Exception e) {
            e.printStackTrace();
            // ֪ͨ�����ߣ��������ӳ���
            throw e;
            
        }
    }

    /**
     * �رո���������
     */
    public static void closeConnection(Connection conn) {
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * �����Ƿ����ӳɹ�
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        System.out.println(getConnection());
    }

}