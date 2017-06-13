<!DOCTYPE html>

<html>

	<head>
	
		<title>Trends</title>
		
  		<asset:stylesheet src="trends.css"/>
	
	</head>
	
	<body>
	
		<g:set var="counter" value="${0}" />
	
		<g:each in="${trends}" var="trend">
		
			<input type="hidden" class="trend" name="trend${counter}" value="${trend.keyword}"/>
			<input type="hidden" class="trendUrl" name="trendUrl${counter}" value="${trend.url}"/>
			
			<g:set var="counter" value="${counter+1}" />
			
		</g:each>
		
		<input type="hidden" id="rowCount" value="${rowCount}" />
		
		<input type="hidden" id="colCount" value="${colCount}" />
	 
		<table>
		
			<g:each in="${0..(rowCount-1)}" var="row">
			
				<tr>
				
					<g:each in="${0..(colCount-1)}" var="col">
					
						<td>
						
							<asset:image class="meliLogo" src="melilogo.png"/>
													
							<h1>
							
							  <a href=""
							  	 class="typewrite"
							  	 data-period="2000">

							    <span class="wrap"></span>
							    
							  </a>
							  
							</h1>
						
						</td>
						
					</g:each>
				
				</tr>
			
			</g:each>
		
		</table>
		
		<div id="bubbles"></div>
		
		<!-- <div id="message"><div class="text">TRENDS</div></div> -->
		
		<asset:javascript src="jquery-3.1.1.min.js"/>
	
		<asset:javascript src="trends.js"/>
		
	</body>

</html>