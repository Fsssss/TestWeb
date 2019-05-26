package web;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class InspectServlet
 */
@WebServlet("/InspectServlet")
public class InspectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 响应数据乱码问题
				response.setContentType("text/html;charset=utf-8");

				// 0.请求参数乱码问题(POST)
				request.setCharacterEncoding("utf-8");
				// 1.获取请求参数
				String username = request.getParameter("username");
				String password = request.getParameter("password");
				String userphone = request.getParameter("user_phone");
				String location = request.getParameter("user_location");
				String email = request.getParameter("email");
				String message = "{\"message\":\"注册成功\" }";
				
				// 3.注册用户(将用户信息保存到数据库中)
						Connection conn = null;
						PreparedStatement ps = null;
						ResultSet rs = null;
						DBUtil db = new DBUtil();
						try {
							conn = db.getConnection();
//							// >>用户名是否存在
							ps = conn.prepareStatement("select * from user_zc where user_name=?");
							ps.setString(1, username);
							rs = ps.executeQuery();
							if(rs.next()){
								response.getWriter().print("用户名已存在");
								return;
							} 
						} catch (Exception e) {
							e.printStackTrace();
							throw new RuntimeException(e);
						}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
