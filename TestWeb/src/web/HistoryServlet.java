package web;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.mysql.jdbc.ResultSetMetaData;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

/**
 * Servlet implementation class HistoryServlet
 */
public class HistoryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HistoryServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// ��Ӧ������������
		response.setContentType("text/html;charset=utf-8");

		// 0.���������������(POST)
		request.setCharacterEncoding("utf-8");
		// 1.��ȡ�������
		String cookie = request.getParameter("cookie");
		String start = request.getParameter("start");
		String end = request.getParameter("end");
		String swt = request.getParameter("switch");
		String message = "{\"message\":\"ע��ɹ�\"}";
		
		// 3.�����Ϣ(���û���Ϣ���浽���ݿ���)
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		DBUtil db = new DBUtil();
		PrintWriter out = response.getWriter();
		if(swt.equals("���")) {
			try {
				conn = db.getConnection();
				 ps = conn.prepareStatement("select * from user_history where user_name=? and start=? and end=?");
				 ps.setString(1, cookie);
				 ps.setString(2, start);
				 ps.setString(3, end);
				 rs = ps.executeQuery(); 
				 if(rs.next()){//��ִ������sql��� ֱ�ӷ���
					 return; 
				}
				 
				// >>�����û���Ϣ�����ݿ�
				ps = conn.prepareStatement("insert into user_history values(?,?,?)");
				ps.setString(1, cookie);
				ps.setString(2, start);
				ps.setString(3, end);
				ps.executeUpdate();
				
				//4.ע��ɹ�, ��ʾ�û���ת����ҳ
//				response.getWriter().print("��ӳɹ�");
				out.write(message);
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}else if(swt.contentEquals("չʾ")) {
			try {
				conn = db.getConnection();
				 ps = conn.prepareStatement("select * from user_history where user_name=?");
				 ps.setString(1, cookie);
				 rs = ps.executeQuery(); 
				 List list = new ArrayList();
				 List list2 = new ArrayList();
				 List<Record> rcList = new ArrayList<Record>();
				 String rr = null;
				 while(rs.next()){//
					 Record rc = new Record();
					 String user_name = rs.getString(1);
					 String h_start = rs.getString(2);
					 String h_end = rs.getString(3);
					 
					 rc.setUser_name(user_name);
					 rc.setH_start(h_start);
					 rc.setH_end(h_end);
					 rcList.add(rc);
//					 System.out.println(user_name);
//					 System.out.println(h_start);
//					 System.out.println(h_end);
//					 System.out.println(rcList.toString());
//					 rr = user_name+";"+h_start+";"+h_end+";";
				}
				 String mes = null;
				 for(int i=0;i<rcList.size();i++) {
//					 String ge = "{\"message\":\"ע��ɹ�\"}";
					 mes = "user_name:"+rcList.get(i).getUser_name()+";h_start:"+rcList.get(i).getH_start()+";h_end:"+rcList.get(i).getH_end()+"|;";
					 System.out.println(mes);
					 list.add(mes);
					 out.print(mes);
				 }
//				 
//				 for(int i=0;i<list.size();i++) {
//					 System.out.println(list.get(i));
//				 }
//				 System.out.println(dt);
//				 String str=JSON.toJSON(list).toString();
//				 System.out.println(str);
//				 out.print(str);
//				 JSONArray.fromObject(list).toString();
//				 System.out.println(JSONArray.fromObject(list));
//				 JsonConfig config = new JsonConfig();
//				 config.setJsonPropertyFilter(new PropertyFilter() {
//			            public boolean apply(Object arg0, String arg1, Object arg2) {
//			                if( arg1.equals("cust_level")) return true;
//			                return false;
//			            }
//			        });
//				 JSONArray jsonData = JSONArray.fromObject(rcList,config); //��ת��list��ת��json
//				 System.out.println(jsonData);
				 
				 
				 
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}
		
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
}
