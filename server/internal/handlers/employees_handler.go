package handlers

import (
	"net/http"
	"wc-challenge/internal/employees"

	"github.com/gin-gonic/gin"
)

func GetEmployeesHandler(c *gin.Context) {
	emps, err := employees.GetEmployees()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch employees",
		})
		return
	}

	c.JSON(http.StatusOK, emps)
}
