package web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ValiImageServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//��ֹ�����������֤��ͼƬ
		response.setDateHeader("Expires", -1);
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		
		//����һ����֤��ͼƬ
		//����֤��ͼƬ���͸��ͻ��������
		VerifyCode vc = new VerifyCode();
		vc.drawImage(response.getOutputStream());
		
		//��ȡ��֤��
		request.getSession().setAttribute("valistr", vc.getCode());
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
