<!DOCTYPE html>

<html>

	<head>
	
		<meta name="layout" content="mainLayout">
		
		<title>Trends</title>
		
	</head>
	
	<body>
			
		<header>
		
			<div id="header">
			
				<asset:image id="logo" src="meli.png" height="50px"/>
			
			</div>
		
		</header>
	
		<div id="content">
		
			<div id="spinner" class="spinner" style="display:none;">
			
				<asset:image src="spinner.gif" />
			
			</div>
	
			<div id="container"></div>
		
			<!-- Selector de site -->
		
			<div id="contentDiv" class="centered">
				
				<br /><br />
			
				<div id="title">
				
					Tendencias Mercado Libre
				
				</div>
				
				<br />
				
				<form id="configuration" action="trends" method="get" >
				
					<table>
					
						<tr>
						
							<td>Site</td>
							
							<td>
							
								<g:select name="site"
									      from="${sites}"
									      optionKey="id"
									      optionValue="name" />
									      
					      	</td>
						
						</tr>
					
						%{--<tr>--}%
						%{----}%
							%{--<td>Tiempo de actualización de consulta (s)</td>--}%
							%{----}%
							%{--<td>--}%
							%{----}%
								%{--<input type="number" name="requestTimeout" min="10" max="60" value="30"/> --}%
							      %{----}%
					      	%{--</td>--}%
						%{----}%
						%{--</tr>--}%
					
						<tr>
						
							<td>Cantidad de filas</td>
							
							<td>
							
								<input type="number" name="rowCount" min="1" max="5" value="5" />
						      
					      	</td>
						
						</tr>
						
						<tr>
						
							<td>Cantidad de columnas</td>
							
							<td>
							
								<input type="number" name="colCount" min="1" max="5" value="5" />
						      
					      	</td>
						
						</tr>
						
					</table>
					
					<br />
					
					<input type="submit" value="Ejecutar" />
				
				</form>
			
			</div>
			
			<br /> <hr />
			
			<!-- Selector de categorias -->
				
			<div class="block" id="rootCategories"></div>
			
			<!-- Listado de productos -->
			
			<div id="products"></div>
		
		</div>

		<br /> <br />
		
	</body>

</html>