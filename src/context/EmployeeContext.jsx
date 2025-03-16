import { createContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const isEmailUnique = (email, currentId = null) => {
    return !employees.some(emp => 
      emp.email.toLowerCase() === email.toLowerCase() && emp.id !== currentId
    );
  };

  const addEmployee = (newEmployee) => {
    if (!isEmailUnique(newEmployee.email)) {
      throw new Error("Email already exists!");
    }
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    if (!isEmailUnique(updatedEmployee.email, id)) {
      throw new Error("Email already exists!");
    }
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? updatedEmployee : emp)
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ 
      employees, 
      addEmployee,
      updateEmployee,
      deleteEmployee,
      isEmailUnique
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;