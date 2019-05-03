package web;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 5417488369543075097L;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        PreparedStatement ps = null;
		ResultSet rs = null;
        
    	//��ȡ�������
    	String username = request.getParameter("username");
        String password = request.getParameter("password");
        String message = "{\"message\":\"��¼�ɹ�\"}";
        response.setContentType("application/json;charset=utf-8");
//       if("˫��".equals(username) && "666".equals(password)) {
//            response.getWriter().write(message);
//        }
    	
    	DBUtil db = new DBUtil();
    	try {
    		String sql = "select * from user_zc where user_name=? and user_pw=?";
    		conn = db.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, username);
            ps.setString(2, password);
            //�����
            rs = ps.executeQuery();
            if(rs.next()) {//�û���������ȷ
            	PrintWriter out = response.getWriter();
            	
            	request.getSession().setAttribute("username", username);
            	out.write(message);
//            	out.write(username);
//            	response.getWriter().print("ע��ɹ�");
            	//response.sendRedirect(request.getContextPath() + "/index.html");
            }
    	}catch (Exception e){
    		e.printStackTrace();
    	}
    	
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

}
