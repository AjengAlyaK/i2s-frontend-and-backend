package com.i2sTest.personal_data.repository;

import com.i2sTest.personal_data.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, String> {

    Optional<Person> findByNik(String nik);

    List<Person> findByNikContaining(String nik);

    List<Person> findByNegaraContainingIgnoreCase(String negara);

    List<Person> findByNamaLengkapContainingIgnoreCase(String namaLengkap);

    List<Person> findByNikContainingAndNamaLengkapContainingIgnoreCase(
            String nik,
            String namaLengkap
    );

    List<Person> findByNikContainingAndNegaraContainingIgnoreCase(
            String nik,
            String negara
    );

    List<Person> findByNamaLengkapContainingIgnoreCaseAndNegaraContainingIgnoreCase(
            String namaLengkap,
            String negara
    );

    List<Person> findByNikContainingAndNamaLengkapContainingIgnoreCaseAndNegaraContainingIgnoreCase(
            String nik,
            String namaLengkap,
            String negara
    );
}