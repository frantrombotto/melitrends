package com.meli.academy.grails

import groovy.json.JsonSlurper

class TrendController {

	static ArrayList imgUrls = new ArrayList();
	
	def index() {
		
		def url = new URL("https://api.mercadolibre.com/sites")
		
		def connection = (HttpURLConnection)url.openConnection()
		
		connection.setRequestMethod("GET")
		connection.setRequestProperty("Accept", "application/json")
		connection.setRequestProperty("User-Agent", "Mozilla/5.0")
		
		JsonSlurper json = new JsonSlurper()
		def array = (ArrayList) json.parse(connection.getInputStream())
		
		array = array.sort{ it.name }
		
		[sites:array]
	}
	
	def trends() {
		def url = new URL("https://api.mercadolibre.com/sites/" + params.site + "/trends/search");
		
		def connection = (HttpURLConnection)url.openConnection()
		
		connection.setRequestMethod("GET")
		connection.setRequestProperty("Accept", "application/json")
		connection.setRequestProperty("User-Agent", "Mozilla/5.0")
		
		JsonSlurper json = new JsonSlurper()
		def array = (ArrayList) json.parse(connection.getInputStream())
		
		/*
		 * params.requestTimeout
		 */
		
		 [rowCount:Integer.parseInt(params.rowCount),
		  colCount:Integer.parseInt(params.colCount),
		  trends:array]
	}
	
	def getImage() {
		
		def url = new URL(params.url);
		
		def connection = (HttpURLConnection)url.openConnection()
		
		connection.setRequestMethod("GET")
		connection.setRequestProperty("Accept", "application/json")
		connection.setRequestProperty("User-Agent", "Mozilla/5.0")
		
		BufferedInputStream bis = new BufferedInputStream(connection.getInputStream());
		ByteArrayOutputStream buf = new ByteArrayOutputStream();
		int result = bis.read();
		
		while(result != -1) {
			
			byte b = (byte)result;
			buf.write(b);
			result = bis.read();
		}
		
		def s = buf.toString();
		
		def pre = "class='lazy-load' data-srcset='";
		def post = " 1x, ";
		
		def ini = s.indexOf(pre) + pre.length();
		def end = s.indexOf(post);
		
		def imgUrl = s.subSequence(ini, end)
		
		[imgUrl:imgUrl]
	}
	
	def bubbles() {
		
		println "Estoy en el bubbles"
		[imgUrls:imgUrls]
	}
}
