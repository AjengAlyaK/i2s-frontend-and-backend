let nikToDelete = null;
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

// Pagination State
let allPersons = [];
let currentPage = 1;
const pageSize = 10;

document.addEventListener('DOMContentLoaded', () => {
    loadTableData();

    // Search Form Handler
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const params = {
            nik: document.getElementById('searchNik').value,
            namaLengkap: document.getElementById('searchNama').value
        };
        currentPage = 1; // Reset to page 1 on new search
        loadTableData(params);
    });

    // Reset Form Handler
    document.getElementById('searchForm').addEventListener('reset', () => {
        currentPage = 1;
        setTimeout(() => loadTableData(), 0);
    });

    // Tambah Button Handler
    document.getElementById('btnTambah').addEventListener('click', () => {
        window.location.href = 'form.html?mode=create';
    });

    // Confirm Delete Handler
    document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
        if (nikToDelete) {
            try {
                await deletePerson(nikToDelete);
                deleteModal.hide();
                loadTableData();
                alert('Data berhasil dihapus');
            } catch (error) {
                alert(error.message);
            }
        }
    });
});

async function loadTableData(params = {}) {
    const tableBody = document.getElementById('personTableBody');
    const paginationEl = document.getElementById('pagination');
    
    tableBody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">Memuat data...</td></tr>';
    paginationEl.innerHTML = '';

    try {
        allPersons = await getPersons(params);
        renderTable();
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="9" class="text-center text-danger py-4">${error.message}</td></tr>`;
    }
}

function renderTable() {
    const tableBody = document.getElementById('personTableBody');
    tableBody.innerHTML = '';

    if (allPersons.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">Data tidak ditemukan</td></tr>';
        return;
    }

    // Calculate Slice
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedPersons = allPersons.slice(start, end);

    paginatedPersons.forEach((person, index) => {
        const row = document.createElement('tr');
        const displayIndex = start + index + 1;
        row.innerHTML = `
            <td>${displayIndex}</td>
            <td>${person.nik}</td>
            <td>${person.namaLengkap}</td>
            <td>${calculateAge(person.tanggalLahir)}</td>
            <td>${formatDate(person.tanggalLahir)}</td>
            <td>${person.jenisKelamin}</td>
            <td>${person.alamat}</td>
            <td>${person.negara}</td>
            <td class="text-center">
                <div class="btn-group" role="group">
                    <button class="btn btn-detail btn-sm me-1" onclick="viewDetail('${person.nik}')">Detail</button>
                    <button class="btn btn-edit btn-sm me-1" onclick="editPerson('${person.nik}')">Edit</button>
                    <button class="btn btn-delete btn-sm" onclick="showDeleteModal('${person.nik}')">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    renderPagination();
}

function renderPagination() {
    const paginationEl = document.getElementById('pagination');
    paginationEl.innerHTML = '';
    
    const totalPages = Math.ceil(allPersons.length / pageSize);
    if (totalPages <= 1) return;

    // Previous Button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
    paginationEl.appendChild(prevLi);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        paginationEl.appendChild(li);
    }

    // Next Button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
    paginationEl.appendChild(nextLi);
}

function changePage(page) {
    const totalPages = Math.ceil(allPersons.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calculateAge(birthDate) {
    if (!birthDate) return '-';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function viewDetail(nik) {
    window.location.href = `form.html?mode=detail&nik=${nik}`;
}

function editPerson(nik) {
    window.location.href = `form.html?mode=edit&nik=${nik}`;
}

function showDeleteModal(nik) {
    nikToDelete = nik;
    document.getElementById('deleteNikDisplay').textContent = nik;
    deleteModal.show();
}
