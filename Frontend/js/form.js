document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'create';
    const nik = urlParams.get('nik');

    setupFormMode(mode);

    if (nik && (mode === 'edit' || mode === 'detail')) {
        await loadPersonData(nik);
    }

    // Back button handler
    document.getElementById('btnBack').addEventListener('click', () => {
        window.location.href = 'monitoring.html';
    });

    // Form submission handler
    document.getElementById('personForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (mode === 'detail') return;

        const formData = {
            nik: document.getElementById('nik').value,
            namaLengkap: document.getElementById('namaLengkap').value,
            jenisKelamin: document.querySelector('input[name="jenisKelamin"]:checked')?.value || '',
            tanggalLahir: document.getElementById('tanggalLahir').value,
            alamat: document.getElementById('alamat').value,
            negara: document.getElementById('negara').value
        };

        try {
            if (mode === 'create') {
                await createPerson(formData);
                alert('Data berhasil disimpan');
            } else if (mode === 'edit') {
                await updatePerson(nik, formData);
                alert('Data berhasil diperbarui');
            }
            window.location.href = 'monitoring.html';
        } catch (error) {
            alert(error.message);
        }
    });
});

function setupFormMode(mode) {
    const formTitle = document.getElementById('formTitle');
    const btnSubmit = document.getElementById('btnSubmit');
    const nikInput = document.getElementById('nik');
    const allInputs = document.querySelectorAll('#personForm input, #personForm textarea, #personForm select');

    if (mode === 'create') {
        formTitle.textContent = 'Data Pribadi - Tambah';
        btnSubmit.textContent = 'Simpan';
        btnSubmit.classList.add('btn-black');
    } else if (mode === 'edit') {
        formTitle.textContent = 'Data Pribadi - Edit';
        btnSubmit.textContent = 'Ubah';
        btnSubmit.classList.add('btn-black');
        nikInput.readOnly = true;
    } else if (mode === 'detail') {
        formTitle.textContent = 'Data Pribadi - Detail';
        btnSubmit.style.display = 'none'; // Hide submit button in detail mode
        
        allInputs.forEach(input => {
            if (input.type === 'radio') {
                input.disabled = true;
            } else {
                input.readOnly = true;
                input.disabled = true; // Disable select/date inputs
            }
        });
    }
}

async function loadPersonData(nik) {
    try {
        const person = await getPersonByNik(nik);
        
        document.getElementById('nik').value = person.nik;
        document.getElementById('namaLengkap').value = person.namaLengkap;
        
        if (person.jenisKelamin === 'Laki-Laki') {
            document.getElementById('jenisKelaminL').checked = true;
        } else if (person.jenisKelamin === 'Perempuan') {
            document.getElementById('jenisKelaminP').checked = true;
        }

        document.getElementById('tanggalLahir').value = person.tanggalLahir;
        document.getElementById('alamat').value = person.alamat;
        document.getElementById('negara').value = person.negara;
    } catch (error) {
        alert('Gagal mengambil data: ' + error.message);
        window.location.href = 'monitoring.html';
    }
}
