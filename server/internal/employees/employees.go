package employees

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"wc-challenge/config"
)

type Employee struct {
	Name      string `json:"name"`
	ID        int    `json:"id"`
	Title     string `json:"title"`
	ManagerID *int   `json:"manager_id"`
}

var (
	employeeCache []Employee
	cacheMu       sync.Mutex
)

func GetEmployees() ([]Employee, error) {
	cacheMu.Lock()
	defer cacheMu.Unlock()

	if len(employeeCache) == 0 {
		resp, err := http.Get(config.EmployeesURL)
		if err != nil {
			log.Printf("Error fetching employees: %v\n", err)
			return nil, err
		}
		defer resp.Body.Close()

		var fetched []Employee
		if err := json.NewDecoder(resp.Body).Decode(&fetched); err != nil {
			log.Printf("Error decoding employees JSON: %v\n", err)
			return nil, err
		}

		employeeCache = fetched
	}

	return employeeCache, nil
}
