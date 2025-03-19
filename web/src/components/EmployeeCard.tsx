import { EmployeeNode } from "../types";
import { motion } from "framer-motion";

const EmployeeCard = ({
  employee,
  toggleExpanded,
  expanded,
}: {
  employee: EmployeeNode;
  toggleExpanded?: React.MouseEventHandler<HTMLDivElement>;
  expanded?: boolean;
}) => {
  const getFirstLettersOfWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  const getTitleColor = (title: string) => {
    if (title === "CEO") return "bg-blue-100 text-blue-800";
    if (title === "CTO") return "bg-green-100 text-green-800";
    if (title === "COO") return "bg-yellow-100 text-yellow-800";
    if (title === "Designer") return "bg-red-100 text-red-800";
    if (title.includes("Engineer")) return "bg-purple-100 text-purple-800";
    if (title.includes("Operations")) return "bg-pink-100 text-pink-800";
    if (title.includes("Product")) return "bg-indigo-100 text-indigo-800";
    return "bg-gray-100 text-gray-800";
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.03 }}
        className="mb-1"
      >
        <div
          onClick={toggleExpanded}
          className="w-64 cursor-pointer border-2 hover:shadow-lg transition-all duration-200 max-w-full px-4 py-4  bg-white space-y-1 mx-auto border-gray-200 rounded-[20px]"
        >
          <span
            className={`bg-[rgb(59,130,246)] text-white rounded-full w-8 h-8 text-sm flex mx-auto items-center justify-center ${getAvatarColor(
              employee.name
            )}`}
          >
            {getFirstLettersOfWords(employee.name)}
          </span>
          <p className="">{employee.name}</p>
          <p
            className={`${getTitleColor(
              employee.title
            )} w-max mx-auto px-2 py-1 rounded-full text-xs`}
          >
            {employee.title}
          </p>
          <p>
            {employee.children.length > 0 && (
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {expanded ? "Click to collapse" : "Click to expand"}
              </div>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeCard;
