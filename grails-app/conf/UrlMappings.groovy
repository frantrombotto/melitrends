class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/$site/trends?rowCount=$rowCount&colCount=$colCount"{
            controller = "trend"
            action= "trends"
            params= [rowCount:rowCount, colCount: colCount, site:site]
        }

        "/"(controller: "trend", action: "index")
        "/trends"(controller: "trend", action:"trends")
        "500"(view:'/error')
	}
}
