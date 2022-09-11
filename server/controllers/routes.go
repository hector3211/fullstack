package controllers

import (
	"github.com/gin-gonic/gin"
	"server/initial"
	"server/models"
)

func Test(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "test is good",
	})
}

func AllVideos(c *gin.Context) {
	var videos []models.Video
	initial.DB.Find(&videos)
	c.JSON(200, gin.H{
		"videos": videos,
	})
}

func CreateVideo(c *gin.Context) {
	var body struct {
		Name string
	}
	c.Bind(&body)
	video := models.Video{Name: body.Name}
	result := initial.DB.Create(&video)
	if result.Error != nil {
		c.Status(400)
		return
	}
	c.JSON(200, gin.H{
		"video": video,
	})
}

func GetVideoById(c *gin.Context) {
	id := c.Param("id")
	var video models.Video
	initial.DB.First(&video, id)
	c.JSON(200, gin.H{
		"video": video,
	})
}

func UpdateVideoName(c *gin.Context) {
	var body struct {
		Name string
	}
	c.Bind(&body)
	id := c.Param("id")
	var video models.Video
	initial.DB.First(&video, id)
	initial.DB.Model(&video).Update(
		"Name", body.Name,
	)
	c.JSON(200, gin.H{
		"updated": video,
	})
}

func DeleteVideo(c *gin.Context) {
	id := c.Param("id")
	initial.DB.Delete(&models.Video{}, id)
	c.JSON(200, gin.H{
		"deleted": "Video Id:" + id + " deleted",
	})
}
