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
		// ��Ӧ������������
				response.setContentType("text/html;charset=utf-8");

				// 0.���������������(POST)
				request.setCharacterEncoding("utf-8");
				// 1.��ȡ�������
				String username = request.getParameter("username");
				String password = request.getParameter("password");
				String userphone = request.getParameter("user_phone");
				String location = request.getParameter("user_location");
				String email = request.getParameter("email");
				String message = "{\"message\":\"ע��ɹ�\" }";
				
				// 3.ע���û�(���û���Ϣ���浽���ݿ���)
						Connection conn = null;
						PreparedStatement ps = null;
						ResultSet rs = null;
						DBUtil db = new DBUtil();
						try {
							conn = db.getConnection();
//							// >>�û����Ƿ����
							ps = conn.prepareStatement("select * from user_zc where user_name=?");
							ps.setString(1, username);
							rs = ps.executeQuery();
							if(rs.next()){
								response.getWriter().print("�û����Ѵ���");
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
