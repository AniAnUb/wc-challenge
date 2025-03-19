import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import EmployeeCard from "./EmployeeCard";
import { Employee, EmployeeNode } from "../types";

function OrgChart() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/employees");

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();

        setEmployees(data);

        const expandedState = data.reduce((acc: any, emp: Employee) => {
          return { ...acc, [emp.id]: true };
        }, {});

        setExpanded(expandedState);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const buildOrgTree = (): EmployeeNode | undefined => {
    if (!employees.length) return undefined;

    const employeeMap = new Map<number, EmployeeNode>();

    employees.forEach((emp) => {
      employeeMap.set(emp.id, { ...emp, children: [] });
    });

    let root: EmployeeNode | undefined;

    employees.forEach((emp) => {
      const node = employeeMap.get(emp.id);

      if (node) {
        if (emp.manager_id === null) {
          root = node;
        } else {
          const manager = employeeMap.get(emp.manager_id);
          if (manager) {
            manager.children.push(node);
          }
        }
      }
    });

    return root;
  };

  const renderChildren = (children: EmployeeNode[]) => {
    return children?.map((child) => {
      return (
        <TreeNode
          key={child.id}
          label={
            <EmployeeCard
              employee={child}
              toggleExpanded={() => {
                setExpanded({
                  ...expanded,
                  [child.id]: !expanded[child.id],
                });
              }}
              expanded={expanded[child.id]}
            />
          }
        >
          {expanded[child.id] && child.children.length > 0
            ? renderChildren(child.children)
            : null}
        </TreeNode>
      );
    });
  };

  const orgTree = buildOrgTree();

  if (!orgTree) {
    return (
      <div className="flex items-center justify-center flex-col h-96">
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 1 1-6.219-8.56"
          />
        </svg>
        <p>
          <span className="ml-2 text-neutral-600 text-sm mt-2">
            Loading employees...
          </span>
        </p>
      </div>
    );
  }

  return (
    <Tree
      label={
        <EmployeeCard
          employee={orgTree}
          expanded={expanded[orgTree.id]}
          toggleExpanded={() => {
            setExpanded({
              ...expanded,
              [orgTree.id]: !expanded[orgTree.id],
            });
          }}
        />
      }
    >
      {expanded[orgTree.id] ? renderChildren(orgTree?.children ?? []) : null}
    </Tree>
  );
}

export default OrgChart;
