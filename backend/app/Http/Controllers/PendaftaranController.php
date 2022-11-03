<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PendaftaranController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'sertifikat.*' => 'image|mimes:jpeg,jpg,png|max:2024',
        ]);
        $pendaftaran = new Pendaftaran();
        $pendaftaran->user_id = Auth::id();

        if ($request->hasFile('sertifikat')) {
            foreach ($request->file('sertifikat') as $file) {
                $filename = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('berkas'), $filename);
                $data[] = $filename;
            }

            // Pendaftaran::create([
            //     'sertifikat' => json_encode($data),
            // ]);
            $pendaftaran->nama_lengkap = $request->nama_lengkap;
            $pendaftaran->nisn = $request->nisn;
            $pendaftaran->nis = $request->nis;
            $pendaftaran->nik_siswa = $request->nik_siswa;
            $pendaftaran->tempat_lahir_siswa = $request->tempat_lahir_siswa;
            $pendaftaran->tanggal_lahir_siswa = $request->tanggal_lahir_siswa;
            $pendaftaran->umur_siswa = $request->umur_siswa;
            $pendaftaran->pendidikan_awal = $request->pendidikan_awal;
            $pendaftaran->jenis_kelamin = $request->jenis_kelamin;
            $pendaftaran->telp_siswa     = $request->telp_siswa;
            $pendaftaran->cita_cita = $request->cita_cita;
            $pendaftaran->hobi = $request->hobi;
            $pendaftaran->anak_ke = $request->anak_ke;
            $pendaftaran->jumlah_saudara = $request->jumlah_saudara;
            $pendaftaran->alamat_lengkap = $request->alamat_lengkap;
            $pendaftaran->titik_koordinat = $request->titik_koordinat;
            $pendaftaran->jarak_sekolah = $request->jarak_sekolah;
            $pendaftaran->kebutuhan_khusus = $request->kebutuhan_khusus;
            $pendaftaran->no_kartu = $request->no_kartu;
            $pendaftaran->jenis_kartu = $request->jenis_kartu;
            $pendaftaran->disabilitas = $request->disabilitas;
            $pendaftaran->nama_ayah = $request->nama_ayah;
            $pendaftaran->nik_ayah = $request->nik_ayah;
            $pendaftaran->tempat_lahir_ayah = $request->tempat_lahir_ayah;
            $pendaftaran->tanggal_lahir_ayah = $request->tanggal_lahir_ayah;
            $pendaftaran->pekerjaan_ayah = $request->pekerjaan_ayah;
            $pendaftaran->pendidikan_ayah = $request->pendidikan_ayah;
            $pendaftaran->penghasilan_ayah = $request->penghasilan_ayah;
            $pendaftaran->telp_ayah = $request->telp_ayah;
            $pendaftaran->nama_ibu = $request->nama_ibu;
            $pendaftaran->nik_ibu = $request->nik_ibu;
            $pendaftaran->tempat_lahir_ibu = $request->tempat_lahir_ibu;
            $pendaftaran->tanggal_lahir_ibu = $request->tanggal_lahir_ibu;
            $pendaftaran->pekerjaan_ibu = $request->pekerjaan_ibu;
            $pendaftaran->pendidikan_ibu = $request->pendidikan_ibu;
            $pendaftaran->penghasilan_ibu = $request->penghasilan_ibu;
            $pendaftaran->telp_ibu = $request->telp_ibu;
            $pendaftaran->nama_wali = $request->nama_wali;
            $pendaftaran->nik_wali = $request->nik_wali;
            $pendaftaran->tempat_lahir_wali = $request->tempat_lahir_wali;
            $pendaftaran->tanggal_lahir_wali = $request->tanggal_lahir_wali;
            $pendaftaran->pekerjaan_wali = $request->pekerjaan_wali;
            $pendaftaran->pendidikan_wali = $request->pendidikan_wali;
            $pendaftaran->penghasilan_wali = $request->penghasilan_wali;
            $pendaftaran->telp_wali = $request->telp_wali;
            $pendaftaran->sertifikat = json_encode($data);
            $pendaftaran->save();
            return response()->json([
                'status' => 200,
                'messages' => 'with img',
            ]);
        } else {
            $pendaftaran->nama_lengkap = $request->nama_lengkap;
            $pendaftaran->nisn = $request->nisn;
            $pendaftaran->nis = $request->nis;
            $pendaftaran->nik_siswa = $request->nik_siswa;
            $pendaftaran->tempat_lahir_siswa = $request->tempat_lahir_siswa;
            $pendaftaran->tanggal_lahir_siswa = $request->tanggal_lahir_siswa;
            $pendaftaran->umur_siswa = $request->umur_siswa;
            $pendaftaran->pendidikan_awal = $request->pendidikan_awal;
            $pendaftaran->jenis_kelamin = $request->jenis_kelamin;
            $pendaftaran->telp_siswa     = $request->telp_siswa;
            $pendaftaran->cita_cita = $request->cita_cita;
            $pendaftaran->hobi = $request->hobi;
            $pendaftaran->anak_ke = $request->anak_ke;
            $pendaftaran->jumlah_saudara = $request->jumlah_saudara;
            $pendaftaran->alamat_lengkap = $request->alamat_lengkap;
            $pendaftaran->titik_koordinat = $request->titik_koordinat;
            $pendaftaran->jarak_sekolah = $request->jarak_sekolah;
            $pendaftaran->kebutuhan_khusus = $request->kebutuhan_khusus;
            $pendaftaran->no_kartu = $request->no_kartu;
            $pendaftaran->jenis_kartu = $request->jenis_kartu;
            $pendaftaran->disabilitas = $request->disabilitas;
            $pendaftaran->nama_ayah = $request->nama_ayah;
            $pendaftaran->nik_ayah = $request->nik_ayah;
            $pendaftaran->tempat_lahir_ayah = $request->tempat_lahir_ayah;
            $pendaftaran->tanggal_lahir_ayah = $request->tanggal_lahir_ayah;
            $pendaftaran->pekerjaan_ayah = $request->pekerjaan_ayah;
            $pendaftaran->pendidikan_ayah = $request->pendidikan_ayah;
            $pendaftaran->penghasilan_ayah = $request->penghasilan_ayah;
            $pendaftaran->telp_ayah = $request->telp_ayah;
            $pendaftaran->nama_ibu = $request->nama_ibu;
            $pendaftaran->nik_ibu = $request->nik_ibu;
            $pendaftaran->tempat_lahir_ibu = $request->tempat_lahir_ibu;
            $pendaftaran->tanggal_lahir_ibu = $request->tanggal_lahir_ibu;
            $pendaftaran->pekerjaan_ibu = $request->pekerjaan_ibu;
            $pendaftaran->pendidikan_ibu = $request->pendidikan_ibu;
            $pendaftaran->penghasilan_ibu = $request->penghasilan_ibu;
            $pendaftaran->telp_ibu = $request->telp_ibu;
            $pendaftaran->nama_wali = $request->nama_wali;
            $pendaftaran->nik_wali = $request->nik_wali;
            $pendaftaran->tempat_lahir_wali = $request->tempat_lahir_wali;
            $pendaftaran->tanggal_lahir_wali = $request->tanggal_lahir_wali;
            $pendaftaran->pekerjaan_wali = $request->pekerjaan_wali;
            $pendaftaran->pendidikan_wali = $request->pendidikan_wali;
            $pendaftaran->penghasilan_wali = $request->penghasilan_wali;
            $pendaftaran->telp_wali = $request->telp_wali;
            $pendaftaran->save();
            return response()->json([
                'status' => 200,
                'messages' => 'no img',
            ]);
        }
    }
}
