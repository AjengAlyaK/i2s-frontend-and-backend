package com.i2sTest.personal_data.service;

import com.i2sTest.personal_data.dto.request.CreatePersonRequest;
import com.i2sTest.personal_data.dto.request.UpdatePersonRequest;
import com.i2sTest.personal_data.dto.response.PersonResponse;

import java.util.List;

public interface PersonService {

    List<PersonResponse> getAll(
        String nik,
        String namaLengkap,
        String negara
    );

    PersonResponse getByNik(String nik);

    PersonResponse create(CreatePersonRequest request);

    PersonResponse update(
        String nik,
        UpdatePersonRequest request
    );

    void delete(String nik);
}