fetchEmployees()

const create_button = document.getElementById('submit');
create_button.addEventListener('click', createEmployee)



function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee/')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.id = 'delete';
        deleteButton.type = 'submit';
        deleteButton.value = item.id;
        deleteButton.addEventListener('click', deleteEmployee);
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

// TODO
// add event listener to delete button

// TODO
function createEmployee() {

  const create_name = document.getElementById('name');
  const create_id = document.getElementById('id');

  const name = create_name.value
  const id = create_id.value

  const payload = {
    'name': name,
    'id': id
  }

  fetch('http://localhost:3000/api/v1/employee/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => {
    console.log(response)
    if (response.status === 400) {
      alert(` Id : ${payload.id} Already exists in memory`)
    }
  })
    .catch(error => {
      console.error(error)
    })
  fetchEmployees();
}

// TODO
function deleteEmployee(event) {
  // get id
  // send id to BE
  // call fetchEmployees
  const id = event.target.value

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id }) // Not commonly used
  })
  fetchEmployees()
}

