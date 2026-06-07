const params = new URLSearchParams(window.location.search);

const mode = params.get('mode');
const nik = params.get('nik');

document.addEventListener('DOMContentLoaded', () => {
    initializePage();

    document
        .getElementById('btnBack')
        .addEventListener('click', () => {
            window.location.href = 'monitoring.html';
        });

    document.getElementById('personForm')
        .addEventListener('submit', handleSubmit);
});

async function initializePage() {
    if (mode === 'create') {
        setupCreateMode();
        return;
    }

    if (mode === 'edit') {
        await setupEditMode();
        return;
    }

    if (mode === 'detail') {
        await setupDetailMode();
    }
}

function setupCreateMode() {
    document.getElementById('formTitle').textContent =
        'Tambah Data Pribadi';
}

async function setupEditMode() {
    document.getElementById('formTitle').textContent =
        'Edit Data Pribadi';

    document.getElementById('nik').readOnly = true;
}

async function setupDetailMode() {
    document.getElementById('formTitle').textContent =
        'Detail Data Pribadi';

    document.getElementById('btnSubmit').disabled = true;
}

async function setupEditMode() {
    document.getElementById('formTitle').textContent =
        'Edit Data Pribadi';

    document.getElementById('nik').readOnly = true;

    const person = await getPersonByNik(nik);

    populateForm(person);
}

async function setupDetailMode() {
    document.getElementById('formTitle').textContent =
        'Detail Data Pribadi';

    document.getElementById('btnSubmit').disabled = true;

    const person = await getPersonByNik(nik);

    populateForm(person);

    disableFormFields();
}

function populateForm(person) {
    document.getElementById('nik').value =
        person.nik ?? '';

    document.getElementById('namaLengkap').value =
        person.namaLengkap ?? '';

    document.getElementById('tanggalLahir').value =
        person.tanggalLahir ?? '';

    document.getElementById('alamat').value =
        person.alamat ?? '';

    document.getElementById('negara').value =
        person.negara ?? '';

    if (person.jenisKelamin === 'Laki-Laki') {
        document.getElementById('jenisKelaminL').checked = true;
    }

    if (person.jenisKelamin === 'Perempuan') {
        document.getElementById('jenisKelaminP').checked = true;
    }
}

function disableFormFields() {
    document.getElementById('nik')
        .readOnly = true;

    document.getElementById('namaLengkap')
        .readOnly = true;

    document.getElementById('tanggalLahir')
        .readOnly = true;

    document.getElementById('alamat')
        .readOnly = true;

    document.getElementById('negara')
        .disabled = true;

    document.getElementById('jenisKelaminL')
        .disabled = true;

    document.getElementById('jenisKelaminP')
        .disabled = true;
}

async function setupEditMode() {
    try {
        document.getElementById('formTitle').textContent =
            'Edit Data Pribadi';

        document.getElementById('nik').readOnly = true;

        const person = await getPersonByNik(nik);

        populateForm(person);

    } catch (error) {
        alert(error.message);
        window.location.href = 'monitoring.html';
    }
}

function getFormData() {
    return {
        nik: document.getElementById('nik').value.trim(),
        namaLengkap: document.getElementById('namaLengkap').value.trim(),
        jenisKelamin: document.querySelector(
            'input[name="jenisKelamin"]:checked'
        )?.value || null,
        tanggalLahir:
            document.getElementById('tanggalLahir').value || null,
        alamat:
            document.getElementById('alamat').value.trim(),
        negara:
            document.getElementById('negara').value || null
    };
}

async function handleSubmit(event) {
    event.preventDefault();

    try {

        const formData = getFormData();

        if (mode === 'create') {
            await createPerson(formData);
            alert('Data berhasil ditambahkan');
        }

        if (mode === 'edit') {
            await updatePerson(nik, formData);
            alert('Data berhasil diperbarui');
        }

        window.location.href = 'monitoring.html';

    } catch (error) {
        handleError(error);
    }
}

function handleError(error) {
    if (error.status === 400) {

        const messages =
            Object.values(error.errors).join('\n');

        alert(messages);

        return;
    }

    alert(error.message || 'Terjadi kesalahan');
}
