package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"server/controllers"
	"server/initial"
)

func init() {
	initial.LoadEnvs()
	initial.ConnectDB()
}

func main() {
	// we initialize our gin serve
	r := gin.Default()
	r.Use(cors.Default())
	// All the routes for our server
	r.GET("/test", controllers.Test)
	r.GET("/videos", controllers.AllVideos)
	r.GET("/video/:id", controllers.GetVideoById)
	r.POST("/addvideo", controllers.CreateVideo)
	r.PUT("/video/:id", controllers.UpdateVideoName)
	r.DELETE("/video/:id", controllers.DeleteVideo)
	// we tell gin server to run
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
