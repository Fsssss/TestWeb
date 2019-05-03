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
        
    	//获取请求参数
    	String username = request.getParameter("username");
        String password = request.getParameter("password");
        String message = "{\"message\":\"登录成功\"}";
        response.setContentType("application/json;charset=utf-8");
//       if("双击".equals(username) && "666".equals(password)) {
//            response.getWriter().write(message);
//        }
    	
    	DBUtil db = new DBUtil();
    	try {
    		String sql = "select * from user_zc where user_name=? and user_pw=?";
    		conn = db.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, username);
            ps.setString(2, password);
            //结果集
            rs = ps.executeQuery();
            if(rs.next()) {//用户名密码正确
            	PrintWriter out = response.getWriter();
            	
            	request.getSession().setAttribute("username", username);
            	out.write(message);
//            	out.write(username);
//            	response.getWriter().print("注册成功");
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
