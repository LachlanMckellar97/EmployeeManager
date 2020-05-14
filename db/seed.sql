
use employees;

INSERT INTO department
    (name)
VALUES
    ('Logistics'),
    ('Human Resources'),
    ('Health'),
    ('Production');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Administrator', 60000, 1),
    ('Replenishment', 40000, 1),
    ('Team Leader', 65000, 2),
    ('Counselor', 80000, 2),
    ('Doctor', 100000, 3),
    ('Nurse', 80000, 3),
    ('Manager', 120000, 4),
    ('Assembler', 60000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Raul', 'Tejada', 1, NULL),
    ('Emily', 'Ortal', 2, 1),
    ('Craig', 'Boone', 3, NULL),
    ('Veronica', 'Santangelo', 4, 3),
    ('Alice', 'McLafferty', 5, NULL),
    ('Robert', 'House', 6, 5),
    ('Lily', 'Bowen', 7, NULL),
    ('Julie', 'Farkas', 8, 7);