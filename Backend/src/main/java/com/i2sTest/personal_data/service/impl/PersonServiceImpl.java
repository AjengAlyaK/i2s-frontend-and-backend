package com.i2sTest.personal_data.service.impl;

import com.i2sTest.personal_data.dto.request.CreatePersonRequest;
import com.i2sTest.personal_data.dto.request.UpdatePersonRequest;
import com.i2sTest.personal_data.dto.response.PersonResponse;
import com.i2sTest.personal_data.entity.Person;
import com.i2sTest.personal_data.exception.DuplicateNikException;
import com.i2sTest.personal_data.exception.PersonNotFoundException;
import com.i2sTest.personal_data.repository.PersonRepository;
import com.i2sTest.personal_data.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    @Override
    public List<PersonResponse> getAll(String nik, String namaLengkap) {

        List<Person> persons;

        boolean hasNik = nik != null && !nik.isBlank();
        boolean hasNama = namaLengkap != null && !namaLengkap.isBlank();

        if (hasNik && hasNama) {
            persons = personRepository
                    .findByNikContainingAndNamaLengkapContainingIgnoreCase(
                            nik,
                            namaLengkap
                    );

        } else if (hasNik) {
            persons = personRepository.findByNikContaining(nik);
        } else if (hasNama) {
            persons = personRepository
                .findByNamaLengkapContainingIgnoreCase(namaLengkap);
        } else {
            persons = personRepository.findAll();
        }

        return persons.stream()
            .map(this::mapToResponse)
            .toList();
    }

    @Override
    public PersonResponse getByNik(String nik) {
        Person person = personRepository.findById(nik)
            .orElseThrow(() ->
                new PersonNotFoundException(
                    "Person with NIK " + nik + " not found"));

        return mapToResponse(person);
    }

    @Override
    @Transactional
    public PersonResponse create(CreatePersonRequest request) {
        if (personRepository.existsById(request.getNik())) {
            throw new DuplicateNikException("Person with NIK " + request.getNik() + " already exists");
        }

        Person person = new Person();
        person.setNik(request.getNik());
        person.setNamaLengkap(request.getNamaLengkap());
        person.setJenisKelamin(request.getJenisKelamin());
        person.setTanggalLahir(request.getTanggalLahir());
        person.setAlamat(request.getAlamat());
        person.setNegara(request.getNegara());

        Person savedPerson = personRepository.save(person);
        return mapToResponse(savedPerson);
    }

    @Override
    @Transactional
    public PersonResponse update(String nik, UpdatePersonRequest request) {
        Person person = personRepository.findById(nik)
                .orElseThrow(() -> new PersonNotFoundException("Person with NIK " + nik + " not found"));

        person.setNamaLengkap(request.getNamaLengkap());
        person.setJenisKelamin(request.getJenisKelamin());
        person.setTanggalLahir(request.getTanggalLahir());
        person.setAlamat(request.getAlamat());
        person.setNegara(request.getNegara());

        Person updatedPerson = personRepository.save(person);
        return mapToResponse(updatedPerson);
    }

    @Override
    @Transactional
    public void delete(String nik) {
        Person person = personRepository.findById(nik)
            .orElseThrow(() -> new PersonNotFoundException("Person with NIK " + nik + " not found"));

        personRepository.delete(person);
    }

    private PersonResponse mapToResponse(Person person) {
        return PersonResponse.builder()
                .nik(person.getNik())
                .namaLengkap(person.getNamaLengkap())
                .jenisKelamin(person.getJenisKelamin())
                .tanggalLahir(person.getTanggalLahir())
                .alamat(person.getAlamat())
                .negara(person.getNegara())
                .build();
    }
}
