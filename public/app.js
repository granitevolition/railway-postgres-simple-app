document.addEventListener('DOMContentLoaded', function() {
    const personForm = document.getElementById('personForm');
    const peopleList = document.getElementById('peopleList');
    const loadingElement = document.getElementById('loading');
    const messageElement = document.getElementById('message');
    
    // Load people when the page loads
    loadPeople();
    
    // Handle form submission
    personForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value);
        
        if (!name || isNaN(age)) {
            showMessage('Please enter a valid name and age', 'error');
            return;
        }
        
        addPerson(name, age);
    });
    
    function loadPeople() {
        loadingElement.style.display = 'block';
        
        fetch('/api/people')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch people');
                }
                return response.json();
            })
            .then(people => {
                renderPeopleTable(people);
                loadingElement.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Failed to load people from the database', 'error');
                loadingElement.style.display = 'none';
            });
    }
    
    function addPerson(name, age) {
        fetch('/api/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to add person');
                });
            }
            return response.json();
        })
        .then(newPerson => {
            showMessage(`${newPerson.name} was added successfully!`, 'success');
            personForm.reset();
            loadPeople(); // Reload the table
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage(error.message, 'error');
        });
    }
    
    function renderPeopleTable(people) {
        peopleList.innerHTML = '';
        
        if (people.length === 0) {
            peopleList.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center;">No people found. Add someone!</td>
                </tr>
            `;
            return;
        }
        
        people.forEach(person => {
            const row = document.createElement('tr');
            
            // Format the date
            const created = new Date(person.created_at);
            const formattedDate = created.toLocaleString();
            
            row.innerHTML = `
                <td>${person.id}</td>
                <td>${person.name}</td>
                <td>${person.age}</td>
                <td>${formattedDate}</td>
            `;
            
            peopleList.appendChild(row);
        });
    }
    
    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
});