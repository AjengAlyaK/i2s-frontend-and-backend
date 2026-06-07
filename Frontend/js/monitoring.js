let nikToDelete = null;
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

document.addEventListener('DOMContentLoaded', () => {
    loadTableData();

    // Search Form Handler
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const params = {
            nik: document.getElementById('searchNik').value,
            namaLengkap: document.getElementById('searchNama').value
        };
        loadTableData(params);
    });

    // Reset Form Handler
    document.getElementById('searchForm').addEventListener('reset', () => {
        setTimeout(() => loadTableData(), 0); // Wait for reset to finish
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
    tableBody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">Memuat data...</td></tr>';

    try {
        const persons = await getPersons(params);
        tableBody.innerHTML = '';

        if (persons.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">Data tidak ditemukan</td></tr>';
            return;
        }

        persons.forEach((person, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
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
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="9" class="text-center text-danger py-4">${error.message}</td></tr>`;
    }
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
