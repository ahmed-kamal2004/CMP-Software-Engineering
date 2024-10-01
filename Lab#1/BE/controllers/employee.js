const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });

};

// TODO
exports.deleteEmployee = async (req, res, next) => {

  const id = req.params.id
  let index = -1
  for (let i = 0; i < employee.length; i++) {
    if (employee[i].id === id) {
      index = i;
      break;
    }
  }

  if (index > -1) {
    employee.splice(index, 1);
    res.status(200)
  }
  else {
    res.status(404)
  }


};

// TODO
exports.createEmployee = async (req, res, next) => {

  const data = req.body
  flag = true
  for (const i of employee) {
    if (i.id == data.id) {
      flag = false;
    }
  }
  if (flag) {
    employee.push({ id: data.id, name: data.name })
    res.status(200);
  }
  else {
    res.status(400);
  }
};
