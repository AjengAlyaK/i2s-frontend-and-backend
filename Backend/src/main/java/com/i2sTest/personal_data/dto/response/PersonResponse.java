package com.i2sTest.personal_data.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonResponse {

    private String nik;

    private String namaLengkap;

    private String jenisKelamin;

    private LocalDate tanggalLahir;

    private String alamat;

    private String negara;
}
