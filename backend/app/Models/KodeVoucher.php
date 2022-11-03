<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KodeVoucher extends Model
{
    use HasFactory;
    protected $table = 'tb_kode_voucher';
    protected $fillable = [
        'reedem',
        'reward',
        'jumlah',
    ];
}
