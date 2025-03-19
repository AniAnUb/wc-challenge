export interface Employee {
    id: number
    name: string
    title: string
    manager_id: number | null
  }
  
  export interface EmployeeNode extends Employee {
    children: EmployeeNode[]
  }
  
  