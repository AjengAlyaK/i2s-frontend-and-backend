const BASE_URL = 'http://localhost:8080/api/persons';

/**
 * Fetch all persons with optional filtering
 * @param {Object} params - { nik, namaLengkap }
 * @returns {Promise}
 */
async function getPersons(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${BASE_URL}?${query}` : BASE_URL;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

/**
 * Fetch a single person by NIK
 * @param {string} nik 
 * @returns {Promise}
 */
async function getPersonByNik(nik) {
    const response = await fetch(`${BASE_URL}/${nik}`);
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

/**
 * Create a new person record
 * @param {Object} data 
 * @returns {Promise}
 */
async function createPerson(data) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

/**
 * Update an existing person record
 * @param {string} nik 
 * @param {Object} data 
 * @returns {Promise}
 */
async function updatePerson(nik, data) {
    const response = await fetch(`${BASE_URL}/${nik}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

/**
 * Delete a person record
 * @param {string} nik 
 * @returns {Promise}
 */
async function deletePerson(nik) {
    const response = await fetch(`${BASE_URL}/${nik}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw await response.json();
    }
    return true;
}
